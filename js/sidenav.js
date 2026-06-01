/* ── Case study sidenav: active link tracking ── */

const sections = document.querySelectorAll('.case-study-content section[id]');
const navLinks = document.querySelectorAll('.sidenav-link');

if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('is-active'));
        const active = document.querySelector(`.sidenav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('is-active');
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}
