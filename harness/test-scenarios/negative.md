# Negative Scenarios

## SCN-101 — Unknown and invalid values

1. Train using an ASCII corpus, then encode an unseen non-ASCII code point; verify the encoder returns an unknown piece/ID and does not throw.
2. Decode an out-of-range/negative ID; verify no exception and record the implementation's `<UNK>` handling (currently unknown IDs are mapped to a special token and omitted from decoded text).
3. Train on empty/one-symbol corpus and request more entries than can be learned; verify termination and that actual vocab size need not equal target.
4. Enter markup-looking text in the browser and verify it is rendered as literal text, not executed.
5. Deny clipboard access and verify the UI does not crash and provides a status message.

**Cases:** TC-004, TC-005, TC-008, TC-104, TC-106. Module cases executed as listed in RUN-2026-001; markup/clipboard browser checks NOT_EXECUTED.
