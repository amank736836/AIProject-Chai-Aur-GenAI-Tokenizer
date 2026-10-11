# Playground UI — Edge Cases

## TC-107 — Keyboard-only, reduced viewport and focus visibility

- **Feature:** FEAT-005
- **Priority:** P1
- **Type:** UI/accessibility/responsive
- **Preconditions:** Chromium production build.
- **Steps:** Test narrow, tablet, desktop and mobile-landscape layouts; use keyboard activation, Escape, shortcuts, focus targets and native touch; inspect WCAG-tagged accessibility results.
- **Test Data:** 320, 375, 390, 425, 640, 768, 820, 1024, 1280, 1366, 1440, 1920 and 2560 CSS-pixel widths; 844×390 landscape; effective-width proxies for 200%/400% zoom.
- **Expected Result:** No horizontal overflow/clipped header controls; keyboard/touch operations remain usable; no automatically-detected WCAG 2.2 AA violations.
- **Actual Result:** **PARTIAL.** Chromium responsive checks passed at all listed widths and 844×390; keyboard Enter/Escape/shortcuts, focus return, touch menu/speed/filter, and four axe-core audits (mobile/desktop × light/dark) passed. A 1280px baseline's effective 640px/320px layout widths were exercised as 2×/4× zoom-equivalent proxies, not through actual browser zoom. Full tab-order/screen-reader checks and manual review of axe's incomplete color-contrast nodes remain unverified.
- **Status:** PARTIAL
- **Automation:** Playwright Chromium with a touch-enabled context; axe-core.
- **Evidence:** `harness/automation/e2e/playground.spec.mjs`; [`responsive`](../../evidence/logs/RUN-2026-002-responsive.json), [`accessibility`](../../evidence/logs/RUN-2026-002-accessibility.json), [`screenshots`](../../evidence/screenshots/RUN-2026-002/).
- **Related Requirement:** NFR-002, NFR-003, NFR-007
- **Related Bug:** BUG-003 (RESOLVED)
- **Last Executed:** 2026-10-11 (RUN-2026-002)
