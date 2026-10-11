# FEAT-002 Known Issues and Gaps

- **BUG-002 RESOLVED:** exact round-trip comparison now distinguishes whitespace-normalized output; browser regression verified in RUN-2026-002.
- An unseen non-ASCII input code point becomes an unknown piece unless included in the training corpus. This is current behavior, not a confirmed defect; unknown Unicode rendered correctly in Chromium.
- Multiple spaces/newlines normalize to one separator; exact formatting preservation is not implemented. The UI now reports a difference for the tested leading/trailing-whitespace case.
- Browser copy IDs/decoded, keyboard shortcuts, Fill/Clear/Replay were exercised in Chromium; clipboard-denied fallback and other platforms' keyboard shortcuts remain untested.
- Firefox, WebKit/Safari and Edge were not exercised.
