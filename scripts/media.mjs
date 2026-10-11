/**
 * Chaîne média du portfolio SNW.
 *
 *   1. Optimise les images sources déposées localement (assets/) vers public/media/
 *      — plusieurs largeurs, WebP + AVIF, jamais de fichier lourd servi au visiteur.
 *   2. Produit un manifeste (src/data/media.generated.json) lu par le site :
 *      le site sait ainsi quelles images existent réellement et bascule
 *      automatiquement sur un emplacement dessiné quand l'image n'est pas encore là.
 *
 * Usage : npm run assets
 *
 * Aucune source n'est obligatoire : le script ne casse jamais un build existant.
 */
import { mkdir, readdir, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'public', 'media');
const dropDir = path.join(root, 'assets', 'drop');
const atomeDir = path.join(root, 'assets', 'atome');

const WIDE = [1600, 900, 520];
const MED = [1200, 700];
const LOGO = [640];
const outWidth = 900;

/** largeur → nom de fichier. */
const nameFor = (base, width, ext) => `${base}-${width}.${ext}`;

const log = (...args) => console.log('[assets]', ...args);

async function optimize(source, base, widths, { subdir, quality = 78 } = {}) {
  const dir = subdir ? path.join(outDir, subdir) : outDir;
  await mkdir(dir, { recursive: true });
  const meta = await sharp(source).metadata();
  const variants = [];
  for (const width of widths) {
    if (!meta.width || meta.width < width * 0.75) continue;
    const resized = sharp(source).resize({ width, withoutEnlargement: true, fit: 'inside' });
    for (const [ext, opts] of [
      ['webp', { quality, effort: 4 }],
      ['avif', { quality: quality - 8, effort: 3 }],
    ]) {
      const file = nameFor(path.posix.join(subdir ?? '', base), width, ext);
      await resized.clone().toFormat(ext, opts).toFile(path.join(outDir, file));
      variants.push({ src: `/media/${file}`, width, type: `image/${ext}` });
    }
  }
  if (!variants.length) return null;
  return {
    width: meta.width ?? null,
    height: meta.height ?? null,
    ratio: meta.width && meta.height ? meta.height / meta.width : null,
    variants,
  };
}

/** Recadrage « détail » : un plan serré, comme une légende de magazine. */
async function crop(source, base, { left, top, width, height }) {
  await mkdir(outDir, { recursive: true });
  const buf = await sharp(source)
    .extract({ left, top, width, height })
    .resize({ width: outWidth, withoutEnlargement: false })
    .toBuffer();
  const variants = [];
  for (const [ext, opts] of [
    ['webp', { quality: 80 }],
    ['avif', { quality: 72 }],
  ]) {
    const file = nameFor(base, outWidth, ext);
    await sharp(buf).toFormat(ext, opts).toFile(path.join(outDir, file));
    variants.push({ src: `/media/${file}`, width: outWidth, type: `image/${ext}` });
  }
  return { width: outWidth, height: Math.round((height / width) * outWidth), ratio: height / width, variants };
}

/** Cherche un fichier commençant par `prefix` dans un dossier. */
async function findByPrefix(dir, prefix) {
  if (!existsSync(dir)) return null;
  const entries = await readdir(dir);
  const match = entries
    .filter((name) => name.toLowerCase().startsWith(prefix) && /\.(png|jpe?g|webp|avif)$/i.test(name))
    .sort();
  return match.length ? path.join(dir, match[0]) : null;
}

/** Toutes les sources correspondant à un préfixe (captures multiples). */
async function findAllByPrefix(dir, prefix, limit = 6) {
  if (!existsSync(dir)) return [];
  const entries = (await readdir(dir)).sort();
  return entries
    .filter((name) => name.toLowerCase().startsWith(prefix) && /\.(png|jpe?g|webp|avif)$/i.test(name))
    .slice(0, limit)
    .map((name) => path.join(dir, name));
}

