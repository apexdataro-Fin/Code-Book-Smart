import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Shell } from '@/components/Shell';
import { LabShell } from '@/components/lab/LabShell';
import { getUnit } from '@/data/book';
import UnitPage from '@/pages/UnitPage';
import { consumeLessonHandoff } from '@/lib/lab/lessonBridge';
import { createProject, getProject, updateProject } from '@/lib/lab/projectManager';
import { getAdapter } from '@/lib/lab/registry';
import { BookOpen, Code2 } from 'lucide-react';
import type { LabProject } from '@/lib/lab/types';

/**
 * Lesson-mode lab: split view.
 *   /lab/lesson/:stageId/:unitId?hl=:labId  — opens the lesson + lab side by side.
 *   /lab/lesson/:stageId/:unitId            — opens lesson + creates lab from handoff.
 *
 * If no handoff is present we still render the lesson + an empty lab.
 * The lab pane reuses LabShell.
 */
export default function LabLessonModePage() {
  const [, params] = useRoute<{ stageId: string; unitId: string }>('/lab/lesson/:stageId/:unitId');
  const stageId = params?.stageId ?? '';
  const unitId = params?.unitId ?? '';
  const unit = getUnit(stageId, unitId);
  const [project, setProject] = useState<LabProject | null>(null);
  const [showLab, setShowLab] = useState(true);

  useEffect(() => {
    if (!unit) return;
    const handoff = consumeLessonHandoff();
    if (!handoff) {
      setProject(null);
      return;
    }
    const existingId = readQueryParam('hl');
    if (existingId) {
      const p = getProject(existingId);
      if (p) { setProject(p); return; }
    }
    const starter = handoff.content;
    const p = createProject({
      name: handoff.title || 'تمرين الدرس',
      language: handoff.language,
      mode: 'workspace',
      starterCode: starter,
    });
    setProject(updateProject(p, { description: 'مثال من الدرس — يمكنك التعديل.' }));
    // Encode the project id into the URL so a refresh keeps the lab.
    setQueryParam('hl', p.id);
  }, [unit]);

  // Mobile fallback: toggle between lesson and lab panels.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 900) setShowLab(false);
      else setShowLab(true);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!unit) {
    return (
      <Shell>
        <div className="grid place-items-center h-64 text-muted-foreground">تعذّر العثور على الدرس المطلوب.</div>
      </Shell>
    );
  }

  return (
    <Shell>
      {/* Mobile segmented control */}
      <div className="md:hidden flex border-b border-border bg-card" dir="rtl">
        <button
          onClick={() => setShowLab(false)}
          className={`flex-1 px-3 py-2 text-sm font-bold flex items-center justify-center gap-1.5 ${!showLab ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
        >
          <BookOpen className="w-4 h-4" /> الدرس
        </button>
        <button
          onClick={() => setShowLab(true)}
          className={`flex-1 px-3 py-2 text-sm font-bold flex items-center justify-center gap-1.5 ${showLab ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
        >
          <Code2 className="w-4 h-4" /> المختبر
        </button>
      </div>
      <div className="hidden md:block h-[calc(100vh-3.5rem)] min-h-[500px]">
        <PanelGroup direction="horizontal" autoSaveId="lab-lesson">
          <Panel defaultSize={45} minSize={25}>
            {/* Lesson pane — re-use the existing UnitPage layout, but with
                its own scroll container and the completion card suppressed
                while the lab is open (read-only viewing mode). */}
            <div className="h-full overflow-y-auto p-4 bg-background" dir="rtl">
              <UnitLessonEmbedded stageId={stageId} unitId={unitId} />
            </div>
          </Panel>
          <PanelResizeHandle className="w-1.5 bg-border hover:bg-primary/40" />
          <Panel defaultSize={55} minSize={30}>
            <div className="h-full">
              {project ? (
                <LabShell project={project} onProjectChange={setProject} />
              ) : (
                <div className="h-full grid place-items-center text-muted-foreground text-sm px-6 text-center">
                  اضغط زر "افتح في المختبر" داخل الدرس لإحضار مثال الكود إلى هنا.
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
      {/* Mobile panels */}
      <div className="md:hidden h-[calc(100vh-7.5rem)] min-h-[400px]">
        {showLab ? (
          project ? (
            <LabShell project={project} onProjectChange={setProject} />
          ) : (
            <div className="h-full grid place-items-center text-muted-foreground text-sm px-6 text-center">
              اضغط زر "افتح في المختبر" داخل الدرس لإحضار مثال الكود إلى هنا.
            </div>
          )
        ) : (
          <div className="h-full overflow-y-auto p-4 bg-background" dir="rtl">
            <UnitLessonEmbedded stageId={stageId} unitId={unitId} />
          </div>
        )}
      </div>
    </Shell>
  );
}

/**
 * Lightweight wrapper that renders the unit's body inside an embedded
 * container. We re-use UnitPage's full UI but suppress the breadcrumb +
 * prev/next footer to keep the lesson pane compact.
 */
function UnitLessonEmbedded({ stageId, unitId }: { stageId: string; unitId: string }) {
  const unit = getUnit(stageId, unitId);
  if (!unit) return null;
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-2">{unit.title}</h1>
      {unit.description && <p className="text-muted-foreground mb-4">{unit.description}</p>}
      <div className="border border-border rounded-lg bg-card p-4">
        <UnitPage params={{ stageId, unitId }} />
      </div>
    </div>
  );
}

function readQueryParam(name: string): string | null {
  if (typeof window === 'undefined') return null;
  const u = new URL(window.location.href);
  return u.searchParams.get(name);
}

function setQueryParam(name: string, value: string): void {
  if (typeof window === 'undefined') return;
  const u = new URL(window.location.href);
  u.searchParams.set(name, value);
  // Replace state without scroll jump.
  try { window.history.replaceState(null, '', u.toString()); } catch { /* ignore */ }
}
