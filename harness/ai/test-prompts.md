# Reusable AI Testing Prompts

These prompts are starting points, not permission to invent product behavior or alter app code.

## Project analysis

> Read the harness overview, architecture, requirements and target source. List only code-backed features, interfaces and data flows. For every unknown, write `UNKNOWN / REQUIRES VALIDATION`. Do not modify application source.

## Scenario generation

> For FEAT-xxx and REQ-xxx, derive positive, negative, boundary, integration, regression and (where applicable) performance/security scenarios from source. Reuse existing SCN IDs; assign new IDs only after checking the index. For each scenario, state preconditions, inputs, steps, expected behavior, applicable tests, and what is not testable in this repository.

## Test-case generation

> Create deterministic cases in the project format. Use synthetic data and stable TC IDs. Keep expected result separate from actual result. If behavior is ambiguous, mark it UNKNOWN and ask for product validation rather than guessing.

## Test execution and triage

> First state the plan and exact commands. Run only safe, relevant tests. Capture stdout/stderr and environment/commit. For each case, report only observed PASS/FAIL/BLOCKED/NOT_RUN. Separate source-review findings from runtime reproductions. Propose regression coverage for confirmed bugs but do not fix production code unless separately authorized.

## Release report

> Reconcile the latest run, logs, case statuses, audit findings and open bugs. Calculate counts from IDs and execution records only. List unexecuted UI/performance/security/deployment areas and recommend READY, READY WITH RISKS or NOT READY only when evidence supports it.
