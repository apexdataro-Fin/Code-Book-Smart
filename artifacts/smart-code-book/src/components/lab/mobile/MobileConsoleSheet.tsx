import { useEffect, useRef, useState } from 'react';
import { Copy, Trash2, Check } from 'lucide-react';
import type { RunMessage } from '@/lib/lab/types';
import { cn } from '@/lib/utils';

/**
 * MobileConsoleSheet — full-screen console view for phones.
 *
 *   - Auto-scrolls to the bottom when new messages arrive (user can
 *     scroll back up; auto-scroll resumes on the next message).
 *   - Copy-all button copies the entire buffer as a single string.
 *   - Clear button empties the buffer.
 *   - Large font (16–17 px) for legibility on small screens.
 *   - Timestamps on every line.
 */

interface MobileConsoleSheetProps {
  messages: RunMessage[];
  onClear: () => void;
}

export function MobileConsoleSheet({ messages, onClear }: MobileConsoleSheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef<boolean>(true);
  const [copied, setCopied] = useState(false);

  // Detect user scrolling up to disable auto-scroll until they scroll
  // back near the bottom again.
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const distFromBottom = el.scrollHeight - (el.scrollTop + el.clientHeight);
    stickToBottom.current = distFromBottom < 24;
  };

  useEffect(() => {
    if (!ref.current || !stickToBottom.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  const handleCopy = async () => {
    const text = messages.map((m) => `[${new Date(m.ts).toLocaleTimeString()}] ${m.text}`).join('\n');
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement('textarea'); ta.value = text;
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mobile-console-sheet" dir="ltr">
      <div className="mobile-output-toolbar" dir="rtl">
        <span className="text-xs text-muted-foreground">{messages.length} رسالة</span>
        <div className="flex items-center gap-1">
          <button type="button" className="mobile-output-tool-btn" onClick={handleCopy} aria-label="نسخ">
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <button type="button" className="mobile-output-tool-btn" onClick={onClear} aria-label="مسح">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div ref={ref} className="mobile-output-body" onScroll={onScroll}>
        {messages.length === 0 && (
          <div className="grid place-items-center h-full text-sm text-muted-foreground p-6 text-center">
            لا يوجد خرج بعد. اضغط ▶ تشغيل لرؤية النتائج هنا.
          </div>
        )}
        {messages.length > 0 && messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              'mobile-output-line',
              m.level === 'error' && 'mobile-output-line-error',
              m.level === 'warn' && 'mobile-output-line-warn',
              m.level === 'system' && 'mobile-output-line-system',
              m.level === 'result' && 'mobile-output-line-result',
            )}
          >
            <span className="mobile-output-time">[{new Date(m.ts).toLocaleTimeString()}]</span>
            <span className="mobile-output-text">{m.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
