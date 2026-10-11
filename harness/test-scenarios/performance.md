# Performance Scenarios

## SCN-601 — Client-side tokenizer and page responsiveness

No response-time, corpus-size, memory, throughput, device or concurrency SLA is specified. The measurements below are descriptive local Chromium observations, not a target-based PASS or field Web Vitals report.

### RUN-2026-002 sample

- **Context:** optimized local Next.js production build, Chromium 153.0.8010.0 in Linux sandbox; 120ms artificial delay on Next static assets; one run; page then encoded locally while the browser context was offline.
- **Observed:** TTFB 8ms; DOMContentLoaded 241ms; load 396ms; LCP 864ms; CLS 0.000. Four long tasks exceeded 50ms (54, 166, 60 and 58ms); source was not attributed. Seven Event Timing entries were observed at 16ms each. Ten resources were observed (6 JS); encoded/decoded resource bytes were 329,635/751,574. Failed requests: 0; page/console errors: 0.
- **Edge input:** 500-character input fill wall-time was 459ms at 390px; document width remained 390px. This is one interaction timing, not a repeatable benchmark.
- **Evidence:** [`performance.json`](../evidence/logs/RUN-2026-002-performance.json), [`encode edge cases`](../evidence/logs/RUN-2026-002-encode-edge-cases.json).

This is a single synthetic run on a sandbox, not a representative user device, repeatable benchmark, stress test or SLO evaluation. The source code's full training and encoding work runs synchronously on the main thread; the four observed long tasks were not attributed to a specific operation. Formal performance status remains **NOT GRADED**; product thresholds and a representative device/corpus profile are **UNKNOWN / REQUIRES VALIDATION**.

### Suggested follow-up after thresholds are agreed

1. Record browser/version, device/CPU, build mode, viewport and commit.
2. Use synthetic corpora at 100, 1,000, 10,000 and product-agreed larger word counts; avoid production/personal data.
3. Measure `train()` duration, animated time-to-completion, `encode()` duration and peak memory; repeat each size 5 times after warm-up.
4. Measure responsiveness while editing and while merge animation runs; capture a browser performance profile/long tasks.
5. Record input size, vocabulary target, run count, median/p95, memory and console errors; compare only with agreed budgets.
