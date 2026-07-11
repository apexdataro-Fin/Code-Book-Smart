import { useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { RunError } from '@/lib/lab/types';

/**
 * MobileErrorsSheet — full-screen errors view. Sticks to the bottom and
 * shows line numbers, hint, full stack. Each error is on its own card.
 */

interface MobileErrorsSheetProps {
  errors: RunError[];
  onClear?: () => void;
}

export function MobileErrorsSheet({ errors }: MobileErrorsSheetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = errors.map((e) => formatError(e)).join('\n\n');
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement('textarea'); ta.value = text;
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mobile-errors-sheet" dir="ltr">
      <div className="mobile-output-toolbar" dir="rtl">
        <span className="text-xs text-muted-foreground">{errors.length} خطأ</span>
        <button type="button" className="mobile-output-tool-btn" onClick={handleCopy} aria-label="نسخ">
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="mobile-errors-list" dir="rtl">
        {errors.length === 0 && (
          <div className="grid place-items-center h-full text-sm text-muted-foreground p-6 text-center">
            لا توجد أخطاء. اضغط ▶ تشغيل لبدء تجربة الكود.
          </div>
        )}
        {errors.map((e, i) => (
          <article key={i} className="mobile-error-card">
            <header className="flex items-center gap-2">
              <span className="text-rose-500 font-mono text-sm">⛔</span>
              <span className="font-bold text-rose-500 truncate">{e.message}</span>
            </header>
            {(e.line || e.column) && (
              <p className="text-xs text-muted-foreground mt-1">
                {e.line ? `السطر ${e.line}` : ''}{e.line && e.column ? ' · ' : ''}{e.column ? `العمود ${e.column}` : ''}
              </p>
            )}
            {e.hint && (
              <p className="mt-2 text-sm bg-amber-100/40 dark:bg-amber-500/10 text-amber-900 dark:text-amber-200 rounded p-2 border border-amber-500/30">
                💡 {e.hint}
              </p>
            )}
            {e.stack && (
              <details className="mt-2">
                <summary className="text-xs text-muted-foreground cursor-pointer">عرض المكدّس الكامل</summary>
                <pre className="text-[11px] mt-1 whitespace-pre-wrap break-all text-foreground/80" dir="ltr">{e.stack}</pre>
              </details>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

function formatError(e: RunError): string {
  let out = `[ERROR] ${e.message}`;
  if (e.line || e.column) out += ` @ line ${e.line ?? '?'}:${e.column ?? '?'}`;
  if (e.hint) out += `\nHINT: ${e.hint}`;
  if (e.stack) out += `\n${e.stack}`;
  return out;
}
