# Application Audit Report — RUN-2026-002

**Assessment date:** 2026-10-11<br>
**Repository/branch:** `amank736836/AIProject-Chai-Aur-GenAI-Tokenizer`, `arena/a2b184f1-aiproject-chai-aur-genai-token`<br>
**Commit under test:** working tree based on `0a1c115ba180dd62c46e9b2d189fdf97a1c7a193` (changes were not committed during the test run)<br>
**Environment:** Linux sandbox; Node 22.22.3, npm 10.9.8; optimized Next.js production build; Playwright with headless Chromium 153.0.8010.0.<br>
**Application scope:** one client-side route (`/`); no custom backend, API or database.

## Executive assessment

**READY WITH RISKS for a Chromium-first demo; not a cross-browser/accessibility certification.** The production build and all **11 Chromium E2E tests** passed, including a 13-width responsive sweep, keyboard and touch emulation, tokenizer workflows, localStorage failure recovery, four axe-core audits and delayed/offline interaction. The ten tokenizer unit tests, lint, type-check and harness link check also passed. Two confirmed UI defects were fixed and browser-regressed; exact round-trip messaging was corrected. A separate storage-denial failure was reproduced and fixed.

Remaining release risks are the five high-severity npm advisory matches in development/build tooling (zero production-only findings), untested Firefox/WebKit/Safari/Edge, no true browser-zoom run, incomplete automated color-contrast results, and no screen-reader/manual full-tab-order review. Performance figures are one synthetic sandbox sample with no product SLO, not a benchmark sign-off.

## Severity-ranked findings

| Rank | Finding | Severity / priority | Reproduction, viewport and root cause | Fix / status |
| --- | --- | --- | --- | --- |
| 1 | [BUG-001 — development dependency advisories](../bugs/open/BUG-001.md) | **High advisory matches / P2; OPEN.** Runtime exposure is not established; findings are in dev/build tooling. | Run `npm audit` and `npm audit --omit=dev`. Full tree: 5 high findings (`eslint-config-next`, `@next/eslint-plugin-next`, `braces`, `fast-glob`, `micromatch`); production-only: 0. npm's suggested fix downgrades ESLint config to 14.2.35, a major mismatch with Next 16.4.0. | No incompatible downgrade applied. Dependency owner should select a compatible patch/override or record a build/CI risk acceptance, then rerun both audits and the suite. Raw audit JSON is under [`evidence/logs/`](../evidence/README.md). |
| 2 | [BUG-004 — blocked localStorage could prevent initialization](../bugs/resolved/BUG-004.md) | **Moderate / P2; RESOLVED.** | Chromium, `/`, storage getter injected to throw `SecurityError`. Before the fix the main status element failed to appear within 8 seconds. Root cause: `ThemeToggle` read and wrote localStorage without exception handling. | Theme reads now validate stored values and catch storage errors; writes are best-effort while in-session theme changes still apply. Regression passed: page hydrates, dark OS fallback is used, toggle changes to light, and no page error is recorded. |
| 3 | [BUG-003 — tilted panel could miss speed-button pointer activation](../bugs/resolved/BUG-003.md) | **Moderate / P2; RESOLVED.** | Chromium 153, 1366×900, Train section, 1×→2×. Before the fix a real pointer click left `aria-pressed=false` and stored speed at 80ms; a capture-phase listener showed the rotated card's `.speed-control` parent received the event. `HTMLElement.click()` worked, isolating pointer hit-testing. | Tilt now resets immediately and disables transitions while the pointer is over an interactive descendant. Mouse and native-touch-emulated speed selection both pass; all three speed settings are exercised. |
| 4 | [BUG-002 — round-trip pill overstated whitespace preservation](../bugs/resolved/BUG-002.md) | **Low / P2; RESOLVED.** | Chromium 390×844, encode input `  chai  ` decoded to `chai`. The old trimmed/case-insensitive comparison could call that “lossless.” | The UI now requires exact string equality. E2E asserts “round trip differs” for the normalized input and “lossless round trip” for exact `Chai aur GenAI!`. |

## Other changes made

- Added a semantic mobile section-navigation disclosure with accessible name/state, Escape close and focus return; added visible focus styling and source-link naming.
- Added keyboard focus/labels to scrollable merge history and vocabulary entries.
- Improved light/dark text and token-legend colors; added responsive header/hero treatments and stable full-page overflow behavior.
- Added exact round-trip messaging, resilient theme storage handling and interactive-descendant protection to the tilt effect.
- Added the Playwright/axe-core Chromium harness, screenshot capture, machine-readable evidence and `npm run test:e2e`. No backend logic or architecture was changed.

## Test evidence

### Commands and outcomes

| Check | Actual result |
| --- | --- |
| `npm run build` (also run inside `npm run test:e2e`) | PASS; `/` and `/_not-found` statically prerendered. |
| `npm run lint` | PASS. |
| `npx tsc --noEmit` | PASS. |
| `node harness/automation/scripts/run-tokenizer-tests.mjs` | PASS, 10/10. |
| `node harness/automation/scripts/verify-harness-links.mjs` | PASS; final link/document count recorded in `RUN-2026-002-link-check.txt`. |
| `npm run test:e2e` | PASS, 11/11 Chromium tests. The full output is [`RUN-2026-002-playwright.txt`](../evidence/logs/RUN-2026-002-playwright.txt). |
| `npm audit` | FAIL by design on five high advisory matches in dev/build dependencies; exit 1. |
| `npm audit --omit=dev` | PASS, zero findings; exit 0. |

### Responsive, visual and interaction coverage

