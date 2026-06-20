import { useRef, useEffect } from 'react';

export default function CursorField() {
  const ref = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d');
    let raf, w, h, dpr;
    const mouse = { x: -9999, y: -9999 };
    let particles = [];
    let mouseNear = false;
    let running = false;

    const accent = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim() || '#2997ff';

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(25, Math.floor((w * h) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
      }));
    };

    const hexToRgb = (hex) => {
      const m = hex.replace('#', '');
      const n =
        m.length === 3
          ? m
              .split('')
              .map((c) => c + c)
              .join('')
          : m;
      const int = parseInt(n, 16);
      return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
    };

    const draw = () => {
      if (!running) return;
      const [r, g, b] = hexToRgb(accent());
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        const dx = mouse.x - p.x,
          dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 160) {
          const f = ((160 - dist) / 160) * 0.6;
          p.x += (dx / dist) * f;
          p.y += (dy / dist) * f;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},0.5)`;
        ctx.fill();
      }

      if (mouseNear) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i],
              c = particles[j];
            const d = Math.hypot(a.x - c.x, a.y - c.y);
            if (d < 120) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(c.x, c.y);
              ctx.strokeStyle = `rgba(${r},${g},${b},${0.12 * (1 - d / 120)})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
          const a = particles[i];
          const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (dm < 160) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.25 * (1 - dm / 160)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    // Only run when the hero section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!running) {
              running = true;
              raf = requestAnimationFrame(draw);
            }
          } else {
            running = false;
            if (raf) cancelAnimationFrame(raf);
            raf = null;
          }
        }
      },
      { threshold: 0 }
    );

    const parent = canvas.parentElement;
    if (parent) observer.observe(parent);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouseNear = true;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouseNear = false;
    };

    resize();
    running = true;
    raf = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);

    return () => {
      running = false;
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    />
  );
}
