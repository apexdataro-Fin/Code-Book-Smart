export type CalloutType = 'note' | 'warning' | 'best-practice' | 'ai-tip' | 'mistake';

export type ContentNode =
  | { type: 'h1' | 'h2' | 'h3' | 'h4'; content: string }
  | { type: 'p'; content: string }
  | { type: 'ascii'; content: string }
  | { type: 'code'; language: string; content: string; title?: string }
  | { type: 'callout'; calloutType: CalloutType; title?: string; content: ContentNode[] }
  | { type: 'ul' | 'ol'; items: ContentNode[][] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'project'; title: string; content: ContentNode[] }
  | { type: 'active-recall'; questions: { q: string; a: string }[] };

export interface UnitDef {
  id: string;
  stageId: string;
  unitNumber: number;
  title: string;
  description: string;
  content: ContentNode[];
}

export interface StageDef {
  id: string;
  stageNumber: number;
  title: string;
  units: UnitDef[];
}

export interface BookDef {
  title: string;
  subtitle: string;
  version: string;
  author: string;
  stages: StageDef[];
}
