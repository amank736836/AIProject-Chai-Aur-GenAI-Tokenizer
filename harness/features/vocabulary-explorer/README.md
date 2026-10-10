# FEAT-003 — Vocabulary Explorer and Export

**Feature:** FEAT-003 — vocabulary explorer  
**Purpose:** Inspect learned vocabulary IDs, token kinds and training-corpus counts; search/filter and export the ID map.  
**User:** Playground visitor.  
**Entry Point:** `/` → `#vocab`.  
**Dependencies:** `BPETokenizer.vocabEntries()`, page-generated JSON, React local component state, Clipboard API, browser Blob/object URL/download behavior.  
**Inputs:** Search text (matches token or ID), All/Special/Merged/Chars filter, Copy JSON and Download.  
**Outputs:** Filtered rows and frequency indicators; a copied/downloaded `vocab.json`.  
**Business Rules:** IDs remain in vocabulary insertion order; search is trimmed and case-insensitive; filters select the corresponding token kinds; the word-end sentinel is included with Special. The list is sliced to 220 rows, and the page supplies at most 400 entries.  
**Expected Behavior:** Search and filter update the visible list; empty matches show an empty-state message; export serializes the entire current `tok.vocab` object, not only filtered rows.  
**Error Handling:** Clipboard rejection is surfaced through a warning toast for the page's JSON-copy action. Download/Blob errors are not explicitly handled.  
**Permissions:** None.  
**Related APIs:** None; browser clipboard/download APIs only.  
**Related Database Tables:** None.  
**Related UI:** `src/components/VocabExplorer.tsx`, `src/app/page.tsx`, `src/lib/bpe.ts`.  
**Existing Tests:** Harness automated coverage checks vocabulary entry IDs/counts and JSON round-trip (TC-010).  
**Missing Tests:** Real-browser filters, clipboard denial, download contents, long search strings and keyboard/screen-reader interaction.  
**Known Issues:** Browser export flows are unexecuted; no persistent server-side vocabulary exists. See [known issues](known-issues.md).
