# Test Tools Inventory

| Tool | Purpose | Where configured / how to run | Status |
| --- | --- | --- | --- |
| Node.js built-in test runner (`node:test`) | Core tokenizer unit cases | `node harness/automation/scripts/run-tokenizer-tests.mjs` | 10 tests passed in RUN-2026-002 |
| TypeScript compiler / compiler API | Compile tokenizer sources for unit tests and type-check app | Existing dependency; runner and `npx tsc --noEmit` | Passed RUN-2026-002 |
| Next.js CLI | Development, production build/start | `npm run build`, `npm run start` | Build passed RUN-2026-002 |
| ESLint 9 + Next config | Source and harness lint | `npm run lint` | Passed RUN-2026-002 |
| Playwright Test + bundled Sparticuz Chromium | Rendered production-page E2E in headless Chromium; no external browser install | `npm run test:e2e`; `harness/automation/e2e/` | 11 tests passed in Chromium in RUN-2026-002; Firefox/WebKit/Edge not exercised |
| axe-core Playwright | Automated WCAG-tagged checks | In Playwright E2E suite | Zero automated violations in 4 viewport/theme audits; contrast rule has incomplete manual-review results |
| Harness link checker | Verify local Markdown references | `node harness/automation/scripts/verify-harness-links.mjs` | Passed in RUN-2026-002; see latest run record |
| `npm audit` | Dependency advisory matching | `npm audit`, `npm audit --omit=dev` | Five high dev/build-tree matches; zero production-only findings (RUN-2026-002) |

The harness has no database or custom API automation because the checked-in app has neither. The current automated browser engine is Chromium only; supported-browser policy remains unknown.
