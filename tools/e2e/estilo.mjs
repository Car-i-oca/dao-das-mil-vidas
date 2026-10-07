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
async function openHome() {
  await page.goto('http://localhost:4173/');
  await page.click('[data-act="start-audio"]');
  await page.waitForSelector('[data-act="new"]');
}
await page.goto('http://localhost:4173/');
await page.waitForSelector('[data-act="start-audio"]');
const gateState = await page.evaluate(() => ({
  text: document.querySelector('.audio-gate')?.textContent ?? '',
  zIndex: getComputedStyle(document.querySelector('.audio-gate')).zIndex,
  gameRendered: !!document.querySelector('.game-frame, .story-text'),
}));
if (!gateState.text.includes('Toque para Iniciar o Cultivo') || gateState.zIndex !== '9999' || gateState.gameRendered) errors.push(`tela inicial de áudio inválida: ${JSON.stringify(gateState)}`);
await page.click('[data-act="start-audio"]');
await page.waitForFunction(() => {
  return !!document.querySelector('[data-act="new"]') && document.documentElement.dataset.audioReady === 'true';
});
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
// Cada estilo: nova vida, tela fixa de aventura e abas do jogo
for (const est of ['manhwa', 'tinta', 'pixel']) {
  await page.click(`[data-act="estilo"][data-id="${est}"]`);
  await page.click('[data-act="home"]');
  await page.click('[data-act="new"]');
  await page.waitForSelector('[data-act="start"]');
  await page.screenshot({ path: `${OUT}/estilo-${est}-criacao.png` });
  await page.click('[data-act="start"]');
  await page.waitForSelector('[data-act="choose"], [data-act="skip"]', { timeout: 15000 });
  await page.waitForTimeout(800);
  const layout = await page.evaluate(() => {
    const root = document.querySelector('.adventure-layout');
    const art = root?.querySelector('.adventure-art');
    const story = root?.querySelector('.story-panel');
    const choices = root?.querySelector('.choice-panel');
    if (!root || !art || !story || !choices) return null;
    const height = root.getBoundingClientRect().height;
    const ratio = (el) => el.getBoundingClientRect().height / height;
    return {
      sections: [ratio(art), ratio(story), ratio(choices)],
      storyOverflow: getComputedStyle(story).overflowY,
      pageScrollable: document.documentElement.scrollHeight > innerHeight + 1,
      choice: root.querySelector('.choice') ? {
        tag: root.querySelector('.choice').tagName,
        role: root.querySelector('.choice').getAttribute('role'),
      } : null,
    };
  });
  if (!layout || layout.sections.some((part, index) => Math.abs(part - [0.35, 0.35, 0.3][index]) > 0.02) || layout.storyOverflow !== 'auto' || layout.pageScrollable || (layout.choice && (layout.choice.tag !== 'DIV' || layout.choice.role !== 'button'))) {
    errors.push(`layout de aventura inválido: ${JSON.stringify(layout)}`);
  }
  await page.screenshot({ path: `${OUT}/estilo-${est}-jogo.png` });
  if (est === 'manhwa' && layout?.choice) {
    const testedChoice = page.locator('.choice[aria-label*="D20"]').first();
    await (await testedChoice.count() ? testedChoice : page.locator('.choice[role="button"]').first()).focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1050);
    if (await page.$('.dice-overlay')) {
      const formula = await page.locator('.dice-equation').innerText();
      if (!formula.includes('Status') || !formula.includes('Equipamento') || !formula.includes('Dificuldade')) {
        errors.push(`fórmula de rolagem incompleta: ${formula}`);
      }
      const resultClass = await page.locator('.dice-card').getAttribute('class');
      if (!resultClass?.includes('success') && !resultClass?.includes('failure')) {
        errors.push(`resultado da rolagem sem estado visual: ${resultClass}`);
      }
      await page.click('[data-act="roll-close"]');
    }
    await page.waitForSelector('[data-act="next"], [data-act="toEnd"]');
  }
  for (const aba of ['equipamentos', 'inventario']) {
    const b = await page.$(`[data-act="tab"][data-id="${aba}"]`);
    if (b) {
      await b.click();
      await page.waitForTimeout(250);
      if (aba === 'inventario') {
        if (!await page.$('.inventory-overlay') || !await page.$('.adventure-art')) errors.push('inventário não sobrepõe apenas os painéis inferiores');
        const gear = page.locator('.inventory-slot[data-act="item-detail"]').first();
        if (await gear.count()) {
          await gear.click();
          if (!await page.$('.item-detail .rarity-label')) errors.push('detalhes do equipamento não exibem raridade');
          await page.click('[data-act="item-detail-close"]');
        }
        await page.click('.inventory-header [data-act="inventory-close"]');
      }
      await page.screenshot({ path: `${OUT}/estilo-${est}-${aba}.png` });
    }
  }
  // volta ao menu e apaga a vida para a próxima rodada
  await page.evaluate(() => { localStorage.removeItem('dao-mil-vidas-save-v1'); });
  await page.evaluate((e) => { const s = { meta: undefined, run: null, settings: { estilo: e } }; void s; }, est);
  await openHome();
  await page.click('[data-act="meta"]');
  await page.click('[data-act="mtab"][data-id="opcoes"]');
}
console.log('ERROS:', errors.length ? errors : 'nenhum');
await browser.close();
