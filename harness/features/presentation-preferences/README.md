# FEAT-005 — Presentation, Navigation and Preferences

**Feature:** FEAT-005 — presentation, navigation and preferences  
**Purpose:** Provide navigable, responsive educational UI, theme selection and motion settings/accommodations.  
**User:** Any visitor; there are no roles.  
**Entry Point:** `/`; sticky header links to Train, Encode, Vocab and Demo; the How section is reachable by scrolling.  
**Dependencies:** Next/React components, `src/app/globals.css`, IntersectionObserver, requestAnimationFrame, canvas, `matchMedia`, localStorage.  
**Inputs:** Theme toggle; training speed control (owned by FEAT-001); scroll/pointer; OS/browser reduced-motion and color-scheme preferences.  
**Outputs:** Light/dark theme, active navigation state, animations/reveals, toast status, visual reading progress and motion-reduced path.  
**Business Rules:** Theme key `tokenizer-theme`; training speed key `tokenizer-speed`; default speed 80 ms. Reduced-motion hook and CSS disable or shorten animations; the UI also runs training instantly when reduced motion is detected.  
**Expected Behavior:** Navigation scrolls to page sections; theme uses stored value or OS preference; reduced motion removes/shortens nonessential animation.  
**Error Handling:** LocalStorage failures are caught by the generic hook and inline bootstrap, but `ThemeToggle`'s effect/toggle accesses storage without a catch. Browser feature fallbacks vary by component.  
**Permissions:** None.  
**Related APIs:** Browser-native APIs only; no custom API.  
**Related Database Tables:** None.  
**Related UI:** `SiteHeader.tsx`, `ThemeToggle.tsx`, `Hero.tsx`, `Reveal.tsx`, `AnimatedBackground.tsx`, `CursorGlow.tsx`, `globals.css`, `hooks.ts`.  
**Existing Tests:** Lint/typecheck/build passed; no browser automation.  
**Missing Tests:** Real-browser theme persistence, OS preference, reduced motion, mobile breakpoints, keyboard/focus, screen readers and storage-denied behavior.  
**Known Issues:** Accessibility conformance and browser support targets are UNKNOWN / REQUIRES VALIDATION. UI suite is not executed; dependency audit issue BUG-001 remains open.
