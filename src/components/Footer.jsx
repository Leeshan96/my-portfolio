import React from 'react';
import '../css/footer.css';
import { FlowerLikeButton } from './FlowerLikeButton';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* Row 1: Say hi + social icons */}
        <div className="footer-row footer-row--top">
          <div className="footer-contact">
            <span className="footer-label">Say hi</span>
            <a href="mailto:lianleeshan@gmail.com" className="footer-link">
              lianleeshan@gmail.com
            </a>
          </div>
          <div className="footer-icons">
            <a
              href="https://www.linkedin.com/in/leeshan-lian/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-link"
              aria-label="LinkedIn"
            >
              <span className="footer-icon" style={{ maskImage: 'url(/assets/icons/linkedin.svg)', WebkitMaskImage: 'url(/assets/icons/linkedin.svg)' }} />
            </a>
            <a
              href="https://github.com/Leeshan96"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-link"
              aria-label="GitHub"
            >
              <span className="footer-icon" style={{ maskImage: 'url(/assets/icons/github.svg)', WebkitMaskImage: 'url(/assets/icons/github.svg)' }} />
            </a>
            <FlowerLikeButton />
          </div>
        </div>

        {/* Row 2: Copyright */}
        <div className="footer-row footer-row--bottom">
          <span className="footer-updated">© 2026</span>
        </div>

      </div>
    </footer>
  );
}
