import React, { useState } from 'react';
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
  const [decisionsTab, setDecisionsTab] = useState('design');

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

          {/* ── Metadata ── */}
          <motion.div
            className="cs-meta"
            variants={reveal(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="cs-meta__col">
              <span className="cs-meta__label">Duration</span>
              <span className="cs-meta__value">3 weeks</span>
            </div>
            <div className="cs-meta__col">
              <span className="cs-meta__label">Tools</span>
              <span className="cs-meta__value">Lovable</span>
              <span className="cs-meta__value">Supabase</span>
              <span className="cs-meta__value">Vercel</span>
            </div>
          </motion.div>

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

          <hr className="pp-divider" />

          {/* ── Process section ── */}
          <section className="cs-section">

          <motion.h2
            className="cs-section__heading"
            variants={reveal(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <span className="cs-section__num">01</span> The process
          </motion.h2>

          <motion.div
            className="pp-process"
            variants={reveal(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {[
              { step: 'Step 1', label: 'PRD',      tool: 'Claude'   },
              { step: 'Step 2', label: 'Design',   tool: 'Figma'    },
              { step: 'Step 3', label: 'Build',    tool: 'Lovable'  },
              { step: 'Step 4', label: 'Database', tool: 'Supabase' },
              { step: 'Step 5', label: 'Deploy',   tool: 'Vercel'   },
            ].map((item, i, arr) => (
              <React.Fragment key={item.step}>
                <div className="pp-process__step">
                  <span className="pp-process__step-num">{item.step}</span>
                  <span className="pp-process__step-label">{item.label}</span>
                  <span className="pp-process__step-tool">{item.tool}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="pp-process__arrow" aria-hidden="true">→</div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          </section>

          {/* ── How it came together ── */}
          <section className="cs-section">

          <motion.h2
            className="cs-section__heading"
            variants={reveal(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <span className="cs-section__num">02</span> The decisions
          </motion.h2>

          {/* ── Decisions toggle ── */}
          <div className="pp-toggle" role="tablist">
            <button
              className={`pp-toggle__btn${decisionsTab === 'design' ? ' pp-toggle__btn--active' : ''}`}
              onClick={() => setDecisionsTab('design')}
              role="tab"
              aria-selected={decisionsTab === 'design'}
            >
              Design
            </button>
            <button
              className={`pp-toggle__btn${decisionsTab === 'technical' ? ' pp-toggle__btn--active' : ''}`}
              onClick={() => setDecisionsTab('technical')}
              role="tab"
              aria-selected={decisionsTab === 'technical'}
            >
              Technical
            </button>
          </div>

          <div className="pp-table-wrap">
            {decisionsTab === 'design' && (
              <table className="pp-table">
                <thead>
                  <tr>
                    <th>Decision</th>
                    <th>Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Intentionally unpolished aesthetic</td>
                    <td>Feels like a mood board where you dump thoughts instead of having a curated social feed</td>
                  </tr>
                  <tr>
                    <td>6-digit alphanumeric space code</td>
                    <td>~2.1 billion possible combinations is almost impossible to guess. No public discovery and no password needs to be created or stored in the database</td>
                  </tr>
                  <tr>
                    <td>Space code revealed after creator's first post</td>
                    <td>So friends don't land on an empty board, and seeing a post naturally nudges them to share one too</td>
                  </tr>
                  <tr>
                    <td>Wave reaction only</td>
                    <td>A simple acknowledgement that a post was seen, without the pressure of having likes</td>
                  </tr>
                  <tr>
                    <td>8 member cap</td>
                    <td>A close friend group is usually around 5 to 8 people. Any more and it starts feeling like a group chat</td>
                  </tr>
                  <tr>
                    <td>Destructive actions in Settings</td>
                    <td>So nobody accidentally leaves or deletes the space while just browsing</td>
                  </tr>
                </tbody>
              </table>
            )}

            {decisionsTab === 'technical' && (
              <table className="pp-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>No login or accounts</td>
                    <td>No personal data stored or collected. Identity handled via localStorage and a 6-digit space code</td>
                  </tr>
                  <tr>
                    <td>Image upload</td>
                    <td>Auto-compressed to max 1MB before uploading. Native HTML file input for iOS Safari compatibility</td>
                  </tr>
                  <tr>
                    <td>Optimistic UI</td>
                    <td>Post deletion updates the board immediately without waiting for Supabase confirmation</td>
                  </tr>
                  <tr>
                    <td>Real-time updates</td>
                    <td>Board, wave counts, member changes, and space deletion all update live via Supabase real-time subscriptions</td>
                  </tr>
                  <tr>
                    <td>Desktop containment</td>
                    <td>App capped at 430px max-width so it renders as a mobile experience on all screen sizes</td>
                  </tr>
                  <tr>
                    <td>Delete post</td>
                    <td>Hard deletes from Supabase, cascades waves. Real-time removal for all members</td>
                  </tr>
                  <tr>
                    <td>Leave space</td>
                    <td>Hard deletes member from Supabase. Posts stay on board. Remaining members see update in real time</td>
                  </tr>
                  <tr>
                    <td>Delete space</td>
                  <td>Creator only. Cascade deletes all space data. All members redirected to home via Supabase real-time</td>
                </tr>
                <tr>
                  <td>Cascade deletes</td>
                  <td>All foreign keys use ON DELETE CASCADE — clean removal with no orphaned records</td>
                </tr>
              </tbody>
            </table>
            )}
          </div>

          </section>

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
