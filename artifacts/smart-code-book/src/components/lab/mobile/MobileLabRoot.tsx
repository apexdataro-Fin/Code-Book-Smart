import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { LabProject, LabFile, RunMessage, RunError } from '@/lib/lab/types';
import { getAdapter } from '@/lib/lab/registry';
import { addFile, removeFile, renameFile, setActiveFile, setFileContent, switchActiveFileLanguage, updateProject } from '@/lib/lab/projectManager';
import { runProject } from '@/lib/lab/executionEngine';
import { saveProject, broadcastLabSaved } from '@/lib/lab/storage';
import { readLastMobileTab, writeLastMobileTab, type MobileTabId } from '@/lib/lab/storage';
import { loadPyodideSingleton, pyodideStatus, resetPyodide, subscribePyodide, type PyodideState } from '@/lib/lab/pyodideLoader';

import { MobileBottomSheet } from './MobileBottomSheet';
import { MobileSwipeHint, MobileTabBar } from './MobileTabBar';
import { MobileRunBar } from './MobileRunBar';
import { MobileLanguageDropdown } from './MobileLanguageDropdown';
import { MobileFilesSheet } from './MobileFilesSheet';
import { MobileSettingsSheet } from './MobileSettingsSheet';
import { MobileConsoleSheet } from './MobileConsoleSheet';
import { MobileOutputSheet } from './MobileOutputSheet';
import { MobileErrorsSheet } from './MobileErrorsSheet';
import { MobilePreviewFrame } from './MobilePreviewFrame';
import { MobileEditor } from './MobileEditor';
import { cn } from '@/lib/utils';

/**
 * MobileLabRoot — phone-first orchestrator for Smart Code Lab.
 *
 *   - One tab open at a time (Editor / Console / Preview / Output / Errors).
 *   - Files and Settings open as bottom sheets (NOT tabs).
 *   - Bottom action bar (Run · Stop · Reset · Files · Settings) ALWAYS
 *     visible — uses safe-area-inset-bottom for iPhone.
 *   - Bottom content-tab bar for explicit tap targeting + descriptive
 *     labels.
 *   - Swipe horizontally between ADJACENT content tabs.
 *   - Editor focus mode: Monaco focusin/focusout toggles a class so
 *     non-essential chrome is hidden while typing.
 *   - Double-tap on the Monaco host toggles "maximized editor" mode.
 *   - Last tab persists across reloads.
 */

interface MobileLabRootProps {
  initial: LabProject;
  onProjectChange?: (p: LabProject) => void;
  readOnly?: boolean;
}

const DEFAULT_SETTINGS = {
  fontSize: 14,
  theme: 'auto' as const,
  wordWrap: true,
  softWrap: true,
  lineNumbers: true,
  tabSize: 2,
  minimap: false,
};

