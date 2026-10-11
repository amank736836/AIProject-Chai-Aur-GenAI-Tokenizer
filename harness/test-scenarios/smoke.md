# Smoke Scenarios

## SCN-001 — Static checks, production build and Chromium browser smoke

**Purpose:** Check source/type validity, build the production page, exercise its rendered flows in Chromium, and validate harness links.<br>
**Preconditions:** Node/npm installed; dependencies installed from lockfile with `npm ci`.

1. Run `npm run lint`.
2. Run `npx tsc --noEmit`.
3. Run `node harness/automation/scripts/run-tokenizer-tests.mjs`.
4. Run `node harness/automation/scripts/verify-harness-links.mjs`.
5. Run `npm run test:e2e` (includes `npm run build` and Playwright production-server tests).
6. Run `npm audit` and `npm audit --omit=dev`; retain both results.

**Latest result:** RUN-2026-002 lint, type-check, 10 tokenizer tests, production build, Chromium browser suite, link check and production-only audit passed. The full dependency audit exited 1 with five high advisory matches in development/build tooling. See [`latest execution`](../test-results/latest/execution.md) and the [audit report](../reports/application-audit-RUN-2026-002.md).

The build/browser checks do not prove hosted deployment health. Optional deployment smoke after a target host is identified: GET `/`, verify successful HTML response, main landmark and section anchors, then record host/environment. No deployed environment is configured in this harness.
