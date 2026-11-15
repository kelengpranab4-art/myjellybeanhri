import confetti from 'canvas-confetti';

export const fireRomanticConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Multi-stage burst
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f472b6', '#fb7185', '#fda4af', '#f43f5e']
  });

  fire(0.2, {
    spread: 60,
    colors: ['#a78bfa', '#c084fc', '#e879f9', '#f472b6']
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.1,
    colors: ['#fbbf24', '#f472b6', '#ffffff', '#e11d48']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.3,
    colors: ['#ffe4e6', '#fbcfe8', '#fecdd3']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#f43f5e', '#ec4899', '#d946ef']
  });
};

export const fireFlowerPetalShower = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#f472b6', '#fda4af', '#fbbf24', '#c084fc']
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#f472b6', '#fda4af', '#fbbf24', '#c084fc']
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};
