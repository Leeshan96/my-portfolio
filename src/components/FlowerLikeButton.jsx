import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLOWERS = [
  '/assets/icons/flower-green.svg',
  '/assets/icons/flower-pink.svg',
  '/assets/icons/flower-purple.svg',
  '/assets/icons/flower-yellow.svg',
  '/assets/icons/flower-red.svg',
];

// Pre-defined fan trajectories so flowers spread symmetrically
const BASE_TRAJECTORIES = [
  { x: -44, y: -72 },
  { x: -20, y: -90 },
  { x:   4, y: -96 },
  { x:  28, y: -88 },
  { x:  50, y: -68 },
];

let _id = 0;

function makeBurst() {
  return FLOWERS.map((flower, i) => ({
    id: ++_id,
    flower,
    x: BASE_TRAJECTORIES[i].x + (Math.random() * 12 - 6),
    y: BASE_TRAJECTORIES[i].y + (Math.random() * 14 - 7),
    rotate: Math.random() * 50 - 25,
  }));
}

export function FlowerLikeButton() {
  const [count, setCount] = useState(null);
  const [bursts, setBursts] = useState([]);
  const throttleRef = useRef(false);
  const tooltipEl = useRef(null);

  useEffect(() => {
    const el = document.createElement('div');
    el.className = 'image-tooltip';
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);
    tooltipEl.current = el;
    return () => el.remove();
  }, []);

  const showTooltip = useCallback((e) => {
    const el = tooltipEl.current;
    if (!el) return;
    el.textContent = 'Wanna leave a flower?';
    el.style.left = `${e.clientX + 16}px`;
    el.style.top  = `${e.clientY}px`;
    el.classList.add('is-visible');
  }, []);

  const moveTooltip = useCallback((e) => {
    if (!tooltipEl.current?.classList.contains('is-visible')) return;
    tooltipEl.current.style.left = `${e.clientX + 16}px`;
    tooltipEl.current.style.top  = `${e.clientY}px`;
  }, []);

  const hideTooltip = useCallback(() => {
    tooltipEl.current?.classList.remove('is-visible');
  }, []);

  useEffect(() => {
    fetch('/api/likes')
      .then(r => r.json())
      .then(d => setCount(Number(d.count) || 0))
      .catch(() => setCount(0));
  }, []);

  const handleClick = useCallback(() => {
    if (throttleRef.current) return;
    throttleRef.current = true;
    setTimeout(() => { throttleRef.current = false; }, 150);

    setCount(c => (c ?? 0) + 1);
    setBursts(prev => [...prev, ...makeBurst()]);

    fetch('/api/likes', { method: 'POST' })
      .then(r => r.json())
      .then(d => setCount(Number(d.count)))
      .catch(() => {});
  }, []);

  const removeBurst = useCallback((id) => {
    setBursts(prev => prev.filter(b => b.id !== id));
  }, []);

  return (
    <div className="flower-like-wrap">
      <button
        type="button"
        className="flower-like-btn"
        onClick={handleClick}
        onMouseEnter={showTooltip}
        onMouseMove={moveTooltip}
        onMouseLeave={hideTooltip}
        aria-label="Like this site"
      >
        <span className="flower-like-icon" aria-hidden="true">🌷</span>
        {count !== null && (
          <span className="flower-like-count">{count.toLocaleString()}</span>
        )}
      </button>

      <AnimatePresence>
        {bursts.map(burst => (
          <motion.img
            key={burst.id}
            src={burst.flower}
            alt=""
            className="flower-burst-particle"
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.6, rotate: 0 }}
            animate={{
              opacity: [1, 1, 0],
              x: [0, burst.x * 0.7, burst.x],
              y: [0, burst.y * 0.7, burst.y],
              scale: [0.54, 1.04, 1.08],
              rotate: [0, burst.rotate * 0.7, burst.rotate],
            }}
            transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1], times: [0, 0.6, 1] }}
            onAnimationComplete={() => removeBurst(burst.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
