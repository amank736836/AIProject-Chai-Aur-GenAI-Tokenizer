# Regression Scenarios

Run these after changes to tokenizer logic, training state, export, styles or dependencies:

1. **BPE invariants:** special/base IDs, most-frequent merge, target/exhaustion, ranked encode/decode and Unicode fallback — TC-001–TC-008.
2. **Reference baseline:** fixed word-level encode/decode — TC-009.
3. **Vocabulary output:** IDs and serialized map — TC-010; rendered filtering/export — TC-104.
4. **User-visible controls:** training, speed/stop, encode/decode, keyboard/touch, theme persistence and responsive layouts — TC-101–TC-107; automated Chromium coverage is recorded in RUN-2026-002, with case-level gaps explicitly marked PARTIAL.
5. **Round-trip wording:** verify exact equality vs whitespace normalization — TC-108; BUG-002 resolved and browser regression passed in RUN-2026-002.
6. **Tilt hit-testing:** pointer/touch activation of speed buttons — BUG-003 resolved and regression passed in RUN-2026-002.
7. **Dependency posture:** rerun `npm audit` / `npm audit --omit=dev`; BUG-001 remains open (five high dev/build advisories, zero production-only findings in RUN-2026-002).

Current regression run: see [`RUN-2026-002`](../test-results/historical/RUN-2026-002.md). Cross-engine testing, true browser zoom, full screen-reader review, performance thresholds and deployed security headers remain unexecuted.
