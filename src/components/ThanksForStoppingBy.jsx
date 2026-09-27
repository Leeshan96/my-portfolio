import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { randomNote } from '../data/flowerNotes';

function getFlowerLabel(filename) {
  const base = filename.replace('.svg', '');
  return base.charAt(0).toUpperCase() + base.slice(1);
}

function PenIcon() {
  return (
    <svg
      className="tfsby-pen-icon"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9.5 2L12 4.5L4.5 12H2V9.5L9.5 2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EraseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 3.5h10M5.5 3.5V2.5h3v1M3 3.5l.75 8h6.5L11 3.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Canvas dimensions — 2× for retina */
const CANVAS_W = 400;
const CANVAS_H = 72;

export function ThanksForStoppingBy() {
  const [note, setNote]       = useState(() => randomNote());
  const [noteKey, setNoteKey] = useState(0);
  const [hasDrawn, setHasDrawn] = useState(false);

  const nameCanvasRef = useRef(null);
  const isDrawing     = useRef(false);
  const lastPoint     = useRef(null);

  /* Clear canvas whenever a new note is generated */
  useEffect(() => {
    const canvas = nameCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }, [noteKey]);

  /* ── Drawing helpers ── */
  function getPos(e, canvas) {
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const src    = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top)  * scaleY,
    };
  }

  const startDraw = useCallback((e) => {
    e.preventDefault();
    const canvas = nameCanvasRef.current;
    if (!canvas) return;
    isDrawing.current  = true;
    lastPoint.current  = getPos(e, canvas);
  }, []);

  const draw = useCallback((e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const canvas = nameCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#252422';
    ctx.lineWidth   = 2.8; // 2× resolution → looks ~1.4px on screen
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
    const point = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPoint.current = point;
    setHasDrawn(true);
  }, []);

  const endDraw = useCallback(() => {
    isDrawing.current = false;
    lastPoint.current = null;
  }, []);

  /* ── Generate another ── */
  function handleShuffle() {
    setNote(randomNote());
    setNoteKey(k => k + 1);
  }

  /* ── PNG export ── */
  function handleSave() {
    const parts = note.quote.split('\n\n');
    const body  = parts.slice(1).join('\n\n');

    const W   = 380;
    const H   = 380;
    const DPR = Math.max(window.devicePixelRatio || 1, 2);
    const canvas = document.createElement('canvas');
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);

    const FONT        = '"IBM Plex Mono", monospace';
    const PAD         = 32;
    const TEXT        = '#252422';
    const SECONDARY   = '#6F6C62';
    const FLOWER_SIZE = 96;
    const isSunflower = note.flower.svg === 'sunflower.svg';
    const flower_x    = W - PAD - FLOWER_SIZE - (isSunflower ? 22 : 12);

    function wrapText(text, maxWidth) {
      const words = text.split(' ');
      const lines = [];
      let cur = '';
      for (const word of words) {
        const test = cur ? cur + ' ' + word : word;
        if (ctx.measureText(test).width > maxWidth) {
          if (cur) lines.push(cur);
          cur = word;
        } else {
          cur = test;
        }
      }
      if (cur) lines.push(cur);
      return lines;
    }

    function drawCard(flowerImg) {
      ctx.fillStyle = note.flower.bgColor;
      ctx.fillRect(0, 0, W, H);

      const FACT_LINE_H    = Math.round(10 * 1.7);
      const DIVIDER_MARGIN = 24;
      ctx.font = `400 10px ${FONT}`;
      const factLines  = wrapText(note.funFact, W - PAD * 2);
      const factBlockH = (1 + factLines.length) * FACT_LINE_H;
      const dividerY   = H - PAD - factBlockH - DIVIDER_MARGIN;

      let y = PAD + 16;

      /* Greeting row — embed drawn name if available */
      ctx.fillStyle = TEXT;
      ctx.font = `500 14px ${FONT}`;
      const nc = nameCanvasRef.current;
      if (hasDrawn && nc) {
        const heyPart = 'Hey ';
        ctx.fillText(heyPart, PAD, y);
        const heyW = ctx.measureText(heyPart).width;

        /* Scale name canvas to match text line height */
        const nameDrawH = Math.round(14 * 1.5);
        const nameDrawW = nameDrawH * (nc.width / nc.height);
        ctx.drawImage(nc, PAD + heyW, y - nameDrawH + 2, nameDrawW, nameDrawH);
        ctx.fillText(',', PAD + heyW + nameDrawW, y);
      } else {
        ctx.fillText('Hey _____,', PAD, y);
      }
      y += Math.round(14 * 1.5) + 16;

      /* Body */
      ctx.font = `400 14px ${FONT}`;
      const quoteLines = wrapText(body, W - PAD * 2);
      for (const ln of quoteLines) {
        ctx.fillText(ln, PAD, y);
        y += Math.round(14 * 1.7);
      }

      /* Sign row */
      y -= 12;
      const flower_y = y;
      const nameBase = flower_y + FLOWER_SIZE - 4;
      const preBase  = nameBase - Math.round(14 * 1.4) - 6;
      ctx.fillStyle = TEXT;
      ctx.font = `400 12px ${FONT}`;
      ctx.fillText('Thanks for stopping by,', PAD, preBase);
      ctx.font = `500 14px ${FONT}`;
      ctx.fillText('Lee Shan', PAD, nameBase);

      /* Flower */
      if (flowerImg) {
        const nw = flowerImg.naturalWidth  > 0 ? flowerImg.naturalWidth  : FLOWER_SIZE;
        const nh = flowerImg.naturalHeight > 0 ? flowerImg.naturalHeight : FLOWER_SIZE;
        const scale = Math.min(FLOWER_SIZE / nw, FLOWER_SIZE / nh);
        const dw = nw * scale;
        const dh = nh * scale;
        ctx.drawImage(flowerImg, flower_x + (FLOWER_SIZE - dw) / 2, flower_y + (FLOWER_SIZE - dh) / 2, dw, dh);
      }

      /* Flower label */
      ctx.fillStyle = SECONDARY;
      ctx.font = `400 10px ${FONT}`;
      const label  = getFlowerLabel(note.flower.svg);
      const lw     = ctx.measureText(label).width;
      const labelX = flower_x + FLOWER_SIZE - lw + (isSunflower ? lw * 0.3 : 0);
      ctx.fillText(label, labelX, flower_y + FLOWER_SIZE - 2);

      /* Dashed divider */
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = SECONDARY;
      ctx.lineWidth   = 1;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(PAD, dividerY);
      ctx.lineTo(W - PAD, dividerY);
      ctx.stroke();
      ctx.restore();

      /* Fun fact */
      let fy = dividerY + DIVIDER_MARGIN;
      ctx.fillStyle = SECONDARY;
      ctx.font = `400 10px ${FONT}`;
      ctx.fillText('Fun fact:', PAD, fy);
      fy += FACT_LINE_H;
      for (const ln of factLines) {
        ctx.fillText(ln, PAD, fy);
        fy += FACT_LINE_H;
      }

      const a    = document.createElement('a');
      a.download = `${note.flower.svg.replace('.svg', '')}-note.png`;
      a.href     = canvas.toDataURL('image/png');
      a.click();
    }

    document.fonts.ready.then(() => {
      const img   = new Image();
      img.src     = `/assets/icons/${note.flower.svg}`;
      img.onload  = () => drawCard(img);
      img.onerror = () => drawCard(null);
    });
  }

  const parts = note.quote.split('\n\n');
  const body  = parts.slice(1).join('\n\n');

  return (
    <section className="tfsby-section" aria-label="Thanks for stopping by">
      <div className="tfsby-divider-wrap">
        <hr className="tfsby-divider" aria-hidden="true" />
      </div>
      <div className="content-wrap tfsby-inner">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="tfsby-heading-block"
        >
          <h2 className="tfsby-heading">
            <span className="tfsby-heading__secondary">Thanks for stopping by,</span>
            <span className="tfsby-heading__primary">
              here's a{' '}
              <motion.img
                src="/assets/icons/flower-bouquet.svg"
                alt=""
                aria-hidden="true"
                className="tfsby-bouquet-icon"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
              {' '}message just for you
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="tfsby-card-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="tfsby-card-wrap">

            <AnimatePresence mode="wait">
              <motion.div
                key={noteKey}
                className="tfsby-card"
                style={{ backgroundColor: note.flower.bgColor }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="tfsby-card__body">
                  <div className="tfsby-card__note">

                    {/* Greeting with drawable name slot */}
                    <p className="tfsby-card__greeting">
                      Hey{' '}
                      <span className="tfsby-name-slot">
                        <canvas
                          ref={nameCanvasRef}
                          className="tfsby-name-canvas"
                          width={CANVAS_W}
                          height={CANVAS_H}
                          onMouseDown={startDraw}
                          onMouseMove={draw}
                          onMouseUp={endDraw}
                          onMouseLeave={endDraw}
                          onTouchStart={startDraw}
                          onTouchMove={draw}
                          onTouchEnd={endDraw}
                          aria-label="Draw your name here"
                          role="img"
                        />

                        <span className="tfsby-name-icons">
                          {hasDrawn && (
                            <button
                              type="button"
                              className="tfsby-erase-btn"
                              onClick={() => {
                                const canvas = nameCanvasRef.current;
                                if (!canvas) return;
                                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                                setHasDrawn(false);
                              }}
                              aria-label="Clear drawing"
                            >
                              <EraseIcon />
                            </button>
                          )}
                        </span>
                      </span>
                      ,
                    </p>

                    <p className="tfsby-card__quote">{body}</p>

                    <div className="tfsby-card__sign">
                      <div>
                        <p className="tfsby-card__sign-pre">Thanks for stopping by,</p>
                        <p className="tfsby-card__sign-name">Lee Shan</p>
                      </div>
                      <div className="tfsby-card__flower" data-flower={note.flower.svg}>
                        <img
                          src={`/assets/icons/${note.flower.svg}`}
                          alt={getFlowerLabel(note.flower.svg)}
                          className="tfsby-card__flower-img"
                        />
                        <span className="tfsby-card__flower-label">{getFlowerLabel(note.flower.svg)}</span>
                      </div>
                    </div>
                  </div>


                  <div className="tfsby-card__divider" aria-hidden="true" />

                  <div className="tfsby-card__fact">
                    <span className="tfsby-card__fact-label">Fun fact:</span>
                    <p className="tfsby-card__fact-body">{note.funFact}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="tfsby-actions">
              <button type="button" className="tfsby-save" onClick={handleSave}>
                Save as PNG
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 2v8m0 0L5 7m3 3 3-3M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button type="button" className="tfsby-reshuffle" onClick={handleShuffle}>
                Generate another ↺
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
