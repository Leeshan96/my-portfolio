import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/PageWrapper';
import { Lightbox } from '../components/Lightbox';
import '../css/case-study.css';

/* ── Sidenav sections ── */
const sections = [
  { id: 'background',      label: 'Background' },
  { id: 'discovery',       label: 'Discovery' },
  { id: 'mvp',             label: 'Determining the MVP' },
  { id: 'conceptualising', label: 'Conceptualising the Ideas' },
  { id: 'prototype',       label: 'Prototype & Testing' },
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
export default function CaseStudy1() {
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
            <Link to="/" className="cs-breadcrumb">← Work</Link>
            <h1 className="cs-title__heading">Menocare (Menopause App)</h1>
          </div>
        </section>

        {/* ── Hero banner ── */}
        <section className="cs-hero cs-hero--menocare">
          <div className="cs-hero__inner">
            <img
              src="/assets/images/menocare-thumbnail.png"
              alt="Menocare design challenge — winning team"
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
                  <span className="cs-meta__value">User research</span>
                  <span className="cs-meta__value">Prototyping</span>
                  <span className="cs-meta__value">User testing</span>
                </div>
                <div className="cs-meta__col">
                  <span className="cs-meta__label">Duration</span>
                  <span className="cs-meta__value">3 Months</span>
                </div>
                <div className="cs-meta__col">
                  <span className="cs-meta__label">Team</span>
                  <span className="cs-meta__value">4 Designers</span>
                </div>
                <div className="cs-meta__col">
                  <span className="cs-meta__label">Tools</span>
                  <span className="cs-meta__value">Figma</span>
                  <span className="cs-meta__value">Miro</span>
                  <span className="cs-meta__value">Notion</span>
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
                Menocare is a mobile health app designed to support women navigating menopause — a life stage that remains widely stigmatised and underserved in health tech. Using AI and wearable tech, it tracks physical and mental health in one place, so holistic wellness is accessible.
              </motion.p>
              <motion.p
                className="cs-overview__body"
                variants={reveal(0.24)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                This was a 0 → 1 design project done as part of the IterateUX Design Challenge 2024, where my team won first place. I led the team, managed the project timeline, and owned the full design process from research to prototype.
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

              <motion.h3
                className="cs-subsection__heading"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Design challenge prompt
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Create a smart mobile app powered by AI and wearable tech to monitor and boost your well-being. Receive instant feedback on both physical AND mental health, making holistic wellness easily accessible.
              </motion.p>

              <motion.h3
                className="cs-subsection__heading"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Reframing the challenge
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                As the prompt was broad, I did exploratory research on the health tech landscape and decided on menopause as it was a stigmatised topic not talked about. This limited women's awareness and access to information, affecting their ability to cope with symptoms. So I wanted to use this opportunity to bring awareness and destigmatise women's health issues.
              </motion.p>

              <motion.div
                className="cs-callout"
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-callout__label">The Goal</span>
                <p className="cs-callout__body">How might we empower menopausal women with knowledge and support so they can navigate this transition with ease?</p>
              </motion.div>

            </section>
            {/* ── Discovery ── */}
            <section id="discovery" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">02</span> Discovery
              </motion.h2>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                To understand how to best support women through menopause, we conducted primary and secondary research. Our goal was to uncover the real challenges, behaviours, and needs that would inform a meaningful solution.
              </motion.p>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Desktop research
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                First, I needed to find out what the existing problems and gaps in the current market were.
              </motion.p>

              <motion.ul
                className="cs-list"
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <li>Secondary research shows 90% of women were never educated about Menopause, &gt;60% started looking for information only when symptoms started.</li>
                <li>The World Health Organisation (WHO) reports that awareness and access to menopause information and services are significant challenges worldwide as it is often not discussed in all settings.</li>
              </motion.ul>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Competitive analysis
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                After my team had decided on the topic, we began to look at the existing menopause apps to identify gaps and opportunities. I focused on Balance app as it is the leading B2C menopause app in the UK with extensive research that could be leveraged on. Through this, I was able to identify similar features competitors had and key problem areas to solve.
              </motion.p>

              <motion.img
                loading="lazy"
                src="/assets/images/menocare/Competitor_Analysis.webp"
                alt="Competitive analysis of menopause apps"
                className="cs-image cs-image--flat lightbox-trigger" tabIndex={0} role="button"
                onClick={() => openLightbox('/assets/images/menocare/Competitor_Analysis.webp', 'Competitive analysis of menopause apps')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/menocare/Competitor_Analysis.webp', 'Competitive analysis of menopause apps')}
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-7)' }}
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Deeper dive into Balance App's book consultation flow
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                While analysing the booking flow, I noted down the questions I had and incorporated these insights into the user flows.
              </motion.p>

              <motion.img
                loading="lazy"
                src="/assets/images/menocare/Competitor_Analysis_-_Book_consultation.webp"
                alt="Balance App book consultation flow analysis"
                className="cs-image cs-image--no-shadow lightbox-trigger" tabIndex={0} role="button"
                onClick={() => openLightbox('/assets/images/menocare/Competitor_Analysis_-_Book_consultation.webp', 'Balance App book consultation flow analysis')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/menocare/Competitor_Analysis_-_Book_consultation.webp', 'Balance App book consultation flow analysis')}
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              {/* ── User interviews ── */}
              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-7)' }}
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                User interviews
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                We interviewed 6 diverse menopausal women in their 40s and 50s regarding their awareness, attitudes and experiences related to menopause and their attitudes towards technology.
              </motion.p>

              <motion.h4
                className="cs-subsection__heading"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Key takeaways
              </motion.h4>

              <motion.div
                className="cs-stat-grid"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                {[
                  { stat: '67%', body: 'Unable to cope with menopausal symptoms due to lack of knowledge' },
                  { stat: '67%', body: 'Healthcare providers downplay their menopausal symptoms' },
                  { stat: '83%', body: 'Open towards wearables that fit easily into their lifestyles' },
                ].map(({ stat, body }) => (
                  <motion.div
                    key={stat + body}
                    className="cs-stat-card"
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                    }}
                  >
                    <span className="cs-stat-card__stat">{stat}</span>
                    <p className="cs-stat-card__body">{body}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.img
                loading="lazy"
                src="/assets/images/menocare/Menocare_user_insights.webp"
                alt="Menocare user research insights"
                className="cs-image cs-image--no-shadow lightbox-trigger" tabIndex={0} role="button"
                onClick={() => openLightbox('/assets/images/menocare/Menocare_user_insights.webp', 'Menocare user research insights')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/menocare/Menocare_user_insights.webp', 'Menocare user research insights')}
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              <motion.h4
                className="cs-subsection__heading"
                style={{ marginTop: 'var(--space-6)' }}
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Opportunity:
              </motion.h4>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                These insights highlighted a critical need: women required accessible education, practical coping tools, and trusted support to navigate menopause effectively.
              </motion.p>

              {/* ── Personas ── */}
              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-7)' }}
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Personas
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                From the interviews, we identified differences in tech comfort, knowledge and coping strategies. This led to the creation of 2 personas with different tech savvy levels to ensure we made inclusive design decisions.
              </motion.p>

              <motion.img
                loading="lazy"
                src="/assets/images/menocare/User_personas.webp"
                alt="User personas for Menocare"
                className="cs-image cs-image--no-shadow lightbox-trigger" tabIndex={0} role="button"
                onClick={() => openLightbox('/assets/images/menocare/User_personas.webp', 'User personas for Menocare')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/menocare/User_personas.webp', 'User personas for Menocare')}
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

            </section>
            {/* ── Determining the MVP ── */}
            <section id="mvp" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">03</span> Determining the MVP
              </motion.h2>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                After uncovering the problem, we came up with many ideas (including gamification to encourage user engagement), but ultimately prioritised the key features based on our problem statement.
              </motion.p>

              <motion.div
                className="cs-feature-grid"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {[
                  { num: '1', body: 'Alert users when they should seek for medical support' },
                  { num: '2', body: 'Access to healthcare professionals well-verse in women\'s health' },
                  { num: '3', body: 'Educational content to understand menopause and its effects' },
                  { num: '4', body: 'Support group through community' },
                  { num: '5', body: 'AI Personalised recommendations for coping methods' },
                ].map(({ num, body }) => (
                  <motion.div
                    key={num}
                    className="cs-feature-card"
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                    }}
                  >
                    <span className="cs-feature-card__num">{num}</span>
                    <p className="cs-feature-card__body">{body}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.img
                loading="lazy"
                src="/assets/images/menocare/Prioritisation_matrix.webp"
                alt="Prioritisation matrix to determine MVP"
                className="cs-image cs-image--no-shadow lightbox-trigger" tabIndex={0} role="button"
                style={{ marginTop: 'var(--space-7)' }}
                onClick={() => openLightbox('/assets/images/menocare/Prioritisation_matrix.webp', 'Prioritisation matrix to determine MVP')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/menocare/Prioritisation_matrix.webp', 'Prioritisation matrix to determine MVP')}
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              <motion.p
                className="cs-image-caption"
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Prioritisation matrix to determine MVP
              </motion.p>

            </section>
            {/* ── Conceptualising the Ideas ── */}
            <section id="conceptualising" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">04</span> Conceptualising the Ideas
              </motion.h2>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                User flows
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                I created user flows, taking into account insights from my competitive analysis. For "Book a doctor" flow, users could select their previously visited doctor which saved them considerable time during search. For "Emergency alert" flow, we had to determine when users switched from smart watch to mobile interface, and what screen types were needed.
              </motion.p>

              <motion.img
                loading="lazy"
                src="/assets/images/menocare/Userflow.webp"
                alt="User flows for Menocare"
                className="cs-image cs-image--no-shadow lightbox-trigger" tabIndex={0} role="button"
                style={{ marginTop: 'var(--space-7)' }}
                onClick={() => openLightbox('/assets/images/menocare/Userflow.webp', 'User flows for Menocare')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/menocare/Userflow.webp', 'User flows for Menocare')}
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              {/* ── Style guide ── */}
              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-7)' }}
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Style guide
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                To determine the look and feel we wanted to achieve, we came up with a style guide. The colour purple was chosen as it is a calming colour that can help women who are anxious with menopause. The font Inter was used as it is modern, clean and with good readability.
              </motion.p>

              <motion.img
                loading="lazy"
                src="/assets/images/menocare/Style_guide.webp"
                alt="Style guide for Menocare"
                className="cs-image cs-image--no-shadow lightbox-trigger" tabIndex={0} role="button"
                style={{ marginTop: 'var(--space-7)' }}
                onClick={() => openLightbox('/assets/images/menocare/Style_guide.webp', 'Style guide for Menocare')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/menocare/Style_guide.webp', 'Style guide for Menocare')}
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              <motion.p
                className="cs-image-caption"
                variants={reveal(0.24)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Style guide for Menocare
              </motion.p>

            </section>
            {/* ── Prototype & Testing ── */}
            <section id="prototype" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">05</span> Prototype &amp; Testing
              </motion.h2>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Navigating unexpected setbacks during usability testing
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                We conducted 2 rounds of usability testing with 4 participants each. The first round was where we faced major setback as most participants could not complete majority tasks without prompts. Each team member conducted 1 usability testing and we gathered only to find that our participants experienced similar difficulties. We were at a lost given that time was running out. Here, I suggested we focus on building the key features (emergency alert, find a doctor, educational content, community) and others were secondary. We took feedback received seriously and made iterations based on them.
              </motion.p>

              <motion.h4
                className="cs-subsection__heading"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Key takeaways
              </motion.h4>

              <motion.div
                className="cs-stat-grid"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {[
                  { num: '1', body: 'Navigation was unclear with participants getting stuck. We needed to make it clear and intuitive.' },
                  { num: '2', body: 'Participants were less tech savvy than we thought. They were unable to interpret the icons used and layout was complicated to them. We needed to cater to their age group by simplifying things.' },
                  { num: '3', body: 'Participants were most interested in educational content more than anything.' },
                ].map(({ num, body }) => (
                  <motion.div
                    key={num}
                    className="cs-stat-card"
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                    }}
                  >
                    <span className="cs-stat-card__stat">{num}</span>
                    <p className="cs-stat-card__body">{body}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* ── Design iterations ── */}
              <motion.h3
                className="cs-h3"
                style={{ marginTop: 'var(--space-7)' }}
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Design iterations
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Based on the feedback received, we iterated on the designs to make them more intuitive for middle-aged users. I made iterations for the Home screen and worked on the UI for all final versions after the Design Challenge concluded.
              </motion.p>

              <motion.img
                loading="lazy"
                src="/assets/images/menocare/Prototype_iteration_1.webp"
                alt="Iterations for Emergency Alert pop-up"
                className="cs-image cs-image--no-shadow lightbox-trigger" tabIndex={0} role="button"
                style={{ marginTop: 'var(--space-7)' }}
                onClick={() => openLightbox('/assets/images/menocare/Prototype_iteration_1.webp', 'Iterations for Emergency Alert pop-up')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/menocare/Prototype_iteration_1.webp', 'Iterations for Emergency Alert pop-up')}
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              <motion.p
                className="cs-image-caption"
                variants={reveal(0.24)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Iterations for Emergency Alert pop-up
              </motion.p>

              <motion.img
                loading="lazy"
                src="/assets/images/menocare/Prototype_iteration_2.webp"
                alt="Iterations for Home screen"
                className="cs-image cs-image--no-shadow lightbox-trigger" tabIndex={0} role="button"
                style={{ marginTop: 'var(--space-7)' }}
                onClick={() => openLightbox('/assets/images/menocare/Prototype_iteration_2.webp', 'Iterations for Home screen')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/menocare/Prototype_iteration_2.webp', 'Iterations for Home screen')}
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              <motion.p
                className="cs-image-caption"
                variants={reveal(0.24)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Iterations for Home screen
              </motion.p>

              <motion.img
                loading="lazy"
                src="/assets/images/menocare/Prototype_iteration_3.webp"
                alt="Iterations for doctor selection screen"
                className="cs-image cs-image--no-shadow lightbox-trigger" tabIndex={0} role="button"
                style={{ marginTop: 'var(--space-7)' }}
                onClick={() => openLightbox('/assets/images/menocare/Prototype_iteration_3.webp', 'Iterations for doctor selection screen')}
                onKeyDown={(e) => onLightboxKeyDown(e, '/assets/images/menocare/Prototype_iteration_3.webp', 'Iterations for doctor selection screen')}
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              />

              <motion.p
                className="cs-image-caption"
                variants={reveal(0.24)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Iterations for doctor selection screen
              </motion.p>

            </section>
            {/* ── Impact ── */}
            <section id="impact" className="cs-section">

              <motion.h2
                className="cs-section__heading"
                variants={reveal(0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <span className="cs-section__num">06</span> Impact
              </motion.h2>

              <motion.h3
                className="cs-h3"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                Emerging as the winning team
              </motion.h3>

              <motion.p
                className="cs-body"
                variants={reveal(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                After making 2 rounds of iterations, we managed to significantly improve the task success rates where users were able to complete the core tasks. These improvements validated our design changes, showing that simplifying navigation and layout greatly enhanced usability for our target audience.
              </motion.p>

              <motion.ul
                className="cs-list"
                variants={reveal(0.18)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <li>Book a doctor's appointment → 75% improvement</li>
                <li>Accessing emergency alert screen → 50% improvement</li>
                <li>Using AI assistance → 100% improvement</li>
              </motion.ul>

              <motion.div
                className="cs-callout"
                style={{ marginTop: 'var(--space-6)' }}
                variants={reveal(0.24)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <p className="cs-callout__body cs-callout__body--regular">The user-centred solutions addressed real user pain points (lack of education and support from providers, difficulty coping with multiple symptoms) from research to design decisions. This iterative process led to my team winning the design challenge.</p>
              </motion.div>

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
                <span className="cs-section__num">07</span> Learnings
              </motion.h2>

              <motion.p
                className="cs-body"
                variants={reveal(0.06)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                There were many struggles faced and it was not an easy one, from identifying the problem I wanted to address, to creating intuitive solutions. Looking back, I enjoyed this process of navigating through muddled waters and I am grateful for the invaluable learning experience with these takeaways:
              </motion.p>

              <motion.div
                className="cs-stat-grid cs-stat-grid--vertical"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div
                  className="cs-stat-card"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                  }}
                >
                  <span className="cs-stat-card__stat">1</span>
                  <p className="cs-stat-card__body--rich"><strong>User attitudes</strong> Women from diverse cultures were guarded about discussing sexual health, reinforcing how sensitive the topic is. Making them feel safe and seen was a priority.</p>
                </motion.div>

                <motion.div
                  className="cs-stat-card"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                  }}
                >
                  <span className="cs-stat-card__stat">2</span>
                  <p className="cs-stat-card__body--rich"><strong>Designing for target audience</strong> We initially overlooked that our users were women 40+, many not tech-savvy — a gap our first usability testing quickly exposed.</p>
                </motion.div>

                <motion.div
                  className="cs-stat-card"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                  }}
                >
                  <span className="cs-stat-card__stat">3</span>
                  <p className="cs-stat-card__body--rich"><strong>Personal growth</strong> This challenge sharpened my ability to translate research into inclusive design, collaborate under pressure, and advocate for users in overlooked spaces.</p>
                </motion.div>
              </motion.div>

            </section>

          </div>
        </div>

      </main>

      <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />
    </PageWrapper>
  );
}
