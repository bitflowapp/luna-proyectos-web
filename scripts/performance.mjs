import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
process.env.TEMP = process.env.TMP = resolve('.tmp');
await mkdir('artifacts/performance', { recursive: true });
const browser = await chromium.launch({ args: ['--remote-debugging-port=9227'] });
try {
  const summary = [];
  for (const desktop of [false, true]) {
    const options = { port: 9227, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], ...(desktop ? { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1440, height: 1000, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 } } : {}) };
    const result = await lighthouse(process.env.PERF_URL || 'http://127.0.0.1:4173/luna-proyectos-web/', options);
    const name = desktop ? 'desktop' : 'mobile';
    await writeFile(`artifacts/performance/${name}.json`, result.report);
    const item = { device: name, scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, value.score * 100])), metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'total-byte-weight'].map(key => [key, result.lhr.audits[key].displayValue])), opportunities: Object.entries(result.lhr.audits).filter(([, value]) => value.score !== null && value.score < .9 && value.details?.type === 'opportunity').map(([key, value]) => ({ key, display: value.displayValue })) };
    summary.push(item);
    console.log(JSON.stringify(item));
  }
  await writeFile('artifacts/performance/SUMMARY.json', JSON.stringify(summary, null, 2));
} finally { await browser.close(); }
