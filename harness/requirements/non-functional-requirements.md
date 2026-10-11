# Non-Functional Requirements and Targets

No formal NFR/SLO or compliance document was found. These are observable design constraints or quality goals, not contractual thresholds.

| ID | Requirement / quality goal | Evidence / status | Validation |
| --- | --- | --- | --- |
| NFR-001 | Build and serve a production Next.js app with a prerendered root page. | `npm run test:e2e` built successfully in RUN-2026-002; `/` and `/_not-found` statically prerendered. | Build pass; target-host behavior remains open. |
| NFR-002 | Provide responsive layouts and keyboard focus styling. | 13 Chromium viewport widths (320–2560px) and 844×390 landscape had no measured horizontal overflow; keyboard subset passed. | RUN-2026-002; full tab order, other engines and true browser zoom remain untested. |
| NFR-003 | Respect reduced-motion preference. | Reduced and no-preference contexts were exercised; hero animation and training interactions passed. | Partial E2E evidence; full reduced-motion timing/CSS equivalence was not graded. |
| NFR-004 | Avoid runtime dependence on remote font downloads. | Fonts are local `src/fonts/*` via `next/font/local`; production page remained interactive offline in the tested flow. | Build and offline E2E pass; full deployed network review remains open. |
| NFR-005 | Keep user corpus/input local according to checked-in implementation. | Source stores text in client state; no app request code found; markup-looking encoder text remained inert. | Code review + TC-106 + offline interaction passed locally; deployed behavior UNKNOWN / REQUIRES VALIDATION. |
| NFR-006 | Tokenizer interaction should remain responsive for realistic corpus sizes. | One 500-character encode sample and a single synthetic page performance run recorded; no large-corpus profile, benchmark target or device budget. | **NOT GRADED**; SLO UNKNOWN / REQUIRES VALIDATION. See `test-scenarios/performance.md`. |
| NFR-007 | Meet accessibility requirements (e.g., WCAG level). | Four axe-core WCAG-tagged audits reported zero violations; color-contrast remained incomplete for hundreds of nodes. | Automated Chromium evidence only; manual contrast, screen-reader, voice-control and full tab order NOT_EXECUTED; conformance target UNKNOWN. |
| NFR-008 | Production delivery should have suitable security headers and dependency hygiene. | Full npm audit: five high dev/build advisories; production-only audit: zero. No header/CSP config found. | Full audit exits 1; production audit passes; see BUG-001. Deployment headers UNKNOWN / REQUIRES VALIDATION. |

## Environment constraints

The repository does not pin a Node version. Current validation used Node 22.22.3/npm 10.9.8 and headless Chromium 153.0.8010.0. Only Chromium was exercised; establish a supported engine/device matrix before broad release.
