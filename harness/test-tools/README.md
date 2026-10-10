# Test Tools Inventory

Only tools already in the project or Node runtime are used by the automation. No new package was added.

| Tool | Purpose | Where configured / how to run | Status |
| --- | --- | --- | --- |
| Node.js built-in test runner (`node:test`) | Executable tokenizer unit tests and assertions | `node harness/automation/scripts/run-tokenizer-tests.mjs` | Harness suite added; actual result in RUN-2026-001 |
| TypeScript compiler / compiler API | Strictly compile tokenizer sources to a temporary test directory | Existing `typescript` dev dependency; invoked by the runner | Existing project dependency |
| Next.js CLI | Development, production build/start, lint | `npm run dev`, `npm run build`, `npm run start`, `npm run lint` | Existing |
| ESLint 9 + Next config | Source lint | `npm run lint` | Existing; passed RUN-2026-001 |
| Harness link checker | Verify local Markdown references | `node harness/automation/scripts/verify-harness-links.mjs` | Added script; recorded as AUT-016 |
| `npm audit` | Dependency advisory matching | `npm audit` and `npm audit --omit=dev` | Existing npm; findings tracked by BUG-001 |
| Browser DevTools / manual browser | UI/network/accessibility/performance checks | Procedure in `setup.md` and scenario docs | Browser tool not installed/used in this environment |

No API, database, mocking, performance, browser automation, or VAPT tool is configured. No test framework such as Jest, Vitest, Playwright or Cypress was found.
