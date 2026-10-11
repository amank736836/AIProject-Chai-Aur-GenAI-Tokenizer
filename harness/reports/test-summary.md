# Test Summary — RUN-2026-002

**Date:** 2026-10-11<br>
**Commit basis:** `0a1c115ba180dd62c46e9b2d189fdf97a1c7a193`; audited changes were in the working tree on the session branch and later committed for the PR.<br>
**Environment:** Linux sandbox; Node 22.22.3, npm 10.9.8; headless Chromium 153.0.8010.0 against the optimized local production build.

## Summary

- Tokenizer module tests: **10 passed, 0 failed**.
- Chromium browser tests: **11 passed, 0 failed**; included the full requested viewport sweep, mobile landscape, keyboard/touch, training/encode/vocabulary workflows, accessibility audits and offline interaction.
- Lint, TypeScript, production build and local Markdown-link validation: **all passed**. Link check verified 233 links across 100 harness documents.
- Full npm audit: **FAIL** — five high advisory matches in development/build tooling, no critical/moderate/low. Production-only audit: **PASS** — zero findings.
- axe-core: **0 violations** in four WCAG-tagged mobile/desktop light/dark runs; color-contrast remained incomplete for hundreds of nodes.
- Performance: one descriptive local sample recorded; no formal SLO/device profile, so not graded.
- API/database tests: not applicable to the current source. VAPT and deployed-host checks: not executed.

## Recommendation

**READY WITH RISKS for a Chromium-first demo; not a cross-browser, accessibility-conformance or deployment sign-off.** Confirm a compatible resolution/acceptance for BUG-001's development dependency findings. Before broad release, execute Firefox/WebKit/Edge, true browser zoom, manual screen-reader/contrast review and representative performance/deployment checks.

Detailed evidence and limitation notes: [`RUN-2026-002`](../test-results/historical/RUN-2026-002.md), [severity-ranked audit report](application-audit-RUN-2026-002.md), and [`evidence/logs/`](../evidence/README.md).
