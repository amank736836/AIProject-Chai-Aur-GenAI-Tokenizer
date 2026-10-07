# BPE Tokenizer — Edge Cases

## TC-004 — Budget floor and no-pair exhaustion

- **Feature:** FEAT-001
- **Priority:** P1
- **Type:** Unit / boundary
- **Preconditions:** Fresh tokenizer.
- **Steps:** 1. Prepare corpus `x` with target 1. 2. Verify target cannot be below base size. 3. Train empty corpus with target 300. 4. Verify it stops with no merges and subsequent `stepMerge()` returns null.
- **Test Data:** Empty string fixture and one-character `x`.
- **Expected Result:** Base/target floor is 100; empty corpus does not hang or fabricate merges even though target is 300.
- **Actual Result:** Assertions passed in AUT-004.
- **Status:** PASS
- **Automation:** AUTOMATED (`AUT-004`)
- **Evidence:** [`RUN-2026-001-tokenizer-tests.txt`](../../evidence/logs/RUN-2026-001-tokenizer-tests.txt)
- **Related Requirement:** REQ-002; BR-006
- **Related Bug:** None
- **Last Executed:** 2026-10-07 (RUN-2026-001)

## TC-006 — Empty, whitespace-only and normalized text

- **Feature:** FEAT-002
- **Priority:** P1
- **Type:** Unit / edge case
- **Preconditions:** Train BPE on valid fixture.
- **Steps:** 1. Encode/decode empty input. 2. Encode/decode whitespace-only input. 3. Encode/decode text with newlines, multiple separators and outer spaces. 4. Compare with canonical output.
- **Test Data:** [`edge-cases/tokenizer-inputs.json`](../../test-data/edge-cases/tokenizer-inputs.json).
- **Expected Result:** Empty/whitespace content decodes to empty; nonempty input decodes with one space between words and no outer spaces.
- **Actual Result:** Assertions passed in AUT-006. This confirms normalization, not exact formatting preservation.
- **Status:** PASS
- **Automation:** AUTOMATED (`AUT-006`)
- **Evidence:** [`RUN-2026-001-tokenizer-tests.txt`](../../evidence/logs/RUN-2026-001-tokenizer-tests.txt)
- **Related Requirement:** REQ-004; BR-004, BR-007, BR-008
- **Related Bug:** BUG-002 concerns UI labeling, not the tokenizer's expected whitespace normalization.
- **Last Executed:** 2026-10-07 (RUN-2026-001)
