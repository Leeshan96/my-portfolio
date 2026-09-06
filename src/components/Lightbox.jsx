import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

export function Lightbox({ src, alt, onClose }) {
  const closeRef = useRef(null);
  const previousFocusRef = useRef(null);
  const scrollLocked = useRef(false);

  /* Scroll lock + focus management */
  useEffect(() => {
    if (src) {
      const scrollY = window.scrollY;
      // Compensate for scrollbar disappearing on desktop to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // position:fixed is the only reliable scroll lock on iOS Safari
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      scrollLocked.current = true;

      previousFocusRef.current = document.activeElement;
      closeRef.current?.focus({ preventScroll: true });
    } else if (scrollLocked.current) {
      // Only restore if we actually locked — skip initial mount where src is null
      const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
      window.scrollTo(0, scrollY);
      scrollLocked.current = false;

      previousFocusRef.current?.focus({ preventScroll: true });
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

  /*
   * Portal into document.body so position:fixed on the overlay is always
   * relative to the viewport — not to PageWrapper's transform:translateZ(0)
   * ancestor, which would shift the overlay off-screen when scroll-locking.
   */
  return ReactDOM.createPortal(
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
    </AnimatePresence>,
    document.body
  );
}
