import { setPythonAdapter } from './registry';
import type { LanguageAdapter, RunOpts, RunResult, RunError, RunMessage } from './types';

/**
 * Pyodide (browser-Python) singleton loader.
 *
 *   - Loads `pyodide.js` from the official jsdelivr CDN only on demand.
 *   - Cacheable: subsequent calls return the same Promise.
 *   - Status observable via `subscribePyodide` so the UI can show
 *     "Loading Python runtime…" then "Python ready".
 *   - Wired into the registry: once Pyodide is loaded, the python
 *     LanguageAdapter is replaced with one that executes code in
 *     `pyodide.runPythonAsync`.
 *
 * The Python runtime is loaded ONLY when the user enters a Python lab or
 * runs a Python file. The homepage bundle does NOT include Pyodide.
 */

const PYODIDE_VERSION = '0.26.2';
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

export type PyodideStatus = 'idle' | 'loading' | 'ready' | 'error';

interface PyodideState {
  status: PyodideStatus;
  progress: number; // 0..1
  message: string;
  pyodide: any | null;
  error: string | null;
}

const state: PyodideState = {
  status: 'idle',
  progress: 0,
  message: '',
  pyodide: null,
  error: null,
};

const subscribers = new Set<(s: PyodideState) => void>();

export function subscribePyodide(cb: (s: PyodideState) => void): () => void {
  subscribers.add(cb);
  cb(state);
  return () => subscribers.delete(cb);
}

function setState(patch: Partial<PyodideState>): void {
  Object.assign(state, patch);
  for (const cb of subscribers) {
    try { cb({ ...state }); } catch { /* ignore */ }
  }
}

export function pyodideStatus(): PyodideState {
  return { ...state };
}

let promise: Promise<any> | null = null;

/** Dynamically inject the Pyodide loader script (only once). */
function injectPyodideScript(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (typeof document === 'undefined') return reject(new Error('No document'));
    if (document.querySelector(`script[data-pyodide]`)) {
      // Already present — wait for globalThis.loadPyodide.
      const check = () => {
        if ((globalThis as any).loadPyodide) resolve();
        else setTimeout(check, 80);
      };
      check();
      return;
    }
    const script = document.createElement('script');
    script.src = PYODIDE_BASE + 'pyodide.js';
    script.async = true;
    script.defer = true;
    script.dataset.pyodide = '1';
    setState({ progress: 0.05, message: 'يتم جلب Pyodide…' });
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('فشل تحميل Pyodide من CDN.'));
    document.head.appendChild(script);
  });
}

/** Ensure Pyodide is loaded. Idempotent. */
export function loadPyodideSingleton(): Promise<any> {
  if (promise) return promise;
  promise = (async () => {
    setState({ status: 'loading', progress: 0, message: 'بدء تحميل بيئة Python…', error: null });
    try {
      await injectPyodideScript();
      setState({ progress: 0.4, message: 'يتم تشغيل WASM…' });
      const loadPyodide = (globalThis as any).loadPyodide;
      if (typeof loadPyodide !== 'function') throw new Error('globalThis.loadPyodide غير متوفر.');
      const py = await loadPyodide({
        indexURL: PYODIDE_BASE,
        fullStdLib: true,
      });
      setState({ progress: 0.95, message: 'يتم تسجيل adapter Python…' });
      registerPythonAdapter(py);
      setState({ status: 'ready', progress: 1, message: 'Python جاهز', pyodide: py, error: null });
      return py;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setState({ status: 'error', error: msg, message: msg, pyodide: null });
      throw e;
    }
  })();
  return promise;
}

/** Build the real Python adapter using the loaded Pyodide. */
function registerPythonAdapter(py: any): void {
  const adapter: LanguageAdapter = {
    id: 'python',
    displayName: 'Python',
    monacoLang: 'python',
    defaultFile: 'main.py',
    defaultCode: `# py\nname = "العالم"\nprint(f"مرحبا {name}")\n`,
    executable: true,
    async run(opts: RunOpts): Promise<RunResult> {
      const begin = performance.now();
      const outputs: RunMessage[] = [];
      const errors: RunError[] = [];
      const pushOut = (text: string, level: RunMessage['level']) => {
        const msg: RunMessage = { level, text, ts: Date.now() };
        outputs.push(msg);
        opts.onMessage(msg);
      };
      try {
        py.setStdout({
          batched: (s: string) => pushOut(s, 'log'),
        });
        py.setStderr({
          batched: (s: string) => pushOut(s, 'error'),
        });
      } catch {
        /* older Pyodide API */
      }
      try {
        await py.runPythonAsync(opts.activeFile.content);
      } catch (e: unknown) {
        const err = errFromPyodide(e);
        errors.push(err);
        opts.onError(err);
      }
      return {
        ok: errors.length === 0,
        outputs,
        errors,
        durationMs: performance.now() - begin,
      };
    },
  };
  setPythonAdapter(adapter);
}

function errFromPyodide(e: unknown): RunError {
  // Pyodide throws Python exceptions which have `.message` like
  //   "Traceback (most recent call last):\n  File ...<line N>"
  let message = e instanceof Error ? e.message : String(e);
  let line: number | undefined;
  const m = /File "<string>", line (\d+)/.exec(message);
  if (m) line = parseInt(m[1], 10);
  // Hint mapping for common Python errors.
  let hint: string | undefined;
  if (/SyntaxError/i.test(message)) hint = 'راجع المسافات البادئة والأقواس والفواصل.';
  else if (/NameError/i.test(message)) hint = 'تأكّد أنك كتبت اسم المتغيّر بشكل صحيح.';
  else if (/IndentationError/i.test(message)) hint = 'استخدم ٤ فراغات متساوية.';
  else if (/ZeroDivisionError/i.test(message)) hint = 'لا يمكن القسمة على صفر.';
  else if (/TypeError/i.test(message)) hint = 'النوع غير متطابق — راجع توقيع الدالة.';
  return { message, line, stack: message, hint };
}
