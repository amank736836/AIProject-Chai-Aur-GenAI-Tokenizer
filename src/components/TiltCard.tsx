"use client";

import { useCallback, useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** maximum rotation in degrees */
  max?: number;
  glare?: boolean;
};

/** Faux-3D card: tilts toward the cursor and carries a moving specular glare. */
export default function TiltCard({
  children,
  className = "",
  style,
  max = 7,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const node = ref.current;
      if (!node || reduced) return;
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("button, a, input, textarea, select, [role='button'], [contenteditable='true']")
      ) {
        // A rotating parent can move a small control out from under the pointer
        // between pointerdown and click. Keep controls stationary and clickable.
        node.style.setProperty("--rx", "0deg");
        node.style.setProperty("--ry", "0deg");
        node.classList.remove("is-tilting");
        node.classList.add("is-interacting");
        return;
      }
      node.classList.remove("is-interacting");
      const rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      node.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
      node.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
      node.style.setProperty("--mx", `${px * 100}%`);
      node.style.setProperty("--my", `${py * 100}%`);
      node.classList.add("is-tilting");
    },
    [max, reduced]
  );

  const onLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
    node.classList.remove("is-tilting", "is-interacting");
  }, []);

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`.trim()}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {glare && <span className="tilt-glare" aria-hidden="true" />}
      {children}
    </div>
  );
}
