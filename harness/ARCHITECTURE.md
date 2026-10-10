# Architecture

## System context

```text
Visitor's browser
  ├─ Next.js-rendered/static page: `/`
  ├─ React client page (`src/app/page.tsx`)
  │    ├─ BPETokenizer (`src/lib/bpe.ts`)
  │    ├─ Reference Tokenizer (`src/tokenizer.ts`)
  │    ├─ UI components (`src/components/`)
  │    └─ CSS motion/theme (`src/app/globals.css`)
  ├─ Browser APIs: localStorage, clipboard, canvas, matchMedia, observers
  └─ Local fonts/assets

No custom API server ─ no application database ─ no authentication provider found
```

## Request/render path

- `src/app/layout.tsx` is the root App Router layout. It imports global styles, self-hosts three fonts, exports metadata/viewport settings and sets the initial theme with a static inline bootstrap script.
- `src/app/page.tsx` has a top-level `"use client"` directive. It composes the one-page playground and owns the mutable `BPETokenizer` instance and UI state.
- The current production build statically prerenders `/` and `/_not-found` (verified in `RUN-2026-001`). There are no `src/app/api` routes or backend endpoints in the checkout.

## Main modules and data flow

| Module | Responsibility |
| --- | --- |
| `src/lib/bpe.ts` | Vocabulary initialization, corpus split, pair statistics, one-step/full training, merge-ranked encode, decode, statistics and vocabulary entries/export data. |
| `src/tokenizer.ts` | Original frequency-ranked whole-word tokenizer used by the reference demo. |
| `src/app/page.tsx` | Training state machine, debounced retraining on corpus/budget changes, live encode/decode and statistics, demo data, control wiring. |
| `src/components/TrainVisualizer.tsx` | Training progress ring, top-pair display and latest merge records. |
| `src/components/TokenStream.tsx` | Token chips, special/merge/character/unknown kinds and IDs. |
| `src/components/VocabExplorer.tsx` | Search/filter/list and JSON copy/download controls. |
| `src/components/SiteHeader.tsx`, `ThemeToggle.tsx`, `SiteFooter.tsx` | Page navigation, theme control, static links/footer. |
| `src/lib/hooks.ts` | Reduced-motion preference, intersection/scroll observation, count animation, clipboard, local storage and parallax hooks. |
| `src/app/globals.css` | Design tokens, responsive layout, component styles, animations and reduced-motion overrides. |

### BPE state flow

1. `prepareTraining(corpus, budget)` clears/initializes vocabulary and builds the mutable symbol corpus.
2. Animated mode invokes `stepMerge()` from a timer; instant mode loops synchronously. Training can stop with a partial merge history. If no pairs remain, training ends before the requested size.
3. `encodeDetailed(input)` splits input into whitespace-delimited words, applies trained merges by rank, and returns BOS/content/EOS pieces. The page derives numeric IDs, decoded text, counts and compression stats.
4. `vocabEntries()` supplies IDs/kinds/frequencies. The explorer receives `tok.vocab` serialized by the page for copy/download.

### Browser persistence

| Key / storage | Purpose | Data type |
| --- | --- | --- |
| `tokenizer-theme` in `localStorage` | `ThemeToggle` preference; otherwise OS color-scheme preference is used. | `light` or `dark` |
| `tokenizer-speed` in `localStorage` | Training interval setting; initial fallback is 80 ms (the 1× option). | Numeric interval in milliseconds |
| Corpus and encoder input | Kept in React state during the page session; no application storage call was found for these values. | User-entered text |

## Trust boundaries and security surface

- Untrusted visitor text enters textarea/input controls, is processed by the local TypeScript tokenizer and rendered with React text nodes. No `dangerouslySetInnerHTML` use was found for visitor-provided data. `layout.tsx` does use it for a static theme-bootstrap string.
- The browser communicates with the page host to load the Next application; no custom API/database boundary exists in this codebase.
- Local storage is user-controlled and can be unavailable/corrupt; hooks catch storage access/JSON errors, but `ThemeToggle` accesses its theme key without a try/catch.
- Clipboard, download, canvas, media query, resize and intersection APIs depend on browser support/permissions.
- No CSP, explicit security-header configuration, rate limit, auth layer, or VAPT report is checked in. Deployment-level behavior is **UNKNOWN / REQUIRES VALIDATION**.

## Build and deployment

`npm run build` executes `next build`; `npm run start` serves that build. `next.config.ts` only sets `reactStrictMode: true`. The README names a Vercel live demo, but the repository contains no deployment pipeline or hosting configuration. Build/hosting account settings and production environment are **UNKNOWN / REQUIRES VALIDATION**.

## Test boundaries

Tokenizer logic is directly unit-testable with the existing TypeScript compiler and Node's built-in test runner; no browser test framework is installed. The harness test runner compiles only `src/lib/bpe.ts` and `src/tokenizer.ts` to a temporary OS directory and removes it after execution. UI, browser compatibility, performance and deployment security require a browser/target environment and are currently manual/not executed.
