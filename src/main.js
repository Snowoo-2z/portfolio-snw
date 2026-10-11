import './styles.css';

const ATOME_URL = 'https://atome-a401.onrender.com/';
// Aucun canal de contact n'a été fourni. Renseigner cette valeur pour activer l'envoi par e-mail.
const CONTACT_EMAIL = '';

const app = document.querySelector('#app');

document.documentElement.classList.add('js');

app.innerHTML = `
  <div class="site-shell">
    <header class="site-header" data-header>
      <a class="brand" href="#home" aria-label="snw, revenir à l'accueil">
        <span class="brand-mark" aria-hidden="true">↘</span>
        <span class="brand-name">snw</span>
        <span class="brand-context">atelier / 01</span>
      </a>
      <nav class="site-nav" aria-label="Navigation principale">
        <a href="#work" data-nav-link>travaux <span>01</span></a>
        <a href="#method" data-nav-link>méthode <span>02</span></a>
        <a href="#contact" data-nav-link>contact <span>03</span></a>
      </nav>
      <div class="header-meta" aria-label="Spécialités">
        <span>web</span>
        <span class="meta-slash">/</span>
        <span>discord</span>
      </div>
      <div class="page-progress" aria-hidden="true"><span></span></div>
    </header>

    <main id="main-content">
      <section class="hero" id="home" aria-labelledby="hero-title">
        <div class="hero-grid-mark" aria-hidden="true">
          <span>01</span>
          <span>—</span>
          <span>2026</span>
        </div>
        <div class="hero-layout">
          <div class="hero-primary" data-reveal>
            <p class="eyebrow"><span class="eyebrow-dot"></span> développeur web / bots Discord</p>
            <h1 id="hero-title">
              <span class="hero-word" aria-hidden="true">snw</span>
              <span class="sr-only">snw — développeur web et développeur de bots Discord</span>
            </h1>
            <div class="hero-rule" aria-hidden="true"><span></span></div>
            <p class="hero-lede">Je transforme une idée en interface claire, puis en outil qui tient la route.</p>
            <a class="text-link hero-link" href="#work">Entrer dans les projets <span aria-hidden="true">↘</span></a>
          </div>

          <aside class="hero-aside" data-reveal>
            <p class="margin-note">un portfolio, pas un catalogue</p>
            <p class="hero-aside-copy">Des sites qui ont une voix. Des bots qui rendent une communauté plus simple à faire vivre.</p>
            <dl class="hero-index">
              <div>
                <dt>terrain 01</dt>
                <dd>interfaces web</dd>
              </div>
              <div>
                <dt>terrain 02</dt>
                <dd>outils Discord</dd>
              </div>
              <div>
                <dt>position</dt>
                <dd>de l'idée au test</dd>
              </div>
            </dl>
          </aside>
        </div>
        <div class="hero-bottom" data-reveal>
          <span class="scroll-cue"><span class="scroll-line" aria-hidden="true"></span> faire défiler</span>
          <span class="hero-signature">snw / notes de fabrication</span>
        </div>
      </section>

      <section class="work-section section-pad" id="work" aria-labelledby="work-title">
        <div class="section-heading" data-reveal>
          <p class="section-kicker"><span>01</span> pièces choisies</p>
          <h2 id="work-title">Ce que je mets<br /><em>en ligne.</em></h2>
          <p class="section-intro">Deux terrains de jeu, deux rythmes. Ici, chaque projet garde son contexte au lieu de se fondre dans une grille.</p>
        </div>

        <article class="project-atome" data-reveal aria-labelledby="atome-title">
          <div class="project-topline">
            <span class="project-number">01 / étude réelle</span>
            <span class="project-status"><span class="status-dot"></span> lien public</span>
          </div>
          <div class="project-atome-grid">
            <div class="atome-visual">
              <div class="preview-label preview-label-top"><span>APERÇU LIVE</span><span>ATOME / 01</span></div>
              <div class="atome-frame">
                <div class="preview-fallback">
                  <img class="atome-logo" src="/assets/atome/logo.jpg" alt="Logo Atome" />
                  <span>Le site public se charge dans cette fenêtre.</span>
                </div>
                <iframe
                  src="${ATOME_URL}"
                  title="Aperçu du site public Atome"
                  loading="lazy"
                  referrerpolicy="no-referrer"
                ></iframe>
              </div>
              <div class="atome-assets" aria-label="Visuels authentiques issus du dépôt Atome">
                <figure>
                  <img src="/assets/atome/look.jpg" alt="Visuel Atome montrant un ensemble noir et blanc porté de face et de dos" loading="lazy" />
                  <figcaption>source / 01 — porté</figcaption>
                </figure>
                <figure>
                  <img src="/assets/atome/product.jpg" alt="Visuel Atome montrant un ensemble noir et blanc présenté à plat" loading="lazy" />
                  <figcaption>source / 02 — produit</figcaption>
                </figure>
              </div>
              <p class="preview-caption"><span>vue publique + sources</span> — l'interface reste celle d'Atome, sans remaquillage.</p>
            </div>

            <div class="atome-copy">
              <p class="project-eyebrow">projet web / réalisation 01</p>
              <h3 id="atome-title">Atome<span class="title-mark">↗</span></h3>
              <p class="project-description">Un projet web réel développé par snw. Le dépôt public d'Atome contient son logo et des visuels de vêtements : ils servent ici de repères authentiques, tandis que le lien garde le site dans son propre langage.</p>
              <div class="annotation-line" aria-hidden="true"><span></span><span>lecture du projet</span></div>
              <dl class="project-details">
                <div>
                  <dt>rôle</dt>
                  <dd>développement du site</dd>
                </div>
                <div>
                  <dt>matière</dt>
                  <dd>logo + visuels vêtements</dd>
                </div>
                <div>
                  <dt>stack / fonctions</dt>
                  <dd>à confirmer depuis le site source</dd>
                </div>
              </dl>
              <div class="project-actions">
                <a class="button button-dark" href="${ATOME_URL}" target="_blank" rel="noreferrer">Voir le site <span aria-hidden="true">↗</span></a>
                <details class="project-note">
                  <summary>Note de vérification</summary>
                  <p>La capture source n'est pas disponible dans ce dépôt. Le cadre ci-dessus affiche directement la page publique afin de ne pas inventer une interface ou des fonctions absentes.</p>
                </details>
              </div>
            </div>
          </div>
        </article>

        <article class="project-bots" data-reveal aria-labelledby="bots-title">
          <div class="bots-column bots-intro">
            <p class="project-eyebrow light">projet 02 / bot Discord réel</p>
            <h3 id="bots-title"><span>ticket</span><br /><em>plus</em></h3>
            <p>Un bot TypeScript pour organiser le support dans Discord : créer un panel, ouvrir un ticket privé, le prendre en charge, le fermer et garder une trace exploitable.</p>
            <div class="bot-techline"><span>TypeScript</span><span>discord.js</span><span>SQLite</span></div>
            <div class="bot-actions">
              <a class="text-link light-link" href="https://github.com/Snowoo-2z/ticket-plus" target="_blank" rel="noreferrer">Voir les sources <span aria-hidden="true">↗</span></a>
              <a class="text-link light-link" href="#contact">Parler d'un outil <span aria-hidden="true">↘</span></a>
            </div>
          </div>
          <div class="bots-column bots-system">
            <p class="system-label">ticket-plus / fonctionnalités relevées dans le code</p>
            <ol class="signal-path">
              <li>
                <span class="signal-index">01</span>
                <span><strong>configurer</strong><small>/ticket-categorie-config · catégorie, rôle support, salon de logs</small></span>
              </li>
              <li>
                <span class="signal-index">02</span>
                <span><strong>ouvrir</strong><small>/panel-ticket · salon privé, permissions et message d'accueil</small></span>
              </li>
              <li>
                <span class="signal-index">03</span>
                <span><strong>suivre</strong><small>claim, close, reopen, ajout / retrait de membres</small></span>
              </li>
              <li>
                <span class="signal-index">04</span>
                <span><strong>archiver</strong><small>logs, statut persistant et transcription HTML</small></span>
              </li>
            </ol>
            <div class="bots-footnote"><span class="footnote-mark">*</span><span>Lecture effectuée dans le dépôt public <strong>Snowoo-2z/ticket-plus</strong>. Les fonctions affichées ici viennent de ses commandes, services et interactions, pas d'une maquette de bot.</span></div>
          </div>
        </article>

        <div class="no-filler" data-reveal>
          <span class="no-filler-mark" aria-hidden="true">∅</span>
          <p>Pas de projet fictif pour remplir la page.<br /><strong>Les prochains entreront ici avec leurs preuves.</strong></p>
        </div>
      </section>

      <section class="method-section section-pad" id="method" aria-labelledby="method-title">
        <div class="method-header" data-reveal>
          <p class="section-kicker"><span>02</span> notes de fabrication</p>
          <h2 id="method-title">Une idée n'est<br /><em>pas encore une interface.</em></h2>
        </div>
        <div class="method-layout">
          <div class="method-statement" data-reveal>
            <span class="quote-mark" aria-hidden="true">“</span>
            <p>Je pars de ce qui doit vraiment exister. Je le rends visible, je le construis, puis je le teste jusqu'à ce que l'usage devienne évident.</p>
            <span class="statement-caption">snw / méthode de travail</span>
          </div>
          <ol class="method-steps" data-reveal>
            <li>
              <span class="step-number">01</span>
              <div><h3>Poser</h3><p>Comprendre le besoin, le public et la contrainte qui compte.</p></div>
            </li>
            <li>
              <span class="step-number">02</span>
              <div><h3>Composer</h3><p>Donner une structure et une voix à l'interface avant d'ajouter du décor.</p></div>
            </li>
            <li>
              <span class="step-number">03</span>
              <div><h3>Construire</h3><p>Intégrer proprement, relier les interactions et garder le projet lisible.</p></div>
            </li>
            <li>
              <span class="step-number">04</span>
              <div><h3>Éprouver</h3><p>Tester les chemins réels, les petits écrans et les détails qui font tenir l'ensemble.</p></div>
            </li>
          </ol>
        </div>
      </section>

      <section class="capabilities-section section-pad" id="skills" aria-labelledby="skills-title">
        <div class="capabilities-heading" data-reveal>
          <p class="section-kicker"><span>03</span> terrains de travail</p>
          <h2 id="skills-title">Quatre façons<br /><em>d'entrer dans un projet.</em></h2>
        </div>
        <div class="capabilities-layout">
          <ul class="capability-list" data-reveal>
            <li>
              <span class="capability-index">01</span>
              <div><h3>Développement web</h3><p>Construire des pages et des expériences qui restent claires quand l'écran change.</p></div>
              <span class="capability-arrow" aria-hidden="true">↗</span>
            </li>
            <li>
              <span class="capability-index">02</span>
              <div><h3>Bots Discord</h3><p>Transformer un besoin de communauté en interaction concrète et compréhensible.</p></div>
              <span class="capability-arrow" aria-hidden="true">↗</span>
            </li>
            <li>
              <span class="capability-index">03</span>
              <div><h3>Conception d'interface</h3><p>Hiérarchiser l'information, travailler le rythme et rendre chaque décision lisible.</p></div>
              <span class="capability-arrow" aria-hidden="true">↗</span>
            </li>
            <li>
              <span class="capability-index">04</span>
              <div><h3>Intégration de projet</h3><p>Passer de l'intention au détail livré, sans perdre l'idée en route.</p></div>
              <span class="capability-arrow" aria-hidden="true">↗</span>
            </li>
          </ul>
          <aside class="stack-note" data-reveal>
            <span class="stack-note-index">note technique / 04</span>
            <p>Les technologies précises d'Atome et des bots ne sont pas présentes dans ce dépôt. Elles seront ajoutées ici à partir des sources vérifiées, pas d'une supposition.</p>
            <span class="stack-line" aria-hidden="true"></span>
            <span class="stack-note-end">preuve &gt; posture</span>
          </aside>
        </div>
      </section>

      <section class="contact-section section-pad" id="contact" aria-labelledby="contact-title">
        <div class="contact-grid">
          <div class="contact-heading" data-reveal>
            <p class="section-kicker light-kicker"><span>04</span> ouvrir le fil</p>
            <h2 id="contact-title">Donnons une<br /><em>forme à l'idée.</em></h2>
            <p>Un site, un bot, une interface à clarifier ? Dépose quelques mots. Le canal d'envoi se branche en une ligne quand tes coordonnées sont prêtes.</p>
          </div>
          <form class="contact-form" id="contact-form" data-reveal novalidate>
            <div class="field-row">
              <label for="name">ton nom <span aria-hidden="true">*</span></label>
              <input id="name" name="name" type="text" autocomplete="name" placeholder="nom / pseudo" required />
            </div>
            <div class="field-row">
              <label for="email">ton adresse <span aria-hidden="true">*</span></label>
              <input id="email" name="email" type="email" autocomplete="email" placeholder="où te répondre ?" required />
            </div>
            <div class="field-row field-message">
              <label for="message">le point de départ <span aria-hidden="true">*</span></label>
              <textarea id="message" name="message" rows="4" placeholder="un projet web, un bot Discord, une idée à tester…" required></textarea>
            </div>
            <button class="button button-light" type="submit">Préparer le message <span aria-hidden="true">↗</span></button>
            <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
          </form>
        </div>
        <div class="contact-note" data-reveal><span>canal de contact</span><strong>à renseigner par snw</strong><span class="note-tail">— prêt à être branché</span></div>
      </section>
    </main>

    <footer class="site-footer">
      <span>snw / web + discord</span>
      <span>fait avec intention, pas avec un template</span>
      <a href="#home">retour en haut <span aria-hidden="true">↑</span></a>
    </footer>
  </div>
`;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('[data-reveal]');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const iframe = document.querySelector('.atome-frame iframe');
const atomeFrame = document.querySelector('.atome-frame');
iframe?.addEventListener('load', () => atomeFrame?.classList.add('is-loaded'));

const progress = document.querySelector('.page-progress span');
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progress) progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const navLinks = [...document.querySelectorAll('[data-nav-link]')];
const sections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('is-current', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach((section) => navObserver.observe(section));
}

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const subject = `Projet pour snw — ${name}`;
  const body = `Bonjour snw,\n\n${message}\n\n— ${name}\n${email}`;

  if (CONTACT_EMAIL) {
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (formStatus) formStatus.textContent = 'Ton logiciel de messagerie va s’ouvrir.';
    return;
  }

  try {
    await navigator.clipboard.writeText(body);
    if (formStatus) formStatus.textContent = 'Message préparé et copié. Le canal d’envoi de snw reste à brancher.';
  } catch {
    if (formStatus) formStatus.textContent = 'Message préparé. Le canal d’envoi de snw reste à brancher.';
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.removeAttribute('tabindex');
  });
});
