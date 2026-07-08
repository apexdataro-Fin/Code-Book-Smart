import { BookDef, UnitDef } from './types';
import { stage1 } from './stage1';
import { stage2 } from './stage2';
import { stage3 } from './stage3';
import { stage4 } from './stage4';

export const book: BookDef = {
  title: "Smart Code",
  subtitle: "هندسة البرمجيات والبرمجة بمساعدة الذكاء الاصطناعي",
  version: "2026",
  author: "دليل شامل للمبتدئين في هندسة البرمجيات",
  stages: [
    stage1,
    stage2,
    stage3,
    stage4
  ]
};

export function getUnit(stageId: string, unitId: string): UnitDef | undefined {
  const stage = book.stages.find(s => s.id === stageId);
  if (!stage) return undefined;
  return stage.units.find(u => u.id === unitId);
}
