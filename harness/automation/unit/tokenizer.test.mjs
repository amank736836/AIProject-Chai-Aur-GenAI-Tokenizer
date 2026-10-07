import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const buildDir = process.env.HARNESS_TOKENIZER_BUILD_DIR;
assert.ok(buildDir, "Run this test through scripts/run-tokenizer-tests.mjs");
const require = createRequire(import.meta.url);
const { BPETokenizer, SPECIAL_TOKENS, WORD_END } = require(join(buildDir, "lib/bpe.js"));
const { Tokenizer } = require(join(buildDir, "tokenizer.js"));
const here = fileURLToPath(new URL(".", import.meta.url));
const fixture = (relativePath) =>
  JSON.parse(readFileSync(join(here, "../../test-data", relativePath), "utf8"));

const valid = fixture("valid/bpe-corpus.json");
const edges = fixture("edge-cases/tokenizer-inputs.json");
const invalid = fixture("invalid/tokenizer-inputs.json");
const reference = fixture("sample-data/reference-demo.json");

test("AUT-001 / TC-001: fixed special IDs and 100-slot BPE base vocabulary", () => {
  const tokenizer = new BPETokenizer();
  tokenizer.initVocab();

  assert.deepEqual(SPECIAL_TOKENS, ["<PAD>", "<UNK>", "<BOS>", "<EOS>"]);
  assert.equal(tokenizer.vocabSize, 100);
  assert.equal(tokenizer.vocab["<PAD>"], 0);
  assert.equal(tokenizer.vocab["<UNK>"], 1);
  assert.equal(tokenizer.vocab["<BOS>"], 2);
  assert.equal(tokenizer.vocab["<EOS>"], 3);
  assert.equal(tokenizer.vocab[" "], 4);
  assert.equal(tokenizer.vocab["~"], 98);
  assert.equal(tokenizer.vocab[WORD_END], 99);
});

test("AUT-002 / TC-002: one merge selects the highest-frequency adjacent pair", () => {
  const tokenizer = new BPETokenizer();
  tokenizer.prepareTraining("ab ab", 101);

  const merge = tokenizer.stepMerge();
  assert.ok(merge);
  assert.equal(merge.a, "a");
  assert.equal(merge.b, "b");
  assert.equal(merge.token, "ab");
  assert.equal(merge.count, 2);
  assert.equal(merge.id, 100);
  assert.equal(merge.step, 1);
});

test("AUT-003 / TC-003: trained BPE output has boundaries and round-trips known words", () => {
  const tokenizer = new BPETokenizer();
  tokenizer.train(valid.corpus, valid.vocabTarget);

  const pieces = tokenizer.encodeDetailed(valid.input);
  const ids = tokenizer.encode(valid.input);
  assert.equal(pieces[0].token, "<BOS>");
  assert.equal(pieces.at(-1).token, "<EOS>");
  assert.deepEqual(ids, pieces.map((piece) => piece.id));
  assert.equal(tokenizer.decode(ids), valid.input);
});

test("AUT-004 / TC-004: target is clamped to base and exhausted corpora stop safely", () => {
  const belowBase = new BPETokenizer();
  const info = belowBase.prepareTraining("x", 1);
  assert.equal(info.baseVocab, 100);
  assert.equal(info.targetVocab, 100);
  assert.equal(belowBase.vocabSize, 100);

  const exhausted = new BPETokenizer();
  exhausted.train(edges.empty, 300);
  assert.equal(exhausted.targetVocabSize, 300);
  assert.equal(exhausted.vocabSize, 100);
  assert.equal(exhausted.mergeCount, 0);
  assert.equal(exhausted.stepMerge(), null);
});

test("AUT-005 / TC-005: corpus Unicode is encodable and unseen Unicode is reported", () => {
  const tokenizer = new BPETokenizer();
  tokenizer.train(edges.unicodeCorpus, 125);

  const knownPieces = tokenizer.encodeDetailed(edges.unicodeInput);
  assert.ok(knownPieces.every((piece) => piece.kind !== "unk"));
  assert.equal(tokenizer.decode(knownPieces.map((piece) => piece.id)), edges.unicodeInput);

  const unknownPieces = tokenizer.encodeDetailed(invalid.unseenCodePoint);
  assert.ok(unknownPieces.some((piece) => piece.kind === "unk" && piece.id === tokenizer.vocab["<UNK>"]));
  assert.equal(tokenizer.stats(invalid.unseenCodePoint).unknown, 1);
});

test("AUT-006 / TC-006: empty input and whitespace normalize without throwing", () => {
  const tokenizer = new BPETokenizer();
  tokenizer.train(valid.corpus, valid.vocabTarget);

  assert.deepEqual(tokenizer.encode(edges.empty), [tokenizer.vocab["<BOS>"], tokenizer.vocab["<EOS>"]]);
  assert.equal(tokenizer.decode(tokenizer.encode(edges.empty)), "");
  assert.equal(tokenizer.decode(tokenizer.encode(edges.whitespaceOnly)), "");
  assert.equal(tokenizer.decode(tokenizer.encode(edges.paddedSingleWord)), "chai");
  assert.equal(
    tokenizer.decode(tokenizer.encode(edges.paddedRepeatedWhitespace)),
    edges.normalizedExpected
  );
});

test("AUT-007 / TC-007: full and merge-by-merge training agree", () => {
  const full = new BPETokenizer();
  full.train(valid.corpus, valid.vocabTarget);

  const stepped = new BPETokenizer();
  stepped.prepareTraining(valid.corpus, valid.vocabTarget);
  while (stepped.vocabSize < stepped.targetVocabSize) {
    if (!stepped.stepMerge()) break;
  }

  assert.deepEqual(stepped.mergeHistory, full.mergeHistory);
  assert.deepEqual(stepped.vocab, full.vocab);
});

test("AUT-008 / TC-008: invalid numeric IDs decode safely to no visible text", () => {
  const tokenizer = new BPETokenizer();
  tokenizer.train(valid.corpus, valid.vocabTarget);

  assert.doesNotThrow(() => tokenizer.decode(invalid.unknownIds));
  assert.equal(tokenizer.decode(invalid.unknownIds), "");
});

test("AUT-009 / TC-009: fixed word-level reference sample round-trips", () => {
  const tokenizer = new Tokenizer();
  tokenizer.learnVocab(reference.corpus, reference.requestedVocabSize);

  const ids = tokenizer.encode(reference.input);
  assert.equal(ids[0], tokenizer.vocab["<BOS>"]);
  assert.equal(ids.at(-1), tokenizer.vocab["<EOS>"]);
  assert.equal(tokenizer.decode(ids), reference.input);
});

test("AUT-010 / TC-010: vocabulary entries and JSON IDs match trained vocabulary", () => {
  const tokenizer = new BPETokenizer();
  tokenizer.train(valid.corpus, valid.vocabTarget);

  const vocab = tokenizer.vocab;
  const parsed = JSON.parse(JSON.stringify(vocab));
  const entries = tokenizer.vocabEntries();
  assert.equal(entries.length, tokenizer.vocabSize);
  for (const entry of entries) {
    assert.equal(parsed[entry.token], entry.id);
    assert.ok(entry.count >= 0);
  }
});
