# Test Tool Setup and Commands

## Prerequisites

- Install the repository's locked packages: `npm ci` (do not use a lockfile-changing install for a routine test run).
- Use the repository's Next-compatible Node version; no version file is checked in. Harness validation used Node 22.22.3/npm 10.9.8.
- No `.env` values, credentials, external API, database, browser driver or new dependency are required for tokenizer tests.

## Commands

```sh
npm ci
node harness/automation/scripts/run-tokenizer-tests.mjs
node harness/automation/scripts/verify-harness-links.mjs
npm run lint
npx tsc --noEmit
npm run build
npm audit
npm audit --omit=dev
```

`npm run start` requires a successful build and serves the production build. `npm run dev` is for interactive manual UI testing. Do not point tests at production user data.

## Tool records

### Node `node:test` + TypeScript compiler API

- **Purpose:** Unit-test the two tokenizer modules without adding Jest/Vitest/tsx.
- **Installation:** Already present as Node runtime (`node:test`) and project dev dependency (`typescript`).
- **Configuration:** `automation/scripts/run-tokenizer-tests.mjs` compiles only `src/lib/bpe.ts` and `src/tokenizer.ts` with strict TS settings to an OS temp directory; `automation/unit/tokenizer.test.mjs` runs through `node --test`.
- **How to run:** `node harness/automation/scripts/run-tokenizer-tests.mjs`.
- **Expected output:** TAP summary; 10 tests passing at current suite size (verify on every run).
- **Results stored:** Runner output can be captured at `evidence/logs/` and summarized in `test-results/`.
- **Known limitations:** No React/browser rendering, DOM, clipboard, download, CSS, or deployed HTTP test. Temporary compiler output is removed after completion.

### Harness Markdown link check

- **Purpose:** Verify relative links in harness Markdown point to existing files/directories.
- **Installation:** Node built-ins only.
- **Configuration:** `automation/scripts/verify-harness-links.mjs`.
- **How to run:** `node harness/automation/scripts/verify-harness-links.mjs`.
- **Expected output:** Verified link/document counts and exit 0; a broken local link exits 1.
- **Results:** [`RUN-2026-001-link-check.txt`](../evidence/logs/RUN-2026-001-link-check.txt).
- **Known limitations:** Checks target existence, not remote URL health, anchor IDs or prose correctness.

### Next.js lint/build/type check

- **Purpose:** ESLint, TypeScript validity and production compilation/prerender.
- **Installation/configuration:** `package.json`, `eslint.config.mjs`, `tsconfig.json`, `next.config.ts`.
- **How to run:** Commands above.
- **Expected output:** Exit code 0; build lists static `/` route.
- **Results:** RUN-2026-001 logs.
- **Known limitations:** Build success is not a browser/UI test, production security scan or deployment test.

### npm audit

- **Purpose:** Match resolved lockfile packages to npm advisories.
- **How to run:** `npm audit` and `npm audit --omit=dev` after clean install.
- **Expected output:** Exit 0 only when no reportable findings; exit 1 on current findings.
- **Results:** `evidence/logs/RUN-2026-001-npm-audit.txt`.
- **Known limitations:** Advisory matching is not VAPT and does not establish exploitability/applicability. Do not automatically apply breaking changes.

### Browser manual tools

- **Purpose:** UI, accessibility, privacy/network and performance scenarios.
- **Installation/configuration:** Use browser DevTools and a clean test profile against local `npm run dev` or built `npm run start`.
- **How to run:** Follow `test-scenarios/ui.md`, `performance.md` and `security.md`.
- **Expected output:** Record browser/version, viewport/preferences, actions, actual results and evidence.
- **Results:** None yet; these checks are NOT_EXECUTED.
- **Known limitations:** Supported browser matrix and performance/a11y acceptance thresholds are UNKNOWN / REQUIRES VALIDATION.
