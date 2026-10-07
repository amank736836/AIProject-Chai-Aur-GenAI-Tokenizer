# Test Scenario Index

Scenarios describe reproducible checks; results belong in test cases/execution reports. IDs are stable and must be reused in requirements and coverage links.

- [`smoke.md`](smoke.md) — build/root-route smoke (`SCN-001`)
- [`functional.md`](functional.md) — training, encode/decode, export, baseline, preferences (`SCN-002`–`SCN-006`)
- [`negative.md`](negative.md) — unknown/invalid inputs (`SCN-101`)
- [`edge-cases.md`](edge-cases.md) — empty, whitespace, Unicode, boundaries and stress (`SCN-201`)
- [`integration.md`](integration.md) — UI/module/browser data flow (`SCN-301`)
- [`regression.md`](regression.md) — highest-risk regressions
- [`ui.md`](ui.md) — manual browser/keyboard/responsive flows (`SCN-501`)
- [`api.md`](api.md) and [`database.md`](database.md) — applicability assessment (`SCN-401`, `SCN-402`)
- [`performance.md`](performance.md) — manual profile plan (`SCN-601`)
- [`security.md`](security.md) — dependency and client-side security (`SCN-701`)

Current execution: [`../test-results/historical/RUN-2026-001.md`](../test-results/historical/RUN-2026-001.md). No UI, load, DB or custom API execution is implied by documentation alone.
