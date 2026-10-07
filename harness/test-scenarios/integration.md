# Integration Scenarios

## SCN-301 — Page and tokenizer data flow

1. Page corpus/budget state initializes `BPETokenizer` training.
2. Merge records/top pairs/vocab size reach the training visualizer.
3. Encoder text becomes `TokenPiece[]`, numeric IDs, decoded text and statistics.
4. Vocabulary entries and complete vocab JSON reach the explorer/export controls.
5. Browser localStorage provides theme/speed preferences; clipboard/download APIs handle user actions.
6. Next.js build serves/prerenders the root page without an external API/database.

Automated Node tests verify tokenizer-module boundaries; lint/typecheck/build verify compilation and prerender. End-to-end browser integrations 1–5 are NOT_EXECUTED. No backend→DB, auth→API or external-service integration exists to test in this repository.
