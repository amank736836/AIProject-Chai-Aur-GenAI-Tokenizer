/**
 * Byte-pair-encoding tokenizer used by the demo UI.
 *
 * The class is intentionally *steppable*: `stepMerge()` performs a single BPE
 * merge and returns a record describing it, which lets the UI animate the
 * training process one merge at a time (see `TrainVisualizer`).
 */

export const SPECIAL_TOKENS = ["<PAD>", "<UNK>", "<BOS>", "<EOS>"] as const;
export type SpecialToken = (typeof SPECIAL_TOKENS)[number];

/** Sentinel appended to every corpus/input word so BPE can learn word endings. */
export const WORD_END = "</w>";

const ASCII_FROM = 32;
const ASCII_TO = 126;

export type TokenKind = "special" | "word-end" | "merge" | "char" | "unk";

export interface TokenPiece {
  id: number;
  token: string;
  kind: TokenKind;
}

export interface MergeRecord {
  step: number;
  a: string;
  b: string;
  token: string;
  count: number;
  id: number;
  vocabSize: number;
}

export interface PairStat {
  key: string;
  a: string;
  b: string;
  count: number;
}

export interface VocabEntry {
  token: string;
  id: number;
  count: number;
  kind: TokenKind;
}

export interface EncodeStats {
  chars: number;
  words: number;
  tokens: number;
  /** characters per token – lower means the vocabulary compresses better */
  compression: number;
  unknown: number;
}

const pairKey = (a: string, b: string) => `${a}\u0000${b}`;

export class BPETokenizer {
  private tokenToId = new Map<string, number>();
  private idToToken = new Map<number, string>();
  private mergeRank = new Map<string, number>();
  private mergeLog: MergeRecord[] = [];
  private corpus: string[][] = [];

  trained = false;
  targetVocabSize = 0;

  /* ------------------------------------------------------------------ *
   * Accessors
   * ------------------------------------------------------------------ */

  get vocab(): Record<string, number> {
    return Object.fromEntries(this.tokenToId);
  }

  get invVocab(): Record<number, string> {
    return Object.fromEntries(this.idToToken);
  }

  get merges(): string[][] {
    return this.mergeLog.map((m) => [m.a, m.b]);
  }

  get mergeHistory(): MergeRecord[] {
    return this.mergeLog;
  }

  get vocabSize(): number {
    return this.tokenToId.size;
  }

  get mergeCount(): number {
    return this.mergeLog.length;
  }

  /* ------------------------------------------------------------------ *
   * Vocabulary bootstrapping
   * ------------------------------------------------------------------ */

  private addToken(token: string): number {
    const id = this.tokenToId.size;
    this.tokenToId.set(token, id);
    this.idToToken.set(id, token);
    return id;
  }

  private idOf(token: string): number | undefined {
    return this.tokenToId.get(token);
  }

  /** Special tokens + printable ASCII + the word-end sentinel + any extra chars. */
  initVocab(text = "") {
    this.tokenToId.clear();
    this.idToToken.clear();
    this.mergeRank.clear();
    this.mergeLog = [];
    this.corpus = [];
    this.trained = false;

    SPECIAL_TOKENS.forEach((tok) => this.addToken(tok));
    for (let code = ASCII_FROM; code <= ASCII_TO; code++) {
      this.addToken(String.fromCharCode(code));
    }
    this.addToken(WORD_END);

    // Characters outside printable ASCII (emoji, accents, devanagari, ...) still
    // get a slot so they can be encoded instead of collapsing into <UNK>.
    const seen = new Set<string>();
    for (const ch of text) {
      if (!seen.has(ch) && !this.tokenToId.has(ch)) {
        seen.add(ch);
        this.addToken(ch);
      }
    }
  }

