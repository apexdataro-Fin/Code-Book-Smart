import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-docker';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  content: string;
  title?: string;
}

export function CodeBlock({ language, content, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [content, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // P0 fix: `unicode-bidi: isolate` on the OUTER wrapper means an
    // embedded bidi run inside the code block cannot leak into the RTL
    // page direction and accidentally reverse Latin identifiers. We keep
    // `dir="ltr"` so Prism's token spans lay out left-to-right as designed.
    <div
      className="my-6 rounded-lg overflow-hidden border border-border bg-[#1d1f21] no-print-bg shadow-sm"
      dir="ltr"
      style={{ unicodeBidi: 'isolate' }}
    >
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/10 text-white/80 text-xs font-mono">
          <span>{title || language}</span>
          <button
            onClick={handleCopy}
            className="hover:text-white transition-colors"
            title="نسخ الكود"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      )}
      {/* P2 fix: iPhone-sized screens need touch-friendly horizontal scroll
          and a visible scrollbar cue. `-webkit-overflow-scrolling: touch`
          gives momentum on iOS, thin scrollbar keeps it unobtrusive. */}
      <div
        className="p-4 overflow-x-auto text-sm font-mono text-left"
        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin' }}
      >
        <pre className={`language-${language} !m-0 !p-0 !bg-transparent`}>
          <code className={`language-${language}`}>{content}</code>
        </pre>
      </div>
    </div>
  );
}
