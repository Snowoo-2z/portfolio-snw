/**
 * Territoires de travail.
 *
 * Deux colonnes, toujours : ce que je fais, et ce qui le prouve.
 * « Relevé » = lu dans le code source ou sur le site en ligne.
 * Un jeton marqué « à préciser » n'est pas un oubli : c'est une information
 * qui n'est pas publiée, laissée ouverte plutôt que devinée.
 */

export type Territory = {
  index: string;
  name: string;
  practice: string;
  evidenceLabel: string;
  tags: { label: string; kind?: 'plain' | 'todo' }[];
  sources: string;
};

export const territories: Territory[] = [
  {
    index: '01',
    name: 'Développement web',
    practice:
      "Des sites en ligne de bout en bout : structure HTML, styles CSS composés à la main, comportements en JavaScript et TypeScript. Une page qui doit tenir aussi bien sur un téléphone que sur un grand écran.",
    evidenceLabel: 'Relevé dans les projets',
    tags: [
      { label: 'HTML' },
      { label: 'CSS' },
      { label: 'JavaScript' },
      { label: 'TypeScript' },
      { label: 'frameworks — à préciser', kind: 'todo' },
    ],
    sources: 'dépôt atome · site en ligne · dépôt ticket-plus',
  },
  {
    index: '02',
    name: 'Bots Discord',
    practice:
      "Du bot de service au bot communautaire : commandes, boutons, menus, formulaires, permissions par salon, persistance d'état, journaux, transcriptions. Avec les cas limites traités, parce que c'est là que tout casse.",
    evidenceLabel: 'Relevé dans le code source',
    tags: [
      { label: 'discord.js v14' },
      { label: 'Node.js ≥ 20' },
      { label: 'better-sqlite3' },
      { label: 'tsx' },
      { label: 'dotenv' },
    ],
    sources: 'dépôt ticket-plus — 23 fichiers, 1 685 lignes',
  },
  {
    index: '03',
    name: 'Conception d’interfaces',
    practice:
      "Direction artistique, hiérarchie typographique, grille, états d'interaction, accessibilité : ce que le visiteur voit se décide avant d'être codé. Ici, l'ivoire et l'encre sont posés d'abord, les composants ensuite.",
    evidenceLabel: 'Relevé dans ce numéro',
    tags: [
      { label: 'grille 12 colonnes' },
      { label: '3 voix typographiques' },
      { label: 'focus toujours visible' },
      { label: 'animations réduites respectées' },
    ],
    sources: 'code source de ce portfolio',
  },
  {
    index: '04',
    name: 'Intégration & projets',
    practice:
      "Aller jusqu'au bout : mise en ligne, hébergement, variables d'environnement, nommage des ressources, suivi des retours. Livrer proprement fait partie du travail, pas de l'après-travail.",
    evidenceLabel: 'Relevé dans les mises en ligne',
    tags: [
      { label: 'Git & GitHub' },
      { label: 'hébergement Render' },
      { label: 'variables d’environnement' },
      { label: 'déploiement de commandes Discord' },
    ],
    sources: 'site Atome en ligne · dépôt ticket-plus',
  },
];

export const territoriesNote = {
  relevé: 'Relevé — lu dans le code source ou sur le site en ligne.',
  todo: 'À préciser — information non publiée, laissée ouverte plutôt que devinée.',
};
