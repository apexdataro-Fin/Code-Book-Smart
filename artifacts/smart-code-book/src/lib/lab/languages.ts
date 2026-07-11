import type { LanguageId } from '@/lib/lab/types';

const DISPLAY: Record<LanguageId, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  html: 'HTML',
  css: 'CSS',
  json: 'JSON',
  markdown: 'Markdown',
  shell: 'Shell',
  python: 'Python',
};

/** Returns the human-readable language display name (Arabic-friendly). */
export function getLanguageDisplay(language: LanguageId): string {
  return DISPLAY[language] ?? language;
}

/** Map CodeBlock's free-form language string into a Lab LanguageId. */
export function mapCodeLanguageToLab(lang: string): LanguageId {
  const l = (lang ?? '').toLowerCase().trim();
  if (l === 'js' || l === 'javascript') return 'javascript';
  if (l === 'ts' || l === 'typescript' || l === 'tsx') return 'typescript';
  if (l === 'html' || l === 'htm' || l === 'xml') return 'html';
  if (l === 'css' || l === 'scss') return 'css';
  if (l === 'json') return 'json';
  if (l === 'md' || l === 'markdown') return 'markdown';
  if (l === 'bash' || l === 'sh' || l === 'shell') return 'shell';
  if (l === 'py' || l === 'python') return 'python';
  return 'javascript';
}
