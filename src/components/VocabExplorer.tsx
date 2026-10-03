"use client";

import { useMemo, useState } from "react";
import { SPECIAL_TOKENS, WORD_END, displayToken, type VocabEntry } from "@/lib/bpe";

type VocabExplorerProps = {
  entries: VocabEntry[];
  vocabSize: number;
  vocabJson: string;
  onCopyJson?: () => void;
  onDownload?: () => void;
};

const FILTERS: { id: "all" | "special" | "merge" | "char"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "special", label: "Special" },
  { id: "merge", label: "Merged" },
  { id: "char", label: "Chars" },
];

const display = (token: string) => {
  if (token === WORD_END) return "⏎ word end";
  const shown = displayToken(token);
  return shown.wordEnd && token !== WORD_END ? `${shown.text}␣` : shown.text;
};

/** Searchable, filterable vocabulary list with staggered entry animations. */
export default function VocabExplorer({
  entries,
  vocabSize,
  vocabJson,
  onCopyJson,
  onDownload,
}: VocabExplorerProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries
      .filter((entry) => {
        if (filter === "special") return (SPECIAL_TOKENS as readonly string[]).includes(entry.token) || entry.token === WORD_END;
        if (filter === "merge") return entry.kind === "merge" && entry.token !== WORD_END;
        if (filter === "char") return entry.kind === "char";
        return true;
      })
      .filter((entry) =>
        needle
          ? entry.token.toLowerCase().includes(needle) ||
            String(entry.id).includes(needle)
          : true
      )
      .slice(0, 220);
  }, [entries, filter, query]);

  const maxCount = useMemo(
    () => rows.reduce((max, row) => Math.max(max, row.count), 1),
    [rows]
  );

  return (
    <div className="vocab-explorer">
      <div className="vocab-toolbar">
        <label className="vocab-search">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.6-3.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search token or id…"
            aria-label="Search vocabulary"
          />
          <span className="vocab-search-glow" aria-hidden="true" />
        </label>

        <div className="vocab-filters" role="group" aria-label="Filter vocabulary">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              className={`filter-chip${filter === item.id ? " is-active" : ""}`}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
              <span className="filter-chip-glow" aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className="vocab-toolbar-meta">
          <span className="vocab-count">
            <b>{rows.length}</b> / {vocabSize} tokens
          </span>
          {onCopyJson && (
            <button type="button" className="copy-btn" onClick={onCopyJson} title="Copy vocab.json">
              <span className="copy-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15" className="copy-glyph">
                  <rect x="9" y="9" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span className="copy-label">Copy JSON</span>
            </button>
          )}
          <button
            type="button"
            className="copy-btn"
            title="Download vocab.json"
            onClick={() => {
              const blob = new Blob([vocabJson], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const anchor = document.createElement("a");
              anchor.href = url;
              anchor.download = "vocab.json";
              anchor.click();
              URL.revokeObjectURL(url);
              onDownload?.();
            }}
          >
            <span className="copy-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="15" height="15" className="copy-glyph">
                <path
                  d="M12 3v11m0 0 4-4m-4 4-4-4M4 19h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="copy-label">Download</span>
          </button>
        </div>
      </div>

      <ul className="vocab-list" key={`${filter}-${query}`}>
        {rows.map((row, index) => (
          <li
            className={`vocab-row vocab-${row.kind}`}
            key={`${row.id}-${row.token}`}
            style={{ "--row-delay": `${Math.min(index * 12, 500)}ms` } as React.CSSProperties}
          >
            <span className="vocab-id">{row.id}</span>
            <span className="vocab-token">{display(row.token)}</span>
            <span className="vocab-freq" aria-hidden="true">
              <span
                className="vocab-freq-fill"
                style={{ width: `${Math.max(3, (row.count / maxCount) * 100)}%` }}
              />
            </span>
            <span className="vocab-row-count">{row.count || "—"}</span>
          </li>
        ))}
        {!rows.length && (
          <li className="vocab-empty">No vocabulary entries match “{query}”.</li>
        )}
      </ul>
    </div>
  );
}
