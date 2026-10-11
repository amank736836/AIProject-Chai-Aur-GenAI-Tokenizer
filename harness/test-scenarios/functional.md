# Functional Scenarios

## SCN-002 — Train BPE vocabulary

Choose a built-in corpus or enter a synthetic corpus; set a target above the base; run animated and instant training; inspect merge count/order; stop a run; verify empty/unmergeable corpora stop gracefully. Check that corpus/budget changes retrain when not actively training. **Cases:** TC-001, TC-002, TC-004, TC-007, TC-102. Core module portion automated; RUN-2026-002 exercised training pause/speed/empty-corpus UI in Chromium; presets, non-empty custom input, and Instant train remain untested.

## SCN-003 — Encode/decode text

Train on a known corpus; enter known and novel text; verify BOS/EOS, pieces, IDs, decoded text, stats and unknown count; exercise case/punctuation and blank input. Check that whitespace normalization is explicit. **Cases:** TC-003, TC-005, TC-006, TC-008, TC-103, TC-108. Module checks passed; RUN-2026-002 exercised encode/decode, exact round-trip messaging, clipboard IDs, shortcuts, unknown Unicode and 500-character input in Chromium. See case-level partials for untested controls.

## SCN-004 — Search/filter/export vocabulary

After training, search by token and ID; each filter; no-match state; copy/download JSON and compare it with the complete vocabulary (not the filtered rows). **Cases:** TC-010, TC-104. Core map/JSON checks passed; RUN-2026-002 exercised browser search/filter, clipboard JSON and download at 390×844 in Chromium. Clipboard-denial behavior remains untested.

## SCN-005 — Reference word-tokenizer example

Open Demo; compare fixed input/corpus, token IDs, special tokens, decoded text and vocabulary size with `src/tokenizer.ts`. **Cases:** TC-009, TC-101. Module round trip automated; browser visibility NOT_EXECUTED.

## SCN-006 — Preferences and motion

Toggle light/dark and reload; change/reload training speed; compare reduced-motion and normal-motion contexts. **Cases:** TC-102, TC-105. Theme/speed persistence and motion-enabled hero behavior passed in RUN-2026-002; OS-scheme fallback and storage denial remain untested.
