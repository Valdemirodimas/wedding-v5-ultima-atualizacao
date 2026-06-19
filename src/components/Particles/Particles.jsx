// src/components/Particles/Particles.jsx — pétalas suaves
import { useEffect, useRef } from 'react';

export default function Particles({ count = 35, opacity = 0.7 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.4 + 0.1,
      alpha: Math.random() * 0.5 + 0.15,
      hue: Math.random() > 0.5 ? 'rose' : 'sage',
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        // Petal shape (ellipse slightly rotated)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.vx * 10);
        ctx.scale(1, 0.6);
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx.restore();
        ctx.fillStyle = p.hue === 'rose'
          ? `rgba(232,196,184,${p.alpha * opacity})`
          : `rgba(196,212,192,${p.alpha * opacity * 0.7})`;
        ctx.fill();

        p.x += p.vx; p.y += p.vy;
        if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W; }
        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, [count, opacity]);

  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />
  );
}
