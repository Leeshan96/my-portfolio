# Portfolio Website – Claude Code Instructions

## Project Overview
This is a personal product design portfolio website for **Lian Lee Shan**. Build it with clean, semantic code that is easy to maintain. The design is warm, minimal, and refined — let the work speak for itself.

**Build order:** Home page first, then page by page. Do not scaffold all pages at once.

**Logo:** The site logo is an SVG file provided by the owner — use it as-is in the nav, do not render the name as text.

**Images:** A mix of real images and placeholders will be used during build. Use a neutral placeholder (e.g. a light grey `<div>` with the correct aspect ratio) wherever real images are not yet available. Placeholder `alt` text should describe what will go there (e.g. `alt="Case study 1 cover image — placeholder"`).

**Home page hero:** Faithfully replicate the layout from the reference screenshot:
- Top-center: "Hi, I'm Lee Shan" in `--color-text-secondary`
- Below: the photo cluster of 3 personal images (overlapping, slight random rotations)
- Below that: the large bold tagline — "A product designer who solves complex problems. Thinking people, systems, and constraints before pixels." in `--text-h1`
- Below that: "Currently a designer @ SIMBA Telecom" in `--color-text-secondary` and `--text-body-2-regular`
- CTA button: "Let's chat!" — pill shape, dark fill (`--color-text-primary`), white text

**About page copy:** Use well-written placeholder copy in the voice of a product designer based in Singapore. It will be replaced with real content later.

**3rd case study:** The Menocare case study (design challenge, winning team, 2023) is the third card. It has a real thumbnail — use it. No "coming soon" treatment needed unless explicitly told otherwise.

**Case study card backgrounds:** Each work card uses a background colour derived from the thumbnail image provided. Do not use white or generic grey. Extract the dominant/ambient colour from the mockup and apply it as the card's background:
- SIMBA Roaming Page → warm cream/yellow (`#FFF8E8` or similar sampled from the mockup)
- SIMBA Design System → cool light grey-blue (`#F0F2F5` or similar)
- Menocare → soft lavender/off-white (`#F5F3FA` or similar)
- Currently App (side project) → warm yellow-green (`#F5F2DC` or similar)
When given a new mockup image, always sample its ambient colour and use that as the card background. Never default to white.

**Background colour rule:** `#F9F9F9` (`--color-bg-primary`) is the page background throughout. Card-level backgrounds use the per-card sampled colour above. Light grey (`--color-bg-secondary`) and light blue (`--color-bg-light-blue`) are only used for small inline elements such as callout blocks — never for full-width page sections.

**Deployment:** Custom domain is ready. Build with clean URLs and no trailing slashes. Netlify handles routing.

---

## Tech Stack
- **React** (via Vite) — component-based pages, one component per page
- **CSS Modules** or a single global CSS file with custom properties — no Tailwind, no CSS-in-JS
- **Framer Motion** — all scroll reveals, page transitions, hover animations, and spring effects
- **No other animation libraries** — remove GSAP. Framer Motion replaces it entirely.
- **Vanilla JS** — only for things Framer Motion cannot handle (e.g. lightbox DOM overlay)
- **Vite** — build tool, dev server, and Netlify deploy via `npm run build` → `dist/`

> **Migration note:** The previous spec used plain HTML + GSAP. This project now uses React + Vite + Framer Motion. Do not write plain HTML files. Every page is a React component.

---

## File Structure
```
/
├── public/
│   └── assets/
│       ├── fonts/          # Self-hosted Inter Display .woff2 files
│       ├── images/         # Case study thumbnails and photos
│       ├── icons/
│       │   └── logo.svg    # Site logo — provided by owner
│       └── resume.pdf
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Router setup (React Router v6)
│   ├── css/
│   │   ├── tokens.css      # Design tokens (imported globally)
│   │   ├── global.css      # Reset, base styles, scroll behaviour
│   │   ├── nav.css
│   │   └── footer.css
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Footer.jsx
│   │   ├── ImageCluster.jsx
│   │   ├── Lightbox.jsx
│   │   └── WorkCard.jsx
│   └── pages/
│       ├── Home.jsx
│       ├── About.jsx
│       ├── CaseStudy1.jsx
│       ├── CaseStudy2.jsx
│       ├── CaseStudy3.jsx
│       └── PersonalProject.jsx
├── index.html              # Vite entry HTML
├── vite.config.js
└── package.json
```

