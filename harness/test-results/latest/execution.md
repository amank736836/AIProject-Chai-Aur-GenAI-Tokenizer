# Latest Execution

**Execution ID:** RUN-2026-001  
**Date:** 2026-10-07  
**Environment:** Linux sandbox; Node 22.22.3, npm 10.9.8; clean install via `npm ci`.  
**Commit under test:** `8f61d26840e4ac916b33ecf668b93ac2efd6e9ee` (application sources); harness files were working-tree additions during this run.  
**Tester/Agent:** Arena Agent Mode  
**Test Suite:** Node `node:test` tokenizer suite; harness Markdown link validation; ESLint; TypeScript check; Next production build; full and production-only npm audits.

## Results

| Measure | Result |
| --- | ---: |
| Total executed checks | 16 (10 unit tests + 4 static/build/documentation checks + 2 dependency audits) |
| Passed | 14 (10 unit + link check + lint + type-check + build) |
| Failed | 2 (audit commands exit 1 because advisories were found) |
| Blocked | 0 |
| Not run | 8 manual UI cases; performance profiling and VAPT; deployment HTTP smoke |
| Not applicable | Database suite; custom API functional suite |
| Core tokenizer case pass rate | 10/10 (100%) |
| All executed check-item rate | 14/16 (87.5%; includes security scans that correctly fail on findings) |

**Critical failures:** full dependency audit reports 2 critical; production-only audit reports 1 critical and 4 high. These are npm advisory findings, not proven exploits.  
**Known issues:** BUG-001 (dependency advisories, OPEN); BUG-002 (round-trip indicator semantics, OPEN; UI case not run).  
**Evidence:** [tokenizer tests](../../evidence/logs/RUN-2026-001-tokenizer-tests.txt), [link check](../../evidence/logs/RUN-2026-001-link-check.txt), [lint](../../evidence/logs/RUN-2026-001-lint.txt), [typecheck](../../evidence/logs/RUN-2026-001-typecheck.txt), [build](../../evidence/logs/RUN-2026-001-build.txt), [audit summary and raw JSON](../../evidence/logs/RUN-2026-001-npm-audit.txt).

Full command list and notes: [`../historical/RUN-2026-001.md`](../historical/RUN-2026-001.md). This run does not establish browser UI, production host, performance, accessibility or VAPT readiness.
