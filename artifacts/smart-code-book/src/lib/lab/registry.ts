import type { LanguageAdapter, LanguageId, RunOpts, RunResult, RunError, RunMessage } from './types';

/* ------------------------------------------------------------------
 * Adapter definitions — declared BEFORE the ADAPTERS map so each one
 * is fully initialized at the time the constant is evaluated.
 * ------------------------------------------------------------------ */

const javascriptAdapter: LanguageAdapter = buildAdapter({
  id: 'javascript',
  displayName: 'JavaScript',
  monacoLang: 'javascript',
  defaultFile: 'main.js',
  defaultCode: "console.log('مرحبا بالعالم');\n",
  executable: true,
  run: (opts) => runInSandbox(opts, ''),
});

const typescriptAdapter: LanguageAdapter = buildAdapter({
  id: 'typescript',
  displayName: 'TypeScript',
  monacoLang: 'typescript',
  defaultFile: 'main.ts',
  defaultCode: [
    'const greet = (name) => "مرحبا " + name;',
    "console.log(greet('العالم'));",
  ].join('\n'),
  executable: true,
  run: (opts) => {
    const stripped = stripTypescript(opts.activeFile.content);
    opts.onMessage({ level: 'system', text: 'تم تنفيذ TypeScript بعد إزالة الأنواع.', ts: Date.now() });
    return runInSandbox(opts, stripped);
  },
});

const htmlAdapter: LanguageAdapter = buildAdapter({
  id: 'html',
  displayName: 'HTML',
  monacoLang: 'html',
  defaultFile: 'index.html',
  defaultCode: [
    '<!doctype html>',
    '<html lang="ar" dir="rtl">',
    '<head><meta charset="utf-8"><title>تجربة</title></head>',
    '<body><h1>مرحبا بالعالم</h1></body>',
    '</html>',
  ].join('\n'),
  executable: true,
  run: async (opts) => runHtml(opts),
});

const cssAdapter: LanguageAdapter = buildAdapter({
  id: 'css',
  displayName: 'CSS',
  monacoLang: 'css',
  defaultFile: 'style.css',
  defaultCode: 'body { font-family: system-ui; padding: 2rem; background: #fafafa; }\nh1 { color: #0ea5e9; }\n',
  executable: false,
  run: async (opts) => {
    opts.onMessage({
      level: 'system',
      text: 'CSS وحده لا يُنفَّذ. أضف ملف index.html مع <link rel="stylesheet"> إلى هذا الـ CSS.',
      ts: Date.now(),
    });
    return emptyResult();
  },
});

const jsonAdapter: LanguageAdapter = buildAdapter({
  id: 'json',
  displayName: 'JSON',
  monacoLang: 'json',
  defaultFile: 'data.json',
  defaultCode: '{\n  "name": "smart-code-lab",\n  "version": 1\n}\n',
  executable: false,
  run: async (opts) => {
    try {
      JSON.parse(opts.activeFile.content);
      opts.onMessage({ level: 'result', text: 'JSON صالح — تم التحقق بنجاح.', ts: Date.now() });
      return { ok: true, outputs: [], errors: [], durationMs: 0 };
    } catch (e: unknown) {
      const err = errFromException(e);
      opts.onError(err);
      return { ok: false, outputs: [], errors: [err], durationMs: 0 };
    }
  },
});

const markdownAdapter: LanguageAdapter = buildAdapter({
  id: 'markdown',
  displayName: 'Markdown',
  monacoLang: 'markdown',
  defaultFile: 'README.md',
  defaultCode: '# مذكرة\n\n- نقطة ١\n- نقطة ٢\n',
  executable: false,
  run: async (opts) => {
    opts.onMessage({ level: 'system', text: 'Markdown — اضغط معاينة لعرضه.', ts: Date.now() });
    return emptyResult();
  },
});

const shellAdapter: LanguageAdapter = buildAdapter({
  id: 'shell',
  displayName: 'Shell',
  monacoLang: 'shell',
  defaultFile: 'main.sh',
  defaultCode: '#!/usr/bin/env bash\necho "مرحبا"\n',
  executable: false,
  run: async (opts) => {
    opts.onMessage({ level: 'system', text: 'Shell غير قابل للتنفيذ في المتصفح.', ts: Date.now() });
    return emptyResult();
  },
});

/* Python adapter is registered at runtime by pyodideLoader.ts. The
 * placeholder here is no-op; once Pyodide loads, registerPythonAdapter
 * replaces both `pythonAdapter` and ADAPTERS.python. */
