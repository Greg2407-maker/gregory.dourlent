const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const reveals = document.querySelectorAll('.reveal');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 16);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((element) => observer.observe(element));

const heroPanel = document.querySelector('.hero-panel');
const codeCard = document.querySelector('.code-card');
const portrait = document.querySelector('.hero-panel img[alt="Portrait professionnel de Gregory Dourlent"]');

function applyHeroResponsiveFix() {
  const isMobile = window.matchMedia('(max-width: 820px)').matches;

  if (heroPanel && codeCard) {
    if (isMobile) {
      heroPanel.style.setProperty('min-height', 'auto', 'important');
      heroPanel.style.setProperty('padding-bottom', '20px', 'important');

      codeCard.style.setProperty('position', 'static', 'important');
      codeCard.style.setProperty('inset', 'auto', 'important');
      codeCard.style.setProperty('left', 'auto', 'important');
      codeCard.style.setProperty('right', 'auto', 'important');
      codeCard.style.setProperty('top', 'auto', 'important');
      codeCard.style.setProperty('bottom', 'auto', 'important');
      codeCard.style.setProperty('width', '100%', 'important');
      codeCard.style.setProperty('margin', '24px 0 0', 'important');
      codeCard.style.setProperty('box-sizing', 'border-box', 'important');
      codeCard.style.setProperty('grid-template-columns', '24px minmax(0, 1fr)', 'important');
      codeCard.style.setProperty('gap', '8px 10px', 'important');
    } else {
      heroPanel.style.removeProperty('min-height');
      heroPanel.style.removeProperty('padding-bottom');

      ['position','inset','left','right','top','bottom','width','margin','box-sizing','grid-template-columns','gap'].forEach((property) => {
        codeCard.style.removeProperty(property);
      });
    }
  }
}

if (portrait) {
  const frame = portrait.parentElement;

  Object.assign(frame.style, {
    width: '126px',
    height: '126px',
    aspectRatio: '1 / 1',
    margin: '50px 0 28px',
    borderRadius: '34px',
    border: '0',
    boxShadow: '0 26px 50px rgba(23,62,112,.22)',
    transform: 'rotate(-3deg)',
    background: '#dbe7f4',
    overflow: 'hidden'
  });

  Object.assign(portrait.style, {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: '50% 8%',
    transform: 'scale(1.12)',
    transformOrigin: '50% 18%'
  });
}

applyHeroResponsiveFix();
window.addEventListener('resize', applyHeroResponsiveFix);

const scrollTopLink = document.querySelector('[data-scroll-top]');
scrollTopLink?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });
  history.replaceState(null, '', window.location.pathname + window.location.search);
});

// -----------------------------------------------------------------------------
// Royal Track — démonstration interactive locale
// Aucun backend, aucune API et aucune donnée réelle ne sont utilisés ici.
// -----------------------------------------------------------------------------
const royalPreview = document.querySelector('.royal-preview');
let currentLang = 'fr';
let refreshRoyalLanguage = () => {};

