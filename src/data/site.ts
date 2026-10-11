/**
 * Identité du site. C'est le seul fichier à ouvrir pour changer une coordonnée.
 */

export const site = {
  alias: 'snw',
  edition: {
    number: '01',
    label: 'Édition 01',
    month: 'octobre',
    year: 2026,
    stamp: '11.10.2026',
  },
  role: 'Développeur web & développeur de bots Discord',
  /** Phrase de couverture : courte, concrète, sans emphase. */
  coverDeck: [
    "Je pars d'une idée, je dessine l'écran, j'écris le code, je le mets en ligne.",
    'Sites web et bots Discord — menés du premier trait au dernier détail.',
  ],
  /** Les trois lettres portent les trois temps du travail. */
  letters: [
    { letter: 's', verb: 'concevoir', caption: "l'idée et l'écran" },
    { letter: 'n', verb: 'développer', caption: 'le code qui tient' },
    { letter: 'w', verb: 'mettre en ligne', caption: 'le projet qui vit' },
  ],
  contact: {
    discord: {
      handle: 'snw_code',
      /** Ajoute ton identifiant numérique pour un lien de profil direct. */
      url: null as string | null,
    },
    github: {
      handle: '@Snowoo-2z',
      url: 'https://github.com/Snowoo-2z',
    },
    /** Emplacement à compléter : ajoute l'adresse, le bloc se transforme en lien. */
    email: null as string | null,
  },
  /** Ce que le site peut prendre en charge — volontairement concret. */
  scope: [
    'Un site de marque ou une vitrine : accueil, contenu, mise en ligne.',
    'Un bot Discord de service : tickets, outils internes, automatisations pour ton serveur.',
    "Une interface à reprendre : hiérarchie, typographie, version mobile.",
    'Une collaboration sur un projet existant : intégration, finitions, corrections.',
  ],
  languageNote: 'Ce numéro est écrit en français. Le code et les interfaces livrés le sont aussi.',
} as const;

/** Sources citées dans le colophon : tout ce qui est affirmé sur ce site vient de là. */
export const sources = [
  {
    label: 'Site Atome en ligne',
    detail: 'atome-a401.onrender.com — accueil et collection, relevé le 11 octobre 2026.',
    url: 'https://atome-a401.onrender.com/',
  },
  {
    label: 'Dépôt atome',
    detail: 'github.com/Snowoo-2z/atome — visuels produits et logotype du projet.',
    url: 'https://github.com/Snowoo-2z/atome',
  },
  {
    label: 'Dépôt ticket-plus',
    detail: 'github.com/Snowoo-2z/ticket-plus — code source du bot Discord.',
    url: 'https://github.com/Snowoo-2z/ticket-plus',
  },
  {
    label: 'Dépôt AstraOS',
    detail: 'github.com/Snowoo-2z/AstraOS — description du système et prérequis.',
    url: 'https://github.com/Snowoo-2z/AstraOS',
  },
];

export const honesty = {
  title: 'Méthode des sources',
  text: "Rien n'est inventé sur cette page. Chaque information factuelle vient du site en ligne, d'un dépôt public ou d'une déclaration de l'auteur. Ce qui n'était pas vérifiable est laissé vide et signalé plutôt que comblé.",
};
