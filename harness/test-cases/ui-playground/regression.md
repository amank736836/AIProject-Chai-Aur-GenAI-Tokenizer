# Playground UI Regression Set

| Case | Coverage | Latest status, RUN-2026-002 |
| --- | --- | --- |
| TC-101 | Page shell, section navigation, URL history | PARTIAL — Chromium root/anchors/history passed; hosted deployment/all display content not fully verified |
| TC-102 | Presets, training, pause/instant and status | PARTIAL — one preset, custom corpus, budget, instant, all speeds, pause and empty corpus tested; remaining preset variants not exhaustive |
| TC-103 | Live encoder, keyboard, copy and results | PARTIAL — known/unknown/long inputs, copy IDs/decoded, fill/clear/replay, shortcuts tested; clipboard-denied path untested |
| TC-104 | Vocabulary search/filter/copy/download | PARTIAL — token/ID/no-match and all filter types, JSON copy/download and focus tested; clipboard denial/full-map byte comparison untested |
| TC-105 | Theme, persisted speed and reduced motion | PARTIAL — theme/speed persistence and blocked-storage recovery tested; normal first-visit OS fallback/full reduced-motion equivalence not verified |
| TC-106 | Untrusted input remains text | PASS — harmless markup string remained inert in Chromium |
| TC-107 | Keyboard, focus, touch, accessibility and viewport sizing | PARTIAL — responsive sweep, touch, keyboard subset and axe passed; no true zoom/screen-reader/full tab-order |
| TC-108 | Round-trip indicator and whitespace normalization | PASS — exact comparison verified; BUG-002 RESOLVED |

The Playwright suite is `npm run test:e2e` (AUT-017); axe audits are AUT-018. RUN-2026-002 is Chromium-only and is not evidence for Firefox, WebKit/Safari, Edge, physical devices or actual browser zoom. See the run report for raw evidence and limits.
