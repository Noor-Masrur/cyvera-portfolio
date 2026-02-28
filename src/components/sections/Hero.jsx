import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

function Hero({ onSchedule }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
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
        if (dist < 150) { p.vx -= dx / dist * 0.02; p.vy -= dy / dist * 0.02; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,180,216,${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,180,216,${0.08 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", handleMouse); window.removeEventListener("resize", handleResize); };
  }, []);

  return (
      <section id="home" className={styles.section}>
        {/* Particle Canvas */}
        <canvas ref={canvasRef} className={styles.canvas} />

        {/* Animated blobs */}
        {[
          { w: 700, h: 700, top: "-25%", left: "-5%", c: "rgba(0,180,216,0.14)", a: 10 },
          { w: 500, h: 500, top: "55%", left: "65%", c: "rgba(0,119,182,0.18)", a: 13 },
          { w: 350, h: 350, top: "20%", left: "45%", c: "rgba(72,202,228,0.1)", a: 8 },
          { w: 250, h: 250, top: "70%", left: "15%", c: "rgba(0,180,216,0.08)", a: 11 },
        ].map((b, i) => (
            <div
              key={i}
              className={styles.blob}
              style={{
                width: b.w,
                height: b.h,
                background: `radial-gradient(circle, ${b.c}, transparent 70%)`,
                top: b.top,
                left: b.left,
                animation: `blob${i} ${b.a}s ease-in-out infinite alternate`,
              }}
            />
        ))}

        {/* Geometric orbit decoration */}
        <div className={styles.orbit}>
          <div className={styles.orbitRing} />
          <div className={styles.orbitRingInner} />
          <div className={styles.orbitCore} />
        </div>

        <img
          src="/smm.png"
          alt="Marketing megaphone illustration"
          className={`${styles.floatVisual} ${styles.floatVisualLeft}`}
        />
        <img
          src="/seo.png"
          alt="Growth bars illustration"
          className={`${styles.floatVisual} ${styles.floatVisualRight}`}
        />
        <img
          src="/cysec.png"
          alt="Cybersecurity illustration"
          className={`${styles.floatVisual} ${styles.floatVisualBottomLeft}`}
        />
        <img
          src="/dev.png"
          alt="Development illustration"
          className={`${styles.floatVisual} ${styles.floatVisualBottomRight}`}
        />

        <div className={styles.container}>
          {/* Live badge */}
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>
            End-to-End Digital Agency
          </span>
          </div>

          {/* Headline with gradient text */}
          <h1 className={styles.title}>
            We Build Brands,<br />
            Rank Websites,<br />
            <span className={styles.titleAccent}>Secure & Ship Software</span>
          </h1>

          <p className={styles.subtitle}>
            Cyvera is your end-to-end digital partner — from identity to infrastructure. One team. Every discipline. Real results.
          </p>

          {/* CTAs */}
          <div className={styles.ctaRow}>
            <button type="button" onClick={() => onSchedule?.()} className={styles.primaryBtn}>
              Schedule a Meeting <span style={{ fontSize: 18 }}>→</span>
            </button>
            <a href="#work" className={styles.secondaryBtn}>View Our Work</a>
          </div>

          {/* Floating metric chips */}
          <div className={styles.chipRow}>
            {[
              { label: "50+ Projects", icon: "✦" },
              { label: "Security-First", icon: "🔐" },
              { label: "Full-Stack", icon: "💡" },
              { label: "4× Avg ROI", icon: "📈" },
            ].map((c, i) => (
                <span
                  key={c.label}
                  className={styles.chip}
                  style={{
                    animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  <span>{c.icon}</span>
                  {c.label}
                </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollLabel}>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </section>
  );
}


export default Hero;
