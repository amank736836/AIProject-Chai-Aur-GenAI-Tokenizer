# Project Test Harness

This folder is the maintained, evidence-based home for project understanding, requirements, feature behavior, test scenarios/cases, automation, test data, results, issues, reports and AI-agent guidance. It is specific to the repository at the time each RUN record was created. It does not claim tests passed unless a stored execution record proves they ran.

## Quick start

From the repository root:

```sh
npm ci
node harness/automation/scripts/run-tokenizer-tests.mjs
node harness/automation/scripts/verify-harness-links.mjs
npm run lint
npx tsc --noEmit
npm run build
```

For a production dependency audit:

```sh
npm audit
npm audit --omit=dev
```

At the initial harness run, all 10 tokenizer tests, local link validation, lint, type-check and build passed; npm audits reported findings and exited 1. See [`test-results/latest/execution.md`](test-results/latest/execution.md). A successful build is not a browser UI test. There is no configured API or database suite.

## Where things live

| Need | Location |
| --- | --- |
| Project purpose and verified stack | [`PROJECT_OVERVIEW.md`](PROJECT_OVERVIEW.md) |
| Architecture/data flow/security boundaries | [`ARCHITECTURE.md`](ARCHITECTURE.md) |
| Requirements and tokenizer rules | [`requirements/`](requirements/README.md) |
| Feature inventory and feature-level docs | [`features/`](features/README.md) |
| Test approach and current status | [`TESTING_STRATEGY.md`](TESTING_STRATEGY.md), [`TESTING_STATUS.md`](TESTING_STATUS.md) |
| Scenarios | [`test-scenarios/`](test-scenarios/README.md) |
| Detailed test cases | [`test-cases/`](test-cases/README.md) |
| Test tools and setup | [`test-tools/`](test-tools/README.md), [`test-tools/setup.md`](test-tools/setup.md) |
| Automated tests and runner | [`automation/`](automation/README.md) |
| Reusable synthetic inputs | [`test-data/`](test-data/README.md) |
| Current and historical execution records | [`test-results/`](test-results/README.md) |
| Raw logs/audit evidence | [`evidence/`](evidence/README.md) |
| Open/resolved bugs | [`bugs/`](bugs/README.md) |
| Traceability, coverage, readiness and summaries | [`reports/`](reports/README.md) |
| AI testing instructions | [`ai/`](ai/README.md) |

## How to maintain the harness

### Add a feature

1. Confirm the behavior and module from source/docs; do not infer unimplemented product scope.
2. Assign the next `FEAT-xxx` ID in `features/README.md` and add a feature folder with README, requirements, behavior, acceptance criteria, scenarios, test cases, test data and known issues.
3. Link code-derived requirements (`REQ-xxx`) to stable scenarios (`SCN-xxx`) and cases (`TC-xxx`) in `reports/traceability.md`.
4. Mark unclear product intent `UNKNOWN / REQUIRES VALIDATION`.

### Add a test

1. Define a reproducible scenario and synthetic data first.
2. Assign a `TC-xxx` ID and include preconditions, numbered steps, data, expected result, actual result, status, automation, evidence, related requirement/bug and last execution.
3. For automated tests, add/maintain an `AUT-xxx` mapping. Prefer existing tools; no new test framework is currently needed for tokenizer logic.
4. Execute the test before using PASS. Keep UI cases `NOT_RUN` until a browser is actually used.

### Record a bug

Create `bugs/open/BUG-xxx.md` using the template in `bugs/README.md`; record reproducible steps, actual result, root-cause confidence, evidence and a regression case. Move it to `resolved/` only after a verification run.

### Record a run and coverage

Create a new `RUN-YYYY-NNN` record; retain raw logs/evidence; update `test-results/latest/execution.md`, `TESTING_STATUS.md`, `reports/test-summary.md`, `coverage.md`, `traceability.md` and readiness. Do not overwrite historical runs or copy stale statuses.

## Applicability

This repository contains a client-side Next.js single-page tokenizer. No custom backend, API, authentication service, or database was found, so API/database testing is explicitly documented as not applicable. Performance targets, supported browsers, production hosting settings and formal accessibility requirements are not present and remain `UNKNOWN / REQUIRES VALIDATION`.

## AI agent usage

Start with [`ai/test-agent-instructions.md`](ai/test-agent-instructions.md). Follow the mandatory cycle:

> **Analyze → Plan → Test → Record → Verify → Report**

An AI agent must not claim a pass from code inspection, expected behavior, or successful build alone. Record unrun checks as `NOT_EXECUTED`/`NOT_RUN` and keep application source unchanged unless a separate, explicitly approved fix is needed.
