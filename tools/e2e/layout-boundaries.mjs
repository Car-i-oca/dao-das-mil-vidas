/**
 * Teste de layout nos dois modos: a tela de escolha de modo e a tela de jogo, em quatro larguras e com fonte a 130%.
 *   npm run build && npm run e2e:layout            (os dois modos)
 *   MODO=xianxia npm run e2e:layout                (um modo)
 * Sobe o `vite preview` sozinho se a porta 4173 estiver livre. Salva prints em docs/prints-layout/.
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import net from 'node:net';

const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const MODOS = process.env.MODO ? [process.env.MODO] : ['murim', 'xianxia'];
const VIEWPORTS = [{ width: 320, height: 568 }, { width: 360, height: 640 }, { width: 390, height: 844 }, { width: 430, height: 932 }];
const FONTE = process.env.FONTE ?? '130%';
const URL = 'http://localhost:4173/';
mkdirSync('docs/prints-layout', { recursive: true });

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

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const errors = [];
const inside = (box, width, height) => box && box.left >= -1 && box.right <= width + 1 && box.top >= -1 && box.bottom <= height + 1;

/** Procura elementos que escapam da tela ou do próprio quadro. */
const transbordos = () => {
  const out = [];
  const vw = document.documentElement.clientWidth;
  if (document.documentElement.scrollWidth > vw + 1) out.push(`rolagem horizontal (${document.documentElement.scrollWidth} > ${vw})`);
  for (const el of document.querySelectorAll('.modo-card, .modo-texto, .modo-texto *, .choice, .choice-copy, .story-text, .hud .name, .hud .sub, .kv .v, h1, h2, .btn')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (r.right > vw + 1 || r.left < -1) out.push(`${el.className || el.tagName} fora da tela (${Math.round(r.left)}..${Math.round(r.right)} de ${vw})`);
    if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== 'auto' && getComputedStyle(el).overflowX !== 'scroll' && el.clientWidth > 0) out.push(`${el.className || el.tagName} com texto cortado (${el.scrollWidth} > ${el.clientWidth})`);
  }
  return [...new Set(out)];
};

try {
  for (const modo of MODOS) {
    const page = await browser.newPage({ viewport: VIEWPORTS[2], isMobile: true, hasTouch: true });
    page.on('pageerror', (error) => errors.push(`[${modo}] erro de JavaScript: ${error.message}`));
    await page.goto(URL);
    await page.evaluate(() => { try { localStorage.clear(); } catch { /* sem armazenamento */ } });
    await page.reload();
    if (FONTE !== '100%') await page.addStyleTag({ content: `html{font-size:${FONTE} !important}` });
    await page.click('[data-act="start-audio"]');
    await page.click('[data-act="new"]');
    await page.waitForSelector('.modo-card');
    // tela de escolha de modo nos quatro tamanhos
    for (const vp of VIEWPORTS) {
      await page.setViewportSize(vp);
      await page.waitForTimeout(80);
      const problemas = await page.evaluate(transbordos);
      if (problemas.length) errors.push(`[${modo}] escolha de modo em ${vp.width}x${vp.height}: ${problemas.join('; ')}`);
      if (modo === MODOS[0]) await page.screenshot({ path: `docs/prints-layout/modo-${vp.width}x${vp.height}.png` });
    }
    await page.setViewportSize(VIEWPORTS[2]);
    await page.click(`[data-act="modo"][data-id="${modo}"]`);
    await page.waitForSelector('[data-act="start"]');
    await page.click('[data-act="start"]');
    await page.waitForSelector('.adventure-layout');
    for (const vp of VIEWPORTS) {
      await page.setViewportSize(vp);
      await page.waitForTimeout(100);
      const result = await page.evaluate(() => {
        const rect = (selector) => {
          const element = document.querySelector(selector);
          if (!element) return null;
          const { top, right, bottom, left, width, height } = element.getBoundingClientRect();
          return { top, right, bottom, left, width, height };
        };
        return {
          doc: { width: document.documentElement.scrollWidth },
          hud: rect('.hud'), journal: rect('.journal-row'), art: rect('.adventure-art'), story: rect('.story-panel'),
          choices: rect('.choice-panel'), tabs: rect('.tabs'),
          storyOverflow: getComputedStyle(document.querySelector('.story-panel')).overflowY,
          choicesOverflow: getComputedStyle(document.querySelector('.choice-panel')).overflowY,
        };
      });
      const ordered = result.hud && result.journal && result.art && result.story && result.choices
        && result.hud.bottom <= result.journal.top + 1 && result.journal.bottom <= result.art.top + 1
        && result.art.bottom <= result.story.top + 1 && result.story.bottom <= result.choices.top + 1
        && result.choices.bottom <= result.tabs.top + 1;
      if (result.doc.width > vp.width + 1 || !inside(result.art, vp.width, vp.height) || !inside(result.story, vp.width, vp.height)
        || !inside(result.choices, vp.width, vp.height) || !inside(result.tabs, vp.width, vp.height) || !ordered
        || result.storyOverflow !== 'auto' || result.choicesOverflow !== 'auto') {
        errors.push(`[${modo}] layout fora dos limites em ${vp.width}x${vp.height}: ${JSON.stringify(result)}`);
      }
    }
    // joga algumas cenas e procura transbordos e erros em cada uma
    await page.setViewportSize(VIEWPORTS[0]);
    let jogadas = 0;
    for (let i = 0; i < 40 && jogadas < 24; i++) {
      if (await page.$('.dice-overlay')) {
        // espera o dado assentar e fecha
        await page.waitForTimeout(1800);
        const fechar = await page.$('.dice-overlay [data-act="roll-close"]');
        if (fechar) await fechar.click({ timeout: 4000 }).catch(() => {});
        else await page.keyboard.press('Escape');
        await page.waitForTimeout(150);
        continue;
      }
      const escolha = await page.$('.choice[data-act="choose"]');
      const seguir = await page.$('button[data-act="next"]');
      if (await page.$('#hint')) await page.click('#story-panel').catch(() => {});
      if (escolha) await escolha.click({ timeout: 4000 }).catch(() => {});
      else if (seguir) await seguir.click({ timeout: 4000 }).catch(() => {});
      else { await page.waitForTimeout(200); continue; }
      jogadas++;
      await page.waitForTimeout(150);
      const problemas = await page.evaluate(transbordos);
      if (problemas.length) errors.push(`[${modo}] cena ${jogadas} em 320px: ${problemas.join('; ')}`);
      if (jogadas === 7) await page.screenshot({ path: `docs/prints-layout/jogo-${modo}-320.png` });
      if (await page.$('[data-act="toEnd"]')) break;
    }
    if (jogadas < 8) errors.push(`[${modo}] só ${jogadas} jogadas: o jogo travou?`);
    await page.close();
  }
  if (errors.length) throw new Error(errors.join('\n'));
  console.log(`Layout ok nos modos ${MODOS.join(' e ')}: escolha de modo e jogo em 320, 360, 390 e 430 px, com fonte a 130%.`);
} finally {
  await browser.close();
  servidor?.kill();
}
