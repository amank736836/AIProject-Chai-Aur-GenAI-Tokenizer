# Evidence

Evidence is linked from test cases, bugs and execution records. Never manufacture screenshots, responses, logs or test results. If evidence does not exist, write `NOT_EXECUTED` or `None (not executed)`.

## Current evidence

- [`logs/`](logs/) contains actual logs and raw npm audit JSON for RUN-2026-001 and RUN-2026-002.
- [`screenshots/RUN-2026-002/`](screenshots/RUN-2026-002/) contains real screenshots captured from the rendered production page at mobile, tablet, desktop and ultrawide sizes.
- RUN-2026-002 records responsive geometry, axe-core results, encode edge cases and local production performance measurements in machine-readable JSON.
- The browser target was bundled headless Chromium, not Firefox, WebKit/Safari, Edge or a physical device. Generated Playwright traces/results are in the ignored root `.playwright-results/` and are not committed as evidence unless specifically needed.
- API-response and database-result evidence is not applicable to the current source because no custom API/database exists.

Use `screenshots/`, `videos/`, `api-responses/` or `database-results/` only when a real test produces useful evidence. Redact secrets and personal data before retaining files.
