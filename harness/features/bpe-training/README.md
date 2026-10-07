# FEAT-001 — BPE Training and Merge Visualization

**Feature:** FEAT-001 — BPE training and merge visualization  
**Purpose:** Build a corpus-derived BPE vocabulary and make each selected pair merge visible.  
**User:** Playground visitor / tokenizer learner; no account or role is modeled.  
**Entry Point:** `/` → `#train`; hero CTA scrolls here and starts training.  
**Dependencies:** `BPETokenizer` (`src/lib/bpe.ts`), React state/timers, `TrainVisualizer`, `localStorage` speed preference, browser reduced-motion preference.  
**Inputs:** Corpus text, vocabulary target (UI range up to 300, at least base vocabulary), preset choice, interval (160/80/38 ms), Train / Instant train / Stop.  
**Outputs:** Base vocabulary, merge records, current pair counts, progress, completion/stop toast.  
**Business Rules:** BR-001–BR-006; see [business rules](../../requirements/business-rules.md).  
**Expected Behavior:** Initialize special/ASCII/end-marker tokens and corpus characters; aggregate adjacent pairs; merge one most-frequent pair per animated tick or loop instantly; end at target or pair exhaustion. Corpus/budget edits trigger debounced instant retraining when not in an active run.  
**Error Handling:** No pairs ends early and displays an informational toast; empty corpus is valid and produces no merges. No corpus-size limit or user-facing error boundary is specified.  
**Permissions:** None; no auth/authorization code exists.  
**Related APIs:** None (local TypeScript calls).  
**Related Database Tables:** None.  
**Related UI:** `src/app/page.tsx` (`#train`), `src/components/TrainVisualizer.tsx`, `src/lib/bpe.ts`.  
**Existing Tests:** No tests existed in the baseline. Harness tests cover fixed IDs, pair selection, budget/exhaustion and deterministic stepping: TC-001, TC-002, TC-004, TC-007.  
**Missing Tests:** Browser training/pause/preset interactions, non-ASCII base counts, large-corpus latency and supported-browser validation.  
**Known Issues:** No measured corpus limit or training performance target; dependency issue BUG-001 affects release posture. See [known issues](known-issues.md).
