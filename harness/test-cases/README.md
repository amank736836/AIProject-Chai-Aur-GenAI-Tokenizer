# Test Case Index and Status Rules

Each case has stable ID, priority/type, preconditions, steps, data, expected/actual result, status, automation, evidence and requirement/bug references.

- [`bpe-tokenizer/positive.md`](bpe-tokenizer/positive.md) — automated TC-001, TC-002, TC-003, TC-007, TC-009, TC-010.
- [`bpe-tokenizer/negative.md`](bpe-tokenizer/negative.md) — automated fallback/error cases TC-005, TC-008.
- [`bpe-tokenizer/edge-cases.md`](bpe-tokenizer/edge-cases.md) — target/exhaustion and whitespace TC-004, TC-006.
- [`bpe-tokenizer/regression.md`](bpe-tokenizer/regression.md) — regression grouping/status.
- [`ui-playground/positive.md`](ui-playground/positive.md) — manual UI TC-101–TC-105.
- [`ui-playground/negative.md`](ui-playground/negative.md) — manual security and misleading round-trip indicator TC-106, TC-108.
- [`ui-playground/edge-cases.md`](ui-playground/edge-cases.md) — UI edge TC-107.
- [`ui-playground/regression.md`](ui-playground/regression.md) — manual/browser regression group.

`PASS`/`FAIL` requires actual execution. `NOT_RUN` means no browser execution; `BLOCKED` is reserved for an attempted test that could not be completed. Automated case IDs AUT-001–AUT-010 map to the Node test file. Latest run report: [`../test-results/historical/RUN-2026-001.md`](../test-results/historical/RUN-2026-001.md).
