/* ── Lightbox ── */

(function () {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Image lightbox');
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close lightbox">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2L18 18M18 2L2 18" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    <div class="lightbox-img-wrap">
      <img class="lightbox-img" src="" alt="">
    </div>
  `;
  document.body.appendChild(overlay);

  const lightboxImg = overlay.querySelector('.lightbox-img');
  const closeBtn    = overlay.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    /* Clear src after transition so img doesn't flash on reopen */
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.lightbox-trigger');
    if (trigger) {
      e.preventDefault();
      openLightbox(trigger.src || trigger.dataset.src, trigger.alt);
    }
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === overlay.querySelector('.lightbox-img-wrap')) {
      closeLightbox();
    }
  });

  closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();
