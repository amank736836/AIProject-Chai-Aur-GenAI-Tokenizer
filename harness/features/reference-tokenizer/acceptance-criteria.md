# FEAT-004 Acceptance Criteria

These checkboxes describe expected criteria, not release sign-off; execution status is recorded in the linked test cases.

- [ ] Fixed corpus produces BOS/EOS and the known sample decodes back to its space-separated words (TC-009).
- [ ] Static demo displays input, IDs, decoded text, vocabulary size, special tokens and corpus (TC-101; UI NOT_EXECUTED).
- [ ] If the reference tokenizer is later exposed to user inputs, first define tests for empty input, unknown words, reserved spellings and repeated training. Current product behavior for those cases is UNKNOWN / REQUIRES VALIDATION.
