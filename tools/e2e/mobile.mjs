// Teste de overflow em telas pequenas: node tools/e2e/mobile.mjs [pasta-de-prints] [url]
// Precisa de `npm run build:v2` e `npx vite preview --mode v2 --outDir dist-v2 --port 4174`.
import { chromium } from 'playwright-core';
const OUT = process.argv[2] ?? '.tmp/mobile';
const URL = process.argv[3] ?? 'http://localhost:4174/';
const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
import { mkdirSync } from 'node:fs';
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const TAMANHOS = [
  { w: 320, h: 640, zoom: 1, nome: '320' }, { w: 360, h: 740, zoom: 1, nome: '360' }, { w: 390, h: 844, zoom: 1, nome: '390' }, { w: 412, h: 915, zoom: 1, nome: '412' },
  { w: 390, h: 844, zoom: 1.3, nome: '390z130' }, { w: 320, h: 640, zoom: 1.3, nome: '320z130' }, { w: 844, h: 390, zoom: 1, nome: 'paisagem' },
];
const problemas = [];

async function medir(page, rotulo) {
  const achados = await page.evaluate(() => {
    const W = window.innerWidth, out = [];
    const doc = document.scrollingElement;
    if (doc.scrollWidth > W + 1) out.push(`página com rolagem horizontal (${doc.scrollWidth} > ${W})`);
    const nome = (el) => el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : '') + ' "' + (el.textContent || '').trim().slice(0, 30) + '"';
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (el.closest('svg') && el.tagName.toLowerCase() !== 'svg') continue;
      if (r.right > W + 1 || r.left < -1) { out.push(`fora da tela: ${nome(el)} [${Math.round(r.left)}..${Math.round(r.right)}]`); continue; }
      if (el.scrollWidth > el.clientWidth + 2 && ['visible'].includes(cs.overflowX) && el.children.length === 0 && el.textContent.trim()) out.push(`texto transborda o quadro: ${nome(el)} (${el.scrollWidth} > ${el.clientWidth})`);
      if ((el.tagName === 'BUTTON') && r.height < 43.5 && !el.closest('.tabs')) out.push(`botão baixo (${Math.round(r.height)}px): ${nome(el)}`);
    }
    return [...new Set(out)].slice(0, 12);
  });
  for (const a of achados) problemas.push(`${rotulo}: ${a}`);
}

for (const t of TAMANHOS) {
  const ctx = await browser.newContext({ viewport: { width: t.w, height: t.h }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const erros = [];
  page.on('pageerror', (e) => erros.push(e.message));
  await page.goto(URL);
  await page.addStyleTag({ content: `html{zoom:${t.zoom}}` });
  const shot = async (n, full = false) => { await page.waitForTimeout(150); await medir(page, `${t.nome}/${n}`); await page.screenshot({ path: `${OUT}/${t.nome}-${n}.png`, fullPage: full }); };
  await page.waitForSelector('[data-act="new"]');
  await shot('inicio');
  const aj = await page.$('[data-act="estilomenu"]'); if (aj) { await aj.click(); await shot('estilos'); await page.goBack().catch(() => {}); if (!(await page.$('[data-act="new"]'))) await page.goto(URL); await page.addStyleTag({ content: `html{zoom:${t.zoom}}` }); }
  const meta = await page.$('[data-act="meta"]'); if (meta) { await meta.click(); await shot('heranca', true); const home = await page.$('[data-act="home"]'); if (home) await home.click(); }
  await page.waitForSelector('[data-act="new"]');
  await page.click('[data-act="new"]');
  await page.waitForSelector('[data-act="start"]');
  await shot('criacao', true);
  await page.click('[data-act="start"]');
  await page.waitForSelector('[data-act="skip"]', { timeout: 5000 }).catch(() => {});
  const entendi = await page.$('[data-act="intro"]'); if (entendi) await entendi.click();
  let passos = 0, resultado = false, duelo = false;
  for (let i = 0; i < 140 && passos < 40; i++) {
    await page.waitForTimeout(30);
    const skip = await page.$('.story[data-act="skip"]'); if (skip) await skip.click().catch(() => {});
    const choose = await page.$('[data-act="choose"]:not([disabled])');
    if (choose) {
      if (passos === 2) await shot('evento', true);
      if (passos === 20) await shot('evento-meio', true);
      const botoes = await page.$$('[data-act="choose"]:not([disabled])');
      await botoes[passos % botoes.length].click(); passos++; continue;
    }
    if (await page.$('.duel-stage')) { if (!duelo) { duelo = true; await shot('duelo'); } await page.waitForTimeout(400); continue; }
    const next = await page.$('[data-act="next"]');
    if (next) { if (!resultado) { resultado = true; await shot('resultado', true); } await next.click(); continue; }
    const toEnd = await page.$('[data-act="toEnd"]'); if (toEnd) { await toEnd.click(); await page.waitForTimeout(300); await shot('final', true); break; }
  }
  for (const aba of ['status', 'mundo', 'mochila', 'diario']) {
    const b = await page.$(`[data-act="tab"][data-id="${aba}"]`);
    if (b) { await b.click(); await shot(aba, true); }
  }
  if (erros.length) problemas.push(`${t.nome}: erros de JS: ${erros.join(' | ')}`);
  await ctx.close();
}
await browser.close();
console.log(problemas.length ? problemas.join('\n') : 'Nenhum transbordo encontrado.');
console.log(`\n${problemas.length} problema(s). Prints em ${OUT}`);
process.exit(problemas.length ? 1 : 0);
