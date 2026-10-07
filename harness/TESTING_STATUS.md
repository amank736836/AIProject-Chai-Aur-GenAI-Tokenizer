# Testing Status

**Last verified:** 2026-10-07  
**Execution:** [`RUN-2026-001`](test-results/historical/RUN-2026-001.md)  
**Commit under test:** `8f61d26840e4ac916b33ecf668b93ac2efd6e9ee` (baseline commit; harness changes are being added on the session branch)  
**Environment:** Node 22.22.3, npm 10.9.8; clean `npm ci`; Linux sandbox.

## Results at a glance

| Check | Result | Evidence |
| --- | --- | --- |
| Tokenizer unit tests | 10/10 PASS | [`tokenizer-tests.log`](evidence/logs/RUN-2026-001-tokenizer-tests.txt) |
| Harness Markdown links | 171 local links across 96 docs verified | [`link-check.log`](evidence/logs/RUN-2026-001-link-check.txt) |
| `npm run lint` | PASS | [`lint.log`](evidence/logs/RUN-2026-001-lint.txt) |
| `npx tsc --noEmit` | PASS | [`typecheck.log`](evidence/logs/RUN-2026-001-typecheck.txt) |
| `npm run build` | PASS; `/` and `/_not-found` statically prerendered | [`build.log`](evidence/logs/RUN-2026-001-build.txt) |
| Full dependency audit | FAIL: 23 findings (2 moderate, 19 high, 2 critical) | [`npm-audit.log`](evidence/logs/RUN-2026-001-npm-audit.txt) |
| Production-only dependency audit | FAIL: 5 findings (4 high, 1 critical) | Same audit log |
| Browser UI / API / database / performance / VAPT | NOT_EXECUTED / not applicable for DB | No browser, DB or custom API test environment configured |

> The tokenizer runner actually executed and all 10 cases passed. Build, lint, type-check and audit results are from actual commands run in this checkout; they do not prove browser behavior or deployment readiness.

## Current blockers and gaps

- **Release/security blocker:** npm audit reports vulnerable versions in the resolved dependency graph, including direct `next@15.4.10`; see [BUG-001](bugs/open/BUG-001.md). No dependency upgrade was made.
- The UI has no browser automation suite. Training controls, clipboard/download, theme persistence, keyboard interactions, responsive layout, focus, and reduced-motion behavior need manual browser execution.
- No formal product requirements, supported browser matrix, performance thresholds, deployment configuration, security-header policy or user roles were found.
- API/database coverage is not applicable to the current code; confirm if deployment adds external services.
- The encode section's “lossless round trip” indicator compares trimmed, lower-case strings while decode normalizes whitespace. See [BUG-002](bugs/open/BUG-002.md); a manual UI regression case is defined but not executed.

## How to update

After each actual run, update `test-results/latest/execution.md`, add a dated historical run, refresh evidence links and update requirement/feature coverage. Never copy a previous run's PASS status into a new run without executing it.
