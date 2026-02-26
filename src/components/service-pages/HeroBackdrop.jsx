import { useEffect, useRef } from "react";

function HeroBackdrop({ scheme }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.4,
      opacity: Math.random() * 0.45 + 0.1
    }));

    const handleMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", handleMouse);
    const handleResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      particles.forEach(p => {
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) { p.vx -= dx / dist * 0.018; p.vy -= dy / dist * 0.018; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${scheme.particleRGB},${p.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 95) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${scheme.particleRGB},${0.08 * (1 - d / 95)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", handleMouse); window.removeEventListener("resize", handleResize); };
  }, [scheme.particleRGB]);

  return (
      <>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }} />
        {scheme.blobs.map((b, i) => (
            <div key={i} style={{
              position: "absolute", width: b.w, height: b.h, borderRadius: "50%",
              background: `radial-gradient(circle, ${b.c}, transparent 70%)`,
              top: b.top, left: b.left, zIndex: 1,
              animation: `blob${i} ${b.a}s ease-in-out infinite alternate`,
            }} />
        ))}
      </>
  );
}


export default HeroBackdrop;
