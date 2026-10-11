# Automation

## Automated layers

This harness now has two executable layers:

1. **Tokenizer module suite** — Node's built-in `node:test` compiles the BPE and word-level tokenizer modules into a temporary directory and runs 10 unit cases.
2. **Browser E2E suite** — Playwright runs against the optimized Next.js production build in bundled Chromium. It covers responsive widths, navigation, keyboard/touch, training, encoding edge cases, vocabulary search/export, axe-core audits, and delayed/offline client-side interaction.

No custom API or database exists in the app source, so no API/database suite is present.

## Run

From repository root after `npm ci`:

```sh
node harness/automation/scripts/run-tokenizer-tests.mjs
node harness/automation/scripts/verify-harness-links.mjs
npm run lint
npx tsc --noEmit
npm run test:e2e
```

`npm run test:e2e` first builds the optimized app, then invokes `@playwright/test` with `harness/automation/e2e/playwright.config.mjs`. The config starts the production server on port 4173. `@sparticuz/chromium` supplies Chromium and the Linux libraries needed in this sandbox; no separate browser download is required. The touch test uses an isolated mobile/touch-enabled Chromium context. Test output is placed in the root `.playwright-results/` directory and ignored by Git.

The suite is intentionally Chromium-only in this environment. Do not represent it as Firefox, Safari/WebKit, Edge, physical-device or true browser-zoom coverage. RUN-2026-002 also tests effective CSS viewport proxies for zoom, explicitly marked as proxies.

## Layout

- `scripts/run-tokenizer-tests.mjs` — compiler + Node test orchestration (`AUT-001`–`AUT-010`).
- `scripts/verify-harness-links.mjs` — dependency-free local Markdown link checker (`AUT-016`).
- `unit/tokenizer.test.mjs` — `AUT-001`–`AUT-010`, linked to `TC-001`–`TC-010`.
- `e2e/playground.spec.mjs` — `AUT-017` rendered production-page checks and evidence capture; `AUT-018` axe-core WCAG-tagged audit.
- `e2e/fixtures.mjs` — isolated headless Chromium and touch-enabled page fixtures.
- `e2e/playwright.config.mjs` — production server, viewport-independent base config, timeout and artifact directory.
- Command checks: `AUT-011` lint, `AUT-012` type-check, `AUT-013` production build, `AUT-014` full npm audit, `AUT-015` production-only npm audit, `AUT-016` harness link check.

## Evidence and limits

RUN-2026-002's raw logs, screenshots and findings are under `../evidence/`. Browser E2E proves only the assertions executed in Chromium. Screen-reader/manual color-contrast review, full keyboard-tab traversal, true browser zoom, cross-engine testing, performance budgets, VAPT and hosted deployment checks remain unverified. Preserve exact PASS/PARTIAL/NOT_EXECUTED states in the run record.
