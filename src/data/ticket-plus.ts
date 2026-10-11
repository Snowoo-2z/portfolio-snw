/**
 * Projet 02 — ticket-plus.
 *
 * Chaque élément de cette page est relevé dans le code source du dépôt
 * github.com/Snowoo-2z/ticket-plus (23 fichiers, 1 685 lignes, relevé du
 * 11 octobre 2026) : libellés des boutons, options des commandes, statuts,
 * couleurs des journaux, structure des transcriptions.
 */

export type MockBlock =
  | { kind: 'bar' }
  | { kind: 'title'; text: string }
  | { kind: 'desc'; text: string }
  | { kind: 'footer'; text: string }
  | { kind: 'row'; items: { label: string; signal?: boolean }[] }
  | { kind: 'fields'; items: { label: string; value: string }[] }
  | { kind: 'menu'; items: string[] };

export type ChainStep = {
  id: string;
  name: string;
  where: string;
  enter?: string;
  blocks: MockBlock[];
  note: string;
};

export const ticketPlus = {
  name: 'ticket-plus',
  type: 'Bot Discord — gestion de tickets',
  repo: 'https://github.com/Snowoo-2z/ticket-plus',
  deck:
    "Un bot de support pour serveurs Discord : on publie un panel, un membre ouvre un ticket, le support le prend en charge, et la conversation laisse une trace à la fermeture.",
  schémaNote:
    "Schéma reproduit d’après le code source (src/ui/builders.ts) : les libellés, les champs et les couleurs sont ceux du bot. Aucune capture d’interface n’est simulée, et les textes entre guillemets sont ceux que l’administration saisit elle-même.",
  chain: [
    {
      id: 'A',
      name: 'Panel publié',
      where: 'salon choisi par l’administration',
      blocks: [
        { kind: 'bar' },
        { kind: 'title', text: 'Titre du panel' },
        { kind: 'desc', text: 'Description du panel' },
        { kind: 'footer', text: 'ticket-plus' },
        { kind: 'row', items: [{ label: '🎫 Créer un ticket', signal: true }] },
      ],
      note: 'Le titre, la description et le libellé du bouton sont saisis par l’administration dans un formulaire à cinq champs ; l’image jointe à la commande devient l’illustration du panel.',
    },
    {
      id: 'B',
      name: 'Ticket ouvert',
      where: 'salon privé ticket-0001-<pseudo>',
      enter: 'un membre clique sur « Créer un ticket »',
      blocks: [
        { kind: 'bar' },
        {
          kind: 'fields',
          items: [
            { label: 'Demandeur', value: '@membre' },
            { label: 'Statut', value: 'Ouvert' },
            { label: 'Pris en charge par', value: 'Personne' },
          ],
        },
        { kind: 'footer', text: 'Ticket #0001 • ticket-plus' },
        {
          kind: 'row',
          items: [
            { label: '🙋 Prendre' },
            { label: '🔒 Fermer' },
          ],
        },
        {
          kind: 'menu',
          items: ['➕ Ajouter un membre', '➖ Retirer un membre', '✏️ Renommer', '📄 Exporter la discussion'],
        },
      ],
      note: 'Un seul ticket ouvert par membre : si le demandeur reclique sur le bouton, le bot renvoie le salon existant au lieu d’en créer un second.',
    },
    {
      id: 'C',
      name: 'Ticket fermé',
      where: 'salon renommé ferme-0001-<pseudo>',
      enter: 'le support ferme le ticket : la transcription part dans les journaux',
      blocks: [
        { kind: 'bar' },
        {
          kind: 'fields',
          items: [
            { label: 'Statut', value: 'Fermé' },
            { label: 'Pris en charge par', value: '@support' },
          ],
        },
        {
          kind: 'row',
          items: [
            { label: '🔓 Rouvrir' },
            { label: '📄 Transcription' },
            { label: '🗑️ Supprimer', signal: true },
          ],
        },
      ],
      note: 'À la fermeture, l’écriture est retirée au demandeur et au support, le salon change de nom, et une transcription part dans le salon de journaux.',
    },
  ] satisfies ChainStep[],
  /** Journaux : titres et couleurs exacts utilisés par le bot. */
  logs: [
    { title: 'Ticket #0001 créé', hex: '#57F287', role: 'création' },
    { title: 'Configuration enregistrée', hex: '#57F287', role: 'réglages' },
    { title: 'Panel publié', hex: '#5865F2', role: 'panel' },
    { title: 'Ticket pris en charge', hex: '#5865F2', role: 'prise en charge' },
    { title: 'Ticket libéré', hex: '#FEE75C', role: 'remise à disposition' },
    { title: 'Ticket fermé', hex: '#ED4245', role: 'fermeture' },
    { title: 'Ticket supprimé', hex: '#2B2D31', role: 'suppression' },
  ],
  transcript: {
    title: 'La transcription',
    text: "Un fichier HTML autonome, écrit dans le salon de journaux : messages, pièces jointes, embeds, réponses citées et horodatage en français. L’historique est remonté par paquets de cent messages, jusqu’à 5 000.",
    file: 'ticket-0001.html',
  },
  commands: [
    {
      name: '/panel-ticket',
      options: 'image — pièce jointe facultative (image, 10 Mo maximum)',
      rights: 'Gérer le serveur · inutilisable en message privé',
      behaviour:
        'Ouvre un formulaire à cinq champs (titre, description, libellé du bouton, titre et message du ticket), puis publie le panel dans le salon. Si l’envoi échoue, le panel est désactivé.',
    },
    {
      name: '/ticket-categorie-config',
      options: 'categorie (requise) · role-support · salon-logs',
      rights: 'Gérer le serveur · inutilisable en message privé',
      behaviour:
        'Enregistre l’emplacement des tickets, le rôle support et le salon de journaux, puis confirme dans un message visible de son seul auteur. Le rôle @everyone est refusé.',
    },
  ],
  mechanisms: [
    {
      title: 'Verrou par clé',
      text: 'Deux opérations sur la même cible sont sérialisées (création par membre, action par ticket). Un double clic ne crée pas deux salons, deux prises en charge ne se croisent pas.',
    },
    {
      title: 'Trois statuts',
      text: 'OPEN, CLOSED, DELETED. La fermeture retire l’écriture, la réouverture la rend, la suppression retire le salon après la transcription.',
    },
    {
      title: 'Nommage normalisé',
      text: 'Le salon s’appelle ticket-0001-<pseudo> — numéro sur quatre chiffres, pseudo translittéré — et devient ferme-0001-<pseudo> une fois fermé.',
    },
    {
      title: 'Permissions par salon',
      text: '@everyone en refus, le bot et le demandeur en accès, le rôle support en plus s’il est configuré. Les droits sont posés à la création, jamais supposés.',
    },
    {
      title: 'Message d’accueil paramétrable',
      text: 'Les jetons {user}, {ticket} et {number} sont remplacés dans le texte du ticket, ce qui permet d’accueillir chaque membre nommément.',
    },
    {
      title: 'Erreurs typées',
      text: 'Une erreur destinée à l’utilisateur s’affiche dans un message visible de lui seul ; une erreur technique part dans les journaux. Rien ne fuit dans le salon.',
    },
    {
      title: 'Nettoyage en cas d’échec',
      text: 'Si le message de contrôle ne peut pas être envoyé, le salon est retiré et le ticket marqué supprimé : pas d’état fantôme en base.',
    },
    {
      title: 'Membres additionnels',
      text: 'Ajouter ou retirer un membre passe par l’identifiant Discord, vérifié puis appliqué aux permissions du salon, avec refus explicite du demandeur et des bots.',
    },
  ],
  releve: [
    { key: 'Fichiers TypeScript', value: '23' },
    { key: 'Lignes dans src/', value: '1 685' },
    { key: 'discord.js', value: '^14.19.3' },
    { key: 'better-sqlite3', value: '^11.10.0' },
    { key: 'Node.js', value: '≥ 20' },
    { key: 'TypeScript', value: '^5.8.3' },
    { key: 'Outils', value: 'tsx · dotenv' },
    { key: 'Dernier commit relevé', value: 'a6dd49f' },
  ],
  /** Dépôts de bots ouverts, non publiés : dit tel quel. */
  chantiers: [
    { name: 'edge-bot', state: 'dépôt ouvert, contenu à venir' },
    { name: 'AdsCords', state: 'dépôt ouvert, contenu à venir' },
    { name: 'bot-naruto-rp', state: 'dépôt ouvert, contenu à venir' },
    { name: 'study-with-ai', state: 'dépôt ouvert, contenu à venir' },
  ],
  sources:
    'Relevé dans github.com/Snowoo-2z/ticket-plus le 11 octobre 2026 : libellés, options, statuts, couleurs et comportements sont repris du code source.',
};
