import { useState, useEffect, useRef } from "react";
import { useSEO, SEO_CONFIGS } from "./seo/useSEO";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Megaphone, Search, ShieldCheck, Code2, MonitorSmartphone, Cpu } from "lucide-react";

// ─── Intersection Observer Hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
      <div ref={ref} className={className} style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`
      }}>
        {children}
      </div>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  const prefix = target.match(/^[^0-9]*/)[0];
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  { id: "social-media", icon: <Megaphone size={26} strokeWidth={1.6} color="#00B4D8" />, name: "Social Media Marketing & Branding", desc: "Positioning, content, and performance systems that turn attention into revenue.", color: "#00B4D8", accent: "rgba(0,180,216,0.15)" },
  { id: "seo", icon: <Search size={26} strokeWidth={1.6} color="#0096C7" />, name: "Search Engine Optimization", desc: "Technical and content SEO that compounds visibility and pipeline.", color: "#0096C7", accent: "rgba(0,150,199,0.15)" },
  { id: "cybersecurity", icon: <ShieldCheck size={26} strokeWidth={1.6} color="#0077B6" />, name: "Cybersecurity & Digital Forensics", desc: "Risk assessments, hardening, and monitoring for resilient operations.", color: "#0077B6", accent: "rgba(0,119,182,0.15)" },
  { id: "website-dev", icon: <MonitorSmartphone size={26} strokeWidth={1.6} color="#1769FF" />, name: "Website Development", desc: "High-performance marketing sites that convert, load fast, and scale with your brand.", color: "#1769FF", accent: "rgba(23,105,255,0.15)" },
  { id: "custom-software", icon: <Cpu size={26} strokeWidth={1.6} color="#023E8A" />, name: "Custom Software", desc: "Custom apps and distributed systems engineered for reliability and growth.", color: "#023E8A", accent: "rgba(2,62,138,0.15)" },
];

const stats = [
  { num: "50+", label: "Clients Served", suffix: "" },
  { num: "98%", label: "Client Retention", suffix: "%" },
  { num: "100%", label: "Security-First", suffix: "%" },
  { num: "4x", label: "Avg. ROI Delivered", suffix: "" },
];

const differentiators = [
  "End-to-end capabilities under one roof — no handoffs, no excuses",
  "Security-first mindset baked into every product and campaign",
  "Transparent reporting and strategy, always",
  "Dedicated team that moves as fast as your ambitions",
];

const projects = [
  { category: "Branding + SEO", name: "NovaPay Rebrand", metric: "+140% Organic Traffic", tags: ["SEO", "Social Media"], gradient: "linear-gradient(135deg, #0A2540 0%, #00B4D8 100%)", size: "large" },
  { category: "Cybersecurity", name: "ShieldNet Audit", metric: "0 Breaches Post-Deploy", tags: ["Cybersecurity"], gradient: "linear-gradient(135deg, #023E8A 0%, #0096C7 100%)", size: "small" },
  { category: "Software Dev", name: "Orion SaaS Platform", metric: "3× Faster Load Times", tags: ["Software"], gradient: "linear-gradient(135deg, #03045E 0%, #48CAE4 100%)", size: "small" },
];

const filterTabs = ["All", "Social Media", "SEO", "Cybersecurity", "Software"];

const steps = [
  { n: "01", title: "Discover", desc: "Deep-dive into your goals, market, and gaps.", icon: "🔭" },
  { n: "02", title: "Strategize", desc: "Build a precision roadmap tailored to your ambition.", icon: "🗺️" },
  { n: "03", title: "Execute", desc: "Deliver with craft, speed, and zero guesswork.", icon: "⚡" },
  { n: "04", title: "Optimize", desc: "Measure, learn, iterate — and keep winning.", icon: "📈" },
];

const testimonials = [
  { name: "Aria Chen", role: "CEO, NovaPay", quote: "Cyvera didn't just redesign our brand — they transformed how our customers perceive us. The SEO results alone paid back our investment 10×.", initials: "AC" },
  { name: "Marcus Webb", role: "CTO, ShieldNet", quote: "The most thorough cybersecurity audit we've had. They found vulnerabilities our previous vendor missed for two years. Trust them completely.", initials: "MW" },
  { name: "Sofia Reyes", role: "Founder, Orion Labs", quote: "Our SaaS product went from MVP to launch-ready in 90 days. The team's technical depth is unmatched.", initials: "SR" },
  { name: "James Patel", role: "CMO, Zenith Digital", quote: "The growth we've seen in organic search after working with Cyvera has been nothing short of remarkable. Real results, real fast.", initials: "JP" },
  { name: "Lena Okafor", role: "Founder, Bloom Brands", quote: "Finally, an agency that treats reporting like a feature — not an afterthought. We always know exactly what our money is doing.", initials: "LO" },
];

const clients = ["NovaPay", "ShieldNet", "Orion Labs", "Zenith Digital", "Bloom Brands", "Apex Tech", "NovaFlow", "Stratos IO", "Pulsar Media"];

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ isDetail = false, onHome, onSchedule }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e, href) => {
    if (!isDetail) return;
    e.preventDefault();
    onHome?.(href);
  };

  return (
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,37,64,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,180,216,0.12)" : "none",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", padding: "0 5%"
      }}>
        <nav style={{ maxWidth: 1200, margin: "0 auto", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #00B4D8, #0077B6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 19, fontWeight: 900, color: "#fff", fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 0 20px rgba(0,180,216,0.4)"
            }}>C</div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.5px" }}>Cyvera</span>
          </a>

          <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
            {navLinks.map(l => (
                <a key={l.label} href={l.href} onClick={(e) => handleNavClick(e, l.href)} style={{
                  color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14,
                  fontWeight: 500, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.3px",
                  transition: "color 0.2s"
                }}
                   onMouseEnter={e => e.target.style.color = "#00B4D8"}
                   onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}
                >{l.label}</a>
            ))}
            <button type="button" onClick={() => onSchedule?.()} style={{
              background: "linear-gradient(90deg, #00B4D8, #0077B6)",
              color: "#fff", textDecoration: "none", padding: "10px 22px",
              borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 0 24px rgba(0,180,216,0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
              border: "none", cursor: "pointer"
            }}
               onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 0 36px rgba(0,180,216,0.6)"; }}
               onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 0 24px rgba(0,180,216,0.4)"; }}
            >Schedule a Meeting</button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{
            display: "none", background: "none", border: "none", color: "#fff",
            fontSize: 24, cursor: "pointer"
          }} className="mobile-menu-btn">☰</button>
        </nav>

        {menuOpen && (
            <div style={{ background: "rgba(10,37,64,0.97)", backdropFilter: "blur(20px)", padding: "20px 5%", borderBottom: "1px solid rgba(0,180,216,0.15)" }}>
              {navLinks.map(l => (
                  <a key={l.label} href={l.href} onClick={(e) => { setMenuOpen(false); handleNavClick(e, l.href); }}
                     style={{ display: "block", color: "rgba(255,255,255,0.85)", textDecoration: "none", padding: "12px 0", fontSize: 16, fontFamily: "'DM Sans', sans-serif", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                  >{l.label}</a>
              ))}
            </div>
        )}

        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Serif+Display:ital@0;1&display=swap');
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: block !important; } }
        @media (max-width: 900px) { .service-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .service-grid { grid-template-columns: 1fr !important; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F7FAFC; overflow-x: hidden; color: #061629; }
        ::selection { background: rgba(0,180,216,0.25); }

        @keyframes float { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
        @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 20px rgba(0,180,216,0.3); } 50% { box-shadow: 0 0 50px rgba(0,180,216,0.7), 0 0 80px rgba(0,180,216,0.3); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes blob0 { from { transform: translate(0,0) scale(1); } to { transform: translate(60px,80px) scale(1.15); } }
        @keyframes blob1 { from { transform: translate(0,0) scale(1); } to { transform: translate(-80px,40px) scale(0.85); } }
        @keyframes blob2 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,-60px) scale(1.2); } }
        @keyframes blob3 { from { transform: translate(0,0) scale(1); } to { transform: translate(-40px,60px) scale(0.9); } }
        @keyframes scanline { from { transform: translateY(-100%); } to { transform: translateY(100vh); } }
        @keyframes tilt-float { 0%,100% { transform: perspective(800px) rotateX(2deg) rotateY(-3deg); } 50% { transform: perspective(800px) rotateX(-2deg) rotateY(3deg); } }
        @keyframes counter-in { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes line-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes reveal-up { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:translateY(0); } }
        @keyframes orbit { from { transform: rotate(0deg) translateX(120px) rotate(0deg); } to { transform: rotate(360deg) translateX(120px) rotate(-360deg); } }
        @keyframes glow-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
      `}</style>
      </header>
  );
}

// ─── Hero — Cinematic with animated grid + morphing blobs ────────────────────
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

