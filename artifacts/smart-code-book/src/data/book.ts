import { BookDef, UnitDef } from './types';
import { stage1 } from './stage1';
import { stage2 } from './stage2';
import { stage3 } from './stage3';
import { stage4 } from './stage4';
import { stage1PythonSE } from './stage1PythonSE';

export const book: BookDef = {
  title: "Smart Code",
  subtitle: "هندسة البرمجيات والبرمجة بمساعدة الذكاء الاصطناعي",
  version: "2026",
  author: "دليل شامل للمبتدئين في هندسة البرمجيات",
  stages: [
    // 🆕 Python Expansion v1 (feature/python-expansion-v1):
    //    Stage-1 gains 20 new units (pyse-1..pyse-12, pydm-1..3, pybr-1..2,
    //    pycap-1..3). Their unitNumbers are 100–142 (above the existing
    //    global 1–14 sequence) and ids prefixed to avoid clashes with
    //    stage-2..stage-4. The existing 5 units of stage-1 are untouched.
    { ...stage1, units: [...stage1.units, ...stage1PythonSE] },
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
