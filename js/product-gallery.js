(function () {
  const imgs = Array.from(document.querySelectorAll('.pd-img'));
  const dots = Array.from(document.querySelectorAll('.pd-dot'));
  if (imgs.length === 0) return;

  let current = 0;

  function goTo(n) {
    imgs[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (n + imgs.length) % imgs.length;
    imgs[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  document.querySelector('.pd-prev')?.addEventListener('click', () => goTo(current - 1));
  document.querySelector('.pd-next')?.addEventListener('click', () => goTo(current + 1));

  dots.forEach(dot => {
    dot.addEventListener('click', () => goTo(Number(dot.dataset.index)));
  });

  // Zoom on hover
  const stage = document.querySelector('.pd-image-stage');
  if (stage) {
    stage.addEventListener('mousemove', (e) => {
      const img = imgs[current];
      if (!img) return;
      const rect = stage.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;
      img.style.transformOrigin = `${xPct}% ${yPct}%`;
      img.style.transform = 'scale(2)';
    });
    stage.addEventListener('mouseleave', () => {
      imgs.forEach(img => {
        img.style.transform = '';
        img.style.transformOrigin = '';
      });
    });
  }
})();