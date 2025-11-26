document.addEventListener('DOMContentLoaded', () => {
  const particleCount = 40;
  const container = document.getElementById('particle-container');
  const nav = document.querySelector('nav');

  if (!container) {
    console.error('particle-container element not found. Particles will not run.');
    return;
  }
  if (!nav) {
    console.error('nav element not found.');
  }

  let navHeight = nav ? nav.offsetHeight : 0;
  let vw = window.innerWidth;
  let vh = window.innerHeight;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  let mouse = { x: vw / 2, y: vh / 2 };
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('resize', () => {
    vw = window.innerWidth;
    vh = window.innerHeight;
    if (nav) navHeight = nav.offsetHeight;
  });

  // create particles
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = rand(5, 15);
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.background = `hsl(266,0%,39%)`;
    p.style.opacity = rand(0.4, 1);

    const left = rand(0, vw);
    const top = rand(navHeight, vh);
    p.style.left = `${left}px`;
    p.style.top = `${top}px`;

    // CHANGE: give it a small initial random velocity, for gentle floating
    const initDx = rand(-0.5, 0.5);
    const initDy = rand(-0.5, 0.5);
    p.dataset.dx = initDx;
    p.dataset.dy = initDy;
    p.dataset.homeX = left;
    p.dataset.homeY = top;

    container.appendChild(p);
  }

  function animateParticles() {
    const particles = document.querySelectorAll('.particle');
    const repelRadius = 80;
    const repelStrength = 1.0; // Stronger
    const homeStrength = 0.02; // Smaller value so it floats slowly toward home
    const maxSpeed = 2;

    particles.forEach(p => {
      let left = parseFloat(p.style.left);
      let top = parseFloat(p.style.top);
      let dx = parseFloat(p.dataset.dx) || 0;
      let dy = parseFloat(p.dataset.dy) || 0;

      const centerX = left + parseFloat(p.style.width) / 2;
      const centerY = top + parseFloat(p.style.height) / 2;
      const distX = centerX - mouse.x;
      const distY = centerY - mouse.y;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < repelRadius) {
        // Repel with a force based on distance
        const angle = Math.atan2(distY, distX);
        const force = repelStrength * (1 - dist / repelRadius);
        dx += Math.cos(angle) * force;
        dy += Math.sin(angle) * force;

        // Clamp speed
        const speed = Math.sqrt(dx * dx + dy * dy);
        if (speed > maxSpeed) {
          dx = (dx / speed) * maxSpeed;
          dy = (dy / speed) * maxSpeed;
        }
      } else {
        // CHANGE: gently steer toward home WITHOUT snapping, don't kill velocity completely
        const homeX = parseFloat(p.dataset.homeX);
        const homeY = parseFloat(p.dataset.homeY);

        dx += (homeX - left) * homeStrength;
        dy += (homeY - top) * homeStrength;

        // Slow down if moving very fast
        const speed = Math.sqrt(dx * dx + dy * dy);
        if (speed > maxSpeed) {
          dx = (dx / speed) * maxSpeed;
          dy = (dy / speed) * maxSpeed;
        }
      }

      // Add velocity to position
      left += dx;
      top += dy;

      // Bounce from viewport edges and nav
      const particleWidth = parseFloat(p.style.width);
      const particleHeight = parseFloat(p.style.height);

      if (left < 0) {
        left = 0;
        dx *= -0.7; // Lose some energy
      } else if (left + particleWidth > vw) {
        left = vw - particleWidth;
        dx *= -0.7;
      }

      if (top < navHeight) {
        top = navHeight;
        dy *= -0.7;
      } else if (top + particleHeight > vh) {
        top = vh - particleHeight;
        dy *= -0.7;
      }

      // Write back
      p.style.left = `${left}px`;
      p.style.top = `${top}px`;
      p.dataset.dx = dx;
      p.dataset.dy = dy;
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
});
