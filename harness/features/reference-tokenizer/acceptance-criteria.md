# FEAT-004 Acceptance Criteria

These checkboxes describe expected criteria, not release sign-off; execution status is recorded in the linked test cases.

- [x] Fixed corpus produces BOS/EOS and the known sample decodes back to its space-separated words (TC-009; RUN-2026-002 unit test).
- [ ] Static demo's exact input, IDs, decoded text, vocabulary size, special tokens and corpus were not independently reconciled in the UI (TC-101; partial whole-page axe scan only).
- [ ] If the reference tokenizer is later exposed to user inputs, first define tests for empty input, unknown words, reserved spellings and repeated training. Current product behavior for those cases is UNKNOWN / REQUIRES VALIDATION.
