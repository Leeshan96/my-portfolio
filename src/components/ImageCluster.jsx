import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

/* ── Photo fan positions ── */
const defaultPositions = [
  { rotate: -5, x: -90, y: 0 },
  { rotate:  0, x:   0, y: 0 },
  { rotate:  5, x:  86, y: 0 },
];

const hoveredPositions = [
  { rotate: -10, x: -150, y: 0 },
  { rotate:   0, x:    0, y: -18 },
  { rotate:  10, x:  150, y: 0 },
];

// Tighter fan for mobile — images stay within the narrower container
const hoveredPositionsMobile = [
  { rotate: -10, x: -100, y: 0 },
  { rotate:   0, x:    0, y: -18 },
  { rotate:  10, x:  100, y: 0 },
];

const zIndices = [1, 3, 2];
const springConfig = { type: 'spring', stiffness: 280, damping: 22 };

/* ── Component ── */
export function ImageCluster({ images, tooltips = [], motionProps = {} }) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth <= 640
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  const tooltipEl = useRef(null);

  /* Inject a single reusable tooltip div into <body> on mount */
  useEffect(() => {
    const el = document.createElement('div');
    el.className = 'image-tooltip';
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);
    tooltipEl.current = el;
    return () => el.remove();
  }, []);

  const positionTooltip = useCallback((clientX, clientY) => {
    const el = tooltipEl.current;
    if (!el) return;
    el.style.left = `${clientX + 16}px`;
    el.style.top  = `${clientY}px`;
  }, []);

  const showTooltip = useCallback((e, text) => {
    const el = tooltipEl.current;
    if (!el || !text) return;
    el.textContent = text;
    positionTooltip(e.clientX, e.clientY);
    el.classList.add('is-visible');
  }, [positionTooltip]);

  const moveTooltip = useCallback((e) => {
    if (!tooltipEl.current?.classList.contains('is-visible')) return;
    positionTooltip(e.clientX, e.clientY);
  }, [positionTooltip]);

  const hideTooltip = useCallback(() => {
    tooltipEl.current?.classList.remove('is-visible');
  }, []);

  return (
    <motion.div
      className="image-cluster"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); hideTooltip(); }}
      aria-hidden="true"
      {...motionProps}
    >
      {images.map((src, i) => {
        const fanPositions = isMobile ? hoveredPositionsMobile : hoveredPositions;
        const target = hovered ? fanPositions[i] : defaultPositions[i];
        return (
          <motion.img
            key={i}
            src={src}
            alt=""
            className="cluster-img"
            animate={{ rotate: target.rotate, x: target.x, y: target.y }}
            transition={{ ...springConfig, delay: i * 0.04 }}
            style={{ zIndex: zIndices[i] }}
            onMouseEnter={(e) => showTooltip(e, tooltips[i])}
            onMouseMove={moveTooltip}
            onMouseLeave={hideTooltip}
          />
        );
      })}
    </motion.div>
  );
}
