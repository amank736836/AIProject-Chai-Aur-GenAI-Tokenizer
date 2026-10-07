# Regression Scenarios

Run these after changes to tokenizer logic, training state, export, styles or dependencies:

1. **BPE invariants:** special/base IDs, most-frequent merge, target/exhaustion, ranked encode/decode and Unicode fallback — TC-001–TC-008.
2. **Reference baseline:** fixed word-level encode/decode — TC-009.
3. **Vocabulary output:** IDs and serialized map — TC-010; manual filtering/export — TC-104.
4. **User-visible controls:** animated/instant/stop, keyboard copy/clear, theme/persistence/reduced motion and narrow layout — TC-101–TC-107 (all browser cases currently NOT_RUN).
5. **Round-trip wording:** verify normalization and indicator truthfulness — TC-108; BUG-002 remains open.
6. **Dependency posture:** rerun `npm audit`; BUG-001 must be resolved/accepted before release.

Current regression run is limited to automation, static checks and build described by RUN-2026-001; UI regression is NOT_EXECUTED.
