# FEAT-003 Behavior

- Page derives up to 400 `VocabEntry` rows and serializes `tok.vocab` with two-space JSON indentation.
- Explorer search trims/lowercases the query and matches a lower-case token substring or ID substring.
- Filters: All; Special (four special tokens and `</w>`); Merged (multi-code-point/merge kind except standalone `</w>`); Chars.
- Result list shows at most 220 rows; frequency bars use current row counts. A token with zero count displays an em dash.
- Copy JSON delegates to Clipboard API and reports rejection via toast. Download creates an `application/json` Blob named `vocab.json`, clicks a temporary anchor and revokes the URL.
