"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { BPETokenizer } from "@/lib/bpe";
import type { MergeRecord } from "@/lib/bpe";
import { useLocalStorage, useReducedMotion } from "@/lib/hooks";
import { Tokenizer } from "@/tokenizer";

import AnimatedBackground from "@/components/AnimatedBackground";
import CopyButton from "@/components/CopyButton";
import CursorGlow from "@/components/CursorGlow";
import Hero from "@/components/Hero";
import MagneticButton from "@/components/MagneticButton";
import PipelineFlow from "@/components/PipelineFlow";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import SectionHeading from "@/components/SectionHeading";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StatCard from "@/components/StatCard";
import TiltCard from "@/components/TiltCard";
import TokenStream, { TokenLegend } from "@/components/TokenStream";
import { ToastStack, useToasts } from "@/components/Toast";
import TrainVisualizer from "@/components/TrainVisualizer";
import VocabExplorer from "@/components/VocabExplorer";

/* ------------------------------------------------------------------ *
 * Demo data
 * ------------------------------------------------------------------ */

const PRESETS = [
  {
    id: "chai",
    label: "Chai break",
    text: "chai aur code chai aur genai chai is hot and the code is cold the tokenizer learns the vocabulary from the corpus the corpus is small but the merges are useful chai breaks make the debugging easier and the debugging makes the chai better",
  },
  {
    id: "genai",
    label: "GenAI glossary",
    text: "the transformer attends to every token in the sequence the model encodes text into ids and decodes ids back into text embeddings vocabulary tokenizer training corpus merges subword pieces the tokenizer learns subword pieces from the training corpus",
  },
  {
    id: "pangram",
    label: "Pangrams",
    text: "the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jars how vexingly quick daft zebras jump the five boxing wizards jump quickly at the lazy dog and the dog barks at the wizards",
  },
  {
    id: "code",
    label: "Code snippet",
    text: "const tokenizer = new Tokenizer(); tokenizer.train(corpus, 120); const ids = tokenizer.encode(text); const decoded = tokenizer.decode(ids); console.log(ids.length, decoded);",
  },
];

const EXAMPLE_INPUT = "The quick brown fox jumps over the lazy dog! @2025";
const DEMO_CORPUS = "Hello world from the tokenizer demo corpus";
const DEMO_SAMPLE = "Hello world from tokenizer";

