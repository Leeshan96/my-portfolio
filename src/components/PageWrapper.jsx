import React, { useState } from 'react';
import { motion } from 'framer-motion';

const getPrefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function PageWrapper({ children }) {
  // Read synchronously on first render — avoids the null→true re-render blink
  const [reduced] = useState(getPrefersReducedMotion);
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.35, ease: 'easeOut' }}
      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
    >
      {children}
    </motion.div>
  );
}
