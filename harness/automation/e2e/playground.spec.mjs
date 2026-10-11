import AxeBuilder from "@axe-core/playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { expect, test } from "./fixtures.mjs";

const EVIDENCE = join(process.cwd(), "harness/evidence");
const SCREENSHOTS = join(EVIDENCE, "screenshots", "RUN-2026-002");
const LOGS = join(EVIDENCE, "logs");
const VIEWPORT_WIDTHS = [320, 375, 390, 425, 640, 768, 820, 1024, 1280, 1366, 1440, 1920, 2560];

async function openPlayground(page) {
  const response = await page.goto("/", { waitUntil: "networkidle" });
  expect(response?.ok(), "the production root route should return HTTP 200").toBeTruthy();
  await expect(page.locator(".status-pill")).toContainText("Vocab ready");
  await expect(page.locator(".vocab-count")).toContainText("150 / 150 tokens");
}

async function screenshot(page, name) {
  await mkdir(SCREENSHOTS, { recursive: true });
  await page.screenshot({
    path: join(SCREENSHOTS, name),
    type: "jpeg",
    quality: 82,
    fullPage: false,
  });
}

async function revealWholePage(page) {
  const reveals = await page.locator(".reveal").all();
  for (const reveal of reveals) {
    await reveal.scrollIntoViewIfNeeded();
    await page.waitForTimeout(20);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(80);
}

async function settleStatistics(page) {
  await page.locator(".stats-strip").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const values = [...document.querySelectorAll(".stat-value > span")];
    return values.length >= 4 && values.every((node) => Number.parseFloat(node.textContent?.replace(/,/g, "") ?? "0") > 0);
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(80);
}

test("all requested widths reflow without horizontal overflow or clipped header controls", async ({ page }) => {
  await openPlayground(page);
  const browserVersion = page.context().browser()?.version() ?? "unknown";
  const results = [];
  const screenshotNames = new Map([
    [320, "mobile-320-home.jpg"],
    [390, "mobile-390-home.jpg"],
    [768, "tablet-768-home.jpg"],
    [1366, "desktop-1366-home.jpg"],
    [2560, "ultrawide-2560-home.jpg"],
  ]);

  for (const width of VIEWPORT_WIDTHS) {
    const height = width < 768 ? 844 : 900;
    await page.setViewportSize({ width, height });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(35);

    const metrics = await page.evaluate(() => {
      const visibleRect = (selector) => {
        const element = document.querySelector(selector);
        if (!element || getComputedStyle(element).display === "none") return null;
        const rect = element.getBoundingClientRect();
        return {
          left: Math.round(rect.left * 10) / 10,
          right: Math.round(rect.right * 10) / 10,
          width: Math.round(rect.width * 10) / 10,
          height: Math.round(rect.height * 10) / 10,
        };
      };
      const root = document.documentElement;
      return {
        innerWidth,
        documentWidth: root.scrollWidth,
        bodyWidth: document.body.scrollWidth,
        header: visibleRect(".site-header-inner"),
        menuButton: visibleRect(".mobile-nav-toggle"),
        sourceLink: visibleRect(".github-link"),
        themeButton: visibleRect(".theme-toggle"),
        menuDisplay: getComputedStyle(document.querySelector(".site-nav")).display,
      };
    });

    expect(metrics.documentWidth, `${width}px document scroll width`).toBeLessThanOrEqual(width);
    expect(metrics.bodyWidth, `${width}px body scroll width`).toBeLessThanOrEqual(width);
    for (const [name, rect] of Object.entries({
      header: metrics.header,
      menuButton: metrics.menuButton,
      sourceLink: metrics.sourceLink,
      themeButton: metrics.themeButton,
    })) {
      if (!rect) continue;
      expect(rect.left, `${width}px ${name} left edge`).toBeGreaterThanOrEqual(-0.5);
      expect(rect.right, `${width}px ${name} right edge`).toBeLessThanOrEqual(width + 0.5);
    }

    if (width <= 760) {
      expect(metrics.menuButton, `${width}px menu button`).not.toBeNull();
      expect(metrics.menuDisplay, `${width}px collapsed nav`).toBe("none");
    } else {
      expect(metrics.menuButton, `${width}px desktop menu button`).toBeNull();
      expect(metrics.menuDisplay, `${width}px desktop nav`).not.toBe("none");
    }

    results.push({ width, height, ...metrics });
    const screenshotName = screenshotNames.get(width);
    if (screenshotName) {
      if (width === 1366) await settleStatistics(page);
      await screenshot(page, screenshotName);
    }
  }

  // Mobile landscape check: the 844px viewport is wide enough for the tablet
  // navigation but still short enough to expose vertical and sticky-header issues.
  await page.setViewportSize({ width: 844, height: 390 });
  const landscape = await page.evaluate(() => ({
    width: innerWidth,
    height: innerHeight,
    documentWidth: document.documentElement.scrollWidth,
    menuButtonDisplay: getComputedStyle(document.querySelector(".mobile-nav-toggle")).display,
    navDisplay: getComputedStyle(document.querySelector(".site-nav")).display,
  }));
  expect(landscape.documentWidth, "844×390 landscape document width").toBeLessThanOrEqual(844);
  expect(landscape.menuButtonDisplay).toBe("none");
  expect(landscape.navDisplay).not.toBe("none");
  results.push({ orientation: "landscape", ...landscape });

  await mkdir(LOGS, { recursive: true });
  await writeFile(
    join(LOGS, "RUN-2026-002-responsive.json"),
    `${JSON.stringify({
      browserVersion,
      requestedWidths: VIEWPORT_WIDTHS,
      zoomEquivalentCssViewports: [
        { baselineViewportWidth: 1280, scale: 2, effectiveCssWidth: 640, actualBrowserZoomApplied: false },
        { baselineViewportWidth: 1280, scale: 4, effectiveCssWidth: 320, actualBrowserZoomApplied: false },
      ],
      viewports: results,
    }, null, 2)}\n`
  );
});

test("hero reveal animation and typewriter work without reduced-motion preference", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await openPlayground(page);

  const gradientLine = page.locator(".hero-title .gradient-text");
  await page.waitForFunction(() => {
    const line = document.querySelector(".hero-title .gradient-text");
    if (!line) return false;
    const text = line.getBoundingClientRect();
    const mask = line.parentElement.getBoundingClientRect();
    return text.top >= mask.top - 1 && text.bottom <= mask.bottom + 1;
  });
  await expect(gradientLine).toContainText("learn language");
  await page.waitForFunction(() => {
    const text = document.querySelector(".typewriter-text")?.textContent ?? "";
    return text.length > 0;
  });

  const typewriterText = await page.locator(".typewriter-text").textContent();
  expect(typewriterText?.length).toBeGreaterThan(0);
});

