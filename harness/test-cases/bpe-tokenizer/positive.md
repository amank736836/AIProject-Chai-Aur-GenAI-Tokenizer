# BPE Tokenizer — Positive Cases

## TC-001 — Initialize fixed base vocabulary

- **Feature:** FEAT-001
- **Priority:** P0
- **Type:** Unit / functional
- **Preconditions:** Dependencies installed; tokenizer test runner available.
- **Steps:** 1. Initialize a fresh `BPETokenizer`. 2. Read base size and IDs for special tokens, ASCII endpoints and word-end sentinel.
- **Test Data:** Empty input; `SPECIAL_TOKENS`, `WORD_END`.
- **Expected Result:** 100 base entries; specials IDs 0–3; printable ASCII slots and `</w>` ID 99.
- **Actual Result:** Assertions passed in AUT-001.
- **Status:** PASS
- **Automation:** AUTOMATED (`AUT-001`)
- **Evidence:** [`RUN-2026-001-tokenizer-tests.txt`](../../evidence/logs/RUN-2026-001-tokenizer-tests.txt)
- **Related Requirement:** REQ-002; BR-001, BR-002
- **Related Bug:** None
- **Last Executed:** 2026-10-07 (RUN-2026-001)

## TC-002 — Merge the most frequent adjacent pair

- **Feature:** FEAT-001
- **Priority:** P0
- **Type:** Unit / functional
- **Preconditions:** Fresh BPE instance prepared with corpus.
- **Steps:** 1. Prepare corpus `ab ab`. 2. Execute one merge. 3. Inspect pair, count, token, ID and step.
- **Test Data:** `ab ab`; target 101.
- **Expected Result:** First selected pair is `a` + `b`, count 2; merged token `ab` receives the next vocabulary ID and step 1.
- **Actual Result:** Assertions passed in AUT-002.
- **Status:** PASS
- **Automation:** AUTOMATED (`AUT-002`)
- **Evidence:** [`RUN-2026-001-tokenizer-tests.txt`](../../evidence/logs/RUN-2026-001-tokenizer-tests.txt)
- **Related Requirement:** REQ-001; BR-005
- **Related Bug:** None
- **Last Executed:** 2026-10-07 (RUN-2026-001)

## TC-003 — Encode and decode a known corpus sample

- **Feature:** FEAT-002
- **Priority:** P0
- **Type:** Unit / functional
- **Preconditions:** BPE tokenizer trained using fixture.
- **Steps:** 1. Train on the fixture corpus. 2. Encode its known input as detailed pieces and IDs. 3. Decode IDs. 4. Compare boundaries and output.
- **Test Data:** [`bpe-corpus.json`](../../test-data/valid/bpe-corpus.json).
- **Expected Result:** BOS and EOS wrap content; numeric IDs match detailed pieces; decode recovers the fixture input.
- **Actual Result:** Assertions passed in AUT-003.
- **Status:** PASS
- **Automation:** AUTOMATED (`AUT-003`)
- **Evidence:** [`RUN-2026-001-tokenizer-tests.txt`](../../evidence/logs/RUN-2026-001-tokenizer-tests.txt)
- **Related Requirement:** REQ-004, REQ-005; BR-001, BR-007
- **Related Bug:** None
- **Last Executed:** 2026-10-07 (RUN-2026-001)

## TC-007 — Full training matches one-step-at-a-time training

- **Feature:** FEAT-001
- **Priority:** P1
- **Type:** Unit / regression
- **Preconditions:** Same deterministic runtime and fixture corpus.
- **Steps:** 1. Train one tokenizer synchronously. 2. Prepare a second with same target. 3. Call `stepMerge()` until target/exhaustion. 4. Compare merge history and vocabulary maps.
- **Test Data:** [`bpe-corpus.json`](../../test-data/valid/bpe-corpus.json).
- **Expected Result:** Merge records and final vocab are equal.
- **Actual Result:** Assertions passed in AUT-007.
- **Status:** PASS
- **Automation:** AUTOMATED (`AUT-007`)
- **Evidence:** [`RUN-2026-001-tokenizer-tests.txt`](../../evidence/logs/RUN-2026-001-tokenizer-tests.txt)
- **Related Requirement:** REQ-001, REQ-003; BR-005, BR-006
- **Related Bug:** None
- **Last Executed:** 2026-10-07 (RUN-2026-001)

## TC-009 — Word-level reference tokenizer sample round-trip

- **Feature:** FEAT-004
- **Priority:** P1
- **Type:** Unit / functional
- **Preconditions:** Reference tokenizer module compiled.
- **Steps:** 1. Train on sample-data corpus. 2. Encode sample. 3. Verify boundary IDs. 4. Decode and compare.
- **Test Data:** [`reference-demo.json`](../../test-data/sample-data/reference-demo.json).
- **Expected Result:** IDs begin/end with the trained BOS/EOS IDs and decoded sample equals input.
- **Actual Result:** Assertions passed in AUT-009.
- **Status:** PASS
- **Automation:** AUTOMATED (`AUT-009`)
- **Evidence:** [`RUN-2026-001-tokenizer-tests.txt`](../../evidence/logs/RUN-2026-001-tokenizer-tests.txt)
- **Related Requirement:** REQ-007
- **Related Bug:** None
- **Last Executed:** 2026-10-07 (RUN-2026-001)

## TC-010 — Vocabulary entries serialize to the same token→ID map

- **Feature:** FEAT-003
- **Priority:** P1
- **Type:** Unit / export-data validation
- **Preconditions:** BPE tokenizer trained with fixture.
- **Steps:** 1. Read `vocab`. 2. JSON serialize/parse it. 3. Read `vocabEntries()`. 4. Verify each entry maps to the same ID and has nonnegative count.
- **Test Data:** [`bpe-corpus.json`](../../test-data/valid/bpe-corpus.json).
- **Expected Result:** All entries are present, stable by ID and JSON-compatible.
- **Actual Result:** Assertions passed in AUT-010.
- **Status:** PASS
- **Automation:** AUTOMATED (`AUT-010`)
- **Evidence:** [`RUN-2026-001-tokenizer-tests.txt`](../../evidence/logs/RUN-2026-001-tokenizer-tests.txt)
- **Related Requirement:** REQ-006
- **Related Bug:** None
- **Last Executed:** 2026-10-07 (RUN-2026-001)
