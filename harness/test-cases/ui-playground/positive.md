# Playground UI — Positive Cases

These cases describe product workflows. RUN-2026-002 used Playwright with a bundled headless Chromium 153 against the local production build. Statuses below distinguish complete case execution from partial automated coverage; see [`RUN-2026-002`](../../test-results/historical/RUN-2026-002.md).

## TC-101 — Page shell and section navigation

- **Feature:** FEAT-005, FEAT-004
- **Priority:** P1
- **Type:** UI smoke/navigation
- **Preconditions:** Production build served locally in Chromium.
- **Steps:** Open `/`; check page load; use mobile section navigation and browser fragment history.
- **Actual Result:** **PARTIAL.** Root route and tokenizer-ready state rendered; Train/Vocab/Encode anchors and back/forward history worked; the full page was scrolled for accessibility audits. Hosted deployment and every descriptive/demo value were not independently reconciled.
- **Status:** PARTIAL
- **Automation:** Playwright Chromium.
- **Evidence:** `harness/automation/e2e/playground.spec.mjs`; RUN-2026-002 report and accessibility log.
- **Last Executed:** 2026-10-11 (RUN-2026-002)

## TC-102 — Train from preset and custom corpus

- **Feature:** FEAT-001, FEAT-005
- **Priority:** P0
- **Type:** UI functional
- **Preconditions:** Open `/` with normal motion.
- **Steps:** Select presets/custom corpus, change each speed, start and pause training, and use instant training.
- **Actual Result:** **PARTIAL.** Automatic/manual training, stop/pause, all three speed options and persisted 2×, one preset (GenAI glossary), custom corpus entry, keyboard budget adjustment, Instant train, merge output and empty-corpus behavior passed. The remaining built-in presets were not exhaustively exercised.
- **Status:** PARTIAL
- **Automation:** Playwright Chromium.
- **Evidence:** `harness/automation/e2e/playground.spec.mjs`; BUG-003 fix verification.
- **Last Executed:** 2026-10-11 (RUN-2026-002)

## TC-103 — Live encode/decode and clipboard controls

- **Feature:** FEAT-002
- **Priority:** P0
- **Type:** UI functional
- **Preconditions:** Wait for training to initialize.
- **Steps:** Enter known/unknown text, check outputs, use copy/keyboard shortcuts, and submit long input.
- **Actual Result:** **PARTIAL.** Output/IDs, exact whitespace round-trip status, unknown Unicode, clipboard copy of IDs and decoded text, Enter, Ctrl+K, Clear, Fill example, Replay, literal markup inertness and 500-character input passed. Clipboard-denied fallback and other platforms' keyboard shortcuts remain untested.
- **Status:** PARTIAL
- **Automation:** Playwright Chromium.
- **Evidence:** `harness/automation/e2e/playground.spec.mjs`; `evidence/logs/RUN-2026-002-encode-edge-cases.json`.
- **Last Executed:** 2026-10-11 (RUN-2026-002)

## TC-104 — Vocabulary search, filters and JSON exports

- **Feature:** FEAT-003
- **Priority:** P1
- **Type:** UI functional
- **Preconditions:** Vocabulary trained.
- **Steps:** Search a term/ID and a missing term; use filters; copy/download JSON; focus the scroll region.
- **Actual Result:** **PARTIAL.** Token-fragment/numeric/no-match searches, All/Special/Merged/Chars filters, clipboard JSON parsing, `vocab.json` download/parsing, vocabulary-list focus and merge-log focus passed. Clipboard-permission denial and byte-for-byte comparison with the complete map were not separately tested.
- **Status:** PARTIAL
- **Automation:** Playwright Chromium.
- **Evidence:** `harness/automation/e2e/playground.spec.mjs`.
- **Last Executed:** 2026-10-11 (RUN-2026-002)

## TC-105 — Theme, speed persistence and reduced motion

- **Feature:** FEAT-005
- **Priority:** P1
- **Type:** UI functional/accessibility
- **Preconditions:** Fresh browser context.
- **Steps:** Toggle/reload theme and speed; exercise motion preferences.
- **Actual Result:** **PARTIAL.** User-selected dark theme and 2× speed survived reload. With localStorage deliberately blocked, the route still hydrated, the dark OS preference was used and the toggle changed to light without a page error (BUG-004). Reduced-motion and no-preference contexts were exercised. Normal first-visit OS fallback without blocked storage and full motion timing equivalence remain unverified.
- **Status:** PARTIAL
- **Automation:** Playwright Chromium.
- **Evidence:** `harness/automation/e2e/playground.spec.mjs`.
- **Last Executed:** 2026-10-11 (RUN-2026-002)
