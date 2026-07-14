# Contributing to Smart Code

> **Read the audit first.** This repo was reorganized after the
> **2026 audit remediation pass**. Anyone touching curriculum content
> should read `artifacts/smart-code-book/AUDIT_NOTES.md` (if present)
> or the most recent commit message on `main` before opening a PR.

## Repository layout

This is a **pnpm workspace monorepo**.

```
/
├── artifacts/
│   ├── smart-code-book/   ← the educational platform (React + Vite + Tailwind)
│   ├── api-server/        ← Express 5 + Drizzle/Postgres backend
│   └── mockup-sandbox/    ← DEPRECATED Replit canvas prototype, see
│                             artifacts/mockup-sandbox/DEPRECATED.md
├── lib/                   ← shared packages (db, api-client, api-zod)
├── scripts/               ← one-off CLI helpers
├── attached_assets/       ← historical reference files (do not commit new ones)
├── package.json           ← workspace-wide scripts only; no app code here
├── pnpm-workspace.yaml
└── tsconfig.base.json     ← shared TS options; do not loosen without
                              running `pnpm run typecheck`
```

## Workflow for adding or changing curriculum content

1. **All content lives in TypeScript**, not in a `.docx`.
   - `artifacts/smart-code-book/src/data/stage1.ts` … `stage4.ts`
   - `capstone.ts`, `appendix.ts`, `prompts.ts`
   - `book.ts` is the registry that wires them together.
2. The Word export is *derived* from this data via
   `src/lib/docxExport.ts → downloadDocx()` — the file it generates is
   called **`Smart-Code-Book-2026.docx`** by design. Do not edit the
   filename, document event IDs, or callout colors casually; the export
   pipeline is the agreement your Markdown editor or downstream tooling
   depends on.
3. Unit `id`s and `unitNumber`s must remain unique across all stages.
   - The TOC and prev/next navigation in `UnitPage.tsx` rely on this.
   - The Curriculum Learning dashboard (Sidebar progress bar) relies
     on `localStorage["smart_code_progress"]` which stores unit **ids**.
4. Code blocks are syntax-highlighted by Prism. Supported languages
   are registered in `CodeBlock.tsx`. **Add your language there** if
   you need a new one, and respect the RTL safeguards:
   - The wrapper element **must keep** `dir="ltr"` and
     `style={{ unicodeBidi: 'isolate' }}`. Without these, Arabic
     comments inside code blocks render flipped digits.
5. Bilingual content rules:
   - Long Arabic paragraphs that mix embedded Latin technical terms
     inherit `unicode-bidi: isolate` from the `.prose` rules in
     `index.css`. Do not strip this — it kills digit order in
     expressions like "O(n)".
   - Tables are exported as `visuallyRightToLeft: true` on the DOCX
     table wrapper. Preserve this when editing `docxExport.ts`.

## Running locally

The workspace expects Node 24 and pnpm 10.

```bash
pnpm install
pnpm run typecheck                  # all packages
pnpm --filter @workspace/api-server run dev   # port 5000
pnpm --filter @workspace/smart-code-book run dev
```

`pnpm install` does **not** happen automatically during CI; the
post-merge hook lives in `scripts/post-merge.sh`.

## Commit messages

We follow **Conventional Commits**.

| Type | Use for |
|---|---|
| `feat(book)` | New unit, lesson, exercise, prompt, or cover content |
| `fix(book)` | Rendering, RTL, or DOCX export defect |
| `chore(api-server)` | Backend-only changes |
| `chore(workspace)` | Dependency, build, TS-config, or pnpm-workspace changes |
| `docs` | CONTRIBUTING, README, DEPRECATED, replit notes |

Pedagogical content changes **must** reference the unit id they
affect, e.g. `feat(book): unit-7 — add Sliding Window example`.

## Things we do **not** accept

- Adding new runtime dependencies to `smart-code-book/` without
  confirming the bundle cost (Cairo + JetBrains Mono + Prism are
  already loaded).
- Stripping the `unicode-bidi: isolate` rules.
- Reintroducing the `Smart-Code-Backend-Engineering-2026.docx`
  filename (we standardized on `Smart-Code-Book-2026.docx`).
- Reverting the comparison-tour callouts in `stage2.ts`. Java is
  intentionally framed as a comparative walkthrough, not a primary
  track.

## Reporting issues

Please include:

1. The exact route (`/stage/stage-2/unit/unit-7` etc.) and a
   screenshot (or text dump of the rendered HTML if the bug is in the
   DOCX export).
2. Your browser, OS, and whether dark mode is enabled.
3. Whether the bug shows up in the Word export too — that picks
   between a React fix and a `docxExport.ts` fix.
