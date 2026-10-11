/**
 * Génère les images de marque du site : carte de partage (og.png),
 * icônes de navigateur et icône de l'écran d'accueil.
 *
 * Les polices utilisées sont exactement celles du site : les fichiers WOFF2
 * auto-hébergés sont décompressés puis fournis au moteur de rendu.
 *
 * Usage : npm run assets
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import wawoff2 from 'wawoff2';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(root, 'public');
const cacheDir = path.join(root, 'node_modules', '.cache', 'snw-fonts');

const PAPER = '#F4EEE4';
const INK = '#17140F';
const ACCENT = '#D63A11';

const fontSources = {
  title: 'node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2',
  text: 'node_modules/@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2',
  mono: 'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2',
};

async function prepareFonts() {
  await mkdir(cacheDir, { recursive: true });
  const files = [];
  for (const [key, relative] of Object.entries(fontSources)) {
    const source = path.join(root, relative);
    if (!existsSync(source)) throw new Error(`police introuvable : ${relative}`);
    const target = path.join(cacheDir, `${key}.ttf`);
    const buffer = await import('node:fs/promises').then((fs) => fs.readFile(source));
    await writeFile(target, Buffer.from(await wawoff2.decompress(buffer)));
    files.push(target);
  }
  return files;
}

const fontFiles = await prepareFonts();
const font = { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Archivo' };
const render = (svg, width) =>
  new Resvg(svg, { font, fitTo: { mode: 'width', value: width }, background: PAPER }).render().asPng();

const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/* ---------------------------------------------------------------- carte de partage */

function shareCard() {
  const marks = [
    { x: 56, text: 'SNW', anchor: 'start' },
    { x: 1144, text: 'ÉDITION 01 — 2026', anchor: 'end' },
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect x="28.5" y="28.5" width="1143" height="573" fill="none" stroke="${INK}" stroke-opacity="0.28"/>
  ${marks
    .map(
      (mark) =>
        `<text x="${mark.x}" y="76" font-family="IBM Plex Mono" font-size="17" letter-spacing="3" fill="${INK}" text-anchor="${mark.anchor}">${escapeXml(mark.text)}</text>`,
    )
    .join('\n  ')}
  <line x1="56" y1="96" x2="1144" y2="96" stroke="${INK}" stroke-opacity="0.28"/>
  <text x="56" y="440" font-family="Archivo" font-size="360" font-weight="800" letter-spacing="-14" fill="${INK}">snw</text>
  <line x1="56" y1="470" x2="1144" y2="470" stroke="${INK}" stroke-opacity="0.55"/>
  <text x="56" y="524" font-family="Newsreader" font-size="40" fill="${INK}">Développeur web &amp; développeur de bots Discord</text>
  <text x="1144" y="524" font-family="IBM Plex Mono" font-size="17" letter-spacing="2.5" fill="${ACCENT}" text-anchor="end">ATOME · TICKET-PLUS</text>
  <text x="56" y="580" font-family="IBM Plex Mono" font-size="15" letter-spacing="2.5" fill="${INK}" fill-opacity="0.62">ÉTUDE DE CAS · BOTS DISCORD · JOURNAL DE FABRICATION</text>
</svg>`;
}

/* ------------------------------------------------------------------------ icônes */

function iconSvg(size, { bleed = 0.12 } = {}) {
  const pad = size * bleed;
  const inner = size - pad * 2;
  const baseline = size - pad * 1.1;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${INK}"/>
  <g fill="none" stroke="${PAPER}" stroke-width="${Math.max(1, size * 0.055)}" stroke-linecap="square" stroke-linejoin="miter">
    <path d="M ${pad + inner * 0.06} ${pad + inner * 0.3} l ${inner * 0.88} 0"/>
    <path d="M ${pad + inner * 0.06} ${pad + inner * 0.62} l ${inner * 0.88} 0"/>
  </g>
  <path d="M ${pad} ${baseline} L ${pad + inner} ${baseline}" stroke="${ACCENT}" stroke-width="${Math.max(1, size * 0.07)}"/>
</svg>`;
}

/* ----------------------------------------------------------------------------- run */

async function main() {
  await mkdir(publicDir, { recursive: true });

  const share = render(shareCard(), 1200);
  await writeFile(path.join(publicDir, 'og.png'), share);
  console.log('[assets] public/og.png');

  const icon512 = Buffer.from(iconSvg(512));
  await writeFile(path.join(publicDir, 'icon-512.png'), await sharp(icon512).png().toBuffer());
  await writeFile(path.join(publicDir, 'icon-192.png'), await sharp(icon512).resize(192).png().toBuffer());
  await writeFile(path.join(publicDir, 'apple-touch-icon.png'), await sharp(icon512).resize(180).png().toBuffer());
  await writeFile(path.join(publicDir, 'favicon-32.png'), await sharp(icon512).resize(32).png().toBuffer());
  await writeFile(path.join(publicDir, 'favicon.svg'), iconSvg(64), 'utf8');
  console.log('[assets] icônes (512 / 192 / 180 / 32 / svg)');
}

main().catch((error) => {
  console.error('[assets] échec :', error.message);
  process.exitCode = 1;
});