---

## Design Tokens

### Colours
```css
:root {
  /* Text */
  --color-text-primary:     #252422;
  --color-text-secondary:   #6F6C62;
  --color-text-grey:        #6F6F82;
  --color-accent:           #D64933;
  --color-text-inverse:     #FFFFFF;

  /* Backgrounds */
  --color-bg-primary:       #F9F9F9;
  --color-bg-secondary:     #F3F3F3;
  --color-bg-light-blue:    #F2F6FD;

  /* Border */
  --color-border-primary:   #E0DDD7;

  /* Card backgrounds — sampled from mockup thumbnails */
  --color-card-simba-roaming:  #FFF8E8;
  --color-card-simba-ds:       #F0F2F5;
  --color-card-menocare:       #F5F3FA;
  --color-card-currently:      #F5F2DC;
}
```

### Typography
Font family: **'Inter Display'** — self-hosted. Do NOT use Google Fonts CDN.

```css
@font-face {
  font-family: 'Inter Display';
  src: url('/assets/fonts/InterDisplay-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Inter Display';
  src: url('/assets/fonts/InterDisplay-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Inter Display';
  src: url('/assets/fonts/InterDisplay-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Inter Display';
  src: url('/assets/fonts/InterDisplay-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

```css
:root {
  --font-family: 'Inter Display', sans-serif;

  /* Headings */
  --text-h1: 500 40px/1.1 var(--font-family);
  --text-h2: 500 32px/1.4 var(--font-family);
  --text-h3: 500 24px/1.4 var(--font-family);
  --text-h4: 500 20px/1.8 var(--font-family);
  --text-h5: 500 18px/1.4 var(--font-family);
  --text-h6: 500 16px/1.4 var(--font-family);

  /* Body */
  --text-body-1-medium:  500 16px/1.6 var(--font-family);
  --text-body-1-regular: 400 16px/1.6 var(--font-family);
  --text-body-2-medium:  500 14px/1.6 var(--font-family);
  --text-body-2-regular: 400 14px/1.6 var(--font-family);

  /* Letter spacing applied inline: 0.02em on all headings and body */
}
```

### Spacing Scale
```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-7:  48px;
  --space-8:  64px;
  --space-9:  96px;
  --space-10: 128px;
}
```

### Border Radius
```css
:root {
  --radius-sm:   8px;
  --radius-md:   16px;
  --radius-lg:   24px;
  --radius-xl:   32px;
  --radius-full: 9999px;
}
```

### Navigation & Global Layout Tokens
```css
:root {
  --nav-height: 80px;
}
```

---

## Layout & Breakpoints
Desktop-first approach.

```css
/* Desktop – base styles (1280px+) */

/* Tablet */
@media (max-width: 1024px) { }

/* Mobile */
@media (max-width: 640px) { }
```

Max content width: `1200px`, centered with `margin: 0 auto` and `padding: 0 var(--space-6)`.

---

## Animations & Interactions — Framer Motion

> All animations use **Framer Motion**. Do not use GSAP, AOS, or raw CSS keyframes for motion effects. CSS `transition` is still fine for simple hover colour/shadow changes that don't need spring physics.

### Philosophy
- Animations are **purposeful and subtle** — they guide attention, they don't perform
- Every animation fires **once on enter** (not on scroll out)
- Hero content animates on **page load**, not scroll
- Keep durations tight: reveals 0.4–0.6s, micro-interactions 0.15–0.25s
- Respect `prefers-reduced-motion` — wrap all motion in a check or use Framer's `useReducedMotion()`

---

### 1. Page Load — Hero Entrance

Stagger-animate the hero elements on mount using `motion.div` with `initial`, `animate`, and `transition`.

```jsx
import { motion } from 'framer-motion';

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94], // ease-out-quart
    },
  }),
};