if (royalPreview) {
  const royalDemoStyle = document.createElement('style');
  royalDemoStyle.textContent = `
    .royal-preview.royal-demo { min-height: 302px; background: rgba(255,255,255,.98); }
    .royal-demo * { box-sizing: border-box; }
    .royal-demo__header { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:13px 16px 11px; border-bottom:1px solid #e8eef5; background:linear-gradient(180deg,#fff,#fbfdff); }
    .royal-demo__brand strong { display:block; color:#173e70; font:800 .84rem/1 "Manrope",sans-serif; letter-spacing:.08em; }
    .royal-demo__brand small { color:#7b899a; font-size:.58rem; }
    .royal-demo__badge { display:inline-flex; align-items:center; gap:5px; padding:5px 8px; border-radius:999px; background:#eef5fc; color:#245ea6; font-size:.54rem; font-weight:800; white-space:nowrap; }
    .royal-demo__badge::before { content:""; width:5px; height:5px; border-radius:50%; background:#4d9d6a; box-shadow:0 0 0 3px rgba(77,157,106,.12); }
    .royal-demo__form { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:7px; padding:10px 16px; }
    .royal-demo__input { width:100%; min-width:0; min-height:31px; padding:0 10px; border:1px solid #d9e3ee; border-radius:7px; outline:none; background:#f8fafc; color:#2e4055; font:700 .61rem/1 "Inter",sans-serif; transition:border-color .2s ease,box-shadow .2s ease,background .2s ease; }
    .royal-demo__input:focus { border-color:#7da6d5; background:#fff; box-shadow:0 0 0 3px rgba(36,94,166,.10); }
    .royal-demo__search,.royal-demo__reset { border:0; cursor:pointer; font-family:"Inter",sans-serif; font-weight:800; transition:transform .18s ease,opacity .18s ease; }
    .royal-demo__search:hover,.royal-demo__reset:hover { transform:translateY(-1px); }
    .royal-demo__search { min-height:31px; padding:0 11px; border-radius:7px; color:#fff; background:linear-gradient(135deg,#2e6db7,#174878); font-size:.58rem; box-shadow:0 6px 13px rgba(36,94,166,.18); }
    .royal-demo__search:disabled { cursor:wait; opacity:.72; transform:none; }
    .royal-demo__hint { padding:0 16px 8px; color:#8190a2; font-size:.49rem; }
    .royal-demo__hint code { color:#245ea6; font:800 .52rem/1 ui-monospace,SFMono-Regular,Menlo,monospace; }
    .royal-demo__stage { position:relative; min-height:185px; padding:0 16px 13px; }
    .royal-demo__empty,.royal-demo__loading,.royal-demo__error { min-height:170px; display:grid; place-items:center; text-align:center; border:1px dashed #dbe5ef; border-radius:10px; background:linear-gradient(145deg,#fbfdff,#f4f8fc); padding:18px; }
    .royal-demo__empty-icon { width:38px; height:38px; display:grid; place-items:center; margin:0 auto 9px; border-radius:11px; background:#eaf2fb; color:#245ea6; font:800 1rem/1 "Manrope",sans-serif; }
    .royal-demo__empty strong,.royal-demo__error strong { display:block; margin-bottom:4px; color:#31445a; font-size:.67rem; }
    .royal-demo__empty span,.royal-demo__error span { display:block; max-width:310px; color:#8492a3; font-size:.52rem; line-height:1.45; }
    .royal-demo__error { border-color:#efd7d7; background:#fffafa; }
    .royal-demo__error strong { color:#9a4a4a; }
    .royal-demo__spinner { width:24px; height:24px; margin:0 auto 9px; border:3px solid #dce8f5; border-top-color:#245ea6; border-radius:50%; animation:royalSpin .7s linear infinite; }
    .royal-demo__loading span { color:#718297; font-size:.54rem; font-weight:700; }
    @keyframes royalSpin { to { transform:rotate(360deg); } }
    @keyframes royalReveal { from { opacity:0; transform:translateY(7px); } to { opacity:1; transform:translateY(0); } }
    .royal-demo__result { animation:royalReveal .35s ease both; }
    .royal-demo__player { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px; align-items:center; padding:10px 11px; margin-bottom:9px; border:1px solid #e1eaf3; border-radius:10px; background:radial-gradient(circle at 90% 0%,rgba(105,158,218,.15),transparent 35%),linear-gradient(135deg,#fbfdff,#f1f6fb); }
    .royal-demo__player-label { display:block; margin-bottom:1px; color:#8695a6; font-size:.46rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
    .royal-demo__player-name { display:flex; align-items:center; gap:5px; color:#263a50; font:800 .73rem/1.2 "Manrope",sans-serif; }
    .royal-demo__demo-pill { padding:3px 5px; border-radius:999px; background:#eaf2fb; color:#245ea6; font:800 .42rem/1 "Inter",sans-serif; letter-spacing:.03em; }
    .royal-demo__stats { display:flex; gap:5px; flex-wrap:wrap; justify-content:flex-end; }
    .royal-demo__stat { min-width:50px; padding:5px 6px; border:1px solid #e1e8f0; border-radius:7px; background:rgba(255,255,255,.86); text-align:center; }
    .royal-demo__stat b { display:block; color:#28445f; font-size:.53rem; line-height:1.1; }
    .royal-demo__stat span { display:block; margin-top:2px; color:#8a98a8; font-size:.4rem; text-transform:uppercase; }
    .royal-demo__dashboard { display:grid; grid-template-columns:minmax(0,1fr) 118px; gap:9px; }
    .royal-demo__cards { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:6px; }
    .royal-demo-card { min-width:0; padding:6px; border:1px solid #dfe7f0; border-radius:8px; background:#fff; box-shadow:0 3px 10px rgba(43,76,112,.035); }
    .royal-demo-card__art { position:relative; height:35px; margin-bottom:5px; overflow:hidden; border-radius:6px; background:linear-gradient(145deg,#6e9fda,#2c568c); }
    .royal-demo-card:nth-child(2) .royal-demo-card__art { background:linear-gradient(145deg,#d68c62,#94472d); }
    .royal-demo-card:nth-child(3) .royal-demo-card__art { background:linear-gradient(145deg,#8a7bd0,#514487); }
    .royal-demo-card:nth-child(4) .royal-demo-card__art { background:linear-gradient(145deg,#75aa88,#3b684b); }
    .royal-demo-card__art::before,.royal-demo-card__art::after { content:""; position:absolute; border-radius:50%; background:rgba(255,255,255,.18); }
    .royal-demo-card__art::before { width:31px; height:31px; right:-7px; top:-8px; }
    .royal-demo-card__art::after { width:17px; height:17px; left:7px; bottom:5px; }
    .royal-demo-card strong { display:block; overflow:hidden; color:#34465a; font-size:.48rem; line-height:1.2; white-space:nowrap; text-overflow:ellipsis; }
    .royal-demo-card small { display:block; margin-top:2px; color:#8a97a6; font-size:.41rem; }
    .royal-demo-card__progress { height:4px; margin-top:5px; overflow:hidden; border-radius:999px; background:#e9eef4; }
    .royal-demo-card__progress i { display:block; height:100%; border-radius:inherit; background:linear-gradient(90deg,#4b9768,#6dbb88); }
    .royal-demo__resources { padding:9px; border-radius:9px; background:linear-gradient(145deg,#123661,#0d284a); color:#e5eef8; box-shadow:0 8px 16px rgba(16,47,88,.12); }
    .royal-demo__resources > strong { display:block; margin-bottom:6px; font-size:.5rem; letter-spacing:.06em; text-transform:uppercase; }
    .royal-demo__resource { display:flex; justify-content:space-between; gap:6px; padding:5px 0; border-top:1px solid rgba(255,255,255,.09); font-size:.44rem; }
    .royal-demo__resource:first-of-type { border-top:0; }
    .royal-demo__resource b { color:#fff; }
    .royal-demo__footer { display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:8px; }
    .royal-demo__features { display:flex; flex-wrap:wrap; gap:4px; }
    .royal-demo__features span { padding:4px 6px; border:1px solid #e1e8f0; border-radius:6px; background:#f8fafc; color:#69798d; font-size:.42rem; font-weight:800; }
    .royal-demo__reset { padding:4px 7px; border-radius:6px; background:transparent; color:#718196; font-size:.43rem; }
    @media (max-width:620px) {
      .royal-demo__header { padding:11px 12px 9px; }
      .royal-demo__badge { font-size:.49rem; }
      .royal-demo__form { padding:9px 12px; }
      .royal-demo__hint { padding:0 12px 7px; }
      .royal-demo__stage { min-height:224px; padding:0 12px 12px; }
      .royal-demo__empty,.royal-demo__loading,.royal-demo__error { min-height:208px; }
      .royal-demo__player { grid-template-columns:1fr; align-items:start; }
      .royal-demo__stats { justify-content:flex-start; }
      .royal-demo__stat { min-width:48px; }
      .royal-demo__dashboard { grid-template-columns:1fr; }
      .royal-demo__cards { gap:4px; }
      .royal-demo-card { padding:4px; }
      .royal-demo-card__art { height:31px; }
      .royal-demo__resources { display:grid; grid-template-columns:repeat(3,1fr); gap:5px; padding:7px; }
      .royal-demo__resources > strong { grid-column:1/-1; margin:0; }
      .royal-demo__resource { display:block; padding:4px; border:1px solid rgba(255,255,255,.09); border-radius:5px; }
      .royal-demo__resource b { display:block; margin-top:2px; }
      .royal-demo__footer { align-items:flex-start; }
      .royal-demo__reset { flex:0 0 auto; }
    }
    @media (prefers-reduced-motion:reduce) { .royal-demo__spinner,.royal-demo__result { animation:none; } }
  `;
  document.head.appendChild(royalDemoStyle);

  royalPreview.classList.add('royal-demo');
  royalPreview.innerHTML = `
    <div class="royal-demo__header">
      <div class="royal-demo__brand"><strong>ROYAL TRACK</strong><small>Track your progression!</small></div>
      <span class="royal-demo__badge" data-royal-badge></span>
    </div>
    <form class="royal-demo__form" data-royal-form>
      <input class="royal-demo__input" data-royal-input value="#ROYAL01" aria-label="Player tag" autocomplete="off" spellcheck="false" />
      <button class="royal-demo__search" data-royal-search type="submit"></button>
    </form>
    <div class="royal-demo__hint" data-royal-hint></div>
    <div class="royal-demo__stage" data-royal-stage aria-live="polite"></div>
  `;

  const stage = royalPreview.querySelector('[data-royal-stage]');
  const form = royalPreview.querySelector('[data-royal-form]');
  const input = royalPreview.querySelector('[data-royal-input]');
  const searchButton = royalPreview.querySelector('[data-royal-search]');
  const badge = royalPreview.querySelector('[data-royal-badge]');
  const hint = royalPreview.querySelector('[data-royal-hint]');
  let royalState = 'empty';

  const demoProfile = {
    tag: '#ROYAL01', name: 'DataKnight', trophies: '8 124', level: '59', clan: 'ETL Legends',
    cards: [
      { name: 'Knight', level: 14, progress: 88 },
      { name: 'Fireball', level: 13, progress: 64 },
      { name: 'Hog Rider', level: 14, progress: 79 },
      { name: 'Tesla', level: 12, progress: 46 }
    ],
    resources: { gold: '1 250 000', elite: '100 000', evolutions: '2' }
  };

  const royalCopy = {
    fr: {
      badge:'Démo locale', search:'Rechercher', searching:'Analyse…',
      hint:'Profil fictif disponible : <code>#ROYAL01</code> · aucune donnée réelle n\'est envoyée.',
      emptyTitle:'Aucun joueur chargé', emptyText:'Lance la recherche avec le tag de démonstration pour afficher un exemple du fonctionnement de Royal Track.',
      loading:'Analyse du profil et calcul de la progression…',
      errorTitle:'Profil de démonstration introuvable', errorText:'Cette version du portfolio contient volontairement un seul profil fictif. Utilise le tag #ROYAL01.',
      profile:'Profil joueur', resources:'Ressources nécessaires', trophies:'Trophées', level:'Niveau', clan:'Clan', reset:'Réinitialiser'
    },
    en: {
      badge:'Local demo', search:'Search', searching:'Analyzing…',
      hint:'Demo profile available: <code>#ROYAL01</code> · no real data is sent.',
      emptyTitle:'No player loaded', emptyText:'Run the search with the demo tag to see an example of how Royal Track works.',
      loading:'Analyzing profile and calculating progression…',
      errorTitle:'Demo profile not found', errorText:'This portfolio version intentionally contains one fictional profile only. Use tag #ROYAL01.',
      profile:'Player profile', resources:'Resources needed', trophies:'Trophies', level:'Level', clan:'Clan', reset:'Reset'
    }
  };

  function renderRoyalEmpty() {
    royalState = 'empty';
    const c = royalCopy[currentLang];
    stage.innerHTML = `<div class="royal-demo__empty"><div><div class="royal-demo__empty-icon">#</div><strong>${c.emptyTitle}</strong><span>${c.emptyText}</span></div></div>`;
  }
  function renderRoyalLoading() {
    royalState = 'loading';
    const c = royalCopy[currentLang];
    stage.innerHTML = `<div class="royal-demo__loading"><div><div class="royal-demo__spinner"></div><span>${c.loading}</span></div></div>`;
  }
  function renderRoyalError() {
    royalState = 'error';
    const c = royalCopy[currentLang];
    stage.innerHTML = `<div class="royal-demo__error"><div><strong>${c.errorTitle}</strong><span>${c.errorText}</span></div></div>`;
  }
  function renderRoyalResult(profile) {
    royalState = 'result';
    const c = royalCopy[currentLang];
    const cards = profile.cards.map((card) => `<div class="royal-demo-card"><div class="royal-demo-card__art" aria-hidden="true"></div><strong>${card.name}</strong><small>Lvl. ${card.level} · ${card.progress}%</small><div class="royal-demo-card__progress"><i style="width:${card.progress}%"></i></div></div>`).join('');
    stage.innerHTML = `
      <div class="royal-demo__result">
        <div class="royal-demo__player">
          <div><span class="royal-demo__player-label">${c.profile} · ${profile.tag}</span><div class="royal-demo__player-name">${profile.name}<span class="royal-demo__demo-pill">DEMO</span></div></div>
          <div class="royal-demo__stats">
            <div class="royal-demo__stat"><b>${profile.trophies}</b><span>${c.trophies}</span></div>
            <div class="royal-demo__stat"><b>${profile.level}</b><span>${c.level}</span></div>
            <div class="royal-demo__stat"><b>${profile.clan}</b><span>${c.clan}</span></div>
          </div>
        </div>
        <div class="royal-demo__dashboard">
          <div class="royal-demo__cards">${cards}</div>
          <div class="royal-demo__resources"><strong>${c.resources}</strong><div class="royal-demo__resource"><span>Gold</span><b>${profile.resources.gold}</b></div><div class="royal-demo__resource"><span>Elite</span><b>${profile.resources.elite}</b></div><div class="royal-demo__resource"><span>Evolutions</span><b>${profile.resources.evolutions}</b></div></div>
        </div>
        <div class="royal-demo__footer"><div class="royal-demo__features"><span>Filters</span><span>Meta Decks</span><span>Progression</span></div><button class="royal-demo__reset" type="button" data-royal-reset>${c.reset}</button></div>
      </div>`;
    stage.querySelector('[data-royal-reset]')?.addEventListener('click', () => { input.value = '#ROYAL01'; renderRoyalEmpty(); input.focus({ preventScroll:true }); });
  }

  refreshRoyalLanguage = () => {
    const c = royalCopy[currentLang];
    badge.textContent = c.badge;
    hint.innerHTML = c.hint;
    searchButton.textContent = searchButton.disabled ? c.searching : c.search;
    if (royalState === 'empty') renderRoyalEmpty();
    else if (royalState === 'loading') renderRoyalLoading();
    else if (royalState === 'error') renderRoyalError();
    else if (royalState === 'result') renderRoyalResult(demoProfile);
  };

  renderRoyalEmpty();
  refreshRoyalLanguage();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const normalizedTag = input.value.trim().replace(/\s+/g, '').toUpperCase();
    if (normalizedTag !== demoProfile.tag) { renderRoyalError(); return; }
    searchButton.disabled = true;
    searchButton.textContent = royalCopy[currentLang].searching;
    renderRoyalLoading();
    window.setTimeout(() => {
      renderRoyalResult(demoProfile);
      searchButton.disabled = false;
      searchButton.textContent = royalCopy[currentLang].search;
    }, 520);
  });
}

