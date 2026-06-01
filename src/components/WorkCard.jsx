import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function WorkCard({ title, tags, year, thumbnail, thumbnailAlt, cardBg, cardBorder, href, folderColor, restScale = 1 }) {
  const isExternal = href?.startsWith('http');
  const Tag = isExternal ? 'a' : Link;
  const linkProps = isExternal
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { to: href };

  /* ── Reveal card: image scales on hover only ── */
  if (folderColor) {
    return (
      <div className="work-card-wrap">
        <motion.article
          className="work-card work-card--reveal"
          style={{ '--card-bg': cardBg, '--card-border': cardBorder }}
          initial="rest"
          whileHover="hover"
        >
          <Tag
            {...linkProps}
            className="work-card__link"
            aria-label={`${title}, ${year}`}
          >
            <div className="work-card__image-wrap">
              <motion.img
                src={thumbnail}
                alt={thumbnailAlt || `${title} thumbnail`}
                className="work-card__image"
                variants={{ rest: { scale: restScale }, hover: { scale: restScale * 1.06 } }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                loading="lazy"
              />
            </div>
          </Tag>
        </motion.article>
        <div className="work-card__meta">
          <span className="work-card__title">{title}</span>
          <span className="work-card__year">{year}</span>
        </div>
      </div>
    );
  }

  /* ── Standard card layout (fallback) ── */
  return (
    <motion.article
      className="work-card"
      style={{ '--card-bg': cardBg }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Tag {...linkProps} className="work-card__link" aria-label={title}>
        <div className="work-card__image-wrap">
          {thumbnail ? (
            <motion.img
              src={thumbnail}
              alt={thumbnailAlt || `${title} thumbnail`}
              className="work-card__image"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              loading="lazy"
            />
          ) : (
            <div
              className="work-card__placeholder"
              role="img"
              aria-label={thumbnailAlt || `${title} cover image — placeholder`}
            />
          )}
        </div>
        <div className="work-card__meta">
          <span className="work-card__title">{title}</span>
          <span className="work-card__year">{year}</span>
        </div>
      </Tag>
    </motion.article>
  );
}
