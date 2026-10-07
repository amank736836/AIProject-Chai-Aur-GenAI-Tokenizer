# Project Overview

**Repository:** `amank736836/AIProject-Chai-Aur-GenAI-Tokenizer`  
**Product described by the repository:** Custom Tokenizer / Ama tokenizer playground  
**Review basis:** checked-in source, configuration, README, and a clean dependency install on 2026-10-07. This is an evidence-based code inventory, not a product specification.

## Purpose

A single-page educational playground for a from-scratch byte-pair encoding (BPE) tokenizer. A visitor supplies a small text corpus, observes frequency-based merges, then encodes and decodes text and explores the resulting vocabulary. A separate word-level tokenizer is shown as a reference baseline. The project README associates the work with the “Chai aur GenAI · GenAI with JavaScript 1.0” challenge.

## Main users

- Learners and demo visitors exploring tokenizer training and encode/decode behavior (inferred from the page and README; formal personas: **UNKNOWN / REQUIRES VALIDATION**).
- Developers maintaining the tokenizer and its browser UI.

There are no user accounts, roles, or administrator flows in the repository.

## Technology stack

| Area | Observed implementation |
| --- | --- |
| Framework / routing | Next.js 15.4.10 App Router; one application route at `/` |
| UI | React 19.1.0, TypeScript 5, client-side React state |
| Styling | `src/app/globals.css`; Tailwind CSS 4 is wired through PostCSS, alongside substantial hand-written CSS |
| Tokenizer | Custom TypeScript BPE implementation in `src/lib/bpe.ts`; reference word tokenizer in `src/tokenizer.ts` |
| Fonts | Local Geist Sans, Geist Mono and Space Grotesk via `next/font/local`; OFL license files are checked in |
| Static assets | `public/` SVGs and an app favicon |
| Lint / type check / build | ESLint 9 with `eslint-config-next`; TypeScript; Next build |
| Automated tests at repository baseline | None found. This harness adds Node's built-in test runner tests for the tokenizer modules; it adds no package dependency. |

Exact Node/npm support ranges are not declared in a version file. Validation in this checkout used Node 22.22.3 and npm 10.9.8.

## Frontend and architecture

`src/app/layout.tsx` supplies document metadata, local font faces, viewport settings and an inline pre-paint theme bootstrap. `src/app/page.tsx` is a client component that owns the tokenizer instance, corpus/input state, training lifecycle, encode/decode calculations and page composition. Small client components under `src/components/` render the training visualizer, token stream, vocabulary explorer, navigation, theme switch, effects and reference demo.

The BPE work is synchronous TypeScript running in the browser; animated training calls one merge on an interval, while instant/reduced-motion paths train synchronously. There is no separate service process in the application source.

## Backend, database, APIs and external services

- **Backend:** No custom backend service, route handler, server action, or API implementation was found. Next.js renders/prerenders the page; the interactive page is client-side.
- **Database:** None found. No schema, migration, ORM, database driver or persistence service is present.
- **Custom APIs:** None found. The app's browser URL is `/`; this is not an application JSON API.
- **External runtime services:** No application `fetch`, Axios, XHR, or third-party runtime API call was found in the inspected source. Font assets are self-hosted. Browser capabilities used include `localStorage`, Clipboard API with a fallback, `matchMedia`, canvas, observers and download URLs.
- **Deployment:** README names `https://bpe-demo-one.vercel.app/` as the live demo and `.gitignore` ignores `.vercel`. No Vercel project configuration, deployment workflow, Dockerfile or infrastructure definition is checked in. Current deployment health/settings are **UNKNOWN / REQUIRES VALIDATION**.

## Authentication and authorization

No authentication, authorization, session, access-token or account code is present. The page is public and has no permission-gated workflow. If deployment requirements expect restricted access, that requirement is **UNKNOWN / REQUIRES VALIDATION**.

## Major modules and workflows

1. **Train BPE vocabulary** — built-in corpus presets or user-entered corpus; vocabulary budget; 0.5×/1×/2× speed; animated, pause and instant training; merge log and pair frequency display.
2. **Encode/decode** — live input encoding with `<BOS>`/`<EOS>`, token pieces and IDs, decoded string, round-trip indicator and simple statistics. Whitespace is normalized by the tokenizer.
3. **Vocabulary explorer** — search token/ID, filter by kind, copy JSON and download `vocab.json`.
4. **Word-level reference** — a fixed corpus/sample rendered from `src/tokenizer.ts`.
5. **Presentation/preferences** — section navigation, light/dark theme, persisted theme and training speed, motion/scroll effects, and reduced-motion accommodations.

The feature catalog and per-feature code-derived behavior are in [`features/README.md`](features/README.md).

## Important business logic

- The BPE base vocabulary is four special tokens, 95 printable ASCII characters, and `</w>` (100 slots), plus each unseen non-ASCII code point found in the training text.
- Corpus words are split on whitespace and receive a `</w>` marker. Each training step merges the most frequent adjacent pair; ties sort by the left symbol using `localeCompare`.
- Encoding replays learned merges by rank. Decoding drops special tokens and converts word-end markers into spaces, trimming trailing whitespace. It does not preserve original spacing.
- The reference tokenizer ranks whole words and adds BOS/EOS IDs; it is intentionally separate from BPE.

See [`requirements/business-rules.md`](requirements/business-rules.md) and [`features/`](features/README.md) for precise rules and caveats.

## Authentication, privacy and data handling

No credentials or secrets are required by the application. Corpus and encode text are held in page state and processed locally by the tokenizer. The inspected code persists only the theme (`tokenizer-theme`) and training interval (`tokenizer-speed`) in browser local storage; user-entered corpus/input is not persisted by the app. Exported vocabulary is downloaded or copied by the visitor. These claims describe the checked-in code; deployed hosting/logging behavior is **UNKNOWN / REQUIRES VALIDATION**.

## Configuration and environments

- Build/runtime configuration: `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`.
- No `.env` file, `.nvmrc`, `Dockerfile`, CI workflow, migration, seed script or environment-specific config was found.
- Available package scripts: `dev`, `build`, `start`, `lint`. Harness test command: `node harness/automation/scripts/run-tokenizer-tests.mjs` after `npm ci`.
- Local development and production build/start commands are documented in the root `README.md`; staging/production configuration beyond the README's demo URL is **UNKNOWN / REQUIRES VALIDATION**.

## Known dependencies and risks

- Runtime: Next.js, React, React DOM.
- Development/build: TypeScript, ESLint/Next config, Tailwind PostCSS plugin, font packages.
- `npm ci` on 2026-10-07 completed, and npm reported 23 dependency vulnerabilities (2 moderate, 19 high, 2 critical). A production-only audit reported 5 (4 high, 1 critical). These are dependency audit findings, not evidence of exploitability in a particular deployment; see [`bugs/open/BUG-001.md`](bugs/open/BUG-001.md) and [`evidence/logs/RUN-2026-001-npm-audit.txt`](evidence/logs/RUN-2026-001-npm-audit.txt).
- Formal performance targets, supported browser matrix, accessibility conformance target and deployment security headers are not specified: **UNKNOWN / REQUIRES VALIDATION**.
