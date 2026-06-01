import React from 'react';
import '../css/footer.css';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-label">Say hi</span>
          <a href="mailto:lianleeshan@gmail.com" className="footer-link">
            lianleeshan@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/leeshan-lian"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Linkedin
          </a>
        </div>
        <div className="footer-right">
          <span className="footer-updated">© 2026</span>
        </div>
      </div>
    </footer>
  );
}
