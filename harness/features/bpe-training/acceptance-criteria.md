# FEAT-001 Acceptance Criteria

These checkboxes describe expected criteria, not release sign-off; execution status is recorded in the linked test cases.

Observed, code-derived criteria (not formal product approval):

- [x] Base vocabulary contains expected special IDs and 100 standard slots before added corpus characters (TC-001; RUN-2026-002 unit tests).
- [x] A merge step reports the most frequent pair and changes vocabulary/corpus consistently (TC-002; RUN-2026-002 unit tests).
- [x] Requested target below base is clamped; an exhausted corpus terminates without hanging (TC-004; RUN-2026-002 unit tests).
- [x] Full and stepped training produce equivalent learned records for the same input (TC-007; RUN-2026-002 unit tests).
- [x] GenAI glossary preset, custom corpus entry, keyboard budget adjustment, Instant train and all three speeds work with clear status in Chromium (TC-102; RUN-2026-002; remaining preset variants are not exhaustive).
- [x] Mouse/touch speed selection, pause/resume and empty-corpus status work in Chromium (TC-102; RUN-2026-002; partial UI coverage).
- [ ] Reduced-motion browser preference avoids animated training (TC-105; preference contexts were exercised, but the full behavior was not asserted).
