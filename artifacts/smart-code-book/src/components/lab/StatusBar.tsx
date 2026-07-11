import { useEffect, useState } from 'react';
import { Cloud, Loader2, Activity } from 'lucide-react';
import type { LabProject } from '@/lib/lab/types';
import { LAB_SAVED_EVENT } from '@/lib/lab/storage';

interface StatusBarProps {
  project: LabProject;
  isRunning: boolean;
  isPyReady: boolean;
}

/**
 * Bottom status bar. Shows project name, active file, language,
 * autosave tick (re-renders whenever the storage layer broadcasts
 * `sc:lab-saved`), run state, and Python runtime readiness.
 */
export function StatusBar({ project, isRunning, isPyReady }: StatusBarProps) {
  const active = project.files.find((f) => f.id === project.activeId) ?? project.files[0];
  const [savedTick, setSavedTick] = useState(0);

  useEffect(() => {
    const onSaved = (ev: Event) => {
      const ce = ev as CustomEvent<{ projectId: string }>;
      if (ce.detail?.projectId === project.id) setSavedTick((t) => t + 1);
    };
    window.addEventListener(LAB_SAVED_EVENT, onSaved);
    return () => window.removeEventListener(LAB_SAVED_EVENT, onSaved);
  }, [project.id]);

  return (
    <div className="flex items-center justify-between gap-2 px-3 py-1.5 border-t border-border bg-card text-[11px] text-muted-foreground">
      <div className="flex items-center gap-3 min-w-0 overflow-hidden">
        <span className="font-mono font-bold truncate max-w-[200px] text-foreground">{project.name}</span>
        <span className="text-border">|</span>
        <span dir="ltr" className="font-mono truncate">{active?.name ?? '—'}</span>
        <span className="text-border">|</span>
        <span className="uppercase tracking-wider">{active?.language ?? '—'}</span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span
          dir="ltr"
          className="flex items-center gap-1 text-emerald-600"
          title={`آخر حفظ: tick #${savedTick}`}
        >
          <Cloud className="w-3 h-3" /> محفوظ تلقائيًا
        </span>
        {project.language === 'python' && (
          <span
            dir="ltr"
            className={`flex items-center gap-1 ${isPyReady ? 'text-emerald-600' : 'text-amber-500'}`}
            title={isPyReady ? 'Python جاهز' : 'Python لم يُحمَّل بعد'}
          >
            {isPyReady ? <Activity className="w-3 h-3" /> : <Loader2 className="w-3 h-3 animate-spin" />}
            {isPyReady ? 'Python' : 'Python…'}
          </span>
        )}
        <span className={isRunning ? 'text-primary' : ''}>
          {isRunning ? 'قيد التشغيل…' : 'جاهز'}
        </span>
      </div>
    </div>
  );
}
