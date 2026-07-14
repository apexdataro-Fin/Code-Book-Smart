import { stage1PySeA } from './stage1PySE_a';
import { stage1PySeB } from './stage1PySE_b';
import { stage1PyDmB } from './stage1PyDM_b';
import { stage1PyCapstone } from './stage1PyCapstone';

/**
 * Smart Code — Python Expansion v1 (aggregator).
 *
 *   🆕 20 new lessons total (Sections A + B + C + D):
 *       - Section A       (Stage1PySE_b → 12 lessons, pyse-1..pyse-12)
 *       - Section B + C   (Stage1PyDmB  →  5 lessons, pydm-1..3 + pybr-1..2)
 *       - Section D       (Stage1PyCapstone → 3 lessons, pycap-1..pycap-3)
 *
 *   🆕 These are appended to stage-1 in `src/data/book.ts` (the only
 *      existing file touched in this expansion). Stage-1 itself stays
 *      untouched (no edits to its existing 5 units).
 *
 *   🆕 Source-of-truth for the Structural-content additions is:
 *      stage1PySE_a.ts + stage1PySE_b.ts + stage1PyDM_b.ts + stage1PyCapstone.ts.
 *      This file is just a re-export aggregator, kept tiny on purpose.
 */
export const stage1PythonSE = [
  ...stage1PySeA,
  ...stage1PySeB,
  ...stage1PyDmB,
  ...stage1PyCapstone,
];
