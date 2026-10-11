# UI Scenario — Browser interaction, responsive and accessibility sweep

## SCN-501 — Browser interaction and accessibility sweep

**Preconditions:** Run `npm run test:e2e` (builds the production app and starts it on port 4173). For manual follow-up, use a real browser and a clean profile.

The Playwright suite in `automation/e2e/playground.spec.mjs` executes Chromium checks for:

1. Requested widths from 320px through 2560px, including 640px zoom-equivalent layout widths, plus 844×390 mobile landscape; measure document/body overflow and header-control bounds; capture representative screenshots.
2. Hero reveal/typewriter behavior with motion enabled.
3. Mobile section navigation by keyboard and pointer, Escape/focus return, URL fragments/back/forward, and persisted theme.
4. Native touch emulation for the mobile menu, training speed control and vocabulary filter.
5. Training pause/speed persistence/empty-corpus edge behavior; encode/decode, exact round-trip messaging, clipboard IDs, shortcuts, markup-like input, Unicode/long text; vocabulary search/filter/copy/download/focus.
6. axe-core WCAG 2.2 AA tagged audits at mobile and desktop widths in light and dark themes.
7. Delayed static assets and offline client-side encoding, with performance observers and console/request failure checks.

**Latest result:** RUN-2026-002 executed all automated Chromium scenarios. See [`execution record`](../test-results/historical/RUN-2026-002.md), [`responsive geometry`](../evidence/logs/RUN-2026-002-responsive.json), [`accessibility`](../evidence/logs/RUN-2026-002-accessibility.json), [`performance`](../evidence/logs/RUN-2026-002-performance.json), and [screenshots](../evidence/screenshots/RUN-2026-002/).

**Coverage limitations:** Only bundled headless Chromium was used; Firefox, Safari/WebKit, Edge and physical devices were not available/exercised. The width=640 and 320 cases are zoom-equivalent effective-CSS-width proxies for 200%/400% zoom from a 1280px baseline, not true browser zoom. Full keyboard traversal, screen readers, manual contrast review, localStorage/clipboard denial and deployed-host behavior remain untested. Supported browser matrix and formal a11y target are UNKNOWN / REQUIRES VALIDATION.

**Cases:** TC-101–TC-108. Statuses are in [`UI test cases`](../test-cases/ui-playground/positive.md) and the RUN report; partial automation must not be called a complete manual-case pass.
