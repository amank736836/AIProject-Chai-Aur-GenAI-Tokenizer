# BPE Tokenizer — Negative / Fallback Cases

## TC-005 — Handle in-corpus and unseen Unicode

- **Feature:** FEAT-001, FEAT-002
- **Priority:** P1
- **Type:** Unit / negative-input fallback
- **Preconditions:** Train only on the supplied Unicode corpus fixture.
- **Steps:** 1. Encode its known Devanagari/emoji input. 2. Decode and compare. 3. Encode an unseen code point. 4. Inspect unknown kind/ID and statistics.
- **Test Data:** [`tokenizer-inputs.json` edge cases](../../test-data/edge-cases/tokenizer-inputs.json); unseen code point in [`invalid/tokenizer-inputs.json`](../../test-data/invalid/tokenizer-inputs.json).
- **Expected Result:** Corpus code points encode/decode; unseen code point maps to `<UNK>` and increments unknown count; no exception.
- **Actual Result:** Assertions passed in AUT-005.
- **Status:** PASS
- **Automation:** AUTOMATED (`AUT-005`)
- **Evidence:** [`RUN-2026-001-tokenizer-tests.txt`](../../evidence/logs/RUN-2026-001-tokenizer-tests.txt)
- **Related Requirement:** REQ-002, REQ-004; BR-003
- **Related Bug:** None; unseen Unicode fallback is expected behavior.
- **Last Executed:** 2026-10-07 (RUN-2026-001)

## TC-008 — Decode out-of-range IDs without throwing

- **Feature:** FEAT-002
- **Priority:** P1
- **Type:** Unit / negative input
- **Preconditions:** BPE tokenizer trained using fixture.
- **Steps:** 1. Decode IDs `999999` and `-1`. 2. Verify no exception and record the visible decoded string.
- **Test Data:** [`invalid/tokenizer-inputs.json`](../../test-data/invalid/tokenizer-inputs.json).
- **Expected Result:** Unknown IDs fall back to `<UNK>`; special-token filtering means no visible output; operation does not throw.
- **Actual Result:** Assertions passed in AUT-008.
- **Status:** PASS
- **Automation:** AUTOMATED (`AUT-008`)
- **Evidence:** [`RUN-2026-001-tokenizer-tests.txt`](../../evidence/logs/RUN-2026-001-tokenizer-tests.txt)
- **Related Requirement:** REQ-004; BR-007
- **Related Bug:** None
- **Last Executed:** 2026-10-07 (RUN-2026-001)
