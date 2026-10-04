// Captura a página de estilos (public/estilos.html) em largura de celular: node tools/e2e/estilos.mjs [pasta]
import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const OUT = process.argv[2] ?? '.tmp';
const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(pathToFileURL(resolve('public/estilos.html')).href);
await page.waitForTimeout(800);
for (const s of ['A', 'B', 'C']) { const el = await page.$('#' + s); await el.screenshot({ path: `${OUT}/estilo-${s}.png` }); }
console.log('ERROS:', errors.length ? errors : 'nenhum');
await browser.close();
