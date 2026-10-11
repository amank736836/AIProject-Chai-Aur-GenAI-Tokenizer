# Playground UI — Negative Cases

## TC-106 — Render markup-looking user input as text

- **Feature:** FEAT-002, FEAT-005
- **Priority:** P1
- **Type:** UI security / input validation
- **Preconditions:** Production page open in Chromium.
- **Steps:** Enter `<img src=x onerror="window.__qaXss=true">` as encoder input; inspect the encode subtree and the test marker.
- **Test Data:** Harmless same-origin markup-looking string; no external payload.
- **Expected Result:** Input is treated as text; no element or event handler is created/executed.
- **Actual Result:** **PASS.** The `#encode` subtree contained no injected `<img>` element and the marker remained `false`.
- **Status:** PASS (automated Chromium case)
- **Automation:** Playwright Chromium.
- **Evidence:** `harness/automation/e2e/playground.spec.mjs`; RUN-2026-002.
- **Related Requirement:** NFR-005
- **Related Bug:** None
- **Last Executed:** 2026-10-11 (RUN-2026-002)

## TC-108 — Round-trip status does not overstate exact preservation

- **Feature:** FEAT-002
- **Priority:** P1
- **Type:** UI regression
- **Preconditions:** BPE initialized; open Encode section.
- **Steps:** Enter `  chai  ` including leading/trailing spaces; compare input to decoded output and inspect the round-trip pill.
- **Test Data:** `  chai  `; decoder's canonical result is `chai`.
- **Expected Result:** Distinguish exact string equality from normalized equality.
- **Actual Result:** **PASS.** Chromium displayed `round trip differs` for input `  chai  ` / decoded `chai`, and `lossless round trip` for exact `Chai aur GenAI!` input/output.
- **Status:** PASS (automated Chromium regression)
- **Automation:** Playwright Chromium.
- **Evidence:** `harness/automation/e2e/playground.spec.mjs`; [`BUG-002`](../../bugs/resolved/BUG-002.md).
- **Related Requirement:** REQ-005; BR-008
- **Related Bug:** BUG-002 (RESOLVED)
- **Last Executed:** 2026-10-11 (RUN-2026-002)
