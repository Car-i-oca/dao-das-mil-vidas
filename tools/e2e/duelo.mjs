// Teste de navegador dos duelos: node tools/e2e/duelo.mjs [pasta-de-prints]  (precisa de `npx vite preview --port 4173`)
import { chromium } from 'playwright-core';
const OUT = process.argv[2] ?? '.tmp';
const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const errors = [];
const foes = ['bandido', 'assassino', 'cultivador', 'monge', 'demonio', 'espectro', 'lobo', 'serpente', 'golem', 'tigre', 'dragao', 'raio'];
const paths = ['espada', 'corpo', 'sopro', 'alquimia', 'alma', 'formacoes', 'budista', 'venenos', 'bestas', 'demoniaca', '', 'espada'];
for (let i = 0; i < foes.length; i++) {
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(foes[i] + ': ' + e.message));
  await page.goto(`http://localhost:4173/?duelo=${foes[i]}&trilha=${paths[i]}&reino=${i % 9}${i % 4 === 3 ? '&derrota=1&desfecho=fuga' : ''}`);
  await page.waitForSelector('.duel-stage');
  await page.waitForTimeout(3800);
  await page.screenshot({ path: `${OUT}/duelo-${foes[i]}.png`, clip: { x: 0, y: 0, width: 390, height: 330 } });
  await page.close();
}
console.log('ERROS:', errors.length ? errors : 'nenhum');
await browser.close();
