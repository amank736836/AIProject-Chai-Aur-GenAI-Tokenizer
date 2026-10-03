"use client";

import type { ReactNode } from "react";
import CountUp from "./CountUp";

type StatCardProps = {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  hint?: string;
  icon?: ReactNode;
  accent?: number;
};

/** Stat tile with count-up number, hover lift and a conic accent sweep. */
export default function StatCard({
  label,
  value,
  decimals = 0,
  suffix,
  prefix,
  hint,
  icon,
  accent = 250,
}: StatCardProps) {
  return (
    <div
      className="stat-card"
      style={{ "--stat-hue": accent } as React.CSSProperties}
    >
      <span className="stat-glow" aria-hidden="true" />
      <div className="stat-head">
        {icon && <span className="stat-icon">{icon}</span>}
        <span className="stat-label">{label}</span>
      </div>
      <div className="stat-value">
        <CountUp value={value} decimals={decimals} prefix={prefix} suffix={suffix} />
      </div>
      {hint && <p className="stat-hint">{hint}</p>}
    </div>
  );
}
