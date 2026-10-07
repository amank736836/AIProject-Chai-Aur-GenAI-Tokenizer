# Playground UI — Positive Manual Cases

All cases below require a real browser. They have not been executed; expected behavior must not be represented as a pass.

## TC-101 — Page shell and section navigation

- **Feature:** FEAT-005, FEAT-004
- **Priority:** P1
- **Type:** Manual UI smoke
- **Preconditions:** Run local app with `npm run dev` or production `npm run build && npm run start`.
- **Steps:** 1. Open `/`. 2. Verify page title/header, hero, Train, Encode, Vocab, How and Demo sections. 3. Use header links and browser back/fragment navigation. 4. Inspect console for errors.
- **Test Data:** None.
- **Expected Result:** Page renders and navigation reaches the matching section without runtime/hydration errors.
- **Actual Result:** NOT_EXECUTED.
- **Status:** NOT_RUN
- **Automation:** MANUAL
- **Evidence:** None (not executed).
- **Related Requirement:** REQ-007; NFR-001
- **Related Bug:** None
- **Last Executed:** NOT_EXECUTED

## TC-102 — Train from preset and custom corpus

- **Feature:** FEAT-001, FEAT-005
- **Priority:** P0
- **Type:** Manual UI functional
- **Preconditions:** Open `/` in a browser with normal motion enabled.
- **Steps:** 1. Wait for first load training to finish. 2. Select each corpus preset and inspect the corpus field. 3. Enter a short custom corpus. 4. Adjust target and each speed. 5. Start animated training, pause mid-run, then use Instant train. 6. Inspect merge log, top pairs, progress and status.
- **Test Data:** `ab ab chai`; built-in presets.
- **Expected Result:** Presets fill the corpus; progress/merge output changes; stop retains partial state; instant training terminates and output corresponds to selected corpus/target.
- **Actual Result:** NOT_EXECUTED.
- **Status:** NOT_RUN
- **Automation:** MANUAL
- **Evidence:** None (not executed).
- **Related Requirement:** REQ-001–REQ-003
- **Related Bug:** None
- **Last Executed:** NOT_EXECUTED

## TC-103 — Live encode/decode and clipboard controls

- **Feature:** FEAT-002
- **Priority:** P0
- **Type:** Manual UI functional
- **Preconditions:** Wait for training to initialize.
- **Steps:** 1. Type known text, then an unknown Unicode code point. 2. Compare stream, IDs, decoded output and stats. 3. Use Copy IDs and Copy decoded text. 4. Press Enter and Ctrl/⌘+K. 5. Use Clear, Fill example and Replay.
- **Test Data:** `chai aur code`, then `🧋`.
- **Expected Result:** Results update from the same input; clipboard actions report outcome; Ctrl/⌘+K clears; no runtime exception.
- **Actual Result:** NOT_EXECUTED.
- **Status:** NOT_RUN
- **Automation:** MANUAL
- **Evidence:** None (not executed).
- **Related Requirement:** REQ-004, REQ-005
- **Related Bug:** BUG-002 if whitespace/case indicator behavior is encountered.
- **Last Executed:** NOT_EXECUTED

## TC-104 — Vocabulary search, filters and JSON exports

- **Feature:** FEAT-003
- **Priority:** P1
- **Type:** Manual UI functional
- **Preconditions:** Vocabulary trained.
- **Steps:** 1. Search a known token and its ID. 2. Select All, Special, Merged and Chars. 3. Search a missing term. 4. Copy JSON and parse it. 5. Download `vocab.json`, inspect name/content, then test with clipboard denied.
- **Test Data:** Search queries `chai`, `100`, `no-such-token`.
- **Expected Result:** Filter/search results are correct; empty state is clear; both export paths contain valid JSON for the full vocabulary; failure is communicated.
- **Actual Result:** NOT_EXECUTED.
- **Status:** NOT_RUN
- **Automation:** MANUAL
- **Evidence:** None (not executed).
- **Related Requirement:** REQ-006
- **Related Bug:** None
- **Last Executed:** NOT_EXECUTED

## TC-105 — Theme, speed persistence and reduced motion

- **Feature:** FEAT-005
- **Priority:** P1
- **Type:** Manual UI functional/accessibility
- **Preconditions:** Clean disposable browser profile.
- **Steps:** 1. Test fresh load with OS light and dark scheme. 2. Toggle theme and reload. 3. Select another training speed and reload. 4. Enable `prefers-reduced-motion`, reload and train. 5. Optionally block localStorage and repeat to observe failure behavior.
- **Test Data:** Theme values `light`/`dark`; speed 160/80/38 ms.
- **Expected Result:** Theme and speed persist; OS scheme is the initial fallback; reduced motion shortens effects and uses instant training; page remains usable.
- **Actual Result:** NOT_EXECUTED.
- **Status:** NOT_RUN
- **Automation:** MANUAL
- **Evidence:** None (not executed).
- **Related Requirement:** REQ-003, REQ-008; NFR-003
- **Related Bug:** None
- **Last Executed:** NOT_EXECUTED
