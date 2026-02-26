import { useEffect, useRef } from "react";

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
      <section id="home" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: "linear-gradient(160deg, #03045E 0%, #0A2540 50%, #012A4A 100%)",
        position: "relative", overflow: "hidden", padding: "120px 5% 80px",
      }}>
        {/* Particle Canvas */}
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }} />

        {/* Animated blobs */}
        {[
          { w: 700, h: 700, top: "-25%", left: "-5%", c: "rgba(0,180,216,0.14)", a: 10 },
          { w: 500, h: 500, top: "55%", left: "65%", c: "rgba(0,119,182,0.18)", a: 13 },
          { w: 350, h: 350, top: "20%", left: "45%", c: "rgba(72,202,228,0.1)", a: 8 },
          { w: 250, h: 250, top: "70%", left: "15%", c: "rgba(0,180,216,0.08)", a: 11 },
        ].map((b, i) => (
            <div key={i} style={{
              position: "absolute", width: b.w, height: b.h, borderRadius: "50%",
              background: `radial-gradient(circle, ${b.c}, transparent 70%)`,
              top: b.top, left: b.left, zIndex: 1,
              animation: `blob${i} ${b.a}s ease-in-out infinite alternate`,
            }} />
        ))}

        {/* Geometric orbit decoration */}
        <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", width: 280, height: 280, zIndex: 2, display: "none" }} className="hero-orbit">
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(0,180,216,0.15)", animation: "spin-slow 20s linear infinite" }} />
          <div style={{ position: "absolute", inset: 20, borderRadius: "50%", border: "1px dashed rgba(0,180,216,0.1)", animation: "spin-slow 14s linear infinite reverse" }} />
          <div style={{ position: "absolute", inset: "50%", transform: "translate(-50%,-50%)", width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,216,0.4), transparent)", animation: "pulse-glow 3s ease-in-out infinite" }} />
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 3 }}>
          {/* Live badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 20px",
            background: "rgba(0,180,216,0.08)", border: "1px solid rgba(0,180,216,0.25)",
            borderRadius: 100, marginBottom: 36, backdropFilter: "blur(10px)"
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00B4D8", display: "inline-block", animation: "pulse-glow 2s ease-in-out infinite" }} />
            <span style={{ color: "#48CAE4", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
            End-to-End Digital Agency
          </span>
          </div>

          {/* Headline with gradient text */}
          <h1 style={{
            fontSize: "clamp(38px, 5.8vw, 76px)",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 800, color: "#ffffff", lineHeight: 1.05, marginBottom: 28,
            maxWidth: 820, letterSpacing: "-2px"
          }}>
            We Build Brands,<br />
            Rank Websites,<br />
            <span style={{
              background: "linear-gradient(90deg, #00B4D8, #48CAE4, #00B4D8)",
              backgroundSize: "200%",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "gradient-shift 4s ease infinite"
            }}>Secure & Ship Software</span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 1.8vw, 19px)", color: "rgba(255,255,255,0.6)",
            fontFamily: "'DM Sans', sans-serif", maxWidth: 540, lineHeight: 1.75, marginBottom: 44
          }}>
            Cyvera is your end-to-end digital partner — from identity to infrastructure. One team. Every discipline. Real results.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 64 }}>
            <button type="button" onClick={() => onSchedule?.()} style={{
              background: "linear-gradient(90deg, #00B4D8, #0077B6)", color: "#fff",
              textDecoration: "none", padding: "17px 36px", borderRadius: 12,
              fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 0 40px rgba(0,180,216,0.5)", letterSpacing: "0.3px",
              transition: "transform 0.2s, box-shadow 0.2s", display: "inline-flex", alignItems: "center", gap: 8,
              border: "none", cursor: "pointer"
            }}
               onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 60px rgba(0,180,216,0.7)"; }}
               onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,180,216,0.5)"; }}
            >Schedule a Meeting <span style={{ fontSize: 18 }}>→</span></button>
            <a href="#work" style={{
              background: "rgba(255,255,255,0.05)", color: "#fff", textDecoration: "none",
              padding: "17px 36px", borderRadius: 12, fontSize: 15, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)", transition: "all 0.2s"
            }}
               onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,180,216,0.5)"; e.currentTarget.style.background = "rgba(0,180,216,0.08)"; }}
               onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            >View Our Work</a>
          </div>

          {/* Floating metric chips */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "50+ Projects", icon: "✦" },
              { label: "Security-First", icon: "🔐" },
              { label: "Full-Stack", icon: "💡" },
              { label: "4× Avg ROI", icon: "📈" },
            ].map((c, i) => (
                <span key={c.label} style={{
                  padding: "9px 20px", background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100,
                  color: "rgba(255,255,255,0.65)", fontSize: 12.5, fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500, backdropFilter: "blur(6px)", display: "inline-flex", gap: 7, alignItems: "center",
                  animation: `float ${4 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.3}s`
                }}><span>{c.icon}</span>{c.label}</span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 3 }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(0,180,216,0.6), transparent)", animation: "pulse-glow 2s ease-in-out infinite" }} />
        </div>
      </section>
  );
}


export default Hero;