test("theme control degrades gracefully when localStorage is blocked", async ({ page }) => {
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new DOMException("Storage blocked for QA", "SecurityError");
      },
    });
  });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".status-pill")).toContainText("Vocab ready");
  await page.locator(".theme-toggle").click();
  expect(await pageErrors).toEqual([]);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("hero actions, corpus presets, vocabulary budget and instant training work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openPlayground(page);

  const encoder = page.locator("#encode .input-lg");
  await page.getByRole("button", { name: "Try a live example", exact: true }).click();
  await expect(encoder).toHaveValue("The quick brown fox jumps over the lazy dog! @2025");

  await page.getByRole("button", { name: "Train the tokenizer", exact: true }).click();
  await expect(page.locator("#train .training-hint")).toHaveText("ready");
  const corpus = page.locator("#train .textarea");
  await page.getByRole("button", { name: "GenAI glossary", exact: true }).click();
  await expect(corpus).toHaveValue(/transformer attends to every token/);
  await corpus.fill("chai aur code chai aur genai");
  await expect(corpus).toHaveValue("chai aur code chai aur genai");

  const budget = page.getByRole("slider", { name: "Vocabulary budget" });
  await budget.focus();
  await budget.press("ArrowRight");
  await expect(page.locator("#train .field-label em").nth(1)).toContainText("155 slots");
  await page.getByRole("button", { name: "Instant train", exact: true }).click();
  await expect(page.locator(".status-pill")).toContainText("Vocab ready");
});

