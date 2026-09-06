import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    company: 'SIMBA',
    title: 'Roaming Page Redesign',
    description: 'Simplifying a confusing roaming page for SIMBA\'s customers.',
    tags: [],
    year: '2026',
    thumbnail: '/assets/images/roaming-thumbnail-v2.png',
    thumbnailAlt: 'SIMBA Roaming Page case study thumbnail',
    cardBg: 'linear-gradient(160deg, #FFFBE8 0%, #F0E49C 100%)',
    imageAlign: 'center',
    href: '/roaming',
    bgElement: '/assets/images/roaming-work-card-element-line.svg',
    bgElementClass: 'work-card-full__bg-element--roaming',
    bgElementSmall: '/assets/images/roaming-work-card-element-line.svg',
    folderColor: '#FFE8CC',
    cardBorder: '#FFE8CC',
    restScale: 0.8,
  },
  {
    id: 'simba-ds',
    company: 'SIMBA',
    title: 'Design Systems',
    description: 'Building a scalable design system that brings consistency across products.',
    tags: [],
    year: '2025',
    thumbnail: '/assets/images/design-system-thumbnail.png',
    thumbnailAlt: 'SIMBA Design System case study thumbnail',
    cardBg: 'linear-gradient(160deg, #F2F5F9 0%, #D8E2EF 100%)',
    bgElement: '/assets/images/designsystems-work-card-element-line.svg',
    bgElementClass: 'work-card-full__bg-element--ds',
    bgElementSmall: '/assets/images/designsystems-work-card-element-line.svg',
    bgElementSmallClass: 'work-card-full__bg-element--ds-small',
    href: '/design-system',
    folderColor: '#DDE3ED',
    cardBorder: '#D8E2EF',
  },
  {
    id: 'menocare',
    company: 'DESIGN CHALLENGE · WINNING TEAM',
    title: 'Menocare',
    description: 'Empowering menopausal women to cope with the transitional phase with ease.',
    tags: [],
    year: '2023',
    thumbnail: '/assets/images/menocare-thumbnail.png',
    thumbnailAlt: 'Menocare design challenge thumbnail',
    cardBg: 'var(--bg-cs-menocare)',
    imageAlign: 'center',
    href: '/menocare',
    folderColor: '#E2DBF5',
    cardBorder: '#E2DBF5',
    bgElement: '/assets/images/menocare-work-card-element-line.svg',
    bgElementClass: 'work-card-full__bg-element--menocare',
    bgElementSmall: '/assets/images/menocare-work-card-element-line.svg',
    bgElementSmallClass: 'work-card-full__bg-element--menocare-small',
  },
];

const sideProjectCards = [
  {
    id: 'currently',
    company: 'SIDE PROJECT',
    title: 'Currently App',
    description: 'A private space for friends to share what they\'re into.',
    tags: [],
    year: '2026',
    thumbnail: '/assets/images/currently-thumbnail.png',
    thumbnailAlt: 'Currently App side project thumbnail',
    cardBg: 'linear-gradient(160deg, #F8F6E8 0%, #E8E3B4 100%)',
    href: '/currently',
    folderColor: '#E8E3B4',
    cardBorder: '#E8E3B4',
    imageAlign: 'center',
    bgElement: '/assets/images/currently-work-card-element-line.svg',
    bgElementClass: 'work-card-full__bg-element--currently',
    bgElementSmall: '/assets/images/currently-work-card-element-line.svg',
    bgElementSmallClass: 'work-card-full__bg-element--currently-small',
  },
];

/* ============================================================ */

function ProjectsSection({ workCards, sideProjectCards, staggerContainer, staggerItem, scrollReveal }) {
  return (
    <section className="work-section" id="work" aria-label="Projects">
      <div className="content-wrap">

        {/* 01 Selected Work */}
        <motion.h2
          className="projects-section-heading"
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <span className="projects-section-heading__num">01</span>
          Selected Work
        </motion.h2>

        <motion.div
          className="work-list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {workCards.map(card => (
            <motion.div key={card.id} variants={staggerItem}>
              <WorkCard {...card} fullWidth />
            </motion.div>
          ))}
        </motion.div>

        {/* 02 Side Projects */}
        <motion.h2
          className="projects-section-heading"
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ marginTop: 'var(--space-9)' }}
        >
          <span className="projects-section-heading__num">02</span>
          Side Project
        </motion.h2>

        <motion.div
          className="work-list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {sideProjectCards.map(card => (
            <motion.div key={card.id} variants={staggerItem}>
              <WorkCard {...card} fullWidth />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);

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
              A product designer who solves complex problems. Thinking people and systems before pixels.
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

        {/* ── Projects ── */}
        <ProjectsSection
          workCards={workCards}
          sideProjectCards={sideProjectCards}
          staggerContainer={staggerContainer}
          staggerItem={staggerItem}
          scrollReveal={scrollReveal}
        />

      </main>
    </PageWrapper>
  );
}
