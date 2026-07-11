import type { LabFile, LabProject, LanguageId } from './types';
import {
  deleteProject as _deleteProject,
  getActiveProjectId,
  loadProject,
  saveProject,
  setActiveProjectId,
  listProjectIds,
} from './storage';

/**
 * Project manager — pure functional helpers over `LabProject` plus the
 * storage layer. Stateless: every call returns a fresh value or directly
 * persists via `saveProject` / `_deleteProject`.
 */

function uid(prefix = 'p'): string {
  return (
    prefix +
    '_' +
    Math.random().toString(36).slice(2, 8) +
    Date.now().toString(36).slice(-4)
  );
}

function filenameToId(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9._-]/g, '')
    .slice(0, 80) || 'file';
}

/** Create a brand-new project. */
export function createProject(opts: {
  name: string;
  language: LanguageId;
  mode: 'workspace' | 'project';
  files?: LabFile[];
  starterCode?: string;
}): LabProject {
  const mainName = opts.language === 'python'
    ? 'main.py'
    : opts.language === 'typescript'
      ? 'main.ts'
      : opts.language === 'javascript'
        ? 'main.js'
        : opts.language === 'html'
          ? 'index.html'
          : opts.language === 'css'
            ? 'style.css'
            : opts.language === 'json'
              ? 'data.json'
              : opts.language === 'markdown'
                ? 'README.md'
                : 'main.sh';
  const mainFile: LabFile = {
    id: filenameToId(mainName),
    name: mainName,
    language: opts.language,
    content:
      opts.files?.find((f) => f.id === filenameToId(mainName))?.content ??
      opts.starterCode ??
      defaultCodeFor(opts.language),
  };
  const files = opts.files && opts.files.length > 0
    ? ensureUniqueIds(opts.files)
    : [mainFile];

  const now = Date.now();
  const project: LabProject = {
    version: 1,
    id: uid('lab'),
    name: opts.name,
    language: opts.language,
    files,
    activeId: files[0].id,
    mode: opts.mode,
    createdAt: now,
    updatedAt: now,
    settings: defaultSettings(opts.language),
  };
  saveProject(project);
  setActiveProjectId(project.id);
  return project;
}

/** Load a project by id. */
export function getProject(id: string): LabProject | null {
  return loadProject(id);
}

/** List all projects (most-recent first). */
export function listProjects(): LabProject[] {
  return listProjectIds()
    .map((id) => loadProject(id))
    .filter((p): p is LabProject => !!p)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

/** Resolve the active project (if any). */
export function getActiveProject(): LabProject | null {
  const id = getActiveProjectId();
  return id ? loadProject(id) : null;
}

/** Update an existing project's fields and re-save it. */
export function updateProject(project: LabProject, patch: Partial<LabProject>): LabProject {
  const next: LabProject = { ...project, ...patch, version: 1, updatedAt: Date.now() };
  saveProject(next);
  return next;
}

/** Duplicate project (preserves contents but assigns new id, name, timestamps). */
export function duplicateProject(project: LabProject): LabProject {
  const now = Date.now();
  const copy: LabProject = {
    ...project,
    id: uid('lab'),
    name: `${project.name} (نسخة)`,
    createdAt: now,
    updatedAt: now,
    files: project.files.map((f) => ({ ...f })),
    settings: { ...project.settings },
  };
  saveProject(copy);
  setActiveProjectId(copy.id);
  return copy;
}

/** Permanently delete a project. */
export function deleteProject(id: string): void {
  _deleteProject(id);
}

/* ---------- file helpers ---------- */

export function addFile(project: LabProject, partial: Partial<LabFile> & { name: string }): LabProject {
  const file: LabFile = {
    id: filenameToId(partial.id ?? partial.name),
    name: partial.name,
    language: (partial.language ?? project.language) as LanguageId,
    content: partial.content ?? '',
    readOnly: !!partial.readOnly,
  };
  // Avoid duplicate ids; bump with -2 -3 etc.
  const existingIds = new Set(project.files.map((f) => f.id));
  let id = file.id;
  let n = 2;
  while (existingIds.has(id)) id = `${file.id}-${n++}`;
  file.id = id;

  return updateProject(project, {
    files: [...project.files, file],
    activeId: id,
  });
}

export function renameFile(project: LabProject, fileId: string, newName: string): LabProject {
  const saneName = newName.trim().slice(0, 80) || 'file';
  const files = project.files.map((f) =>
    f.id === fileId
      ? {
          ...f,
          name: saneName,
          id: filenameToId(saneName),
        }
      : f,
  );
  return updateProject(project, { files, activeId: files.find((f) => f.id === fileId)?.id ?? project.activeId });
}

export function removeFile(project: LabProject, fileId: string): LabProject {
  if (project.files.length <= 1) return project; // never empty
  const files = project.files.filter((f) => f.id !== fileId);
  const next: LabProject = updateProject(project, {
    files,
    activeId: project.activeId === fileId ? files[0].id : project.activeId,
  });
  return next;
}

export function setActiveFile(project: LabProject, fileId: string): LabProject {
  if (!project.files.find((f) => f.id === fileId)) return project;
  return updateProject(project, { activeId: fileId });
}

export function setFileContent(project: LabProject, fileId: string, content: string): LabProject {
  return updateProject(project, {
    files: project.files.map((f) => (f.id === fileId ? { ...f, content } : f)),
  });
}

/* ---------- defaults ---------- */

function defaultSettings(_language: LanguageId): LabProject['settings'] {
  return {
    fontSize: 14,
    theme: 'auto',
    wordWrap: true,
    tabSize: 2,
    minimap: false,
  };
}

function defaultCodeFor(language: LanguageId): string {
  switch (language) {
    case 'javascript':
      return "//js\nconsole.log('مرحبا بالعالم');\n";
    case 'typescript': {
      const greet = (name: string): string => 'مرحبا ' + name;
      console.log(greet('العالم'));
      return [
        '//ts',
        'const greet = (name: string): string =>',
        '  "مرحبا " + name;',
        "console.log(greet('العالم'));",
        '',
      ].join('\n');
    }
    case 'python':
      return 'name = "العالم"\nprint("مرحبا " + name + "!")\n';
    case 'html':
      return '<!doctype html>\n<html lang="ar" dir="rtl">\n<head><meta charset="utf-8"><title>تجربة</title></head>\n<body>\n  <h1>مرحبا بالعالم</h1>\n  <p>عدّل هذا الكود واضغط تشغيل.</p>\n</body>\n</html>\n';
    case 'css':
      return 'body { font-family: system-ui; padding: 2rem; }\nh1 { color: #0ea5e9; }\n';
    case 'json':
      return '{\n  "name": "smart-code-lab",\n  "version": 1\n}\n';
    case 'markdown':
      return '# مذكرة\n\n- نقطة ١\n- نقطة ٢\n';
    case 'shell':
      return '#!/usr/bin/env bash\necho "مرحبا"\n';
    default:
      return '';
  }
}

function ensureUniqueIds(files: LabFile[]): LabFile[] {
  const used = new Set<string>();
  return files.map((f) => {
    let id = filenameToId(f.id || f.name);
    let n = 2;
    while (used.has(id)) id = `${id}-${n++}`;
    used.add(id);
    return { ...f, id };
  });
}