test("mobile section navigation is keyboard accessible and browser history works", async ({ page }) => {
  await openPlayground(page);
  await page.setViewportSize({ width: 390, height: 844 });

  const menuButton = page.locator(".mobile-nav-toggle");
  await expect(menuButton).toHaveAccessibleName("Open section navigation");
  await menuButton.focus();
  await expect(menuButton).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("link", { name: "Vocab", exact: true })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuButton).toBeFocused();

  await menuButton.click();
  await page.getByRole("link", { name: "Vocab", exact: true }).click();
  await expect(page).toHaveURL(/#vocab$/);
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  await menuButton.click();
  await page.getByRole("link", { name: "Train", exact: true }).click();
  await expect(page).toHaveURL(/#train$/);
  await menuButton.click();
  await page.getByRole("link", { name: "Encode", exact: true }).click();
  await expect(page).toHaveURL(/#encode$/);
  await page.goBack();
  await expect(page).toHaveURL(/#train$/);
  await page.goForward();
  await expect(page).toHaveURL(/#encode$/);

  const themeButton = page.locator(".theme-toggle");
  await themeButton.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("native touch opens navigation and operates training and vocabulary controls", async ({ touchPage }) => {
  await openPlayground(touchPage);
  const menuButton = touchPage.locator(".mobile-nav-toggle");
  await menuButton.tap();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await touchPage.getByRole("link", { name: "Train", exact: true }).tap();
  await expect(touchPage).toHaveURL(/#train$/);

  const stopButton = touchPage.getByRole("button", { name: "Stop training" });
  if (await stopButton.isVisible()) await stopButton.tap();
  const speedButton = touchPage.getByRole("button", { name: "2×", exact: true });
  await speedButton.scrollIntoViewIfNeeded();
  await speedButton.tap();
  await expect(speedButton).toHaveAttribute("aria-pressed", "true");

  await menuButton.tap();
  await touchPage.getByRole("link", { name: "Vocab", exact: true }).tap();
  await expect(touchPage).toHaveURL(/#vocab$/);
  const mergedFilter = touchPage.getByRole("button", { name: "Merged", exact: true });
  await mergedFilter.tap();
  await expect(mergedFilter).toHaveAttribute("aria-pressed", "true");
});

test("training controls pause cleanly, speed persists and empty corpora fail safely", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "networkidle" });

  const stopButton = page.getByRole("button", { name: "Stop training" });
  await expect(stopButton).toBeVisible(); // automatic introductory run
  await stopButton.click();
  await expect(page.getByRole("button", { name: "Train tokenizer" })).toBeVisible();

  const halfSpeedButton = page.getByRole("button", { name: "0.5×", exact: true });
  await halfSpeedButton.click();
  await expect(halfSpeedButton).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("tokenizer-speed"))).toBe("160");
  const normalSpeedButton = page.getByRole("button", { name: "1×", exact: true });
  await normalSpeedButton.click();
  await expect(normalSpeedButton).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("tokenizer-speed"))).toBe("80");
  const speedButton = page.getByRole("button", { name: "2×", exact: true });
  await speedButton.click();
  await expect(speedButton).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("tokenizer-speed"))).toBe("38");

  await page.getByRole("button", { name: "Train tokenizer" }).click();
  await expect(stopButton).toBeVisible();
  await page.waitForTimeout(110);
  await stopButton.click();
  await expect(page.getByRole("button", { name: "Train tokenizer" })).toBeVisible();
  await expect(page.locator(".training-hint")).toHaveText("ready");
  await expect(page.locator(".merge-row").first()).toBeVisible();

  await page.locator("#train .textarea").fill("");
  await expect(page.locator(".status-pill")).toContainText("Awaiting corpus");
  await expect(page.locator(".vocab-count")).toContainText("100 / 100 tokens");
  expect(await page.locator("#train .textarea").inputValue()).toBe("");

  await page.reload({ waitUntil: "networkidle" });
  await expect(speedButton).toHaveAttribute("aria-pressed", "true");
});

