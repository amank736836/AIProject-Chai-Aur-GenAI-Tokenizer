# FEAT-002 Acceptance Criteria

These checkboxes describe expected criteria, not release sign-off; execution status is recorded in the linked test cases.

- [ ] Encoding includes BOS/EOS and numeric IDs correspond to returned pieces (TC-003).
- [ ] Known trained input round-trips with normalized spaces (TC-003, TC-006).
- [ ] Unknown input code points are visibly countable as unknown and do not throw (TC-005).
- [ ] Unknown numeric IDs are handled without a crash (TC-008).
- [ ] UI results update while typing; Enter copy, clear hotkey and clipboard fallback work in a browser (TC-103; NOT_EXECUTED).
- [ ] The round-trip state describes the actual normalization semantics; current UI criterion is not met for outer whitespace (TC-108; NOT_EXECUTED; BUG-002).
