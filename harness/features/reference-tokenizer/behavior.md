# FEAT-004 Behavior

- `page.tsx` defines corpus `Hello world from the tokenizer demo corpus` and sample `Hello world from tokenizer`.
- A fresh `Tokenizer` learns a frequency-ranked whole-word vocabulary with a requested size of 50; its `encode()` output includes BOS/EOS and `decode()` joins non-special tokens with one space.
- The demo computes its result with `useMemo(..., [])` and renders six read-only rows.
- `Tokenizer.learnVocab()` does not clear maps on repeat calls; blank/reserved-token edge behavior is not covered by the fixed demo.
