# Instructions for an AI Test Agent

## Mission and non-negotiable workflow

Maintain evidence-backed understanding and tests for this repository. Always perform:

> **Analyze → Plan → Test → Record → Verify → Report**

Never state that a test passed unless it was actually executed in the stated environment or reliable run evidence is linked. Code reading and a successful build are not substitutes for browser/UI execution.

## 1. Analyze the project

1. Read `harness/README.md`, `PROJECT_OVERVIEW.md`, `ARCHITECTURE.md`, `TESTING_STRATEGY.md`, `TESTING_STATUS.md` and relevant feature/requirement docs.
2. Inspect current source/config and `git status`; documentation may lag source.
3. The app is a Next.js 15 / React 19 / TypeScript client-side tokenizer playground. Core modules are `src/lib/bpe.ts` and `src/tokenizer.ts`; page/state is in `src/app/page.tsx`.
4. Current repository evidence shows no custom API, database, auth provider or existing browser automation framework. Do not invent them. Confirm again if architecture has changed.
5. Use `UNKNOWN / REQUIRES VALIDATION` wherever source/config/docs do not establish an answer.

## 2. Plan

1. Select relevant `REQ-xxx`, `FEAT-xxx`, `SCN-xxx`, `TC-xxx` and existing `AUT-xxx` IDs before testing.
2. Prefer targeted, risk-based, non-destructive tests using synthetic fixtures in `harness/test-data/`.
3. Review `bugs/open/` and prior RUN evidence; include relevant regressions.
4. State which checks are automated, manual, blocked, not run or not applicable. Do not claim browser, API, DB, VAPT or performance coverage if no such test was executed.
5. Avoid dependency updates, secret-bearing integrations, production data, and broad source changes unless separately authorized.

## 3. Run tests

From repository root, after `npm ci`:

```sh
node harness/automation/scripts/run-tokenizer-tests.mjs
npm run lint
npx tsc --noEmit
npm run build
```

Run `npm audit` / `npm audit --omit=dev` when checking dependencies; current recorded state has findings in BUG-001. Browser scenarios are in `test-scenarios/ui.md`; the repository does not include browser automation. API/database scenarios are N/A for the current architecture. Performance and VAPT procedures are plans, not executed tests.

Do not run destructive commands, deploy, change dependencies, or modify application behavior merely to make a test pass.

## 4. Generate new cases

1. Read requirements and source; write expected behavior only when supported.
2. Use the required format in `test-cases/README.md` and assign stable `TC-xxx` IDs.
3. Link to a requirement, feature, scenario, automation ID and bug where applicable.
4. Prefer deterministic unit tests with the existing Node runner for pure tokenizer behavior. Do not add a framework without a clear need/approval.
5. For UI cases, record exact browser/version, viewport, storage/motion settings and repeatable steps.

## 5. Record results and evidence

1. Allocate a new `RUN-YYYY-NNN`; include date, environment, commit, tester/agent and exact commands.
2. Record per-case `PASS`, `FAIL`, `BLOCKED` or `NOT_RUN`; use `NOT_EXECUTED` for unattempted actual results. Do not infer outcomes.
3. Preserve relevant stdout/stderr, audit JSON, screenshots or logs under `evidence/`, redacting sensitive data.
4. Link each result to evidence. If the test did not run, evidence must say none/not executed.
5. Keep `test-results/latest/` current and add a historical record; never overwrite old runs.

## 6. Identify and triage bugs

1. A mismatch may be reported as a bug only with a specific expected-vs-actual basis from a requirement or code-derived rule.
2. Separate static source observations from reproduced runtime bugs. State confidence and reproduction status.
3. Create `BUG-xxx` using the template; include severity, priority, environment, preconditions, steps, evidence, root-cause status, proposed fix and regression case.
4. Do not change source as part of test documentation unless explicitly requested. For a real fix, scope it separately and add/run regression tests.

## 7. Update documentation

Update traceability and coverage when IDs/cases change; update known issues and release readiness when risks change. Do not duplicate large explanations—link to the authoritative feature/scenario/case. Recheck relative links and all IDs before finishing.

## 8. Verify and report

After writing, run the tests you changed, inspect `git diff`, validate links and ensure no secrets/production data were added. Final report must list exact counts from inventory/results, executed commands, pass/fail/not-run/N/A, issues and limitations. Do not mark release ready while the evidence says otherwise.
