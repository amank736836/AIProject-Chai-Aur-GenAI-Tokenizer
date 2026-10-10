# FEAT-002 Known Issues and Gaps

- **BUG-002 (OPEN, P2):** `roundTripOk` compares trimmed, lower-case strings, so leading/trailing whitespace is ignored while `decode()` strips it. The UI can label a changed string “lossless round trip.” A manual reproduction case exists; the browser UI has not been executed.
- An unseen non-ASCII input code point becomes an unknown piece unless included in the training corpus. This is current behavior, not a confirmed defect.
- Multiple spaces/newlines normalize to one separator; exact formatting preservation is not implemented.
- Browser clipboard behavior and keyboard shortcuts have not been exercised in real browsers.
