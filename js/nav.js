/* ── Navigation: mobile hamburger + drawer ── */

const hamburger = document.querySelector('.nav-hamburger');
const drawer    = document.querySelector('.nav-mobile-drawer');

if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    drawer.classList.toggle('is-open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  /* Close drawer when a link is tapped */
  drawer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  /* Close on outside click */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-nav') && !e.target.closest('.nav-mobile-drawer')) {
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}
