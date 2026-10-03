"use client";

import { useCopy } from "@/lib/hooks";

type CopyButtonProps = {
  value: string;
  label?: string;
  className?: string;
  onCopied?: () => void;
};

/** Icon morphs into a self-drawing checkmark on success. */
export default function CopyButton({
  value,
  label = "Copy",
  className = "",
  onCopied,
}: CopyButtonProps) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      className={`copy-btn${copied ? " is-copied" : ""} ${className}`.trim()}
      onClick={async () => {
        const ok = await copy(value);
        if (ok) onCopied?.();
      }}
      aria-label={copied ? "Copied to clipboard" : `Copy ${label}`}
      title={copied ? "Copied!" : `Copy ${label}`}
    >
      <span className="copy-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="15" height="15" className="copy-glyph">
          <rect
            x="9"
            y="9"
            width="11"
            height="11"
            rx="2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <svg viewBox="0 0 24 24" width="15" height="15" className="check-glyph">
          <path
            d="M20 6 9 17l-5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="copy-label">{copied ? "Copied" : label}</span>
    </button>
  );
}
