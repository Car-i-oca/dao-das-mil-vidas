// Prints do pixel art no app: node tools/e2e/pixel.mjs [pasta] (precisa do preview v2 na 4174)
import { chromium } from 'playwright-core';
const OUT = process.argv[2] ?? '.tmp/pixel';
import { mkdirSync } from 'node:fs'; mkdirSync(OUT, { recursive: true });
const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const erros = [];
const page = await ctx.newPage();
page.on('pageerror', (e) => erros.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') erros.push('console: ' + m.text()); });
await page.goto('http://localhost:4174/');
await page.waitForSelector('[data-act="new"]');
await page.click('[data-act="new"]'); await page.waitForSelector('[data-act="start"]'); await page.screenshot({ path: `${OUT}/criacao.png` });
await page.click('[data-act="start"]');
const entendi = await page.$('[data-act="intro"]'); if (entendi) await entendi.click();
let n = 0;
for (let i = 0; i < 80 && n < 14; i++) {
  await page.waitForTimeout(40);
  const skip = await page.$('.story[data-act="skip"]'); if (skip) await skip.click().catch(() => {});
  const c = await page.$('[data-act="choose"]:not([disabled])');
  if (c) { if ([1, 6, 12].includes(n)) await page.screenshot({ path: `${OUT}/cena-${n}.png` }); const b = await page.$$('[data-act="choose"]:not([disabled])'); await b[0].click(); n++; continue; }
  const nx = await page.$('[data-act="next"]'); if (nx) await nx.click();
}
for (const aba of ['status', 'mochila', 'mundo']) { const b = await page.$(`[data-act="tab"][data-id="${aba}"]`); if (b) { await b.click(); await page.waitForTimeout(250); await page.screenshot({ path: `${OUT}/${aba}.png`, fullPage: true }); } }
for (const [foe, tr, cen] of [['cultivador', 'espada', 'montanha'], ['demonio', 'alma', 'vilarejo']]) {
  const p2 = await ctx.newPage();
  await p2.goto(`http://localhost:4174/?duelo=${foe}&trilha=${tr}&reino=3&cenario=${cen}`);
  for (const t of [1800, 1500, 1200, 1500]) { await p2.waitForTimeout(t); await p2.screenshot({ path: `${OUT}/duelo-${foe}-${t}-${Date.now() % 100000}.png` }); }
  await p2.close();
}
console.log('ERROS:', erros.length ? erros : 'nenhum');
await browser.close();
