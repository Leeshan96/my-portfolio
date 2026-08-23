import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function ProjectNav({ prev, next }) {
  return (
    <motion.div
      className="cs-project-nav"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <hr className="cs-project-nav__divider" />
      <p className="cs-project-nav__heading">Check out my other projects</p>
      <div className="cs-project-nav__links">
        {prev && (
          <Link to={prev.href} className="cs-project-nav__link cs-project-nav__link--prev">
            ← {prev.title}
          </Link>
        )}
        {next && (
          <Link to={next.href} className="cs-project-nav__link cs-project-nav__link--next">
            {next.title} →
          </Link>
        )}
      </div>
    </motion.div>
  );
}
