# FEAT-001 Requirements

- **REQ-001:** Train a BPE vocabulary from a supplied corpus.
- **REQ-002:** Initialize base tokens, add corpus code points, honor the base-vocabulary floor, and stop on exhaustion.
- **REQ-003:** Offer animated training controls, presets, speed selection, pause, and instant/reduced-motion execution.
- **REQ-009:** Perform tokenization in the browser; no app-specific API/database is present.

Sources: `src/lib/bpe.ts`, the `#train` region of `src/app/page.tsx`, `TrainVisualizer.tsx`. These are code-derived; formal product sign-off is UNKNOWN / REQUIRES VALIDATION.