const SPEEDS = [
  { label: "0.5×", value: 160 },
  { label: "1×", value: 80 },
  { label: "2×", value: 38 },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Split & count pairs",
    body: "Every word becomes its characters plus a </w> end marker. We count how often each adjacent pair occurs across the whole corpus.",
    glyph: (
      <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
        <path className="glyph-draw" d="M6 34h36M6 24h24M6 14h30" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle className="glyph-dot" cx="38" cy="14" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Merge the winner",
    body: "The most frequent pair is glued into a brand-new vocabulary entry, and every occurrence in the corpus is rewritten in one pass.",
    glyph: (
      <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
        <path className="glyph-draw" d="M8 16h12m8 0h12M8 32h12m8 0h12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path className="glyph-draw" d="M24 10v28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="3 5" />
        <circle className="glyph-dot" cx="24" cy="24" r="5" fill="currentColor" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Repeat, then encode",
    body: "Loop until the vocabulary hits its target size. Encoding replays merges by rank; decoding is a lossless join of the pieces.",
    glyph: (
      <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
        <path className="glyph-draw" d="M40 24a16 16 0 1 1-5.2-11.8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path className="glyph-draw" d="M40 6v8h-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle className="glyph-dot" cx="24" cy="24" r="4" fill="currentColor" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

export default function Home() {
  const reduced = useReducedMotion();
  const { toasts, push, dismiss } = useToasts();

  const tokenizerRef = useRef<BPETokenizer | null>(null);
  if (tokenizerRef.current === null) tokenizerRef.current = new BPETokenizer();
  const tok = tokenizerRef.current;

  const [corpus, setCorpus] = useState(PRESETS[0].text);
  const [activePreset, setActivePreset] = useState(PRESETS[0].id);
  const [vocabTarget, setVocabTarget] = useState(150);
  const [speed, setSpeed] = useLocalStorage("tokenizer-speed", 80);

  const [mergeLog, setMergeLog] = useState<MergeRecord[]>([]);
  const [baseVocab, setBaseVocab] = useState(0);
  const [targetVocab, setTargetVocab] = useState(150);
  const [training, setTraining] = useState(false);
  const [introRun, setIntroRun] = useState(false);
  const [version, setVersion] = useState(0);
  const [runId, setRunId] = useState(0);

  const [input, setInput] = useState(EXAMPLE_INPUT);

  const bump = useCallback(() => setVersion((v) => v + 1), []);

  /* ---------------------------- training ---------------------------- */

  const trainInstant = useCallback(
    (text: string, target: number) => {
      const info = tok.prepareTraining(text, target);
      while (tok.vocabSize < tok.targetVocabSize) {
        if (!tok.stepMerge()) break;
      }
      setBaseVocab(info.baseVocab);
      setTargetVocab(info.targetVocab);
      setMergeLog([...tok.mergeHistory]);
      setRunId((r) => r + 1);
      bump();
    },
    // `tok` is a stable ref object for the lifetime of the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bump]
  );

  // Mirror `training` into a ref so the sync effect below doesn't re-run (and
  // instantly finish) the moment an animated run completes or is stopped.
  const trainingRef = useRef(false);
  useEffect(() => {
    trainingRef.current = training;
  }, [training]);

  // Keep the vocabulary in sync while the user edits the corpus or the slider.
  // The signature ref (instead of a boolean) makes this safe under React
  // StrictMode, which mounts every effect twice in development.
  const syncedSignature = useRef<string | null>(null);
  useEffect(() => {
    const signature = `${corpus}\u0000${vocabTarget}`;
    if (syncedSignature.current === signature) return;
    if (syncedSignature.current === null) {
      // first pass — the animated intro effect below owns the initial training
      syncedSignature.current = signature;
      return;
    }
    if (trainingRef.current) return;
    const timer = setTimeout(() => trainInstant(corpus, vocabTarget), reduced ? 0 : 320);
    return () => clearTimeout(timer);
  }, [corpus, vocabTarget, trainInstant, reduced]);

  // Drive the animated, merge-by-merge training run.
  useEffect(() => {
    if (!training) return;

    const timer = setInterval(() => {
      if (tok.vocabSize >= tok.targetVocabSize) {
        setTraining(false);
        setIntroRun(false);
        setRunId((r) => r + 1);
        if (!introRun) {
          push(`Training complete · ${tok.mergeCount} merges learned`, "success");
        }
        return;
      }
      const record = tok.stepMerge();
      if (!record) {
        setTraining(false);
        setIntroRun(false);
        setRunId((r) => r + 1);
        push("Corpus fully compressed — no pairs left to merge", "info");
        return;
      }
      setMergeLog((log) => [...log, record]);
      bump();
    }, introRun ? Math.min(speed, 34) : speed);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [training, speed, introRun, bump, push]);

  const startAnimatedTraining = useCallback(
    (announce = true, intro = false) => {
      const info = tok.prepareTraining(corpus, vocabTarget);
      setBaseVocab(info.baseVocab);
      setTargetVocab(info.targetVocab);
      setMergeLog([]);
      setRunId((r) => r + 1);
      bump();
      if (reduced) {
        trainInstant(corpus, vocabTarget);
        if (announce) push("Vocabulary trained", "success");
        return;
      }
      setIntroRun(intro);
      setTraining(true);
      if (announce) push("Training started — watch the merge log", "info");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [corpus, vocabTarget, bump, push, reduced, trainInstant]
  );

  // First paint: let the visitor watch the vocabulary being learned.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      trainInstant(corpus, vocabTarget);
      return;
    }
    const timer = setTimeout(() => startAnimatedTraining(false, true), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopTraining = useCallback(() => {
    setTraining(false);
    setIntroRun(false);
    setMergeLog([...tok.mergeHistory]);
    push(`Paused after ${tok.mergeCount} merges`, "warning");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [push]);

  const applyPreset = useCallback(
    (preset: (typeof PRESETS)[number]) => {
      setActivePreset(preset.id);
      // the sync effect above retrains as soon as the corpus lands in state
      setCorpus(preset.text);
      push(`Corpus loaded · ${preset.label}`, "info");
    },
    [push]
  );

  /* -------------------------- encode / decode ------------------------ */

  const pieces = useMemo(
    () => tok.encodeDetailed(input),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [input, version]
  );
  const ids = useMemo(() => pieces.map((piece) => piece.id), [pieces]);
  const decoded = useMemo(() => tok.decode(ids), [tok, ids]);
  const stats = useMemo(
    () => tok.stats(input),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [input, version]
  );
  const topPairs = useMemo(
    () => tok.topPairs(5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version, corpus, training]
  );
  const vocabEntries = useMemo(
    () => tok.vocabEntries(400),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version]
  );
  const vocabJson = useMemo(
    () => JSON.stringify(tok.vocab, null, 2),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version]
  );

  const roundTripOk = decoded.trim().toLowerCase() === input.trim().toLowerCase();
  const corpusWords = corpus.split(/\s+/).filter(Boolean).length;

  const scrollTo = useCallback(
    (id: string) => {
      const node = document.getElementById(id);
      if (!node) return;
      node.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    },
    [reduced]
  );

  const handleExample = useCallback(() => {
    setInput(EXAMPLE_INPUT);
    setRunId((r) => r + 1);
    scrollTo("encode");
    push("Example loaded into the encoder", "info");
  }, [scrollTo, push]);

  const handleCopyIds = useCallback(() => {
    push("Token ids copied to clipboard", "success");
  }, [push]);

  /* ------------------------ word-level demo ------------------------- */

  const demo = useMemo(() => {
    const wordTokenizer = new Tokenizer();
    wordTokenizer.learnVocab(DEMO_CORPUS, 50);
    const tokens = wordTokenizer.encode(DEMO_SAMPLE);
    return {
      tokens,
      decoded: wordTokenizer.decode(tokens),
      vocabSize: Object.keys(wordTokenizer.vocab).length,
    };
  }, []);

  /* ------------------------------ render ---------------------------- */

  return (
    <div className="app-shell">
      <AnimatedBackground />
      <CursorGlow />
      <ScrollProgress />
      <SiteHeader />
      <ToastStack toasts={toasts} onDismiss={dismiss} />

      <main className="page">
        <Hero
          onTrain={() => {
            scrollTo("train");
            window.setTimeout(() => startAnimatedTraining(), reduced ? 0 : 600);
          }}
          onExample={handleExample}
          vocabSize={tok.vocabSize}
          mergeCount={tok.mergeCount}
        />

        <Reveal className="stats-strip" variant="up">
          <StatCard
            label="Vocabulary size"
            value={tok.vocabSize}
            accent={255}
            hint={`${baseVocab} base slots + ${mergeLog.length} learned merges`}
            icon={
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          />
          <StatCard
            label="Corpus words"
            value={corpusWords}
            accent={190}
            hint="whitespace-split training tokens"
            icon={
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M4 5h16v14H4z" fill="none" stroke="currentColor" strokeWidth="1.9" />
                <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
            }
          />
          <StatCard
            label="Tokens for input"
            value={stats.tokens}
            accent={40}
            hint={`${stats.chars} characters → ${stats.tokens} pieces`}
            icon={
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <rect x="3" y="7" width="6" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.9" />
                <rect x="15" y="7" width="6" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.9" />
                <path d="M11 12h2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
            }
          />
          <StatCard
            label="Chars per token"
            value={stats.compression}
            decimals={2}
            accent={330}
            hint="higher is better compression"
            icon={
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M4 18 9 11l4 4 7-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
        </Reveal>

        {/* ---------------------------- train ---------------------------- */}
        <section className="panel-section" id="train">
          <Reveal>
            <TiltCard className="panel panel-primary">
              <SectionHeading
                index="1"
                title="Train the tokenizer"
                subtitle="Paste a corpus, pick a vocabulary budget and watch byte-pair merges happen live."
                aside={
                  <div className="speed-control" role="group" aria-label="Training speed">
                    {SPEEDS.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        className={`speed-chip${speed === option.value ? " is-active" : ""}`}
                        onClick={() => setSpeed(option.value)}
                        aria-pressed={speed === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                }
              />

              <div className="train-grid">
                <div className="train-input">
                  <div className="preset-row">
                    <span className="preset-label">Corpus presets</span>
                    <div className="preset-chips">
                      {PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          className={`preset-chip${activePreset === preset.id ? " is-active" : ""}`}
                          onClick={() => applyPreset(preset)}
                          disabled={training}
                        >
                          {preset.label}
                          <span className="preset-chip-glow" aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="field">
                    <span className="field-label">
                      Training corpus
                      <em>{corpusWords} words · {[...corpus].length} chars</em>
                    </span>
                    <textarea
                      className="textarea"
                      rows={7}
                      value={corpus}
                      spellCheck={false}
                      disabled={training}
                      onChange={(event) => {
                        setCorpus(event.target.value);
                        setActivePreset("");
                      }}
                      placeholder="Paste your training corpus here…"
                    />
                    <span className="field-focus-ring" aria-hidden="true" />
                  </label>

                  <label className="field">
                    <span className="field-label">
                      Vocabulary budget
                      <em>
                        {vocabTarget} slots · {Math.max(0, vocabTarget - baseVocab)} merges
                      </em>
                    </span>
                    <input
                      className="slider"
                      type="range"
                      min={baseVocab || 100}
                      max={300}
                      step={5}
                      value={Math.max(vocabTarget, baseVocab || 100)}
                      disabled={training}
                      onChange={(event) => setVocabTarget(Number(event.target.value))}
                      style={{
                        "--slider-progress": `${Math.max(
                          0,
                          Math.min(
                            100,
                            ((vocabTarget - (baseVocab || 100)) /
                              (300 - (baseVocab || 100))) *
                              100
                          )
                        )}%`,
                      } as React.CSSProperties}
                      aria-label="Vocabulary budget"
                    />
                  </label>

                  <div className="action-row">
                    {training ? (
                      <MagneticButton variant="accent" onClick={stopTraining}>
                        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                          <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
                        </svg>
                        Stop training
                      </MagneticButton>
                    ) : (
                      <MagneticButton variant="primary" onClick={() => startAnimatedTraining()}>
                        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                          <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1M7.7 16.3l-2.1 2.1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Train tokenizer
                      </MagneticButton>
                    )}
                    <MagneticButton
                      variant="ghost"
                      disabled={training}
                      onClick={() => {
                        trainInstant(corpus, vocabTarget);
                        push("Vocabulary trained instantly", "success");
                      }}
                    >
                      Instant train
                    </MagneticButton>
                    <span className={`training-hint${training ? " is-live" : ""}`}>
                      <i aria-hidden="true" />
                      {training ? "merging…" : "ready"}
                    </span>
                  </div>
                </div>

                <TrainVisualizer
                  merges={mergeLog}
                  topPairs={topPairs}
                  vocabSize={tok.vocabSize}
                  baseVocab={baseVocab}
                  targetVocab={targetVocab}
                  training={training}
                />
              </div>
            </TiltCard>
          </Reveal>
        </section>

        {/* --------------------------- encode ---------------------------- */}
        <section className="panel-section" id="encode">
          <Reveal>
            <TiltCard className="panel panel-primary">
              <SectionHeading
                index="2"
                title="Encode & decode"
                subtitle="Encoding is live — every keystroke re-runs the merge stack and animates the token stream."
                aside={<TokenLegend />}
              />

              <label className="field">
                <span className="field-label">
                  Input text
                  <em>press ⏎ to copy the ids · ⌘/ctrl + K to clear</em>
                </span>
                <input
                  className="input input-lg"
                  type="text"
                  value={input}
                  spellCheck={false}
                  placeholder={EXAMPLE_INPUT}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      navigator.clipboard
                        ?.writeText(ids.join(" "))
                        .then(() => push("Token ids copied to clipboard", "success"))
                        .catch(() => push("Clipboard blocked by the browser", "warning"));
                    }
                    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                      event.preventDefault();
                      setInput("");
                    }
                  }}
                />
                <span className="field-focus-ring" aria-hidden="true" />
              </label>

              <div className="action-row">
                <MagneticButton variant="primary" onClick={handleExample}>
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path d="M4 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Fill example
                </MagneticButton>
                <MagneticButton
                  variant="accent"
                  onClick={() => {
                    setRunId((r) => r + 1);
                    push("Token stream replayed", "info");
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Replay animation
                </MagneticButton>
                <MagneticButton variant="ghost" onClick={() => setInput("")}>
                  Clear
                </MagneticButton>
                <CopyButton value={ids.join(" ")} label="ids" onCopied={handleCopyIds} />
              </div>

              <Reveal variant="up" delay={60}>
                <div className="result-block">
                  <div className="result-head">
                    <h3>Token stream</h3>
                    <span className={`roundtrip-pill${roundTripOk ? " is-ok" : " is-warn"}`}>
                      <i aria-hidden="true" />
                      {roundTripOk ? "lossless round trip" : "round trip differs"}
                    </span>
                  </div>
                  <TokenStream pieces={pieces} runId={runId} />
                </div>
              </Reveal>

              <div className="result-grid">
                <Reveal variant="up" delay={80}>
                  <div className="result-block result-mono">
                    <div className="result-head">
                      <h3>Encoded ids</h3>
                      <CopyButton value={ids.join(" ")} label="ids" onCopied={handleCopyIds} />
                    </div>
                    <pre className="ids-pre">{ids.length ? `[${ids.join(", ")}]` : "—"}</pre>
                  </div>
                </Reveal>

                <Reveal variant="up" delay={140}>
                  <div className="result-block result-mono">
                    <div className="result-head">
                      <h3>Decoded text</h3>
                      <CopyButton value={decoded} label="decoded text" onCopied={() => push("Decoded text copied", "success")} />
                    </div>
                    <pre className="decoded-pre">{decoded || "—"}</pre>
                  </div>
                </Reveal>
              </div>

              <Reveal variant="zoom" delay={80}>
                <PipelineFlow
                  chars={stats.chars}
                  tokens={stats.tokens}
                  ids={ids.length}
                  ok={roundTripOk}
                />
              </Reveal>
            </TiltCard>
          </Reveal>
        </section>

        {/* ---------------------------- vocab ---------------------------- */}
        <section className="panel-section" id="vocab">
          <Reveal>
            <TiltCard className="panel">
              <SectionHeading
                index="3"
                title="Vocabulary explorer"
                subtitle="Everything the tokenizer learned, ranked by id — filter it, search it, export it."
                aside={
                  <span className="vocab-badge">
                    {vocabEntries.length} entries
                  </span>
                }
              />
              <VocabExplorer
                entries={vocabEntries}
                vocabSize={tok.vocabSize}
                vocabJson={vocabJson}
                onCopyJson={() => {
                  navigator.clipboard
                    ?.writeText(vocabJson)
                    .then(() => push("vocab.json copied to clipboard", "success"))
                    .catch(() => push("Clipboard blocked by the browser", "warning"));
                }}
                onDownload={() => push("vocab.json downloaded", "success")}
              />
            </TiltCard>
          </Reveal>
        </section>

        {/* ------------------------ how it works ------------------------- */}
        <section className="panel-section" id="how">
          <Reveal>
            <SectionHeading
              title="How the merges work"
              subtitle="Three steps, repeated until the vocabulary budget is spent."
            />
          </Reveal>
          <div className="cards-3">
            {HOW_IT_WORKS.map((card, index) => (
              <Reveal key={card.step} delay={index * 120} variant="up">
                <TiltCard className="mini-card" max={10}>
                  <span className="mini-card-step">{card.step}</span>
                  <span className="mini-card-glyph">{card.glyph}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <span className="mini-card-beam" aria-hidden="true" />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------------------- demo ----------------------------- */}
        <section className="panel-section" id="demo">
          <Reveal>
            <TiltCard className="panel">
              <SectionHeading
                index="4"
                title="Word-level reference demo"
                subtitle="The original frequency-based tokenizer from src/tokenizer.ts, side by side with the BPE run."
              />
              <div className="demo-grid">
                {[
                  { label: "Input", value: DEMO_SAMPLE },
                  { label: "Tokens", value: `[${demo.tokens.join(", ")}]` },
                  { label: "Decoded", value: demo.decoded },
                  { label: "Vocab size", value: String(demo.vocabSize) },
                  { label: "Special tokens", value: "<PAD>, <UNK>, <BOS>, <EOS>" },
                  { label: "Corpus", value: DEMO_CORPUS },
                ].map((row, index) => (
                  <Reveal key={row.label} delay={index * 70} variant="left" className="demo-row-wrap">
                    <div className="demo-row">
                      <span className="demo-label">{row.label}</span>
                      <span className="demo-value">{row.value}</span>
                      <span className="demo-row-glow" aria-hidden="true" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
