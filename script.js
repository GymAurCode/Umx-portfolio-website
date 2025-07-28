

// --- GLITCH LOGO EFFECT ---
document.addEventListener('DOMContentLoaded', function () {
  const glitchLogo = document.querySelector('.glitch-logo');
  if (!glitchLogo) return;
  const umx = 'UMX';
  const full = 'UMER MUGHAL'; // Only show 'Umer' instead of 'Umer Mughal'
  let cycleIndex = 0; // 0, 1 = UMX, 2 = Umer Mughal

  function glitchBurst() {
    glitchLogo.classList.add('glitching');
    setTimeout(() => {
      glitchLogo.classList.remove('glitching');
    }, 90 + Math.random() * 40);
  }

  function showUMX() {
    glitchLogo.textContent = umx;
    glitchLogo.setAttribute('data-text', umx);
    glitchLogo.classList.remove('is-full');
    glitchLogo.classList.add('is-umx');
    glitchBurst();
  }

  function showFullBriefly(next) {
    glitchLogo.textContent = full;
    glitchLogo.setAttribute('data-text', full);
    glitchLogo.classList.remove('is-umx');
    glitchLogo.classList.add('is-full');
    glitchBurst();
    setTimeout(() => {
      showUMX();
      if (typeof next === 'function') next();
    }, 500 + Math.random() * 120); // show for at least 0.5s
  }

  function glitchLoop() {
    if (cycleIndex === 0 || cycleIndex === 1) {
      showUMX();
      setTimeout(glitchLoop, 1400 + Math.random() * 600);
    } else {
      showFullBriefly(() => {
        setTimeout(glitchLoop, 1400 + Math.random() * 600);
      });
    }
    cycleIndex = (cycleIndex + 1) % 3;
  }

  // Initial burst
  showUMX();
  glitchBurst();
  glitchLoop();
  // Also burst on hover
  glitchLogo.addEventListener('mouseenter', glitchBurst);
});

// 3D tilt effect for skill cards
function addTiltEffect(card) {
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 25; // max 25deg
    const rotateY = ((x - centerX) / centerX) * 25;
    card.style.transition = 'none';
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', function() {
    card.style.transition = '';
    card.style.transform = '';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.skill-card').forEach(addTiltEffect);
});