// ─── Client Marquee Strip ─────────────────────────────────────────────────────
function MarqueeStrip() {
  const items = [...clients, ...clients];
  return (
      <div style={{
        background: "linear-gradient(90deg, #03045E, #0A2540)",
        padding: "20px 0", overflow: "hidden",
        borderTop: "1px solid rgba(0,180,216,0.15)",
        borderBottom: "1px solid rgba(0,180,216,0.15)",
      }}>
        <div style={{ display: "flex", animation: "marquee 22s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
          {items.map((c, i) => (
              <span key={i} style={{ padding: "0 40px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 20 }}>
            {c}
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(0,180,216,0.5)", display: "inline-block" }} />
          </span>
          ))}
        </div>
      </div>
  );
}

// ─── Services — 3D Tilt Cards ─────────────────────────────────────────────────
function Services({ onSelect }) {
  return (
      <section id="services" style={{ padding: "120px 5%", background: "linear-gradient(180deg, #F7FAFC 0%, #EBF4FF 100%)", position: "relative", overflow: "hidden" }}>
        {/* Big background text */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "clamp(80px, 15vw, 200px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "rgba(0,180,216,0.04)", pointerEvents: "none", whiteSpace: "nowrap", userSelect: "none" }}>
          CAPABILITIES
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ marginBottom: 72 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #00B4D8, transparent)" }} />
                <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase" }}>What We Do</span>
              </div>
              <h2 style={{ fontSize: "clamp(34px, 4.5vw, 60px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", letterSpacing: "-2px", lineHeight: 1.1 }}>
                Five disciplines.<br /><span style={{ color: "#00B4D8" }}>One team.</span>
              </h2>
            </div>
          </Reveal>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, alignItems: "stretch", gridAutoRows: "1fr" }}>
            {services.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.08}>
                  <TiltCard s={s} onSelect={onSelect} />
                </Reveal>
            ))}
          </div>
          <style>{`
            @media (min-width: 1200px) {
              .services-grid { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; }
            }
          `}</style>
        </div>
      </section>
  );
}

