# Latest Execution — RUN-2026-002

**Execution ID:** RUN-2026-002<br>
**Date:** 2026-10-11<br>
**Environment:** Linux sandbox; Node 22.22.3; npm 10.9.8; optimized Next.js production build; headless Chromium 153.0.8010.0.<br>
**Branch:** `arena/a2b184f1-aiproject-chai-aur-genai-token`; changes tested in working tree based on `0a1c115ba180dd62c46e9b2d189fdf97a1c7a193` and committed afterward.<br>
**Test suite:** 10 tokenizer unit tests; 11 Playwright E2E tests; lint, TypeScript, build, local Markdown links, full and production-only npm audits.

## Results

| Measure | Result |
| --- | ---: |
| Tokenizer module tests | 10 PASS, 0 FAIL |
| Chromium browser tests | 11 PASS, 0 FAIL |
| Lint / type-check / build / harness link check | 4 PASS |
| Full dependency audit | 1 audit command failed on five high dev/build advisory matches |
| Production-only audit | 1 PASS, zero findings |
| Blocked | 0 |
| Not run | Firefox/Safari-WebKit/Edge, true browser zoom, physical mobile browsers, full screen-reader/voice-control/tab-order review, manual contrast review, VAPT, hosted smoke/security headers, performance SLO testing |
| Not applicable | Custom API/database functional suites |

## Key findings

- Responsive sweep passed at 320, 375, 390, 425, 640, 768, 820, 1024, 1280, 1366, 1440, 1920 and 2560px; 844×390 landscape also passed. No measured horizontal overflow.
- 640px/320px are 200%/400% effective CSS-width proxies from 1280px, not actual browser zoom.
- axe-core ran at mobile/desktop × light/dark, with zero automated violations; color-contrast remained incomplete for 557–588 nodes per run.
- Performance sample: TTFB 8ms, DOMContentLoaded 241ms, load 396ms, LCP 864ms, CLS 0.000; four long tasks >50ms; no failed requests/page errors in the measured delayed/offline flow. No formal threshold; not graded.
- BUG-002, BUG-003 and BUG-004 were resolved with browser regressions. BUG-001 remains open for dev/build dependency advisories.
- Readiness: **READY WITH RISKS** for a Chromium-first demo; no cross-browser, WCAG certification or hosted production sign-off.

Full details: [`historical/RUN-2026-002.md`](../historical/RUN-2026-002.md), [`severity-ranked application audit`](../../reports/application-audit-RUN-2026-002.md), and raw [`evidence`](../../evidence/README.md).
