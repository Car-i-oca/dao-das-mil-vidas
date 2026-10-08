import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const errors = [];
  const retiredAudioRequests = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('request', (request) => {
    if (request.url().includes('actions.google.com/sounds/v1/ambiences/wind_whistling.ogg')) retiredAudioRequests.push(request.url());
  });
  await page.addInitScript(() => {
    Object.defineProperty(window, 'AudioContext', {
      configurable: true,
      value: class { constructor() { throw new Error('Web Audio indisponível para este teste'); } },
    });
  });

  await page.goto('http://localhost:4173/');
  await page.click('[data-act="start-audio"]');
  await page.waitForSelector('[data-act="new"]', { timeout: 5000 });
  await page.click('[data-act="new"]');
  await page.waitForSelector('[data-act="start"]');
  await page.click('[data-act="start"]');
  await page.waitForSelector('[data-act="choose"], [data-act="next"], [data-act="skip"]', { timeout: 15000 });

  assert.deepEqual(retiredAudioRequests, [], 'o app não deve requisitar a URL de áudio removida');
  assert.deepEqual(errors, [], 'falha de áudio opcional não deve gerar erros de interface');
  console.log('Inicialização concluída mesmo sem suporte a Web Audio; jogo aberto e sem pedidos para a fonte inválida.');
} finally {
  await browser.close();
}
