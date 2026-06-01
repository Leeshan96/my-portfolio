import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/PageWrapper';
import '../css/about.css';

const adventurePhotos = [
  { src: '/assets/images/IMG_Asahidake.webp', alt: 'Hiking on snowy slopes at Asahidake, Japan' },
  { src: '/assets/images/IMG_1384.webp',      alt: 'Sunset over mountains' },
  { src: '/assets/images/IMG_0669.webp',      alt: 'Calm water at dusk' },
  { src: '/assets/images/IMG_2140.webp',      alt: 'Standing at a volcanic crater lake' },
  { src: '/assets/images/IMG_0754.webp',      alt: 'Cape Reinga lighthouse, New Zealand' },
];

/* ── Adventures draggable grid ── */
function AdventuresGrid({ photos }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.polaroid-card'));

    /*
     * Positions as % of available space (gridW - cardW, gridH - cardH).
     * Five zones spread evenly left→right with varied vertical stagger.
     */
    const initialPositions = [
      { left: 3,  top: 30 },
      { left: 23, top: 52 },
      { left: 43, top: 28 },
      { left: 63, top: 48 },
      { left: 83, top: 35 },
    ];

    /* Place cards after the browser has finished layout so dimensions are real */
    const frame = requestAnimationFrame(() => {
      const gridW = grid.offsetWidth;
      const gridH = grid.offsetHeight;

      cards.forEach((card, i) => {
        const rotation = (Math.random() - 0.5) * 16; // -8deg to +8deg
        card.dataset.rotation = rotation;
        card.dataset.zIndex   = String(i + 1);
        card.style.zIndex     = String(i + 1);

        const cardW   = card.offsetWidth;
        const cardH   = card.offsetHeight;
        const maxLeft = Math.max(0, gridW - cardW);
        const maxTop  = Math.max(0, gridH - cardH);

        const pos  = initialPositions[i];
        const left = maxLeft * (pos.left / 100);
        const top  = maxTop  * (pos.top  / 100);

        card.style.left      = `${left}px`;
        card.style.top       = `${top}px`;
        card.style.transform = `rotate(${rotation}deg)`;
      });
    });

    /* ── Drag state ── */
    let dragging  = null;
    let offsetX   = 0;
    let offsetY   = 0;
    let topZ      = cards.length;

    function getRotation(card) {
      return parseFloat(card.dataset.rotation || '0');
    }

    function startDrag(card, clientX, clientY) {
      dragging = card;
      topZ += 1;
      card.style.zIndex    = String(topZ);
      card.dataset.zIndex  = String(topZ);

      const rot = getRotation(card);
      card.style.transform = `rotate(${rot}deg) scale(1.05)`;
      card.style.cursor    = 'grabbing';

      const rect = card.getBoundingClientRect();
      offsetX = clientX - rect.left;
      offsetY = clientY - rect.top;
    }

    function moveDrag(clientX, clientY) {
      if (!dragging) return;
      const gridRect = grid.getBoundingClientRect();
      const cardW    = dragging.offsetWidth;
      const cardH    = dragging.offsetHeight;

      let newLeft = clientX - gridRect.left - offsetX;
      let newTop  = clientY - gridRect.top  - offsetY;

      newLeft = Math.max(0, Math.min(gridRect.width  - cardW, newLeft));
      newTop  = Math.max(0, Math.min(gridRect.height - cardH, newTop));

      dragging.style.left = `${newLeft}px`;
      dragging.style.top  = `${newTop}px`;
    }

    function endDrag() {
      if (!dragging) return;
      const rot = getRotation(dragging);
      dragging.style.transform = `rotate(${rot}deg)`;
      dragging.style.cursor    = 'grab';
      dragging = null;
    }

    /* Mouse events */
    function onMouseDown(e) {
      e.preventDefault();
      startDrag(e.currentTarget, e.clientX, e.clientY);
    }
    function onMouseMove(e) { moveDrag(e.clientX, e.clientY); }
    function onMouseUp()    { endDrag(); }

    /* Touch events */
    function onTouchStart(e) {
      const t = e.touches[0];
      startDrag(e.currentTarget, t.clientX, t.clientY);
    }
    function onTouchMove(e) {
      e.preventDefault();
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
    }
    function onTouchEnd() { endDrag(); }

    cards.forEach(card => {
      card.style.cursor = 'grab';
      card.addEventListener('mousedown',  onMouseDown);
      card.addEventListener('touchstart', onTouchStart, { passive: false });
      card.addEventListener('touchmove',  onTouchMove,  { passive: false });
      card.addEventListener('touchend',   onTouchEnd);
    });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup',   onMouseUp);

    return () => {
      cancelAnimationFrame(frame);
      cards.forEach(card => {
        card.removeEventListener('mousedown',  onMouseDown);
        card.removeEventListener('touchstart', onTouchStart);
        card.removeEventListener('touchmove',  onTouchMove);
        card.removeEventListener('touchend',   onTouchEnd);
      });
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup',   onMouseUp);
    };
  }, []);

  return (
    /* Outer wrapper — full-width drag boundary, white margin area */
    <div className="adventures-outer" ref={gridRef}>
      {/* Inner grid — smaller, centered, Grid.png background */}
      <div className="adventures-grid" aria-hidden="true" />
      {/* Cards are children of the outer wrapper so they can overlap the white margin */}
      {photos.map((photo, i) => (
        <div key={i} className="polaroid-card">
          <img src="/assets/images/Tape.svg" alt="" className="polaroid-tape" aria-hidden="true" />
          <img src={photo.src} alt={photo.alt} className="polaroid-photo" loading="lazy" draggable="false" />
        </div>
      ))}
    </div>
  );
}

