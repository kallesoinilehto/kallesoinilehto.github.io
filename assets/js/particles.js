document.addEventListener('DOMContentLoaded', () => {
  const particleCount = 40;
  const container = document.getElementById('particle-container');
  const nav = document.querySelector('nav');

  if (!container) {
    console.error('particle-container element not found. Particles will not run.');
    return;
  }

  const navHeight = nav.offsetHeight;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = rand(10, 15);
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.background = `hsl(266,0%,39%)`;
    p.style.opacity = rand(0.4, 1);

    const left = rand(0, vw);
    const top = rand(navHeight, vh);
    p.style.left = `${left}px`;
    p.style.top = `${top}px`;

    container.appendChild(p);
  }
});
