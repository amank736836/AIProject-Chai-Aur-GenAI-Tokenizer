#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdtempSync, rmSync } from "node:fs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "../../..");
const testFile = join(repoRoot, "harness/automation/unit/tokenizer.test.mjs");
const srcRoot = join(repoRoot, "src");
const buildDir = mkdtempSync(join(tmpdir(), "chai-tokenizer-harness-"));
const require = createRequire(import.meta.url);

function report(diagnostics) {
  if (!diagnostics.length) return;
  const host = {
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => repoRoot,
    getNewLine: () => "\n",
  };
  process.stderr.write(
    require("typescript").formatDiagnosticsWithColorAndContext(diagnostics, host)
  );
}

try {
  const ts = require("typescript");
  const compilerOptions = {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    rootDir: srcRoot,
    outDir: buildDir,
    strict: true,
    skipLibCheck: true,
    types: [],
    lib: ["lib.es2020.d.ts"],
  };
  const program = ts.createProgram(
    [join(srcRoot, "lib/bpe.ts"), join(srcRoot, "tokenizer.ts")],
    compilerOptions
  );
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.some((item) => item.category === ts.DiagnosticCategory.Error)) {
    report(diagnostics);
    process.exitCode = 1;
  } else {
    report(diagnostics);
    const emitted = program.emit();
    if (emitted.emitSkipped || emitted.diagnostics.some((item) => item.category === ts.DiagnosticCategory.Error)) {
      report(emitted.diagnostics);
      process.exitCode = 1;
    } else {
      const result = spawnSync(process.execPath, ["--test", testFile], {
        cwd: repoRoot,
        env: { ...process.env, HARNESS_TOKENIZER_BUILD_DIR: buildDir },
        stdio: "inherit",
      });
      if (result.error) throw result.error;
      process.exitCode = result.status ?? 1;
    }
  }
} catch (error) {
  console.error("Tokenizer harness runner failed:", error);
  process.exitCode = 1;
} finally {
  rmSync(buildDir, { recursive: true, force: true });
}
