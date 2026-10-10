# Test Data

All included examples are small, synthetic tokenizer inputs copied/adapted from the app's public demo corpus. They contain no passwords, API keys, tokens, production records or personal data.

- `valid/` — standard BPE corpus/input for repeatable training and round-trip tests.
- `invalid/` — unseen code point and invalid token IDs for fallback behavior; “invalid” describes test input, not a security payload.
- `edge-cases/` — empty, whitespace, Unicode and normalization examples.
- `sample-data/` — the app's fixed word-level reference demo.
- Shared fixtures live in the relevant data-category folders; no generic empty fixtures directory is maintained.

Every test can run without a network, account or external service. No large-data, authorization or performance fixtures are included because no such feature/threshold is defined; generate synthetic workloads only after requirements are agreed. Avoid adding real user text or secrets; use placeholders/environment variables if future integration testing needs credentials.
