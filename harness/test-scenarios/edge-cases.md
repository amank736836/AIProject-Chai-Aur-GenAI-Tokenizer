# Edge-Case Scenarios

## SCN-201 — Boundary and uncommon inputs

- Empty string; spaces/tabs/newlines only; leading/trailing and repeated separators.
- Vocab target below base, equal to base, above available merges, and UI maximum 300.
- Unicode code points included in corpus versus absent from corpus; emoji; combining marks; multi-code-point grapheme clusters.
- Punctuation, quotes, angle brackets, NUL/control characters and duplicate corpus words.
- Invalid numeric IDs; repeated `train()` on one tokenizer instance; `stepMerge()` after exhaustion.
- Very large corpus/input, many repeated pair occurrences, rapid repeated UI actions and concurrent browser tabs.

Expected behavior supported by source: whitespace is normalized; corpus Unicode code points are added to the base vocab; unseen symbols can become `<UNK>`; training stops when no pairs remain. For NUL/collisions, combining marks, very large data, repeated instance reuse and concurrent use, expected behavior/performance is **UNKNOWN / REQUIRES VALIDATION**.

**Cases:** TC-004–TC-008; TC-108. Executed cases are noted per test case; browser/stress cases NOT_EXECUTED.
