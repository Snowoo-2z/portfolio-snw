/**
 * Projet 01 — Atome.
 *
 * Tout est tiré du site en ligne (relevé du 11 octobre 2026) et du dépôt
 * github.com/Snowoo-2z/atome. Aucune fonctionnalité n'est supposée.
 */

export const atome = {
  name: 'Atome',
  type: 'Site de marque — accueil & collection',
  claim: 'WEAR YOUR ENERGY',
  url: 'https://atome-a401.onrender.com/',
  collectionUrl: 'https://atome-a401.onrender.com/shop/',
  discordUrl: 'https://discord.gg/dRkbkfJsdC',
  deck:
    "Une marque de vêtements, et le site qui la met en scène : une entrée plein écran, une collection de trois pièces, et un serveur Discord pour tenir la communauté.",
  fiche: [
    { key: 'Projet', value: 'Atome — marque de vêtements' },
    { key: 'Type', value: 'Site de marque : accueil, collection, communauté' },
    { key: 'Rôle', value: 'Conception et développement du site — déclaré par SNW' },
    { key: 'État', value: 'En ligne, consultable aujourd’hui' },
    { key: 'Adresse', value: 'atome-a401.onrender.com', href: 'https://atome-a401.onrender.com/' },
    { key: 'Communauté', value: 'discord.gg/dRkbkfJsdC', href: 'https://discord.gg/dRkbkfJsdC' },
    { key: 'Pages relevées', value: '2 — accueil (/) et collection (/shop/)' },
    {
      key: 'Stack',
      value: null,
      todo: 'non publiée : à préciser plutôt qu’à deviner',
    },
  ],
  /** Fonctionnalités observées sur le site en ligne, une par une. */
  features: [
    {
      title: 'Une entrée plein écran',
      text: "L'accueil ouvre sur un grand visuel produit et un titre en capitales — WEAR YOUR ENERGY. Un seul chemin est proposé au visiteur : découvrir la collection.",
    },
    {
      title: 'Deux pages, trois pièces',
      text: "La collection présente l'ensemble Hiver, le bonnet et l'ensemble été (short et t-shirt). Chaque pièce est ancrée dans la page (#hiver, #bonnet) et renvoie à sa propre section.",
    },
    {
      title: 'Deux façons de montrer un vêtement',
      text: 'Chaque pièce est présentée deux fois : à plat, dans une composition claire, puis portée en situation. Les deux images sont visibles côte à côte, sans interaction à deviner.',
    },
    {
      title: 'La communauté dans le parcours',
      text: "Le serveur Discord apparaît deux fois sur l'accueil et une fois en bas de la collection. Le site le présente comme le lieu des avancées du projet — c'est un appel à suivre la marque, pas un simple lien de pied de page.",
    },
  ],
  brand: {
    quote: 'MONOCHROME ET ORBITAL',
    text: "Le logotype est un italique traversé par une ellipse : du blanc sur du noir, aucune autre couleur. Le site suit la même contrainte dans toute sa mise en page.",
    editorial:
      "Ce cahier noir est un choix de ce numéro : il laisse à Atome son propre terrain — encre, contraste, image plein cadre — sans déguiser le projet. Aucun visuel n'a été retouché.",
  },
  sources: [
    'Accueil et collection du site en ligne, relevés le 11 octobre 2026.',
    'Visuels et logotype issus du dépôt du projet (®  Atome).',
    'Aucune information de stack n’étant publiée, la ligne reste ouverte.',
  ],
} as const;
