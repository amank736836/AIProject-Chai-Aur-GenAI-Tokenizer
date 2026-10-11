# Testing Status — RUN-2026-002

**Last verified:** 2026-10-11<br>
**Execution:** [`RUN-2026-002`](test-results/historical/RUN-2026-002.md)<br>
**Commit basis:** `0a1c115ba180dd62c46e9b2d189fdf97a1c7a193`; the audited working-tree changes were later committed on the session branch.<br>
**Environment:** Node 22.22.3, npm 10.9.8, Linux sandbox; Playwright headless Chromium 153.0.8010.0 against the optimized local production build.

## Results at a glance

| Check | Result | Evidence |
| --- | --- | --- |
| Tokenizer unit tests | 10/10 PASS | [`RUN-2026-002-tokenizer-tests.txt`](evidence/logs/RUN-2026-002-tokenizer-tests.txt) |
| Harness Markdown links | PASS; 233 local links across 100 docs | [`RUN-2026-002-link-check.txt`](evidence/logs/RUN-2026-002-link-check.txt) |
| `npm run lint` | PASS | [`RUN-2026-002-lint.txt`](evidence/logs/RUN-2026-002-lint.txt) |
| `npx tsc --noEmit` | PASS | [`RUN-2026-002-typecheck.txt`](evidence/logs/RUN-2026-002-typecheck.txt) |
| Production build | PASS; `/` and `/_not-found` statically prerendered | [`RUN-2026-002-playwright.txt`](evidence/logs/RUN-2026-002-playwright.txt) |
| Chromium browser UI | 11/11 E2E tests PASS | Same Playwright log; details in [audit report](reports/application-audit-RUN-2026-002.md) |
| Full dependency audit | FAIL: 5 high advisory matches, all development/build tooling | [full JSON](evidence/logs/RUN-2026-002-npm-audit-full.json) |
| Production-only dependency audit | PASS: 0 findings | [production JSON](evidence/logs/RUN-2026-002-npm-audit-production.json) |
| Performance sample | Measured once; no SLO/threshold, not graded | [`RUN-2026-002-performance.json`](evidence/logs/RUN-2026-002-performance.json) |
| API/database/VAPT | API/database not applicable; VAPT not executed | Architecture and security scenario |

## Browser scope

Only Chromium 153.0.8010.0 was run. Tested widths were 320, 375, 390, 425, 640, 768, 820, 1024, 1280, 1366, 1440, 1920 and 2560px, plus 844×390 landscape. 640px and 320px are zoom-equivalent CSS-width proxies only; no true browser zoom was applied. Firefox, Safari/WebKit, Edge, physical devices, screen readers and voice control were not tested. Four axe-core audits reported zero violations but left color contrast incomplete for hundreds of nodes; manual review remains outstanding.

## Current issue state

- **Open:** [BUG-001](bugs/open/BUG-001.md) — five high advisory matches in development/build dependency tooling. Production-only audit is clean; a compatible owner-approved mitigation or risk acceptance is pending.
- **Resolved and browser-regressed:** [BUG-002](bugs/resolved/BUG-002.md) exact round-trip wording; [BUG-003](bugs/resolved/BUG-003.md) tilted-card pointer hit-testing; [BUG-004](bugs/resolved/BUG-004.md) theme initialization with blocked localStorage.
- **Readiness:** READY WITH RISKS for a Chromium-first demo; not cross-browser, formal accessibility or production-deployment certification. See [release readiness](reports/release-readiness.md) and the [severity-ranked report](reports/application-audit-RUN-2026-002.md).

A successful build or automated axe result is not by itself a deployment or WCAG-conformance sign-off. API/database checks are not applicable to the current client-only architecture.
