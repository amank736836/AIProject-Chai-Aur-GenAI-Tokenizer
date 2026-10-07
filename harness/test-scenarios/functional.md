# Functional Scenarios

## SCN-002 — Train BPE vocabulary

Choose a built-in corpus or enter a synthetic corpus; set a target above the base; run animated and instant training; inspect merge count/order; stop a run; verify empty/unmergeable corpora stop gracefully. Check that corpus/budget changes retrain when not actively training. **Cases:** TC-001, TC-002, TC-004, TC-007, TC-102. Core module portion automated; UI portion NOT_EXECUTED.

## SCN-003 — Encode/decode text

Train on a known corpus; enter known and novel text; verify BOS/EOS, pieces, IDs, decoded text, stats and unknown count; exercise case/punctuation and blank input. Check that whitespace normalization is explicit. **Cases:** TC-003, TC-005, TC-006, TC-008, TC-103, TC-108. Unit portion automated; UI portion NOT_EXECUTED.

## SCN-004 — Search/filter/export vocabulary

After training, search by token and ID; each filter; no-match state; copy/download JSON and compare it with the complete vocabulary (not the filtered rows). **Cases:** TC-010, TC-104. Core map/JSON portion automated; UI/export NOT_EXECUTED.

## SCN-005 — Reference word-tokenizer example

Open Demo; compare fixed input/corpus, token IDs, special tokens, decoded text and vocabulary size with `src/tokenizer.ts`. **Cases:** TC-009, TC-101. Module round trip automated; browser visibility NOT_EXECUTED.

## SCN-006 — Preferences and motion

Toggle light/dark, reload, test an unset key with both OS color schemes, change/reload training speed, and enable/disable reduced motion. **Cases:** TC-102, TC-105. NOT_EXECUTED in a browser.
