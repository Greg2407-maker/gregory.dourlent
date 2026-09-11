const mobileHeroFix = document.createElement('style');
mobileHeroFix.textContent = `
@media (max-width: 820px) {
  .hero-panel {
    min-height: auto;
  }

  .code-card {
    position: relative;
    inset: auto;
    width: 100%;
    margin-top: 24px;
  }
}

@media (max-width: 620px) {
  .code-card {
    grid-template-columns: 22px minmax(0, 1fr);
    gap: 8px 10px;
    padding: 14px 15px;
    font-size: .67rem;
  }

  .code-card code {
    white-space: normal;
    overflow-wrap: anywhere;
  }
}
`;
document.head.appendChild(mobileHeroFix);

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

const portrait = document.querySelector('.hero-panel img[alt="Portrait professionnel de Gregory Dourlent"]');
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
    background: '#dbe7f4'
  });
  Object.assign(portrait.style, {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: '50% 30%'
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
