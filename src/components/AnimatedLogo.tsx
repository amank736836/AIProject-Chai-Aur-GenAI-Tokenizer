"use client";

type AnimatedLogoProps = {
  size?: number;
  className?: string;
};

/**
 * Animated logo: self-drawing orbit rings around a steaming chai cup that
 * doubles as a "{" brace — a nod to "Chai aur GenAI".
 */
export default function AnimatedLogo({ size = 56, className = "" }: AnimatedLogoProps) {
  return (
    <span className={`logo-mark ${className}`.trim()} style={{ width: size, height: size }}>
      <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label="Ama tokenizer logo">
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b7bff" />
            <stop offset="45%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="logo-steam" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <g className="logo-rings">
          <circle
            className="logo-ring logo-ring-outer"
            cx="32"
            cy="32"
            r="29"
            fill="none"
            stroke="url(#logo-gradient)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="46 136"
          />
          <circle
            className="logo-ring logo-ring-inner"
            cx="32"
            cy="32"
            r="23.5"
            fill="none"
            stroke="url(#logo-gradient)"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeDasharray="18 130"
            opacity="0.75"
          />
        </g>

        <circle className="logo-core" cx="32" cy="32" r="18.5" fill="url(#logo-gradient)" opacity="0.14" />

        {/* chai cup */}
        <path
          className="logo-draw logo-cup"
          d="M22 27h18v9a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8v-9Z"
          fill="none"
          stroke="url(#logo-gradient)"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          className="logo-draw logo-handle"
          d="M40 30h3.4a4.2 4.2 0 0 1 0 8.4H40"
          fill="none"
          stroke="url(#logo-gradient)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          className="logo-draw logo-saucer"
          d="M19 47h24"
          fill="none"
          stroke="url(#logo-gradient)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* steam */}
        <g stroke="url(#logo-steam)" strokeWidth="2" strokeLinecap="round" fill="none">
          <path className="logo-steam s1" d="M27 22c2-2 0-4 2-6" />
          <path className="logo-steam s2" d="M32 21c2-2.4 0-4.4 2-6.6" />
          <path className="logo-steam s3" d="M37 22c2-2 0-4 2-6" />
        </g>
      </svg>
    </span>
  );
}
