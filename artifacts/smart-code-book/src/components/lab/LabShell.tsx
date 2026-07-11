import {
  addFile, getActiveProject, removeFile, renameFile, setActiveFile,
  setFileContent, updateProject, createProject,
} from '@/lib/lab/projectManager';
import { getAdapter } from '@/lib/lab/registry';
import { consoleOutputForHtml } from '@/lib/lab/preview';
import { LabProject } from '@/lib/lab/types';
import { broadcastLabSaved, saveProject } from '@/lib/lab/storage';
import { runProject } from '@/lib/lab/executionEngine';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Cloud, Save, AlertCircle } from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { MonacoEditor } from './MonacoEditor';
import { ConsolePanel } from './ConsolePanel';
import { ErrorsPanel } from './ErrorsPanel';
import { OutputPanel } from './OutputPanel';
import { LogsPanel } from './LogsPanel';
import { StatusBar } from './StatusBar';
import { LabToolbar } from './LabToolbar';
import { FileTabs } from './FileTabs';
import { FileExplorer } from './FileExplorer';
import { PreviewPanel, assembleProjectHtml } from './PreviewPanel';
import { subscribePyodide, loadPyodideSingleton } from '@/lib/lab/pyodideLoader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * LabShell — shared state host for every Lab page. Takes an initial
 * project (already loaded from localStorage, created from a starter, or
 * seeded from a lesson-handoff), keeps it up to date via autosave, and
 * orchestrates running the project's active file.
 *
 * Layout:
 *   - Top: LabToolbar (Run / Stop / Reset / Format / Upload / Download / Duplicate / Share).
 *   - Middle: dual-pane. Left = editor (Monaco) wrapped in FileTabs at
 *     the top. Right = Tabbed output (Console / Output / Errors / Logs /
 *     Preview — Preview appears when the active language is HTML/CSS/JS).
 *   - Bottom: StatusBar (project / file / language / autosave).
 *   - Mobile: collapses the dual-pane into tabs.
 *
 * The shell never throws unhandled errors: every run produces a
 * RunResult through `runProject`, errors are surfaced via `setErrors`.
 */

interface LabShellProps {
  project: LabProject;
  /** Show a file explorer on the left (project mode only). */
  withFileExplorer?: boolean;
  /** Hide Run/Stop (e.g. when the lesson-coupled page wants read-only browsing). */
  readOnly?: boolean;
  /** Hide keyboard shortcut status (in Lesson Mode we re-use some keys). */
  compactStatus?: boolean;
  /** Hide the toolbar entirely (used by Read-Only lab variants). */
  hideToolbar?: boolean;
  /** Called when the project changes (so the parent can update the URL). */
  onProjectChange?: (p: LabProject) => void;
  /** Optional custom IDs to override the default container IDs. */
  className?: string;
}

