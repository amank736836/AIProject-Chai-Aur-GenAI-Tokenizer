# Testing Strategy

## Scope and constraints

This is a small client-side Next.js tokenizer playground, not a multi-service application. Test effort is concentrated on tokenizer correctness and page behavior. There is no custom API, database, authentication service, or existing test framework in the baseline repository. Do not invent API/database suites where no such component exists.

## Risk-based priorities

1. **P0 — BPE core:** vocabulary IDs, frequency-selected merges, budget/exhaustion behavior, ranked encoding and canonical decode.
2. **P1 — user-visible flows:** train, encode/decode, vocabulary search/export, keyboard interactions and theme/reduced-motion behavior.
3. **P1 — supply chain:** review npm audit findings before release; findings are recorded as an open high-priority issue.
4. **P2 — input boundaries:** empty/whitespace, punctuation, untrained/unseen Unicode, invalid IDs, repeated training and unusually large text.
5. **P2 — non-functional:** real-browser accessibility/responsiveness, performance on large corpora, browser capability fallbacks and deployment headers.

## Levels and tools

| Level | Method/tool | Status |
| --- | --- | --- |
| Unit / logic | Node built-in `node:test`; TypeScript compiler API already in `devDependencies`; temporary CommonJS compilation of the two tokenizer modules | Implemented and executed by `RUN-2026-001` |
| Static / type / docs links | `npm run lint`; `npx tsc --noEmit`; `node harness/automation/scripts/verify-harness-links.mjs` | Executed; all passed in `RUN-2026-001` |
| Build / prerender smoke | `npm run build` | Executed; passed in `RUN-2026-001` |
| UI / browser | Manual scenarios in `test-cases/ui-playground/`; no browser runner/dependency found | Not executed |
| HTTP/API | No custom API. Optional root-page HTTP smoke is described in `test-scenarios/api.md` | Not executed |
| Database | No database/schema | Not applicable |
| Performance | Manual profiling plan; no SLA or benchmark tool configured | Not executed |
| Security / VAPT | `npm audit` for dependency tree; manual browser checks proposed | Audit executed and failed on dependency findings; VAPT not executed |

## Execution principles

- Record exact commit, date, environment, commands and exit status under `test-results/`.
- A test is `PASS` only after actual execution. Use `NOT_RUN` / `NOT_EXECUTED` for unrun cases; never infer UI success from a successful build.
- Keep expected behavior in requirements/cases and observed output in execution reports.
- No production source is changed by the harness tests. Tests compile the tokenizer modules to a temporary folder and do not persist generated output.
- Keep browser tests manual until a browser automation tool is intentionally selected; do not add Playwright/Cypress for this documentation task.
- Treat npm audit output as package/advisory matching, not proof of exploitability. Prioritize the Next.js finding and obtain a dependency owner decision before release.

## Test data and privacy

Fixtures under `test-data/` are synthetic and public. Tests need no credentials, tokens, production data, network access or secrets. A future authenticated environment must use environment variable placeholders and synthetic test accounts.

## Traceability

Requirements → features → scenarios → cases → automated IDs → run result/evidence are mapped in [`reports/traceability.md`](reports/traceability.md). Test statuses are summarized in [`TESTING_STATUS.md`](TESTING_STATUS.md) and [`reports/coverage.md`](reports/coverage.md).
