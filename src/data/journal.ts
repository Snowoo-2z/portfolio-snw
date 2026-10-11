/** Journal de fabrication : la démarche, en cinq temps, appuyée sur des traces réelles. */

export const journal = {
  deck:
    "Pas de valeurs affichées, pas de méthode en dix points. Ce que je fais, dans l'ordre où je le fais — avec, à chaque étape, la trace du projet qui l'illustre.",
  steps: [
    {
      num: '01',
      title: 'Partir d’une idée',
      body: [
        "Avant l'écran, la promesse. Pour Atome, il fallait qu'une marque tienne debout toute seule : un titre court, un visuel plein cadre, une seule phrase pour aller plus loin.",
        "Pour ticket-plus, l'idée vient d'un problème vu cent fois sur des serveurs Discord : les demandes se perdent dans le fil général et personne ne sait qui a traité quoi.",
      ],
      trace: ['Trace', 'Accueil Atome — « WEAR YOUR ENERGY » en ligne'],
    },
    {
      num: '02',
      title: 'Dessiner l’objet',
      body: [
        "Un système avant des écrans : palette, familles typographiques, grille, épaisseurs de filets. Atome impose le monochrome ; ce numéro impose son ivoire, son encre et un seul accent rouge orangé.",
        "Les composants se déduisent de ces contraintes — jamais l'inverse. Une fois la règle posée, une page se compose en quelques décisions, pas en cent.",
      ],
      trace: ['Trace', 'Ce site — grille 12 colonnes, ligne de base 8 px, trois voix typographiques'],
    },
    {
      num: '03',
      title: 'Construire l’architecture',
      body: [
        "Une responsabilité par fichier. Le bot est découpé en services (tickets, transcriptions, journaux), en gestionnaires d'interactions (commandes, boutons, menus, modales) et en accès aux données (SQLite).",
        "Côté web, même discipline : les contenus vivent dans des fichiers de données, la composition dans des composants. On corrige une phrase sans toucher à la mise en page.",
      ],
      trace: ['Trace', 'ticket-plus — src/services · src/interactions · src/database'],
    },
    {
      num: '04',
      title: 'Éprouver les cas limites',
      body: [
        "Un bot vit dans les exceptions : double clic sur le bouton, salon supprimé en pleine action, permissions retirées, membre introuvable, formulaire expiré.",
        "Chaque cas a une réponse écrite : message visible par le seul intéressé, trace dans les journaux, état cohérent en base. C'est là que se gagne la confiance d'un serveur.",
      ],
      trace: ['Trace', 'ticket-plus — utils/locks.ts · utils/access.ts · utils/errors.ts'],
    },
    {
      num: '05',
      title: 'Livrer, puis suivre',
      body: [
        "Mise en ligne, variables d'environnement, déploiement des commandes, annonce à la communauté. Un projet n'existe qu'à partir du moment où quelqu'un d'autre l'utilise.",
        "Ensuite on regarde ce qui casse, on corrige, on itère. C'est la partie invisible — et c'est elle qui décide si le projet tient dans le temps.",
      ],
      trace: ['Trace', 'Atome en ligne · serveur Discord communautaire'],
    },
  ],
} as const;
