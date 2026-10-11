# Test Coverage — RUN-2026-002

Counts below are inventory-based, not source-line coverage. No code-coverage tool/report is configured. Status means only the named evidence was executed; partial UI case automation is not a full manual-case pass.

## Feature and requirement coverage

| Measure | Count / status | Notes |
| --- | ---: | --- |
| Features identified/documented | 5 / 5 | FEAT-001–FEAT-005 |
| Features with module-level automated coverage | 4 / 5 | BPE training, encode/decode, vocabulary data, reference-tokenizer core; presentation is browser-tested rather than a pure module. |
| Features with direct browser assertions | 4 / 5 | FEAT-001, FEAT-002, FEAT-003 and FEAT-005; reference-demo visuals were not independently asserted. |
| Functional requirements identified | 9 | REQ-001–REQ-009 |
| Requirements with at least one executed module/build/browser check | 9/9 | REQ-007 has core reference-tokenizer module evidence; its displayed baseline values remain unverified. Several other requirements have only partial browser assertions. See traceability. |
| Non-functional requirement IDs | 8 | NFR-001–NFR-008; thresholds/host policies remain unknown where noted. |
| Business-rule IDs | 8 | BR-001–BR-008 |

“Linked” is not synonymous with complete acceptance or release approval.

## Test-case coverage

| Measure | Count / status |
| --- | ---: |
| Defined test cases | 18: TC-001–TC-010 and TC-101–TC-108 |
| Tokenizer cases | 10/10 PASS, RUN-2026-002 |
| Browser case records | 2 PASS (TC-106/TC-108); 6 PARTIAL (TC-101–TC-105/TC-107) |
| Playwright test functions | 11/11 PASS, Chromium 153.0.8010.0 |
| axe-core audits | 4 runs; 0 automated violations in each; color-contrast incomplete |
| Unexecuted cross-engine/true-zoom checks | Firefox, Safari/WebKit, Edge, physical devices and actual browser zoom |

The six PARTIAL UI cases have meaningful executed subsets; see `test-cases/ui-playground/` for exact assertions/gaps.

## Automation, API, UI, database and non-functional coverage

- **Automation:** 10 Node unit cases (AUT-001–AUT-010); lint (AUT-011), type-check (AUT-012), build (AUT-013), full/production npm audits (AUT-014/AUT-015), link check (AUT-016), 11 Playwright tests (AUT-017) and four axe-core audits (AUT-018) actually executed. Lint/type/build/unit/link pass; production audit passes with zero findings; full audit exits 1 on five high dev/build advisory matches.
- **Responsive/UI:** tested 13 widths (320, 375, 390, 425, 640, 768, 820, 1024, 1280, 1366, 1440, 1920, 2560px), plus 844×390 landscape; measured zero horizontal overflow and header controls within bounds. True browser zoom was NOT_EXECUTED; 640/320 widths are proxies only.
- **Accessibility:** axe-core tagged WCAG 2.0 A/AA, 2.1 A/AA and 2.2 AA: four viewport/theme runs, 0 violations; hundreds of color-contrast nodes remained incomplete. Manual contrast, screen-reader, voice-control and full tab-order checks are NOT_EXECUTED.
- **Performance/stability:** one local production sample with 120ms static-asset delay and an offline interaction; CLS 0, LCP 864ms, four >50ms long tasks, zero failed requests/page errors. No SLA/device benchmark; status NOT GRADED.
- **API:** Not applicable to the current source; no custom API. Hosted root-page deployment smoke is unexecuted.
- **Database:** Not applicable; no database/schema/migration exists.
- **Security:** markup-like input inertness passed in Chromium; npm audit full failed on development/build advisories, production-only audit passed. Full VAPT and deployment-header review NOT_EXECUTED.
- **Browser matrix:** Chromium only. Firefox, Safari/WebKit and Edge remain NOT_EXECUTED.

No source-code coverage percentage is available. See [`traceability.md`](traceability.md), the [RUN record](../test-results/historical/RUN-2026-002.md), and [severity-ranked audit report](application-audit-RUN-2026-002.md).
