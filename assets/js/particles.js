const particleCount = 40;
const container = document.getElementById('particle-container');
const nav = document.querySelector('nav');
const navHeight = nav.offsetHeight;
const vw = window.innerWidth;
const vh = window.innerHeight;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

let mouse = { x: vw / 2, y: vh / 2 };
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

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
  const repelRadius = 80;
  const repelStrength = 1.2;
  
  particles.forEach(p => {
    let left = parseFloat(p.style.left);
    let top = parseFloat(p.style.top);
    let dx = parseFloat(p.dataset.dx);
    let dy = parseFloat(p.dataset.dy);

    const distX = left + parseFloat(p.style.width) / 2 - mouse.x;
    const distY = top + parseFloat(p.style.height) / 2 - mouse.y;
    const dist = Math.sqrt(distX * distX + distY * distY);

    if (dist < repelRadius) {
      const angle = Math.atan2(distY, distX);
      dx += Math.cos(angle) * repelStrength;
      dy += Math.sin(angle) * repelStrength;
    }

    const maxSpeed = 2;
    dx = Math.max(-maxSpeed, Math.min(maxSpeed, dx));
    dy = Math.max(-maxSpeed, Math.min(maxSpeed, dy));

    left += dx;
    top += dy;

    if (left < 0 || left > vw) {
      dx *= -1;
      left = Math.max(0, Math.min(vw, left));
    }
    if (top < navHeight || top > vh) {
      dy *= -1;
      top = Math.max(navHeight, Math.min(vh, top));
    }

    p.style.left = `${left}px`;
    p.style.top = `${top}px`;
    p.dataset.dx = dx;
    p.dataset.dy = dy;
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();
