import type { LabProject, LessonHandoff } from './types';

/**
 * Per-project storage:
 *   sc_lab_project_v1:<id> → {version: 1, ...LabProject}
 *
 * Active project pointer:
 *   sc_lab_active_v1 → <id>
 *
 * Lesson handoff (one-shot, cleared after consumption):
 *   sc_lab_lesson_handoff_v1 → {stageId, unitId, language, title, content, ts}
 *
 * All reads are defensive; if the payload is malformed the key is dropped.
 * All writes are wrapped in try/catch so a quota-full failure cannot crash
 * the SPA — autosave simply no-ops and the user is informed via the status
 * bar.
 */

const PROJECT_PREFIX = 'sc_lab_project_v1:';
const KEY_ACTIVE = 'sc_lab_active_v1';
const KEY_HANDOFF = 'sc_lab_lesson_handoff_v1';
const SCHEMA_VERSION = 1 as const;

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw) as T;
    if (!obj || typeof obj !== 'object') return null;
    return obj;
  } catch {
    return null;
  }
}

export function saveProject(project: LabProject): void {
  try {
    const stamped: LabProject = { ...project, version: SCHEMA_VERSION, updatedAt: Date.now() };
    localStorage.setItem(PROJECT_PREFIX + project.id, JSON.stringify(stamped));
  } catch {
    /* ignore quota errors */
  }
}

export function loadProject(id: string): LabProject | null {
  if (!id) return null;
  return safeParse<LabProject>(localStorage.getItem(PROJECT_PREFIX + id));
}

export function deleteProject(id: string): void {
  try {
    localStorage.removeItem(PROJECT_PREFIX + id);
    if (getActiveProjectId() === id) localStorage.removeItem(KEY_ACTIVE);
  } catch {
    /* ignore */
  }
}

export function listProjectIds(): string[] {
  const ids: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(PROJECT_PREFIX)) ids.push(key.slice(PROJECT_PREFIX.length));
  }
  return ids;
}

export function getActiveProjectId(): string | null {
  return localStorage.getItem(KEY_ACTIVE);
}

export function setActiveProjectId(id: string | null): void {
  try {
    if (id) localStorage.setItem(KEY_ACTIVE, id);
    else localStorage.removeItem(KEY_ACTIVE);
  } catch {
    /* ignore */
  }
}

export function setLessonHandoff(payload: LessonHandoff): void {
  try {
    localStorage.setItem(KEY_HANDOFF, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

export function readLessonHandoff(): LessonHandoff | null {
  return safeParse<LessonHandoff>(localStorage.getItem(KEY_HANDOFF));
}

export function clearLessonHandoff(): void {
  try {
    localStorage.removeItem(KEY_HANDOFF);
  } catch {
    /* ignore */
  }
}

/** Cross-component bus so the status bar reflects saves made by any pane. */
export const LAB_SAVED_EVENT = 'sc:lab-saved';
export function broadcastLabSaved(projectId: string): void {
  window.dispatchEvent(new CustomEvent(LAB_SAVED_EVENT, { detail: { projectId } }));
}