- Tested widths: **320, 375, 390, 425, 640, 768, 820, 1024, 1280, 1366, 1440, 1920 and 2560px**. At each measured viewport, document/body width matched the viewport and tested header controls remained within its edges. No horizontal overflow was observed.
- Mobile landscape: **844×390**, no horizontal overflow; desktop navigation displayed and mobile menu button was hidden as intended.
- The 640px and 320px layouts are **effective-CSS-width proxies** for 200%/400% scaling from a 1280px baseline. `actualBrowserZoomApplied` is explicitly `false`; these do not substitute for browser zoom.
- Real screenshots captured at 320×844, 390×844, 768×900, 1366×900 and 2560×900 are in [`evidence/screenshots/RUN-2026-002/`](../evidence/screenshots/RUN-2026-002/). Visual review found the mobile header controls fit, the hero reflows cleanly, and the ultrawide layout remains centered/capped.
- Tested hero CTAs, one corpus preset, custom corpus entry, vocabulary-budget keyboard adjustment, instant training, all three training speeds, pause/stop, empty corpus, speed persistence, live encode/decode, exact and normalized round trips, unknown Unicode, 500-character input, ID/decoded-text copying, Enter/Ctrl+K, fill/replay/clear actions, markup-looking text inertness, vocabulary token/ID/no-match search, all filter options, JSON copy/download and focus on scroll regions.
- Keyboard checks include Enter activation, Escape close/focus return, section hashes/back/forward and Ctrl+K. Touch was emulated with a separate `isMobile`/`hasTouch` Chromium context for menu, 2× speed and vocabulary filtering; this is not a physical-device test.

### Accessibility

`axe-core` was run over the whole rendered page with WCAG 2.0 A/AA, WCAG 2.1 A/AA and WCAG 2.2 AA tags at **390×844 light/dark** and **1366×900 light/dark**. All four runs had **0 automated violations** and 30 passing rules each. The `color-contrast` rule remained **incomplete** for 588 nodes in each mobile audit and 557 in each desktop audit; representative selectors and counts are retained in [`RUN-2026-002-accessibility.json`](../evidence/logs/RUN-2026-002-accessibility.json). No manual contrast certification was performed. Full keyboard-tab traversal, screen readers and voice-control were not tested.

### Performance and stability

One local production run with a 120ms delay on Next static assets observed TTFB 8ms, DOMContentLoaded 241ms, load 396ms, LCP 864ms and CLS 0.000. Four long tasks exceeded 50ms (54, 166, 60, 58ms); their source was not attributed. Seven Event Timing entries were 16ms each. Ten resources were observed (six JS), ~330KB encoded/~752KB decoded. During the offline interaction case, requests/page errors were zero and local encoding still updated. A 500-character fill took 459ms in that run and did not widen the 390px document. These are single-run sandbox observations without SLOs or device representativeness; do not interpret them as a performance benchmark or production field data.

## Remaining gaps and untested checks

- **Browser engines:** Firefox, Safari/WebKit and Edge were not installed/exercised; only bundled headless Chromium 153.0.8010.0 ran.
- **Zoom:** true 200%/400% browser zoom was not performed; only the explicitly labeled 640px/320px CSS-width proxies were checked.
- **Assistive technology:** no screen reader, voice control, full keyboard tab-order/manual focus-ring audit or manual contrast check. axe's color-contrast nodes remain incomplete.
- **Browser/device:** touch is emulated, not a physical iOS/Android device; no actual mobile browser/device was tested.
- **Other edge paths:** clipboard-denied behavior, normal first-visit OS color-scheme selection, exhaustive built-in preset variants and large-corpus throughput were not tested. Blocked localStorage was tested for theme initialization/toggling.
- **Security/deployment:** npm audit is not VAPT. Hosted deployment, HTTPS, CSP/security headers, cache policy and privacy/network behavior outside the local offline test were not assessed.
- **Performance:** no representative hardware, repeated benchmarks, memory profile, agreed corpus-size budget or performance SLO.

## Readiness assessment

The tested flows are ready for a **limited Chromium-first demo** with the remaining risks disclosed. The production dependency audit is clean, and no open user-facing defect remains among the confirmed findings; BUG-001 remains open for development/build tooling. Do **not** describe this as cross-browser or WCAG-conformance sign-off. Before broad production approval, review a compatible dev-tooling fix/exception, run true browser zoom and Firefox/WebKit/Edge checks, complete manual contrast and screen-reader reviews, and agree performance targets/deployment controls.

## Evidence index

- E2E/build transcript: [`evidence/logs/RUN-2026-002-playwright.txt`](../evidence/logs/RUN-2026-002-playwright.txt)
- Responsive geometry and zoom proxies: [`evidence/logs/RUN-2026-002-responsive.json`](../evidence/logs/RUN-2026-002-responsive.json)
- Accessibility: [`evidence/logs/RUN-2026-002-accessibility.json`](../evidence/logs/RUN-2026-002-accessibility.json)
- Performance: [`evidence/logs/RUN-2026-002-performance.json`](../evidence/logs/RUN-2026-002-performance.json)
- Input edge cases: [`evidence/logs/RUN-2026-002-encode-edge-cases.json`](../evidence/logs/RUN-2026-002-encode-edge-cases.json)
- npm audit: [`full JSON`](../evidence/logs/RUN-2026-002-npm-audit-full.json), [`production JSON`](../evidence/logs/RUN-2026-002-npm-audit-production.json)
- Visual captures: [`screenshots`](../evidence/screenshots/RUN-2026-002/)
