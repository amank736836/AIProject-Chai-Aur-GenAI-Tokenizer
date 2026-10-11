# FEAT-002 Acceptance Criteria

These checkboxes describe expected criteria, not release sign-off; execution status is recorded in the linked test cases.

- [x] Encoding includes BOS/EOS and numeric IDs correspond to returned pieces (TC-003; RUN-2026-002 unit tests).
- [x] Known trained input round-trips with normalized spaces (TC-003, TC-006; RUN-2026-002 unit tests).
- [x] Unknown input code points are visibly countable as unknown and do not throw (TC-005; unit + Chromium E2E, RUN-2026-002).
- [x] Unknown numeric IDs are handled without a crash (TC-008; RUN-2026-002 unit tests).
- [x] Copy-decoded, Clear, Fill example and Replay controls work in Chromium (TC-103; RUN-2026-002). Clipboard-denied fallback remains untested.
- [x] Exact round-trip state distinguishes outer whitespace normalization from lossless string equality (TC-108; Chromium E2E, BUG-002 RESOLVED, RUN-2026-002).