export function LabShell({ project: initial, withFileExplorer, readOnly, hideToolbar, onProjectChange, className }: LabShellProps) {
  const [project, setProject] = useState<LabProject>(initial);
  const projectRef = useRef(project);
  projectRef.current = project;

  const [messages, setMessages] = useState<RunMessage[]>([]);
  const [errors, setErrors] = useState<RunError[]>([]);
  const [outputText, setOutputText] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Push error tab indicator separately from main errors array (so
  // banner-level errors still appear even when problems resolve).
  const [previewHtml, setPreviewHtml] = useState<string>('');

  const [pyReady, setPyReady] = useState<boolean>(false);
  useEffect(() => {
    const unsub = subscribePyodide((s) => setPyReady(s.status === 'ready'));
    return () => { unsub(); };
  }, []);

  // Keep latest project in sync with parent and storage (autosave).
  useEffect(() => {
    if (onProjectChange && project.id !== initial.id) onProjectChange(project);
    saveProject(project);
    broadcastLabSaved(project.id);
    // Intentionally only on project change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  // If the active file is HTML/CSS/JS and we're in workspace mode, derive
  // a live preview HTML to feed PreviewPanel.
  useEffect(() => {
    const active = project.files.find((f) => f.id === project.activeId);
    if (!active) return setPreviewHtml('');
    const adapter = getAdapter(active.language);
    if (active.language === 'html') {
      setPreviewHtml(active.content);
    } else if (active.language === 'javascript' || active.language === 'typescript') {
      // For workspace mode: wrap into a tiny demo HTML that imports the script.
      const code = active.language === 'typescript'
        ? active.content // TS-in-script is fine for browsers that ignore annotations
        : active.content;
      const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>Preview</title></head><body><pre id="out"></pre><script>${code}<\/script></body></html>`;
      setPreviewHtml(html);
    } else if (active.language === 'css') {
      setPreviewHtml(`<!doctype html><html><head><meta charset="utf-8"><style>${active.content}</style></head><body><h1>مرحبا</h1><p>عاينة CSS.</p></body></html>`);
    } else if (active.language === 'markdown') {
      const md = active.content;
      const html = escapeHtml(md).replace(/\n/g, '<br>');
      setPreviewHtml(`<!doctype html><html lang="ar"><head><meta charset="utf-8"></head><body><div style="font-family: system-ui; padding:1.5rem;">${html}</div></body></html>`);
    } else if (project.mode === 'project') {
      // Multi-file project: assemble via index.html if present.
      const index = project.files.find((f) => f.id === 'index-html' || f.name === 'index.html');
      if (index) {
        setPreviewHtml(assembleProjectHtml(index.content, project.files.map((f) => ({ name: f.name, content: f.content }))));
      } else {
        setPreviewHtml('');
      }
    } else if (adapter.executable) {
      // For Python and other adapters that produce stdout: blank preview.
      setPreviewHtml('');
    }
  }, [project]);

  const onRun = async () => {
    setMessages([]);
    setErrors([]);
    setOutputText('');
    setIsRunning(true);
    try {
      await runProject(project, {
        onMessage: (m) => setMessages((prev) => [...prev, m]),
        onError: (e) => setErrors((prev) => [...prev, e]),
        onDone: (r) => {
          setIsRunning(false);
          setOutputText(r.outputs.map((m) => m.text).join('\n'));
        },
      });
    } catch (e: unknown) {
      const err: RunError = {
        message: e instanceof Error ? e.message : String(e),
        stack: e instanceof Error ? e.stack : undefined,
      };
      setErrors((prev) => [...prev, err]);
      setIsRunning(false);
    }
  };

  const onStop = () => {
    import('@/lib/lab/executionEngine').then((mod) => mod.stop());
    setIsRunning(false);
  };

  const onReset = () => {
    // Reset = restore the project to its initial snapshot (starters file).
    setProject(initial);
  };

  const handleAdd = () => {
    const name = window.prompt('اسم الملف الجديد (مثال: helper.js):', 'untitled.txt');
    if (!name) return;
    const lang = inferLanguageFromName(name, project.language);
    const next = addFile(project, { name, language: lang, content: '' });
    setProject(next);
  };

  const handleClose = (fileId: string) => {
    const next = removeFile(project, fileId);
    setProject(next);
  };

  const handleActivate = (fileId: string) => setProject(setActiveFile(project, fileId));

  const handleRename = (fileId: string, newName: string) => {
    const next = renameFile(project, fileId, newName);
    setProject(next);
  };

  const handleDelete = (fileId: string) => {
    const next = removeFile(project, fileId);
    setProject(next);
  };

  const handleEditorChange = (val: string) => {
    const active = project.files.find((f) => f.id === project.activeId);
    if (!active) return;
    setProject(setFileContent(project, active.id, val));
  };

  const handleProjectLoaded = (p: LabProject) => setProject(p);

  const active = project.files.find((f) => f.id === project.activeId) ?? project.files[0];
  const showPreview = ['html', 'css', 'markdown', 'javascript', 'typescript'].includes(active?.language);
  const showPyLoad = active?.language === 'python' && !pyReady;

  const [tab, setTab] = useState<'console'|'output'|'errors'|'logs'|'preview'>(showPreview ? 'preview' : 'console');
  useEffect(() => {
    if (showPreview && tab === 'console' && messages.length === 0) setTab('preview');
  }, [showPreview]);

  return (
    <div className={cn('flex flex-col h-full bg-background text-foreground lab-shell', className)} dir="ltr">
      {!hideToolbar && (
        <LabToolbar
          project={project}
          onRun={onRun}
          onStop={onStop}
          onReset={onReset}
          onFormat={() => {/* no-op: real formatter is per-adapter; we surface hint */ }}
          onProjectLoaded={handleProjectLoaded}
          isRunning={isRunning}
        />
      )}
      <div className="flex-1 min-h-0">
        <PanelGroup direction="horizontal" autoSaveId="lab-shell-h">
          {withFileExplorer && (
            <>
              <Panel defaultSize={18} minSize={12} className="bg-card border border-border rounded m-1">
                <FileExplorer
                  files={project.files}
                  activeId={project.activeId}
                  onActivate={handleActivate}
                  onAdd={handleAdd}
                  onRename={handleRename}
                  onDelete={handleDelete}
                />
              </Panel>
              <PanelResizeHandle className="w-1 hover:bg-primary/40" />
            </>
          )}
          <Panel defaultSize={withFileExplorer ? 50 : 60} minSize={30}>
            <div className="flex flex-col h-full m-1 rounded border border-border overflow-hidden bg-card">
              <FileTabs
                files={project.files}
                activeId={project.activeId}
                onActivate={handleActivate}
                onClose={handleClose}
                onAdd={handleAdd}
              />
              <div className="flex-1 min-h-0">
                {active ? (
                  <MonacoEditor
                    value={active.content}
                    language={getAdapter(active.language).monacoLang}
                    readOnly={readOnly || active.readOnly}
                    fontSize={project.settings.fontSize}
                    wordWrap={project.settings.wordWrap}
                    tabSize={project.settings.tabSize}
                    minimap={project.settings.minimap}
                    onChange={handleEditorChange}
                  />
                ) : (
                  <div className="grid place-items-center h-full text-muted-foreground text-sm">
                    لا يوجد ملف مفتوح.
                  </div>
                )}
              </div>
            </div>
          </Panel>
          <PanelResizeHandle className="w-1 hover:bg-primary/40" />
          <Panel defaultSize={withFileExplorer ? 32 : 40} minSize={20} className="m-1">
            <div className="h-full flex flex-col bg-card border border-border rounded overflow-hidden">
              <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border bg-muted/40 overflow-x-auto" dir="ltr">
                <OutputTab id="console"   label="Console"   active={tab === 'console'}   onClick={() => setTab('console')} />
                {showPreview && <OutputTab id="preview" label="Preview"  active={tab === 'preview'} onClick={() => setTab('preview')} />}
                <OutputTab id="output"    label="Output"    active={tab === 'output'}    onClick={() => setTab('output')} />
                <OutputTab id="errors"    label={`Errors${errors.length ? ' (' + errors.length + ')' : ''}`} active={tab === 'errors'} onClick={() => setTab('errors')} />
                <OutputTab id="logs"      label="Logs"      active={tab === 'logs'}      onClick={() => setTab('logs')} />
              </div>
              <div className="flex-1 min-h-0">
                {tab === 'console' && (
                  <ConsolePanel messages={messages} onClear={() => setMessages([])} />
                )}
                {tab === 'output' && <OutputPanel text={outputText} title="خرج التشغيل" />}
                {tab === 'errors' && <ErrorsPanel errors={errors} />}
                {tab === 'logs' && <LogsPanel messages={messages} />}
                {tab === 'preview' && showPreview && <PreviewPanel html={previewHtml} />}
                {tab === 'preview' && showPyLoad && (
                  <div className="h-full grid place-items-center text-sm text-muted-foreground p-6">
                    <div className="flex flex-col items-center gap-2">
                      <Cloud className="w-6 h-6 text-amber-500 animate-pulse" />
                      <p>Python يعمل عبر Pyodide من CDN.</p>
                      <Button size="sm" onClick={() => loadPyodideSingleton()}>
                        <Save className="w-3 h-3 ml-1" /> تحميل Python الآن
                      </Button>
                      <p className="text-xs">سيُحمَّل مرة واحدة فقط، ثم يصبح جاهزًا فورًا.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
      <StatusBar project={project} isRunning={isRunning} isPyReady={pyReady} />
    </div>
  );
}

function OutputTab({ id, label, active, onClick }: { id: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      data-tab={id}
      onClick={onClick}
      className={cn(
        'px-3 py-1 rounded text-xs font-bold border',
        active ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border text-muted-foreground hover:bg-accent',
      )}
    >
      {label}
    </button>
  );
}

function inferLanguageFromName(name: string, fallback: LabProject['language']): LabProject['language'] {
  const n = name.toLowerCase();
  if (n.endsWith('.py')) return 'python';
  if (n.endsWith('.ts') || n.endsWith('.tsx')) return 'typescript';
  if (n.endsWith('.js') || n.endsWith('.jsx')) return 'javascript';
  if (n.endsWith('.html') || n.endsWith('.htm')) return 'html';
  if (n.endsWith('.css')) return 'css';
  if (n.endsWith('.json')) return 'json';
  if (n.endsWith('.md')) return 'markdown';
  if (n.endsWith('.sh') || n.endsWith('.bash')) return 'shell';
  return fallback;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Helper API: discover the active project id (used by some pages).
export function loadActiveProject(): LabProject | null {
  return getActiveProject();
}

// Importing these only for type info (TS) — keeps tree-shaking intact.
import type { RunError, RunMessage } from '@/lib/lab/types';
