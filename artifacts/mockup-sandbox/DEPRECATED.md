# mockup-sandbox — DEPRECATED

> **Status:** Deprecated as of the **2026 audit remediation pass**.
> Do **not** add new features to this package. It is kept in the monorepo
> only because some agents and screenshots in `attached_assets/` reference
> it historically. Migration target: tear out and move to a dedicated
> repo in a follow-up repository-splitting task.

## Why it is here
- `mockup-sandbox` was an early prototype of a Replit-style canvas where
  the Smart Code book content could be sketched before being committed
  to the structured TS data registry
  (`artifacts/smart-code-book/src/data/*`).
- The real curriculum authoring path is now `book.ts → stage*.ts →
  Renderer.tsx`, which is what `downloadDocx()` also serializes.
- The Replit canvas (`@replit/vite-plugin-cartographer` etc.) is no
  longer the Smart Code platform.

## What to do with it
1. If you need the canvas for a separate experiment, fork it into its
   own repo so it does not interfere with `pnpm install` on the main
   workspace.
2. If you are a future maintainer and want to clean up: delete
   `artifacts/mockup-sandbox/`, remove its entry from
   `pnpm-workspace.yaml`, and prune the workaround in
   `scripts/post-merge.sh` if any.
3. Until then, leave it alone.

## Non-blocking for the Smart Code book
None of the audited routes (`/`, `/intro`, `/toc`,
`/stage/:stageId/unit/:unitId`, `/appendix`, `/prompts`, `/capstone`)
import from `mockup-sandbox`. The book renders independently of it.
