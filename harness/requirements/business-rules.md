# Business Rules (Tokenizer)

These rules are derived from `src/lib/bpe.ts` and the UI. No separate domain/business specification was found.

| ID | Rule | Source / test |
| --- | --- | --- |
| BR-001 | Special token IDs are assigned in this order: `<PAD>` 0, `<UNK>` 1, `<BOS>` 2, `<EOS>` 3. BPE `encodeDetailed` emits BOS then EOS around content. | `SPECIAL_TOKENS`, `initVocab`, `encodeDetailed`; TC-001, TC-003 |
| BR-002 | BPE base vocabulary contains four specials, printable ASCII code points 32–126, and `</w>`: 100 entries before extra corpus characters. | `initVocab`; TC-001 |
| BR-003 | Each unique non-ASCII code point in the training text receives a base entry unless already present. Unicode not present in that trained vocabulary is represented as unknown. | `initVocab`, `encodeDetailed`; TC-005 |
| BR-004 | Corpus and input are split with `/\s+/`, empty parts are filtered, and each resulting word receives `</w>`. Original whitespace runs, line breaks and outer whitespace are not represented. | `splitWords`, `decode`; TC-006 |
| BR-005 | At each training step, all adjacent symbol-pair counts are aggregated across corpus words; the highest count wins. Equal counts are sorted by left-symbol `localeCompare`; the first pair is selected. | `topPairs`, `stepMerge`; TC-002, TC-007 |
| BR-006 | The training target is raised to at least the initial vocabulary size. Training can finish below the requested target if there are no adjacent pairs. UI slider maximum is 300. | `train`, `prepareTraining`, page slider; TC-004 |
| BR-007 | Encoding replays known merges in merge-rank order. Decode removes all special tokens, turns a token ending in `</w>` into its text plus one space, and trims the trailing space. Unknown IDs resolve to `<UNK>` and are skipped because it is special. | `applyMerges`, `decode`; TC-003, TC-008 |
| BR-008 | UI's current “lossless round trip” boolean compares `decoded.trim().toLowerCase()` to `input.trim().toLowerCase()`. It therefore deliberately ignores case and outer whitespace, while the tokenizer itself normalizes whitespace. This label is not an exact-byte round-trip guarantee. | `src/app/page.tsx`; BUG-002, TC-108 (manual, not executed) |

## Reference tokenizer rules

The legacy `Tokenizer` counts complete whitespace-separated words, reserves four special tokens first, emits BOS/EOS and maps words missing from its vocabulary to `<UNK>`. Its exact behavior for blank inputs, reserved special-token spellings as corpus words, and repeated `learnVocab` calls is not specified by the UI contract and needs explicit validation before relying on those cases.
