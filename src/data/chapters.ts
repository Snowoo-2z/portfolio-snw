/** Les chapitres du numéro : servent au sommaire, au rail et à la barre mobile. */
export const chapters = [
  { id: 'couverture', folio: '00', title: 'Couverture', desc: 'Le pseudo, mesuré et annoté' },
  { id: 'sommaire', folio: '00', title: 'Sommaire', desc: 'Les chapitres du numéro' },
  { id: 'atome', folio: '01', title: 'Atome', desc: 'Étude de cas — site de marque' },
  { id: 'ticket-plus', folio: '02', title: 'Ticket Plus', desc: 'Développement de bots Discord' },
  { id: 'hors-serie', folio: 'H.S.', title: 'Hors-série', desc: 'Astra OS & chantiers ouverts' },
  { id: 'journal', folio: '03', title: 'Journal', desc: 'Concevoir, développer, livrer' },
  { id: 'territoires', folio: '04', title: 'Territoires', desc: 'Compétences, avec leurs sources' },
  { id: 'contact', folio: '05', title: 'Écrire', desc: 'Contact & disponibilité' },
] as const;

export type Chapter = (typeof chapters)[number];

/** Liste stable, partagée par le repérage au défilement. */
export const chapterIds: string[] = chapters.map((chapter) => chapter.id);
