# Known Issues Summary

| ID | Area | Summary | Current evidence | Next action |
| --- | --- | --- | --- | --- |
| BUG-001 | Dependency security | npm audit: 23 total findings, including 2 critical; production-only audit: 5, including 1 critical. | Commands and raw reports from 2026-10-07. | Dependency owner review/update, re-run tests and audit. |
| BUG-002 | Encode/decode UX | “Lossless round trip” comparison trims/lowercases; decoder normalizes whitespace. | Code inspection plus automated tokenizer normalization case; browser reproduction not run. | Agree exact-vs-canonical semantics; execute TC-108; fix in product scope if confirmed. |

Other unvalidated areas (large inputs, browser storage denial, screen-reader support) are gaps, not confirmed bugs; see reports and scenarios.
