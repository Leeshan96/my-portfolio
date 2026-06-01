import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/nav.css';

export function Nav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const handleFlowerHover = () => {
    if (spinning) return;
    setSpinning(true);
  };

  const handleSpinEnd = () => {
    setSpinning(false);
  };

  const isActive = (path) => pathname === path;

  const drawerVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
    exit:    { height: 0, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <>
      <header className="site-nav" role="banner">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label="Lian Lee Shan — home" onClick={() => setMenuOpen(false)} onMouseEnter={handleFlowerHover}>
            <img
              src="/assets/icons/flower-logo.svg"
              alt=""
              aria-hidden="true"
              className={`nav-logo__icon logo-flower${spinning ? ' is-spinning' : ''}`}
              onAnimationEnd={handleSpinEnd}
            />
            <span className="nav-logo__name">Lian Lee Shan</span>
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            <Link to="/"      className={`nav-link${isActive('/')      ? ' is-active' : ''}`}>
              <span className="nav-link-inner" aria-hidden="true">
                <span className="nav-link-text">Work</span>
                <span className="nav-link-text">Work</span>
              </span>
              <span className="nav-link-sr">Work</span>
            </Link>
            <Link to="/about" className={`nav-link${isActive('/about') ? ' is-active' : ''}`}>
              <span className="nav-link-inner" aria-hidden="true">
                <span className="nav-link-text">About</span>
                <span className="nav-link-text">About</span>
              </span>
              <span className="nav-link-sr">About</span>
            </Link>
            <a
              href="/assets/resume.pdf"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nav-link-inner" aria-hidden="true">
                <span className="nav-link-text">Resume</span>
                <span className="nav-link-text">Resume</span>
              </span>
              <span className="nav-link-sr">Resume</span>
            </a>
          </nav>

          <button
            className={`nav-hamburger${menuOpen ? ' is-open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            className="nav-mobile-drawer"
            aria-label="Mobile navigation"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Link to="/"      className={`nav-link${isActive('/')      ? ' is-active' : ''}`} onClick={() => setMenuOpen(false)}>
              <span className="nav-link-inner" aria-hidden="true">
                <span className="nav-link-text">Work</span>
                <span className="nav-link-text">Work</span>
              </span>
              <span className="nav-link-sr">Work</span>
            </Link>
            <Link to="/about" className={`nav-link${isActive('/about') ? ' is-active' : ''}`} onClick={() => setMenuOpen(false)}>
              <span className="nav-link-inner" aria-hidden="true">
                <span className="nav-link-text">About</span>
                <span className="nav-link-text">About</span>
              </span>
              <span className="nav-link-sr">About</span>
            </Link>
            <a href="/assets/resume.pdf" className="nav-link" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
              <span className="nav-link-inner" aria-hidden="true">
                <span className="nav-link-text">Resume</span>
                <span className="nav-link-text">Resume</span>
              </span>
              <span className="nav-link-sr">Resume</span>
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
