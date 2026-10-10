"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "tokenizer-theme";

/** Glassy theme switch with a morphing sun ↔ moon icon and orbiting stars. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const next =
      stored ??
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");
    setTheme(next);
    root.dataset.theme = next;
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <span className="theme-toggle-track" data-theme={mounted ? theme : "dark"}>
        <span className="theme-toggle-thumb">
          <svg viewBox="0 0 24 24" className="theme-icon theme-icon-sun" aria-hidden="true">
            <circle cx="12" cy="12" r="4.6" />
            <g className="sun-rays">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line
                  key={deg}
                  x1="12"
                  y1="2.4"
                  x2="12"
                  y2="4.6"
                  transform={`rotate(${deg} 12 12)`}
                />
              ))}
            </g>
          </svg>
          <svg viewBox="0 0 24 24" className="theme-icon theme-icon-moon" aria-hidden="true">
            <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
          </svg>
        </span>
        <span className="theme-toggle-stars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </span>
    </button>
  );
}
