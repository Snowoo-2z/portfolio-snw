/**
 * Vérification du rendu : captures réelles sur plusieurs tailles d'écran.
 * Usage : node shot.mjs [url] [dossier]
 */
import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

/* Utilisez CHROME_PATH=/chemin/vers/chrome pour un navigateur déjà installé. */
const executablePath = process.env.CHROME_PATH ?? (await chromium.executablePath());

const url = process.argv[2] ?? 'http://127.0.0.1:4173/';
const outDir = process.argv[3] ?? '/tmp/shots';
await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  args: [...chromium.args, '--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
  executablePath,
  headless: true,
});

const problems = [];

async function newPage(width, height) {
  const page = await browser.newPage();
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      problems.push(`[${width}] console.${message.type()}: ${message.text()}`);
    }
  });
  page.on('pageerror', (error) => problems.push(`[${width}] pageerror: ${error.message}`));
  page.on('requestfailed', (request) =>
    problems.push(`[${width}] requête échouée: ${request.url()} (${request.failure()?.errorText})`),
  );
  page.on('response', (response) => {
    if (response.status() >= 400) problems.push(`[${width}] HTTP ${response.status()} — ${response.url()}`);
  });
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => window.localStorage.clear());
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise((resolve) => setTimeout(resolve, 700));
  return page;
}

/** Descend jusqu'à un repère en laissant les animations se terminer. */
async function at(page, selector, offset = 0) {
  await page.evaluate(
    (sel, off) => {
      const node = document.querySelector(sel);
      if (!node) return;
      window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY + off, behavior: 'auto' });
    },
    selector,
    offset,
  );
  await new Promise((resolve) => setTimeout(resolve, 1100));
}

/* --------------------------------------------------------------- bureau */

const desktop = await newPage(1440, 960);
const deskShots = [
  ['couverture', '#couverture', 0],
  ['sommaire', '#sommaire', 0],
  ['atome-tete', '#atome', 0],
  ['atome-planches', '#atome', 900],
  ['atome-detail', '#atome', 2400],
  ['ticket-tete', '#ticket-plus', 0],
  ['ticket-schema', '#ticket-plus', 700],
  ['ticket-registre', '#ticket-plus', 2100],
  ['hors-serie', '#hors-serie', 0],
  ['journal', '#journal', 0],
  ['journal-suite', '#journal', 700],
  ['territoires', '#territoires', 0],
  ['contact', '#contact', 0],
  ['colophon', '#colophon', 0],
];
for (const [name, selector, offset] of deskShots) {
  await at(desktop, selector, offset);
  await desktop.screenshot({ path: `${outDir}/d-${name}.png` });
}
await desktop.close();

/* ------------------------------------------------------- états interactifs */

const interact = await newPage(1440, 960);
await interact.click('.rail__tools button[aria-label="Ouvrir le sommaire"]').catch(() => {});
await new Promise((resolve) => setTimeout(resolve, 700));
await interact.screenshot({ path: `${outDir}/d-sommaire-plein.png` });
await interact.keyboard.press('Escape');
await new Promise((resolve) => setTimeout(resolve, 500));
await interact.keyboard.press('g');
await new Promise((resolve) => setTimeout(resolve, 400));
await interact.screenshot({ path: `${outDir}/d-grille.png` });
await interact.keyboard.press('g');
await new Promise((resolve) => setTimeout(resolve, 300));
/* plein page, animations figées : utile pour juger la composition d'ensemble */
await interact.evaluate(() => {
  document.documentElement.dataset.motion = 'off';
});
await new Promise((resolve) => setTimeout(resolve, 400));
await interact.screenshot({ path: `${outDir}/d-complet.png`, fullPage: true });
await interact.close();

/* --------------------------------------------------------------- tablette */

const tablet = await newPage(820, 1180);
for (const [name, selector, offset] of [
  ['couverture', '#couverture', 0],
  ['atome-planches', '#atome', 1500],
  ['ticket-schema', '#ticket-plus', 600],
]) {
  await at(tablet, selector, offset);
  await tablet.screenshot({ path: `${outDir}/t-${name}.png` });
}
await tablet.close();

/* ---------------------------------------------------------------- mobile */

const mobile = await newPage(390, 844);
for (const [name, selector, offset] of [
  ['couverture', '#couverture', 0],
  ['sommaire', '#sommaire', 0],
  ['atome-tete', '#atome', 0],
  ['atome-planches', '#atome', 1200],
  ['ticket-schema', '#ticket-plus', 400],
  ['territoires', '#territoires', 0],
  ['contact', '#contact', 0],
  ['colophon', '#colophon', 0],
]) {
  await at(mobile, selector, offset);
  await mobile.screenshot({ path: `${outDir}/m-${name}.png` });
}
await mobile.evaluate(() => window.scrollTo(0, window.innerHeight * 2.1));
await new Promise((resolve) => setTimeout(resolve, 900));
await mobile.screenshot({ path: `${outDir}/m-barre.png` });
await mobile.close();

/* --------------------------------------------------------------- mesures */

const measure = await browser.newPage();
await measure.setViewport({ width: 1440, height: 960 });
await measure.goto(url, { waitUntil: 'networkidle0' });
await measure.evaluate(() => window.localStorage.clear());
await measure.reload({ waitUntil: 'networkidle0' });
await new Promise((resolve) => setTimeout(resolve, 1000));
const metrics = await measure.evaluate(() => {
  const overflow = [];
  document.querySelectorAll('h1,h2,h3,p,a,li,td,th,figcaption,.deck,.note,.title,.specimen__word').forEach((el) => {
    if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 1 && !el.classList.contains('u-visually-hidden')) {
      overflow.push(`${el.tagName}.${String(el.className).slice(0, 44)} ${el.scrollWidth}>${el.clientWidth}`);
    }
  });
  const guideTops = Array.from(document.querySelectorAll('.specimen__guide')).map((g) =>
    Math.round(g.getBoundingClientRect().top),
  );
  return {
    height: document.documentElement.scrollHeight,
    horizontal: document.documentElement.scrollWidth - window.innerWidth,
    overflow,
    guideTops,
    progress: getComputedStyle(document.documentElement).getPropertyValue('--scroll-progress'),
    images: Array.from(document.images).filter((i) => i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
    headings: Array.from(document.querySelectorAll('h1,h2,h3')).map((h) => `${h.tagName}:${h.textContent.slice(0, 28)}`),
  };
});
await measure.close();

await browser.close();
console.log(JSON.stringify({ metrics, problems }, null, 2));
