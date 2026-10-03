"use client";

import { useEffect, useState } from "react";
import AnimatedLogo from "./AnimatedLogo";
import MagneticButton from "./MagneticButton";
import TypeWriter from "./TypeWriter";
import { useParallax, useReducedMotion } from "@/lib/hooks";

type HeroProps = {
  onTrain: () => void;
  onExample: () => void;
  vocabSize: number;
  mergeCount: number;
};

type ScriptLine =
  | { kind: "comment"; text: string }
  | { kind: "command"; text: string }
  | { kind: "output"; text: string }
  | { kind: "chips"; tokens: { text: string; id: number }[] };

const SCRIPT: ScriptLine[] = [
  { kind: "comment", text: "# learn a vocabulary from a tiny corpus" },
  { kind: "command", text: "tokenizer.train(corpus, vocabSize=120)" },
  { kind: "output", text: "counting pairs → merging → repeating…" },
  { kind: "chips", tokens: [{ text: "t", id: 116 }, { text: "h", id: 104 }, { text: "th", id: 127 }, { text: "the", id: 128 }] },
  { kind: "comment", text: "# encode round-trips without loss" },
  { kind: "command", text: "tokenizer.encode('the chai is hot')" },
  { kind: "chips", tokens: [{ text: "<BOS>", id: 2 }, { text: "the", id: 128 }, { text: "▁chai", id: 131 }, { text: "▁is", id: 133 }, { text: "<EOS>", id: 3 }] },
  { kind: "output", text: "[2, 128, 131, 133, 3] → decode → 'the chai is hot' ✓" },
];

const FLOATING = ["<BOS>", "th", "e", "chai", "</w>", "42", "<EOS>", "gen", "ai"];

export default function Hero({ onTrain, onExample, vocabSize, mergeCount }: HeroProps) {
  const reduced = useReducedMotion();
  const parallaxRef = useParallax<HTMLDivElement>(0.05, 44);
  const [visibleLines, setVisibleLines] = useState(reduced ? SCRIPT.length : 0);

  useEffect(() => {
    if (reduced) {
      setVisibleLines(SCRIPT.length);
      return;
    }
    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      index = (index + 1) % (SCRIPT.length + 4);
      setVisibleLines(Math.min(index, SCRIPT.length));
      timer = setTimeout(tick, index >= SCRIPT.length ? 420 : 780);
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <span className="hero-badge">
          <i className="hero-badge-dot" aria-hidden="true" />
          Byte-pair encoding · learned in the browser · zero dependencies
        </span>

        <h1 className="hero-title">
          <span className="line-mask">
            <span className="line-inner" style={{ "--line-delay": "60ms" } as React.CSSProperties}>
              Watch a tokenizer
            </span>
          </span>
          <span className="line-mask">
            <span className="line-inner gradient-text" style={{ "--line-delay": "180ms" } as React.CSSProperties}>
              learn language
            </span>
          </span>
          <span className="line-mask">
            <span className="line-inner hero-typeline" style={{ "--line-delay": "300ms" } as React.CSSProperties}>
              <TypeWriter
                phrases={[
                  "one merge at a time.",
                  "from raw text to ids.",
                  "chai ke saath GenAI.",
                ]}
              />
            </span>
          </span>
        </h1>

        <p className="hero-lead">
          A hands-on playground for a custom subword tokenizer: paste any corpus,
          watch the merge log fill up in real time, then encode and decode text
          with animated token chips, live statistics and a searchable vocabulary.
        </p>

        <div className="hero-actions">
          <MagneticButton onClick={onTrain} variant="primary" className="btn-lg">
            <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
              <path
                d="M5 3v18l7-4 7 4V3H5Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinejoin="round"
              />
            </svg>
            Train the tokenizer
          </MagneticButton>
          <MagneticButton onClick={onExample} variant="ghost" className="btn-lg">
            <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
              <path
                d="m8 5 11 7-11 7V5Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinejoin="round"
              />
            </svg>
            Try a live example
          </MagneticButton>
        </div>

        <dl className="hero-meta">
          <div>
            <dt>Vocab</dt>
            <dd>{vocabSize}</dd>
          </div>
          <div>
            <dt>Merges</dt>
            <dd>{mergeCount}</dd>
          </div>
          <div>
            <dt>Special tokens</dt>
            <dd>4</dd>
          </div>
        </dl>
      </div>

      <div className="hero-visual">
        <div className="console-parallax" ref={parallaxRef}>
        <div className="console">
          <div className="console-bar">
            <span className="console-dot dot-red" />
            <span className="console-dot dot-amber" />
            <span className="console-dot dot-green" />
            <span className="console-title">tokenizer.session</span>
            <span className="console-logo">
              <AnimatedLogo size={22} />
            </span>
          </div>
          <div className="console-body">
            {SCRIPT.slice(0, visibleLines).map((line, index) => (
              <div className={`console-line console-${line.kind}`} key={index}>
                {line.kind === "chips" ? (
                  <span className="console-chips">
                    {line.tokens.map((token) => (
                      <span
                        className={`console-chip${token.text.startsWith("<") ? " chip-special" : ""}`}
                        key={`${index}-${token.text}`}
                        style={{ "--chip-delay": `${index * 60}ms` } as React.CSSProperties}
                      >
                        {token.text}
                        <i>{token.id}</i>
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="console-text">{line.text}</span>
                )}
              </div>
            ))}
            <span className="console-caret" aria-hidden="true" />
          </div>
          <div className="console-scanline" aria-hidden="true" />
        </div>
        </div>

        <div className="floating-chips" aria-hidden="true">
          {FLOATING.map((token, index) => (
            <span
              className="floating-chip"
              key={token}
              style={
                {
                  "--float-left": `${4 + ((index * 29) % 78)}%`,
                  "--float-top": `${6 + ((index * 41) % 80)}%`,
                  "--float-duration": `${11 + (index % 5) * 2.4}s`,
                  "--float-delay": `${index * 0.7}s`,
                } as React.CSSProperties
              }
            >
              {token}
            </span>
          ))}
        </div>
      </div>

      <a className="scroll-cue" href="#train" aria-label="Scroll to the training section">
        <span className="scroll-cue-mouse">
          <span className="scroll-cue-wheel" />
        </span>
        <span className="scroll-cue-text">scroll</span>
      </a>
    </section>
  );
}