// -----------------------------------------------------------------------------
// FR / EN — traduction locale du portfolio
// -----------------------------------------------------------------------------
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/svg+xml';
favicon.href = 'assets/images/favicon-gd.svg';
document.head.appendChild(favicon);

const languageStyle = document.createElement('style');
languageStyle.textContent = `
  .language-switch { display:inline-flex; align-items:center; gap:3px; padding:3px; border:1px solid #dfe7f0; border-radius:999px; background:rgba(255,255,255,.82); box-shadow:0 5px 14px rgba(35,69,110,.05); }
  .language-switch button { min-width:34px; height:30px; padding:0 9px; border:0; border-radius:999px; background:transparent; color:#718096; cursor:pointer; font:800 .72rem/1 "Inter",sans-serif; transition:.2s ease; }
  .language-switch button:hover { color:#245ea6; }
  .language-switch button.active { color:#fff; background:linear-gradient(135deg,#245ea6,#173e70); box-shadow:0 6px 14px rgba(36,94,166,.18); }
  .international-note { margin-top:10px !important; color:#245ea6 !important; font-weight:700; }
  @media(max-width:820px) { .language-switch { margin-top:6px; align-self:flex-start; } }
`;
document.head.appendChild(languageStyle);

const languageSwitch = document.createElement('div');
languageSwitch.className = 'language-switch';
languageSwitch.setAttribute('aria-label', 'Language / Langue');
languageSwitch.innerHTML = '<button type="button" data-lang="fr" class="active">FR</button><button type="button" data-lang="en">EN</button>';
nav?.appendChild(languageSwitch);

