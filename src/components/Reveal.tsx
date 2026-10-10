"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/lib/hooks";

type Variant = "up" | "down" | "left" | "right" | "zoom" | "blur";

type RevealProps = {
  children: ReactNode;
  /** milliseconds – used for staggering sibling reveals */
  delay?: number;
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/** Scroll-reveal wrapper (scrollytelling building block). */
export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
  style,
  threshold,
  as: Tag = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });

  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal-${variant}${inView ? " is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