/** Le manifeste est toujours dérivé de ce qui existe vraiment dans public/media. */
async function scanManifest() {
  const manifest = { atome: {}, ticketPlus: { shots: [] } };
  const read = async (file) => {
    const full = path.join(root, 'public', file);
    if (!existsSync(full)) return null;
    const meta = await sharp(full).metadata();
    return {
      src: file,
      width: meta.width ?? null,
      height: meta.height ?? null,
      ratio: meta.width && meta.height ? meta.height / meta.width : null,
      bytes: (await stat(full)).size,
    };
  };

  const families = {
    hero: 'atome/hero',
    flat: 'atome/flat',
    logo: 'atome/logo',
    detailPrint: 'atome/detail-print',
    detailLogo: 'atome/detail-logo',
    siteCapture: 'atome/site-capture',
  };

  for (const [key, file] of Object.entries(families)) {
    const entries = [];
    const widths = file === 'atome/detail-print' ? [outWidth] : [...WIDE, ...MED, ...LOGO, 2000];
    for (const width of widths) {
      for (const ext of ['avif', 'webp']) {
        const found = await read(`/media/${file}-${width}.${ext}`);
        if (found) entries.push(found);
      }
    }
    manifest.atome[key] = entries.length ? entries : null;
  }

  const shots = [];
  for (let i = 1; i <= 6; i += 1) {
    const id = `discord-0${i}`;
    const entries = [];
    for (const width of MED) {
      for (const ext of ['avif', 'webp']) {
        const found = await read(`/media/ticket-plus/${id}-${width}.${ext}`);
        if (found) entries.push(found);
      }
    }
    if (entries.length) shots.push({ id, variants: entries });
  }
  manifest.ticketPlus.shots = shots;
  manifest.generatedAt = new Date().toISOString();

  await writeFile(
    path.join(root, 'src', 'data', 'media.generated.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );
  log('manifeste écrit : src/data/media.generated.json');
  return manifest;
}

const manifestOnly = process.argv.includes('--manifest-only');

async function main() {
  if (manifestOnly) {
    await scanManifest();
    return;
  }

  const sources = [];
  const atomeHero = await findByPrefix(atomeDir, 'vetement humain');
  const atomeFlat = await findByPrefix(atomeDir, 'vetement realiste');
  const atomeLogo = await findByPrefix(atomeDir, 'atome logo');

  if (atomeHero) sources.push([atomeHero, 'hero', WIDE, { subdir: 'atome' }]);
  if (atomeFlat) sources.push([atomeFlat, 'flat', WIDE, { subdir: 'atome' }]);
  if (atomeLogo) sources.push([atomeLogo, 'logo', LOGO, { subdir: 'atome', quality: 88 }]);

  for (const [source, base, widths, opts] of sources) {
    log(`optimisation ${path.relative(root, source)} → /media/${opts.subdir}/${base}`);
    await optimize(source, base, widths, opts);
  }

  // Détails recadrés dans les vrais visuels du projet.
  if (atomeFlat) {
    const meta = await sharp(atomeFlat).metadata();
    if (meta.width && meta.height) {
      const w = meta.width;
      const h = meta.height;
      log('découpe détail — motif dos');
      await crop(atomeFlat, 'atome/detail-print', {
        left: Math.round(w * 0.55),
        top: Math.round(h * 0.06),
        width: Math.round(w * 0.4),
        height: Math.round(h * 0.4),
      });
    }
  }

  // Zone de dépôt : capture du site Atome et captures du bot Discord.
  const capture = await findByPrefix(dropDir, 'site-capture');
  if (capture) {
    log(`capture Atome détectée : ${path.basename(capture)}`);
    await optimize(capture, 'site-capture', WIDE, { subdir: 'atome', quality: 82 });
  } else {
    log('capture Atome absente → emplacement dessiné (voir assets/drop/README.md)');
  }

  const shots = await findAllByPrefix(dropDir, 'discord-');
  for (const [index, shot] of shots.entries()) {
    const id = `discord-0${index + 1}`;
    log(`capture Discord : ${path.basename(shot)} → ${id}`);
    await optimize(shot, id, MED, { subdir: 'ticket-plus', quality: 84 });
  }

  await scanManifest();
}

main().catch((error) => {
  console.error('[assets] échec :', error.message);
  process.exitCode = 1;
});