function html(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = value;
}
function text(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

const copy = {
  fr: {
    nav:['Expertise','Expérience','Projets','À propos','Contact'],
    heroTitle:'Transformer la donnée en <span>solutions utiles, fiables et lisibles.</span>',
    heroLead:"Data Engineer / BI Developer avec 5 ans d'expérience en data, business intelligence et automatisation. J'interviens de la collecte et de la transformation des données jusqu'à leur restitution dans des outils décisionnels.",
    heroButtons:['Voir mon parcours <span aria-hidden="true">↘</span>','Voir mon CV <span aria-hidden="true">↗</span>'],
    meta:['d\'expérience','IT · Cyber & Data','Anglais'],
    panel:'Profil technique', status:'Disponible pour échanger', stack:'STACK PRINCIPALE', stackText:'Data pipelines, ETL, dashboards, automatisation, APIs et supervision.',
    expHeading:'De la collecte des données au pilotage métier.', expIntro:'Des missions orientées data, BI et automatisation, avec une forte interaction avec les utilisateurs et les équipes métier.',
    c1:"Responsable de bout en bout de la partie data d'un outil de supervision des sauvegardes d'un environnement assurance. Conception de flux ETL avec SSIS pour collecter des données issues de bases et de fichiers CSV, centralisation dans une base locale puis restitution via des dashboards Power BI pour suivre quotidiennement l'état des sauvegardes des serveurs.",
    c2:"Le projet évolue en interaction directe avec les utilisateurs internes : définition du besoin, adaptation des indicateurs, présentations en COPIL et amélioration continue selon une approche agile.",
    perencoCompany:'PERENCO · Londres',
    p1:"Mission réalisée au siège de PERENCO à Londres, dans un environnement de travail international en anglais. Conception de solutions BI destinées aux ingénieurs pétrole pour comparer la production réelle aux baselines et aux prévisions issues des études. Les dashboards permettaient d'analyser la fiabilité des prévisions, de visualiser les écarts entre prévisionnel et réalisé et d'aider les équipes à ajuster leurs baselines.",
    p2:"Travail également sur la qualité des données avec le nettoyage et la fiabilisation d'une base d'inventaire d'objets physiques stockés en entrepôt, puis mise à disposition d'un outil permettant aux utilisateurs de retrouver leur localisation et les modalités de récupération.",
    london:"Une expérience professionnelle vécue à Londres, qui m'a permis de travailler quotidiennement en anglais au sein d'équipes internationales.",
    nge:"Conception de dashboards Power BI pour le suivi des projets de cybersécurité : MFA, SSO, EDR, MDM et gouvernance des accès. Les outils de supervision permettaient d'analyser un environnement pouvant représenter jusqu'à environ 15 000 comptes afin d'identifier les anomalies et de suivre l'avancement des dispositifs de sécurité.",
    luma:"Administration de systèmes et réseaux, déploiement d'infrastructures et mise en place de solutions de supervision. Environnement VMware et Windows Server, déploiement de Zabbix et Grafana, administration réseau Cisco et projets Raspberry Pi pour la supervision d'infrastructures.",
    projectsTitle:'Des projets personnels pour continuer à expérimenter.', projectsIntro:'Développement, data, cybersécurité et mobile : des sujets explorés en dehors des missions professionnelles.',
    clash:"Application React connectée à l'API Clash Royale permettant de rechercher un joueur par tag, suivre la progression de ses cartes, estimer les ressources nécessaires aux améliorations et explorer les meta decks. Le backend Express interroge l'API du jeu et l'application a été déployée sur Ubuntu / DigitalOcean.",
    pentest:'Apprentissage autonome de la cybersécurité offensive au travers de challenges Root Me et des outils Kali Linux.',
    awareness:'Présentation, supports et activités de sensibilisation aux métiers et enjeux de la cybersécurité auprès de lycéens.',
    mobileLabel:'MOBILE · PROJET EN COURS', mobileTitle:'Application mobile de débat — Flutter', mobileText:"Développement d'une application mobile permettant de débattre en ligne autour de sujets politiques. Le projet est actuellement en cours de développement.",
    aboutTitle:'Curiosité technique, autonomie et rigueur.',
    about:"Mon parcours m'a amené des systèmes et de la cybersécurité vers la data, la business intelligence et l'automatisation.<br /><br />J'apprécie particulièrement les projets où il faut comprendre un besoin métier, structurer les données, automatiser leur traitement puis construire une restitution claire et réellement utile aux utilisateurs.<br /><br />Mon expérience à Londres m'a également permis d'évoluer au quotidien dans un environnement professionnel anglophone et international.<br /><br />Curieux et autonome, je continue également à développer des projets personnels afin d'explorer de nouvelles technologies et de conserver une approche pratique du développement.",
    contactTitle:'Un sujet data, BI ou automatisation ?', contactText:"Disponible pour échanger autour d'un CDI, d'une mission, d'un projet freelance ou simplement d'une opportunité intéressante.", cv:'Consulter le CV <span>↗</span>', top:'Retour en haut ↑', current:'Actuel'
  },
  en: {
    nav:['Expertise','Experience','Projects','About','Contact'],
    heroTitle:'Turning data into <span>useful, reliable and readable solutions.</span>',
    heroLead:'Data Engineer / BI Developer with 5 years of experience across data, business intelligence and automation. I work from data collection and transformation through to delivery in decision-support tools.',
    heroButtons:['View my experience <span aria-hidden="true">↘</span>','View my resume <span aria-hidden="true">↗</span>'],
    meta:['of experience','IT · Cyber & Data','English'],
    panel:'Technical profile', status:'Open to opportunities', stack:'CORE STACK', stackText:'Data pipelines, ETL, dashboards, automation, APIs and monitoring.',
    expHeading:'From data collection to business decision-making.', expIntro:'Data, BI and automation-focused roles with strong interaction with users and business teams.',
    c1:'End-to-end ownership of the data side of a backup monitoring solution for an insurance environment. Designed SSIS ETL flows to collect data from databases and CSV files, centralised it in a local database and delivered Power BI dashboards to monitor server backup status on a daily basis.',
    c2:'The product evolves through direct collaboration with internal users: requirements gathering, KPI refinement, steering committee presentations and continuous improvement using an agile approach.',
    perencoCompany:'PERENCO · London',
    p1:'Role based at PERENCO headquarters in London, working in an international English-speaking environment. Designed BI solutions for petroleum engineers to compare actual production with baselines and study forecasts. The dashboards helped assess forecast reliability, visualise gaps between expected and actual production, and support baseline adjustments.',
    p2:'Also worked on data quality by cleaning and improving a physical-asset inventory database, then providing a tool that enabled users to locate stored items and understand how to retrieve them.',
    london:'A professional experience lived in London, where I worked daily in English within international teams.',
    nge:'Designed Power BI dashboards to monitor cybersecurity programmes including MFA, SSO, EDR, MDM and access governance. The monitoring tools covered an environment of up to around 15,000 user accounts, helping identify anomalies and track security programme progress.',
    luma:'Systems and network administration, infrastructure deployment and monitoring solutions. Worked with VMware and Windows Server, deployed Zabbix and Grafana, administered Cisco networking and delivered Raspberry Pi monitoring projects.',
    projectsTitle:'Personal projects to keep experimenting.', projectsIntro:'Development, data, cybersecurity and mobile: topics explored outside professional assignments.',
    clash:'React application connected to the Clash Royale API, allowing users to search a player by tag, track card progression, estimate upgrade resources and explore meta decks. An Express backend queries the game API and the application was deployed on Ubuntu / DigitalOcean.',
    pentest:'Self-directed learning in offensive cybersecurity through Root Me challenges and Kali Linux tools.',
    awareness:'Presentations, materials and awareness activities introducing high-school students to cybersecurity careers and challenges.',
    mobileLabel:'MOBILE · WORK IN PROGRESS', mobileTitle:'Debate mobile app — Flutter', mobileText:'Development of a mobile application designed for online debate around political topics. The project is currently in progress.',
    aboutTitle:'Technical curiosity, autonomy and rigour.',
    about:'My career path took me from systems and cybersecurity into data, business intelligence and automation.<br /><br />I particularly enjoy projects where I need to understand a business need, structure the data, automate its processing and build a clear output that is genuinely useful to users.<br /><br />My experience in London also gave me the opportunity to work every day in an English-speaking, international professional environment.<br /><br />Curious and autonomous, I also keep building personal projects to explore new technologies and maintain a hands-on development approach.',
    contactTitle:'A data, BI or automation project?', contactText:'Open to discussing permanent roles, assignments, freelance projects or simply interesting opportunities.', cv:'View resume <span>↗</span>', top:'Back to top ↑', current:'Current'
  }
};

function applyLanguage(lang) {
  currentLang = lang === 'en' ? 'en' : 'fr';
  const c = copy[currentLang];
  document.documentElement.lang = currentLang;
  document.title = currentLang === 'fr' ? 'Gregory Dourlent — Data Engineer / BI Developer' : 'Gregory Dourlent — Data Engineer / BI Developer';

  const navAnchors = document.querySelectorAll('.main-nav > a');
  c.nav.forEach((label, i) => { if (navAnchors[i]) navAnchors[i].textContent = label; });
  html('.hero h1', c.heroTitle);
  text('.hero-lead', c.heroLead);
  const heroBtns = document.querySelectorAll('.hero-actions .btn');
  if (heroBtns[0]) heroBtns[0].innerHTML = c.heroButtons[0];
  if (heroBtns[1]) heroBtns[1].innerHTML = c.heroButtons[1];
  const meta = document.querySelectorAll('.hero-meta span');
  c.meta.forEach((v,i)=>{ if(meta[i]) meta[i].textContent=v; });
  text('.panel-topline > span:first-child', c.panel);
  const status = document.querySelector('.status');
  if (status) status.innerHTML = '<i></i> ' + c.status;
  text('.hero-card-copy .mini-label', c.stack);
  text('.hero-card-copy p:last-child', c.stackText);

  html('#experience .section-heading h2', c.expHeading);
  text('#experience .section-heading > p', c.expIntro);
  const experiences = document.querySelectorAll('#experience .timeline-item');
  if (experiences[0]) {
    const ps = experiences[0].querySelectorAll('.timeline-content > p');
    if (ps[0]) ps[0].textContent = c.c1;
    if (ps[1]) ps[1].textContent = c.c2;
    const pill = experiences[0].querySelector('.pill'); if (pill) pill.textContent = c.current;
  }
  if (experiences[1]) {
    const company = experiences[1].querySelector('.company'); if (company) company.textContent = c.perencoCompany;
    const ps = experiences[1].querySelectorAll('.timeline-content > p');
    if (ps[0]) ps[0].textContent = c.p1;
    if (ps[1]) ps[1].textContent = c.p2;
    let note = experiences[1].querySelector('.international-note');
    if (!note) { note = document.createElement('p'); note.className='international-note'; experiences[1].querySelector('.timeline-content')?.insertBefore(note, experiences[1].querySelector('.tags')); }
    note.textContent = c.london;
  }
  if (experiences[2]) { const p=experiences[2].querySelector('.timeline-content > p'); if(p) p.textContent=c.nge; }
  if (experiences[3]) { const p=experiences[3].querySelector('.timeline-content > p'); if(p) p.textContent=c.luma; }

  html('#projects .section-heading h2', c.projectsTitle);
  text('#projects .section-heading > p', c.projectsIntro);
  const projectCards = document.querySelectorAll('#projects .project-card');
  if (projectCards[0]) { const p=projectCards[0].querySelector('.project-body p:not(.mini-label)'); if(p) p.textContent=c.clash; }
  if (projectCards[1]) { const p=projectCards[1].querySelector('p:not(.mini-label)'); if(p) p.textContent=c.pentest; }
  if (projectCards[2]) { const p=projectCards[2].querySelector('p:not(.mini-label)'); if(p) p.textContent=c.awareness; }
  if (projectCards[3]) {
    text('#projects .project-card:nth-child(4) .mini-label', c.mobileLabel);
    text('#projects .project-card:nth-child(4) h3', c.mobileTitle);
    const p=projectCards[3].querySelector('p:not(.mini-label)'); if(p) p.textContent=c.mobileText;
  }

  html('#about .about-intro h2', c.aboutTitle);
  html('#about .about-copy > p', c.about);
  html('#contact .contact-card h2', c.contactTitle);
  text('#contact .contact-card > div:first-child > p:last-child', c.contactText);
  const cvLink = document.querySelector('#contact .contact-text-link'); if (cvLink) cvLink.innerHTML = c.cv;
  const top = document.querySelector('[data-scroll-top]'); if (top) top.textContent = c.top;

  document.querySelectorAll('.language-switch button').forEach((button) => button.classList.toggle('active', button.dataset.lang === currentLang));
  refreshRoyalLanguage();
  try { localStorage.setItem('portfolio-lang', currentLang); } catch (_) {}
}

languageSwitch.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});

let initialLang = 'fr';
try {
  const saved = localStorage.getItem('portfolio-lang');
  if (saved === 'fr' || saved === 'en') initialLang = saved;
} catch (_) {}
applyLanguage(initialLang);

document.getElementById('year').textContent = new Date().getFullYear();
