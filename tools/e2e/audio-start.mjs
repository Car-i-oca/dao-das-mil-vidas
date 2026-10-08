import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const errors = [];
  const retiredAudioRequests = [];
  const localMusicResponses = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('request', (request) => {
    if (request.url().includes('actions.google.com/sounds/v1/ambiences/wind_whistling.ogg')) retiredAudioRequests.push(request.url());
  });
  page.on('response', (response) => {
    if (response.url().includes('/audio/murim-wuxia.ogg')) localMusicResponses.push(response.status());
  });
  await page.addInitScript(() => {
    Object.defineProperty(window, 'AudioContext', {
      configurable: true,
      value: class { constructor() { throw new Error('Web Audio indisponível para este teste'); } },
    });
  });

  await page.goto('http://localhost:4173/');
  const musicResponse = page.waitForResponse((response) => response.url().includes('/audio/murim-wuxia.ogg') && [200, 206].includes(response.status()), { timeout: 8000 });
  await page.click('[data-act="start-audio"]');
  await musicResponse;
  await page.waitForSelector('[data-act="new"]', { timeout: 5000 });
  await page.click('[data-act="new"]');
  await page.waitForSelector('[data-act="start"]');
  await page.click('[data-act="start"]');
  await page.waitForSelector('[data-act="choose"], [data-act="next"], [data-act="skip"]', { timeout: 15000 });

  assert.deepEqual(retiredAudioRequests, [], 'o app não deve requisitar a URL de áudio removida');
  assert.ok(localMusicResponses.length > 0 && localMusicResponses.every((status) => [200, 206].includes(status)), `a trilha Murim local precisa carregar com sucesso: ${localMusicResponses}`);
  await page.waitForFunction(() => document.documentElement.dataset.musicState === 'playing', { timeout: 8000 });
  await page.waitForFunction(() => Number(document.documentElement.dataset.musicTime ?? 0) > 0.1, { timeout: 8000 });
  assert.deepEqual(errors, [], 'falha de áudio opcional não deve gerar erros de interface');
  console.log('Inicialização concluída mesmo sem suporte a Web Audio; jogo aberto e sem pedidos para a fonte inválida.');
} finally {
  await browser.close();
}
