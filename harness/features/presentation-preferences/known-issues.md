# FEAT-005 Known Issues and Gaps

- No formal WCAG target or supported browser list is established. RUN-2026-002 axe-core audits reported zero violations for the tested WCAG 2.2 AA tags at mobile/desktop in light/dark; the color-contrast rule remained incomplete and needs manual review.
- Chromium headless browser tests passed for responsive layouts, mobile nav, keyboard activation/Escape/focus return, touch, theme and speed persistence. Firefox, WebKit/Safari, Edge, physical devices, true browser zoom, full tab-order and screen-reader behavior remain untested.
- BUG-004 (resolved in RUN-2026-002): `ThemeToggle` now catches storage access errors and retains an in-session theme. Normal first-visit OS-preference fallback without a blocked-storage injection remains untested.
- No deployment-level CSP/security-header configuration was found. Five high dev/build dependency advisory matches are tracked by BUG-001; production-only audit is clean.
