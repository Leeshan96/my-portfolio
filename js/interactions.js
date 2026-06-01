/* ── General hover + transition effects ── */

/* Buttons: lift on hover */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-2px)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
