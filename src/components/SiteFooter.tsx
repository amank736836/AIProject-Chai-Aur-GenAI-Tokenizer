"use client";

import AnimatedLogo from "./AnimatedLogo";

const TICKER = [
  "<BOS>",
  "byte",
  "pair",
  "encoding",
  "</w>",
  "vocab",
  "merge",
  "<EOS>",
  "GenAI",
  "JavaScript",
  "tokenizer",
  "<UNK>",
  "corpus",
  "chai",
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy}>
              {TICKER.map((word, index) => (
                <span className="marquee-item" key={`${copy}-${index}`}>
                  {word}
                  <i className="marquee-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-inner">
        <div className="footer-brand">
          <AnimatedLogo size={44} />
          <div>
            <strong>Custom Tokenizer</strong>
            <p>GenAI with JavaScript 1.0 · Chai aur GenAI</p>
          </div>
        </div>

        <div className="footer-links">
          <a href="#train">Train a vocabulary</a>
          <a href="#encode">Encode / decode</a>
          <a href="#vocab">Vocabulary explorer</a>
          <a href="#demo">Word-level demo</a>
          <a
            href="https://github.com/amank736836/Chai-Aur-GenAI-Tokenizer_AIProject"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
        </div>

        <p className="footer-note">
          Built with Next.js 15, React 19 and hand-rolled CSS motion — no
          animation libraries, and every effect respects{" "}
          <code>prefers-reduced-motion</code>.
        </p>
      </div>
    </footer>
  );
}
