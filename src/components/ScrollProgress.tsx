"use client";

import { useScrollProgress } from "@/lib/hooks";

/** Gradient reading-progress bar pinned to the very top of the viewport. */
export default function ScrollProgress() {
  const { progress } = useScrollProgress();

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
