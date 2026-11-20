/**
 * Alvos de toque: todo botão visível precisa de 44 × 44 px de área tocável (o próprio tamanho ou a área ampliada
 * por fora, conferida com elementFromPoint a 21 px do centro). Passa pelo início, Legado, criação e abas do jogo.
 *   npm run build && npm run e2e:toque           (360 × 640, os dois modos)
 *   W=320 H=568 MODO=xianxia npm run e2e:toque
 * Sobe o `vite preview` sozinho se a porta 4173 estiver livre. Sai com código 1 se achar alvo pequeno.
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import net from 'node:net';

const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const MODOS = process.env.MODO ? [process.env.MODO] : ['murim', 'xianxia'];
const VIEWPORT = { width: Number(process.env.W ?? 360), height: Number(process.env.H ?? 640) };
const URL = 'http://localhost:4173/';

const portaAberta = () => new Promise((ok) => {
  const s = net.connect(4173, '127.0.0.1');
  s.on('connect', () => { s.destroy(); ok(true); });
  s.on('error', () => ok(false));
});
let servidor = null;
if (!(await portaAberta())) {
  servidor = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', '4173', '--strictPort'], { stdio: 'ignore' });
  for (let i = 0; i < 40 && !(await portaAberta()); i++) await new Promise((r) => setTimeout(r, 250));
}

/** Roda na página: lista os alvos visíveis com área tocável menor que 44 px. */
const alvosPequenos = () => {
  const out = [];
  const acerta = (el, x, y) => { const h = document.elementFromPoint(x, y); return !!h && (h === el || el.contains(h)); };
  const janela = document.querySelector('.inventory-modal, .shop-modal');
  for (const el of document.querySelectorAll('button, [data-act], a, summary, input, select')) {
    if (janela && el.closest('.adventure-layout') && !janela.contains(el)) continue; // atrás da janela aberta
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (!r.width || !r.height || cs.visibility === 'hidden' || cs.pointerEvents === 'none') continue;
    if (el.classList.contains('story-panel') || r.bottom < 0 || r.top > innerHeight) continue;
    if (r.width >= 44 && r.height >= 44) continue;
    // Parcialmente escondido por um painel rolado: o jogador rola até ele antes de tocar.
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const painel = el.parentElement?.closest('.story-panel, .choice-panel, .screen, .inventory-list');
    if (painel) { const pr = painel.getBoundingClientRect(); if (cy - 21 < pr.top || cy + 21 > pr.bottom) continue; }
    if (!acerta(el, cx, cy)) continue; // coberto por uma janela (inventário, loja): não está tocável agora
    const alto = r.height >= 44 || (acerta(el, cx, cy - 21) && acerta(el, cx, cy + 21));
    const largo = r.width >= 44 || (acerta(el, cx - 21, cy) && acerta(el, cx + 21, cy));
    if (!alto || !largo) out.push(`${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]}[${el.dataset.act ?? ''}] ${Math.round(r.width)}×${Math.round(r.height)} «${(el.textContent ?? '').trim().slice(0, 24)}»`);
  }
  return [...new Set(out)];
};

const browser = await chromium.launch({ headless: true, ...(existsSync(EDGE) ? { executablePath: EDGE } : {}) });
const falhas = [];
try {
  for (const modo of MODOS) {
    const page = await browser.newPage({ viewport: VIEWPORT, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
    page.on('pageerror', (e) => falhas.push(`[${modo}] erro de JavaScript: ${e.message}`));
    await page.goto(URL);
    await page.evaluate(() => { try { localStorage.clear(); } catch { /* sem armazenamento */ } });
    await page.reload();
    const toca = async (sel) => { const el = await page.$(sel); if (el) await el.click(); return !!el; };
    const confere = async (tela) => {
      await page.waitForTimeout(300);
      for (const f of await page.evaluate(alvosPequenos)) falhas.push(`[${modo}] ${tela}: ${f}`);
    };
    await toca('[data-act="start-audio"]'); await confere('início');
    await toca('[data-act="meta"]');
    for (const t of ['heranca', 'conquistas', 'codice', 'historico', 'opcoes']) if (await toca(`[data-act="mtab"][data-id="${t}"]`)) await confere(`Legado/${t}`);
    await toca('[data-act="home"]');
    await toca('[data-act="new"]'); await confere('modo');
    await toca(`[data-act="modo"][data-id="${modo}"]`); await confere('criação');
    await toca('[data-act="start"]');
    await toca('#story-panel'); await confere('aventura');
    for (const t of ['equipamentos', 'inventario', 'diario']) if (await toca(`[data-act="tab"][data-id="${t}"]`)) await confere(t);
    await page.close();
  }
} finally {
  await browser.close();
  servidor?.kill();
}
if (falhas.length) { console.error(`✘ ${falhas.length} alvo(s) de toque pequenos:\n  ${falhas.join('\n  ')}`); process.exit(1); }
console.log(`✓ alvos de toque: nada abaixo de 44 px (${MODOS.join(', ')}, ${VIEWPORT.width}×${VIEWPORT.height})`);
