# Known Issues Summary

## Open

| ID | Area | Summary | Current evidence | Next action |
| --- | --- | --- | --- | --- |
| [BUG-001](open/BUG-001.md) | Development dependency security | Full `npm audit`: five high advisory matches in development/build tooling. Production-only audit: zero findings. | RUN-2026-002 raw reports under [`evidence/logs/`](../evidence/README.md). | Dependency owner to select a compatible update/override or document a CI/build risk acceptance; rerun all checks. |

## Resolved in RUN-2026-002

- [BUG-002](resolved/BUG-002.md): exact-string round-trip messaging, verified in Chromium at 390×844.
- [BUG-003](resolved/BUG-003.md): training speed control pointer hit-testing, verified with mouse and touch interactions.
- [BUG-004](resolved/BUG-004.md): blocked localStorage no longer prevents theme/page initialization; verified with an injected `SecurityError`.

Other unvalidated areas (Firefox/WebKit/Edge, true browser zoom, screen-reader testing, clipboard/localStorage denial paths and hosted deployment behavior) are coverage gaps, not confirmed defects.
