"use client";

import { useCallback, useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks";

type Variant = "primary" | "accent" | "ghost" | "outline";

type MagneticButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  title?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
};

/** Micro-interaction button: magnetic pull, shine sweep and spring-back. */
export default function MagneticButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  style,
  disabled,
  title,
  type = "button",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const node = ref.current;
      if (!node || reduced || node.disabled) return;
      const rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--mag-x", `${px * 14}px`);
      node.style.setProperty("--mag-y", `${py * 10}px`);
      node.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
      node.style.setProperty("--my", `${(py + 0.5) * 100}%`);
    },
    [reduced]
  );

  const onLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--mag-x", "0px");
    node.style.setProperty("--mag-y", "0px");
  }, []);

  return (
    <button
      ref={ref}
      type={type}
      title={title}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`btn btn-${variant} ${className}`.trim()}
      style={style}
    >
      <span className="btn-shine" aria-hidden="true" />
      <span className="btn-label">{children}</span>
    </button>
  );
}