const bookImages = [
  { src: '/assets/images/before-the-coffee-gets-cold.png', alt: 'Before the Coffee Gets Cold by Toshikazu Kawaguchi' },
  { src: '/assets/images/how-to-think-like-a-roman-emperor.png', alt: 'How to Think Like a Roman Emperor by Donald Robertson' },
  { src: '/assets/images/how-do-you-live.png', alt: 'How Do You Live by Yoshino Genzaburo' },
  { src: '/assets/images/project-hail-mary.png', alt: 'Project Hail Mary by Andy Weir' },
  { src: '/assets/images/sapiens.png', alt: 'Sapiens: A Brief History of Humankind by Yuval Noah Harari' },
];

const craftImages = [
  { src: '/assets/images/craft-1.webp', alt: 'Pottery — handbuilt cup drying on shelf' },
  { src: '/assets/images/craft-2.webp', alt: 'Pottery — collection of wheel-thrown pieces' },
  { src: '/assets/images/craft-3.webp', alt: 'Pottery — finished glazed cup' },
  { src: '/assets/images/craft-4.webp', alt: 'Floristry — flower arrangement' },
  { src: '/assets/images/craft-5.webp', alt: 'Illustration — botanical sketches in notebook' },
  { src: '/assets/images/craft-6.webp', alt: 'Illustration — botanical sketches closeup' },
];

export default function About() {
  return (
    <PageWrapper>
      <main>

        {/* ── Hero / Intro ── */}
        <section className="about-hero" aria-label="Introduction">
          <div className="about-hero__inner">

            <img
              src="/assets/images/about-hero.webp"
              alt="Lee Shan"
              className="about-hero__photo"
            />

            <div className="about-hero__text">
              <h1 className="about-hero__headline">
                Designer. Learner. Builder.
              </h1>

              <p className="about-hero__body">
                Hi! I'm Lee Shan. I'm a product designer drawn to complex problems, and building meaningful products, where good design can genuinely bring a positive impact.
              </p>

              <p className="about-hero__body">
                I have a background in Business and Management, and started off in healthcare procurement. Realising I care most about problems that sit at the intersection of complexity and real human need, I made the shift into product design. So I think about people and systems before pixels.
              </p>

              <p className="about-hero__body">
                During my 5-9, you'll find me following along to Pilates videos on YouTube, halfway through a book I bought on impulse, or attempting a craft project that's more ambitious than my skill level.
              </p>
            </div>

          </div>
        </section>

        {/* ── Divider ── */}
        <div className="about-divider-wrap">
          <hr className="about-divider" />
        </div>

        {/* ── Skills & Stacks ── */}
        <section className="about-skills" aria-label="Skills and stacks">
          <div className="about-skills-inner">

            <motion.h2
              className="about-skills-title"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Skills &amp; Stacks
            </motion.h2>

            <div className="skills-grid">

              {/* Skills — two internal sub-columns */}
              <motion.div
                className="skills-col skills-col--wide"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              >
                <h3 className="skills-col__heading">Skills</h3>
                <div className="skills-list-two-col">
                  <ul className="skills-list">
                    <li>User research</li>
                    <li>Design systems</li>
                    <li>Information architecture</li>
                    <li>User flows</li>
                  </ul>
                  <ul className="skills-list">
                    <li>Hi-fi prototyping</li>
                    <li>Usability testing</li>
                    <li>Surveys</li>
                    <li>Vibe coding</li>
                  </ul>
                </div>
              </motion.div>

              {/* Stack */}
              <motion.div
                className="skills-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              >
                <h3 className="skills-col__heading">Stack</h3>
                <ul className="skills-list">
                  <li>Figma</li>
                  <li>Miro</li>
                  <li>Framer</li>
                  <li>Notion</li>
                </ul>
              </motion.div>

              {/* AI Tools */}
              <motion.div
                className="skills-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
              >
                <h3 className="skills-col__heading">AI Tools</h3>
                <ul className="skills-list">
                  <li>Claude Code</li>
                  <li>Lovable</li>
                </ul>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── What I've Been Reading ── */}
        <section className="about-reads" aria-label="What I've been reading">
          <div className="about-reads-inner">

            <motion.h2
              className="about-reads-title"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              What I've been reading...
            </motion.h2>

            <div className="books-cluster">
              {bookImages.map((book, i) => (
                <img
                  key={i}
                  src={book.src}
                  alt={book.alt}
                  className="book-img"
                  loading="lazy"
                />
              ))}
            </div>

          </div>
        </section>

        {/* ── My Crafts ── */}
        <section className="about-crafts" aria-label="My crafts">
          <div className="about-crafts-inner">

            <motion.h2
              className="about-crafts-title"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              My crafts
            </motion.h2>

            {/* overflow:hidden on the inner container clips the marquee to the content width */}
            <div className="crafts-marquee">
              <div className="crafts-track">
                {/* Set 1 */}
                {craftImages.map((img, i) => (
                  <img key={`a-${i}`} src={img.src} alt={img.alt} className="craft-img" loading="lazy" />
                ))}
                {/* Set 2 — duplicate for seamless loop */}
                {craftImages.map((img, i) => (
                  <img key={`b-${i}`} src={img.src} alt={img.alt} className="craft-img" loading="lazy" aria-hidden="true" />
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── My Adventures ── */}
        <section className="about-adventures" aria-label="My adventures">
          <div className="about-adventures-inner">

            <motion.h2
              className="about-adventures-title"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              My adventures
            </motion.h2>

            <motion.p
              className="about-adventures-sub"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
            >
              I love exploring new places. Being in nature helps keep me grounded.
            </motion.p>

            <AdventuresGrid photos={adventurePhotos} />

          </div>
        </section>

      </main>
    </PageWrapper>
  );
}
