# FEAT-001 Known Issues and Gaps

- No hard input/corpus limit, runtime budget, or measured performance threshold is defined; very large text runs on the browser main thread. Large-corpus behavior is unvalidated, not claimed as a confirmed defect.
- Browser interaction tests (preset, pause, interval control and reduced-motion instant path) are defined but not executed.
- Current dependency tree has an open critical/high advisory backlog; see [BUG-001](../../bugs/open/BUG-001.md).
- Tokenizer tie ordering uses JavaScript `localeCompare`; cross-runtime locale stability has not been characterized.
