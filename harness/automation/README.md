# Automation

## What is automated

The checked-in project had no automated test framework or tests. This harness adds a small test runner for the core TypeScript tokenizers using the existing `typescript` package and Node's built-in `node:test` module; it adds no package dependency. It covers BPE vocabulary/training/encoding/decoding/edge behavior, vocabulary serialization, and the reference tokenizer's valid sample path.

There is no custom API or database to automate. React/browser workflows remain manual because Playwright/Cypress/Jest/Vitest are not installed and adding one is not justified by the current task.

## Run

From repository root, after `npm ci`:

```sh
node harness/automation/scripts/run-tokenizer-tests.mjs
node harness/automation/scripts/verify-harness-links.mjs
```

The runner compiles only `src/lib/bpe.ts` and `src/tokenizer.ts` into a temporary OS directory and deletes the directory on completion. It does not modify app source or generated files. Expected: 10 TAP tests pass; the actual recorded run is [`../test-results/historical/RUN-2026-001.md`](../test-results/historical/RUN-2026-001.md).

## Layout

- `scripts/run-tokenizer-tests.mjs` — compiler + Node test orchestration (`AUT-001`–`AUT-010`).
- `scripts/verify-harness-links.mjs` — dependency-free local Markdown link check (`AUT-016`).
- `unit/tokenizer.test.mjs` — `AUT-001`–`AUT-010`, linked to `TC-001`–`TC-010`.
- Command checks: `AUT-011` lint, `AUT-012` type-check, `AUT-013` production build, `AUT-014` full npm audit, `AUT-015` production-only npm audit.
- `api/`, `ui/`, `database/` automation is intentionally absent: no custom API/database and no browser framework. Add a tool only after a clear need and agreed maintenance owner.

## Maintenance rules

Keep tests deterministic, use synthetic fixtures in `../test-data/`, reference stable TC/AUT IDs, and record actual status/evidence. Do not alter application behavior merely to make tests pass; log a product defect and request scope if a source fix is needed.
