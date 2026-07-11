/**
 * Core types shared across the Smart Code Lab.
 * No runtime imports; this file is the single source of truth referenced by
 * `registry.ts`, `storage.ts`, `projectManager.ts`, `executionEngine.ts`,
 * `pyodideLoader.ts`, `zip.ts`, and every component under `src/components/lab/`.
 */

export type LanguageId =
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'css'
  | 'json'
  | 'markdown'
  | 'shell'
  | 'python';

export interface LabFile {
  /** Stable id within a project (filename-derived, no spaces). */
  id: string;
  /** Display filename e.g. "main.py". */
  name: string;
  language: LanguageId;
  content: string;
  /** Locked in guided mode so changes do not persist. */
  readOnly?: boolean;
}

export interface LabSettings {
  fontSize: number;
  theme: 'auto' | 'light' | 'dark';
  wordWrap: boolean;
  tabSize: number;
  minimap: boolean;
}

export interface LabProject {
  /** Schema version. Bump to invalidate older localStorage payloads. */
  version: 1;
  id: string;
  name: string;
  description?: string;
  /** Default language of the active file. */
  language: LanguageId;
  files: LabFile[];
  activeId: string;
  createdAt: number;
  updatedAt: number;
  /**
   * `workspace` = single-file playground; `project` = multi-file with file
   * explorer / tabs. The same LabProject shape is used for both; mode only
   * affects which UI surface is rendered around it.
   */
  mode: 'workspace' | 'project';
  settings: LabSettings;
}

export type RunMessageLevel =
  | 'log'
  | 'info'
  | 'warn'
  | 'error'
  | 'result'
  | 'system';

export interface RunMessage {
  level: RunMessageLevel;
  text: string;
  ts: number;
}

export interface RunError {
  message: string;
  line?: number;
  column?: number;
  /** Optional raw stack trace when available. */
  stack?: string;
  /** Optional heuristic hint from the language adapter. */
  hint?: string;
}

export interface RunResult {
  ok: boolean;
  outputs: RunMessage[];
  errors: RunError[];
  durationMs: number;
}

/** Adapter contract — every language conforms to this. */
export interface LanguageAdapter {
  id: LanguageId;
  displayName: string;
  /** Monaco language id used by @monaco-editor/react. */
  monacoLang: string;
  /** Default filename when the project has no files. */
  defaultFile: string;
  /** Default starter content shown when a fresh file is added. */
  defaultCode: string;
  /** True if this language has a real in-browser runtime. */
  executable: boolean;
  /** Optional pretty formatter. Returns code unchanged when unsupported. */
  format?(code: string): Promise<string>;
  /** Run the active file (or the whole project) within an AbortSignal scope. */
  run(opts: RunOpts): Promise<RunResult>;
}

export interface RunOpts {
  project: LabProject;
  activeFile: LabFile;
  /** Fires repeatedly with streamed console messages. */
  onMessage: (m: RunMessage) => void;
  /** Fires when a structured error is captured. */
  onError: (e: RunError) => void;
  signal: AbortSignal;
}

export interface StarterProject {
  id: string;
  title: string;
  description: string;
  language: LanguageId;
  mode: 'workspace' | 'project';
  icon: string;
  /** Optional multi-file seed (project mode). */
  files?: LabFile[];
  /** Single-file seed (workspace mode). Optional when files[] provides seed. */
  defaultCode?: string;
  hint?: string;
}

export interface GuidedExercise {
  id: string;
  title: string;
  description: string;
  language: LanguageId;
  /** Locked reference implementation the learner can reveal. */
  teacherCode: string;
  /** File the learner edits in this guided exercise. */
  studentFileName: string;
  /** Starter content of the student's file. */
  studentInit: string;
  task: string;
  hints: string[];
  expectedOutputContains?: string[];
}

/** Payload used by the "Open in Lab" lesson-button handoff. */
export interface LessonHandoff {
  stageId: string;
  unitId: string;
  language: LanguageId;
  title: string;
  content: string;
  ts: number;
}
