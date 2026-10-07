# FEAT-002 — BPE Encode / Decode and Statistics

**Feature:** FEAT-002 — BPE encode/decode  
**Purpose:** Convert visitor text into BPE token pieces and IDs, decode IDs, and display simple counts.  
**User:** Playground visitor; no sign-in or role.  
**Entry Point:** `/` → `#encode`; the default input is a built-in example.  
**Dependencies:** Trained `BPETokenizer`, React state/memos, `TokenStream`, clipboard APIs.  
**Inputs:** Any text string; Enter copies IDs; Ctrl/⌘+K clears; Clear, Fill example and Replay controls.  
**Outputs:** BOS/content/EOS pieces, numeric IDs, decoded text, round-trip pill, token stream, pipeline and statistics.  
**Business Rules:** BR-001, BR-003–BR-008. Encoding uses merge rank; whitespace is normalized; characters absent from the trained vocabulary may become `<UNK>`.  
**Expected Behavior:** Recompute as text or tokenizer version changes; decode should recover the same content for normalized whitespace and known symbols. `stats()` counts Unicode code points and whitespace-split words.  
**Error Handling:** Missing symbols use the `<UNK>` ID; unknown IDs decode to `<UNK>` and are skipped as special tokens. No network request is made.  
**Permissions:** None.  
**Related APIs:** None (local module API only).  
**Related Database Tables:** None.  
**Related UI:** `src/app/page.tsx` (`#encode`), `TokenStream.tsx`, `PipelineFlow.tsx`, `CopyButton.tsx`, `src/lib/bpe.ts`.  
**Existing Tests:** Harness automated tests TC-003, TC-005, TC-006, TC-008 cover core module behavior.  
**Missing Tests:** Browser clipboard fallback, hotkeys, live UI updates, IME/combining-sequence behavior and exact-whitespace presentation.  
**Known Issues:** The page's “lossless round trip” indicator ignores outer whitespace and case. Decoder normalizes whitespace, so the label is not an exact-string guarantee (BUG-002). See [known issues](known-issues.md).
