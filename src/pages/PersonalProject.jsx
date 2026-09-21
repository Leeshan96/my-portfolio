import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/PageWrapper';
import { ProjectNav } from '../components/ProjectNav';
import '../css/case-study.css';
import '../css/personal-project.css';

/* ── Sidenav sections ── */
const sections = [
  { id: 'live-prototype', label: 'Live web app' },
  { id: 'the-process',   label: 'The process' },
  { id: 'the-decisions', label: 'The decisions' },
  { id: 'learnings',     label: 'Learnings' },
];

/* ── Active section tracking via IntersectionObserver ── */
function useSidenav(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observers = [];
    const options = {
      rootMargin: `-${80 + 24}px 0px -60% 0px`,
      threshold: 0,
    };

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveId(id);
      }, options);
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [ids]);

  return activeId;
}

const reveal = (delay = 0) => ({
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay } },
});

export default function PersonalProject() {
  const sectionIds = sections.map(s => s.id);
  const activeId = useSidenav(sectionIds);
  const [decisionsTab, setDecisionsTab] = useState('design');
  const [codeRevealed, setCodeRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('ES9BS7').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, []);

  return (
    <PageWrapper>
      <main id="main-content">

        {/* ── Title ── */}
        <section className="cs-title">
          <div className="cs-title__inner">
            <Link to="/#work" className="cs-breadcrumb">← Work</Link>
            <h1 className="cs-title__heading">Currently Web App</h1>
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

        {/* ── Body layout ── */}
        <div className="cs-layout">

          {/* ── Sticky sidenav ── */}
          <aside className="cs-sidenav">
            <nav aria-label="Case study sections">
              {sections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`sidenav-link${activeId === id ? ' is-active' : ''}`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          {/* ── Scrollable content ── */}
          <div className="cs-content">

            {/* ── Overview ── */}
            <section className="cs-overview">

              <motion.div
                className="pp-meta"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <div className="pp-meta__row">
                  <span className="cs-meta__label">Duration</span>
                  <span className="cs-meta__value">3 weeks</span>
                </div>
                <div className="pp-meta__row">
                  <span className="cs-meta__label">Tools</span>
                  <div className="pp-meta__tools">
                    <span className="cs-meta__value">Claude</span>
                    <span className="cs-meta__value">Figma</span>
                    <span className="cs-meta__value">Lovable</span>
                    <span className="cs-meta__value">Supabase</span>
                    <span className="cs-meta__value">Vercel</span>
                  </div>
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

            </section>

            {/* ── Live prototype section ── */}
            <section id="live-prototype" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">01</span> Live web app
              </motion.h2>

              <motion.div
                className="pp-video-wrap"
                variants={reveal(0.2)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <p className="pp-mobile-note">Optimised for mobile</p>
                <video
                  className="pp-video"
                  src="/assets/videos/currently-recording.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </motion.div>

              <motion.div
                className="pp-cta-row"
                variants={reveal(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                style={{ marginTop: 'var(--space-6)' }}
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

                {/* ── Space code reveal ── */}
                <div className="pp-space-code">
                  <button
                    className="pp-space-code__toggle"
                    onClick={() => setCodeRevealed(r => !r)}
                    aria-label={codeRevealed ? 'Hide space code' : 'Reveal space code'}
                  >
                    <span className="pp-space-code__icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="2" y="6.5" width="10" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                        {codeRevealed
                          ? <path d="M4.5 6.5V4a2.5 2.5 0 0 1 5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          : <path d="M4.5 6.5V4a2.5 2.5 0 0 1 5 0v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        }
                      </svg>
                    </span>
                    {codeRevealed ? (
                      <span className="pp-space-code__value">ES9BS7</span>
                    ) : (
                      <span className="pp-space-code__label">Space code</span>
                    )}
                  </button>
                  {codeRevealed && (
                    <button
                      className="pp-space-code__copy"
                      onClick={handleCopy}
                      aria-label="Copy space code"
                    >
                      {copied ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <rect x="5" y="5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M9 5V3.5A1.5 1.5 0 0 0 7.5 2H3.5A1.5 1.5 0 0 0 2 3.5v4A1.5 1.5 0 0 0 3.5 9H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>

            </section>

            {/* ── Process section ── */}
            <section id="the-process" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">02</span> The process
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
                ].map((item) => (
                  <div key={item.step} className="pp-process__step">
                    <span className="pp-process__step-num">{item.step}</span>
                    <span className="pp-process__step-label">{item.label}</span>
                    <span className="pp-process__step-tool">{item.tool}</span>
                  </div>
                ))}
              </motion.div>

            </section>

            {/* ── Decisions section ── */}
            <section id="the-decisions" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">03</span> The decisions
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
                <button
                  className={`pp-toggle__btn${decisionsTab === 'removed' ? ' pp-toggle__btn--active' : ''}`}
                  onClick={() => setDecisionsTab('removed')}
                  role="tab"
                  aria-selected={decisionsTab === 'removed'}
                >
                  Features I removed
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
                        <td>~2.1 billion possible combinations makes it almost impossible to guess. There's little security worry, and no password needs to be created or stored in the database</td>
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
                        <td>Leave space</td>
                        <td>Hard deletes member from Supabase. Posts stay on board. Remaining members see update in real time</td>
                      </tr>
                      <tr>
                        <td>Delete space</td>
                        <td>Creator only. Cascade deletes all space data. All members redirected to home via Supabase real-time</td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {decisionsTab === 'removed' && (
                  <table className="pp-table pp-table--three-col">
                    <thead>
                      <tr>
                        <th>Feature</th>
                        <th>What Claude suggested</th>
                        <th>Why I cut it</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Filter by member</td>
                        <td>Let people filter the board to just one friend's posts</td>
                        <td>The board works because everyone's posts are shown together. Filters mean sorting people, however Currently is meant to be inclusive. This feature didn't sit well with the design philosophy I had in mind</td>
                      </tr>
                      <tr>
                        <td>Category colour coding</td>
                        <td>Give each of the 6 categories its own colour (sage, blue etc) for easy scanning</td>
                        <td>There will be accessibility issues with different tag pill colours sitting on coloured bg and images uploaded by friends. To be safe, I replaced it with a single consistent style #FFFFFF at 70% opacity</td>
                      </tr>
                      <tr>
                        <td>Seen-by indicator</td>
                        <td>Show who's viewed a post, alongside the wave, so posters know it was seen without needing a reply</td>
                        <td>One acknowledgment mechanic is enough. Adding a second made the wave feel redundant and started to feel like read receipts, which is the opposite of low-pressure</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>

            </section>

            {/* ── Learnings section ── */}
            <section id="learnings" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">04</span> Learnings
              </motion.h2>

              <motion.p
                className="cs-overview__body"
                variants={reveal(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                This was my first time building through vibe coding, and I had to figure out the tech stack and how to connect it all to deploy successfully. Writing the PRD took longer than expected, but it paid off with fewer back-and-forths during the build. The biggest takeaway was learning to prompt effectively: vague prompts gave Lovable too much room to interpret, while specific, scoped ones worked much better. What caught me off guard most was debugging 17 issues I had no prior knowledge of. Still, it was fun building something from scratch and seeing it come to life.
              </motion.p>

            </section>

          </div>
        </div>

      </main>

      <ProjectNav
        prev={{ title: 'Menocare', href: '/menocare' }}
        next={{ title: 'SIMBA Roaming', href: '/roaming' }}
      />

    </PageWrapper>
  );
}
