# FEAT-004 Known Issues and Gaps

- No user-facing failure is currently evidenced in the fixed sample path.
- `learnVocab()` behavior for repeat calls, empty text, a corpus word equal to `<PAD>` (ID 0) and unknown-word decode is not specified. Do not claim those paths verified.
- The current demo only proves the fixed sample flow; it does not make the word-level class a general-purpose production tokenizer.
