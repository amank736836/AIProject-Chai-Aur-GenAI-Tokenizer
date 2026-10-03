"use client";

import { useCountUp, useInView } from "@/lib/hooks";

type CountUpProps = {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
};

/** Animated statistic – counts up the first time it scrolls into view. */
export default function CountUp({
  value,
  decimals = 0,
  duration = 1000,
  className = "",
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const display = useCountUp(value, inView, duration);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
