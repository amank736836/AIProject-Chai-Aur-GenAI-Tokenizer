# FEAT-002 Behavior

- `encodeDetailed(text)` prepends `<BOS>`, splits text by whitespace, applies known merges by earliest rank, maps missing symbols to `<UNK>`, and appends `<EOS>`.
- `encode(text)` returns the detailed piece IDs.
- `decode(ids)` ignores special tokens, resolves absent IDs to `<UNK>`, converts a token ending in `</w>` to its visible text plus a space, then trims trailing whitespace.
- The page maps the returned pieces to IDs; `decoded` is derived from those IDs. `stats()` reports code-point characters, words, content tokens, chars/token and unknown count.
- Empty input still has BOS/EOS pieces; content token count is 0. `decode(encode(""))` is an empty string.
- Original spaces, tabs, line breaks and leading/trailing spaces are not preserved. Punctuation is not separately tokenized beyond its characters/learned merges.
