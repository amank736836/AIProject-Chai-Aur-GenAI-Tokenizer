# Custom Tokenizer — *watch a tokenizer learn language*

A from-scratch **byte-pair encoding (BPE)** tokenizer for the *Chai aur GenAI · GenAI with
JavaScript 1.0* challenge, wrapped in an animated single-page playground: paste a corpus,
watch the vocabulary grow merge by merge, then encode/decode text with a live token stream.

**Live demo:** [bpe-demo-one.vercel.app](https://bpe-demo-one.vercel.app/) · **Logo/brand:** Ama

---

## ✨ The interface

The UI is hand-built with CSS animations and small React components — **no animation
library** (no Framer Motion, no GSAP), and every effect degrades gracefully under
`prefers-reduced-motion`. Inspiration comes from the usual suspects in motion design:
ambient backgrounds, scrollytelling, kinetic type, glassmorphism and micro-interactions.

| Effect | Where | Implementation |
| --- | --- | --- |
| Ambient background motion | whole page | Canvas particle constellation that reacts to the cursor, four drifting aurora blobs, parallax grid, film grain, vignette — `AnimatedBackground.tsx` |
| Cursor spotlight | whole page | Eased lerp glow that trails the pointer — `CursorGlow.tsx` |
| Reading progress | top of viewport | Gradient bar scaled from scroll depth — `ScrollProgress.tsx` |
| Kinetic typography | hero | Line-mask reveals + a cyclic typewriter with a stable-width ghost sizer — `TypeWriter.tsx` |
| Animated gradient text | hero headline | Panning multi-stop gradient clipped to text |
| Faux-3D tilt + glare | every panel | Pointer-driven `rotateX/rotateY` with a specular highlight — `TiltCard.tsx` |
| Magnetic buttons | all CTAs | Buttons lean toward the cursor and sweep a shine — `MagneticButton.tsx` |
| Self-drawing SVG | logo, section icons | `stroke-dashoffset` draw-in, orbiting rings, rising chai steam — `AnimatedLogo.tsx` |
| Live "scrollytelling" of training | §1 Train | Merge-by-merge stepper with a growing vocab ring, shrinking pair-frequency bars and a flashing merge log — `TrainVisualizer.tsx` |
| Staggered token chips | §2 Encode | Each piece pops in with its own delay, hue-hashed colour, `␣` word-end marker and hover lift — `TokenStream.tsx` |
| Self-drawing pipeline | §2 Encode | Animated dashed wire between text → pieces → ids → decoded — `PipelineFlow.tsx` |
| Count-up statistics | stats strip | Eased number roll-up triggered by `IntersectionObserver` — `CountUp.tsx` |
| Scroll reveals | every section | Directional fade/slide/zoom/blur variants — `Reveal.tsx` |
| Glassmorphism + conic border | panels | `backdrop-filter` glass with a rotating conic-gradient hairline (`@property --border-angle`) |
| Micro-interactions | copy buttons, filters, chips | Icon morphs into a self-drawing checkmark, toasts replace `alert()` — `CopyButton.tsx`, `Toast.tsx` |
| Marquee ticker | footer | Infinite token ticker with edge masking — `SiteFooter.tsx` |
| Theme morph | header | Sun ↔ moon switch with orbiting stars, persisted, no FOUC (inline bootstrap script) — `ThemeToggle.tsx` |
| Faux terminal | hero | Scripted training session with a scanline sweep — `Hero.tsx` |

---

## Sections

1. **Train the tokenizer** — corpus textarea, four preset corpora (Chai break, GenAI
   glossary, Pangrams, Code snippet), a vocabulary-budget slider (100 → 300 slots) and a
   speed control (0.5× / 1× / 2×). Training runs *visibly*: one merge per tick.
2. **Encode & decode** — encoding is live on every keystroke. Shows the animated token
   stream, raw ids, decoded text, a lossless round-trip pill and the pipeline diagram.
   `⏎` copies the ids, `⌘/Ctrl + K` clears the field.
3. **Vocabulary explorer** — search by token or id, filter (All / Special / Merged /
   Chars), frequency bars, plus **Copy JSON** and **Download `vocab.json`**.
4. **How the merges work** — three tilt cards with self-drawing glyphs.
5. **Word-level reference demo** — the original frequency-based tokenizer from
   `src/tokenizer.ts`, side by side with the BPE run.

On first load the page trains itself once (animated), so the merge log is never empty.

---

## Getting started

```sh
npm install
npm run dev        # http://localhost:3000
```

```sh
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (runs as part of `next build` too)
```

Fonts are self-hosted from `src/fonts/` via `next/font/local`, so builds never need
network access to Google Fonts (see `src/fonts/README.md`).

---

## Tokenizer API

### `BPETokenizer` — `src/lib/bpe.ts`

```ts
import { BPETokenizer } from "@/lib/bpe";

const tok = new BPETokenizer();
tok.train("chai aur code chai aur genai …", 150);   // synchronous run

tok.encode("chai is hot");            // number[]           → [2, 108, 115, 76, 83, 138, 3]
tok.encodeDetailed("chai is hot");    // {id, token, kind}[] → for the UI chips
tok.decode([2, 108, 115, 76, 83, 138, 3]); // string        → "chai is hot"
tok.stats("chai is hot");             // chars, words, tokens, compression, unknown
tok.vocab;                            // { token: id }      → JSON.stringify → vocab.json
tok.vocabEntries();                   // every slot with its corpus frequency
tok.mergeHistory;                     // MergeRecord[] (step, a, b, token, count, id)
```

**Steppable training** (what powers the animation):

```ts
const { baseVocab, targetVocab } = tok.prepareTraining(corpus, 150);
while (tok.vocabSize < tok.targetVocabSize) {
  const merge = tok.stepMerge();      // MergeRecord | null
  if (!merge) break;                  // corpus fully compressed
}
```

Details worth knowing:

- Base vocabulary = 4 special tokens + 95 printable ASCII + `</w>` (**100 slots**), plus a
  slot for every non-ASCII character found in the corpus (Devanagari, emoji, …), so exotic
  input degrades to single-character tokens instead of `<UNK>`.
- `</w>` marks word endings, so the model learns pieces such as `the</w>`; `decode()` strips
  the marker wherever it appears (including *inside* a merged piece) and re-joins words.
- Encoding replays merges by **rank** (earliest learned merge first), the textbook BPE rule.
- Unknown ids decode to `<UNK>` and are skipped, never crashing.

### `Tokenizer` — `src/tokenizer.ts`

The original word-level tokenizer kept as a reference baseline:

```ts
const t = new Tokenizer();
t.learnVocab(corpus, 50);   // frequency-ranked whole words
t.encode("Hello world");    // [2, 4, 5, 3]  (BOS … EOS)
t.decode([2, 4, 5, 3]);     // "Hello world"
```

### Special tokens

| Token | Id | Meaning |
| --- | --- | --- |
| `<PAD>` | 0 | padding |
| `<UNK>` | 1 | unknown |
| `<BOS>` | 2 | beginning of sequence |
| `<EOS>` | 3 | end of sequence |

---

## Project structure

```
src/
├── app/
│   ├── globals.css          # design tokens (light/dark), keyframes, component styles
│   ├── layout.tsx           # self-hosted fonts, metadata, no-FOUC theme bootstrap
│   └── page.tsx             # page composition + tokenizer state machine
├── components/              # AnimatedBackground, Hero, TiltCard, TokenStream, …
├── fonts/                   # Geist Sans/Mono + Space Grotesk (SIL OFL 1.1)
├── lib/
│   ├── bpe.ts               # steppable BPE tokenizer
│   └── hooks.ts             # useInView, useCountUp, useParallax, useCopy, …
└── tokenizer.ts             # word-level reference tokenizer
```

---

## Performance & accessibility

- Page bundle ≈ **16 kB** of JS (116 kB first load, mostly React/Next) — motion is CSS +
  canvas, not a library.
- Particle count scales with viewport area; canvas renders at `devicePixelRatio` (capped 2×).
- Scroll, pointer and parallax handlers are `requestAnimationFrame`-throttled; parallax
  writes transforms directly instead of re-rendering React.
- Semantic landmarks, `aria-label`s, `aria-pressed` toggles, focus-visible rings, and a
  full `prefers-reduced-motion` path (no particles, no autoplay, instant training).

---

## Assignment brief (for reference)

**Task:** build a custom tokenizer that learns a vocabulary from text, supports
ENCODE/DECODE and handles special tokens. Submit code + a small demo corpus + vocab file +
a short README with setup, usage and examples.

**Evaluation:** correctness of ENCODE/DECODE · vocab quality · performance · code quality ·
documentation — **max 100 marks**.

**Timeline:** start Aug 11 2025 21:00 → due Aug 12 2025 21:00 · eval Aug 12 21:00 → Aug 13 21:00.

---

## Feedback

Found a bug or have an idea? Open an issue or a pull request — reviews and stars welcome.

Built with Next.js 15, React 19 and TypeScript. GenAI with JavaScript 1.0 · *chai ke saath*.
