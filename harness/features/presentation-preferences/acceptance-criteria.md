# FEAT-005 Acceptance Criteria

These checkboxes describe expected criteria, not release sign-off; execution status is recorded in the linked test cases.

- [x] Mobile navigation opens by keyboard/touch, Escape closes and restores focus, anchors/back-forward work (TC-101/107; Chromium, RUN-2026-002).
- [x] User-selected light/dark theme survives reload; blocked localStorage falls back to OS color scheme and still allows an in-session toggle (TC-105; Chromium, RUN-2026-002). Normal first-visit OS-scheme fallback without a stored value remains untested.
- [x] Speed selection survives reload and stores the selected 38ms interval (TC-102/105; Chromium, RUN-2026-002).
- [ ] Full reduced-motion equivalence (CSS and training duration) remains unverified; both reduced and no-preference contexts were exercised.
- [ ] Full tab-order/screen-reader checks remain untested. Responsive geometry, touch interaction and four WCAG-tagged axe audits passed in Chromium; axe left color-contrast nodes incomplete for manual review (TC-107).
