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

document.getElementById('year').textContent = new Date().getFullYear();