export let pythonAdapter: LanguageAdapter = buildAdapter({
  id: 'python',
  displayName: 'Python',
  monacoLang: 'python',
  defaultFile: 'main.py',
  defaultCode: ['# py', 'name = "العالم"', 'print("مرحبا " + name)'].join('\n'),
  executable: true,
  run: (opts) => {
    opts.onError({ message: 'Pyodide لم يكتمل التحميل بعد.', hint: 'انتظر حتى يصبح المؤشر جاهزًا.' });
    return Promise.resolve(emptyResult());
  },
});

const ADAPTERS: Record<LanguageId, LanguageAdapter> = {
  javascript: javascriptAdapter,
  typescript: typescriptAdapter,
  html: htmlAdapter,
  css: cssAdapter,
  json: jsonAdapter,
  markdown: markdownAdapter,
  shell: shellAdapter,
  python: pythonAdapter,
};

/* ------------------------------------------------------------------
 * Public API
 * ------------------------------------------------------------------ */

export function getAdapter(language: LanguageId): LanguageAdapter {
  return ADAPTERS[language] ?? markdownAdapter;
}

export function getAllAdapters(): LanguageAdapter[] {
  return Object.values(ADAPTERS);
}

export function listLanguages(): LanguageId[] {
  return Object.keys(ADAPTERS) as LanguageId[];
}

export function getMonacoLang(language: LanguageId): string {
  return getAdapter(language).monacoLang;
}

export function setPythonAdapter(adapter: LanguageAdapter): void {
  pythonAdapter = adapter;
  ADAPTERS.python = adapter;
}

/* ------------------------------------------------------------------
 * Heuristics + helpers
 * ------------------------------------------------------------------ */

const HINTS: Array<[RegExp, string]> = [
  [/is not defined/i, 'تأكّد أنك أعلنت المتغيّر قبل استخدامه.'],
  [/Unexpected token/i, 'هناك رمز غير متوقّع — تحقّق من الأقواس والفواصل المنقوطة.'],
  [/Cannot find name/i, 'لم يتم العثور على المعرّف. هل هناك خطأ إملائي أو استيراد ناقص؟'],
  [/SyntaxError/i, 'خطأ في بناء الجملة — راجع الأقواس والفواصل.'],
  [/ReferenceError/i, 'مرجع غير موجود. تأكّد من تعريف المتغيّر أو الدالة.'],
  [/TypeError/i, 'النوع غير متطابق — ربما استدعيت دالة على شيء ليس دالة.'],
  [/IndentationError/i, 'مسافة بادئة غير صحيحة في Python — استخدم ٤ فراغات متساوية.'],
  [/ModuleNotFoundError/i, 'لم يتم العثور على الوحدة. تأكّد من اسمها ومن توفرها.'],
  [/Permission denied/i, 'لا يوجد إذن. السبب على الأرجح sandbox المتصفح.'],
  [/self is not defined/i, 'استخدم window بدل self داخل iframe sandbox.'],
];

export function suggestHint(message: string): string | undefined {
  for (const [re, hint] of HINTS) if (re.test(message)) return hint;
  return undefined;
}

function emptyResult(): RunResult {
  return { ok: true, outputs: [], errors: [], durationMs: 0 };
}

function buildAdapter(a: LanguageAdapter): LanguageAdapter {
  return a;
}

function errFromException(e: unknown, line?: number, column?: number): RunError {
  if (e instanceof Error) {
    return { message: e.message, line, column, stack: e.stack, hint: suggestHint(e.message) };
  }
  return { message: String(e), line, column, hint: suggestHint(String(e)) };
}

/* ------------------------------------------------------------------
 * Iframe sandbox runner (used by JS/TS, with optional margin) and a
 * single HTML runner.
 * ------------------------------------------------------------------ */

