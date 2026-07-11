import { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';

/**
 * MobileOutputSheet — full-screen output view for phones.
 *
 *   - Large font (16 px monospace) so phone-screen readability is high.
 *   - Copy + clear buttons.
 *   - Auto-scroll to bottom when output grows.
 *   - Preserves newlines AND whitespace.
 */

interface MobileOutputSheetProps {
  text: string;
  title?: string;
}

export function MobileOutputSheet({ text, title }: MobileOutputSheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [text]);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(text ?? ''); }
    catch {
      const ta = document.createElement('textarea'); ta.value = text ?? '';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mobile-output-sheet" dir="ltr">
      <div className="mobile-output-toolbar" dir="rtl">
        <span className="text-xs text-muted-foreground">
          {title ?? 'خرج التشغيل'} — {text ? text.length : 0} حرف
        </span>
        <button type="button" className="mobile-output-tool-btn" onClick={handleCopy} aria-label="نسخ">
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div ref={ref} className="mobile-output-body mobile-output-body-mono">
        {!text && (
          <div className="grid place-items-center h-full text-sm text-muted-foreground p-6 text-center">
            لم يبدأ التشغيل بعد.
          </div>
        )}
        {text && <pre className="mobile-output-pre">{text}</pre>}
      </div>
    </div>
  );
}
