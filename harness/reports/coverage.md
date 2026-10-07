# Test Coverage

Counts below are derived from the current feature/requirement/scenario/case inventory and RUN-2026-001; they describe this harness, not source-line coverage. No code-coverage tool/report is configured. Percentages are included only where the denominator is explicit.

## Feature coverage

| Measure | Count / status | Notes |
| --- | ---: | --- |
| Features identified | 5 | FEAT-001–FEAT-005 |
| Feature folders documented | 5/5 | Each has README, requirements, behavior, criteria, scenarios, cases, data and known issues. |
| Features with at least one automated module test | 4/5 | BPE training, encode/decode, vocabulary data and word-level baseline are touched; FEAT-005 has manual-only feature coverage. FEAT-003 automation validates map serialization, not browser controls. |
| Features with browser-executed tests | 0/5 | No browser tests executed. |

## Requirement coverage

| Measure | Count / status |
| --- | ---: |
| Functional requirements identified | 9 (`REQ-001`–`REQ-009`) |
| Requirements linked to feature + scenario + case | 9/9 |
| Requirements with direct automated/module verification | 4/9 have a passing direct module test (REQ-001, 002, 004, 007); REQ-007's page rendering is still untested. REQ-003/005/006 have only partial core coverage, REQ-008 is manual-only, and REQ-009 has build/source-inventory evidence only. |
| NFR IDs identified | 8 (`NFR-001`–`NFR-008`) |
| Business-rule IDs identified | 8 (`BR-001`–`BR-008`) |

See [`traceability.md`](traceability.md) for exact linkage/status. “Linked” does not mean “passed.”

## Scenario and test-case coverage

| Measure | Count / status |
| --- | ---: |
| Scenario definitions | 14 IDs: SCN-001–006, SCN-101, SCN-201, SCN-301, SCN-401, SCN-402, SCN-501, SCN-601, SCN-701 |
| Defined test cases | 18: TC-001–TC-010 and TC-101–TC-108 |
| Automated tokenizer cases executed | 10/10 PASS (100% of current automated suite) |
| Manual UI cases executed | 0/8; all NOT_RUN |
| Overall defined cases executed | 10/18 (55.6%); only the module-level cases ran |
| Failed security scans | 2 commands; audit advisories are detailed in BUG-001 |

## Automation, API, UI, database coverage

- **Automation:** 10 module tests (AUT-001–AUT-010) passed. Lint, typecheck, build and harness link checks passed (AUT-011–AUT-013, AUT-016). Full and production-only npm audits (AUT-014/015) failed on findings. No code coverage percentage is available.
- **API:** Not applicable; no custom API exists. Optional deployed root HTTP smoke is unexecuted.
- **UI:** Five UI-related feature areas are documented; eight manual cases exist, zero executed. No Playwright/Cypress/browser driver is configured.
- **Database:** Not applicable; no database/schema/migration exists.
- **Performance:** No performance values or targets are available; scenario NOT_EXECUTED.
- **Security:** npm dependency audit ran and failed (23 total findings; 5 production-only); full VAPT and browser tests NOT_EXECUTED.

No pass/fail figures are fabricated for UI, API, DB or performance coverage.
