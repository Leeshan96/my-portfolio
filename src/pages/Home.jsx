import React from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/PageWrapper';
import { ImageCluster } from '../components/ImageCluster';
import { WorkCard } from '../components/WorkCard';
import './Home.css';

/* ── Personal photos for the hero cluster ── */
const clusterImages = [
  '/assets/images/Leeshan-1v3.png',
  '/assets/images/Leeshan-2v3.png',
  '/assets/images/Leeshan-3v3.png',
];

const clusterTooltips = [
  'Hey there, nice to see you here!',
  'Always happy to connect :)',
  "Don't be shy, say hi!",
];

/* ── Hero stagger animation ── */
const heroItem = (i) => ({
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

/* ── Scroll reveal ── */
const scrollReveal = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.32, 0.72, 0, 1] } },
};

/* ── Work cards data ── */
const workCards = [
  {
    id: 'simba-roaming',
    title: 'SIMBA Roaming Page',
    tags: [],
    year: '2026',
    thumbnail: '/assets/images/roaming-thumbnail-v2.png',
    thumbnailAlt: 'SIMBA Roaming Page case study thumbnail',
    cardBg: 'linear-gradient(160deg, #FDFBF2 0%, #F5E8B8 100%)',
    href: '/case-study-1',
    folderColor: '#F5E8B8',
    cardBorder: '#F5E8B8',
    restScale: 0.8,
  },
  {
    id: 'simba-ds',
    title: 'SIMBA Design System',
    tags: [],
    year: '2025',
    thumbnail: '/assets/images/design-system-thumbnail.png',
    thumbnailAlt: 'SIMBA Design System case study thumbnail',
    cardBg: 'linear-gradient(160deg, #F2F5F9 0%, #D8E2EF 100%)',
    href: '/case-study-2',
    folderColor: '#DDE3ED',
    cardBorder: '#D8E2EF',
  },
  {
    id: 'menocare',
    title: 'Menocare (Design Challenge) · Winning Team',
    tags: [],
    year: '2023',
    thumbnail: '/assets/images/menocare-thumbnail.png',
    thumbnailAlt: 'Menocare design challenge thumbnail',
    cardBg: 'linear-gradient(160deg, #F6F4FC 0%, #E2DBF5 100%)',
    href: '/case-study-3',
    folderColor: '#E2DBF5',
    cardBorder: '#E2DBF5',
  },
];

const sideProjectCards = [
  {
    id: 'currently',
    title: 'Currently App · Lovable',
    tags: [],
    year: '2026',
    thumbnail: '/assets/images/currently-thumbnail.png',
    thumbnailAlt: 'Currently App side project thumbnail',
    cardBg: 'linear-gradient(160deg, #F8F6E8 0%, #E8E3B4 100%)',
    href: '/personal-project',
    folderColor: '#E8E3B4',
    cardBorder: '#E8E3B4',
  },
];

/* ============================================================ */

export default function Home() {
  return (
    <PageWrapper>
      <main className="page-home">

        {/* ── Hero ── */}
        <section className="hero" aria-label="Introduction">
          <div className="hero-inner content-wrap">

            <motion.p
              className="hero-greeting"
              variants={heroItem(0)}
              initial="hidden"
              animate="visible"
            >
              Hi! I'm Lee Shan.
            </motion.p>

            <ImageCluster
              images={clusterImages}
              tooltips={clusterTooltips}
              motionProps={{ variants: heroItem(1), initial: 'hidden', animate: 'visible' }}
            />

            <motion.h1
              className="hero-tagline"
              variants={heroItem(2)}
              initial="hidden"
              animate="visible"
            >
              A product designer who solves<br />complex problems. Thinking people<br />and systems before pixels.
            </motion.h1>

            <motion.p
              className="hero-current"
              variants={heroItem(3)}
              initial="hidden"
              animate="visible"
            >
              Currently a designer at SIMBA Telecom
            </motion.p>

            <motion.div
              className="hero-cta"
              variants={heroItem(4)}
              initial="hidden"
              animate="visible"
            >
              <motion.a
                href="mailto:lianleeshan@gmail.com"
                className="btn btn--primary"
                whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(37,36,34,0.18)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                Let's chat!
              </motion.a>
            </motion.div>

          </div>
        </section>

        {/* ── Hero divider ── */}
        <div className="hero-divider-wrap">
          <div className="hero-divider" aria-hidden="true" />
        </div>

        {/* ── Work ── */}
        <section className="work-section" id="work" aria-label="Case studies">
          <div className="content-wrap">

            <motion.p
              className="section-label"
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <span className="section-label__num">01</span>
              <span className="section-label__text">WORK</span>
            </motion.p>

            {/* Row 1: 2 cards */}
            <motion.div
              className="work-grid work-grid--row"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {workCards.slice(0, 2).map(card => (
                <motion.div key={card.id} variants={staggerItem}>
                  <WorkCard {...card} />
                </motion.div>
              ))}
            </motion.div>

            {/* Row 2: Menocare full-width (left half) */}
            <motion.div
              className="work-grid work-grid--half"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.div key={workCards[2].id} variants={staggerItem}>
                <WorkCard {...workCards[2]} />
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* ── Side Projects ── */}
        <section className="side-projects-section" id="side-projects" aria-label="Side projects">
          <div className="content-wrap">

            <motion.p
              className="section-label"
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <span className="section-label__num">02</span>
              <span className="section-label__text">SIDE PROJECTS</span>
            </motion.p>

            <motion.div
              className="work-grid work-grid--half"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {sideProjectCards.map(card => (
                <motion.div key={card.id} variants={staggerItem}>
                  <WorkCard {...card} />
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

      </main>
    </PageWrapper>
  );
}
