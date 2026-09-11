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
// Le portfolio embarque volontairement un unique profil fictif afin de montrer
// le parcours utilisateur de l'application originale.
// -----------------------------------------------------------------------------
const royalPreview = document.querySelector('.royal-preview');

if (royalPreview) {
  const royalDemoStyle = document.createElement('style');
  royalDemoStyle.textContent = `
    .royal-preview.royal-demo {
      min-height: 302px;
      background: rgba(255,255,255,.98);
    }
    .royal-demo * { box-sizing: border-box; }
    .royal-demo__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 13px 16px 11px;
      border-bottom: 1px solid #e8eef5;
      background: linear-gradient(180deg, #fff, #fbfdff);
    }
    .royal-demo__brand strong {
      display: block;
      color: #173e70;
      font: 800 .84rem/1 "Manrope", sans-serif;
      letter-spacing: .08em;
    }
    .royal-demo__brand small {
      color: #7b899a;
      font-size: .58rem;
    }
    .royal-demo__badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 8px;
      border-radius: 999px;
      background: #eef5fc;
      color: #245ea6;
      font-size: .54rem;
      font-weight: 800;
      white-space: nowrap;
    }
    .royal-demo__badge::before {
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #4d9d6a;
      box-shadow: 0 0 0 3px rgba(77,157,106,.12);
    }
    .royal-demo__form {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 7px;
      padding: 10px 16px;
    }
    .royal-demo__input {
      width: 100%;
      min-width: 0;
      min-height: 31px;
      padding: 0 10px;
      border: 1px solid #d9e3ee;
      border-radius: 7px;
      outline: none;
      background: #f8fafc;
      color: #2e4055;
      font: 700 .61rem/1 "Inter", sans-serif;
      transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
    }
    .royal-demo__input:focus {
      border-color: #7da6d5;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(36,94,166,.10);
    }
    .royal-demo__search,
    .royal-demo__reset {
      border: 0;
      cursor: pointer;
      font-family: "Inter", sans-serif;
      font-weight: 800;
      transition: transform .18s ease, opacity .18s ease;
    }
    .royal-demo__search:hover,
    .royal-demo__reset:hover { transform: translateY(-1px); }
    .royal-demo__search {
      min-height: 31px;
      padding: 0 11px;
      border-radius: 7px;
      color: #fff;
      background: linear-gradient(135deg, #2e6db7, #174878);
      font-size: .58rem;
      box-shadow: 0 6px 13px rgba(36,94,166,.18);
    }
    .royal-demo__search:disabled {
      cursor: wait;
      opacity: .72;
      transform: none;
    }
    .royal-demo__hint {
      padding: 0 16px 8px;
      color: #8190a2;
      font-size: .49rem;
    }
    .royal-demo__hint code {
      color: #245ea6;
      font: 800 .52rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    }
    .royal-demo__stage {
      position: relative;
      min-height: 185px;
      padding: 0 16px 13px;
    }
    .royal-demo__empty,
    .royal-demo__loading,
    .royal-demo__error {
      min-height: 170px;
      display: grid;
      place-items: center;
      text-align: center;
      border: 1px dashed #dbe5ef;
      border-radius: 10px;
      background: linear-gradient(145deg, #fbfdff, #f4f8fc);
      padding: 18px;
    }
    .royal-demo__empty-icon {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      margin: 0 auto 9px;
      border-radius: 11px;
      background: #eaf2fb;
      color: #245ea6;
      font: 800 1rem/1 "Manrope", sans-serif;
    }
    .royal-demo__empty strong,
    .royal-demo__error strong {
      display: block;
      margin-bottom: 4px;
      color: #31445a;
      font-size: .67rem;
    }
    .royal-demo__empty span,
    .royal-demo__error span {
      display: block;
      max-width: 310px;
      color: #8492a3;
      font-size: .52rem;
      line-height: 1.45;
    }
    .royal-demo__error {
      border-color: #efd7d7;
      background: #fffafa;
    }
    .royal-demo__error strong { color: #9a4a4a; }
    .royal-demo__spinner {
      width: 24px;
      height: 24px;
      margin: 0 auto 9px;
      border: 3px solid #dce8f5;
      border-top-color: #245ea6;
      border-radius: 50%;
      animation: royalSpin .7s linear infinite;
    }
    .royal-demo__loading span {
      color: #718297;
      font-size: .54rem;
      font-weight: 700;
    }
    @keyframes royalSpin { to { transform: rotate(360deg); } }
    @keyframes royalReveal {
      from { opacity: 0; transform: translateY(7px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .royal-demo__result { animation: royalReveal .35s ease both; }
    .royal-demo__player {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 10px;
      align-items: center;
      padding: 10px 11px;
      margin-bottom: 9px;
      border: 1px solid #e1eaf3;
      border-radius: 10px;
      background:
        radial-gradient(circle at 90% 0%, rgba(105,158,218,.15), transparent 35%),
        linear-gradient(135deg, #fbfdff, #f1f6fb);
    }
    .royal-demo__player-label {
      display: block;
      margin-bottom: 1px;
      color: #8695a6;
      font-size: .46rem;
      font-weight: 800;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    .royal-demo__player-name {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #263a50;
      font: 800 .73rem/1.2 "Manrope", sans-serif;
    }
    .royal-demo__demo-pill {
      padding: 3px 5px;
      border-radius: 999px;
      background: #eaf2fb;
      color: #245ea6;
      font: 800 .42rem/1 "Inter", sans-serif;
      letter-spacing: .03em;
    }
    .royal-demo__stats {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .royal-demo__stat {
      min-width: 50px;
      padding: 5px 6px;
      border: 1px solid #e1e8f0;
      border-radius: 7px;
      background: rgba(255,255,255,.86);
      text-align: center;
    }
    .royal-demo__stat b {
      display: block;
      color: #28445f;
      font-size: .53rem;
      line-height: 1.1;
    }
    .royal-demo__stat span {
      display: block;
      margin-top: 2px;
      color: #8a98a8;
      font-size: .4rem;
      text-transform: uppercase;
    }
    .royal-demo__dashboard {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 118px;
      gap: 9px;
    }
    .royal-demo__cards {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 6px;
    }
    .royal-demo-card {
      min-width: 0;
      padding: 6px;
      border: 1px solid #dfe7f0;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 3px 10px rgba(43,76,112,.035);
    }
    .royal-demo-card__art {
      position: relative;
      height: 35px;
      margin-bottom: 5px;
      overflow: hidden;
      border-radius: 6px;
      background: linear-gradient(145deg, #6e9fda, #2c568c);
    }
    .royal-demo-card:nth-child(2) .royal-demo-card__art { background: linear-gradient(145deg, #d68c62, #94472d); }
    .royal-demo-card:nth-child(3) .royal-demo-card__art { background: linear-gradient(145deg, #8a7bd0, #514487); }
    .royal-demo-card:nth-child(4) .royal-demo-card__art { background: linear-gradient(145deg, #75aa88, #3b684b); }
    .royal-demo-card__art::before,
    .royal-demo-card__art::after {
      content: "";
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,.18);
    }
    .royal-demo-card__art::before { width: 31px; height: 31px; right: -7px; top: -8px; }
    .royal-demo-card__art::after { width: 17px; height: 17px; left: 7px; bottom: 5px; }
    .royal-demo-card strong {
      display: block;
      overflow: hidden;
      color: #34465a;
      font-size: .48rem;
      line-height: 1.2;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .royal-demo-card small {
      display: block;
      margin-top: 2px;
      color: #8a97a6;
      font-size: .41rem;
    }
    .royal-demo-card__progress {
      height: 4px;
      margin-top: 5px;
      overflow: hidden;
      border-radius: 999px;
      background: #e9eef4;
    }
    .royal-demo-card__progress i {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #4b9768, #6dbb88);
    }
    .royal-demo__resources {
      padding: 9px;
      border-radius: 9px;
      background: linear-gradient(145deg, #123661, #0d284a);
      color: #e5eef8;
      box-shadow: 0 8px 16px rgba(16,47,88,.12);
    }
    .royal-demo__resources > strong {
      display: block;
      margin-bottom: 6px;
      font-size: .5rem;
      letter-spacing: .06em;
      text-transform: uppercase;
    }
    .royal-demo__resource {
      display: flex;
      justify-content: space-between;
      gap: 6px;
      padding: 5px 0;
      border-top: 1px solid rgba(255,255,255,.09);
      font-size: .44rem;
    }
    .royal-demo__resource:first-of-type { border-top: 0; }
    .royal-demo__resource b { color: #fff; }
    .royal-demo__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
    .royal-demo__features {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .royal-demo__features span {
      padding: 4px 6px;
      border: 1px solid #e1e8f0;
      border-radius: 6px;
      background: #f8fafc;
      color: #69798d;
      font-size: .42rem;
      font-weight: 800;
    }
    .royal-demo__reset {
      padding: 4px 7px;
      border-radius: 6px;
      background: transparent;
      color: #718196;
      font-size: .43rem;
    }
    @media (max-width: 620px) {
      .royal-demo__header { padding: 11px 12px 9px; }
      .royal-demo__badge { font-size: .49rem; }
      .royal-demo__form { padding: 9px 12px; }
      .royal-demo__hint { padding: 0 12px 7px; }
      .royal-demo__stage { min-height: 224px; padding: 0 12px 12px; }
      .royal-demo__empty,
      .royal-demo__loading,
      .royal-demo__error { min-height: 208px; }
      .royal-demo__player {
        grid-template-columns: 1fr;
        align-items: start;
      }
      .royal-demo__stats { justify-content: flex-start; }
      .royal-demo__stat { min-width: 48px; }
      .royal-demo__dashboard { grid-template-columns: 1fr; }
      .royal-demo__cards { gap: 4px; }
      .royal-demo-card { padding: 4px; }
      .royal-demo-card__art { height: 31px; }
      .royal-demo__resources {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 5px;
        padding: 7px;
      }
      .royal-demo__resources > strong { grid-column: 1 / -1; margin: 0; }
      .royal-demo__resource {
        display: block;
        padding: 4px;
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 5px;
      }
      .royal-demo__resource b { display: block; margin-top: 2px; }
      .royal-demo__footer { align-items: flex-start; }
      .royal-demo__reset { flex: 0 0 auto; }
    }
    @media (prefers-reduced-motion: reduce) {
      .royal-demo__spinner { animation: none; }
      .royal-demo__result { animation: none; }
    }
  `;
  document.head.appendChild(royalDemoStyle);

  royalPreview.classList.add('royal-demo');
  royalPreview.innerHTML = `
    <div class="royal-demo__header">
      <div class="royal-demo__brand">
        <strong>ROYAL TRACK</strong>
        <small>Track your progression!</small>
      </div>
      <span class="royal-demo__badge">Démo locale</span>
    </div>
    <form class="royal-demo__form" data-royal-form>
      <input class="royal-demo__input" data-royal-input value="#ROYAL01" aria-label="Player tag de démonstration" autocomplete="off" spellcheck="false" />
      <button class="royal-demo__search" data-royal-search type="submit">Rechercher</button>
    </form>
    <div class="royal-demo__hint">Profil fictif disponible : <code>#ROYAL01</code> · aucune donnée réelle n'est envoyée.</div>
    <div class="royal-demo__stage" data-royal-stage aria-live="polite"></div>
  `;

  const stage = royalPreview.querySelector('[data-royal-stage]');
  const form = royalPreview.querySelector('[data-royal-form]');
  const input = royalPreview.querySelector('[data-royal-input]');
  const searchButton = royalPreview.querySelector('[data-royal-search]');

  const demoProfile = {
    tag: '#ROYAL01',
    name: 'DataKnight',
    trophies: '8 124',
    level: '59',
    clan: 'ETL Legends',
    cards: [
      { name: 'Knight', level: 14, progress: 88 },
      { name: 'Fireball', level: 13, progress: 64 },
      { name: 'Hog Rider', level: 14, progress: 79 },
      { name: 'Tesla', level: 12, progress: 46 }
    ],
    resources: {
      gold: '1 250 000',
      elite: '100 000',
      evolutions: '2'
    }
  };

  function renderRoyalEmpty() {
    stage.innerHTML = `
      <div class="royal-demo__empty">
        <div>
          <div class="royal-demo__empty-icon">#</div>
          <strong>Aucun joueur chargé</strong>
          <span>Lance la recherche avec le tag de démonstration pour afficher un exemple du fonctionnement de Royal Track.</span>
        </div>
      </div>
    `;
  }

  function renderRoyalLoading() {
    stage.innerHTML = `
      <div class="royal-demo__loading">
        <div>
          <div class="royal-demo__spinner"></div>
          <span>Analyse du profil et calcul de la progression…</span>
        </div>
      </div>
    `;
  }

  function renderRoyalError() {
    stage.innerHTML = `
      <div class="royal-demo__error">
        <div>
          <strong>Profil de démonstration introuvable</strong>
          <span>Cette version du portfolio contient volontairement un seul profil fictif. Utilise le tag #ROYAL01.</span>
        </div>
      </div>
    `;
  }

  function renderRoyalResult(profile) {
    const cards = profile.cards.map((card) => `
      <div class="royal-demo-card">
        <div class="royal-demo-card__art" aria-hidden="true"></div>
        <strong>${card.name}</strong>
        <small>Lvl. ${card.level} · ${card.progress}%</small>
        <div class="royal-demo-card__progress" aria-label="Progression ${card.progress}%"><i style="width:${card.progress}%"></i></div>
      </div>
    `).join('');

    stage.innerHTML = `
      <div class="royal-demo__result">
        <div class="royal-demo__player">
          <div>
            <span class="royal-demo__player-label">Player profile · ${profile.tag}</span>
            <div class="royal-demo__player-name">${profile.name}<span class="royal-demo__demo-pill">DEMO</span></div>
          </div>
          <div class="royal-demo__stats">
            <div class="royal-demo__stat"><b>${profile.trophies}</b><span>Trophies</span></div>
            <div class="royal-demo__stat"><b>${profile.level}</b><span>Level</span></div>
            <div class="royal-demo__stat"><b>${profile.clan}</b><span>Clan</span></div>
          </div>
        </div>
        <div class="royal-demo__dashboard">
          <div class="royal-demo__cards">${cards}</div>
          <div class="royal-demo__resources">
            <strong>Resources needed</strong>
            <div class="royal-demo__resource"><span>Gold</span><b>${profile.resources.gold}</b></div>
            <div class="royal-demo__resource"><span>Elite</span><b>${profile.resources.elite}</b></div>
            <div class="royal-demo__resource"><span>Evolutions</span><b>${profile.resources.evolutions}</b></div>
          </div>
        </div>
        <div class="royal-demo__footer">
          <div class="royal-demo__features"><span>Filters</span><span>Meta Decks</span><span>Progression</span></div>
          <button class="royal-demo__reset" type="button" data-royal-reset>Réinitialiser</button>
        </div>
      </div>
    `;

    stage.querySelector('[data-royal-reset]')?.addEventListener('click', () => {
      input.value = '#ROYAL01';
      renderRoyalEmpty();
      input.focus({ preventScroll: true });
    });
  }

  renderRoyalEmpty();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const normalizedTag = input.value.trim().replace(/\s+/g, '').toUpperCase();

    if (normalizedTag !== demoProfile.tag) {
      renderRoyalError();
      return;
    }

    searchButton.disabled = true;
    searchButton.textContent = 'Analyse…';
    renderRoyalLoading();

    window.setTimeout(() => {
      renderRoyalResult(demoProfile);
      searchButton.disabled = false;
      searchButton.textContent = 'Rechercher';
    }, 520);
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
