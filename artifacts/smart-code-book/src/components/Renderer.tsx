import React, { useState } from 'react';
import { ContentNode } from '@/data/types';
import { CodeBlock } from './ui/CodeBlock';
import { Callout } from './ui/Callout';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function ContentRenderer({ nodes }: { nodes: ContentNode[] }) {
  return (
    <div className="space-y-4">
      {nodes.map((node, i) => <NodeRenderer key={i} node={node} />)}
    </div>
  );
}

function NodeRenderer({ node }: { node: ContentNode }) {
  switch (node.type) {
    case 'h1':
      return <h1 className="text-3xl font-bold mt-8 mb-4 text-primary">{node.content}</h1>;
    case 'h2':
      return <h2 className="text-2xl font-bold mt-8 mb-4 border-b border-border pb-2">{node.content}</h2>;
    case 'h3':
      return <h3 className="text-xl font-bold mt-6 mb-3 text-secondary">{node.content}</h3>;
    case 'h4':
      return <h4 className="text-lg font-bold mt-4 mb-2">{node.content}</h4>;
    case 'p':
      return <p className="text-base leading-relaxed text-foreground/80 mb-4 whitespace-pre-wrap">{node.content}</p>;
    case 'ascii':
      return (
        <div className="my-6 p-4 rounded-lg bg-muted text-muted-foreground font-mono text-sm overflow-x-auto whitespace-pre border border-border" dir="ltr">
          {node.content}
        </div>
      );
    case 'code':
      return <CodeBlock language={node.language} content={node.content} title={node.title} />;
    case 'callout':
      return (
        <Callout type={node.calloutType} title={node.title}>
          <ContentRenderer nodes={node.content} />
        </Callout>
      );
    case 'ul':
      return (
        <ul className="list-disc list-outside ms-6 mb-4 space-y-2 text-foreground/80">
          {node.items.map((item, i) => (
            <li key={i}>
              <ContentRenderer nodes={item} />
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="list-decimal list-outside ms-6 mb-4 space-y-2 text-foreground/80">
          {node.items.map((item, i) => (
            <li key={i}>
              <ContentRenderer nodes={item} />
            </li>
          ))}
        </ol>
      );
    case 'table':
      return (
        <div className="overflow-x-auto my-6 border border-border rounded-lg">
          <table className="w-full text-sm text-right">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                {node.headers.map((h, i) => <th key={i} className="px-6 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {node.rows.map((row, i) => (
                <tr key={i} className="bg-card border-b border-border last:border-0 hover:bg-muted/30">
                  {row.map((cell, j) => <td key={j} className="px-6 py-4">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'project':
      return (
        <div className="my-8 rounded-xl border border-primary/20 bg-primary/5 overflow-hidden">
          <div className="bg-primary/10 px-6 py-4 border-b border-primary/20 font-bold text-primary flex items-center gap-2">
            <span className="text-xl">🚀</span> مشروع عملي: {node.title}
          </div>
          <div className="p-6">
            <ContentRenderer nodes={node.content} />
          </div>
        </div>
      );
    case 'active-recall':
      return <ActiveRecall questions={node.questions} />;
    default:
      return null;
  }
}

function ActiveRecall({ questions }: { questions: { q: string; a: string }[] }) {
  return (
    <div className="my-8 border-2 border-secondary/30 rounded-xl overflow-hidden">
      <div className="bg-secondary/10 px-6 py-4 border-b border-secondary/30 font-bold text-secondary-foreground flex items-center gap-2">
        <span className="text-xl">🧠</span> المراجعة النشطة (Active Recall)
      </div>
      <div className="p-0">
        {questions.map((q, i) => (
          <ActiveRecallItem key={i} q={q.q} a={q.a} isLast={i === questions.length - 1} />
        ))}
      </div>
    </div>
  );
}

function ActiveRecallItem({ q, a, isLast }: { q: string; a: string; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-border/50 ${isLast ? 'border-0' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <span className="font-semibold">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-6 pb-4 pt-1 text-muted-foreground bg-muted/20 whitespace-pre-wrap">
          {a}
        </div>
      )}
    </div>
  );
}
