# portfolio-snw

Portfolio éditorial de **snw**, développeur web et développeur de bots Discord.

## Lancer le projet

```bash
npm install
npm run dev
```

Le build de production se vérifie avec `npm run build`.

## Contenu à compléter

- Le projet Atome est affiché via son site public dans un cadre live (`ATOME_URL` dans `src/main.js`) afin de ne pas reconstruire ou falsifier son interface. Le dépôt public Atome fournit aussi le logo et deux visuels de vêtements utilisés dans la fiche.
- La capture d'écran originale n'est pas présente dans le dépôt de travail. Elle peut être ajoutée lorsque le fichier est disponible, sans modifier la structure du site réel.
- La fiche bots présente `Snowoo-2z/ticket-plus`, un bot Discord TypeScript vérifié dans son dépôt public : panel et configuration, tickets privés, prise en charge, fermeture/réouverture, logs et transcriptions HTML.
- Pour activer l'envoi du formulaire de contact, renseigner `CONTACT_EMAIL` dans `src/main.js`. Sans adresse fournie, le formulaire prépare et copie le message sans inventer de coordonnées.
