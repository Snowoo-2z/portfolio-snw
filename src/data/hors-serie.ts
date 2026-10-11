/** Chapitre hors-série : Astra OS et les chantiers ouverts. */

export const horsSerie = {
  deck:
    "Tout n'est pas encore livrable. Cette page garde la place de ce qui est en cours : un système d'exploitation écrit de zéro, et quatre dépôts de bots ouverts mais encore vides.",
  astra: {
    name: 'Astra OS',
    strapline: 'Un système d’exploitation x86 écrit de zéro',
    repo: 'https://github.com/Snowoo-2z/AstraOS',
    /** Relevé dans le README du dépôt AstraOS. */
    fiche: [
      { key: 'Nature', value: 'Système d’exploitation minimaliste, développé sans base existante' },
      { key: 'Mode', value: 'Mode réel x86 16 bits' },
      { key: 'Exécution', value: 'Émulateur QEMU (qemu-system-x86_64)' },
      { key: 'Outillage', value: 'NASM, hôte Linux ou WSL2' },
      { key: 'Licence', value: 'MIT' },
      { key: 'Couleur annoncée', value: 'Noir, accent blanc' },
    ],
    note:
      "Le dépôt décrit le projet et ses prérequis, pas encore son code. Il est donc présenté ici comme un chantier identifié — avec sa direction graphique annoncée, noir et blanc — et non comme une réalisation.",
  },
  chantiersTitle: 'Chantiers ouverts',
  chantiersNote:
    "Ces dépôts existent publiquement, mais leur code n'est pas publié. Ils ne sont pas comptés comme des réalisations : ils sont listés pour montrer ce qui arrive.",
  closing:
    "La suite est publique sur GitHub. Un projet ne rentre dans ce numéro que lorsqu'il peut être montré tel qu'il est.",
} as const;
