# Functional Requirements

Formal product specifications were not found. These requirement IDs capture observed behavior from the repository and should be confirmed by a product owner before treating them as a complete specification.

| ID | Requirement (observed) | Feature | Source evidence | Verification |
| --- | --- | --- | --- | --- |
| REQ-001 | The user can supply a corpus and train a BPE vocabulary from adjacent-symbol merges. | FEAT-001 | `src/lib/bpe.ts`, train section in `src/app/page.tsx` | SCN-002; TC-001, TC-002 |
| REQ-002 | Training initializes special/base tokens, includes corpus non-ASCII code points, respects a minimum vocabulary target equal to the base size, and stops if no pair remains. | FEAT-001 | `initVocab`, `train`, `prepareTraining`, `stepMerge` | SCN-002/201; TC-001, TC-004, TC-005 |
| REQ-003 | Training is presented as merge-by-merge animation with presets, speed choices, pause and instant/reduced-motion paths. | FEAT-001, FEAT-005 | `page.tsx`, `TrainVisualizer.tsx`, `useReducedMotion` | SCN-002/501; TC-102, TC-105 (manual cases) |
| REQ-004 | The BPE API encodes words using learned merge ranks, wraps pieces with `<BOS>`/`<EOS>`, decodes IDs, omits special tokens and reports unknown pieces. | FEAT-002 | `src/lib/bpe.ts` | SCN-003/101; TC-003, TC-005, TC-008 |
| REQ-005 | The page updates token pieces, IDs, decoded output, round-trip status and simple counts/compression as input or vocabulary changes. | FEAT-002 | `src/app/page.tsx`, `TokenStream.tsx`, `PipelineFlow.tsx` | SCN-003; TC-003, TC-103, TC-108 |
| REQ-006 | The user can search/filter vocabulary entries and copy/download a JSON vocabulary. | FEAT-003 | `VocabExplorer.tsx`, `page.tsx` | SCN-004; TC-010, TC-104 |
| REQ-007 | The page renders a fixed word-level reference tokenizer example using `src/tokenizer.ts`. | FEAT-004 | `page.tsx`, `src/tokenizer.ts` | SCN-005; TC-009 |
| REQ-008 | The user can toggle light/dark appearance; theme and training speed are stored in browser local storage. | FEAT-005 | `ThemeToggle.tsx`, `useLocalStorage` | SCN-006; TC-105 (manual) |
| REQ-009 | Corpus training and encoding execute in the browser; the repository contains no app-specific API or database. | FEAT-001, FEAT-002 | Client page and tokenizer source; repository inspection | SCN-301; build/unit checks; deployment behavior UNKNOWN / REQUIRES VALIDATION |

## Out of scope / not evidenced

Accounts, authentication/authorization, user-upload storage, server-side training, a public tokenizer API, database-backed vocabularies, collaboration, production service-level objectives, and a support matrix are not evidenced by source. Do not write tests assuming these capabilities exist.
