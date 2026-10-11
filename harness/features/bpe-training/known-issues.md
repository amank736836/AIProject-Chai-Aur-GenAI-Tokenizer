# FEAT-001 Known Issues and Gaps

- No hard input/corpus limit, runtime budget or measured performance threshold is defined; very large text runs on the browser main thread. Only a 500-character encoder input was exercised; large-corpus training remains unvalidated.
- RUN-2026-002 exercised auto/manual training, pause, all three mouse speeds, 2× touch speed, speed persistence, one preset, custom corpus, budget keyboard adjustment, Instant train and empty-corpus behavior. Remaining preset variants, large-corpus training and explicit reduced-motion training-duration equivalence remain untested.
- Five high advisory matches remain in development/build tooling; the production-only dependency audit is clean. See [BUG-001](../../bugs/open/BUG-001.md).
- Tokenizer tie ordering uses JavaScript `localeCompare`; cross-runtime locale stability has not been characterized.