function TiltCard({ s, onSelect }) {
  const cardRef = useRef(null);
  const [style3d, setStyle3d] = useState({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hov, setHov] = useState(false);

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle3d({ transform: `perspective(600px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale(1.03)` });
    setGlowPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };
  const onMouseLeave = () => { setStyle3d({ transform: "perspective(600px) rotateX(0) rotateY(0) scale(1)", transition: "transform 0.5s ease" }); setHov(false); };
  const onMouseEnter = () => { setHov(true); };

  return (
      <button
          ref={cardRef} type="button"
          onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}
          onClick={() => onSelect?.(s.id)}
          style={{
            position: "relative", overflow: "hidden",
            background: "linear-gradient(160deg, #fff 0%, #f0f7ff 100%)",
            borderRadius: 24, padding: "40px 32px",
            border: `1.5px solid ${hov ? s.color + "80" : "rgba(10,37,64,0.07)"}`,
            boxShadow: hov ? `0 28px 70px ${s.color}30, 0 0 0 1px ${s.color}20` : "0 8px 32px rgba(10,37,64,0.08)",
            cursor: "pointer", textAlign: "left", width: "100%",
            display: "flex", flexDirection: "column", minHeight: 300, height: "100%",
            transition: "border-color 0.3s, box-shadow 0.3s",
            ...style3d,
            willChange: "transform"
          }}
      >
        {/* Spotlight glow */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 24,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${s.accent} 0%, transparent 60%)`,
          opacity: hov ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none"
        }} />

        {/* Number watermark */}
        <span style={{
          position: "absolute", top: 16, right: 20,
          fontSize: 64, fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
          color: "rgba(0,180,216,0.06)", lineHeight: 1, pointerEvents: "none",
          transition: "color 0.3s"
        }}>0{services.indexOf(services.find(x => x.id === s.id)) + 1}</span>

        <div style={{
          width: 56, height: 56, borderRadius: 18,
          background: `linear-gradient(135deg, ${s.color}25, ${s.color}10)`,
          border: `1px solid ${s.color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, marginBottom: 22,
          transition: "transform 0.3s",
          transform: hov ? "scale(1.1) rotate(-5deg)" : "scale(1)"
        }}>{s.icon}</div>

        <h3 style={{ fontSize: 19, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", marginBottom: 12, lineHeight: 1.3 }}>{s.name}</h3>
        <p style={{ fontSize: 14, color: "rgba(10,37,64,0.55)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75, marginBottom: 24 }}>{s.desc}</p>
        <div style={{ flex: 1 }} />

        <span style={{
          color: "#0A2540",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 900,
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          letterSpacing: "0.6px",
          textTransform: "uppercase",
          padding: "12px 18px",
          borderRadius: 999,
          background: hov
              ? `linear-gradient(90deg, ${s.color}55, ${s.color}25)`
              : `linear-gradient(90deg, ${s.color}35, ${s.color}15)`,
          border: `1px solid ${s.color}77`,
          boxShadow: hov
              ? `0 14px 30px ${s.color}40, 0 0 0 2px ${s.color}25`
              : `0 10px 22px ${s.color}25`,
          transform: hov ? "translateY(-1px)" : "translateY(0)",
          transition: "color 0.2s, gap 0.2s, background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s"
        }}>
          Explore service
          <span style={{
            width: 30, height: 30, borderRadius: "50%",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: hov ? s.color : "rgba(10,37,64,0.22)",
            color: "#fff", fontSize: 14, lineHeight: 1,
            transform: hov ? "translateX(4px) scale(1.08)" : "translateX(0) scale(1)",
            transition: "transform 0.2s, background 0.2s"
          }}>→</span>
        </span>
      </button>
  );
}

// ─── Stats Strip — Animated Counters ─────────────────────────────────────────
function StatsStrip() {
  return (
      <div style={{
        background: "linear-gradient(90deg, #03045E 0%, #0A2540 50%, #023E8A 100%)",
        padding: "0", overflow: "hidden", position: "relative"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,180,216,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", position: "relative", zIndex: 2 }} className="stats-grid">
          {stats.map((s, i) => (
              <div key={i} style={{
                padding: "56px 32px", textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(0,180,216,0.12)" : "none",
                position: "relative", overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at 50% 0%, rgba(0,180,216,0.08), transparent 70%)",
                  opacity: 0, transition: "opacity 0.4s"
                }} className="stat-bg" />
                <div style={{ fontSize: "clamp(36px, 4vw, 60px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#00B4D8", lineHeight: 1, marginBottom: 10 }}>
                  <AnimatedNumber target={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>{s.label}</div>
              </div>
          ))}
        </div>
        <style>{`@media (max-width: 600px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </div>
  );
}

// ─── Why Cyvera — Split Layout ────────────────────────────────────────────────
function WhyCyvera() {
  return (
      <section id="about" style={{ padding: "120px 5%", background: "linear-gradient(180deg, #061629 0%, #0A2540 50%, #071B3A 100%)", position: "relative", overflow: "hidden" }}>
        {/* Decorative circle */}
        <div style={{ position: "absolute", right: "-5%", top: "10%", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(0,180,216,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "2%", top: "15%", width: 350, height: 350, borderRadius: "50%", border: "1px dashed rgba(0,180,216,0.05)", pointerEvents: "none", animation: "spin-slow 30s linear infinite" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="two-col">
            <Reveal>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #00B4D8, transparent)" }} />
                  <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase" }}>Why Us</span>
                </div>
                <h2 style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 40, letterSpacing: "-1.5px", lineHeight: 1.1 }}>
                  One agency.<br />
                  <span style={{ color: "#00B4D8" }}>Every</span> digital need.
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {differentiators.map((d, i) => (
                      <Reveal key={i} delay={i * 0.1}>
                        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                            background: "linear-gradient(135deg, rgba(0,180,216,0.2), rgba(0,180,216,0.05))",
                            border: "1px solid rgba(0,180,216,0.3)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 12, color: "#00B4D8", marginTop: 2
                          }}>✓</div>
                          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>{d}</p>
                        </div>
                      </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              {/* Creative dashboard mockup */}
              <div style={{ position: "relative" }}>
                <div style={{
                  background: "linear-gradient(160deg, rgba(0,180,216,0.08), rgba(0,60,120,0.15))",
                  borderRadius: 28, padding: 32, border: "1px solid rgba(0,180,216,0.15)",
                  backdropFilter: "blur(20px)", boxShadow: "0 40px 80px rgba(0,0,0,0.4)"
                }}>
                  {/* Top bar */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "1px" }}>CYVERA DASHBOARD</div>
                  </div>

                  {/* Metrics row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                    {[
                      { label: "Organic Traffic", val: "+140%", trend: "↑", color: "#00B4D8" },
                      { label: "Security Score", val: "98/100", trend: "✓", color: "#48CAE4" },
                      { label: "ROAS", val: "3.2×", trend: "↑", color: "#0096C7" },
                      { label: "Load Time", val: "−67%", trend: "↓", color: "#00B4D8" },
                    ].map((m, i) => (
                        <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>{m.label}</div>
                          <div style={{ fontSize: 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: m.color }}>{m.val}</div>
                        </div>
                    ))}
                  </div>

                  {/* Fake chart bars */}
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "16px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 14 }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "1px", marginBottom: 12 }}>PERFORMANCE TREND</div>
                    <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 50 }}>
                      {[30, 45, 40, 55, 48, 65, 58, 70, 62, 80, 75, 90].map((h, i) => (
                          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 4, background: `linear-gradient(to top, #00B4D8, #48CAE4)`, opacity: 0.6 + i * 0.03 }} />
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div style={{ background: "linear-gradient(90deg, rgba(0,180,216,0.15), rgba(0,119,182,0.1))", borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(0,180,216,0.2)" }}>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600 }}>All Systems Operational</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00B4D8", display: "inline-block", animation: "pulse-glow 2s ease-in-out infinite" }} />
                      <span style={{ color: "#00B4D8", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>LIVE</span>
                    </div>
                  </div>
                </div>

                {/* Floating decorative badge */}
                <div style={{
                  position: "absolute", top: -20, right: -20,
                  background: "linear-gradient(135deg, #00B4D8, #0077B6)",
                  borderRadius: 16, padding: "12px 18px",
                  boxShadow: "0 0 40px rgba(0,180,216,0.6)",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                  fontSize: 13, color: "#fff", animation: "float 4s ease-in-out infinite"
                }}>4× ROI</div>
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .two-col { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
      </section>
  );
}

// ─── Portfolio — Creative Grid with Hover Reveal ──────────────────────────────
function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter(p => p.tags.includes(active));

  return (
      <section id="work" style={{ padding: "120px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F0F6FF 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,216,0.05), transparent 70%)", transform: "translateY(-50%)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #00B4D8, transparent)" }} />
                  <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase" }}>Portfolio</span>
                </div>
                <h2 style={{ fontSize: "clamp(34px, 4.5vw, 60px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", letterSpacing: "-2px", lineHeight: 1.1 }}>
                  Our Work
                </h2>
              </div>
              {/* Filter Tabs */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {filterTabs.map(t => (
                    <button key={t} onClick={() => setActive(t)} style={{
                      padding: "9px 20px", borderRadius: 100, fontSize: 13, fontWeight: 700,
                      fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "all 0.2s",
                      background: active === t ? "linear-gradient(90deg, #00B4D8, #0077B6)" : "transparent",
                      color: active === t ? "#fff" : "#0A2540",
                      border: active === t ? "none" : "1.5px solid rgba(10,37,64,0.12)",
                      boxShadow: active === t ? "0 0 24px rgba(0,180,216,0.4)" : "none",
                    }}>{t}</button>
                ))}
              </div>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="project-grid">
            {filtered.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.1}>
                  <ProjectCard p={p} />
                </Reveal>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .project-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
  );
}

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  return (
      <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
        borderRadius: 22, overflow: "hidden",
        boxShadow: hov ? "0 30px 70px rgba(0,30,80,0.18)" : "0 8px 32px rgba(10,37,64,0.08)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: hov ? "translateY(-8px)" : "translateY(0)",
        background: "#fff", cursor: "pointer"
      }}>
        <div style={{ height: 220, background: p.gradient, position: "relative", overflow: "hidden" }}>
          {/* Animated shine */}
          <div style={{
            position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%",
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
            transform: hov ? "translateX(400%)" : "translateX(0)",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)"
          }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px 24px" }}>
            <span style={{ alignSelf: "flex-start", padding: "6px 16px", borderRadius: 100, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.85)", fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>{p.category}</span>
            <div>
              {p.tags.map(t => <span key={t} style={{ marginRight: 8, padding: "4px 12px", borderRadius: 100, background: "rgba(0,0,0,0.25)", color: "rgba(255,255,255,0.7)", fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{t}</span>)}
            </div>
          </div>
        </div>
        <div style={{ padding: "24px 28px" }}>
          <h3 style={{ fontSize: 18, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 10 }}>{p.name}</h3>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,180,216,0.07)", padding: "7px 14px", borderRadius: 100, marginBottom: 16, border: "1px solid rgba(0,180,216,0.15)" }}>
            <span style={{ color: "#00B4D8", fontSize: 14 }}>↑</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0077B6", fontFamily: "'DM Sans', sans-serif" }}>{p.metric}</span>
          </div>
          <div>
            <a href="#contact" style={{
              color: hov ? "#00B4D8" : "rgba(10,37,64,0.35)", fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
              transition: "color 0.2s"
            }}>View Case Study <span style={{ transform: hov ? "translateX(4px)" : "none", display: "inline-block", transition: "transform 0.2s" }}>→</span></a>
          </div>
        </div>
      </article>
  );
}

// ─── Process — Horizontal Step Cards ─────────────────────────────────────────
function Process() {
  return (
      <section style={{ padding: "120px 5%", background: "linear-gradient(180deg, #F4F9FF 0%, #E8F0FF 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,180,216,0.3), transparent)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16, justifyContent: "center" }}>
                <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, transparent, #00B4D8)" }} />
                <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase" }}>Methodology</span>
                <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #00B4D8, transparent)" }} />
              </div>
              <h2 style={{ fontSize: "clamp(34px, 4.5vw, 60px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", letterSpacing: "-2px" }}>How We Work</h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative" }} className="process-grid">
            {/* Connector line */}
            <div style={{ position: "absolute", top: 48, left: "12.5%", right: "12.5%", height: 2, background: "linear-gradient(90deg, #00B4D8, #0077B6)", zIndex: 0, animation: "line-grow 1.5s ease-out" }} />

            {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.15}>
                  <div style={{ padding: "0 16px", textAlign: "center", position: "relative", zIndex: 1 }}>
                    {/* Node */}
                    <div style={{
                      width: 80, height: 80, borderRadius: "50%", margin: "0 auto 28px",
                      background: `linear-gradient(135deg, #00B4D8, #0077B6)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 28, boxShadow: "0 0 0 8px rgba(0,180,216,0.1), 0 16px 32px rgba(0,180,216,0.35)",
                      animation: `float ${5 + i}s ease-in-out infinite`, animationDelay: `${i * 0.5}s`
                    }}>{s.icon}</div>

                    <div style={{ fontSize: 11, color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "2px", marginBottom: 8 }}>{s.n}</div>
                    <h3 style={{ fontSize: 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 12 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: "rgba(10,37,64,0.55)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </Reveal>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .process-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </section>
  );
}

// ─── Testimonials — Marquee Infinite Scroll ───────────────────────────────────
function Testimonials() {
  const doubled = [...testimonials, ...testimonials];
  return (
      <section style={{ padding: "120px 0", background: "linear-gradient(160deg, #03045E 0%, #0A2540 50%, #023E8A 100%)", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(0,180,216,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", marginBottom: 56, position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #00B4D8, transparent)" }} />
                  <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase" }}>Testimonials</span>
                </div>
                <h2 style={{ fontSize: "clamp(34px, 4.5vw, 60px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", letterSpacing: "-2px", lineHeight: 1.1 }}>
                  What clients say
                </h2>
              </div>
              <div style={{ padding: "10px 24px", borderRadius: 100, border: "1px solid rgba(0,180,216,0.3)", background: "rgba(0,180,216,0.08)", backdropFilter: "blur(8px)" }}>
                <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13 }}>5.0 ★★★★★</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Marquee row 1 */}
        <div style={{ overflow: "hidden", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 20, animation: "marquee 35s linear infinite", width: "max-content" }}>
            {doubled.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
        {/* Marquee row 2 — reversed */}
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 20, animation: "marquee 40s linear infinite reverse", width: "max-content" }}>
            {[...doubled].reverse().map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </section>
  );
}

function TestimonialCard({ t }) {
  return (
      <div style={{
        width: 340, flexShrink: 0,
        background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)",
        borderRadius: 20, padding: "28px 28px",
        border: "1px solid rgba(0,180,216,0.15)",
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "linear-gradient(135deg, #00B4D8, #0077B6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 900, color: "#fff", fontSize: 16, flexShrink: 0
          }}>{t.initials}</div>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#fff", fontSize: 14 }}>{t.name}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{t.role}</div>
          </div>
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75 }}>{t.quote}</p>
      </div>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner({ onSchedule }) {
  return (
      <section style={{
        padding: "100px 5%",
        background: "linear-gradient(135deg, #00B4D8, #0077B6, #03045E)",
        backgroundSize: "200%",
        animation: "gradient-shift 6s ease infinite",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div style={{ position: "absolute", top: "-20%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }} />

        <Reveal>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", letterSpacing: "-2px", marginBottom: 20, lineHeight: 1.1 }}>
              Ready to grow<br />without limits?
            </h2>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", marginBottom: 40, lineHeight: 1.7 }}>
              Book a consultation and we'll build a 90-day growth plan — at no cost.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#contact" style={{
                background: "#fff", color: "#0A2540", textDecoration: "none",
                padding: "18px 40px", borderRadius: 12, fontSize: 15, fontWeight: 800,
                fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 50px rgba(0,0,0,0.25)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
                 onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.35)"; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 50px rgba(0,0,0,0.25)"; }}
              >Start Your Project →</a>
            </div>
          </div>
        </Reveal>
      </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Unable to send message. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setSubmitError(err?.message || "Unable to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "15px 18px", borderRadius: 12, fontSize: 14,
    fontFamily: "'DM Sans', sans-serif", outline: "none",
    border: `1.5px solid ${errors[field] ? "#ef4444" : "rgba(10,37,64,0.12)"}`,
    background: "rgba(255,255,255,0.96)", color: "#0A2540",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 16px rgba(10,37,64,0.05)"
  });

  return (
      <section id="contact" style={{ padding: "120px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F2F7FF 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,180,216,0.3), transparent)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16, justifyContent: "center" }}>
                <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, transparent, #00B4D8)" }} />
                <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase" }}>Get Started</span>
                <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #00B4D8, transparent)" }} />
              </div>
              <h2 style={{ fontSize: "clamp(34px, 4.5vw, 60px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", letterSpacing: "-2px" }}>Let's Work Together</h2>
              <p style={{ color: "rgba(10,37,64,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: 16, marginTop: 16, maxWidth: 480, margin: "16px auto 0", lineHeight: 1.7 }}>Have a project in mind? Drop us a message and we'll get back within 24 hours.</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: 72, alignItems: "start" }} className="two-col">
            <Reveal>
              <div>
                <h3 style={{ fontSize: 24, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 36 }}>Contact Information</h3>
                {[
                  { icon: "✉️", label: "Email", val: "info@cyvera.com.au" },
                  { icon: "📍", label: "Location", val: "G3/62 Didsbury St, East Brisbane, QLD 4169" },
                  { icon: "⚡", label: "Response Time", val: "Within 24 hours" },
                ].map(item => (
                    <div key={item.label} style={{ display: "flex", gap: 16, marginBottom: 28, alignItems: "flex-start" }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(0,180,216,0.07)", border: "1px solid rgba(0,180,216,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontSize: 11, color: "rgba(10,37,64,0.4)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 4 }}>{item.label}</div>
                        <div style={{ fontSize: 15, color: "#0A2540", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{item.val}</div>
                      </div>
                    </div>
                ))}

                {/* Social links */}
                <div style={{ marginTop: 40 }}>
                  <div style={{ fontSize: 11, color: "rgba(10,37,64,0.4)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 16 }}>Follow Us</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {["in", "ig", "𝕏", "gh"].map(s => (
                        <a key={s} href="#" style={{
                          width: 40, height: 40, borderRadius: 10, background: "rgba(0,180,216,0.06)",
                          border: "1px solid rgba(0,180,216,0.15)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "rgba(10,37,64,0.5)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                          textDecoration: "none", transition: "all 0.2s"
                        }}
                           onMouseEnter={e => { e.currentTarget.style.background = "#00B4D8"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#00B4D8"; }}
                           onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,180,216,0.06)"; e.currentTarget.style.color = "rgba(10,37,64,0.5)"; e.currentTarget.style.borderColor = "rgba(0,180,216,0.15)"; }}
                        >{s}</a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {sent ? (
                  <div style={{ textAlign: "center", padding: "80px 40px", background: "rgba(0,180,216,0.04)", borderRadius: 24, border: "1.5px solid rgba(0,180,216,0.15)" }}>
                    <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                    <h3 style={{ fontSize: 28, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 12 }}>Message Sent!</h3>
                    <p style={{ color: "rgba(10,37,64,0.55)", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>We'll be in touch within 24 hours.</p>
                  </div>
              ) : (
                  <form onSubmit={handleSubmit} style={{
                    background: "linear-gradient(180deg, #fff 0%, #f5f9ff 100%)",
                    borderRadius: 24, padding: 44,
                    border: "1px solid rgba(0,180,216,0.15)",
                    boxShadow: "0 24px 60px rgba(0,180,216,0.1)"
                  }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-grid">
                      <div>
                        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name *" style={inputStyle("name")} aria-label="Full Name" />
                        {errors.name && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{errors.name}</p>}
                      </div>
                      <div>
                        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email Address *" style={inputStyle("email")} aria-label="Email Address" />
                        {errors.email && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{errors.email}</p>}
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company (Optional)" style={inputStyle()} aria-label="Company" />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ ...inputStyle(), cursor: "pointer" }} aria-label="Service">
                        <option value="">Select a Service...</option>
                        <option>Social Media & Branding</option>
                        <option>SEO</option>
                        <option>Cybersecurity</option>
                        <option>Website Development</option>
                        <option>Custom Software</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: 28 }}>
                      <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project... *" rows={5} style={{ ...inputStyle("message"), resize: "vertical" }} aria-label="Message" />
                      {errors.message && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{errors.message}</p>}
                    </div>
                    {submitError && (
                      <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>
                        {submitError}
                      </p>
                    )}
                    <button type="submit" disabled={sending} aria-label="Send message" style={{
                      width: "100%", padding: "17px 32px", background: "linear-gradient(90deg, #00B4D8, #0077B6)",
                      color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800,
                      fontFamily: "'DM Sans', sans-serif", cursor: sending ? "not-allowed" : "pointer",
                      opacity: sending ? 0.8 : 1,
                      boxShadow: "0 0 40px rgba(0,180,216,0.4)", letterSpacing: "0.3px", transition: "transform 0.2s, box-shadow 0.2s"
                    }}
                            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 0 60px rgba(0,180,216,0.6)"; }}
                            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 0 40px rgba(0,180,216,0.4)"; }}
                    >{sending ? "Sending..." : "Send Message"}</button>
                  </form>
              )}
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .form-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
  );
}

function SchedulerModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    dateTime: null,
    timezone: "Australia/Brisbane",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [tempDateTime, setTempDateTime] = useState(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setSent(false);
      setSubmitError("");
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const pad2 = (val) => String(val).padStart(2, "0");
  const toDateString = (dt) => `${dt.year()}-${pad2(dt.month() + 1)}-${pad2(dt.date())}`;
  const toTimeString = (dt) => `${pad2(dt.hour())}:${pad2(dt.minute())}`;

  const openPicker = () => {
    const next = form.dateTime ? dayjs(form.dateTime) : dayjs().minute(Math.ceil(dayjs().minute() / 15) * 15).second(0);
    setTempDateTime(next);
    setPickerOpen(true);
  };

  const applyPicker = () => {
    if (tempDateTime) {
      setForm((prev) => ({ ...prev, dateTime: tempDateTime.toDate() }));
    }
    setPickerOpen(false);
  };

  const theme = createTheme({
    palette: {
      primary: { main: "#00B4D8" },
    },
    typography: {
      fontFamily: "'DM Sans', sans-serif",
    },
  });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.dateTime) e.dateTime = "Date and time are required";
    if (form.dateTime instanceof Date && !Number.isNaN(form.dateTime.getTime())) {
      const asDayjs = dayjs(form.dateTime);
      const h = asDayjs.hour();
      const m = asDayjs.minute();
      const validMinute = m % 15 === 0;
      const withinWindow = h >= 9 && h <= 23 && (h !== 23 || m === 0);
      if (!validMinute || !withinWindow) {
        e.dateTime = "Select a time between 9:00 AM and 11:00 PM AEST (15-min increments).";
      }
    }
    return e;
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            company: form.company,
            phone: form.phone,
            message: form.message,
            preferredDate: form.dateTime ? toDateString(dayjs(form.dateTime)) : "",
            preferredTime: form.dateTime ? toTimeString(dayjs(form.dateTime)) : "",
            timezone: form.timezone || "Australia/Brisbane",
          }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Unable to schedule. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setSubmitError(err?.message || "Unable to schedule. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "14px 16px", borderRadius: 12, fontSize: 14,
    fontFamily: "'DM Sans', sans-serif", outline: "none",
    border: `1.5px solid ${errors[field] ? "#ef4444" : "rgba(10,37,64,0.12)"}`,
    background: "rgba(255,255,255,0.96)", color: "#0A2540",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 16px rgba(10,37,64,0.05)"
  });

  return (
      <div style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(3, 8, 20, 0.6)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20
      }}
           onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      >
        <div style={{
          width: "100%", maxWidth: 720, background: "linear-gradient(180deg, #fff 0%, #f5f9ff 100%)",
          borderRadius: 24, padding: 36, border: "1px solid rgba(0,180,216,0.18)",
          boxShadow: "0 30px 80px rgba(10,37,64,0.25)", position: "relative"
        }}>
          <button type="button" onClick={() => onClose?.()} aria-label="Close scheduler" style={{
            position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: 10,
            border: "1px solid rgba(10,37,64,0.1)", background: "#fff", color: "#0A2540",
            cursor: "pointer", fontSize: 18, lineHeight: 1
          }}>×</button>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 26, color: "#0A2540" }}>Schedule a Meeting</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(10,37,64,0.55)", marginTop: 6 }}>
              Availability: 9:00 AM to 11:00 PM AEST (Australia/Brisbane).
            </div>
          </div>

          {sent ? (
              <div style={{ textAlign: "center", padding: "80px 40px", background: "rgba(0,180,216,0.04)", borderRadius: 24, border: "1.5px solid rgba(0,180,216,0.15)" }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                <h3 style={{ fontSize: 28, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 12 }}>Request Sent!</h3>
                <p style={{ color: "rgba(10,37,64,0.55)", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>We will confirm your time by email.</p>
              </div>
          ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="scheduler-grid">
                  <div>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name *" style={inputStyle("name")} aria-label="Full Name" />
                    {errors.name && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{errors.name}</p>}
                  </div>
                  <div>
                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email Address *" style={inputStyle("email")} aria-label="Email Address" />
                    {errors.email && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{errors.email}</p>}
                  </div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company (Optional)" style={inputStyle()} aria-label="Company" />
                </div>
                <div style={{ marginTop: 14 }}>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Contact Number (Optional)" style={inputStyle()} aria-label="Contact Number" />
                </div>
                <div style={{ marginTop: 14 }}>
                  <button
                    type="button"
                    onClick={openPicker}
                    className="scheduler-datetime-input"
                    style={{
                      borderRadius: 12,
                      border: `1.5px solid ${errors.dateTime ? "#ef4444" : "rgba(10,37,64,0.12)"}`,
                      background: "rgba(255,255,255,0.96)",
                      boxShadow: "0 4px 16px rgba(10,37,64,0.05)",
                      padding: "12px 16px",
                      width: "100%",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      cursor: "pointer"
                    }}
                  >
                    <span>
                      {form.dateTime
                        ? dayjs(form.dateTime).format("MMMM D, YYYY · h:mm A")
                        : "Select date and time..."}
                    </span>
                    <span style={{ color: "rgba(10,37,64,0.45)" }}>📅</span>
                  </button>
                  <div style={{ marginTop: 6, fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.45)" }}>
                    Times are interpreted in the selected timezone.
                  </div>
                {errors.dateTime && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{errors.dateTime}</p>}
              </div>
              {pickerOpen && (
                <div style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 260,
                  background: "rgba(3, 8, 20, 0.65)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20
                }}
                     onClick={(e) => { if (e.target === e.currentTarget) setPickerOpen(false); }}
                >
                  <div style={{
                    width: "100%",
                    maxWidth: 520,
                    background: "linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%)",
                    borderRadius: 20,
                    border: "1px solid rgba(0,180,216,0.2)",
                    boxShadow: "0 30px 80px rgba(10,37,64,0.35)",
                    padding: 18
                  }}>
                    <ThemeProvider theme={theme}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker
                          value={tempDateTime}
                          onChange={(value) => setTempDateTime(value)}
                          minutesStep={15}
                          minTime={dayjs().hour(9).minute(0)}
                          maxTime={dayjs().hour(23).minute(0)}
                          slotProps={{
                            actionBar: { actions: [] },
                          }}
                          sx={{
                            width: "100%",
                            "& .MuiPickersLayout-contentWrapper": { width: "100%" },
                            "& .MuiPickersCalendarHeader-root": { color: "#0A2540" },
                            "& .MuiTypography-root": { fontFamily: "'DM Sans', sans-serif" },
                            "& .MuiPickersDay-root.Mui-selected": {
                              backgroundColor: "#00B4D8",
                            },
                            "& .MuiClock-pin, & .MuiClockPointer-root, & .MuiClockPointer-thumb": {
                              backgroundColor: "#00B4D8",
                              borderColor: "#00B4D8",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </ThemeProvider>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                      <button type="button" onClick={() => setPickerOpen(false)} style={{
                        padding: "10px 16px",
                        borderRadius: 10,
                        border: "1px solid rgba(10,37,64,0.15)",
                        background: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}>Cancel</button>
                      <button type="button" onClick={applyPicker} style={{
                        padding: "10px 18px",
                        borderRadius: 10,
                        border: "none",
                        background: "linear-gradient(90deg, #00B4D8, #0077B6)",
                        color: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}>Apply</button>
                    </div>
                  </div>
                </div>
              )}
                <div style={{ marginTop: 14 }}>
                  <select value={form.timezone} onChange={e => setForm({ ...form, timezone: e.target.value })} style={{ ...inputStyle(), cursor: "pointer" }} aria-label="Timezone">
                    {[
                      { value: "Australia/Brisbane", label: "Australia/Brisbane (AEST)" },
                      { value: "Australia/Sydney", label: "Australia/Sydney (AEDT/AEST)" },
                      { value: "Australia/Perth", label: "Australia/Perth (AWST)" },
                      { value: "Asia/Singapore", label: "Asia/Singapore (SGT)" },
                      { value: "Europe/London", label: "Europe/London (GMT/BST)" },
                      { value: "America/New_York", label: "America/New_York (ET)" },
                      { value: "America/Los_Angeles", label: "America/Los_Angeles (PT)" },
                      { value: "UTC", label: "UTC" },
                    ].map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div style={{ marginTop: 14 }}>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Notes (Optional)" rows={4} style={{ ...inputStyle(), resize: "vertical" }} aria-label="Notes" />
                </div>
                {submitError && (
                  <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 10 }}>
                    {submitError}
                  </p>
                )}
                <button type="submit" disabled={sending} aria-label="Schedule meeting" style={{
                  width: "100%", padding: "16px 26px", background: "linear-gradient(90deg, #00B4D8, #0077B6)",
                  color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800,
                  fontFamily: "'DM Sans', sans-serif", cursor: sending ? "not-allowed" : "pointer",
                  opacity: sending ? 0.8 : 1,
                  boxShadow: "0 0 40px rgba(0,180,216,0.4)", letterSpacing: "0.3px", transition: "transform 0.2s, box-shadow 0.2s",
                  marginTop: 16
                }}
                        onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 0 60px rgba(0,180,216,0.6)"; }}
                        onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 0 40px rgba(0,180,216,0.4)"; }}
                >{sending ? "Sending..." : "Send Request"}</button>
              </form>
          )}
        </div>
        <style>{`
          @media (max-width: 680px) { .scheduler-grid { grid-template-columns: 1fr !important; } }
          .scheduler-datetime-input {
            font-size: 14px;
            font-family: 'DM Sans', sans-serif;
            color: #0A2540;
          }
        `}</style>
      </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
      <footer style={{ background: "linear-gradient(180deg, #03045E 0%, #020B2B 100%)", padding: "72px 5% 36px", borderTop: "1px solid rgba(0,180,216,0.12)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }} className="footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: "linear-gradient(135deg, #00B4D8, #0077B6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 900, color: "#fff", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 18px rgba(0,180,216,0.4)" }}>C</div>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>Cyvera</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.75, maxWidth: 260 }}>Your end-to-end digital partner — from identity to infrastructure.</p>
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                {["in", "ig", "𝕏", "gh"].map(s => (
                    <a key={s} href="#" aria-label={`Social ${s}`} style={{
                      width: 38, height: 38, borderRadius: 9, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                      textDecoration: "none", transition: "all 0.2s"
                    }}
                       onMouseEnter={e => { e.currentTarget.style.background = "#00B4D8"; e.currentTarget.style.color = "#fff"; }}
                       onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                    >{s}</a>
                ))}
              </div>
            </div>

            {[
              { title: "Company", links: ["Home", "About", "Work", "Contact"] },
              { title: "Services", links: ["Social Media & Branding", "SEO", "Cybersecurity", "Website Development", "Custom Software"] },
            ].map(col => (
                <div key={col.title}>
                  <h4 style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 24 }}>{col.title}</h4>
                  {col.links.map(l => (
                      <a key={l} href="#" style={{ display: "block", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, textDecoration: "none", marginBottom: 14, transition: "color 0.2s" }}
                         onMouseEnter={e => e.target.style.color = "#00B4D8"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
                      >{l}</a>
                  ))}
                </div>
            ))}

            <div>
              <h4 style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 24 }}>Contact</h4>
              <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.75 }}>info@cyvera.com.au</p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.75, marginTop: 8 }}>G3/62 Didsbury St, East Brisbane, QLD 4169</p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>© 2026 Cyvera. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service"].map(l => (
                  <a key={l} href="#" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                     onMouseEnter={e => e.target.style.color = "#00B4D8"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.25)"}
                  >{l}</a>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }`}</style>
      </footer>
  );
}

// ─── ServiceDetail ────────────────────────────────────────────────────────────
function ServiceDetail({ serviceId, onBack, onSchedule }) {
  if (serviceId === "social-media") return <SocialMediaMarketing onBack={onBack} />;

  const detail = {
    seo: {
      title: "SEO That Compounds",
      subtitle: "Technical excellence plus content strategy for durable, intent-driven growth.",
      outcomes: ["Higher rankings on revenue keywords", "Clean technical foundation", "Content system that scales"],
      services: ["Technical SEO audit + fixes", "Content strategy + briefs", "On-page optimization", "Link building roadmap"],
      process: ["Audit", "Prioritize", "Execute", "Measure", "Iterate"],
      results: ["+132% organic sessions", "2.4x demo requests", "38% faster crawl efficiency"],
      pricing: ["Starter $1.5k/mo", "Growth $3k/mo", "Scale $6k/mo"],
    },
    cybersecurity: {
      title: "Security That Builds Trust",
      subtitle: "Reduce risk with proactive assessments, hardening, and continuous monitoring.",
      outcomes: ["Fewer critical vulnerabilities", "Actionable remediation plan", "Compliance-ready documentation"],
      services: ["Risk assessment", "Pen testing", "Hardening + patching", "Monitoring + incident response"],
      process: ["Assess", "Remediate", "Validate", "Monitor"],
      results: ["0 critical findings post-remediation", "42% reduction in attack surface", "24/7 monitoring setup"],
      pricing: ["Audit $4k", "Protect $2.5k/mo", "Enterprise custom"],
    },
    "website-dev": {
      title: "Websites That Convert",
      subtitle: "Performance-first marketing sites built for speed, SEO, and measurable growth.",
      outcomes: ["Higher conversion rates", "Faster page speed", "Modern, scalable design system"],
      services: ["UX + content architecture", "Design + development", "SEO + performance tuning", "Analytics + A/B testing"],
      process: ["Discover", "Design", "Build", "Launch", "Optimize"],
      results: ["2.6x conversion lift", "90+ Lighthouse scores", "42% lower bounce rate"],
      pricing: ["Launch $8k", "Growth $15k", "Scale custom"],
    },
    "custom-software": {
      title: "Custom Software Systems",
      subtitle: "Distributed systems, apps, and platforms engineered for reliability and growth.",
      outcomes: ["Faster release cycles", "Lower defect rates", "Scalable architecture"],
      services: ["Product discovery", "Design + build", "QA automation", "DevOps + monitoring"],
      process: ["Discover", "Design", "Build", "Launch", "Optimize"],
      results: ["3x faster load times", "40% fewer bugs", "2-week release cadence"],
      pricing: ["MVP $18k", "Growth $35k", "Scale custom"],
    },
  }[serviceId];

  if (!detail) return null;

  return (
      <div>
        <section id="service-overview" style={{ padding: "140px 5% 80px", background: "radial-gradient(1200px 700px at 10% -10%, rgba(0,180,216,0.45), transparent 60%), linear-gradient(160deg, #03045E 0%, #0A2540 55%, #023E8A 100%)", color: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <button type="button" onClick={onBack} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer", marginBottom: 20 }}>← Back to Home</button>
            <h1 style={{ fontSize: "clamp(34px, 5vw, 64px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, marginBottom: 16, letterSpacing: "-1px" }}>{detail.title}</h1>
            <p style={{ fontSize: 18, fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", maxWidth: 640, lineHeight: 1.6 }}>{detail.subtitle}</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
              <button type="button" onClick={() => onSchedule?.()} style={{ background: "linear-gradient(90deg, #00B4D8, #0077B6)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 32px rgba(0,180,216,0.5)", border: "none", cursor: "pointer" }}>Schedule a Meeting</button>
              <a href="#service-services" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Explore Services</a>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
              {detail.outcomes.map(o => (
                  <span key={o} style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{o}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="service-problem" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #F7FAFC 0%, #ECF4FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2 style={{ fontSize: 36, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 20 }}>Common Challenges We Solve</h2>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {["Unclear priorities", "Inconsistent execution", "Lack of measurement", "Slow iteration cycles"].map(item => (
                  <div key={item} style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)",
                    borderRadius: 20, padding: 22, border: "1.5px solid rgba(10,37,64,0.07)",
                    boxShadow: "0 8px 28px rgba(10,37,64,0.08)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s"
                  }}
                       onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 18px 44px rgba(0,180,216,0.18)"; e.currentTarget.style.borderColor = "rgba(0,180,216,0.5)"; }}
                       onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(10,37,64,0.08)"; e.currentTarget.style.borderColor = "rgba(10,37,64,0.07)"; }}
                  >
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", marginBottom: 8 }}>{item}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.55)", fontSize: 14, lineHeight: 1.6 }}>We replace guesswork with a structured plan, clear deliverables, and measurable outcomes.</div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <section id="service-services" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2 style={{ fontSize: 34, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24 }}>Core Services</h2>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
              {detail.services.map(s => (
                  <div key={s} style={{
                    borderRadius: 20, padding: 22,
                    background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)",
                    border: "1.5px solid rgba(10,37,64,0.07)",
                    boxShadow: "0 8px 28px rgba(10,37,64,0.08)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s"
                  }}
                       onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 18px 44px rgba(0,180,216,0.18)"; e.currentTarget.style.borderColor = "rgba(0,180,216,0.5)"; }}
                       onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(10,37,64,0.08)"; e.currentTarget.style.borderColor = "rgba(10,37,64,0.07)"; }}
                  >
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", marginBottom: 8 }}>{s}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.55)", fontSize: 14, lineHeight: 1.6 }}>Outcomes-focused execution with weekly reporting and clear next steps.</div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <section id="service-method" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #F6F9FF 0%, #EDF3FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2 style={{ fontSize: 34, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24 }}>Our Method</h2>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {detail.process.map((p, i) => (
                  <div key={p} style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)",
                    borderRadius: 20, padding: 20, border: "1.5px solid rgba(10,37,64,0.07)",
                    boxShadow: "0 8px 28px rgba(10,37,64,0.08)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s"
                  }}
                       onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 18px 44px rgba(0,180,216,0.18)"; e.currentTarget.style.borderColor = "rgba(0,180,216,0.5)"; }}
                       onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(10,37,64,0.08)"; e.currentTarget.style.borderColor = "rgba(10,37,64,0.07)"; }}
                  >
                    <div style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "#00B4D8", fontWeight: 700, letterSpacing: "1px", marginBottom: 6 }}>STEP {String(i + 1).padStart(2, "0")}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", marginBottom: 6 }}>{p}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.55)", fontSize: 13, lineHeight: 1.6 }}>Clear deliverables and owners at every stage.</div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <section id="service-results" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #0A2540 0%, #071B39 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2 style={{ fontSize: 34, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 24 }}>Results Snapshot</h2>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              {detail.results.map(r => (
                  <div key={r} style={{
                    padding: 22, borderRadius: 18,
                    background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                    border: "1px solid rgba(0,180,216,0.2)", boxShadow: "0 10px 28px rgba(0,0,0,0.25)"
                  }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#00B4D8", fontSize: 20, marginBottom: 6 }}>{r}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Representative outcomes from recent engagements.</div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <section id="service-pricing" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2 style={{ fontSize: 34, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24 }}>Pricing</h2>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {detail.pricing.map(p => (
                  <div key={p} style={{
                    borderRadius: 20, padding: 22,
                    background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)",
                    border: "1.5px solid rgba(10,37,64,0.07)",
                    boxShadow: "0 8px 28px rgba(10,37,64,0.08)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s"
                  }}
                       onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 18px 44px rgba(0,180,216,0.18)"; e.currentTarget.style.borderColor = "rgba(0,180,216,0.5)"; }}
                       onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(10,37,64,0.08)"; e.currentTarget.style.borderColor = "rgba(10,37,64,0.07)"; }}
                  >
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>{p}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.55)", fontSize: 13, lineHeight: 1.6 }}>Ideal for teams that need clear scope, accountability, and measurable results.</div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </div>
  );
}

function SocialMediaMarketing({ onBack }) {
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
        ctx.fillStyle = `rgba(0,180,216,${p.opacity})`;
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
            ctx.strokeStyle = `rgba(0,180,216,${0.08 * (1 - d / 95)})`;
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
      <div>
        <section id="service-overview" style={{ padding: "140px 5% 80px", background: "radial-gradient(1200px 700px at 10% -10%, rgba(0,180,216,0.45), transparent 60%), radial-gradient(900px 600px at 90% 20%, rgba(72,202,228,0.25), transparent 55%), linear-gradient(160deg, #03045E 0%, #0A2540 48%, #023E8A 100%)", color: "#fff", position: "relative", overflow: "hidden" }}>
          <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }} />
          {[
            { w: 650, h: 650, top: "-28%", left: "-8%", c: "rgba(0,180,216,0.14)", a: 10 },
            { w: 460, h: 460, top: "58%", left: "62%", c: "rgba(0,119,182,0.18)", a: 13 },
            { w: 320, h: 320, top: "22%", left: "42%", c: "rgba(72,202,228,0.1)", a: 8 },
            { w: 240, h: 240, top: "72%", left: "12%", c: "rgba(0,180,216,0.08)", a: 11 },
          ].map((b, i) => (
              <div key={i} style={{
                position: "absolute", width: b.w, height: b.h, borderRadius: "50%",
                background: `radial-gradient(circle, ${b.c}, transparent 70%)`,
                top: b.top, left: b.left, zIndex: 1,
                animation: `blob${i} ${b.a}s ease-in-out infinite alternate`,
              }} />
          ))}
          <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 3 }}>
            <Reveal>
              <button type="button" onClick={onBack} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer", marginBottom: 20 }}>← Back to Home</button>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 style={{ fontSize: "clamp(36px, 5.5vw, 70px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, marginBottom: 16, letterSpacing: "-1px" }}>Turn Attention Into Revenue</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "clamp(16px, 2vw, 20px)", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", maxWidth: 620, lineHeight: 1.7 }}>
                Data-driven social media growth for modern brands. We build the strategy, creative system, and performance engine that converts attention into pipeline.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
                <button type="button" onClick={() => onSchedule?.()} style={{ background: "linear-gradient(90deg, #00B4D8, #0077B6)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 32px rgba(0,180,216,0.5)", border: "none", cursor: "pointer" }}>Schedule a Meeting</button>
                <a href="#service-services" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Explore Services</a>
                <a href="#service-method" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>View Approach</a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
                {["Positioning-first strategy", "Performance creative testing", "Weekly reporting", "Founder-led oversight"].map(item => (
                    <span key={item} style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="service-problem" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #F7FAFC 0%, #ECF4FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ marginBottom: 40, textAlign: "center" }}>
                <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Problem to Solution</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginTop: 12 }}>We Fix the Gaps That Stall Growth</h2>
              </div>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              {[
                { problem: "Low engagement and weak brand recall", solution: "Positioning clarity, content pillars, and story-driven creative." },
                { problem: "Inconsistent visual and messaging standards", solution: "Brand system + content templates for repeatable execution." },
                { problem: "Poor ROAS and ad fatigue", solution: "Full-funnel Meta and TikTok ads with A/B creative testing." },
                { problem: "No clear strategy or reporting cadence", solution: "Monthly strategy, weekly reporting, and KPI dashboards." },
              ].map((item, i) => (
                  <Reveal key={item.problem} delay={i * 0.08}>
                    <div style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)",
                      borderRadius: 20, padding: 26, border: "1.5px solid rgba(10,37,64,0.07)",
                      boxShadow: "0 8px 28px rgba(10,37,64,0.08)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s"
                    }}
                         onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 18px 44px rgba(0,180,216,0.18)"; e.currentTarget.style.borderColor = "rgba(0,180,216,0.5)"; }}
                         onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(10,37,64,0.08)"; e.currentTarget.style.borderColor = "rgba(10,37,64,0.07)"; }}
                    >
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", marginBottom: 6 }}>Problem</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.6)", fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{item.problem}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#00B4D8", marginBottom: 6 }}>Solution</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.6)", fontSize: 14, lineHeight: 1.6 }}>{item.solution}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-services" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Services</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginTop: 10 }}>Structured, Tiered Services</h2>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.55)", maxWidth: 520, margin: "12px auto 0" }}>
                  Each service lists scope, outcomes, and platforms so you know exactly what you are getting.
                </div>
              </div>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { name: "Social Media Strategy", inc: "Positioning, content pillars, channel mix", out: "Clarity on what to say and where", tools: "Notion, GA4, Meta Insights" },
                { name: "Content Creation", inc: "Creative direction, production, editing", out: "Consistent, high-quality content", tools: "Adobe Suite, Canva" },
                { name: "Paid Ads Management", inc: "Campaign setup, A/B testing, optimization", out: "Improved ROAS and CPL", tools: "Meta Ads, TikTok Ads" },
                { name: "Influencer Campaigns", inc: "Creator sourcing, briefs, contracts", out: "Earned trust and reach", tools: "CreatorIQ, GRIN" },
                { name: "Community Management", inc: "Engagement workflows, moderation", out: "Higher retention and loyalty", tools: "Sprout Social" },
                { name: "Analytics & Reporting", inc: "Dashboards, KPIs, insights", out: "Transparent growth reporting", tools: "Looker Studio" },
              ].map((item, i) => (
                  <Reveal key={item.name} delay={i * 0.08}>
                    <div style={{
                      borderRadius: 20, padding: 22,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)",
                      border: "1.5px solid rgba(10,37,64,0.07)",
                      boxShadow: "0 8px 28px rgba(10,37,64,0.08)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s"
                    }}
                         onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 18px 44px rgba(0,180,216,0.18)"; e.currentTarget.style.borderColor = "rgba(0,180,216,0.5)"; }}
                         onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(10,37,64,0.08)"; e.currentTarget.style.borderColor = "rgba(10,37,64,0.07)"; }}
                    >
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 10 }}>Includes: {item.inc}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 10 }}>Outcome: {item.out}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(10,37,64,0.5)" }}>Tools: {item.tools}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-method" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #F6F9FF 0%, #EDF3FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ marginBottom: 36, textAlign: "center" }}>
                <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Framework</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginTop: 12 }}>The Momentum Framework</h2>
              </div>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {[
                { step: "Discover", desc: "Audit channels, audience, and competitors to identify leverage." },
                { step: "Strategize", desc: "Define positioning, content pillars, and KPIs." },
                { step: "Create", desc: "Design a repeatable content system and creative library." },
                { step: "Launch", desc: "Ship campaigns across priority channels with structured testing." },
                { step: "Optimize", desc: "Weekly reporting, iteration, and performance improvements." },
                { step: "Scale", desc: "Double down on what works and expand to new channels." },
              ].map((item, i) => (
                  <Reveal key={item.step} delay={i * 0.08}>
                    <div style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)",
                      borderRadius: 20, padding: 22, border: "1.5px solid rgba(10,37,64,0.07)",
                      boxShadow: "0 8px 28px rgba(10,37,64,0.08)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s"
                    }}
                         onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 18px 44px rgba(0,180,216,0.18)"; e.currentTarget.style.borderColor = "rgba(0,180,216,0.5)"; }}
                         onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(10,37,64,0.08)"; e.currentTarget.style.borderColor = "rgba(10,37,64,0.07)"; }}
                    >
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>{item.step}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.6)", fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-cases" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #EFF5FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Case Studies</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginTop: 10 }}>Proof of Profit, Not Just Posts</h2>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.6)", maxWidth: 520, margin: "12px auto 0" }}>
                  We show revenue impact, not vanity metrics. Each engagement ties creative output to pipeline growth.
                </div>
              </div>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { name: "DTC Launch Sprint", tag: "E‑commerce", uplift: "+$180k revenue", metric: "3.2x ROAS", timeline: "90 days", problem: "Low engagement on launch posts", strategy: "Positioning refresh + creator collabs + paid boosts" },
                { name: "SaaS Waitlist Engine", tag: "B2B SaaS", uplift: "+420 leads", metric: "2.8x CTR", timeline: "60 days", problem: "Low CTR + unclear positioning", strategy: "New creative angles + offer testing + funnel rebuild" },
                { name: "Creator Flywheel", tag: "Lifestyle", uplift: "+$74k pipeline", metric: "32% lead conversion", timeline: "75 days", problem: "Weak trust signals", strategy: "Micro‑influencer rollout + UGC system" },
              ].map((item, i) => (
                  <Reveal key={item.name} delay={i * 0.08}>
                    <div style={{
                      borderRadius: 20, padding: 24,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(246,250,255,0.92) 100%)",
                      border: "1.5px solid rgba(10,37,64,0.07)",
                      boxShadow: "0 12px 32px rgba(10,37,64,0.08)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s"
                    }}
                         onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 18px 44px rgba(0,180,216,0.18)"; e.currentTarget.style.borderColor = "rgba(0,180,216,0.5)"; }}
                         onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(10,37,64,0.08)"; e.currentTarget.style.borderColor = "rgba(10,37,64,0.07)"; }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540" }}>{item.name}</div>
                        <span style={{ padding: "6px 10px", borderRadius: 999, background: "rgba(0,180,216,0.12)", color: "#0077B6", fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>{item.tag}</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                        <div style={{ borderRadius: 12, background: "rgba(0,180,216,0.08)", padding: 12 }}>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 20, color: "#00B4D8", marginBottom: 4 }}>{item.uplift}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(10,37,64,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>Revenue Impact</div>
                        </div>
                        <div style={{ borderRadius: 12, background: "rgba(3,4,94,0.08)", padding: 12 }}>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 20, color: "#023E8A", marginBottom: 4 }}>{item.metric}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(10,37,64,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>Efficiency</div>
                        </div>
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(10,37,64,0.55)", marginBottom: 12 }}>
                        Timeline: <span style={{ fontWeight: 700, color: "#0A2540" }}>{item.timeline}</span>
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 8 }}>Problem: {item.problem}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)" }}>Strategy: {item.strategy}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-results" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #0A2540 0%, #071B39 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 24, textAlign: "center" }}>Results Dashboard</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[
                { num: "+180%", label: "Engagement Growth" },
                { num: "2.6x", label: "CTR Improvement" },
                { num: "34%", label: "Follower Growth" },
                { num: "3.2x", label: "ROAS Lift" },
              ].map((item, i) => (
                  <Reveal key={item.label} delay={i * 0.08}>
                    <div style={{ padding: 22, borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", textAlign: "center" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 28, color: "#00B4D8", marginBottom: 8 }}>{item.num}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>{item.label}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-pricing" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24, textAlign: "center" }}>Transparent Pricing</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { name: "Starter", price: "From $1.5k/mo", who: "Early-stage brands", items: ["Strategy + content plan", "8 posts/mo", "Monthly reporting"] },
                { name: "Growth", price: "From $3.5k/mo", who: "Scaling teams", items: ["Full content production", "Paid ads management", "Weekly reporting"] },
                { name: "Scale", price: "From $7k/mo", who: "Multi-channel brands", items: ["Influencers + UGC", "Advanced testing", "Dedicated strategist"] },
              ].map((item, idx) => (
                  <Reveal key={item.name} delay={idx * 0.08}>
                    <div style={{
                      borderRadius: 20, padding: 26,
                      background: idx === 1 ? "linear-gradient(160deg, #0A2540, #023E8A)" : "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)",
                      border: idx === 1 ? "1.5px solid rgba(0,180,216,0.4)" : "1.5px solid rgba(10,37,64,0.07)",
                      boxShadow: idx === 1 ? "0 20px 50px rgba(0,180,216,0.25)" : "0 10px 34px rgba(10,37,64,0.08)",
                      transition: "transform 0.25s, box-shadow 0.25s"
                    }}
                         onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; }}
                         onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}
                    >
                      {idx === 1 && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#00B4D8", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>MOST POPULAR</div>}
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: idx === 1 ? "#fff" : "#0A2540", marginBottom: 6, fontSize: 18 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 800, color: "#00B4D8", marginBottom: 10 }}>{item.price}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: idx === 1 ? "rgba(255,255,255,0.6)" : "rgba(10,37,64,0.6)", marginBottom: 12 }}>Ideal for: {item.who}</div>
                      <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: idx === 1 ? "rgba(255,255,255,0.7)" : "rgba(10,37,64,0.6)", lineHeight: 1.7 }}>
                        {item.items.map(i => <li key={i}>{i}</li>)}
                      </ul>
                      <button type="button" onClick={() => onSchedule?.()} style={{ display: "inline-block", marginTop: 16, color: idx === 1 ? "#00B4D8" : "#0A2540", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Schedule a Meeting →</button>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-about" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #F7FAFC 0%, #EEF4FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, alignItems: "center" }} className="service-cols">
            <Reveal>
              <div>
                <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Founder-Led</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginTop: 12 }}>Built by Strategists, Not Just Executors</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.6)", lineHeight: 1.7, marginTop: 12 }}>
                  We are a founder-led team with a bias for strategy. Every engagement starts with positioning and ends with measurable revenue impact.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #F6FAFF 100%)",
                borderRadius: 20, padding: 24, border: "1px solid rgba(10,37,64,0.08)",
                boxShadow: "0 16px 40px rgba(10,37,64,0.08)"
              }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>Why teams choose us</div>
                <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", lineHeight: 1.7 }}>
                  {["Clear positioning and messaging", "Documented strategy and process", "Accountability through reporting", "Fast execution cycles"].map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="service-tools" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 20, textAlign: "center" }}>Tech & Tools Stack</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {["Meta Business Suite", "GA4", "TikTok Ads Manager", "SEMrush", "Canva", "Adobe Suite", "HubSpot", "Sprout Social"].map(t => (
                    <span key={t} style={{ padding: "10px 18px", borderRadius: 999, background: "rgba(0,180,216,0.08)", border: "1px solid rgba(0,180,216,0.2)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.7)", fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="service-testimonials" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #0A2540 0%, #071B39 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 24, textAlign: "center" }}>Early Client Feedback</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {[
                { name: "Alicia M., DTC Founder", quote: "They gave us a real strategy and execution system. Engagement jumped in weeks." },
                { name: "Rahul K., SaaS Marketer", quote: "The reporting cadence and creative testing were what we needed to scale." },
              ].map((item, i) => (
                  <Reveal key={item.name} delay={i * 0.08}>
                    <div style={{ borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: 16, fontSize: 15, fontStyle: "italic" }}>"{item.quote}"</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#00B4D8" }}>{item.name}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-insights" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 20, textAlign: "center" }}>Insights & Education</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { title: "How to build a content system that scales", tag: "Strategy" },
                { title: "Creative testing frameworks for Meta Ads", tag: "Paid Media" },
                { title: "What to measure in the first 30 days", tag: "Analytics" },
              ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div style={{
                      borderRadius: 20, padding: 22,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)",
                      border: "1.5px solid rgba(10,37,64,0.07)",
                      boxShadow: "0 8px 28px rgba(10,37,64,0.08)", cursor: "pointer",
                      transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s"
                    }}
                         onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 18px 44px rgba(0,180,216,0.18)"; e.currentTarget.style.borderColor = "rgba(0,180,216,0.5)"; }}
                         onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(10,37,64,0.08)"; e.currentTarget.style.borderColor = "rgba(10,37,64,0.07)"; }}
                    >
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#00B4D8", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>{item.tag}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", lineHeight: 1.6 }}>{item.title}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "70px 5%", background: "linear-gradient(90deg, #03045E, #0A2540)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,180,216,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
          <Reveal>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, position: "relative", zIndex: 2 }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.5px" }}>Ready to build a real growth engine?</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 15 }}>Book a consultation and we will outline a 90-day plan at no cost.</p>
              </div>
              <button type="button" onClick={() => onSchedule?.()} style={{ background: "linear-gradient(90deg, #00B4D8, #0077B6)", color: "#fff", textDecoration: "none", padding: "16px 32px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 32px rgba(0,180,216,0.5)", flexShrink: 0, border: "none", cursor: "pointer" }}>Schedule a Meeting →</button>
            </div>
          </Reveal>
        </section>

        <Contact />
      </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function CyveraPortfolio() {
  const [view, setView] = useState("home");
  const isDetail = view !== "home";
  const pendingHash = useRef("");
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  // ── Dynamic SEO: update <head> meta whenever the view changes ──
  useEffect(() => {
    const config = SEO_CONFIGS[view] || SEO_CONFIGS.home;
    useSEO(config);
  }, [view]);

  useEffect(() => {
    if (view !== "home") { window.scrollTo(0, 0); return; }
    if (pendingHash.current) {
      const nextHash = pendingHash.current;
      pendingHash.current = "";
      requestAnimationFrame(() => { window.location.hash = nextHash; });
      return;
    }
    window.scrollTo(0, 0);
  }, [view]);

  const goHome = (hash) => {
    if (hash) pendingHash.current = hash;
    setView("home");
  };

  const openScheduler = () => setSchedulerOpen(true);
  const closeScheduler = () => setSchedulerOpen(false);

  return (
      <div>
        <Navbar isDetail={isDetail} onHome={goHome} onSchedule={openScheduler} />
        <main>
          {view === "home" ? (
              <>
                <Hero onSchedule={openScheduler} />
                <MarqueeStrip />
                <Services onSelect={(id) => setView(id)} />
                <StatsStrip />
                <WhyCyvera />
                <Portfolio />
                <Process />
                <Testimonials />
                <CTABanner onSchedule={openScheduler} />
                <Contact />
              </>
          ) : (
              <ServiceDetail serviceId={view} onBack={() => setView("home")} onSchedule={openScheduler} />
          )}
        </main>
        <SchedulerModal open={schedulerOpen} onClose={closeScheduler} />
        <Footer />
      </div>
  );
}
