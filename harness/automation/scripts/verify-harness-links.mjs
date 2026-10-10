#!/usr/bin/env node

import { readdirSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const harnessRoot = resolve(scriptDir, "../..");
const markdownFiles = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) walk(fullPath);
    else if (entry.toLowerCase().endsWith(".md")) markdownFiles.push(fullPath);
  }
}

walk(harnessRoot);
const broken = [];
let checked = 0;

for (const file of markdownFiles) {
  const text = await readFile(file, "utf8");
  const links = text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g);
  for (const [, rawHref] of links) {
    const href = rawHref.trim().split(/\s+/)[0];
    if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) continue;
    const [relativePath] = href.split("#", 1);
    if (!relativePath) continue;
    checked++;
    let decoded;
    try {
      decoded = decodeURIComponent(relativePath);
    } catch {
      decoded = relativePath;
    }
    const target = resolve(dirname(file), decoded);
    try {
      statSync(target);
    } catch {
      broken.push(`${file.replace(harnessRoot + "/", "")}: ${href}`);
    }
  }
}

if (broken.length) {
  console.error(`Broken local Markdown links (${broken.length}):`);
  for (const item of broken) console.error(`- ${item}`);
  process.exitCode = 1;
} else {
  console.log(`Verified ${checked} local Markdown links across ${markdownFiles.length} harness documents.`);
}
