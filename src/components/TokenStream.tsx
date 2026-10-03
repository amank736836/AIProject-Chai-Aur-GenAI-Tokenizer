"use client";

import type { TokenPiece } from "@/lib/bpe";
import { displayToken, tokenHue } from "@/lib/bpe";

type TokenStreamProps = {
  pieces: TokenPiece[];
  /** change this to replay the stagger animation (e.g. after a new encode) */
  runId?: number | string;
  className?: string;
};

const KIND_LABEL: Record<TokenPiece["kind"], string> = {
  special: "special",
  "word-end": "word end",
  merge: "merged",
  char: "char",
  unk: "unknown",
};

/** The animated token stream: chips pop in one after another, colour-coded by type. */
export default function TokenStream({ pieces, runId = 0, className = "" }: TokenStreamProps) {
  const contentPieces = pieces.filter((piece) => piece.kind !== "special");

  if (!contentPieces.length) {
    return (
      <div className={`token-stream token-stream-empty ${className}`.trim()}>
        <span className="token-stream-placeholder">
          Type something above — tokens appear here instantly.
        </span>
      </div>
    );
  }

  return (
    <div className={`token-stream ${className}`.trim()} key={runId}>
      {pieces.map((piece, index) => {
        const hue = tokenHue(piece.token);
        const isSpecial = piece.kind === "special";
        const shown = displayToken(piece.token);
        return (
          <span
            key={`${runId}-${index}-${piece.id}`}
            className={`token-chip token-${piece.kind}${shown.wordEnd ? " has-end" : ""}`}
            style={
              {
                "--chip-delay": `${Math.min(index * 34, 1200)}ms`,
                "--chip-hue": isSpecial ? 38 : hue,
              } as React.CSSProperties
            }
            title={`${KIND_LABEL[piece.kind]} · id ${piece.id}`}
          >
            <span className="token-chip-text">{shown.text}</span>
            {shown.wordEnd && !isSpecial && (
              <span className="token-chip-end" aria-hidden="true">
                ␣
              </span>
            )}
            <span className="token-chip-id">{piece.id}</span>
            <span className="token-chip-pulse" aria-hidden="true" />
          </span>
        );
      })}
    </div>
  );
}

export function TokenLegend() {
  const items: { kind: TokenPiece["kind"]; label: string; sample: string }[] = [
    { kind: "special", label: "Special", sample: "<BOS>" },
    { kind: "merge", label: "Merged", sample: "the" },
    { kind: "char", label: "Character", sample: "x" },
    { kind: "word-end", label: "Word end", sample: "␣" },
    { kind: "unk", label: "Unknown", sample: "?" },
  ];

  return (
    <div className="token-legend">
      {items.map((item) => (
        <span key={item.kind} className={`token-legend-item token-${item.kind}`}>
          <span className={`token-chip token-${item.kind} token-chip-static`}>
            <span className="token-chip-text">{item.sample}</span>
          </span>
          {item.label}
        </span>
      ))}
    </div>
  );
}
