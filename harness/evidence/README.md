# Evidence

Evidence is linked from test cases, bug reports and execution records. Never manufacture screenshots, API responses, logs, or results. If no evidence exists, write `NOT_EXECUTED` or `None (not executed)`.

## Current evidence

- [`logs/`](logs/) contains actual tokenizer, lint, type-check, build and npm audit outputs for RUN-2026-001. The audit's complete JSON responses are retained for reproducibility.
- No browser screenshot/video was captured; there is no browser-run evidence.
- API-response and database-result evidence is not applicable to the current repository because no custom API/database exists.

Use `screenshots/`, `videos/`, `api-responses/` or `database-results/` only when a real test produces useful evidence. Redact secrets and personal data before retaining files.
