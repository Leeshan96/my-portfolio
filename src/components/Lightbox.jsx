import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function Lightbox({ src, alt, onClose }) {
  const closeRef = useRef(null);
  const previousFocusRef = useRef(null);

  /* Focus management: move focus in on open, return it on close */
  useEffect(() => {
    if (src) {
      previousFocusRef.current = document.activeElement;
      closeRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    }
  }, [src]);

  /* Keyboard: Escape to close, Tab trapped to close button */
  useEffect(() => {
    if (!src) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab') { e.preventDefault(); closeRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            className="lightbox-close"
            aria-label="Close image"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M14 4L4 14M4 4L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <motion.img
            src={src}
            alt={alt}
            className="lightbox-image"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
