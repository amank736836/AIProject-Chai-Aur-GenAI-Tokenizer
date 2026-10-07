# Playground UI — Negative Manual Cases

## TC-106 — Render markup-looking user input as text

- **Feature:** FEAT-002, FEAT-005
- **Priority:** P1
- **Type:** Manual security / input validation
- **Preconditions:** Local app open in a browser; DevTools console available.
- **Steps:** 1. Enter a harmless markup string such as `<img src=x onerror=alert(1)>` in corpus and encoder inputs. 2. Inspect rendered stream/results and console. 3. Confirm no element/handler is created and no script executes.
- **Test Data:** Harmless non-executing markup string; do not use external payloads.
- **Expected Result:** Input is displayed/treated as text; no script, event handler or unexpected network request executes.
- **Actual Result:** NOT_EXECUTED; source review found React text rendering, but browser confirmation is pending.
- **Status:** NOT_RUN
- **Automation:** MANUAL
- **Evidence:** None (not executed).
- **Related Requirement:** NFR-005
- **Related Bug:** None
- **Last Executed:** NOT_EXECUTED

## TC-108 — Round-trip status does not overstate exact preservation

- **Feature:** FEAT-002
- **Priority:** P1
- **Type:** Manual UI regression / known issue
- **Preconditions:** BPE initialized; open Encode section.
- **Steps:** 1. Enter `  chai  ` including leading and trailing spaces. 2. Compare the input byte-for-byte with decoded output. 3. Inspect the round-trip pill and record whether it claims “lossless round trip.”
- **Test Data:** `  chai  `; canonical output from current decoder is `chai`.
- **Expected Result:** UI should distinguish exact equality from normalized equality, or label canonicalization explicitly.
- **Actual Result:** NOT_EXECUTED in a browser. Static source review shows comparison trims both sides, while decoder removes outer whitespace; this can report “lossless round trip” for a changed string.
- **Status:** NOT_RUN
- **Automation:** MANUAL
- **Evidence:** No runtime evidence. Source locations are `src/lib/bpe.ts` (`decode`) and `src/app/page.tsx` (`roundTripOk`).
- **Related Requirement:** REQ-005; BR-008
- **Related Bug:** BUG-002 (OPEN)
- **Last Executed:** NOT_EXECUTED
