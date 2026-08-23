import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/PageWrapper';
import { ProjectNav } from '../components/ProjectNav';
import '../css/case-study.css';
import '../css/personal-project.css';

const reveal = (delay = 0) => ({
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay } },
});

export default function PersonalProject() {
  return (
    <PageWrapper>
      <main id="main-content">

        {/* ── Title ── */}
        <section className="cs-title">
          <div className="cs-title__inner">
            <Link to="/#work" className="cs-breadcrumb">← Work</Link>
            <h1 className="cs-title__heading">Currently</h1>
          </div>
        </section>

        {/* ── Hero banner ── */}
        <section className="cs-hero cs-hero--currently">
          <div className="cs-hero__inner">
            <img
              src="/assets/images/currently-hero.webp"
              alt="Currently app — shared board for friends to see what each other is into right now"
              className="cs-hero__image"
            />
          </div>
        </section>

        {/* ── Single-column content ── */}
        <div className="pp-content">

          <motion.p
            className="cs-overview__label"
            variants={reveal(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            Overview
          </motion.p>

          <motion.p
            className="cs-overview__body"
            variants={reveal(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            Long distance friendships fade not because people stop caring, but because there isn't much to say when we have different lifestyles and are all caught up in our own worlds. Social media felt overstimulating, so I wanted an intimate, low pressure space to stay present in each other's lives without the need to curate.
          </motion.p>

          <motion.p
            className="cs-overview__body"
            variants={reveal(0.14)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            Currently is a web app for small friend groups to share what they're into right now. Inspired by the intimacy of the Locket widget, but as a shared board. A calm, private space where friends stay connected without needing to start a conversation — no feeds, no algorithms, no likes. Just a living board of what our closest friends are currently into.
          </motion.p>

          {/* ── CTA ── */}
          <motion.div
            variants={reveal(0.18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.a
              href="https://currentlyboard.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(37,36,34,0.18)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              Try it yourself
            </motion.a>
          </motion.div>

          {/* ── App recording ── */}
          <motion.div
            className="pp-video-wrap"
            variants={reveal(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <video
              className="pp-video"
              src="/assets/videos/currently-recording.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </motion.div>

        </div>

      </main>

      <ProjectNav
        prev={{ title: 'Menocare', href: '/menocare' }}
        next={{ title: 'SIMBA Roaming', href: '/roaming' }}
      />

    </PageWrapper>
  );
}
