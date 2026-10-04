// Teste de navegador do seletor de estilo de arte: node tools/e2e/estilo.mjs [pasta-de-prints]  (precisa de `npx vite preview --port 4173`)
import { chromium } from 'playwright-core';
const OUT = process.argv[2] ?? '.tmp';
const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const errors = [];
const page = await ctx.newPage();
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await page.goto('http://localhost:4173/');
await page.waitForSelector('[data-act="new"]');
// Configurações: tela de Herança > aba de opções
await page.click('[data-act="meta"]');
await page.click('[data-act="mtab"][data-id="opcoes"]');
await page.waitForSelector('[data-act="estilo"]');
for (const est of ['manhwa', 'tinta', 'pixel']) {
  await page.click(`[data-act="estilo"][data-id="${est}"]`);
  await page.waitForTimeout(250);
  const atual = await page.evaluate(() => document.documentElement.getAttribute('data-estilo'));
  if (atual !== est) errors.push(`estilo não aplicado: ${est} → ${atual}`);
  await page.screenshot({ path: `${OUT}/estilo-${est}-opcoes.png`, clip: { x: 0, y: 0, width: 390, height: 380 } });
}
// Cada estilo: nova vida, tela de jogo, status, duelo
for (const est of ['manhwa', 'tinta', 'pixel']) {
  await page.click(`[data-act="estilo"][data-id="${est}"]`);
  await page.click('[data-act="home"]');
  await page.click('[data-act="new"]');
  await page.waitForSelector('[data-act="start"]');
  await page.screenshot({ path: `${OUT}/estilo-${est}-criacao.png` });
  await page.click('[data-act="start"]');
  await page.waitForSelector('[data-act="choose"], [data-act="skip"]', { timeout: 15000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/estilo-${est}-jogo.png` });
  for (const aba of ['status', 'itens']) {
    const b = await page.$(`[data-act="tab"][data-id="${aba}"]`);
    if (b) { await b.click(); await page.waitForTimeout(250); await page.screenshot({ path: `${OUT}/estilo-${est}-${aba}.png` }); }
  }
  // volta ao menu e apaga a vida para a próxima rodada
  await page.evaluate(() => { localStorage.removeItem('dao-mil-vidas-save-v1'); });
  await page.evaluate((e) => { const s = { meta: undefined, run: null, settings: { estilo: e } }; void s; }, est);
  await page.goto('http://localhost:4173/');
  await page.waitForSelector('[data-act="new"]');
  await page.click('[data-act="meta"]');
  await page.click('[data-act="mtab"][data-id="opcoes"]');
}
// Duelo em cada estilo (parâmetro de depuração)
for (const est of ['manhwa', 'tinta', 'pixel']) {
  await page.goto('http://localhost:4173/');
  await page.waitForSelector('[data-act="new"]');
  await page.click('[data-act="meta"]');
  await page.click('[data-act="mtab"][data-id="opcoes"]');
  await page.click(`[data-act="estilo"][data-id="${est}"]`);
  await page.goto('http://localhost:4173/?duelo=tigre&trilha=espada&reino=4&cenario=montanha');
  await page.waitForSelector('.duel-stage');
  await page.waitForTimeout(3600);
  await page.screenshot({ path: `${OUT}/estilo-${est}-duelo.png`, clip: { x: 0, y: 0, width: 390, height: 340 } });
}
console.log('ERROS:', errors.length ? errors : 'nenhum');
await browser.close();
