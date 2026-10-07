# BPE Tokenizer Regression Set

| Test case | Coverage | Automation | Latest status |
| --- | --- | --- | --- |
| TC-001 | IDs/base vocabulary | AUT-001 | PASS, RUN-2026-001 |
| TC-002 | Pair selection/merge log | AUT-002 | PASS, RUN-2026-001 |
| TC-003 | Encode/decode boundaries | AUT-003 | PASS, RUN-2026-001 |
| TC-004 | Target floor/exhaustion | AUT-004 | PASS, RUN-2026-001 |
| TC-005 | Unicode/unknown fallback | AUT-005 | PASS, RUN-2026-001 |
| TC-006 | Empty/whitespace normalization | AUT-006 | PASS, RUN-2026-001 |
| TC-007 | Full vs stepped training | AUT-007 | PASS, RUN-2026-001 |
| TC-008 | Invalid numeric IDs | AUT-008 | PASS, RUN-2026-001 |
| TC-009 | Reference tokenizer sample | AUT-009 | PASS, RUN-2026-001 |
| TC-010 | Vocab entries/serialization | AUT-010 | PASS, RUN-2026-001 |

Run the suite with `node harness/automation/scripts/run-tokenizer-tests.mjs`. These tests exercise TypeScript modules, not browser UI. Manual UI cases TC-101–TC-108 are tracked separately.
