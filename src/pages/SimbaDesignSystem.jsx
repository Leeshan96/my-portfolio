import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/PageWrapper';
import { Lightbox } from '../components/Lightbox';
import { ProjectNav } from '../components/ProjectNav';
import '../css/case-study.css';
import '../css/simba-ds.css';

/* ── Sidenav sections ── */
const sections = [
  { id: 'background',      label: 'Background' },
  { id: 'research',        label: 'Discovery' },
  { id: 'approach',        label: 'Research' },
  { id: 'system',          label: 'Building Blocks' },
  { id: 'prototype',       label: 'Prototype' },
  { id: 'implementation',  label: 'Claude Code Integration' },
  { id: 'impact',          label: 'Impact' },
  { id: 'learnings',       label: 'Learnings' },
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
export default function SimbaDesignSystem() {
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
            <h1 className="cs-title__heading">Design Systems</h1>
          </div>
        </section>

        {/* ── Hero banner ── */}
        <section className="cs-hero cs-hero--simba-ds">
          <div className="cs-hero__inner">
            <img
              src="/assets/images/design-system/design-system-hero.webp"
              alt="SIMBA Design System — colour styles, text styles and component library"
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
                  <span className="cs-meta__value">UI Design</span>
                  <span className="cs-meta__value">Design Systems</span>
                </div>
                <div className="cs-meta__col">
                  <span className="cs-meta__label">Duration</span>
                  <span className="cs-meta__value">July 2025 — Ongoing</span>
                </div>
                <div className="cs-meta__col">
                  <span className="cs-meta__label">Team</span>
                  <span className="cs-meta__value">1 Designer</span>
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
                SIMBA Telecom is one of the leading telecom companies in Singapore, providing mobile data and home broadband services. When I joined as a Product Designer, I noticed inconsistencies between designs and actual implementations, resulting in a lack of unifying experience across products. I saw an opportunity to establish design consistency and initiated the build of a design system to solve this.
              </motion.p>

            </section>

            {/* ── 01 Background ── */}
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
                Building the design system came with its own set of challenges, from deciding on a tokens naming convention to ensuring consistent UI across components. Getting stakeholder buy-in was also key, and prioritising the build against a lean engineering team juggling multiple ongoing projects made it harder to carve out dedicated time.
              </motion.p>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                The challenges
              </motion.h3>

              <motion.ul
                className="cs-list"
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <li>Deciding on the tokens naming convention</li>
                <li>Getting stakeholder's approval and buy-in</li>
                <li>Difficulty prioritising the build of the Design System with a lean engineering team juggling multiple ongoing projects</li>
              </motion.ul>

              <motion.div
                className="cs-goals-grid"
                variants={reveal(0.24)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="cs-goals-card">
                  <span className="cs-goals-card__label">User Goals</span>
                  <ul className="cs-goals-card__body">
                    <li>Improve usability through consistent, accessible components that users can easily recognize and interact with.</li>
                  </ul>
                </div>
                <div className="cs-goals-card">
                  <span className="cs-goals-card__label">Business Goals</span>
                  <ul className="cs-goals-card__body">
                    <li>Ensure brand consistency across products</li>
                    <li>Support product scalability</li>
                    <li>Reduce technical debt by establishing design standards</li>
                  </ul>
                </div>
              </motion.div>

            </section>

            {/* ── 02 Discovery ── */}
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

              {/* Subsection 1 */}
              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Finding inconsistencies through website audit
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Firstly, I did a quick website audit and found multiple variations of components used which leads to inconsistencies and user confusion.
              </motion.p>

              <motion.img
                src="/assets/images/design-system/Website_audit_components.webp"
                alt="Website audit — multiple inconsistent component variations found across SIMBA's website"
                className="cs-image cs-image--no-shadow lightbox-trigger"
                loading="lazy"
                tabIndex={0}
                role="button"
                onClick={() => openLightbox('/assets/images/design-system/Website_audit_components.webp', 'Website audit — multiple inconsistent component variations found across SIMBA\'s website')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/design-system/Website_audit_components.webp', 'Website audit — multiple inconsistent component variations found across SIMBA\'s website')}
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              {/* Subsection 2 */}
              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-8)' }}
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Understanding front end developer pain points
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                After the website audit, I had many questions: Why were there so many variants? Where did the icons and UI components come from? I suspected that the front end developers were using their own library and went to find out more. This was validated through speaking with them where I learnt:
              </motion.p>

              <motion.ul
                className="cs-list"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <li>Developers refer to their own component libraries that are convenient and easily accessible.</li>
                <li>No shared vocabulary between design and development.</li>
                <li>Time wasted recreating similar elements.</li>
              </motion.ul>

            </section>

            {/* ── 03 Research ── */}
            <section id="approach" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">03</span> Research
              </motion.h2>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Figuring things out through explorations
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                To get started, I looked up various resources and discovered Atomic Design Principles which teaches to build foundation components (atoms), before moving to more complex ones (molecules, organisms, templates). This methodology was clear and structured, so I adopted this practice while building the Design System.
              </motion.p>

              <motion.p
                className="cs-body"
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Next, I referenced Carbon Design System, Material 3 Design, Vodafone Design System (UK Telco), Singapore Government Design System to learn about usage guidelines and how to structure component variables in Figma file to make it easy for users (designers and developers).
              </motion.p>

              <motion.figure
                className="cs-figure-captioned"
                variants={reveal(0.24)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <img
                  src="/assets/images/design-system/Atomic_design_example.webp"
                  alt="Example of how components were arranged using Atomic Design Principles — Atoms, Molecules, Organisms"
                  className="cs-image cs-image--no-shadow lightbox-trigger"
                  loading="lazy"
                  tabIndex={0}
                  role="button"
                  onClick={() => openLightbox('/assets/images/design-system/Atomic_design_example.webp', 'Example of how components were arranged using Atomic Design Principles — Atoms, Molecules, Organisms')}
                  onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/design-system/Atomic_design_example.webp', 'Example of how components were arranged using Atomic Design Principles — Atoms, Molecules, Organisms')}
                />
                <figcaption className="cs-image-caption">Example of how I arranged the components</figcaption>
              </motion.figure>

            </section>

            {/* ── 04 Defining the Building Blocks ── */}
            <section id="system" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">04</span> Defining the Building Blocks
              </motion.h2>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Incorporating tokens
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                As my goal was to create a shared library for both designers and developers to adopt and maintain, I incorporated tokens with clear naming conventions.
              </motion.p>

              <motion.figure
                className="cs-figure-captioned"
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <img
                  src="/assets/images/design-system/Semantic_tokens.webp"
                  alt="Semantic tokens table — token names, light and dark values, descriptions and types"
                  className="cs-image cs-image--no-shadow lightbox-trigger"
                  loading="lazy"
                  tabIndex={0}
                  role="button"
                  onClick={() => openLightbox('/assets/images/design-system/Semantic_tokens.webp', 'Semantic tokens table — token names, light and dark values, descriptions and types')}
                  onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/design-system/Semantic_tokens.webp', 'Semantic tokens table — token names, light and dark values, descriptions and types')}
                />
                <figcaption className="cs-image-caption">Incorporating semantic tokens</figcaption>
              </motion.figure>

              <motion.figure
                className="cs-figure-captioned"
                style={{ marginTop: 'var(--space-6)' }}
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <img
                  src="/assets/images/design-system/Tokens_mapping.webp"
                  alt="Tokens mapping for button component — component tokens mapped to semantic tokens with light and dark values"
                  className="cs-image cs-image--no-shadow lightbox-trigger"
                  loading="lazy"
                  tabIndex={0}
                  role="button"
                  onClick={() => openLightbox('/assets/images/design-system/Tokens_mapping.webp', 'Tokens mapping for button component — component tokens mapped to semantic tokens with light and dark values')}
                  onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/design-system/Tokens_mapping.webp', 'Tokens mapping for button component — component tokens mapped to semantic tokens with light and dark values')}
                />
                <figcaption className="cs-image-caption">Tokens mapping for button component</figcaption>
              </motion.figure>

              {/* Incorporating accessibility subsection */}
              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-8)' }}
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Incorporating accessibility
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                All buttons pass WCAG 2.2 Level AA 1.4.3 contrast at a minimum.
              </motion.p>

              <motion.img
                src="/assets/images/design-system/Buttons.webp"
                alt="Button component states — default, hover, active, focused, disabled across medium, small and large sizes"
                className="cs-image cs-image--no-shadow lightbox-trigger"
                loading="lazy"
                tabIndex={0}
                role="button"
                onClick={() => openLightbox('/assets/images/design-system/Buttons.webp', 'Button component states — default, hover, active, focused, disabled across medium, small and large sizes')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/design-system/Buttons.webp', 'Button component states — default, hover, active, focused, disabled across medium, small and large sizes')}
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              <motion.p
                className="cs-body"
                style={{ marginTop: 'var(--space-6)' }}
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                All input fields pass WCAG 2.2 Level AA 1.4.3 contrast at a minimum.
              </motion.p>

              <motion.img
                src="/assets/images/design-system/Input_fields.webp"
                alt="Input field states — default, focus, error, success, disabled, read-only across all field types"
                className="cs-image cs-image--no-shadow lightbox-trigger"
                loading="lazy"
                tabIndex={0}
                role="button"
                onClick={() => openLightbox('/assets/images/design-system/Input_fields.webp', 'Input field states — default, focus, error, success, disabled, read-only across all field types')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/design-system/Input_fields.webp', 'Input field states — default, focus, error, success, disabled, read-only across all field types')}
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              {/* Testing light and dark mode colours subsection */}
              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-8)' }}
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Testing light and dark mode colours
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Numerous revisions were made on the colour ramps when I checked the dark mode colours, only to find that they were not accessible. Whenever I changed each individual colour, I had to make adjustments to other colours as well to ensure they had similar lightness and saturation. This prompted me to create a minimum acceptable colour combination chart for future references.
              </motion.p>

              <motion.figure
                className="cs-figure-captioned"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <img
                  src="/assets/images/design-system/Colour_Ramp_example.webp"
                  alt="Minimum acceptable colour combination chart — contrast ratios across colour ramps for light and dark mode"
                  className="cs-image cs-image--no-shadow lightbox-trigger"
                  loading="lazy"
                  tabIndex={0}
                  role="button"
                  onClick={() => openLightbox('/assets/images/design-system/Colour_Ramp_example.webp', 'Minimum acceptable colour combination chart — contrast ratios across colour ramps for light and dark mode')}
                  onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/design-system/Colour_Ramp_example.webp', 'Minimum acceptable colour combination chart — contrast ratios across colour ramps for light and dark mode')}
                />
                <figcaption className="cs-image-caption">Minimum acceptable colour combination chart</figcaption>
              </motion.figure>

              <motion.figure
                className="cs-figure-captioned"
                style={{ marginTop: 'var(--space-6)' }}
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <video
                  className="cs-video"
                  src="/assets/videos/design-system/Light-dark-mode.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <figcaption className="cs-image-caption">Reviewing dark mode colours</figcaption>
              </motion.figure>

              {/* Building organisational buy-in subsection */}
              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-8)' }}
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Building organisational buy-in
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Since design systems were new to our organization, I created educational materials to introduce systematic design thinking to stakeholders.
              </motion.p>

              <motion.img
                src="/assets/images/design-system/Design_system_intro.webp"
                alt="Educational materials introducing design system concepts — Introduction to Design System and Design Tokens decks"
                className="cs-image cs-image--no-shadow lightbox-trigger"
                loading="lazy"
                tabIndex={0}
                role="button"
                onClick={() => openLightbox('/assets/images/design-system/Design_system_intro.webp', 'Educational materials introducing design system concepts — Introduction to Design System and Design Tokens decks')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/design-system/Design_system_intro.webp', 'Educational materials introducing design system concepts — Introduction to Design System and Design Tokens decks')}
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

            </section>

            {/* ── 05 Prototype ── */}
            <section id="prototype" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">05</span> Prototype
              </motion.h2>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Design System at work
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Here are snapshots of how components are used.
              </motion.p>

              <motion.figure
                className="cs-figure-captioned"
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <video
                  className="cs-video"
                  src="/assets/videos/design-system/Swapping-components.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <figcaption className="cs-image-caption">Swapping components and states for different use cases</figcaption>
              </motion.figure>

              <motion.figure
                className="cs-figure-captioned"
                style={{ marginTop: 'var(--space-6)' }}
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <video
                  className="cs-video"
                  src="/assets/videos/design-system/Breakpoint-responsiveness.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <figcaption className="cs-image-caption">Creating new page from a template with breakpoint responsiveness set</figcaption>
              </motion.figure>

            </section>

            {/* ── 06 Claude Code Implementation ── */}
            <section id="implementation" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">06</span> Claude Code Integration
              </motion.h2>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Connecting Figma to code with AI
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                With the design system established in Figma, I connected it to Claude Code via the Figma MCP integration, giving Claude direct read access to component structure, variants and tokens, with no manual spec handoffs needed. I documented the full system in a CLAUDE.md file as the source of truth, so every component Claude generates automatically follows the design system's tokens and conventions. This closed the gap between design and development, and the DS is embedded directly into the workflow.
              </motion.p>

            </section>

            {/* ── 07 Impact ── */}

            <section id="impact" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">07</span> Impact
              </motion.h2>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Wins
              </motion.h3>

              <motion.ul
                className="cs-list"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <li>Eliminated manual spec documentation — Claude reads design tokens directly from Figma</li>
                <li>Faster prototyping-to-implementation loop — testing real component behavior in code before developer handoff</li>
                <li>Introduced systematic thinking to the organisation</li>
              </motion.ul>

            </section>

            {/* ── 08 Learnings ── */}
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

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Building a design system from scratch as a first-timer wasn't easy, with unanticipated considerations like scalability and structuring Figma variables to support a future sub-brand. With limited UX maturity, I focused on getting stakeholder buy-in and introducing design thinking to establish a more formal process. The DS was well received by both leadership and the developer team, which was a huge win.
              </motion.p>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Recognising that the existing handoff lacked real process, causing inconsistencies to slip through, this pushed me to introduce Claude Code into the workflow, not just as a build tool, but as a way to formalise handoff and keep design and code in sync going forward.
              </motion.p>

            </section>

          </div>
        </div>

      </main>

      <ProjectNav
        prev={{ title: 'SIMBA Roaming', href: '/roaming' }}
        next={{ title: 'Menocare', href: '/menocare' }}
      />

      <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />
    </PageWrapper>
  );
}