export function MobileLabRoot({ initial, onProjectChange, readOnly }: MobileLabRootProps) {
  const [project, setProject] = useState<LabProject>(initial);
  const projectRef = useRef(project);
  projectRef.current = project;

  // Last opened tab restored from localStorage.
  const [tab, setTab] = useState<MobileTabId>(() => readLastMobileTab());
  const writeTab = useCallback((t: MobileTabId) => { writeLastMobileTab(t); setTab(t); }, []);

  const [messages, setMessages] = useState<RunMessage[]>([]);
  const [errors, setErrors] = useState<RunError[]>([]);
  const [outputText, setOutputText] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const [maximized, setMaximized] = useState(false);
  const [focused, setFocused] = useState(false);

  const [filesSheetOpen, setFilesSheetOpen] = useState(false);
  const [settingsSheetOpen, setSettingsSheetOpen] = useState(false);

  const [pyState, setPyState] = useState<PyodideState>(() => pyodideStatus());
  useEffect(() => {
    const unsub = subscribePyodide(setPyState);
    return () => { unsub(); };
  }, []);

  const active = useMemo(
    () => project.files.find((f) => f.id === project.activeId) ?? project.files[0],
    [project],
  );
  const activeLang = active?.language ?? project.language;
  const activeAdapter = useMemo(() => getAdapter(activeLang), [activeLang]);

  // Preview HTML via adapter.
  const previewHtml = useMemo<string>(() => {
    if (!active) return '';
    try {
      return activeAdapter.preview({ project, activeFile: active, files: project.files }) ?? '';
    } catch { return ''; }
  }, [project, active, activeAdapter]);

  const showPreview = !!previewHtml;
  const isPythonWorkspace = activeLang === 'python';
  const pythonReady = pyState.status === 'ready';
  const pythonLoading = isPythonWorkspace && pyState.status === 'loading';
  const pythonError = isPythonWorkspace && pyState.status === 'error';
  const pythonPercent = Math.round((pyState.progress || 0) * 100);
  const runDisabled = isRunning || (isPythonWorkspace && !pythonReady);

  // Compute the swipe order (preview may be skipped if no preview).
  const tabOrder = useMemo<MobileTabId[]>(() => {
    const order: MobileTabId[] = ['editor', 'console'];
    if (showPreview) order.push('preview');
    order.push('output', 'errors');
    return order;
  }, [showPreview]);

  // Persist whenever settings change.
  useEffect(() => {
    if (onProjectChange && project.id !== initial.id) onProjectChange(project);
    saveProject(project);
    broadcastLabSaved(project.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  // Auto-preload Pyodide whenever any Python file is present.
  const hasPythonFile = useMemo(
    () => project.files.some((f) => f.language === 'python'),
    [project.files],
  );
  useEffect(() => {
    if (readOnly) return;
    if (!hasPythonFile) return;
    if (pyState.status === 'ready' || pyState.status === 'loading') return;
    loadPyodideSingleton().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPythonFile, readOnly]);

  /* ----------------------------- Actions ----------------------------- */

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
    } catch (e) {
      const err: RunError = {
        message: e instanceof Error ? e.message : String(e),
        stack: e instanceof Error ? e.stack : undefined,
      };
      setErrors((prev) => [...prev, err]);
      setIsRunning(false);
    }
  };

  const onStop = async () => {
    try {
      const mod = await import('@/lib/lab/executionEngine');
      mod.stop();
    } catch { /* noop */ }
    setIsRunning(false);
  };

  const onReset = () => setProject(initial);

  const onLanguageChange = (lang: LabProject['language']) => {
    setProject((p) => switchActiveFileLanguage(p, lang));
    writeTab('console');
    setMaximized(true);
    setFocused(true);
  };

  const handleAddFile = () => {
    const name = window.prompt('اسم الملف الجديد (مثال: helper.js):', 'untitled.txt');
    if (!name) return;
    setProject((p) => addFile(p, { name, content: '' }));
  };

  const handleActivateFile = (fileId: string) => {
    setProject((p) => setActiveFile(p, fileId));
    setFilesSheetOpen(false);
    writeTab('editor');
  };
  const handleRenameFile = (fileId: string, newName: string) => {
    setProject((p) => renameFile(p, fileId, newName));
  };
  const handleDeleteFile = (fileId: string) => {
    setProject((p) => removeFile(p, fileId));
  };
  const handleDuplicateFile = (fileId: string) => {
    setProject((p) => {
      const src = p.files.find((f) => f.id === fileId);
      if (!src) return p;
      const clone: LabFile = {
        ...src,
        id: `${src.id}-copy-${Math.random().toString(36).slice(2, 6)}`,
        name: src.name.replace(/(\.[^.]+)?$/, ' (نسخة)$1'),
      };
      return addFile(p, { id: clone.id, name: clone.name, language: clone.language, content: clone.content });
    });
  };

  const handleEditorChange = (val: string) => {
    const f = projectRef.current.files.find((x) => x.id === projectRef.current.activeId);
    if (!f) return;
    setProject((p) => setFileContent(p, f.id, val));
  };

  const handleSettingsChange = (next: Partial<LabProject['settings']>) => {
    setProject((p) => updateProject(p, { settings: { ...p.settings, ...next } }));
  };

  const handleResetSettings = () => {
    setProject((p) => updateProject(p, { settings: { ...DEFAULT_SETTINGS } }));
  };

  const handleRetryPython = () => {
    resetPyodide();
    loadPyodideSingleton().catch(() => {});
  };

  /* --------------------------- Swipe tab nav --------------------------- */
  // Touch-event-based swipe between adjacent content tabs.
  // Threshold: 60px horizontal with vertical drift < 80px.
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = touchStartY.current = null;
    if (Math.abs(dy) > 80) return; // vertical gesture → not a swipe
    if (Math.abs(dx) < 60) return;  // too small
    const idx = tabOrder.indexOf(tab);
    if (idx < 0) return;
    if (dx < 0 && idx < tabOrder.length - 1) writeTab(tabOrder[idx + 1]);
    if (dx > 0 && idx > 0) writeTab(tabOrder[idx - 1]);
  };

  /* --------------------------- Render sections --------------------------- */
  const renderTab = () => {
    switch (tab) {
      case 'editor':
        return active && (
          <MobileEditor
            value={active.content}
            language={activeLang}
            settings={project.settings}
            readOnly={readOnly || active.readOnly}
            onChange={handleEditorChange}
            onFocusChange={setFocused}
            onToggleMaximize={() => setMaximized((m) => !m)}
          />
        );
      case 'console':
        return <MobileConsoleSheet messages={messages} onClear={() => setMessages([])} />;
      case 'preview':
        return <MobilePreviewFrame html={previewHtml} />;
      case 'output':
        return <MobileOutputSheet text={outputText} title="خرج التشغيل" />;
      case 'errors':
        return <MobileErrorsSheet errors={errors} />;
    }
  };

  const canPrev = tabOrder.indexOf(tab) > 0;
  const canNext = tabOrder.indexOf(tab) < tabOrder.length - 1;

  return (
    <div
      className={cn(
        'mobile-lab-root',
        focused && tab === 'editor' && 'mobile-lab-typing',
        maximized && 'mobile-lab-maximized',
      )}
      data-tab={tab}
    >
      <header className="mobile-lab-header" dir="rtl">
        <div className="mobile-lab-title-row">
          <MobileLanguageDropdown current={activeLang} onChange={onLanguageChange} />
          <div className="mobile-lab-filename" title={active?.name}>{active?.name}</div>
        </div>
      </header>

      <main
        className="mobile-lab-main"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Swipe edge hints — only on adjacent tabs */}
        <MobileSwipeHint
          canPrev={canPrev}
          canNext={canNext}
          onPrev={() => {
            const idx = tabOrder.indexOf(tab);
            if (idx > 0) writeTab(tabOrder[idx - 1]);
          }}
          onNext={() => {
            const idx = tabOrder.indexOf(tab);
            if (idx < tabOrder.length - 1) writeTab(tabOrder[idx + 1]);
          }}
        />
        <div className="mobile-lab-tab-body">{renderTab()}</div>
      </main>

      <MobileTabBar
        current={tab}
        onChange={writeTab}
        showPreview={showPreview}
        errorCount={errors.length}
      />

      {!readOnly && (
        <MobileRunBar
          isRunning={isRunning}
          onRun={onRun}
          onStop={onStop}
          onReset={onReset}
          onOpenFiles={() => setFilesSheetOpen(true)}
          onOpenSettings={() => setSettingsSheetOpen(true)}
          pythonLoading={pythonLoading}
          pythonPercent={pythonPercent}
          pythonError={pythonError}
          onRetryPython={handleRetryPython}
          runDisabled={runDisabled}
        />
      )}

      {/* Sheets */}
      <MobileBottomSheet
        open={filesSheetOpen}
        onOpenChange={setFilesSheetOpen}
        title="الملفات"
        sheetClassName="h-[70vh]"
      >
        <MobileFilesSheet
          files={project.files}
          activeId={project.activeId}
          onActivate={handleActivateFile}
          onAdd={handleAddFile}
          onRename={handleRenameFile}
          onDelete={handleDeleteFile}
          onDuplicate={handleDuplicateFile}
        />
      </MobileBottomSheet>

      <MobileBottomSheet
        open={settingsSheetOpen}
        onOpenChange={setSettingsSheetOpen}
        title="الإعدادات"
        sheetClassName="h-[70vh]"
      >
        <MobileSettingsSheet
          settings={project.settings}
          onChange={handleSettingsChange}
          onResetDefaults={handleResetSettings}
        />
      </MobileBottomSheet>
    </div>
  );
}
