# FEAT-004 — Word-Level Reference Tokenizer

**Feature:** FEAT-004 — word-level reference demo  
**Purpose:** Show the original frequency-ranked whole-word tokenizer next to the BPE playground as a fixed reference example.  
**User:** Playground visitor / learner.  
**Entry Point:** `/` → `#demo`.  
**Dependencies:** `Tokenizer` from `src/tokenizer.ts`, fixed demo corpus/sample constants in `src/app/page.tsx`.  
**Inputs:** No visitor input; corpus and sample are static constants.  
**Outputs:** Example input, token IDs, decoded string, vocabulary size, special-token list and training corpus.  
**Business Rules:** Four special IDs precede frequency-ranked words; encoding wraps output with BOS/EOS and substitutes `<UNK>` for missing words. See the reference rules section in `requirements/business-rules.md`.  
**Expected Behavior:** A fresh tokenizer learns the fixed corpus once during memo initialization and renders a stable output.  
**Error Handling:** No user-facing error path exists for this static demo; no runtime API is called.  
**Permissions:** None.  
**Related APIs:** None.  
**Related Database Tables:** None.  
**Related UI:** `src/app/page.tsx` (`#demo`), `src/tokenizer.ts`.  
**Existing Tests:** Harness adds one valid-corpus encode/decode test (TC-009). No baseline tests were present.  
**Missing Tests:** Blank/whitespace input, reserved-token spellings in user corpus and repeated `learnVocab()` calls are not specified/tested.  
**Known Issues:** These edge semantics need validation before consumers rely on `Tokenizer` outside the fixed reference demo.
