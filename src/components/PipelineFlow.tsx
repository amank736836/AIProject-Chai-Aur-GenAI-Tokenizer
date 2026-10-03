"use client";

const STAGES = [
  {
    key: "text",
    label: "Raw text",
    hint: "characters",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          d="M4 6h16M4 12h11M4 18h7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: "tokens",
    label: "Subword pieces",
    hint: "merges applied",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <rect x="3" y="7" width="7" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <rect x="14" y="7" width="7" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.9" />
      </svg>
    ),
  },
  {
    key: "ids",
    label: "Token ids",
    hint: "integers",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          d="M9 3 7 21M17 3l-2 18M4 8h16M3 16h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: "decode",
    label: "Decoded",
    hint: "round trip",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          d="M20 6 9 17l-5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

type PipelineFlowProps = {
  chars: number;
  tokens: number;
  ids: number;
  ok: boolean;
};

/** Self-drawing pipeline diagram: text → pieces → ids → decoded text. */
export default function PipelineFlow({ chars, tokens, ids, ok }: PipelineFlowProps) {
  const values = [chars, tokens, ids, ok ? 1 : 0];

  return (
    <div className="pipeline">
      <svg className="pipeline-wire" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
        <path className="wire-base" d="M2 4h96" />
        <path className="wire-flow" d="M2 4h96" />
      </svg>

      <div className="pipeline-stages">
        {STAGES.map((stage, index) => (
          <div className="pipeline-stage" key={stage.key}>
            <span className={`stage-node${ok ? " is-live" : ""}`} style={{ "--stage-delay": `${index * 120}ms` } as React.CSSProperties}>
              <span className="stage-icon">{stage.icon}</span>
              <span className="stage-pulse" aria-hidden="true" />
            </span>
            <span className="stage-label">{stage.label}</span>
            <span className="stage-value">
              {stage.key === "decode" ? (ok ? "lossless" : "—") : values[index]}
            </span>
            <span className="stage-hint">{stage.hint}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
