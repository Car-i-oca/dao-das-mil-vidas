// Teste de navegador da versão v2: node tools/e2e/v2.mjs [pasta-de-prints]  (precisa de `npx vite preview --mode v2 --outDir dist-v2 --port 4174`)
import { chromium } from 'playwright-core';
const OUT = process.argv[2] ?? '.tmp';
const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const errors = [];
const page = await ctx.newPage();
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await page.goto('http://localhost:4174/');
await page.waitForSelector('[data-act="new"]');
await page.screenshot({ path: `${OUT}/v2-home.png` });
await page.click('[data-act="new"]');
await page.waitForSelector('[data-act="start"]');
await page.click('[data-act="start"]');
await page.waitForSelector('[data-act="skip"]');
const entendi = await page.$('[data-act="intro"]'); if (entendi) await entendi.click();
let passos = 0, vistos = 0;
for (let i = 0; i < 90 && passos < 70; i++) {
  await page.waitForTimeout(40);
  const skip = await page.$('.story[data-act="skip"]');
  if (skip) { await skip.click().catch(() => {}); }
  await page.waitForTimeout(40);
  const choose = await page.$('[data-act="choose"]:not([disabled])');
  if (choose) {
    if (vistos < 3 && passos >= 6 + vistos * 12) { await page.screenshot({ path: `${OUT}/v2-cena-${vistos}.png` }); vistos++; }
    const botoes = await page.$$('[data-act="choose"]:not([disabled])');
    await botoes[Math.floor(Math.random() * botoes.length)].click();
    passos++;
    continue;
  }
  const next = await page.$('[data-act="next"]');
  if (next) { await next.click(); continue; }
  const toEnd = await page.$('[data-act="toEnd"]');
  if (toEnd) { await toEnd.click(); await page.waitForTimeout(300); await page.screenshot({ path: `${OUT}/v2-final.png`, fullPage: true }); break; }
}
const aba = await page.$('[data-act="tab"][data-id="mundo"]');
if (aba) { await aba.click(); await page.waitForTimeout(300); await page.screenshot({ path: `${OUT}/v2-mundo.png`, fullPage: true }); }
console.log('cenas jogadas:', passos, '· ERROS:', errors.length ? errors : 'nenhum');
await browser.close();
