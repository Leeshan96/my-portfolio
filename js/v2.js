/**
 * V2 — Interactions
 * Standalone Motion library (motion.dev) for all animation.
 * Same engine as Framer Motion, works without React.
 */

import { animate, inView, stagger } from
  'https://cdn.jsdelivr.net/npm/motion@11/dist/motion.js';


/* ============================================================
   CUSTOM CURSOR
   Lerp-tracked dot: #252422 at rest → #D64933 + large on hover
   ============================================================ */

function initCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  let mouseX = 0, mouseY = 0;
  let posX   = 0, posY   = 0;
  const LERP = 0.13;

  /* First move: show cursor and start RAF loop */
  document.addEventListener('mousemove', function onFirst(e) {
    mouseX = posX = e.clientX;
    mouseY = posY = e.clientY;
    cursor.style.left = posX + 'px';
    cursor.style.top  = posY + 'px';
    cursor.classList.add('is-visible');
    document.body.classList.add('custom-cursor');
    document.addEventListener('mousemove', onMove);
    requestAnimationFrame(tick);
    document.removeEventListener('mousemove', onFirst);
  });

  function onMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function tick() {
    posX += (mouseX - posX) * LERP;
    posY += (mouseY - posY) * LERP;
    cursor.style.left = posX + 'px';
    cursor.style.top  = posY + 'px';
    requestAnimationFrame(tick);
  }

  /* Hover state — grows and shifts to accent */
  const targets = 'a, button, [role="button"], .cs-tile';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(targets)) cursor.classList.add('is-hovering');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(targets)) cursor.classList.remove('is-hovering');
  });

  /* Press shrink */
  document.addEventListener('mousedown', () => cursor.classList.add('is-pressing'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('is-pressing'));

  /* Hide when window loses focus */
  document.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
  document.addEventListener('mouseenter', () => cursor.classList.add('is-visible'));
}


/* ============================================================
   HERO ENTRANCE — cinematic staggered fade-up
   Sequence: eyebrow → name → tagline → cta (visual overlaps)
   ============================================================ */

function initHeroEntrance() {
  /* CSS already sets opacity: 0 on these elements.
     Motion animates from the keyframe array [from, to]. */
  const ease = [0.16, 1, 0.3, 1]; /* expo out — cinematic */

  /* Short delay to let paint settle, then sequence */
  setTimeout(() => {
    animate([
      /* 1. Eyebrow */
      ['.hero__eyebrow',
        { opacity: [0, 1], y: [14, 0] },
        { duration: 0.6, easing: ease }],

      /* 2. Name — the hero moment */
      ['.hero__name',
        { opacity: [0, 1], y: [48, 0] },
        { duration: 1.1, easing: ease, at: '+0.06' }],

      /* 3. Tagline */
      ['.hero__tagline',
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.65, easing: ease, at: '+0.20' }],

      /* 4. CTA */
      ['.hero__cta',
        { opacity: [0, 1], y: [14, 0] },
        { duration: 0.5, easing: ease, at: '+0.14' }],

      /* 5. Visual — starts while name is still animating */
      ['.hero__visual',
        { opacity: [0, 1], x: [28, 0] },
        { duration: 0.85, easing: ease, at: '-0.6' }],
    ]);
  }, 60);
}


/* ============================================================
   SECTION LABEL — word-by-word scroll reveal
   ============================================================ */

function initSectionReveal() {
  const label = document.querySelector('.section-label');
  if (!label) return;

  /* Split into word spans */
  const words = label.textContent.trim().split(/\s+/);
  label.innerHTML = words
    .map(w => `<span class="word" style="display:inline-block">${w}</span>`)
    .join(' ');

  const wordEls = label.querySelectorAll('.word');

  /* Set initial hidden state */
  wordEls.forEach(w => { w.style.opacity = '0'; w.style.transform = 'translateY(10px)'; });

  inView(label, () => {
    animate(
      wordEls,
      { opacity: [0, 1], y: [10, 0] },
      {
        duration: 0.45,
        delay: stagger(0.08),
        easing: [0.25, 0.46, 0.45, 0.94],
      }
    );
  }, { amount: 0.8 });
}


/* ============================================================
   CARD REVEAL — staggered fade-up on scroll
   ============================================================ */

function initCardReveal() {
  const cards = document.querySelectorAll('.cs-tile');
  if (!cards.length) return;

  /* Set initial hidden state immediately (before paint) */
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
  });

  /* Observe each card, stagger by index */
  cards.forEach((card, i) => {
    inView(card, () => {
      animate(
        card,
        { opacity: [0, 1], y: [28, 0] },
        {
          duration: 0.65,
          delay: i * 0.09,
          easing: [0.25, 0.46, 0.45, 0.94],
        }
      );
    }, { amount: 0.12 });
  });
}


/* ============================================================
   MOBILE NAV
   ============================================================ */

function initMobileNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const drawer    = document.querySelector('.nav__drawer');
  if (!hamburger || !drawer) return;

  function close() {
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const open = hamburger.getAttribute('aria-expanded') === 'true';
    if (open) {
      close();
    } else {
      hamburger.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  });

  drawer.querySelectorAll('.nav__drawer-link').forEach(l => l.addEventListener('click', close));

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav') && !e.target.closest('.nav__drawer')) close();
  });
}


/* ============================================================
   INIT
   ============================================================ */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

function boot() {
  initCursor();
  initHeroEntrance();
  initSectionReveal();
  initCardReveal();
  initMobileNav();
}
