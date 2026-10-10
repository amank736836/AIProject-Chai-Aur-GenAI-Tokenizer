"use client";

import { displayToken } from "@/lib/bpe";
import type { MergeRecord, PairStat } from "@/lib/bpe";

type TrainVisualizerProps = {
  merges: MergeRecord[];
  topPairs: PairStat[];
  vocabSize: number;
  baseVocab: number;
  targetVocab: number;
  training: boolean;
};

/**
 * Live training telemetry: a growing vocab ring, the most frequent symbol pairs
 * (bars shrink as they get merged away) and a scrolling merge feed.
 */
export default function TrainVisualizer({
  merges,
  topPairs,
  vocabSize,
  baseVocab,
  targetVocab,
  training,
}: TrainVisualizerProps) {
  const span = Math.max(1, targetVocab - baseVocab);
  const progress = Math.min(1, Math.max(0, (vocabSize - baseVocab) / span));
  const circumference = 2 * Math.PI * 34;
  const maxPairCount = topPairs[0]?.count ?? 1;
  const status = training ? "training" : merges.length ? "ready" : "idle";

  return (
    <div className="train-viz">
      <div className="train-viz-ring">
        <div className="ring-wrap">
        <svg viewBox="0 0 80 80" width="92" height="92" aria-hidden="true">
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="var(--track)"
            strokeWidth="7"
          />
          <circle
            className="ring-progress"
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="url(#ring-gradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            transform="rotate(-90 40 40)"
          />
          <defs>
            <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8b7bff" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <div className="train-viz-ring-label">
          <strong>{vocabSize}</strong>
          <span>vocab / {targetVocab}</span>
        </div>
        </div>
        <span className={`status-pill status-${status}`}>
          <i className="status-dot" aria-hidden="true" />
          {status === "training" ? "Learning merges" : status === "ready" ? "Vocab ready" : "Awaiting corpus"}
        </span>
      </div>

      <div className="train-viz-pairs">
        <h3 className="viz-subtitle">
          Most frequent pairs
          <span className="viz-hint">merged next</span>
        </h3>
        {topPairs.length ? (
          <ul className="pair-list">
            {topPairs.map((pair) => (
              <li className="pair-row" key={pair.key}>
                <span className="pair-name">
                  <b>{displayToken(pair.a).text}</b>
                  <i aria-hidden="true">+</i>
                  <b>{displayToken(pair.b).text}</b>
                </span>
                <span className="pair-bar">
                  <span
                    className="pair-bar-fill"
                    style={{ width: `${(pair.count / maxPairCount) * 100}%` }}
                  />
                </span>
                <span className="pair-count">{pair.count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="viz-empty">No mergeable pairs left — corpus fully compressed.</p>
        )}
      </div>

      <div className="train-viz-feed">
        <h3 className="viz-subtitle">
          Merge log
          <span className="viz-hint">{merges.length} merges</span>
        </h3>
        {merges.length ? (
          <ol className="merge-feed">
            {[...merges]
              .slice(-14)
              .reverse()
              .map((merge, position) => (
                <li
                  className={`merge-row${position === 0 ? " is-new" : ""}`}
                  key={merge.step}
                  style={{ "--row-delay": `${position * 26}ms` } as React.CSSProperties}
                >
                  <span className="merge-step">#{merge.step}</span>
                  <span className="merge-expr">
                    <code>{displayToken(merge.a).text}</code>
                    <i aria-hidden="true">+</i>
                    <code>{displayToken(merge.b).text}</code>
                    <span className="merge-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="14" height="14">
                        <path
                          d="M4 12h15m-6-6 6 6-6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <code className="merge-result">
                      {displayToken(merge.token).text}
                      {displayToken(merge.token).wordEnd && merge.token !== "</w>" && (
                        <span className="merge-end" aria-hidden="true">␣</span>
                      )}
                    </code>
                  </span>
                  <span className="merge-meta">×{merge.count}</span>
                </li>
              ))}
          </ol>
        ) : (
          <p className="viz-empty">Press <b>Train</b> to watch byte-pair merges happen live.</p>
        )}
      </div>
    </div>
  );
}
