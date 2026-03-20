document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const triggerZone = 50; // pixels from top

  document.addEventListener('mousemove', (e) => {
    if (e.clientY < triggerZone) {
      nav.classList.add('visible');
    }
  });

  nav.addEventListener('mouseleave', () => {
    nav.classList.remove('visible');
  });
});