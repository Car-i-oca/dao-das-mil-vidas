import { chromium } from 'playwright-core';

const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('http://localhost:4173/');
  await page.click('[data-act="start-audio"]');
  await page.click('[data-act="new"]');
  await page.waitForSelector('[data-act="start"]');
  await page.click('[data-act="start"]');
  await page.waitForSelector('.adventure-layout');
  for (const viewport of [{ width: 320, height: 568 }, { width: 360, height: 640 }, { width: 390, height: 844 }, { width: 430, height: 932 }]) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(100);
    const result = await page.evaluate(() => {
      const rect = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const { top, right, bottom, left, width, height } = element.getBoundingClientRect();
        return { top, right, bottom, left, width, height };
      };
      return {
        viewport: { width: innerWidth, height: innerHeight },
        doc: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
        hud: rect('.hud'), journal: rect('.journal-row'), game: rect('.game'), frame: rect('.game-frame'),
        art: rect('.adventure-art'), story: rect('.story-panel'), choices: rect('.choice-panel'), tabs: rect('.tabs'),
        storyOverflow: getComputedStyle(document.querySelector('.story-panel')).overflowY,
        choicesOverflow: getComputedStyle(document.querySelector('.choice-panel')).overflowY,
      };
    });
    const inside = (box, width, height) => box && box.left >= -1 && box.right <= width + 1 && box.top >= -1 && box.bottom <= height + 1;
    const ordered = result.hud && result.journal && result.game && result.art && result.story && result.choices
      && result.hud.bottom <= result.journal.top + 1 && result.journal.bottom <= result.art.top + 1
      && result.art.bottom <= result.story.top + 1 && result.story.bottom <= result.choices.top + 1
      && result.choices.bottom <= result.tabs.top + 1;
    if (result.doc.width > viewport.width + 1 || !inside(result.art, viewport.width, viewport.height)
      || !inside(result.story, viewport.width, viewport.height) || !inside(result.choices, viewport.width, viewport.height)
      || !inside(result.tabs, viewport.width, viewport.height) || !ordered
      || result.storyOverflow !== 'auto' || result.choicesOverflow !== 'auto') {
      errors.push(`layout fora dos limites em ${viewport.width}x${viewport.height}: ${JSON.stringify(result)}`);
    }
  }
  if (errors.length) throw new Error(errors.join('\n'));
  console.log('Painéis dentro dos limites e separados em 320×568, 360×640, 390×844 e 430×932.');
} finally {
  await browser.close();
}
