# FEAT-005 Behavior

- Header links use fragment navigation; an IntersectionObserver sets the active section (Train, Encode, Vocab or Demo). A GitHub source link opens a new tab.
- Theme bootstrap runs before paint and reads `tokenizer-theme`, or falls back to OS `prefers-color-scheme`; ThemeToggle updates `document.documentElement.dataset.theme` and localStorage.
- Training speed is stored under `tokenizer-speed`, default 80 ms; available intervals are 160, 80 and 38 ms.
- Reduced motion is observed reactively by `useReducedMotion`; effects stop/shorten and training is run synchronously. CSS disables/shortens CSS animation and scrolling effects under the media query.
- Other presentation includes scroll reveal, scroll progress, canvas particles, cursor glow (not enabled for coarse pointer), tilt/magnetic interactions and status toasts.
