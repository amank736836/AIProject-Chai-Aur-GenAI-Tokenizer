# Requirements-to-Tests Traceability

Traceability is based on code-derived requirements in [`../requirements/functional-requirements.md`](../requirements/functional-requirements.md). For each row, PASS applies only to the named automated/module/build check; it does not imply the browser experience is verified. `NOT_RUN` is intentional where no execution evidence exists.

| Requirement | Feature | Scenario | Test case | Automated check | Execution result | Evidence / coverage note |
| --- | --- | --- | --- | --- | --- | --- |
| REQ-001 — Train corpus-derived BPE vocab | FEAT-001 | SCN-002 | TC-002, TC-007 | AUT-002, AUT-007 | PASS, RUN-2026-001 | [Tokenizer log](../evidence/logs/RUN-2026-001-tokenizer-tests.txt); pair/train core verified. |
| REQ-002 — Base tokens, Unicode corpus chars, target floor/exhaustion | FEAT-001 | SCN-002, SCN-101, SCN-201 | TC-001, TC-004, TC-005 | AUT-001, AUT-004, AUT-005 | PASS, RUN-2026-001 | Same test log; noted behavior covered at module level. |
| REQ-003 — Animated controls, presets, pause/instant/reduced motion | FEAT-001, FEAT-005 | SCN-002, SCN-501 | TC-007 (steppable core), TC-102, TC-105 | AUT-007 (partial); no browser automation | PARTIAL: module check PASS; UI NOT_RUN | [Test log](../evidence/logs/RUN-2026-001-tokenizer-tests.txt); manual cases remain unexecuted. |
| REQ-004 — BPE encode/decode, boundaries and unknowns | FEAT-002 | SCN-003, SCN-101, SCN-201 | TC-003, TC-005, TC-006, TC-008 | AUT-003, AUT-005, AUT-006, AUT-008 | PASS, RUN-2026-001 | [Test log](../evidence/logs/RUN-2026-001-tokenizer-tests.txt). |
| REQ-005 — Live UI outputs, stats and round-trip status | FEAT-002 | SCN-003, SCN-201, SCN-501 | TC-003, TC-006, TC-103, TC-108 | AUT-003, AUT-006 (module only); no UI automation | PARTIAL: tokenizer PASS; UI NOT_RUN; BUG-002 open | [Test log](../evidence/logs/RUN-2026-001-tokenizer-tests.txt); [`TC-108`](../test-cases/ui-playground/negative.md). |
| REQ-006 — Search/filter/copy/download vocabulary | FEAT-003 | SCN-004, SCN-301, SCN-501 | TC-010, TC-104 | AUT-010 (map/JSON only); no UI automation | PARTIAL: map check PASS; UI NOT_RUN | [Test log](../evidence/logs/RUN-2026-001-tokenizer-tests.txt); browser export evidence absent. |
| REQ-007 — Fixed word-level baseline demo | FEAT-004 | SCN-005, SCN-501 | TC-009, TC-101 | AUT-009 (module); no browser test | PARTIAL: module PASS; UI NOT_RUN | [Test log](../evidence/logs/RUN-2026-001-tokenizer-tests.txt). |
| REQ-008 — Persist theme and training speed | FEAT-005 | SCN-006, SCN-501 | TC-102, TC-105 | None; manual only | NOT_EXECUTED | No browser evidence. See [`TC-105`](../test-cases/ui-playground/positive.md). |
| REQ-009 — In-browser processing/no app API or DB in this checkout | FEAT-001, FEAT-002 | SCN-001, SCN-301, SCN-401, SCN-402 | TC-001–TC-010 (module), TC-101 (page) | AUT-013 (build only); source inventory; no API/DB suite | Build PASS; browser/deployment boundary NOT_EXECUTED; API/DB N/A | [Build log](../evidence/logs/RUN-2026-001-build.txt). Build does not prove production network behavior. |

## Other requirement trace links

| ID | Scenario / case | Check and current result |
| --- | --- | --- |
| NFR-001 | SCN-001 | AUT-013 `npm run build`: PASS; root statically prerendered. |
| NFR-002 / NFR-003 / NFR-007 | SCN-501; TC-105, TC-107 | Manual browser/accessibility checks NOT_RUN. |
| NFR-004 | SCN-001 | Build passed with local font assets; offline browser check NOT_RUN. |
| NFR-005 | SCN-301, SCN-701; TC-106 | Source review only; browser network/XSS check NOT_RUN. |
| NFR-006 | SCN-601 | Performance NOT_EXECUTED; threshold UNKNOWN / REQUIRES VALIDATION. |
| NFR-008 | SCN-701 | AUT-014/AUT-015 failed with npm audit findings; BUG-001 OPEN. |
| BR-001/002/005 | SCN-002; TC-001/002 | AUT-001/AUT-002 PASS. |
| BR-003/004/006/007 | SCN-101/201; TC-004/005/006/008 | AUT-004/005/006/008 PASS. |
| BR-008 | SCN-201; TC-108 | UI NOT_RUN; BUG-002 OPEN. |

## Traceability gaps

- UI-only controls and visible outputs have case IDs but no browser automation IDs.
- No API/database requirements exist in source; those test suites are not applicable rather than silently omitted.
- Production deployment configuration is not in the repository, so `REQ-009` is only verified at source/build level, not at a hosted network boundary.
