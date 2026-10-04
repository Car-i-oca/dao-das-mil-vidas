// Prints da galeria de arte por estilo: node tools/e2e/arte.mjs <estilo> [secoes,separadas,por,virgula] [pasta]  (precisa de `npx vite preview --port 4173`)
import { chromium } from 'playwright-core';
const estilo = process.argv[2] ?? 'manhwa';
const secs = (process.argv[3] ?? 'itens,tecnicas,trilhas,reinos,cenarios,finais,retratos,lutadores').split(',');
const OUT = process.argv[4] ?? '.tmp';
const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const errors = [];
for (const sec of secs) {
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`${sec}: ${e.message}`));
  await page.goto(`http://localhost:4173/?arte=${estilo}&sec=${sec}`);
  await page.waitForSelector('h2');
  await page.waitForTimeout(300);
  const Y = Number(process.env.Y ?? -1);
  await page.screenshot(Y < 0 ? { path: `${OUT}/arte-${estilo}-${sec}.png`, fullPage: true } : { path: `${OUT}/arte-${estilo}-${sec}.png`, fullPage: true, clip: { x: 0, y: Y, width: 390, height: Number(process.env.H ?? 800) } });
  await page.close();
}
console.log('ERROS:', errors.length ? errors : 'nenhum');
await browser.close();
