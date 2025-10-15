const particleCount = 30;
const container = document.getElementById('particle-container');
const nav = document.querySelector('nav');
const navHeight = nav.offsetHeight;
const vw = window.innerWidth;
const vh = window.innerHeight;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 0; i < particleCount; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = rand(5, 15);
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.background = `hsl(266,0%,39%)`;
  p.style.opacity = rand(0.4, 1);
  p.style.left = `${rand(0, vw)}px`;
  p.style.top = `${rand(navHeight, vh)}px`;
  p.dataset.dx = rand(-1, 1);
  p.dataset.dy = rand(-1, 1);
  container.appendChild(p);
}

function animateParticles() {
  const particles = document.querySelectorAll('.particle');
  particles.forEach(p => {
    let left = parseFloat(p.style.left);
    let top = parseFloat(p.style.top);
    let dx = parseFloat(p.dataset.dx);
    let dy = parseFloat(p.dataset.dy);

    left += dx;
    top += dy;

    if (left < 0 || left > vw) p.dataset.dx *= -1;
    if (top < navHeight || top > vh) p.dataset.dy *= -1;

    p.style.left = `${left}px`;
    p.style.top = `${top}px`;
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();
