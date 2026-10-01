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
  { id: 'background',        label: 'Background' },
  { id: 'research',          label: 'Discovery' },
  { id: 'problem',           label: 'Reframing the Problem' },
  { id: 'exploration',       label: 'Design Explorations' },
  { id: 'solution',          label: 'User Testing' },
  { id: 'expanding-scope',   label: 'Expanding Scope' },
  { id: 'final-prototype',   label: 'Final Prototype' },
  { id: 'working-with-devs', label: 'Building for Handoff' },
  { id: 'impact',            label: 'Measuring Success' },
  { id: 'next-steps',        label: 'Next Steps' },
  { id: 'learnings',         label: 'Learnings' },
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

  function scrollToSection(id) {
    // Find images that haven't loaded and aren't currently in the viewport
    const unloaded = Array.from(document.querySelectorAll('img')).filter(img => {
      if (img.complete) return false;
      const rect = img.getBoundingClientRect();
      return rect.bottom < 0 || rect.top > window.innerHeight;
    });

    function doScroll() {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (unloaded.length === 0) {
      doScroll();
      return;
    }

    // Force off-screen lazy images to load so page height is correct before scrolling
    const promises = unloaded.map(img => new Promise(resolve => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
      img.loading = 'eager';
      const src = img.src;
      img.src = '';
      img.src = src;
    }));

    Promise.all(promises).then(() => requestAnimationFrame(doScroll));
  }

  return [activeId, scrollToSection];
}

/* ── Scroll reveal variants ── */
const reveal = (delay = 0) => ({
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay } },
});