test("encode/decode, exact round-trip messaging, keyboard shortcuts, copy, and long Unicode input work", async ({ page }) => {
  await openPlayground(page);
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#encode").scrollIntoViewIfNeeded();

  const input = page.locator("#encode .input-lg");
  await input.fill("  chai  ");
  await expect(page.locator(".roundtrip-pill")).toHaveText("round trip differs");
  await expect(page.locator(".decoded-pre")).toHaveText("chai");

  await input.fill("Chai aur GenAI!");
  await expect(page.locator(".roundtrip-pill")).toHaveText("lossless round trip");
  await expect(page.locator(".decoded-pre")).toHaveText("Chai aur GenAI!");

  await input.fill("chai is hot");
  const ids = await page.locator(".ids-pre").innerText();
  await page.locator("#encode .action-row .copy-btn").click();
  await expect(page.locator("#encode .action-row .copy-btn")).toContainText("Copied");
  const copiedIds = await page.evaluate(() => navigator.clipboard.readText());
  expect(copiedIds).toMatch(/^\d+( \d+)*$/);
  expect(ids.match(/\d+/g)?.join(" ")).toBe(copiedIds);

  await input.press("Enter");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(copiedIds);
  await input.press("Control+k");
  await expect(input).toHaveValue("");

  await page.getByRole("button", { name: "Fill example", exact: true }).click();
  await expect(input).toHaveValue("The quick brown fox jumps over the lazy dog! @2025");
  const decodedText = await page.locator(".decoded-pre").innerText();
  await page.getByRole("button", { name: "Copy decoded text" }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(decodedText);
  await page.getByRole("button", { name: "Replay animation", exact: true }).click();
  await expect(page.getByText("Token stream replayed")).toBeVisible();
  await page.getByRole("button", { name: "Clear", exact: true }).click();
  await expect(input).toHaveValue("");

  await page.evaluate(() => { window.__qaXss = false; });
  await input.fill('<img src=x onerror="window.__qaXss=true">');
  await page.waitForTimeout(100);
  expect(await page.locator("#encode img").count()).toBe(0);
  expect(await page.evaluate(() => window.__qaXss)).toBe(false);

  await input.fill("🧋 é — <tag>");
  await expect(page.locator(".roundtrip-pill")).toHaveText("round trip differs");
  await expect(page.locator(".token-stream .token-chip.token-unk").first()).toBeVisible();

  const start = Date.now();
  await input.fill("x".repeat(500));
  const fillDurationMs = Date.now() - start;
  expect(await page.locator(".token-chip").count()).toBeGreaterThanOrEqual(501);
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(390);

  await mkdir(LOGS, { recursive: true });
  await writeFile(
    join(LOGS, "RUN-2026-002-encode-edge-cases.json"),
    `${JSON.stringify({
      literalMarkupKeptInert: true,
      longInputCharacters: 500,
      inputFillWallTimeMs: fillDurationMs,
      longInputDocumentWidth: scrollWidth,
    }, null, 2)}\n`
  );
});

test("vocabulary search, filters, clipboard JSON, download and scroll-region focus work", async ({ page }) => {
  await openPlayground(page);
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#vocab").scrollIntoViewIfNeeded();

  const search = page.getByRole("searchbox", { name: "Search vocabulary" });
  await search.fill("__no_such_token__");
  await expect(page.locator(".vocab-empty")).toBeVisible();
  await search.fill("a");
  await expect(page.locator(".vocab-row").first()).toBeVisible();
  await search.fill("2");
  await expect(page.locator(".vocab-row").first()).toBeVisible();
  await search.fill("");

  await page.getByRole("button", { name: "Merged", exact: true }).click();
  await expect(page.getByRole("button", { name: "Merged", exact: true })).toHaveAttribute("aria-pressed", "true");
  expect(await page.locator(".vocab-merge").count()).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Special", exact: true }).click();
  expect(await page.locator(".vocab-special, .vocab-word-end").count()).toBeGreaterThanOrEqual(4);
  await page.getByRole("button", { name: "Chars", exact: true }).click();
  expect(await page.locator(".vocab-char").count()).toBeGreaterThan(0);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".vocab-list")).toHaveAttribute("aria-label", "Vocabulary entries");
  await page.locator(".vocab-list").focus();
  await expect(page.locator(".vocab-list")).toBeFocused();

  await page.getByRole("button", { name: "Copy JSON" }).click();
  const clipboardJson = await page.evaluate(() => navigator.clipboard.readText());
  const clipboardVocab = JSON.parse(clipboardJson);
  expect(clipboardVocab["<BOS>"]).toBe(2);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("vocab.json");
  const downloadedJson = JSON.parse(await readFile(await download.path(), "utf8"));
  expect(downloadedJson["<EOS>"]).toBe(3);

  await page.locator("#train").scrollIntoViewIfNeeded();
  const mergeFeed = page.locator(".merge-feed");
  await mergeFeed.focus();
  await expect(mergeFeed).toBeFocused();
});

