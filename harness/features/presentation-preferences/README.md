# FEAT-005 — Presentation, Navigation and Preferences

**Feature:** FEAT-005 — presentation, navigation and preferences<br>
**Purpose:** Provide navigable, responsive educational UI, theme selection and motion settings/accommodations.<br>
**User:** Any visitor; there are no roles.<br>
**Entry Point:** `/`; sticky header links to Train, Encode, Vocab and Demo; the How section is reachable by scrolling.<br>
**Dependencies:** Next/React components, `src/app/globals.css`, IntersectionObserver, requestAnimationFrame, canvas, `matchMedia`, localStorage.<br>
**Inputs:** Theme toggle; training speed control (owned by FEAT-001); scroll/pointer; OS/browser reduced-motion and color-scheme preferences.<br>
**Outputs:** Light/dark theme, active navigation state, animations/reveals, toast status, visual reading progress and motion-reduced path.<br>
**Business Rules:** Theme key `tokenizer-theme`; training speed key `tokenizer-speed`; default speed 80 ms. Reduced-motion hook and CSS disable or shorten animations; the UI also runs training instantly when reduced motion is detected.<br>
**Expected Behavior:** Navigation scrolls to page sections; theme uses stored value or OS preference; reduced motion removes/shortens nonessential animation.<br>
**Error Handling:** Shared storage hooks, theme bootstrap and `ThemeToggle` now catch unavailable localStorage; theme still applies for the current page session (BUG-004, RUN-2026-002). Other browser feature fallbacks vary by component.<br>
**Permissions:** None.<br>
**Related APIs:** Browser-native APIs only; no custom API.<br>
**Related Database Tables:** None.<br>
**Related UI:** `SiteHeader.tsx`, `ThemeToggle.tsx`, `Hero.tsx`, `Reveal.tsx`, `AnimatedBackground.tsx`, `CursorGlow.tsx`, `globals.css`, `hooks.ts`.<br>
**Existing Tests:** RUN-2026-002 Chromium E2E covers responsive widths, mobile navigation/history, keyboard Escape/Enter, touch menu, theme/speed persistence and axe-core at mobile/desktop in light/dark.<br>
**Missing Tests:** Firefox/WebKit/Edge, true browser zoom, normal first-visit OS-preference fallback, full tab-order and screen-reader testing; axe color-contrast results need manual review. Blocked-storage fallback is covered by BUG-004's Chromium regression.<br>
**Known Issues:** Formal accessibility and supported-browser targets are UNKNOWN / REQUIRES VALIDATION. BUG-001 is open for five high dev/build dependency advisory matches; production-only audit is clean.
