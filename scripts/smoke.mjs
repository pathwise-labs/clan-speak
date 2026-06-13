import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const OUT = '/tmp/canan-shots';
mkdirSync(OUT, { recursive: true });
const BASE = 'http://localhost:5179/';

const shots = [];
let stepN = 0;
async function shot(page, name) {
  const file = `${OUT}/${String(++stepN).padStart(2, '0')}-${name}.png`;
  await page.screenshot({ path: file });
  shots.push(file);
  console.log('shot:', file);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1000, height: 940 } });
page.on('pageerror', (e) => console.log('PAGEERROR:', e.message));
page.on('console', (m) => {
  if (m.type() === 'error') console.log('CONSOLE.ERROR:', m.text());
});

try {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  // Ensure a clean first run
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await sleep(400);
  await shot(page, 'onboarding-intro');

  // Click through the 4 intro slides (Next/Continue)
  for (let i = 0; i < 4; i++) {
    const btn = page.getByRole('button', { name: /^(Next|Continue)$/ });
    if (await btn.isVisible().catch(() => false)) {
      await btn.click();
      await sleep(350);
    }
  }
  await shot(page, 'onboarding-goal');

  // Goal: pick the first option card, continue
  await page.locator('.option').first().click();
  await sleep(150);
  await page.getByRole('button', { name: 'Continue' }).click();
  await sleep(300);
  await shot(page, 'onboarding-level');

  // Level
  await page.locator('.option').first().click();
  await sleep(150);
  await page.getByRole('button', { name: 'Continue' }).click();
  await sleep(300);

  // Profile: pick avatar (stag) + name
  await page.locator('.avatar-pick').nth(1).click();
  await page.locator('.field__input').fill('Mairead');
  await shot(page, 'onboarding-profile');
  await page.getByRole('button', { name: 'Start learning' }).click();
  await sleep(500);
  await shot(page, 'home-path');

  // Start the first lesson (current node)
  await page.locator('.node:not(:disabled)').first().click();
  await sleep(500);
  await shot(page, 'lesson-mc');

  // ---- Solve lesson u1l1 deterministically ----
  const clickText = async (scope, text) => {
    const loc = page.locator(`${scope} button`, { hasText: new RegExp(`^${text}$`) }).first();
    await loc.click();
  };
  const checkContinue = async () => {
    const check = page.getByRole('button', { name: 'Check' });
    if (await check.isVisible().catch(() => false)) await check.click();
    await sleep(300);
    const cont = page.getByRole('button', { name: 'Continue' });
    await cont.click();
    await sleep(350);
  };

  // e1 MC: hello
  await page.locator('.choice', { hasText: 'hello' }).click();
  let bannerShot = false;
  if (!bannerShot) {
    await page.getByRole('button', { name: 'Check' }).click();
    await sleep(300);
    await shot(page, 'lesson-feedback');
    await page.getByRole('button', { name: 'Continue' }).click();
    await sleep(350);
  }

  // e2 translate ga->en: good morning
  await shot(page, 'lesson-translate');
  await clickText('.builder__bank', 'good');
  await clickText('.builder__bank', 'morning');
  await checkContinue();

  // e3 translate en->ga: tapadh leat
  await clickText('.builder__bank', 'tapadh');
  await clickText('.builder__bank', 'leat');
  await checkContinue();

  // e4 match pairs
  await shot(page, 'lesson-match');
  const pairs = [
    ['halò', 'hello'],
    ['tapadh leat', 'thank you'],
    ['mar sin leat', 'goodbye'],
    ['slàinte', 'cheers'],
  ];
  for (const [ga, en] of pairs) {
    await page.locator('.match-card', { hasText: new RegExp(`^${ga}$`) }).click();
    await sleep(120);
    await page.locator('.match-card', { hasText: new RegExp(`^${en}$`) }).click();
    await sleep(200);
  }
  await sleep(300);
  await page.getByRole('button', { name: 'Continue' }).click();
  await sleep(350);

  // e5 listening: madainn mhath
  await shot(page, 'lesson-listening');
  await clickText('.builder__bank', 'madainn');
  await clickText('.builder__bank', 'mhath');
  await checkContinue();

  // e6 fill blank: thu
  await shot(page, 'lesson-fill');
  await page.locator('.ex__chips button', { hasText: /^thu$/ }).click();
  await page.getByRole('button', { name: 'Check' }).click();
  await sleep(300);
  await page.getByRole('button', { name: 'Continue' }).click();
  await sleep(600);
  await shot(page, 'lesson-complete');

  // Continue closes overlay back to home
  await page.getByRole('button', { name: 'Continue' }).click();
  await sleep(500);
  await shot(page, 'home-after');

  // ---- Tabs ----
  const tab = async (name, label) => {
    await page.getByRole('button', { name: new RegExp(label) }).first().click();
    await sleep(450);
    await shot(page, name);
  };
  await tab('practice', 'Practice');
  await tab('leagues', 'Leagues');
  await tab('profile', 'Profile');
  await tab('shop', 'Shop');

  // Buy double XP in shop
  await page.locator('.shop-item', { hasText: 'Double XP' }).getByRole('button').click();
  await sleep(300);
  await shot(page, 'shop-bought');

  // Settings from profile
  await page.getByRole('button', { name: 'Profile' }).first().click();
  await sleep(400);
  await page.getByRole('button', { name: 'Settings' }).click();
  await sleep(400);
  await shot(page, 'settings');

  // Toggle dark mode
  await page.locator('.settings-row', { hasText: 'Dark mode' }).click();
  await sleep(400);
  await shot(page, 'settings-dark');

  // Back to home in dark mode
  await page.locator('.settings__back').click();
  await sleep(300);
  await page.getByRole('button', { name: 'Learn' }).first().click();
  await sleep(450);
  await shot(page, 'home-dark');

  console.log('\\nDONE. Screens captured:', shots.length);
} catch (err) {
  console.log('SCRIPT ERROR:', err.message);
  await shot(page, 'error-state');
} finally {
  await browser.close();
}
