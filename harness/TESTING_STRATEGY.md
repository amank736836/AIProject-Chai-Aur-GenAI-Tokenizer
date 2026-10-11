# Testing Strategy

## Scope and constraints

This is a client-side Next.js tokenizer playground, not a multi-service application. Test effort covers pure tokenizer logic and rendered browser behavior. There is no custom API, database or authentication service. The harness uses Node `node:test`, Playwright with bundled Chromium and axe-core; no browser other than Chromium is currently exercised.

## Risk-based priorities

1. **P0 — BPE core:** vocabulary IDs, frequency-selected merges, budget/exhaustion, ranked encoding and canonical decode.
2. **P1 — user-visible flows:** training, encode/decode, vocabulary search/export, keyboard/touch interactions, theme/storage and reduced-motion behavior.
3. **P1 — supply chain:** review the full dependency audit; current findings are high severity but dev/build-only; production-only audit is clean. Track BUG-001.
4. **P2 — input boundaries:** empty/whitespace, punctuation, untrained/unseen Unicode, invalid IDs, repeated training, blocked storage/markup and unusually large text.
5. **P2 — non-functional:** cross-browser/zoom/assistive-technology coverage, performance on large corpora, capability fallbacks and deployment headers.

## Levels and tools

| Level | Method/tool | Current result |
| --- | --- | --- |
| Unit / logic | Node `node:test`; TypeScript compiler API; temporary compilation | 10/10 PASS, RUN-2026-002 |
| Static / type / docs links | ESLint; `tsc --noEmit`; harness link checker | All PASS; 233 local Markdown links across 100 harness docs |
| Build / prerender smoke | `npm run build`, also included by `npm run test:e2e` | PASS; `/` and `/_not-found` statically rendered |
| UI / browser | Playwright production build in bundled Chromium 153.0.8010.0 | 11/11 E2E PASS, AUT-017; Firefox/WebKit/Edge/true zoom not executed |
| Accessibility | axe-core WCAG-tagged audits | 4 audits, 0 violations; contrast incomplete for hundreds of nodes, manual review pending (AUT-018) |
| API | No custom API | Not applicable |
| Database | No database/schema | Not applicable |
| Performance | Performance observers in one local production run | Metrics recorded, not graded; no target/device profile |
| Security | `npm audit`, production audit, markup-inertness browser case | Five high dev/build advisory matches; zero production findings; full VAPT not executed |

## Execution principles

- Record exact date, environment, browser/version, commit basis, commands and evidence in a new `RUN-YYYY-NNN` record.
- PASS applies only after actual execution. Use `PARTIAL` for partial requirements and `NOT_RUN`/`NOT_EXECUTED` for untested checks.
- Keep expected behavior in requirements/cases and observed behavior in run evidence.
- Treat npm audit output as advisory matching, not proof of exploitability. Do not apply incompatible major-version fixes blindly.
- Do not imply a narrow viewport is actual browser zoom, touch emulation is physical-device testing, or axe output is a WCAG certificate.
- Do not modify application code without user authorization. When an audit/fix is requested, apply minimal confirmed fixes and add/run browser regressions.

## Test data and privacy

Fixtures are synthetic and public. No credentials, production data, external API, database or secret is required. Corpus and encode data are exercised locally; hosted behavior remains UNKNOWN / REQUIRES VALIDATION.

## Traceability

Requirements → features → scenarios → cases → automation → run result/evidence are mapped in [`reports/traceability.md`](reports/traceability.md). Current status is in [`TESTING_STATUS.md`](TESTING_STATUS.md), [`reports/coverage.md`](reports/coverage.md) and [release readiness](reports/release-readiness.md).
