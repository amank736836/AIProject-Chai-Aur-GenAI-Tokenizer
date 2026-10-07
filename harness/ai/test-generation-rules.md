# AI Test Generation Rules

1. **Evidence first:** Derive behavior from current source, configuration, existing documentation and actual test output. No invented endpoints, roles, tables, data or workflows.
2. **Unknowns explicit:** Use `UNKNOWN / REQUIRES VALIDATION` for unresolved requirements, environment, browser matrix, SLOs and deployment behavior.
3. **Stable IDs:** Reuse/allocate monotonic `REQ-xxx`, `FEAT-xxx`, `SCN-xxx`, `TC-xxx`, `AUT-xxx`, `BUG-xxx` and `RUN-YYYY-NNN`. Search indexes before allocating.
4. **Reproducible tests:** Number steps; include setup, synthetic data, exact command/browser, expected result, actual result and cleanup if needed.
5. **Truthful states:** PASS only after execution; FAIL only after observing a mismatch; BLOCKED after an attempted but prevented test; NOT_RUN/NOT_EXECUTED when unattempted; N/A only when architecture establishes it.
6. **No fake evidence:** Never synthesize screenshots, logs, API responses, timing data, coverage numbers or test outcomes. Link raw evidence from the run.
7. **Privacy:** Never commit credentials, tokens, production records or personal data. Use environment placeholders and disposable synthetic accounts only when needed.
8. **Scope protection:** Do not modify production code, dependencies, deployment config or test environment without explicit authorization. Avoid broad changes to force a green report.
9. **No unnecessary tooling:** Reuse Node tests, TypeScript, Next lint/build and npm audit. Browser/API/database/performance tools remain unselected where no feature requires them; seek approval before introducing dependencies.
10. **Bug discipline:** Every bug has expected/actual, reproducible status, evidence, severity/priority and a linked regression test. Keep static-review confidence separate from runtime verification.
11. **Traceability:** Every important requirement should map through feature, scenario and case to an automation result or explicitly `NONE / MANUAL / NOT_RUN`, plus execution evidence where available.
12. **Final audit:** Verify links, IDs, counts, no secrets, source alignment and truthful statuses. Follow Analyze → Plan → Test → Record → Verify → Report.
