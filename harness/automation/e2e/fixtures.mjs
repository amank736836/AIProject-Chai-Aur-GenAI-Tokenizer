import { test as base } from "@playwright/test";
import chromiumPackage, { inflate, setupLambdaEnvironment } from "@sparticuz/chromium";
import { chromium as playwrightChromium } from "playwright-core";
import { join } from "node:path";

const lambdaLibraryArchive = join(
  process.cwd(),
  "node_modules/@sparticuz/chromium/bin/al2023.tar.br"
);

/**
 * Arena's Linux image does not ship the NSS libraries expected by Chromium.
 * The Chromium npm package includes those libraries; extract them once to /tmp
 * and expose them to the browser process before launch.
 */
async function launchChromium() {
  await inflate(lambdaLibraryArchive);
  setupLambdaEnvironment("/tmp/al2023/lib");

  const executablePath = await chromiumPackage.executablePath();
  const args = chromiumPackage.args.filter(
    (argument) =>
      !argument.startsWith("--headless") && argument !== "--disable-web-security"
  );

  return playwrightChromium.launch({
    executablePath,
    args,
    headless: true,
  });
}

export const test = base.extend({
  // A fresh process per test avoids retaining state between tests and keeps
  // the serverless Chromium build's single-process mode isolated.
  page: async ({}, use) => {
    const browser = await launchChromium();
    const context = await browser.newContext({
      viewport: { width: 1366, height: 900 },
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    // `use` is Playwright's fixture callback, not a React hook.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);

    await browser.close();
  },
  touchPage: async ({}, use) => {
    const browser = await launchChromium();
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    // `use` is Playwright's fixture callback, not a React hook.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);

    await browser.close();
  },
});

export { expect } from "@playwright/test";
