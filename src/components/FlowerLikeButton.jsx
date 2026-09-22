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
        aria-label="Like this site"
      >
        <img src="/assets/icons/flower-bouquet.svg" alt="" className="flower-like-icon" />
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
              opacity: 0,
              x: burst.x,
              y: burst.y,
              scale: 1.1,
              rotate: burst.rotate,
            }}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            onAnimationComplete={() => removeBurst(burst.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