// Usage — each hero child gets a custom index:
<motion.p variants={heroVariants} initial="hidden" animate="visible" custom={0}>
  Hi, I'm Lee Shan
</motion.p>
<motion.div variants={heroVariants} initial="hidden" animate="visible" custom={1}>
  {/* Photo cluster */}
</motion.div>
<motion.h1 variants={heroVariants} initial="hidden" animate="visible" custom={2}>
  A product designer who solves...
</motion.h1>
<motion.p variants={heroVariants} initial="hidden" animate="visible" custom={3}>
  Currently a designer @ SIMBA Telecom
</motion.p>
<motion.div variants={heroVariants} initial="hidden" animate="visible" custom={4}>
  {/* CTA button */}
</motion.div>
```

---

### 2. Scroll Reveal — Section Content

Use Framer Motion's `whileInView` with `viewport={{ once: true, amount: 0.15 }}` for all below-fold content. No IntersectionObserver JS needed.

```jsx
// Single element reveal
<motion.h2
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.15 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  Section title
</motion.h2>

// Staggered group — wrap in motion.div with staggerChildren
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
  className="work-grid"
>
  {cards.map(card => (
    <motion.div key={card.id} variants={itemVariants}>
      <WorkCard {...card} />
    </motion.div>
  ))}
</motion.div>
```

Apply scroll reveal to: section headings, body paragraphs, work cards, side project cards, images.
Do NOT apply to: nav, footer, hero content (use page load animation instead).

---

### 3. Work Card — Hover Micro-interactions

Each work card gets a subtle lift + shadow on hover using `whileHover`. The thumbnail image scales up slightly inside its container (overflow hidden).

```jsx
<motion.article
  className="work-card"
  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
  transition={{ duration: 0.25, ease: 'easeOut' }}
>
  <div className="work-card__image-wrap">
    <motion.img
      src={thumbnail}
      alt={alt}
      className="work-card__image"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    />
  </div>
  <div className="work-card__meta">
    <span className="work-card__title">{title}</span>
    <span className="work-card__year">{year}</span>
  </div>
</motion.article>
```

Card CSS:
```css
.work-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--card-bg); /* set via inline style from token */
  cursor: pointer;
}

.work-card__image-wrap {
  overflow: hidden;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.work-card__image {
  width: 100%;
  display: block;
  object-fit: cover;
}

.work-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-5);
  font: var(--text-body-2-regular);
  color: var(--color-text-secondary);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
```

---

### 4. Photo Cluster — Spring Fan on Hover (Hero)

Replace the GSAP image cluster with a Framer Motion version. Three overlapping photos in the hero that fan out on hover.

```jsx
import { motion, useAnimation } from 'framer-motion';

const defaultPositions = [
  { rotate: -6, x: -30, y: 0, zIndex: 1 },
  { rotate: 2,  x: 0,  y: -8, zIndex: 3 },  // centre photo, slightly raised
  { rotate: 8,  x: 28, y: 4,  zIndex: 2 },
];

const hoveredPositions = [
  { rotate: -12, x: -80, y: 0 },
  { rotate: 0,   x: 0,   y: -16 },
  { rotate: 12,  x: 80,  y: 0 },
];

const springConfig = { type: 'spring', stiffness: 300, damping: 20 };

function ImageCluster({ images }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="image-cluster"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {images.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt=""
          className="cluster-img"
          animate={hovered ? hoveredPositions[i] : defaultPositions[i]}
          transition={{ ...springConfig, delay: i * 0.04 }}
          style={{ zIndex: defaultPositions[i].zIndex }}
        />
      ))}
    </div>
  );
}
```

```css
.image-cluster {
  position: relative;
  width: 200px;
  height: 140px;
  margin: 0 auto;
}