function runInSandbox(opts: RunOpts, code: string): Promise<RunResult> {
  const begin = performance.now();
  const outputs: RunMessage[] = [];
  const errors: RunError[] = [];
  if (typeof document === 'undefined') return Promise.resolve({ ok: false, outputs, errors, durationMs: 0 });
  return new Promise<RunResult>((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-scripts');
    iframe.style.cssText = 'position:fixed;left:-99999px;top:-99999px;width:1px;height:1px;border:0;';
    const shim = `
      <script>
        (function () {
          var send = function (level, args) {
            try {
              var text = args.map(function (a) {
                if (typeof a === 'string') return a;
                try { return JSON.stringify(a); } catch (e) { return String(a); }
              }).join(' ');
              parent.postMessage({ type: 'console', level: level, text: text, ts: Date.now() }, '*');
            } catch (e) {}
          };
          ['log','info','warn','error'].forEach(function (level) {
            var orig = console[level];
            console[level] = function () {
              send(level, Array.prototype.slice.call(arguments));
              try { return orig.apply(console, arguments); } catch (e) {}
            };
          });
          window.addEventListener('error', function (ev) {
            parent.postMessage({ type: 'error', text: ev.message || 'خطأ', line: ev.lineno, column: ev.colno, stack: ev.error && ev.error.stack }, '*');
          });
          window.addEventListener('unhandledrejection', function (ev) {
            var msg = (ev.reason && ev.reason.message) || String(ev.reason);
            parent.postMessage({ type: 'error', text: msg, stack: ev.reason && ev.reason.stack }, '*');
          });
        })();
      </script>`;
    iframe.srcdoc = '<!doctype html><html><head><meta charset="utf-8"></head><body>' + shim + '<script>\ntry {\n' + code + '\n} catch (e) { parent.postMessage({ type: "error", text: (e && e.message) || String(e), stack: e && e.stack }, "*"); }\n</script></body></html>';

    const handler = (ev: MessageEvent) => {
      if (ev.source !== iframe.contentWindow) return;
      const data = ev.data as { type?: string; level?: string; text?: string; line?: number; column?: number; stack?: string; ts?: number };
      if (!data || !data.type) return;
      if (data.type === 'console') {
        const msg: RunMessage = { level: (data.level as any) ?? 'log', text: String(data.text ?? ''), ts: data.ts ?? Date.now() };
        outputs.push(msg);
        opts.onMessage(msg);
      } else if (data.type === 'error') {
        const err: RunError = { message: String(data.text ?? ''), line: data.line, column: data.column, stack: data.stack, hint: suggestHint(String(data.text ?? '')) };
        errors.push(err);
        opts.onError(err);
      }
    };
    window.addEventListener('message', handler);

    const cleanup = () => {
      window.removeEventListener('message', handler);
      try { iframe.remove(); } catch { /* */ }
    };

    let timeout: ReturnType<typeof setTimeout> | undefined;
    const finish2 = (ok: boolean) => {
      if (timeout) clearTimeout(timeout);
      cleanup();
      resolve({ ok, outputs, errors, durationMs: performance.now() - begin });
    };
    if (opts.signal) opts.signal.addEventListener('abort', () => finish2(errors.length === 0), { once: true });

    iframe.addEventListener('load', () => { try { iframe.contentWindow?.postMessage({ type: 'ready' }, '*'); } catch { /* */ } });
    timeout = setTimeout(() => {
      opts.onMessage({ level: 'system', text: 'انتهى وقت التشغيل (10 ثوانٍ).', ts: Date.now() });
      finish2(errors.length === 0);
    }, 10_000);
    document.body.appendChild(iframe);
  });
}

function runHtml(opts: RunOpts): Promise<RunResult> {
  if (typeof document === 'undefined') return Promise.resolve({ ok: false, outputs: [], errors: [], durationMs: 0 });
  const begin = performance.now();
  const iframe = document.createElement('iframe');
  iframe.setAttribute('sandbox', 'allow-scripts');
  iframe.style.cssText = 'position:fixed;left:-99999px;top:-99999px;width:1px;height:1px;border:0;';
  iframe.srcdoc = opts.activeFile.content;
  return new Promise<RunResult>((resolve) => {
    iframe.addEventListener('load', () => {
      try { iframe.remove(); } catch { /* */ }
      opts.onMessage({ level: 'system', text: 'تم تشغيل صفحة HTML بنجاح.', ts: Date.now() });
      resolve({ ok: true, outputs: [], errors: [], durationMs: performance.now() - begin });
    });
    document.body.appendChild(iframe);
  });
}

/* ------------------------------------------------------------------
 * Minimal TypeScript → JavaScript type-stripping pass. Sized for the
 * teaching-style TS code in the Smart Code curriculum. Documented in
 * the lab README; for production-grade TS we can swap this for
 * `@swc/wasm-web` or the `typescript` package (lazy-loaded).
 * ------------------------------------------------------------------ */

function stripTypescript(src: string): string {
  let s = src;
  s = s.replace(/(^|\n)\s*interface\s+\w[^\n{]*\{[\s\S]*?\}\s*/g, '\n');
  s = s.replace(/(^|\n)\s*type\s+\w[^\n=]*=[^\n;]+;?/g, '\n');
  s = s.replace(/\s+as\s+[A-Za-z0-9_<>\[\]\|\& ,\."'`$]+/g, '');
  s = s.replace(/(\(|,)\s*([A-Za-z_$][\w$]*)\s*:\s*[^,()\n=]+(?=[,)])/g, '$1$2');
  s = s.replace(/\)\s*:\s*[A-Za-z0-9_<>\[\]\|\& ,\."'`$\n{]+\s*\{/g, ') {');
  s = s.replace(/\b([A-Za-z_$][\w$]*)<[^<>()\n]{1,80}>\(/g, '$1(');
  return s;
}
