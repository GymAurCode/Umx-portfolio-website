

// --- GLITCH LOGO EFFECT ---
document.addEventListener('DOMContentLoaded', function () {
  const glitchLogo = document.querySelector('.glitch-logo');
  if (!glitchLogo) return;
  const umx = 'UMX';
  const full = 'Umer Mughal';
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
    }, 220 + Math.random() * 60);
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

document.querySelectorAll('.skill-box').forEach(box => {
  box.addEventListener('mousemove', function(e) {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 25; // max 25deg
    const rotateY = ((x - centerX) / centerX) * 25;
    box.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.09)`;
  });
  box.addEventListener('mouseleave', function() {
    box.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

const cards = document.querySelectorAll('.skill-card');
let current = 0;

function showCard(index) {
  cards.forEach((card, i) => {
    card.classList.remove('active', 'stacked');
    if (i < index) {
      card.classList.add('stacked');
    } else if (i === index) {
      card.classList.add('active');
    }
  });
}

// Initial state
showCard(0);

window.addEventListener('wheel', (e) => {
  const skillsSection = document.querySelector('.skills-section');
  if (
    skillsSection &&
    skillsSection.getBoundingClientRect().top < window.innerHeight &&
    skillsSection.getBoundingClientRect().bottom > 0
  ) {
    if (e.deltaY > 0 && current < cards.length - 1) {
      current++;
      showCard(current);
      e.preventDefault();
    } else if (e.deltaY < 0 && current > 0) {
      current--;
      showCard(current);
      e.preventDefault();
    }
  }
}, { passive: false });