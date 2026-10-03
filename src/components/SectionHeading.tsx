"use client";

import type { ReactNode } from "react";

type SectionHeadingProps = {
  index?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  aside?: ReactNode;
  id?: string;
};

/** Section header with a self-drawing underline and an animated step badge. */
export default function SectionHeading({
  index,
  title,
  subtitle,
  icon,
  aside,
  id,
}: SectionHeadingProps) {
  return (
    <header className="section-heading" id={id}>
      <div className="section-heading-main">
        {index && (
          <span className="section-step">
            <span className="section-step-num">{index}</span>
            <span className="section-step-ring" aria-hidden="true" />
          </span>
        )}
        {icon && <span className="section-icon">{icon}</span>}
        <div className="section-heading-text">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
      </div>
      {aside && <div className="section-aside">{aside}</div>}
      <span className="section-rule" aria-hidden="true" />
    </header>
  );
}