  private splitWords(text: string): string[][] {
    return text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => [...word, WORD_END]);
  }

  /** Loads the training corpus; returns the number of word instances. */
  setCorpus(text: string): number {
    this.corpus = this.splitWords(text);
    return this.corpus.reduce((sum, w) => sum + w.length, 0);
  }

  /* ------------------------------------------------------------------ *
   * Training
   * ------------------------------------------------------------------ */

  /** Most frequent adjacent symbol pairs currently present in the corpus. */
  topPairs(limit = 6): PairStat[] {
    const counts = new Map<string, number>();
    for (const word of this.corpus) {
      for (let i = 0; i < word.length - 1; i++) {
        const key = pairKey(word[i], word[i + 1]);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .map(([key, count]) => {
        const [a, b] = key.split("\u0000");
        return { key, a, b, count };
      })
      .sort((x, y) => y.count - x.count || x.a.localeCompare(y.a))
      .slice(0, limit);
  }

  /** Performs exactly one BPE merge. Returns `null` when nothing is left to merge. */
  stepMerge(): MergeRecord | null {
    const best = this.topPairs(1)[0];
    if (!best) return null;

    const token = best.a + best.b;
    const id = this.tokenToId.has(token)
      ? (this.idOf(token) as number)
      : this.addToken(token);
    if (!this.mergeRank.has(best.key)) {
      this.mergeRank.set(best.key, this.mergeLog.length);
    }

    const record: MergeRecord = {
      step: this.mergeLog.length + 1,
      a: best.a,
      b: best.b,
      token,
      count: best.count,
      id,
      vocabSize: this.tokenToId.size,
    };
    this.mergeLog.push(record);

    // Rewrite the corpus with the freshly merged symbol.
    this.corpus = this.corpus.map((word) => {
      if (!word.includes(best.a)) return word;
      const out: string[] = [];
      for (let i = 0; i < word.length; i++) {
        if (i < word.length - 1 && word[i] === best.a && word[i + 1] === best.b) {
          out.push(token);
          i++;
        } else {
          out.push(word[i]);
        }
      }
      return out;
    });

    this.trained = true;
    return record;
  }

  /** Synchronous full training run (used when animations are disabled). */
  train(text: string, vocabSize = 60): MergeRecord[] {
    this.initVocab(text);
    this.setCorpus(text);
    this.targetVocabSize = Math.max(vocabSize, this.tokenToId.size);
    while (this.tokenToId.size < this.targetVocabSize) {
      if (!this.stepMerge()) break;
    }
    this.trained = true;
    return this.mergeLog;
  }

  /** Bootstraps the vocab for an animated run; the caller drives `stepMerge()`. */
  prepareTraining(text: string, vocabSize = 60) {
    this.initVocab(text);
    this.setCorpus(text);
    this.targetVocabSize = Math.max(vocabSize, this.tokenToId.size);
    return {
      baseVocab: this.tokenToId.size,
      targetVocab: this.targetVocabSize,
    };
  }

  /* ------------------------------------------------------------------ *
   * Encode / decode
   * ------------------------------------------------------------------ */

  /** Greedy merge application ordered by merge rank (textbook BPE). */
  private applyMerges(symbols: string[]): string[] {
    let current = symbols;
    while (current.length > 1) {
      let bestIndex = -1;
      let bestRank = Number.POSITIVE_INFINITY;
      for (let i = 0; i < current.length - 1; i++) {
        const rank = this.mergeRank.get(pairKey(current[i], current[i + 1]));
        if (rank !== undefined && rank < bestRank) {
          bestRank = rank;
          bestIndex = i;
        }
      }
      if (bestIndex === -1) break;
      const merged = current[bestIndex] + current[bestIndex + 1];
      current = [
        ...current.slice(0, bestIndex),
        merged,
        ...current.slice(bestIndex + 2),
      ];
    }
    return current;
  }

  kindOf(token: string): TokenKind {
    if ((SPECIAL_TOKENS as readonly string[]).includes(token)) return "special";
    if (token === WORD_END) return "word-end";
    if ([...token].length > 1) return "merge";
    return "char";
  }

  /** Encode into rich pieces – this is what the animated token stream renders. */
  encodeDetailed(text: string): TokenPiece[] {
    const bos = this.idOf("<BOS>") ?? 0;
    const eos = this.idOf("<EOS>") ?? 0;
    const unk = this.idOf("<UNK>") ?? 1;

    const pieces: TokenPiece[] = [{ id: bos, token: "<BOS>", kind: "special" }];

    for (const word of this.splitWords(text)) {
      for (const symbol of this.applyMerges(word)) {
        const id = this.idOf(symbol);
        if (id === undefined) {
          pieces.push({ id: unk, token: symbol, kind: "unk" });
        } else {
          pieces.push({ id, token: symbol, kind: this.kindOf(symbol) });
        }
      }
    }

    pieces.push({ id: eos, token: "<EOS>", kind: "special" });
    return pieces;
  }

  encode(text: string): number[] {
    return this.encodeDetailed(text).map((piece) => piece.id);
  }

  decode(tokenIds: number[]): string {
    let out = "";
    for (const id of tokenIds) {
      const token = this.idToToken.get(id) ?? "<UNK>";
      if ((SPECIAL_TOKENS as readonly string[]).includes(token)) continue;
      // `</w>` can be *inside* a merged piece (e.g. "chai</w>"), not only on its own
      if (token.endsWith(WORD_END)) {
        out += token.slice(0, -WORD_END.length) + " ";
      } else {
        out += token;
      }
    }
    return out.replace(/\s+$/, "");
  }

  stats(text: string): EncodeStats {
    const pieces = this.encodeDetailed(text);
    const content = pieces.filter((p) => p.kind !== "special");
    const chars = [...text].length;
    const tokens = content.length || 1;
    return {
      chars,
      words: text.split(/\s+/).filter(Boolean).length,
      tokens: content.length,
      compression: chars === 0 ? 0 : chars / tokens,
      unknown: content.filter((p) => p.kind === "unk").length,
    };
  }

  /** Every vocabulary slot (ordered by id) with its corpus frequency. */
  vocabEntries(limit = 400): VocabEntry[] {
    const counts = new Map<string, number>();
    for (const word of this.corpus) {
      for (const symbol of word) {
        counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
      }
    }
    return [...this.tokenToId.entries()]
      .map(([token, id]) => ({
        token,
        id,
        count: counts.get(token) ?? 0,
        kind: this.kindOf(token),
      }))
      .sort((a, b) => a.id - b.id)
      .slice(0, limit);
  }

  /** Frequency of every vocabulary token inside the trained corpus. */
  tokenFrequencies(limit = 40): { token: string; id: number; count: number; kind: TokenKind }[] {
    const counts = new Map<string, number>();
    for (const word of this.corpus) {
      for (const symbol of word) {
        counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .map(([token, count]) => ({
        token,
        count,
        id: this.idOf(token) ?? -1,
        kind: this.kindOf(token),
      }))
      .filter((entry) => entry.id >= 0 && entry.token !== WORD_END)
      .sort((a, b) => b.count - a.count || a.id - b.id)
      .slice(0, limit);
  }
}

/** Stable 0-359 hue derived from a token string, used to colour the chips. */
export function tokenHue(token: string): number {
  let hash = 0;
  for (let i = 0; i < token.length; i++) {
    hash = (hash * 31 + token.charCodeAt(i)) % 100000;
  }
  return hash % 360;
}

/** Human-friendly rendering of a raw vocabulary token. */
export function displayToken(token: string): { text: string; wordEnd: boolean } {
  if (token === WORD_END) return { text: "\u2423", wordEnd: true };
  if (token.endsWith(WORD_END)) {
    return { text: token.slice(0, -WORD_END.length) || "\u2423", wordEnd: true };
  }
  return { text: token === " " ? "\u2423" : token, wordEnd: false };
}
