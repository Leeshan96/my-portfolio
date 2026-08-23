import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/PageWrapper';
import { Lightbox } from '../components/Lightbox';
import { ProjectNav } from '../components/ProjectNav';
import '../css/case-study.css';
import '../css/simba-roaming.css';

/* ── Sidenav sections ── */
const sections = [
  { id: 'background',   label: 'Background' },
  { id: 'research',     label: 'Discovery' },
  { id: 'problem',      label: 'Reframing the Problem' },
  { id: 'exploration',  label: 'Design Explorations' },
  { id: 'solution',          label: 'User Testing' },
  { id: 'expanding-scope',  label: 'Expanding Scope' },
  { id: 'next-steps',   label: 'Next Steps' },
  { id: 'learnings',    label: 'Learnings' },
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

/* ── Scroll reveal variants ── */
const reveal = (delay = 0) => ({
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay } },
});

/* ── Component ── */
export default function SimbaRoaming() {
  const sectionIds = sections.map(s => s.id);
  const activeId = useSidenav(sectionIds);

  const [lightbox, setLightbox] = useState({ src: null, alt: '' });
  const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
  const closeLightbox = useCallback(() => setLightbox({ src: null, alt: '' }), []);
  const onLightboxKeyDown = useCallback((e, src, alt) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(src, alt); }
  }, [openLightbox]);

  return (
    <PageWrapper>
      <main id="main-content">

        {/* ── Title ── */}
        <section className="cs-title">
          <div className="cs-title__inner">
            <Link to="/#work" className="cs-breadcrumb">← Work</Link>
            <h1 className="cs-title__heading">SIMBA Roaming</h1>
          </div>
        </section>

        {/* ── Hero banner ── */}
        <section className="cs-hero cs-hero--simba-roaming">
          <div className="cs-hero__inner">
            <img
              src="/assets/images/roaming-thumbnail-v2.png"
              alt="SIMBA Roaming Page — overview of the redesigned roaming experience"
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

            {/* Overview — no sidenav link */}
            <section className="cs-overview">

              {/* ── Metadata row ── */}
              <motion.div
                className="cs-meta"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <div className="cs-meta__col">
                  <span className="cs-meta__label">Role</span>
                  <span className="cs-meta__value">UX Design</span>
                  <span className="cs-meta__value">UI Design</span>
                  <span className="cs-meta__value">User research</span>
                </div>
                <div className="cs-meta__col">
                  <span className="cs-meta__label">Duration</span>
                  <span className="cs-meta__value">Placeholder</span>
                </div>
                <div className="cs-meta__col">
                  <span className="cs-meta__label">Team</span>
                  <span className="cs-meta__value">1 Designer</span>
                  <span className="cs-meta__value">1 Developer</span>
                  <span className="cs-meta__value">1 Marketer</span>
                </div>
                <div className="cs-meta__col">
                  <span className="cs-meta__label">Tools</span>
                  <span className="cs-meta__value">Figma</span>
                  <span className="cs-meta__value">Claude Code</span>
                </div>
              </motion.div>

              <motion.p
                className="cs-overview__label"
                variants={reveal(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Overview
              </motion.p>
              <motion.p
                className="cs-overview__body"
                variants={reveal(0.16)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                SIMBA's roaming page was confusing users. They couldn't tell how roaming charges worked or how to top up when more data was needed, which increased support tickets and sales enquiries. I redesigned the page to make charges and top-up options clear at a glance. The goal was to reduce roaming related support tickets and transform confusion into conversion.
              </motion.p>
              <motion.p
                className="cs-overview__body"
                variants={reveal(0.22)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                I was the sole designer, from research through to build, where I handed off the code to the developer. I also worked cross-functionally, presenting research findings to stakeholders and aligning marketing around a shared design direction.
              </motion.p>

            </section>

            {/* ── Background ── */}
            <section id="background" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">01</span> Background
              </motion.h2>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                SIMBA's roaming page was generating confusion as users couldn't understand how roaming charges worked or how to get more roaming data, leading to an increase in support tickets and enquiries to sales. The goal was to redesign the page to improve user understanding and reduce support load.
              </motion.p>

              <motion.div
                className="cs-goals-grid"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="cs-goals-card">
                  <span className="cs-goals-card__label">User Goals:</span>
                  <p className="cs-goals-card__body">Understand how roaming charges work across the different roaming groups, and how to get more roaming data when needed.</p>
                </div>
                <div className="cs-goals-card">
                  <span className="cs-goals-card__label">Business Goals:</span>
                  <p className="cs-goals-card__body">Reduce support tickets for basic roaming enquiries, increase roaming service adoption and improve SEO page rankings and visibility.</p>
                </div>
              </motion.div>

            </section>

            {/* ── Discovery ── */}
            <section id="research" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">02</span> Discovery
              </motion.h2>

              {/* User Survey subsection */}
              <motion.h3
                className="cs-h3"
                variants={reveal(0.04)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                User Survey
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                To understand what users were actually looking for when they visited the roaming page, I ran a Hotjar survey directly on the page, collecting over 400 responses. Since the survey was only shown to users who reached the roaming page, the responses reflected those who were actively looking for roaming information.
              </motion.p>

              <motion.div
                className="cs-callout"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-callout__label">The findings</span>
                <ul className="cs-callout__list">
                  <li>Roaming top-up process was unclear, users didn't know how to activate roaming.</li>
                  <li>Users were confused about which roaming groups were included in their mobile plans and which required additional payment.</li>
                </ul>
              </motion.div>

              {/* Competitive analysis subsection */}
              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-8)' }}
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Competitive analysis
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                To understand industry patterns and identify opportunities to differentiate SIMBA's approach, I analysed the roaming pages of Singtel, Starhub, M1 and MyRepublic.
              </motion.p>

              <motion.img
                src="/assets/images/roaming/Competitive_analysis_-_roaming.webp"
                alt="Competitive analysis comparing roaming pages of Singtel, Starhub, M1 and MyRepublic"
                className="cs-image cs-image--no-shadow lightbox-trigger"
                loading="lazy"
                tabIndex={0}
                role="button"
                onClick={() => openLightbox('/assets/images/roaming/Competitive_analysis_-_roaming.webp', 'Competitive analysis comparing roaming pages of Singtel, Starhub, M1 and MyRepublic')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/roaming/Competitive_analysis_-_roaming.webp', 'Competitive analysis comparing roaming pages of Singtel, Starhub, M1 and MyRepublic')}
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              {/* Key pattern that emerged */}
              <motion.p
                className="cs-pattern-label"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Key pattern that emerged:
              </motion.p>

              <motion.div
                className="cs-pattern-card"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="cs-pattern-card__comparison">
                  <p className="cs-pattern-card__col-heading cs-pattern-card__left">Industry standard</p>
                  <p className="cs-pattern-card__col-heading cs-pattern-card__right">SIMBA's unique roaming model</p>

                  <p className="cs-pattern-card__col-body cs-pattern-card__left">Most telcos offer standalone roaming plans organised by region and destination (e.g. Asia Roaming Plan).</p>
                  <span className="cs-pattern-card__vs">vs</span>
                  <p className="cs-pattern-card__col-body cs-pattern-card__right">Roaming is included within mobile plans, not sold separately.</p>

                  <img
                    src="/assets/images/roaming/Industry.webp"
                    alt="Industry standard roaming model — search by destination then select plan"
                    className="cs-pattern-card__img cs-pattern-card__left"
                    loading="lazy"
                  />
                  <img
                    src="/assets/images/roaming/SIMBA-1.webp"
                    alt="SIMBA's unique roaming model — compare plans, check destination coverage, select plan"
                    className="cs-pattern-card__img cs-pattern-card__right"
                    loading="lazy"
                  />
                </div>
                <hr className="cs-pattern-card__divider" />
                <p className="cs-pattern-card__challenge">
                  <span className="cs-pattern-card__challenge-label">Challenge:</span>{' '}
                  This created a fundamental mismatch as users would normally search by destination instead of plan type. However, when searching for SIMBA plans, users need to reverse-engineer which plan covers their destination.
                </p>
              </motion.div>

            </section>

            {/* ── Problem Definition ── */}
            <section id="problem" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">03</span> Reframing the Problem
              </motion.h2>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                The discovery phase challenged my initial assumption that information clarity was the key issue. While every other telco organises roaming plans by destination, SIMBA's roaming is bundled within mobile plans. Users were arriving on the page with a destination-first mindset and finding a plan-first structure, creating confusion.
              </motion.p>

              <motion.p
                className="cs-body cs-body--medium"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                So the question became: How do I work within SIMBA's existing model to close the gap between what users expect and what the page offers?
              </motion.p>

              <motion.div
                className="cs-callout"
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-callout__label">The Problem</span>
                <p className="cs-callout__body">How might we help users find roaming information by destination, so they can quickly understand if their plan covers where they're going and what it will cost?</p>
              </motion.div>

            </section>

            {/* ── Design Explorations ── */}
            <section id="exploration" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">04</span> Design Explorations
              </motion.h2>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                With the reframed problem in mind, I began exploring design solutions. My goal was to ensure that users understood how SIMBA's roaming model worked.
              </motion.p>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                1. Top 12 destinations
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.16)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Surfacing the top 12 destinations upfront reduces our users' cognitive load by focusing on the countries they actually travel to. After choosing the destinations, users will see the plans and roaming groups available, making it a destination-based search rather than plan-based search.
              </motion.p>

              <motion.img
                src="/assets/images/roaming/Design-exploration-1.webp"
                alt="Design exploration — Top 12 destinations concept for SIMBA Roaming page"
                className="cs-image cs-image--no-shadow lightbox-trigger"
                loading="lazy"
                tabIndex={0}
                role="button"
                onClick={() => openLightbox('/assets/images/roaming/Design-exploration-1.webp', 'Design exploration — Top 12 destinations concept for SIMBA Roaming page')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/roaming/Design-exploration-1.webp', 'Design exploration — Top 12 destinations concept for SIMBA Roaming page')}
                variants={reveal(0.22)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-8)' }}
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                2. Roaming charges
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                The roaming charges table had to be clear for users to easily distinguish between included and pay-per-use roaming. I used a single table for version 1 with a divider between the two, version 2 with separate sub-sections to make the distinction clearer upfront, and version 3 in table format with sub-tags under Group A to reflect updated roaming plan entitlements.
              </motion.p>

              <motion.figure
                className="cs-figure-captioned"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <img
                  src="/assets/images/roaming/Design-exploration-2.webp"
                  alt="Three versions of roaming charges table — different presentations for roaming charges"
                  className="cs-image cs-image--no-shadow lightbox-trigger"
                  loading="lazy"
                  tabIndex={0}
                  role="button"
                  onClick={() => openLightbox('/assets/images/roaming/Design-exploration-2.webp', 'Three versions of roaming charges table — different presentations for roaming charges')}
                  onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/roaming/Design-exploration-2.webp', 'Three versions of roaming charges table — different presentations for roaming charges')}
                />
                <figcaption className="cs-image-caption">Different presentations for roaming charges</figcaption>
              </motion.figure>

            </section>

            {/* ── User Testing ── */}
            <section id="solution" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">05</span> User Testing
              </motion.h2>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                I conducted in-person moderated testing with 4 users and showed them the design for feedback. Each user was given the same questions:
              </motion.p>

              <motion.ul
                className="cs-list cs-list--italic"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <li>"You are planning to travel to China. Show me how you would buy a roaming plan."</li>
                <li>"What would you do if you run out of roaming data?"</li>
                <li>"Tell me what you understand from the data allowance chart."</li>
                <li>"Is the countries pop-up information clear to you?"</li>
              </motion.ul>

              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-7)' }}
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Key takeaways
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                The testing confirmed what the competitive analysis had surfaced earlier. Users didn't understand SIMBA's service model. They expected to find standalone roaming plans the way every other telco presents them. When they realised the only option was to sign up for a mobile plan, the confusion was immediate.
              </motion.p>

              <motion.div
                className="ut-cards"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="ut-card">
                  <span className="ut-card__num">1</span>
                  <p className="ut-card__body">Users didn't know how to buy roaming data for countries in which are not included in SIMBA mobile plans.</p>
                </div>
                <div className="ut-card">
                  <span className="ut-card__num">2</span>
                  <p className="ut-card__body">Users usually buy roaming add-on plans or a separate roaming sim for travels. They were confused when the only option was to buy a mobile plan.</p>
                  <blockquote className="ut-card__quote">Why do I have to sign up for a new line to buy roaming data?</blockquote>
                </div>
                <div className="ut-card">
                  <span className="ut-card__num">3</span>
                  <p className="ut-card__body">Users liked the mobile data allowance chart as it was clear how deductions worked.</p>
                </div>
                <div className="ut-card">
                  <span className="ut-card__num">4</span>
                  <p className="ut-card__body">Some existing users were not aware they could top up their wallet to use more data after using up all their data allowance.</p>
                </div>
              </motion.div>

              {/* Design iterations */}
              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-8)' }}
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Design iterations
              </motion.h3>

              <motion.h4
                className="cs-h4"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                New vs Existing users
              </motion.h4>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                The original design focused on purchase channels — online vs in-stores, which assumed that all users regardless of new or existing had the same starting point. After receiving feedback that new users didn't understand why they needed to sign up for a mobile plan just to roam overseas, I decided to separate the journey by user type, walking new customers through the sign-up process while directing existing customers to top up their wallet.
              </motion.p>

              <motion.figure
                className="cs-figure-captioned"
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <img
                  src="/assets/images/roaming/Iteration-1.webp"
                  alt="Design iterations — before and after comparison of steps to purchase roaming"
                  className="cs-image cs-image--no-shadow lightbox-trigger"
                  loading="lazy"
                  tabIndex={0}
                  role="button"
                  onClick={() => openLightbox('/assets/images/roaming/Iteration-1.webp', 'Design iterations — before and after comparison of steps to purchase roaming')}
                  onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/roaming/Iteration-1.webp', 'Design iterations — before and after comparison of steps to purchase roaming')}
                />
                <figcaption className="cs-image-caption">Iterations for steps to purchase</figcaption>
              </motion.figure>

            </section>

            {/* ── Expanding Scope ── */}
            <section id="expanding-scope" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">06</span> Expanding Scope
              </motion.h2>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                From Modal to Individual Country Pages
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                After user testing, we identified a gap in how SIMBA reached potential customers: our modal-based roaming content could only be found by users already on our site or app. Customers researching roaming plans elsewhere had no way to discover us — customers had to be reached through other means, like paid ads.
              </motion.p>

              <motion.p
                className="cs-body"
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                To fix this, we restructured the modal into dedicated, indexable country pages that search engines and LLMs can surface directly.
              </motion.p>

              <motion.div
                className="cs-expanding-comparison"
                variants={reveal(0.24)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="cs-expanding-comparison__static">
                  <img
                    src="/assets/images/roaming/Modal.webp"
                    alt="Before — SIMBA roaming modal showing Malaysia plan details"
                    loading="lazy"
                  />
                </div>
                <div className="cs-expanding-comparison__scroll">
                  <img
                    src="/assets/images/roaming/south-korea-country-page.webp"
                    alt="After — dedicated South Korea country page with full roaming details"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              <motion.p
                className="cs-image-caption"
                variants={reveal(0.3)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Modal vs Indexable country pages <em>(scroll me)</em>
              </motion.p>

            </section>

            {/* ── Next Steps ── */}
            <section id="next-steps" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">07</span> Next Steps
              </motion.h2>

              <motion.ol
                className="cs-ordered-list"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <li>
                  To facilitate the implementation of the new roaming pages, I built the pages on Claude Code with the same framework that works with our website. The code has been passed to the developer for implementation.
                </li>
                <li>
                  To validate whether this redesign actually solves the problems I identified, I recommended tracking specific metrics:
                  <ul className="cs-list cs-nested-list">
                    <li>Support ticket volume (are roaming questions decreasing?)</li>
                    <li>Conversion funnel: Roaming page → Plans page → Purchase</li>
                  </ul>
                </li>
                <li>
                  Discovered Opportunity: Analytics revealed that only 16.4% of users were reaching the roaming page through existing site navigation. So, the next phase will focus on improving information architecture and navigation to increase roaming page visibility.
                </li>
              </motion.ol>

            </section>

            {/* ── Learnings ── */}
            <section id="learnings" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">08</span> Learnings
              </motion.h2>

              <motion.div
                className="ut-cards"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="ut-card">
                  <span className="ut-card__num">1</span>
                  <p className="ut-card__title">Using Research to Align Stakeholder Goals</p>
                  <p className="ut-card__body">By understanding different stakeholder's perspectives, I was able to view different priorities not as conflicting goals, but rather find solutions to work together. In this case, I managed to align stakeholder goals through user research data.</p>
                </div>
                <div className="ut-card">
                  <span className="ut-card__num">2</span>
                  <p className="ut-card__title">Mental Models Matter</p>
                  <p className="ut-card__body">Users expect standalone roaming plans (industry norm). SIMBA requires a mobile line first. Instead of expecting behavioural change, I designed clear communication to align user expectations with SIMBA's service model.</p>
                </div>
              </motion.div>

            </section>

          </div>
        </div>

      </main>

      <ProjectNav
        prev={{ title: 'Currently', href: '/currently' }}
        next={{ title: 'Design Systems', href: '/design-system' }}
      />

      <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />
    </PageWrapper>
  );
}
