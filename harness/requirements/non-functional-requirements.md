# Non-Functional Requirements and Targets

No formal NFR/SLO or compliance document was found. The left-hand items below are either observable design constraints or quality goals to validate; they are not all contractual requirements.

| ID | Requirement / quality goal | Evidence / status | Validation |
| --- | --- | --- | --- |
| NFR-001 | Build and serve a production Next.js app with a prerendered root page. | `npm run build` passed in RUN-2026-001; `/` and `/_not-found` were statically prerendered. | Build check; target-host verification remains open. |
| NFR-002 | Provide responsive layouts and keyboard focus styling. | CSS includes breakpoints at 1080, 760 and 520 px and visible button/range focus selectors. No viewport/browser audit executed. | Manual `TC-101`, `TC-107`. |
| NFR-003 | Respect reduced-motion preference. | React hooks and CSS query reduce/disable animation; training has an instant path. | Manual `TC-105`; not executed. |
| NFR-004 | Avoid runtime dependence on remote font downloads. | Fonts are local `src/fonts/*` files loaded with `next/font/local`. | Build passed; no offline browser test. |
| NFR-005 | Keep user corpus and input on the client according to checked-in implementation. | No app request code or server persistence found; text lives in client page state. | Code review only; deployed network behavior UNKNOWN / REQUIRES VALIDATION. |
| NFR-006 | Tokenizer interaction should remain responsive for realistic corpus sizes. | No input-size limit, performance benchmark, or response-time target found. | **UNKNOWN / REQUIRES VALIDATION**; run the plan in `test-scenarios/performance.md`. |
| NFR-007 | Meet accessibility requirements (e.g., WCAG level). | Some semantic landmarks, labels, pressed states and reduced-motion support are present; no conformance target/audit found. | **UNKNOWN / REQUIRES VALIDATION**; manual audit not run. |
| NFR-008 | Production delivery should have suitable security headers and dependency hygiene. | No header/CSP config found; npm audit on 2026-10-07 reports 23 total findings, including critical issues. | Audit fails; see BUG-001. Deployment headers are UNKNOWN / REQUIRES VALIDATION. |

### Environment constraints

The repository does not pin a Node version. `package.json` provides Next dev/build/start/lint scripts, and `next.config.ts` enables React strict mode. Current validation used Node 22.22.3/npm 10.9.8. Establish and document a supported version matrix before release.
