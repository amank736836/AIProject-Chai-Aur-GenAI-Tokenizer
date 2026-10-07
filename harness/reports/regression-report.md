# Regression Report — RUN-2026-001

## Scope executed

- Core BPE behavior: base IDs, most-frequent pair merge, encode/decode, target/exhaustion, Unicode known/unknown fallback, whitespace normalization, full-vs-step training, unknown IDs.
- Reference tokenizer's fixed valid sample.
- Vocabulary entry and JSON serialization mapping.
- Lint, TypeScript check and production build.
- Full and production-only npm dependency audit.

**Automated result:** 10/10 tokenizer tests passed; lint/typecheck/build passed. Audit checks failed on reported dependency findings. See [execution record](../test-results/historical/RUN-2026-001.md).

## Regression areas not executed

- Browser training controls, timer/stop behavior, first-load animations.
- Live page update pipeline, clipboard, hotkeys, vocabulary filters and file download.
- Theme/localStorage, reduced motion, mobile breakpoints, keyboard/screen-reader behavior.
- Hosted HTTP/security headers, browser network inspection, performance/load and VAPT.

All eight UI cases are NOT_RUN. Database and custom API regression are N/A in this checkout.

## Open regressions/bugs

- **BUG-001:** dependency advisories; update decision and rerun all commands before release.
- **BUG-002:** exact-vs-normalized round-trip label; TC-108 is a pending manual regression.

## Next regression run

After tokenizer source changes run the Node suite plus lint/typecheck/build. After UI changes execute TC-101–TC-108 in a real browser and collect artifacts. After dependency changes run both npm audits; don't close BUG-001 from a successful build alone.
