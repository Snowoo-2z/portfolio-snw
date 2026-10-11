# SNW — Édition 01

Portfolio de **snw**, développeur web et développeur de bots Discord.
Conçu comme un numéro : une couverture où le pseudo est mesuré comme une épreuve
typographique, un cahier noir pour l'étude de cas **Atome**, une planche technique
pour le bot Discord **ticket-plus**, puis le journal de fabrication, les territoires
de travail, le contact et un colophon qui assume le rôle de mener la publication.

Papier ivoire, encre, un seul accent rouge orangé. Aucun dégradé, aucune sphère 3D.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
```

| Commande           | Effet                                                                    |
| ------------------ | ------------------------------------------------------------------------ |
| `npm run dev`      | Serveur de développement (rafraîchit le manifeste d'images au passage).   |
| `npm run build`    | Vérifie les types, régénère les médias, produit `dist/`.                  |
| `npm run preview`  | Sert `dist/` localement.                                                  |
| `npm run assets`   | Optimise les images et régénère les images de marque (`og.png`, icônes).  |
| `npm run typecheck`| Vérifie les types seuls.                                                  |
| `npm run shots`    | Captures de vérification en 1440 / 820 / 390 px (serveur déjà lancé).     |
| `npm run check`    | Contrôles : préférences, sommaire, sans-JavaScript, cibles tactiles.      |

## Ajouter des images

Deux dossiers, tous deux ignorés par git (`assets/`) :

```
assets/atome/   visuels du projet Atome (issus du dépôt Snowoo-2z/atome)
assets/drop/    zone de dépôt : captures à publier
```

Placez vos fichiers puis lancez `npm run assets`. Les noms reconnus :

| Fichier                        | Où il apparaît                                  |
| ------------------------------ | ----------------------------------------------- |
| `drop/site-capture.png`        | Projet 01 — grand aperçu du site Atome (Fig. 1)  |
| `drop/discord-1.png` … `-6`    | Projet 02 — captures du bot en service           |
| `atome/vetement humain hiver.png` | Fig. 2 — l'ensemble porté                     |
| `atome/vetement realiste sans humain.png` | Fig. 3 et détail Fig. 4 (recadrage automatique) |
| `atome/atome logo.jpeg`        | Logotype, dans le cahier noir                    |

Le script écrit les variantes WebP + AVIF dans `public/media/` et met à jour
`src/data/media.generated.json`. Le site lit ce manifeste : **tant qu'une image
n'est pas déposée, il dessine l'emplacement « Image — » au lieu d'afficher une
image cassée.** Rien à modifier dans le code.

## Où modifier quoi

| Contenu                                        | Fichier                          |
| ---------------------------------------------- | -------------------------------- |
| Pseudo, rôle, contact, phrase de couverture     | `src/data/site.ts`               |
| Chapitres (sommaire, rail, barre mobile)        | `src/data/chapters.ts`           |
| Étude de cas Atome                              | `src/data/atome.ts`              |
| Bot ticket-plus (schéma, mécanismes, relevé)    | `src/data/ticket-plus.ts`        |
| Hors-série (Astra OS, chantiers)                | `src/data/hors-serie.ts`         |
| Journal de fabrication                          | `src/data/journal.ts`            |
| Territoires et sources                          | `src/data/territoires.ts`        |
| Papier, encre, accent, grille, échelles         | `src/styles/tokens.css`          |

**§ Le courriel n'est pas renseigné.** Ouvrez `src/data/site.ts` et remplissez
`contact.email` : le bloc « à compléter » devient un lien `mailto:`.
Pour Discord, ajoutez l'identifiant numérique dans `contact.discord.url` afin de
proposer un lien de profil en plus du pseudo copiable.

## Direction artistique

- **Trois voix, jamais mélangées.** Archivo (titres, largeurs variables),
  Newsreader (texte et chapôs italiques), IBM Plex Mono (annotations, mesures,
  relevés, navigation). Toutes auto-hébergées.
- **Grille.** Douze colonnes, gouttière fluide, ligne de base de 8 px.
  Les placements sont explicites (`p-4-13`), lisibles dans le JSX.
- **Papier et encre.** `--paper`, `--ink`, `--ink-soft`, `--ink-mute`, plus trois
  épaisseurs de filet. Le rouge `#C9380F` **n'est utilisé que pour annoter** :
  folios, mesures, sources, repères.
- **Deux peaux.** `[data-skin='void']` inverse papier et encre — c'est le cahier
  noir qui accueille Atome, fidèle au monochrome de la marque, puis
  `[data-skin='paper']` rétablit l'ivoire pour les planches d'images.
- **Le pseudo est mesuré, pas décoré.** `Specimen.tsx` ajuste le corps à la
  largeur disponible, puis mesure la police au canevas pour poser les filets
  exactement sur la hauteur d'œil et la ligne de base. Les valeurs affichées à
  l'écran sont ces mesures-là.

## Interactions

Révélations au défilement (une seule fois, blocs choisis), rail de chapitres avec
avancement de lecture, sommaire plein écran, « Copier » sur le pseudo Discord,
calque de grille, réglage des animations. Raccourcis : `G` grille, `M` animations.

Sans JavaScript, la page affiche un repli statique rédigé dans `index.html`
(identité, projets, liens, note sur les sources) au lieu d'un écran vide ; une
amorce peinte immédiatement évite l'écran blanc le temps du chargement. Le site
respecte également
`prefers-reduced-motion: reduce` (aucune animation, aucun défilement doux).
Un réglage équivalent est proposé à la visiteuse ou au visiteur, conservé dans le
navigateur, et rappelé dans le colophon.

## Mise en ligne

```bash
npm run build      # → dist/
```

`dist/` est un site statique. Pour un sous-dossier :

```bash
BASE_URL=/portfolio-snw/ npm run build
```

Après publication, renseignez les URL **absolues** des métadonnées de partage
dans `index.html` (`og:url`, `og:image`, `twitter:image`) : les robots sociaux
n'acceptent pas les chemins relatifs.

## Vérification

```bash
npm run shots -- http://127.0.0.1:4173/ /tmp/captures   # captures multi-écrans
npm run check -- http://127.0.0.1:4173/                 # préférences, sommaire, replis
```

Capture le site en 1440, 820 et 390 px, relève les erreurs de console, les
requêtes échouées, les débordements de texte et l'état des révélations.
Chromium est fourni par `@sparticuz/chromium` ; `CHROME_PATH` permet d'en imposer un autre.

## Ce qui n'est pas public

Le site ne prétend rien savoir de plus que ses sources. Trois points restent
ouverts, volontairement, et sont signalés dans l'interface :

- la **stack d'Atome** : le site est en ligne, mais aucune information technique
  n'est publiée ;
- les **captures du bot** : elles seront présentées quand elles existeront ;
- le **courriel** : emplacement réservé dans `src/data/site.ts`.

`edge-bot`, `AdsCords`, `bot-naruto-rp` et `study-with-ai` sont des dépôts publics
encore vides : ils sont listés comme chantiers, jamais présentés comme des
réalisations.
