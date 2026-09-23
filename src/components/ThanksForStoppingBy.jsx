import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { flowerNotes } from '../data/flowerNotes';

function getFlowerLabel(filename) {
  return filename.replace('.svg', '').charAt(0).toUpperCase() + filename.replace('.svg', '').slice(1);
}

export function ThanksForStoppingBy() {
  const [nickname, setNickname] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState(null);
  const cardRef = useRef(null);

  const trimmed = nickname.trim();
  const canGenerate = trimmed.length > 0 && selectedMood !== null;

  function handleGenerate() {
    if (!canGenerate) return;
    const entry = flowerNotes[selectedMood];
    const quote = entry.quotes[Math.floor(Math.random() * entry.quotes.length)];
    const interpolated = quote.replace(/{name}/g, trimmed);
    setNote({ ...entry, interpolated });
  }

  function handleSave() {
    if (!note) return;

    const W = 380;
    const H = 380;
    // Force at least 2x export resolution — devicePixelRatio reports 1 in some
    // runtime contexts (external non-retina monitors, mirrored displays, some
    // embedded webviews) even on a Mac, which was silently producing a
    // 380x380px PNG identical in fidelity to the on-screen CSS card.
    const DPR = Math.max(window.devicePixelRatio || 1, 2);
    const canvas = document.createElement('canvas');
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);

    const FONT = '"IBM Plex Mono", monospace';
    const PAD = 32;
    const TEXT = '#252422';
    const SECONDARY = '#6F6C62';
    const FLOWER_SIZE = 96;
    // CSS: default flowers translateX(-12px), sunflower translateX(-22px)
    const isSunflower = note.flower === 'sunflower.svg';
    const flower_x = W - PAD - FLOWER_SIZE - (isSunflower ? 22 : 12);

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

    function drawCard(img) {
      // Background
      ctx.fillStyle = note.bgColor;
      ctx.fillRect(0, 0, W, H);

      const parts = note.interpolated.split('\n\n');
      const greeting = parts[0];
      const body = parts.slice(1).join('\n\n');

      // Pre-compute fact lines at correct font so divider can be anchored from bottom
      const FACT_LINE_H = Math.round(10 * 1.7); // 17px
      const DIVIDER_MARGIN = 24; // var(--space-5), matches CSS margin: var(--space-5) 0 on divider
      ctx.font = `400 10px ${FONT}`;
      const factLines = wrapText(note.funFact, W - PAD * 2);
      const factBlockH = (1 + factLines.length) * FACT_LINE_H;
      // Divider y: bottom of canvas minus bottom padding, minus fact block, minus divider margin-below
      const dividerY = H - PAD - factBlockH - DIVIDER_MARGIN;

      let y = PAD + 16;

      // Greeting — 500 14px, lh 1.5
      ctx.fillStyle = TEXT;
      ctx.font = `500 14px ${FONT}`;
      ctx.fillText(greeting, PAD, y);
      y += Math.round(14 * 1.5) + 16; // greeting line-height advance + space-4 gap

      // Quote — 400 14px, lh 1.7
      ctx.font = `400 14px ${FONT}`;
      const quoteLines = wrapText(body, W - PAD * 2);
      for (const ln of quoteLines) {
        ctx.fillText(ln, PAD, y);
        y += Math.round(14 * 1.7);
      }

      // Sign row — margin-top: -12px
      y -= 12;
      const flower_y = y;

      // Sign text — bottom-aligned with flower
      const nameBase = flower_y + FLOWER_SIZE - 4;
      const preBase = nameBase - Math.round(14 * 1.4) - 6;
      ctx.fillStyle = TEXT;
      ctx.font = `400 12px ${FONT}`;
      ctx.fillText('Thanks for stopping by,', PAD, preBase);
      ctx.font = `500 14px ${FONT}`;
      ctx.fillText('Lee Shan', PAD, nameBase);

      // Flower image — object-fit: contain within FLOWER_SIZE × FLOWER_SIZE box
      if (img) {
        const nw = img.naturalWidth > 0 ? img.naturalWidth : FLOWER_SIZE;
        const nh = img.naturalHeight > 0 ? img.naturalHeight : FLOWER_SIZE;
        const scale = Math.min(FLOWER_SIZE / nw, FLOWER_SIZE / nh);
        const dw = nw * scale;
        const dh = nh * scale;
        const dx = flower_x + (FLOWER_SIZE - dw) / 2;
        const dy = flower_y + (FLOWER_SIZE - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
      }

      // Flower label — bottom-right
      // CSS: sunflower label has translateX(30%), shifting it 30% of its own width right
      ctx.fillStyle = SECONDARY;
      ctx.font = `400 10px ${FONT}`;
      const label = getFlowerLabel(note.flower);
      const lw = ctx.measureText(label).width;
      const labelX = flower_x + FLOWER_SIZE - lw + (isSunflower ? lw * 0.3 : 0);
      ctx.fillText(label, labelX, flower_y + FLOWER_SIZE - 2);

      // Dashed divider — anchored from bottom so fun fact always sits at PAD from card edge
      y = dividerY;
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = SECONDARY;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(PAD, y);
      ctx.lineTo(W - PAD, y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // Fun fact — 10px, using pre-computed factLines
      y = dividerY + DIVIDER_MARGIN;
      ctx.fillStyle = SECONDARY;
      ctx.font = `400 10px ${FONT}`;
      ctx.fillText('Fun fact:', PAD, y);
      y += FACT_LINE_H;
      for (const ln of factLines) {
        ctx.fillText(ln, PAD, y);
        y += FACT_LINE_H;
      }

      const a = document.createElement('a');
      a.download = `${note.flower.replace('.svg', '')}-note-for-${trimmed.replace(/\s+/g, '-')}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    }

    // Wait for web fonts, then load flower image, then draw
    document.fonts.ready.then(() => {
      const img = new Image();
      img.src = `/assets/icons/${note.flower}`;
      img.onload = () => drawCard(img);
      img.onerror = () => drawCard(null);
    });
  }

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

        <div className="tfsby-layout">

          {/* Left: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="tfsby-form"
          >
            <div className="tfsby-field">
              <label htmlFor="tfsby-nickname" className="tfsby-label">Nickname</label>
              <input
                id="tfsby-nickname"
                type="text"
                className="tfsby-input"
                placeholder="What should I call you?"
                value={nickname}
                maxLength={25}
                onChange={e => setNickname(e.target.value)}
              />
            </div>

            <div className="tfsby-field">
              <span className="tfsby-label">Select your mood</span>
              <div className="tfsby-moods" role="group" aria-label="Mood selection">
                {flowerNotes.map((entry, i) => (
                  <button
                    key={entry.mood}
                    type="button"
                    className={`tfsby-pill${selectedMood === i ? ' tfsby-pill--active' : ''}`}
                    onClick={() => setSelectedMood(prev => prev === i ? null : i)}
                    aria-pressed={selectedMood === i}
                  >
                    {entry.mood}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              type="button"
              className="btn btn--primary tfsby-cta"
              onClick={handleGenerate}
              disabled={!canGenerate}
              whileHover={canGenerate ? { y: -2, boxShadow: '0 6px 20px rgba(37,36,34,0.18)' } : {}}
              whileTap={canGenerate ? { scale: 0.97 } : {}}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              Get my message
            </motion.button>
          </motion.div>

          {/* Right: note card preview */}
          <div className="tfsby-preview">
            {note ? (
              <div className="tfsby-card-wrap">
                <motion.div
                  key={note.mood + note.interpolated}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  style={{ backgroundColor: note.bgColor }}
                  className="tfsby-card"
                  ref={cardRef}
                >
                  <div className="tfsby-card__body">
                    <div className="tfsby-card__note">
                      {(() => {
                        const parts = note.interpolated.split('\n\n');
                        const greeting = parts[0];
                        const body = parts.slice(1).join('\n\n');
                        return (
                          <>
                            <p className="tfsby-card__greeting">{greeting}</p>
                            <p className="tfsby-card__quote">{body}</p>
                          </>
                        );
                      })()}

                      <div className="tfsby-card__sign">
                        <div>
                          <p className="tfsby-card__sign-pre">Thanks for stopping by,</p>
                          <p className="tfsby-card__sign-name">Lee Shan</p>
                        </div>
                        <div className="tfsby-card__flower" data-flower={note.flower}>
                          <img
                            src={`/assets/icons/${note.flower}`}
                            alt={getFlowerLabel(note.flower)}
                            className="tfsby-card__flower-img"
                          />
                          <span className="tfsby-card__flower-label">{getFlowerLabel(note.flower)}</span>
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

                <motion.div
                  className="tfsby-actions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
                >
                  <button
                    type="button"
                    className="tfsby-save"
                    onClick={handleSave}
                  >
                    Save as PNG
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 2v8m0 0L5 7m3 3 3-3M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </motion.div>
              </div>
            ) : (
              <div className="tfsby-preview-empty" aria-hidden="true">
                <img
                  src="/assets/icons/flower-bouquet.svg"
                  alt=""
                  aria-hidden="true"
                  className="tfsby-preview-empty__icon"
                />
                <span className="tfsby-preview-empty__hint">Get your message to see preview</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
