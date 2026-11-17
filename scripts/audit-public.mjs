import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Audita somente as páginas públicas, sem iniciar o servidor local.
const date = new Date().toISOString().slice(0, 10);
const output = join("docs", "audits", `${date}-vercel`);
const pages = [
  { name: "home", url: "https://lacrei-challenge-three.vercel.app/" },
  { name: "medicos", url: "https://lacrei-challenge-three.vercel.app/medicos" },
];
const results = [];
await mkdir(output, { recursive: true });

for (const page of pages) {
  for (let run = 1; run <= 3; run++) {
    console.log(`Lighthouse mobile: ${page.url}, execução ${run}/3`);
    // Cada execução usa um perfil novo, sem reaproveitar o cache do navegador.
    const chrome = await launch({
      chromePath: process.env.CHROME_PATH,
      chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
    });
    try {
      const result = await lighthouse(page.url, {
        port: chrome.port,
        output: ["html", "json"],
        onlyCategories: ["performance", "accessibility"],
        logLevel: "error",
      });
      if (!result || result.lhr.runtimeError) {
        throw new Error(result?.lhr.runtimeError?.message ?? "Auditoria sem resultado");
      }
      const prefix = `${page.name}-${run}`;
      await writeFile(join(output, `${prefix}.html`), result.report[0]);
      await writeFile(join(output, `${prefix}.json`), result.report[1]);
      const { lhr } = result;
      const metrics = {
        page: page.name, run, url: page.url,
        finalUrl: lhr.finalDisplayedUrl ?? lhr.finalUrl,
        fetchTime: lhr.fetchTime,
        lighthouseVersion: lhr.lighthouseVersion,
        browser: lhr.environment.hostUserAgent,
        formFactor: lhr.configSettings.formFactor,
        throttlingMethod: lhr.configSettings.throttlingMethod,
        performance: Math.round(lhr.categories.performance.score * 100),
        accessibility: Math.round(lhr.categories.accessibility.score * 100),
        contrast: lhr.audits["color-contrast"].score,
        lcpMs: lhr.audits["largest-contentful-paint"].numericValue,
        tbtMs: lhr.audits["total-blocking-time"].numericValue,
        cls: lhr.audits["cumulative-layout-shift"].numericValue,
        warnings: lhr.runWarnings,
      };
      results.push(metrics);
      console.log(JSON.stringify(metrics));
    } finally {
      await chrome.kill();
    }
  }
}

await writeFile(join(output, "summary.json"), JSON.stringify(results, null, 2));
console.log(`Relatórios salvos em ${output}`);