/**
 * Contrôles ponctuels : animations réduites, sommaire, grille, ordre de titres.
 * Usage : node check.mjs [url]
 */
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

/* Utilisez CHROME_PATH=/chemin/vers/chrome pour un navigateur déjà installé. */
const executablePath = process.env.CHROME_PATH ?? (await chromium.executablePath());

const url = process.argv[2] ?? 'http://127.0.0.1:4173/';
const browser = await puppeteer.launch({
  args: [...chromium.args, '--no-sandbox', '--disable-dev-shm-usage'],
  executablePath,
  headless: true,
});

const report = {};

/* 1 — préférence système : animations réduites */
const reduced = await browser.newPage();
await reduced.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await reduced.setViewport({ width: 1440, height: 960 });
await reduced.goto(url, { waitUntil: 'networkidle0' });
await reduced.evaluate(() => document.querySelector('#journal')?.scrollIntoView());
await new Promise((r) => setTimeout(r, 900));
report.reducedMotion = await reduced.evaluate(() => ({
  hidden: Array.from(document.querySelectorAll('[data-reveal]')).filter(
    (n) => getComputedStyle(n).opacity !== '1',
  ).length,
  transition: getComputedStyle(document.querySelector('.action')).transitionDuration,
  scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
}));
await reduced.close();

/* 2 — le mode sans JavaScript reste lisible */
const noJs = await browser.newPage();
await noJs.setJavaScriptEnabled(false);
await noJs.setViewport({ width: 1440, height: 960 });
await noJs.goto(url, { waitUntil: 'domcontentloaded' });
report.noJavaScript = await noJs.evaluate(() => ({
  hasRoot: Boolean(document.getElementById('root')),
  textLength: document.body.innerText.trim().length,
}));
await noJs.close();

/* 3 — sommaire plein écran : hauteur, focus, fermeture */
const modal = await browser.newPage();
await modal.setViewport({ width: 1440, height: 960 });
await modal.goto(url, { waitUntil: 'networkidle0' });
await modal.click('.rail__tools button[aria-label="Ouvrir le sommaire"]');
await new Promise((r) => setTimeout(r, 600));
report.index = await modal.evaluate(() => {
  const dialog = document.querySelector('.index-sheet');
  const inner = dialog.querySelector('.index-sheet__inner');
  return {
    open: dialog.hasAttribute('open'),
    contentFits: inner.scrollHeight <= dialog.clientHeight + 4,
    innerHeight: inner.scrollHeight,
    dialogHeight: dialog.clientHeight,
    focusedInside: dialog.contains(document.activeElement),
    links: dialog.querySelectorAll('a[href^="#"]').length,
  };
});
await modal.keyboard.press('Escape');
await new Promise((r) => setTimeout(r, 500));
report.indexClosed = await modal.evaluate(() => !document.querySelector('.index-sheet').hasAttribute('open'));
await modal.close();

/* 4 — réglages : la grille s'allume, l'animation se coupe, tout persiste */
const settings = await browser.newPage();
await settings.setViewport({ width: 1440, height: 960 });
await settings.goto(url, { waitUntil: 'networkidle0' });
await settings.evaluate(() => window.localStorage.clear());
await settings.keyboard.press('g');
await settings.keyboard.press('m');
await new Promise((r) => setTimeout(r, 500));
report.settings = await settings.evaluate(() => ({
  gridOn: document.querySelector('.grid-overlay').getAttribute('data-on'),
  motion: document.documentElement.dataset.motion,
  stored: { grid: localStorage.getItem('snw:grid'), motion: localStorage.getItem('snw:motion') },
  revealsVisible: Array.from(document.querySelectorAll('[data-reveal]')).every(
    (n) => getComputedStyle(n).opacity === '1',
  ),
}));
await settings.close();

/* 5 — cibles tactiles et focus sur mobile */
const touch = await browser.newPage();
await touch.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await touch.goto(url, { waitUntil: 'networkidle0' });
await touch.evaluate(() => window.scrollTo(0, window.innerHeight * 2.5));
await new Promise((r) => setTimeout(r, 700));
report.mobileTargets = await touch.evaluate(() => {
  const small = [];
  document.querySelectorAll('a, button').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;
    if (rect.height < 24 && rect.width < 44) small.push(el.textContent.trim().slice(0, 24));
  });
  return { tooSmall: small.slice(0, 8), barVisible: getComputedStyle(document.querySelector('.mobile-bar')).transform };
});
await touch.close();

await browser.close();
console.log(JSON.stringify(report, null, 2));
