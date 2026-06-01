/* ── Image cluster: GSAP spring fan-out on hover ── */

document.querySelectorAll('[data-cluster]').forEach(cluster => {
  const images = cluster.querySelectorAll('.cluster-img');

  /* Set initial stacked state with slight random rotations */
  const baseRotations = [];
  images.forEach((img, i) => {
    const rot = (Math.random() - 0.5) * 14;
    baseRotations[i] = rot;
    gsap.set(img, {
      rotation: rot,
      transformOrigin: 'center bottom',
      zIndex: i
    });
  });

  /* Spread positions — fan out from center */
  const spreadPositions = images.length === 3
    ? [{ x: -90, y: -20, rotation: -12 }, { x: 0, y: -30, rotation: 0 }, { x: 90, y: -20, rotation: 12 }]
    : Array.from({ length: images.length }, (_, i) => ({
        x: (i - (images.length - 1) / 2) * 80,
        y: -20,
        rotation: (i - (images.length - 1) / 2) * 10
      }));

  cluster.addEventListener('mouseenter', () => {
    images.forEach((img, i) => {
      gsap.to(img, {
        x: spreadPositions[i]?.x ?? 0,
        y: spreadPositions[i]?.y ?? 0,
        rotation: spreadPositions[i]?.rotation ?? 0,
        scale: 1.04,
        zIndex: images.length + i,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
        delay: i * 0.05
      });
    });
  });

  cluster.addEventListener('mouseleave', () => {
    images.forEach((img, i) => {
      gsap.to(img, {
        x: 0,
        y: 0,
        rotation: baseRotations[i],
        scale: 1,
        zIndex: i,
        duration: 0.5,
        ease: 'elastic.out(1, 0.6)',
        delay: i * 0.04
      });
    });
  });
});
