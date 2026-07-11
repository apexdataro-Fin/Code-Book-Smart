import { useMemo, useRef } from 'react';
import {
  Play, Square, RotateCcw, Download, Upload, Copy, Share2, Sparkles,
} from 'lucide-react';
import type { LabProject } from '@/lib/lab/types';
import { downloadProjectZip, importProjectFromZip } from '@/lib/lab/zip';
import { duplicateProject, getProject, updateProject } from '@/lib/lab/projectManager';

interface LabToolbarProps {
  project: LabProject;
  onRun: () => void;
  onStop: () => void;
  onReset: () => void;
  onFormat?: () => void;
  onProjectLoaded?: (p: LabProject) => void;
  isRunning: boolean;
}

/**
 * LabToolbar — the entire Run / Stop / Reset / Format / Download /
 * Upload / Duplicate / Share surface. Designed for one-hand use on
 * mobile with ample touch targets (≥36 px) and short Arabic labels.
 *
 * Upload accepts a `.zip` exported by `downloadProjectZip` and replaces
 * the current project. Duplicate creates a copy and navigates the
 * parent to it via `onProjectLoaded`.
 *
 * Share copies a URL containing the active project id to the clipboard
 * so the user can bookmark or send it. (No backend; the project stays
 * in their own localStorage until they reload.)
 */
export function LabToolbar({ project, onRun, onStop, onReset, onFormat, onProjectLoaded, isRunning }: LabToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownload = async () => {
    await downloadProjectZip(project);
  };
  const handleUploadClick = () => fileInputRef.current?.click();
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const { meta, files } = await importProjectFromZip(f);
      const updated: LabProject = {
        ...project,
        name: meta?.name ?? f.name.replace(/\.zip$/i, ''),
        description: meta?.description ?? project.description,
        settings: { ...project.settings, ...(meta?.settings ?? {}) },
        updatedAt: Date.now(),
      };
      // Replace files inline.
      updated.files = Object.entries(files).map(([name, content]) => ({
        id: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9._-]/g, ''),
        name,
        language: detectLanguage(name),
        content,
      }));
      if (updated.files.length === 0) {
        // Fall back to single unchanged file.
        updated.files = project.files;
      }
      updated.activeId = updated.files[0].id;
      const saved = updateProject(updated, {});
      onProjectLoaded?.(saved);
    } catch (err) {
      alert('فشل استيراد الملف: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      e.target.value = '';
    }
  };
  const handleDuplicate = () => {
    const copy = duplicateProject(project);
    onProjectLoaded?.(copy);
  };
  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/lab/workspace/${project.id}`;
    try { await navigator.clipboard.writeText(url); } catch { /* fallback below */ }
    try {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    } catch { /* ignore */ }
    alert('📋 تم نسخ الرابط. Project id: ' + project.id);
  };

  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border bg-card">
      <div className="flex items-center gap-1.5">
        {isRunning ? (
          <button onClick={onStop} className="toolbar-btn toolbar-stop" title="إيقاف">
            <Square className="w-4 h-4" />
            <span className="text-xs font-bold">إيقاف</span>
          </button>
        ) : (
          <button onClick={onRun} className="toolbar-btn toolbar-run" title="تشغيل">
            <Play className="w-4 h-4" />
            <span className="text-xs font-bold">تشغيل</span>
          </button>
        )}
        <button onClick={onReset} className="toolbar-btn" title="إعادة تعيين">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button onClick={() => onFormat?.()} className="toolbar-btn" title="تنسيق الكود">
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-1.5">
        <button onClick={handleUploadClick} className="toolbar-btn" title="استيراد .zip" aria-label="استيراد .zip">
          <Upload className="w-4 h-4" />
          <input ref={fileInputRef} type="file" accept=".zip" className="hidden" onChange={handleUpload} />
        </button>
        <button onClick={handleDownload} className="toolbar-btn" title="تنزيل .zip" aria-label="تنزيل .zip">
          <Download className="w-4 h-4" />
        </button>
        <button onClick={handleDuplicate} className="toolbar-btn" title="نسخ المشروع">
          <Copy className="w-4 h-4" />
        </button>
        <button onClick={handleShare} className="toolbar-btn" title="مشاركة">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function detectLanguage(name: string) {
  const n = name.toLowerCase();
  if (n.endsWith('.py')) return 'python' as const;
  if (n.endsWith('.ts') || n.endsWith('.tsx')) return 'typescript' as const;
  if (n.endsWith('.js') || n.endsWith('.jsx')) return 'javascript' as const;
  if (n.endsWith('.html') || n.endsWith('.htm')) return 'html' as const;
  if (n.endsWith('.css') || n.endsWith('.scss')) return 'css' as const;
  if (n.endsWith('.json')) return 'json' as const;
  if (n.endsWith('.md') || n.endsWith('.markdown')) return 'markdown' as const;
  if (n.endsWith('.sh') || n.endsWith('.bash')) return 'shell' as const;
  return 'javascript' as const;
}
