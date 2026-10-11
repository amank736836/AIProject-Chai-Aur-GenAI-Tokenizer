# Test Case Index and Status Rules

Each case has a stable ID, priority/type, preconditions, steps, data, expected/actual result, status, automation, evidence and requirement/bug references.

- [`bpe-tokenizer/positive.md`](bpe-tokenizer/positive.md) — AUT-001, AUT-002, AUT-003, AUT-007, AUT-009 and AUT-010.
- [`bpe-tokenizer/negative.md`](bpe-tokenizer/negative.md) — AUT-005 and AUT-008.
- [`bpe-tokenizer/edge-cases.md`](bpe-tokenizer/edge-cases.md) — AUT-004 and AUT-006.
- [`bpe-tokenizer/regression.md`](bpe-tokenizer/regression.md) — core module result summary.
- [`ui-playground/positive.md`](ui-playground/positive.md) — TC-101–TC-105; includes PASS/PARTIAL Chromium E2E coverage.
- [`ui-playground/negative.md`](ui-playground/negative.md) — TC-106 markup-inertness and TC-108 exact round-trip regression.
- [`ui-playground/edge-cases.md`](ui-playground/edge-cases.md) — TC-107 responsive/keyboard/touch/accessibility coverage and gaps.
- [`ui-playground/regression.md`](ui-playground/regression.md) — browser regression grouping and status.

`PASS` requires execution of the named assertions; `PARTIAL` means part of the broader case was tested; `NOT_RUN` means no execution evidence; `BLOCKED` is reserved for an attempted but prevented check. AUT-001–AUT-010 map to the Node test file; AUT-017/AUT-018 map to Playwright/axe-core. Latest run: [`RUN-2026-002`](../test-results/historical/RUN-2026-002.md).
