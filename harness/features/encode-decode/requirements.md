# FEAT-002 Requirements

- **REQ-004:** BPE encode/decode, special boundaries, merge ranks and unknown-symbol behavior.
- **REQ-005:** Live token stream, IDs, decoded text, stats and round-trip indicator.
- **REQ-009:** Processing is local in the page; no application API/database exists.

Source: `src/lib/bpe.ts`, `src/app/page.tsx`, `TokenStream.tsx`. Whitespace/case semantics and the indicator caveat are in [BR-004/BR-007/BR-008](../../requirements/business-rules.md).
