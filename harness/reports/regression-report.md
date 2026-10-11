# Regression Report — RUN-2026-002

## Scope executed

- Core BPE and reference tokenizer behavior (10 unit cases).
- Production build and 11 Playwright Chromium E2E tests covering responsive bounds, mobile landscape, hero actions, navigation/history, keyboard/touch, theme/storage, training, encode/decode, vocabulary/export, markup-inertness, axe and offline/delayed-assets stability.
- Lint, TypeScript, local Markdown-link validation and full/production-only dependency audits.
- Three confirmed UI defects were fixed and regressed: exact round-trip semantics (BUG-002), tilt-control pointer hit-testing (BUG-003), and blocked-localStorage theme initialization (BUG-004).

**Result:** All 10 module tests and all 11 browser tests passed; lint/typecheck/build/link validation passed. Full `npm audit` remains a finding-level failure (five high dev/build advisories), while the production-only audit passed with zero. See [execution record](../test-results/historical/RUN-2026-002.md).

## Regression areas not executed or incomplete

- Firefox, Safari/WebKit, Edge, physical devices and true browser zoom.
- Full keyboard tab order, screen readers, voice control and manual color-contrast review (axe contrast rule incomplete on many nodes).
- Clipboard-denied path, all built-in preset variants, normal first-visit OS-theme fallback, large-corpus throughput, memory profile, repeatable performance thresholds.
- Hosted HTTP smoke, CSP/security headers, VAPT and deployment environment checks.

## Open risk

- **BUG-001:** five high npm audit advisory matches in development/build dependencies; production-only audit is clean. Owner-compatible dependency fix or risk acceptance remains pending.

## Next regression run

After UI changes run `npm run test:e2e` plus relevant unit/static checks. After dependency changes re-run the full suite and both audits. Add Firefox/WebKit/Edge/true-zoom and assistive-technology evidence when those environments are available; do not convert those gaps to PASS from Chromium results.
