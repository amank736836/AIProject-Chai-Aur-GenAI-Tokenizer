# Smoke Scenarios

## SCN-001 — Type-check, lint and production-build smoke

**Purpose:** Verify the checked-in app and tokenizer modules remain statically valid and Next.js can build/prerender the app.  
**Preconditions:** Node/npm installed; dependencies installed from lockfile with `npm ci`.  
**Steps:**
1. Run `npm run lint`.
2. Run `npx tsc --noEmit`.
3. Run `npm run build`.
4. Confirm Next.js reports `/` as a static route and build exits 0.
5. Run `node harness/automation/scripts/run-tokenizer-tests.mjs`.
6. Run `node harness/automation/scripts/verify-harness-links.mjs`.

**Expected:** All checks exit 0; root page is generated; core tests pass.  
**Latest result:** Tokenizer tests, local Markdown-link validation, lint, type-check and build passed in RUN-2026-001. See [`latest execution`](../test-results/latest/execution.md). The build is not a real-browser UI test.

Optional deployment smoke after a target host is identified: GET `/`, verify a successful HTML response, main landmark and section anchors, then record host/environment. No deployed environment is configured in this harness.
