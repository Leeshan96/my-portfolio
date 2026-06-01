import { useEffect, useRef } from 'react';

const LERP = 0.15; /* smoothing factor — higher = snappier */

export function CustomCursor() {
  const cursorRef     = useRef(null);
  const target        = useRef({ x: -200, y: -200 });
  const current       = useRef({ x: -200, y: -200 });
  const rafRef        = useRef(null);
  const hoveringRef   = useRef(false);
  const visibleRef    = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    /* ── Lerp loop ── */
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * LERP;
      current.current.y += (target.current.y - current.current.y) * LERP;
      cursor.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    /* ── Mouse tracking — also detects card hover via closest() ── */
    const onMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };

      if (!visibleRef.current) {
        /* Snap to position on first move so it doesn't slide in from corner */
        current.current = { x: e.clientX, y: e.clientY };
        visibleRef.current = true;
        cursor.style.opacity = '1';
      }

      const onCard = !!e.target.closest('.work-card-wrap');
      if (onCard !== hoveringRef.current) {
        hoveringRef.current = onCard;
        cursor.classList.toggle('is-hovering-card', onCard);
      }
    };

    /* Hide cursor when pointer leaves the viewport */
    const onMouseLeave = () => {
      cursor.style.opacity = '0';
      visibleRef.current = false;
    };
    const onMouseEnter = () => {
      cursor.style.opacity = '1';
      visibleRef.current = true;
    };

    document.addEventListener('mousemove',  onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove',  onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <img src="/assets/icons/flower-red.svg" className="cursor-flower" alt="" />
      <span className="cursor-pill">View Project</span>
    </div>
  );
}
