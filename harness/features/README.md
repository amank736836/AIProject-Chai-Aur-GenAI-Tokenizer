# Feature Inventory

Feature inventory derived from `src/app/page.tsx`, `src/lib/bpe.ts`, `src/tokenizer.ts`, components and the root README. The page has five maintained feature areas; decorative effects are grouped with presentation/preferences rather than treated as independent business modules.

| ID | Feature | Entry point / principal code | Main requirements | Test cases |
| --- | --- | --- | --- | --- |
| FEAT-001 | BPE training and merge visualization | `/` → `#train`; `src/lib/bpe.ts`, `src/components/TrainVisualizer.tsx` | REQ-001–003, REQ-009 | TC-001, TC-002, TC-004, TC-102 |
| FEAT-002 | BPE encode/decode and statistics | `/` → `#encode`; `src/lib/bpe.ts`, `src/app/page.tsx`, `TokenStream.tsx` | REQ-004–005, REQ-009 | TC-003, TC-005, TC-006, TC-008, TC-103, TC-108 |
| FEAT-003 | Vocabulary search, filters and export | `/` → `#vocab`; `VocabExplorer.tsx` | REQ-006 | TC-010, TC-104 |
| FEAT-004 | Word-level reference tokenizer demo | `/` → `#demo`; `src/tokenizer.ts` | REQ-007 | TC-009 |
| FEAT-005 | Presentation, navigation and preferences | Header, theme, reduced motion, training speed | REQ-003, REQ-008 | TC-101, TC-105, TC-107 |

Open each feature folder for its code-derived behavior, acceptance criteria, scenarios, cases, safe test data and known gaps. **Formal user/product requirements and the deployment target remain UNKNOWN / REQUIRES VALIDATION.**
