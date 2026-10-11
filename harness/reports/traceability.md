# Requirements-to-Tests Traceability — RUN-2026-002

Traceability follows code-derived requirements in [`../requirements/functional-requirements.md`](../requirements/functional-requirements.md). A PASS applies only to assertions actually run; `PARTIAL` denotes scoped evidence and does not mean the complete requirement was accepted.

| Requirement | Feature | Scenario / case | Automation | Current result | Evidence / limit |
| --- | --- | --- | --- | --- | --- |
| REQ-001 — Train corpus-derived BPE vocab | FEAT-001 | SCN-002; TC-001, TC-002, TC-007, TC-102 | AUT-001/002/007, AUT-017 | Module PASS; browser PARTIAL | [`tokenizer tests`](../evidence/logs/RUN-2026-002-tokenizer-tests.txt); [`E2E`](../evidence/logs/RUN-2026-002-playwright.txt). One preset/custom entry, budget, instant, pause and speed tested; remaining preset variants untested. |
| REQ-002 — Base tokens, Unicode chars, target floor/exhaustion | FEAT-001 | SCN-002/101/201; TC-001, TC-004, TC-005 | AUT-001/004/005 | PASS at module level; UI unknown Unicode PASS | Unit log and [`encode edge cases`](../evidence/logs/RUN-2026-002-encode-edge-cases.json); large-corpus bounds untested. |
| REQ-003 — Animated controls, presets, pause/instant/reduced motion | FEAT-001, FEAT-005 | SCN-002/501; TC-102/105/107 | AUT-017 | PARTIAL | Browser verified pause/speed, preset/custom/instant and motion contexts; full reduced-motion timing equivalence and exhaustive presets untested. |
| REQ-004 — BPE encode/decode, boundaries and unknowns | FEAT-002 | SCN-003/101/201; TC-003/005/006/008/103 | AUT-003/005/006/008, AUT-017 | Module PASS; browser PARTIAL | Unit and browser logs; unknown Unicode, long input and round-trip edge tested; clipboard-denied path untested. |
| REQ-005 — Live UI output, stats and round-trip status | FEAT-002 | SCN-003/201/501; TC-103/108 | AUT-017 | PARTIAL; BUG-002 RESOLVED | Browser verified live IDs/output, exact whitespace status, copy actions; not every visual stat/control checked. |
| REQ-006 — Search/filter/copy/download vocabulary | FEAT-003 | SCN-004/301/501; TC-010/104 | AUT-010, AUT-017 | Module PASS; browser PARTIAL | Search by token fragment/ID/no-match, all filters, JSON clipboard/download passed; denial and exhaustive map equality not independently checked. |
| REQ-007 — Fixed word-level baseline demo | FEAT-004 | SCN-005/501; TC-009/101 | AUT-009, AUT-017/AUT-018 | Module PASS; displayed values PARTIAL/NOT_ASSERTED | Reference tokenizer sample round-trip passed; full page was axe-scanned, but visible demo values were not independently compared with source. |
| REQ-008 — Persist theme and training speed | FEAT-005 | SCN-006/501; TC-102/105/107 | AUT-017 | PARTIAL PASS | Theme/speed persisted after reload; blocked localStorage fallback/toggle passed (BUG-004 RESOLVED). Normal OS-first-visit, other browsers and storage write denial beyond injected getter case untested. |
| REQ-009 — In-browser processing/no app API or DB in checkout | FEAT-001/002 | SCN-001/301/401/402; TC-001–010, TC-101 | AUT-013/017 | Build PASS; local offline encode PASS; hosted boundary UNKNOWN | [`build/E2E`](../evidence/logs/RUN-2026-002-playwright.txt); test records no failed requests/page errors in the measured delayed/offline flow. No deployment target supplied. |

## Non-functional and business-rule traceability

| ID | Scenario / case | Current check and status |
| --- | --- | --- |
| NFR-001 — Build/runtime | SCN-001 | AUT-013 build PASS; production-page E2E PASS. |
| NFR-002 — Responsive/focus | SCN-501; TC-107 | AUT-017 responsive sweep and keyboard subset PASS; full tab order/true zoom not run. |
| NFR-003 — Reduced motion | SCN-501; TC-105 | Reduced and no-preference contexts exercised; exact motion behavior only PARTIAL. |
| NFR-004 — Local assets/offline behavior | SCN-001/301 | Offline interaction passed; deployed network boundary not assessed. |
| NFR-005 — Safe input | SCN-701; TC-106 | Markup-looking input stayed inert in Chromium; deployment headers remain untested. |
| NFR-006 — Performance | SCN-601 | Single descriptive sample recorded; no agreed threshold, not graded. |
| NFR-007 — Accessibility | SCN-501; TC-107 | Four axe runs, zero violations; incomplete contrast/manual AT checks remain. |
| NFR-008 — Dependency security | SCN-701 | AUT-014 full audit FAIL, five high dev/build matches; AUT-015 production-only audit PASS, zero. BUG-001 OPEN. |
| BR-001–BR-007 — BPE and encode rules | SCN-002/101/201; TC-001–TC-008 | AUT-001–AUT-008 PASS at module level. |
| BR-008 — Round-trip status | SCN-201; TC-108 | Exact whitespace distinction passed in Chromium; BUG-002 RESOLVED. |

## Remaining gaps

- Full feature-level user acceptance has not been signed off; case-level PARTIAL statuses remain.
- Only Chromium 153.0.8010.0 was exercised. Firefox, Safari/WebKit, Edge, physical mobile browsers and true browser zoom are NOT_EXECUTED.
- The browser test does not replace manual screen-reader, voice-control, contrast, full keyboard-order or visual review of every dynamic state.
- No custom API/database requirement exists in the current code. Deployed hosting behavior/security headers are not evidenced in this checkout.