.cluster-img {
  position: absolute;
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: var(--radius-md);
  border: 3px solid #FFFFFF;
  box-shadow: 0 4px 20px rgba(0,0,0,0.10);
  top: 50%;
  left: 50%;
  transform-origin: center center;
  margin-top: -45px;
  margin-left: -60px;
}
```

---

### 5. Standalone Image — Spring Rotation on Hover

For profile photo (about page) and any single decorative image.

```jsx
<motion.img
  src={src}
  alt={alt}
  className="image-card"
  whileHover={{ rotate: 5, scale: 1.02 }}
  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
/>
```

---

### 6. CTA Button — Lift on Hover

```jsx
<motion.a
  href="mailto:lianleeshan@gmail.com"
  className="btn btn--primary"
  whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(37,36,34,0.18)' }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
  Let's chat!
</motion.a>
```

```css
.btn--primary {
  display: inline-block;
  padding: var(--space-3) var(--space-6);
  background: var(--color-text-primary);
  color: var(--color-text-inverse);
  border-radius: var(--radius-full);
  font: var(--text-body-1-medium);
  letter-spacing: 0.02em;
  text-decoration: none;
}
```

---

### 7. Nav Link — Underline Slide-in

Use CSS only (no Framer needed for this):

```css
.nav-link {
  position: relative;
  color: var(--color-text-primary);
  text-decoration: none;
  font: var(--text-body-1-regular);
  letter-spacing: 0.02em;
  transition: color 0.2s ease-out;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--color-accent);
  transition: width 0.25s ease-out;
}

.nav-link:hover::after,
.nav-link.is-active::after {
  width: 100%;
}

.nav-link.is-active {
  color: var(--color-accent);
}
```

---

### 8. Page Transitions

Wrap each page component in a `<motion.div>` with a fade-in transition. Apply in a shared `PageWrapper` component used by all pages.

```jsx
// src/components/PageWrapper.jsx
import { motion } from 'framer-motion';

export function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

Wrap `<Routes>` in `<AnimatePresence mode="wait">` in `App.jsx`.

---

### 9. Lightbox — Framer Motion Overlay

Use Framer Motion's `AnimatePresence` to animate the lightbox in and out.

```jsx
import { AnimatePresence, motion } from 'framer-motion';

function Lightbox({ src, alt, onClose }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.img
            src={src}
            alt={alt}
            className="lightbox-image"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            onClick={e => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

```css
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: zoom-out;
}

.lightbox-image {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: var(--radius-lg);
  object-fit: contain;
}
```

---

### 10. Reduced Motion

Always respect `prefers-reduced-motion`. Apply globally:

```jsx
// In App.jsx or a global hook
import { useReducedMotion } from 'framer-motion';

// Or apply in CSS as a safety net:
```

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Navigation

- Nav scrolls with the page, background `var(--color-bg-primary)` (#F9F9F9)
- Height: `var(--nav-height)` (80px)
- Left: Logo SVG — `<img src="/assets/icons/logo.svg" alt="Lian Lee Shan">` linking to `/`
- Right: `Work` → `/`, `About` → `/about`, `Resume` → opens `/assets/resume.pdf` in new tab
- Active page: use React Router's `useLocation()` to add `.is-active` class to the matching link
- Mobile: hamburger menu, links stack vertically in a slide-down drawer (animate with Framer `motion.div` + `AnimatePresence`)

---

## Work Grid Layout (Home Page)

Replicate the layout from the reference screenshot exactly:
- Section label: `01 WORK` — small caps, `--color-text-secondary`, `--text-body-2-medium`
- Row 1: 2 cards side by side (SIMBA Roaming Page, SIMBA Design System) — roughly equal width
- Row 2: 1 card full-width left column (Menocare) — leave right half empty OR use it for a subtle label/annotation
- Each card: background from `--color-card-*` token, thumbnail image centred/padded inside the card, metadata row below (title left, year right, uppercase, small caps)
- Gap between cards: `var(--space-6)`

```jsx
// WorkCard receives: title, tags, year, thumbnail, cardBg, href
<WorkCard
  title="SIMBA Roaming Page"
  tags={[]}
  year="2025"
  thumbnail="/assets/images/simba-roaming.png"
  cardBg="var(--color-card-simba-roaming)"
  href="/case-study-1"