/* ── Component ── */
export default function SimbaRoaming() {
  const sectionIds = sections.map(s => s.id);
  const [activeId, scrollToSection] = useSidenav(sectionIds);

  const [lightbox, setLightbox] = useState({ src: null, alt: '', content: null });
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [mobileBAIndex, setMobileBAIndex] = useState(0);
  const [expandingIndex, setExpandingIndex] = useState(0);

  const EXPANDING_IMAGES = [
    { src: '/assets/images/roaming/Modal.webp',                   alt: 'Before — SIMBA roaming modal showing Malaysia plan details' },
    { src: '/assets/images/roaming/south-korea-country-page.webp', alt: 'After — dedicated South Korea country page with full roaming details' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setExpandingIndex(i => (i + 1) % EXPANDING_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setMobileBAIndex(i => (i + 1) % 2);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const openLightbox = useCallback((src, alt) => setLightbox({ src, alt, content: null }), []);
  const openLightboxContent = useCallback((content) => setLightbox({ src: null, alt: '', content }), []);
  const closeLightbox = useCallback(() => setLightbox({ src: null, alt: '', content: null }), []);
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
              src="/assets/images/roaming-thumbnail.webp"
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
                  onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
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
                  <span className="cs-meta__value">4 months</span>
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
                Data roaming is SIMBA's Unique Selling Point (USP) in a crowded telco market. A confusing roaming page meant users couldn't understand what they were getting, leading to lost conversions and increased support tickets and sales enquiries. I redesigned the page so users could understand their coverage, costs, and next steps without friction.
              </motion.p>
              <motion.p
                className="cs-overview__body"
                variants={reveal(0.22)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                I was the sole designer, from research through to build, where I handed off the code to the developer. I also worked cross-functionally, engaging stakeholders throughout the process to build alignment on the design direction.
              </motion.p>

              <motion.div
                variants={reveal(0.28)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <a
                  href="https://simba.sg/roaming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Live website ↗
                </a>
              </motion.div>

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
                SIMBA's roaming page was generating confusion as <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>users couldn't understand how roaming charges worked or how to get more roaming data</strong>, leading to an increase in support tickets and enquiries to sales. The goal was to redesign the page to improve user understanding and reduce support load.
              </motion.p>

              <motion.div
                className="cs-before-after lightbox-trigger cs-before-after--desktop-only"
                variants={reveal(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                tabIndex={0}
                role="button"
                aria-label="View before and after comparison"
                onClick={() => openLightboxContent(
                  <div className="cs-before-after cs-before-after--lightbox">
                    <figure className="cs-before-after__item">
                      <figcaption className="cs-image-caption cs-image-caption--top">Before</figcaption>
                      <img src="/assets/images/roaming/Roaming-before.webp" alt="Roaming page — before redesign" className="cs-image" />
                    </figure>
                    <figure className="cs-before-after__item">
                      <figcaption className="cs-image-caption cs-image-caption--top">After</figcaption>
                      <img src="/assets/images/roaming/Roaming-after.webp" alt="Roaming page — after redesign" className="cs-image" />
                    </figure>
                  </div>
                )}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightboxContent(
                      <div className="cs-before-after cs-before-after--lightbox">
                        <figure className="cs-before-after__item">
                          <figcaption className="cs-image-caption cs-image-caption--top">Before</figcaption>
                          <img src="/assets/images/roaming/Roaming-before.webp" alt="Roaming page — before redesign" className="cs-image" />
                        </figure>
                        <figure className="cs-before-after__item">
                          <figcaption className="cs-image-caption cs-image-caption--top">After</figcaption>
                          <img src="/assets/images/roaming/Roaming-after.webp" alt="Roaming page — after redesign" className="cs-image" />
                        </figure>
                      </div>
                    );
                  }
                }}
              >
                <figure className="cs-before-after__item">
                  <figcaption className="cs-image-caption cs-image-caption--top">Before</figcaption>
                  <img
                    src="/assets/images/roaming/Roaming-before.webp"
                    alt="Roaming page — before redesign"
                    className="cs-image"
                    loading="lazy"
                  />
                </figure>
                <figure className="cs-before-after__item">
                  <figcaption className="cs-image-caption cs-image-caption--top">After</figcaption>
                  <img
                    src="/assets/images/roaming/Roaming-after.webp"
                    alt="Roaming page — after redesign"
                    className="cs-image"
                    loading="lazy"
                  />
                </figure>
              </motion.div>
              <p className="cs-image-caption cs-before-after--desktop-only">Before and after the redesign <em>(scroll me)</em></p>

              {/* Mobile-only before/after carousel */}
              <div className="cs-before-after--mobile-only">
                <div className="cs-inline-carousel__stage">
                  {/* Before — contained, fixed height */}
                  <div style={{ display: mobileBAIndex === 0 ? 'flex' : 'none', height: '404px', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src="/assets/images/roaming/Roaming-before.webp"
                      alt="Roaming page — before redesign"
                      loading="lazy"
                      style={{ width: 'auto', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
                    />
                  </div>
                  {/* After — scrollable, same fixed height */}
                  <div style={{ display: mobileBAIndex === 1 ? 'block' : 'none', maxHeight: '404px', overflowY: 'auto', padding: 'var(--space-5) 0' }}>
                    <img
                      src="/assets/images/roaming/Roaming-after.webp"
                      alt="Roaming page — after redesign"
                      loading="lazy"
                      style={{ width: '80%', margin: '0 auto', display: 'block' }}
                    />
                  </div>
                  <button
                    className="cs-inline-carousel__chevron cs-inline-carousel__chevron--prev"
                    onClick={() => setMobileBAIndex(i => (i - 1 + 2) % 2)}
                    aria-label="Before"
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    className="cs-inline-carousel__chevron cs-inline-carousel__chevron--next"
                    onClick={() => setMobileBAIndex(i => (i + 1) % 2)}
                    aria-label="After"
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="cs-inline-carousel__dots">
                  {['Before', 'After'].map((label, i) => (
                    <button
                      key={i}
                      className={`cs-carousel__dot${mobileBAIndex === i ? ' cs-carousel__dot--active' : ''}`}
                      onClick={() => setMobileBAIndex(i)}
                      aria-label={label}
                    />
                  ))}
                </div>
                <p className="cs-image-caption" style={{ marginTop: 'var(--space-2)' }}>
                  {mobileBAIndex === 0 ? 'Before' : 'After'} — Before and after the redesign
                </p>
              </div>

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
                  <ul className="cs-goals-card__body cs-callout__list">
                    <li>Reduce roaming-related support tickets by 20%</li>
                    <li>Improve roaming page → mobile plan purchase conversion rate by 15%</li>
                    <li>Increase roaming page discoverability through SEO</li>
                  </ul>
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
                <span className="cs-section__num">03</span> Discovery
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
                  <li>Roaming <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>top-up process was unclear</strong>, users didn't know how to activate roaming.</li>
                  <li>Users were <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>confused about which roaming groups were included in their mobile plans</strong> and which required additional payment.</li>
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
                <span className="cs-section__num">04</span> Reframing the Problem
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
                <p className="cs-callout__body">How might we help users find roaming information by destination so they know if they're covered, and what it'll cost?</p>
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
                <span className="cs-section__num">05</span> Design Explorations
              </motion.h2>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                With the reframed problem in mind, I began exploring design solutions. My goal was to <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>ensure that users understood how SIMBA's roaming model worked</strong>.
              </motion.p>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Top 12 destinations
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.16)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Surfacing the top 12 destinations upfront reduces our users' cognitive load by focusing on the countries they actually travel to. After choosing the destinations, users will see the plans and roaming groups available, making it a <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>destination-based search rather than plan-based search</strong>.
              </motion.p>

              <motion.figure
                className="cs-figure-captioned"
                variants={reveal(0.22)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <img
                  src="/assets/images/roaming/Design-exploration-1.webp"
                  alt="Design exploration — Modal Ver 1 and Ver 2 comparison"
                  className="cs-image cs-image--no-shadow lightbox-trigger"
                  loading="lazy"
                  tabIndex={0}
                  role="button"
                  onClick={() => openLightbox('/assets/images/roaming/Design-exploration-1.webp', 'Design exploration — Modal Ver 1 and Ver 2 comparison')}
                  onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/roaming/Design-exploration-1.webp', 'Design exploration — Modal Ver 1 and Ver 2 comparison')}
                />
                <figcaption className="cs-image-caption">Modal Ver 1 vs Ver 2</figcaption>
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
                <span className="cs-section__num">06</span> User Testing
              </motion.h2>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                I conducted in-person moderated testing with 4 users, a mix of existing SIMBA customers and first-time visitors.
              </motion.p>

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
                The testing confirmed what the competitive analysis had surfaced earlier. Users didn't understand SIMBA's service model. They <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>expected to find standalone roaming plans the way every other telco presents them</strong>. When they realised the only option was to sign up for a mobile plan, the confusion was immediate.
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
                  <p className="ut-card__body">Users <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>didn't know how to buy roaming data</strong> for countries in which are not included in SIMBA mobile plans.</p>
                </div>
                <div className="ut-card">
                  <span className="ut-card__num">2</span>
                  <p className="ut-card__body">Users usually buy roaming add-on plans or a separate roaming sim for travels. They were confused when the only option was to buy a mobile plan.</p>
                  <blockquote className="ut-card__quote"><strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>"Why do I have to sign up for a new line to buy roaming data?"</strong></blockquote>
                </div>
                <div className="ut-card">
                  <span className="ut-card__num">3</span>
                  <p className="ut-card__body">Information was clearly displayed in the roaming data table.</p>
                </div>
                <div className="ut-card">
                  <span className="ut-card__num">4</span>
                  <p className="ut-card__body">Some existing users were <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>not aware they could top up their wallet</strong> to use more data after using up all their data allowance.</p>
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
                The original design focused on purchase channels — online vs in-stores, which <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>assumed that all users regardless of new or existing had the same starting point</strong>. After receiving feedback that new users didn't understand why they needed to sign up for a mobile plan just to roam overseas, I decided to <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>separate the journey by user type</strong>, walking new customers through the sign-up process while directing existing customers to top up their wallet.
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
                <span className="cs-section__num">07</span> Expanding Scope
              </motion.h2>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                From modal to individual country pages
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
                To fix this, we <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>restructured the modal into dedicated, indexable country pages that search engines and LLMs can surface directly</strong>.
              </motion.p>

              <p className="cs-image-caption" style={{ marginBottom: 'var(--space-3)' }}>
                Modal vs Indexable country pages
              </p>

              <motion.div
                className="cs-expanding-comparison cs-expanding-comparison--single cs-expanding-comparison--carousel"
                variants={reveal(0.24)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="cs-expanding-comparison--static" style={{ display: expandingIndex === 0 ? 'flex' : 'none' }}>
                  <img src="/assets/images/roaming/Modal.webp" alt="Before — SIMBA roaming modal showing Malaysia plan details" />
                </div>
                <div className="cs-expanding-comparison--scroll" style={{ display: expandingIndex === 1 ? 'block' : 'none' }}>
                  <img src="/assets/images/roaming/south-korea-country-page.webp" alt="After — dedicated South Korea country page with full roaming details" />
                </div>

                <button
                  className="cs-inline-carousel__chevron cs-inline-carousel__chevron--prev"
                  onClick={() => setExpandingIndex(i => (i - 1 + EXPANDING_IMAGES.length) % EXPANDING_IMAGES.length)}
                  aria-label="Previous image"
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <button
                  className="cs-inline-carousel__chevron cs-inline-carousel__chevron--next"
                  onClick={() => setExpandingIndex(i => (i + 1) % EXPANDING_IMAGES.length)}
                  aria-label="Next image"
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </motion.div>

              <div className="cs-inline-carousel__dots">
                {['Before: Modal', 'After: Country page'].map((label, i) => (
                  <button
                    key={i}
                    className={`cs-carousel__dot${expandingIndex === i ? ' cs-carousel__dot--active' : ''}`}
                    onClick={() => setExpandingIndex(i)}
                    aria-label={label}
                  />
                ))}
              </div>

            </section>

            {/* ── Final Prototype ── */}
            <section id="final-prototype" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">08</span> Final Prototype
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ borderRadius: '12px', overflow: 'hidden' }}
              >
                <div className="proto-browser__chrome" style={{ borderRadius: '12px 12px 0 0' }}>
                  <div className="proto-browser__dots">
                    <span className="proto-browser__dot proto-browser__dot--red" />
                    <span className="proto-browser__dot proto-browser__dot--yellow" />
                    <span className="proto-browser__dot proto-browser__dot--green" />
                  </div>
                  <div className="proto-browser__url">roaming.vercel.app</div>
                </div>
                <video
                  src="/assets/videos/simba-roaming/roaming-final-prototype.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', display: 'block', borderLeft: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', borderRadius: '0 0 12px 12px' }}
                />
              </motion.div>

            </section>

            {/* ── Working with Developers ── */}
            <section id="working-with-devs" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">09</span> Building for Handoff
              </motion.h2>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Changing the Rendering Strategy
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Restructuring into individual country pages solved the indexability problem structurally, but the site was still client-side rendered, so search engines only saw an empty shell rather than the actual content. To fix this constraint, I worked with the developers to move the roaming pages to server-side rendering, <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>migrating the build from React to Next.js</strong> so the HTML that rendered was actually visible to crawlers.
              </motion.p>

              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-8)' }}
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Building in the right stack
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>Since I was building the new pages myself in Claude Code, I made sure they were built in Next.js, the same framework the site had moved to</strong>, so the developer could review and integrate the code directly, instead of having to rebuild it in the right stack first. <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>I pushed to Git, where the developer, a collaborator of the repository, pulled the latest updates for implementation.</strong>
              </motion.p>

            </section>

            {/* ── Measuring Success ── */}
            <section id="impact" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">10</span> Measuring Success
              </motion.h2>

              <motion.p
                className="cs-body"
                style={{ marginTop: 'var(--space-6)' }}
                variants={reveal(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                The following metrics are being tracked for post-launch:
              </motion.p>

              <motion.ul
                className="cs-list"
                variants={reveal(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <li>Volume of roaming-related support tickets — Target: ↓20%</li>
                <li>Roaming page → mobile plan purchase conversion rate — Target: ↑15%</li>
                <li>Bounce rate on the roaming page</li>
              </motion.ul>

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
                <span className="cs-section__num">11</span> Next Steps
              </motion.h2>

              <motion.ol
                className="cs-ordered-list"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <li>
                  Our stats showed that only 16.4% of users were reaching the roaming page through existing site navigation, which will inform the next phase of work.
                </li>
                <li>
                  Continue iterating on individual country pages, with further stakeholder alignment underway.
                </li>
                <li>
                  To extend this beyond my own workflow, I'm sharing knowledge to help the rest of the team use Claude Code and Git effectively, so everyone can build directly in the codebase.
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
                <span className="cs-section__num">12</span> Learnings
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
        next={{ title: 'Design Systems', href: '/design-systems' }}
      />

      <Lightbox src={lightbox.src} alt={lightbox.alt} content={lightbox.content} onClose={closeLightbox} />
    </PageWrapper>
  );
}
