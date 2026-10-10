# FEAT-001 Behavior

1. `prepareTraining(text, target)` calls `initVocab(text)`, splits the corpus into whitespace-separated words plus `</w>`, and sets target to `max(requested, base size)`.
2. Base IDs start with four special tokens, then printable ASCII 32–126, then `</w>`; unseen non-ASCII code points from the corpus follow.
3. `topPairs()` counts adjacent symbols across all words, sorting descending by count and then by left symbol.
4. `stepMerge()` takes the first pair, adds/reuses its concatenated token, records count/step/ID, rewrites every occurrence, and marks training active.
5. Animated mode schedules merges at the selected interval (intro interval is capped at 34 ms); instant/reduced-motion mode loops until target/exhaustion.
6. If `stepMerge()` finds no pair, the UI stops before the requested target and reports that the corpus is fully compressed. Stop preserves the partial merge state.

No test assumes the requested target is always reachable.