test("axe WCAG 2.2 AA audits pass on mobile and desktop in light and dark themes", async ({ page }) => {
  await openPlayground(page);
  const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
  const configurations = [
    { name: "mobileLight", viewport: { width: 390, height: 844 }, theme: "light" },
    { name: "mobileDark", viewport: { width: 390, height: 844 }, theme: "dark" },
    { name: "desktopDark", viewport: { width: 1366, height: 900 }, theme: "dark" },
    { name: "desktopLight", viewport: { width: 1366, height: 900 }, theme: "light" },
  ];
  const audits = {};
  let currentTheme = await page.locator("html").getAttribute("data-theme");

  for (const configuration of configurations) {
    await page.setViewportSize(configuration.viewport);
    if (currentTheme !== configuration.theme) {
      await page.locator(".theme-toggle").click();
      currentTheme = configuration.theme;
    }
    await expect(page.locator("html")).toHaveAttribute("data-theme", configuration.theme);
    await revealWholePage(page);
    const result = await new AxeBuilder({ page }).withTags(tags).analyze();
    expect(
      result.violations,
      `${configuration.name}: ${JSON.stringify(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`
    ).toEqual([]);
    audits[configuration.name] = {
      viewport: `${configuration.viewport.width}×${configuration.viewport.height}`,
      theme: configuration.theme,
      violations: result.violations.length,
      passes: result.passes.length,
      incomplete: result.incomplete.length,
      incompleteRuleIds: [...new Set(result.incomplete.map((item) => item.id))],
      incompleteNodeCount: result.incomplete.reduce((count, item) => count + item.nodes.length, 0),
      incompleteTargets: result.incomplete
        .flatMap((item) => item.nodes.map((node) => ({ rule: item.id, target: node.target })))
        .slice(0, 12),
    };
  }

  await mkdir(LOGS, { recursive: true });
  await writeFile(
    join(LOGS, "RUN-2026-002-accessibility.json"),
    `${JSON.stringify({ tool: "axe-core", wcagTags: tags, audits }, null, 2)}\n`
  );
});

test("production load survives delayed assets and offline client-side interaction", async ({ page }) => {
  const failures = [];
  const pageErrors = [];
  page.on("requestfailed", (request) => failures.push({ url: request.url(), error: request.failure()?.errorText }));
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") pageErrors.push(message.text());
  });

  await page.addInitScript(() => {
    const metrics = { lcp: 0, cls: 0, longTasks: [], eventDurations: [] };
    window.__qaMetrics = metrics;
    if (typeof PerformanceObserver === "undefined") return;
    const observe = (type, callback, options = {}) => {
      try {
        const observer = new PerformanceObserver((list) => callback(list.getEntries()));
        observer.observe({ type, buffered: true, ...options });
      } catch {
        // Some headless Chromium builds do not expose every optional entry type.
      }
    };
    observe("largest-contentful-paint", (entries) => {
      metrics.lcp = entries.at(-1)?.startTime ?? metrics.lcp;
    });
    observe("layout-shift", (entries) => {
      for (const entry of entries) {
        if (!entry.hadRecentInput) metrics.cls += entry.value;
      }
    });
    observe("longtask", (entries) => {
      metrics.longTasks.push(...entries.map((entry) => entry.duration));
    });
    observe("event", (entries) => {
      metrics.eventDurations.push(...entries.map((entry) => ({ name: entry.name, duration: entry.duration })));
    }, { durationThreshold: 16 });
  });
  await page.route("**/_next/static/**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 120));
    await route.continue();
  });

  await openPlayground(page);
  const input = page.locator("#encode .input-lg");
  await input.fill("slow assets, fast local encoding");
  await expect(page.locator(".decoded-pre")).toHaveText("slow assets, fast local encoding");

  await page.context().setOffline(true);
  await input.fill("offline tokenizer");
  await expect(page.locator(".decoded-pre")).toHaveText("offline tokenizer");
  await page.context().setOffline(false);
  await page.waitForTimeout(150);

  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    return {
      ttfbMs: navigation ? Math.round(navigation.responseStart) : null,
      domContentLoadedMs: navigation ? Math.round(navigation.domContentLoadedEventEnd) : null,
      loadEventMs: navigation ? Math.round(navigation.loadEventEnd) : null,
      lcpMs: Math.round(window.__qaMetrics?.lcp ?? 0),
      cls: Number((window.__qaMetrics?.cls ?? 0).toFixed(4)),
      longTasksOver50Ms: (window.__qaMetrics?.longTasks ?? []).filter((duration) => duration > 50),
      eventTimingEntries: window.__qaMetrics?.eventDurations ?? [],
      resourceCount: resources.length,
      encodedResourceBytes: resources.reduce((sum, item) => sum + (item.encodedBodySize || 0), 0),
      decodedResourceBytes: resources.reduce((sum, item) => sum + (item.decodedBodySize || 0), 0),
      jsResourceCount: resources.filter((item) => item.name.endsWith(".js")).length,
    };
  });

  expect(metrics.domContentLoadedMs).toBeGreaterThan(0);
  expect(metrics.cls).toBeLessThan(0.1);
  expect(failures).toEqual([]);
  expect(pageErrors).toEqual([]);

  await mkdir(LOGS, { recursive: true });
  await writeFile(
    join(LOGS, "RUN-2026-002-performance.json"),
    `${JSON.stringify({ context: "local production build; 120ms delay on Next static assets", metrics, failedRequests: failures, pageErrors }, null, 2)}\n`
  );
});
