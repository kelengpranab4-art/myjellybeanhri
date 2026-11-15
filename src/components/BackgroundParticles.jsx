import React, { useEffect, useRef } from 'react';

export const BackgroundParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stars
    const starCount = Math.floor(Math.min(width, 1400) * 0.08);
    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.3 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Floating Petals
    const petalColors = [
      'rgba(244, 114, 182, 0.45)', // pink
      'rgba(251, 113, 133, 0.4)',  // rose
      'rgba(192, 132, 252, 0.35)', // lavender
      'rgba(254, 240, 138, 0.35)', // gold
      'rgba(255, 255, 255, 0.45)'  // white
    ];
    const petals = Array.from({ length: 22 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 6,
      speedX: (Math.random() - 0.5) * 0.7,
      speedY: Math.random() * 0.8 + 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      sway: Math.random() * Math.PI * 2,
    }));

    // Fireflies / Stardust
    const fireflies = Array.from({ length: 18 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Twinkling Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        const currentAlpha = 0.2 + (Math.sin(star.alpha) + 1) * 0.35;
        ctx.fillStyle = `rgba(255, 245, 230, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Fireflies (Warm Gold / Lavender glows)
      fireflies.forEach((ff) => {
        ff.x += ff.speedX;
        ff.y += ff.speedY;
        ff.pulse += 0.03;

        if (ff.x < 0) ff.x = width;
        if (ff.x > width) ff.x = 0;
        if (ff.y < 0) ff.y = height;
        if (ff.y > height) ff.y = 0;

        const currentAlpha = 0.2 + (Math.sin(ff.pulse) + 1) * 0.3;
        const grad = ctx.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, ff.radius * 3.5);
        grad.addColorStop(0, `rgba(253, 224, 71, ${currentAlpha})`);
        grad.addColorStop(0.5, `rgba(244, 114, 182, ${currentAlpha * 0.5})`);
        grad.addColorStop(1, 'rgba(244, 114, 182, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ff.x, ff.y, ff.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Floating Petals
      petals.forEach((p) => {
        p.sway += 0.02;
        p.x += p.speedX + Math.sin(p.sway) * 0.5;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        ctx.fillStyle = p.color;
        ctx.beginPath();
        // Curving petal geometry
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.5, p.size * 0.7, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.5, -p.size * 0.7, -p.size * 0.5, 0, -p.size);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