/>
```

---

## Side Projects Grid (Home Page)

- Section label: `02 SIDE PROJECTS`
- 1 card visible (Currently App — Lovable, 2026), warm yellow-green card bg
- Layout matches work cards (same component, same metadata row)

---

## Footer

Shared across all pages. Single row, `border-top: 1px solid var(--color-border-primary)`.

```
[Say hi]  [lianleeshan@gmail.com]  [Linkedin]          [© 2026]
```

- "Say hi" — plain text label, `--color-text-secondary`
- Email and LinkedIn — text links in `--color-text-primary`, hover to `--color-accent`
- LinkedIn: `target="_blank" rel="noopener"`
- "© 2026" — right-aligned, `--color-text-secondary`, `--text-body-2-regular`
- Footer padding: `var(--space-6)` top and bottom

```jsx
<footer className="site-footer">
  <div className="footer-inner">
    <div className="footer-left">
      <span className="footer-label">Say hi</span>
      <a href="mailto:lianleeshan@gmail.com" className="footer-link">lianleeshan@gmail.com</a>
      <a href="https://linkedin.com/in/YOUR-HANDLE" target="_blank" rel="noopener" className="footer-link">Linkedin</a>
    </div>
    <div className="footer-right">
      <span className="footer-updated">© 2026</span>
    </div>
  </div>
</footer>
```

---

## Case Study – Sticky Side Navigation

### Layout
Two-column CSS grid:
- Left (~220px): sticky `<aside>` with section links
- Right (1fr): scrollable content

```jsx
<div className="case-study-layout">
  <aside className="case-study-sidenav">
    <nav>
      <a href="#overview" className="sidenav-link">Overview</a>
      {/* ... links matching actual sections */}
    </nav>
  </aside>
  <main className="case-study-content">
    <section id="overview">...</section>
  </main>
</div>
```

### CSS
```css
.case-study-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: var(--space-8);
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.case-study-sidenav {
  position: sticky;
  top: calc(var(--nav-height) + var(--space-6));
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.sidenav-link {
  display: block;
  padding: var(--space-2) 0;
  padding-left: var(--space-3);
  color: var(--color-text-secondary);
  text-decoration: none;
  font: var(--text-body-1-regular);
  transition: color 0.2s ease-out;
  border-left: 2px solid transparent;
}

.sidenav-link:hover { color: var(--color-text-primary); }

.sidenav-link.is-active {
  color: var(--color-text-primary);
  font: var(--text-body-1-medium);
  border-left-color: var(--color-accent);
}
```

### Active Link Tracking
Use `IntersectionObserver` in a `useSidenav()` React hook — same logic as before, but as a hook.

### Responsive
- **≤1024px:** Hide sidenav, show horizontal scrollable pill nav below top nav
- **≤640px:** Remove section nav entirely

---

## Image Conventions
- All images: `border-radius: var(--radius-lg)`, `box-shadow: 0 4px 20px rgba(0,0,0,0.10)`
- `object-fit: cover` inside fixed containers
- Always descriptive `alt` text

---

## Scroll Behaviour (Global CSS)
```css
html {
  scroll-behavior: smooth;
}

section[id] {
  scroll-margin-top: calc(var(--nav-height) + var(--space-5));
}
```

---

## Code Conventions
- CSS custom properties everywhere — never hardcode colours or font sizes
- Class names: lowercase, hyphenated (BEM-lite: `.card`, `.card__title`, `.card--featured`)
- No inline styles except for dynamic values passed from JS/React (e.g. `cardBg` prop)
- Comment sections in both JSX and CSS
- Optimise images before adding to `/public/assets/images/` — max 200KB per image
- All components must be accessible: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, proper heading hierarchy, focus states

---

## Deployment
- **Vite build:** `npm run build` → outputs to `dist/`
- **Netlify:** drag and drop `dist/` folder, or connect GitHub repo
- Add `public/_redirects` for React Router SPA routing:
  ```
  /*  /index.html  200
  ```
- Custom domain configured in Netlify settings
