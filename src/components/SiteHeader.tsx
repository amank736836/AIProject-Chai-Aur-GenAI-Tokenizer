"use client";

import { useEffect, useState } from "react";
import AnimatedLogo from "./AnimatedLogo";
import ThemeToggle from "./ThemeToggle";
import { useScrollProgress } from "@/lib/hooks";

const NAV = [
  { id: "train", label: "Train" },
  { id: "encode", label: "Encode" },
  { id: "vocab", label: "Vocab" },
  { id: "demo", label: "Demo" },
];

/** Sticky glass header that condenses on scroll, with animated scroll-spy nav. */
export default function SiteHeader() {
  const { y } = useScrollProgress();
  const [active, setActive] = useState<string>("train");

  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (node): node is HTMLElement => Boolean(node)
    );
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header${y > 24 ? " is-stuck" : ""}`}>
      <div className="site-header-inner">
        <a className="brand" href="#top">
          <AnimatedLogo size={42} />
          <span className="brand-text">
            <strong>Ama</strong>
            <span className="brand-sub">Custom Tokenizer</span>
          </span>
          <span className="brand-shimmer" aria-hidden="true" />
        </a>

        <nav className="site-nav" aria-label="Sections">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link${active === item.id ? " is-active" : ""}`}
            >
              {item.label}
              <span className="nav-underline" aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="site-header-actions">
          <a
            className="btn btn-outline btn-sm github-link"
            href="https://github.com/amank736836/Chai-Aur-GenAI-Tokenizer_AIProject"
            target="_blank"
            rel="noreferrer noopener"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"
              />
            </svg>
            <span>Source</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
