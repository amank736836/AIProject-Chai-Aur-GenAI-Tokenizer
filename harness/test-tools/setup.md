# Test Tool Setup and Commands

## Prerequisites

- Install the repository's locked packages: `npm ci`.
- Use the repository's Next-compatible Node version; no version file is checked in. RUN-2026-002 used Node 22.22.3 and npm 10.9.8.
- No `.env` values, credentials, external API or database are needed.
- Playwright E2E uses `@sparticuz/chromium` bundled from npm; no browser download or external browser driver install is required in this sandbox.

## Commands

```sh
npm ci
node harness/automation/scripts/run-tokenizer-tests.mjs
node harness/automation/scripts/verify-harness-links.mjs
npm run lint
npx tsc --noEmit
npm run test:e2e
npm audit
npm audit --omit=dev
```

`npm run test:e2e` builds the production app and runs Playwright using the production server at `http://127.0.0.1:4173`. It is Chromium-only; see `automation/e2e/` and `test-results/historical/RUN-2026-002.md`. Test traces/reports are stored under the ignored root `.playwright-results/` directory. `npm run start` serves a built app; a manual deployment smoke still requires an explicitly supplied host.

## Tool records

### Node `node:test` + TypeScript compiler API

- **Purpose:** Unit-test the tokenizer modules without Jest/Vitest/tsx.
- **How to run:** `node harness/automation/scripts/run-tokenizer-tests.mjs`.
- **Result:** 10/10 passed in RUN-2026-002.
- **Limitations:** Module-level checks only; does not cover React rendering, clipboard, downloads, CSS or browsers.

### Playwright + Sparticuz Chromium

- **Purpose:** Execute rendered behavior against the optimized production app, including the requested viewport sweep, native touch emulation, keyboard, theme persistence, user flows and delayed/offline assets.
- **How to run:** `npm run test:e2e`.
- **Configuration:** `automation/e2e/playwright.config.mjs`, `fixtures.mjs`, `playground.spec.mjs`.
- **Result:** 11/11 tests passed in RUN-2026-002 after the final verified run; see the run record and evidence logs.
- **Limitations:** Firefox, Safari/WebKit, Edge, physical devices, true desktop browser zoom, full screen-reader testing and manual color-contrast evaluation were not executed. Zoom-equivalent CSS viewport checks are explicitly proxies, not true zoom.

### axe-core

- **Purpose:** Automated WCAG-tagged issue detection on the whole rendered page.
- **Result:** RUN-2026-002 recorded zero violations in four audits: 390×844 light/dark and 1366×900 light/dark. Color-contrast produced incomplete/manual-review results; this is not a certification.

### Harness Markdown link check

- **Purpose:** Verify relative local Markdown link targets exist.
- **How to run:** `node harness/automation/scripts/verify-harness-links.mjs`.
- **Limitations:** Does not verify remote links, anchors or prose.

### Lint, type-check and build

- **Purpose:** Static checks and optimized production compilation.
- **How to run:** `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- **Limitations:** Build success is not browser, deployment or security sign-off.

### npm audit

- **Purpose:** Match resolved lockfile packages to npm advisories.
- **Result:** Full graph reported five high development/build dependency advisories; production-only audit reported zero findings in RUN-2026-002. See BUG-001 and the JSON evidence.
- **Limitations:** Advisory matching is not VAPT and does not establish exploitability. Do not automatically apply incompatible major-version changes.
