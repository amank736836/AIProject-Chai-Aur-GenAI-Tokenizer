# Playground UI — Edge Cases

## TC-107 — Keyboard-only, reduced viewport and focus visibility

- **Feature:** FEAT-005
- **Priority:** P1
- **Type:** Manual UI/accessibility
- **Preconditions:** Browser DevTools responsive mode; keyboard only for first pass.
- **Steps:** 1. Set viewport to 320 px, 768 px and desktop. 2. Tab through navigation, inputs, buttons, filters and theme toggle. 3. Activate controls with keyboard. 4. Verify focus indicator, reading order, no horizontal overflow and no obscured controls. 5. Repeat with reduced motion and browser zoom.
- **Test Data:** 320×800, 768×900 and 1440×900 viewports; keyboard; 200% zoom.
- **Expected Result:** All controls remain reachable/usable; visible focus; no essential content is hidden or clipped; motion preference is respected.
- **Actual Result:** NOT_EXECUTED.
- **Status:** NOT_RUN
- **Automation:** MANUAL
- **Evidence:** None (not executed).
- **Related Requirement:** NFR-002, NFR-003, NFR-007
- **Related Bug:** None
- **Last Executed:** NOT_EXECUTED
