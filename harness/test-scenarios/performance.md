# Performance Scenarios

## SCN-601 — Client-side tokenizer and page responsiveness

No response-time, corpus-size, memory, throughput, device, or concurrency SLA is specified. Do not label a performance test PASS until a product owner sets representative data and acceptance thresholds.

Suggested reproducible plan after thresholds are agreed:

1. Record browser/version, device/CPU, build mode, viewport and commit.
2. Use synthetic corpora at 100, 1,000, 10,000 and a product-agreed larger number of words; avoid production/personal data.
3. Measure `train()` duration, animated time-to-completion, `encode()` duration and peak memory; repeat each size 5 times after warm-up.
4. Measure responsiveness while editing and while a merge animation runs; capture browser performance profile/long tasks.
5. Record input size, vocabulary target, run count, median/p95, memory and console errors. Compare only with agreed budgets.

Potential stress dimensions from code: pair counting scans corpus at every merge; synchronous full training and encode execute on the main thread. Current performance status: **NOT_EXECUTED**; thresholds **UNKNOWN / REQUIRES VALIDATION**.
