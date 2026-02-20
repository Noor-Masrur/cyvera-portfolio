import { useState, useEffect, useRef } from "react";

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

// ─── Animated Section Wrapper ─────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  { id: "social-media", icon: "📱", name: "Social Media & Branding", desc: "Positioning, content, and performance systems that turn attention into revenue.", color: "#00B4D8" },
  { id: "seo", icon: "🔍", name: "SEO", desc: "Technical and content SEO that compounds visibility and pipeline.", color: "#0096C7" },
  { id: "cybersecurity", icon: "🔐", name: "Cybersecurity", desc: "Risk assessments, hardening, and monitoring for resilient operations.", color: "#0077B6" },
  { id: "software", icon: "💻", name: "Software Development", desc: "Ship reliable products fast with senior engineering and QA.", color: "#023E8A" },
];

const stats = [
  { num: "50+", label: "Clients Served" },
  { num: "98%", label: "Client Retention" },
  { num: "100%", label: "Security-First" },
  { num: "4x", label: "Avg. ROI Delivered" },
];

const differentiators = [
  "End-to-end capabilities under one roof — no handoffs, no excuses",
  "Security-first mindset baked into every product and campaign",
  "Transparent reporting and strategy, always",
  "Dedicated team that moves as fast as your ambitions",
];

const projects = [
  { category: "Branding + SEO", name: "NovaPay Rebrand", metric: "+140% Organic Traffic", tags: ["SEO", "Social Media"], gradient: "linear-gradient(135deg, #0A2540 0%, #00B4D8 100%)" },
  { category: "Cybersecurity", name: "ShieldNet Audit", metric: "0 Breaches Post-Deploy", tags: ["Cybersecurity"], gradient: "linear-gradient(135deg, #023E8A 0%, #0096C7 100%)" },
  { category: "Software Dev", name: "Orion SaaS Platform", metric: "3× Faster Load Times", tags: ["Software"], gradient: "linear-gradient(135deg, #03045E 0%, #48CAE4 100%)" },
];

const filterTabs = ["All", "Social Media", "SEO", "Cybersecurity", "Software"];

const steps = [
  { n: "01", title: "Discover", desc: "Deep-dive into your goals, market, and gaps." },
  { n: "02", title: "Strategize", desc: "Build a precision roadmap tailored to your ambition." },
  { n: "03", title: "Execute", desc: "Deliver with craft, speed, and zero guesswork." },
  { n: "04", title: "Optimize", desc: "Measure, learn, iterate — and keep winning." },
];

const testimonials = [
  { name: "Aria Chen", role: "CEO, NovaPay", quote: "Cyvera didn't just redesign our brand — they transformed how our customers perceive us. The SEO results alone paid back our investment 10×." },
  { name: "Marcus Webb", role: "CTO, ShieldNet", quote: "The most thorough cybersecurity audit we've had. They found vulnerabilities our previous vendor missed for two years. Trust them completely." },
  { name: "Sofia Reyes", role: "Founder, Orion Labs", quote: "Our SaaS product went from MVP to launch-ready in 90 days. The team's technical depth is unmatched, and they actually care about your success." },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ isDetail = false, onHome }) {
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
      background: scrolled ? "rgba(10,37,64,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,180,216,0.15)" : "none",
      transition: "all 0.4s ease", padding: "0 5%"
    }}>
      <nav style={{ maxWidth: 1200, margin: "0 auto", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "linear-gradient(135deg, #00B4D8, #0077B6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 900, color: "#fff", fontFamily: "'DM Sans', sans-serif"
          }}>C</div>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.5px" }}>
            Cyvera
          </span>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} onClick={(e) => handleNavClick(e, l.href)} style={{
              color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 14,
              fontWeight: 500, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.3px",
              transition: "color 0.2s"
            }}
              onMouseEnter={e => e.target.style.color = "#00B4D8"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.8)"}
            >{l.label}</a>
          ))}
          <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} style={{
            background: "linear-gradient(90deg, #00B4D8, #0077B6)",
            color: "#fff", textDecoration: "none", padding: "10px 22px",
            borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.3px", boxShadow: "0 4px 16px rgba(0,180,216,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 24px rgba(0,180,216,0.5)"; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 4px 16px rgba(0,180,216,0.35)"; }}
          >Book a Consultation</a>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{
          display: "none", background: "none", border: "none", color: "#fff",
          fontSize: 24, cursor: "pointer"
        }} className="mobile-menu-btn">☰</button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: "rgba(10,37,64,0.97)", backdropFilter: "blur(20px)",
          padding: "20px 5%", borderBottom: "1px solid rgba(0,180,216,0.15)"
        }}>
          {navLinks.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => { setMenuOpen(false); handleNavClick(e, l.href); }}
              style={{
              display: "block", color: "rgba(255,255,255,0.85)", textDecoration: "none",
              padding: "12px 0", fontSize: 16, fontFamily: "'DM Sans', sans-serif",
              borderBottom: "1px solid rgba(255,255,255,0.08)"
            }}>{l.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');
        @media (max-width: 1000px) {
          .service-grid { grid-template-columns: 1fr !important; }
          .service-cols { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #ffffff; overflow-x: hidden; }
      `}</style>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: "linear-gradient(160deg, #03045E 0%, #0A2540 50%, #023E8A 100%)",
      position: "relative", overflow: "hidden", padding: "120px 5% 80px"
    }}>
      {/* Animated blobs */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden"
      }}>
        {[
          { w: 600, h: 600, top: "-20%", left: "-10%", color: "rgba(0,180,216,0.12)" },
          { w: 400, h: 400, top: "60%", left: "70%", color: "rgba(0,119,182,0.15)" },
          { w: 300, h: 300, top: "30%", left: "50%", color: "rgba(72,202,228,0.08)" },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute", width: b.w, height: b.h, borderRadius: "50%",
            background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
            top: b.top, left: b.left,
            animation: `blob${i} ${8 + i * 2}s ease-in-out infinite alternate`,
          }} />
        ))}
      </div>

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,180,216,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.05) 1px, transparent 1px)",
        backgroundSize: "60px 60px", pointerEvents: "none"
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px",
          background: "rgba(0,180,216,0.12)", border: "1px solid rgba(0,180,216,0.3)",
          borderRadius: 100, marginBottom: 32, backdropFilter: "blur(8px)"
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00B4D8", display: "inline-block", boxShadow: "0 0 8px #00B4D8" }} />
          <span style={{ color: "#00B4D8", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
            End-to-End Digital Agency
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(36px, 5.5vw, 72px)", fontFamily: "'DM Serif Display', serif",
          fontWeight: 400, color: "#ffffff", lineHeight: 1.1, marginBottom: 24,
          maxWidth: 800, letterSpacing: "-1px"
        }}>
          We Build Brands, Rank Websites, Secure Systems{" "}
          <span style={{ color: "#00B4D8", fontStyle: "italic" }}>& Ship Software</span>
        </h1>

        <p style={{
          fontSize: "clamp(16px, 1.8vw, 20px)", color: "rgba(255,255,255,0.65)",
          fontFamily: "'DM Sans', sans-serif", maxWidth: 560, lineHeight: 1.7, marginBottom: 40
        }}>
          Cyvera is your end-to-end digital partner — from identity to infrastructure.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
          <a href="#contact" style={{
            background: "linear-gradient(90deg, #00B4D8, #0077B6)", color: "#fff",
            textDecoration: "none", padding: "16px 32px", borderRadius: 10,
            fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 4px 24px rgba(0,180,216,0.4)", letterSpacing: "0.3px",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(0,180,216,0.55)"; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 4px 24px rgba(0,180,216,0.4)"; }}
          >Book a Consultation</a>
          <a href="#work" style={{
            background: "transparent", color: "#fff", textDecoration: "none",
            padding: "16px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif", border: "1.5px solid rgba(255,255,255,0.3)",
            letterSpacing: "0.3px", transition: "border-color 0.2s, background 0.2s"
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#00B4D8"; e.target.style.background = "rgba(0,180,216,0.08)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.3)"; e.target.style.background = "transparent"; }}
          >View Our Work</a>
        </div>

        {/* Trust chips */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["✦ 50+ Projects Delivered", "✦ Security-First Approach", "✦ Full-Stack Expertise"].map(c => (
            <span key={c} style={{
              padding: "8px 18px", background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100,
              color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500, letterSpacing: "0.5px", backdropFilter: "blur(4px)"
            }}>{c}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blob0 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,60px) scale(1.1); } }
        @keyframes blob1 { from { transform: translate(0,0) scale(1); } to { transform: translate(-60px,30px) scale(0.9); } }
        @keyframes blob2 { from { transform: translate(0,0) scale(1); } to { transform: translate(30px,-40px) scale(1.15); } }
      `}</style>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services({ onSelect }) {
  return (
    <section id="services" style={{ padding: "100px 5%", background: "#F0F4F8" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Capabilities</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginTop: 12, letterSpacing: "-1px" }}>What We Do</h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <ServiceCard s={s} onSelect={onSelect} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onSelect?.(s.id)}
      style={{
        background: "#fff", borderRadius: 16, padding: "36px 32px",
        border: `1.5px solid ${hov ? "#00B4D8" : "rgba(10,37,64,0.08)"}`,
        boxShadow: hov ? "0 8px 40px rgba(0,180,216,0.18)" : "0 2px 16px rgba(10,37,64,0.06)",
        transition: "all 0.3s ease", cursor: "pointer",
        textAlign: "left", width: "100%", borderStyle: "solid"
      }}
    >
      <div style={{
        fontSize: 36, marginBottom: 20,
        transform: hov ? "scale(1.15) rotate(-5deg)" : "scale(1)",
        transition: "transform 0.3s ease", display: "inline-block"
      }}>{s.icon}</div>
      <h3 style={{ fontSize: 18, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 12 }}>{s.name}</h3>
      <p style={{ fontSize: 14, color: "rgba(10,37,64,0.6)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
      <span style={{
        color: hov ? "#00B4D8" : "rgba(10,37,64,0.4)", fontFamily: "'DM Sans', sans-serif",
        fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: "0.5px",
        display: "inline-flex", alignItems: "center", gap: 6, transition: "color 0.2s"
      }}>Learn More <span style={{ fontSize: 16 }}>→</span></span>
    </button>
  );
}

function ServiceDetail({ serviceId, onBack }) {
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
    software: {
      title: "Software Built to Scale",
      subtitle: "Senior engineering, modern stacks, and QA to ship reliable products fast.",
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
      <section id="service-overview" style={{ padding: "140px 5% 80px", background: "linear-gradient(160deg, #03045E 0%, #0A2540 55%, #023E8A 100%)", color: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <button type="button" onClick={onBack} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer", marginBottom: 20 }}>← Back to Home</button>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 64px)", fontFamily: "'DM Serif Display', serif", fontWeight: 400, marginBottom: 16 }}>{detail.title}</h1>
          <p style={{ fontSize: 18, fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", maxWidth: 640, lineHeight: 1.6 }}>{detail.subtitle}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
            <a href="#contact" style={{ background: "linear-gradient(90deg, #00B4D8, #0077B6)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 20px rgba(0,180,216,0.45)" }}>Book a Consultation</a>
            <a href="#service-services" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Explore Services</a>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            {detail.outcomes.map(o => (
              <span key={o} style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{o}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="service-problem" style={{ padding: "90px 5%", background: "#F0F4F8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginBottom: 20 }}>Common Challenges We Solve</h2>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {["Unclear priorities", "Inconsistent execution", "Lack of measurement", "Slow iteration cycles"].map(item => (
              <div key={item} style={{ background: "#fff", borderRadius: 14, padding: 22, border: "1px solid rgba(10,37,64,0.08)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", marginBottom: 8 }}>{item}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.55)", fontSize: 14, lineHeight: 1.6 }}>We replace guesswork with a structured plan, clear deliverables, and measurable outcomes.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-services" style={{ padding: "90px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginBottom: 24 }}>Core Services</h2>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {detail.services.map(s => (
              <div key={s} style={{ border: "1px solid rgba(10,37,64,0.08)", borderRadius: 14, padding: 22 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", marginBottom: 8 }}>{s}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.55)", fontSize: 14, lineHeight: 1.6 }}>Outcomes-focused execution with weekly reporting and clear next steps.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-method" style={{ padding: "90px 5%", background: "#F7FAFC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginBottom: 24 }}>Our Method</h2>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {detail.process.map((p, i) => (
              <div key={p} style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid rgba(10,37,64,0.08)" }}>
                <div style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "#00B4D8", fontWeight: 700, letterSpacing: "1px", marginBottom: 6 }}>STEP {String(i + 1).padStart(2, "0")}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", marginBottom: 6 }}>{p}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.55)", fontSize: 13, lineHeight: 1.6 }}>Clear deliverables and owners at every stage.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-results" style={{ padding: "90px 5%", background: "#0A2540" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, fontFamily: "'DM Serif Display', serif", color: "#fff", marginBottom: 24 }}>Results Snapshot</h2>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {detail.results.map(r => (
              <div key={r} style={{ padding: 22, borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#00B4D8", fontSize: 20, marginBottom: 6 }}>{r}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Representative outcomes from recent engagements.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-pricing" style={{ padding: "90px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginBottom: 24 }}>Pricing</h2>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {detail.pricing.map(p => (
              <div key={p} style={{ border: "1px solid rgba(10,37,64,0.1)", borderRadius: 14, padding: 22 }}>
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
  return (
    <div>
      <section id="service-overview" style={{ padding: "140px 5% 80px", background: "linear-gradient(155deg, #03045E 0%, #0A2540 52%, #023E8A 100%)", color: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <button type="button" onClick={onBack} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer", marginBottom: 20 }}>← Back to Home</button>
          <h1 style={{ fontSize: "clamp(36px, 5.5vw, 70px)", fontFamily: "'DM Serif Display', serif", fontWeight: 400, marginBottom: 16 }}>Turn Attention Into Revenue</h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", maxWidth: 620, lineHeight: 1.7 }}>
            Data-driven social media growth for modern brands. We build the strategy, creative system, and performance engine that converts attention into pipeline.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
            <a href="#contact" style={{ background: "linear-gradient(90deg, #00B4D8, #0077B6)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 20px rgba(0,180,216,0.45)" }}>Book a Consultation</a>
            <a href="#service-services" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Explore Services</a>
            <a href="#service-method" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>View Approach</a>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
            {["Positioning-first strategy", "Performance creative testing", "Weekly reporting", "Founder-led oversight"].map(item => (
              <span key={item} style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="service-problem" style={{ padding: "90px 5%", background: "#F0F4F8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Problem -> Solution</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginTop: 12 }}>We Fix the Gaps That Stall Growth</h2>
          </div>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {[
              { problem: "Low engagement and weak brand recall", solution: "Positioning clarity, content pillars, and story-driven creative." },
              { problem: "Inconsistent visual and messaging standards", solution: "Brand system + content templates for repeatable execution." },
              { problem: "Poor ROAS and ad fatigue", solution: "Full-funnel Meta and TikTok ads with A/B creative testing." },
              { problem: "No clear strategy or reporting cadence", solution: "Monthly strategy, weekly reporting, and KPI dashboards." },
            ].map(item => (
              <div key={item.problem} style={{ background: "#fff", borderRadius: 16, padding: 26, border: "1px solid rgba(10,37,64,0.08)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", marginBottom: 6 }}>Problem</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.6)", fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{item.problem}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#00B4D8", marginBottom: 6 }}>Solution</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.6)", fontSize: 14, lineHeight: 1.6 }}>{item.solution}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-services" style={{ padding: "90px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 28 }}>
            <div>
              <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Services</span>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginTop: 10 }}>Structured, Tiered Services</h2>
            </div>
          </div>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { name: "Social Media Strategy", inc: "Positioning, content pillars, channel mix", out: "Clarity on what to say and where", tools: "Notion, GA4, Meta Insights" },
              { name: "Content Creation", inc: "Creative direction, production, editing", out: "Consistent, high-quality content", tools: "Adobe Suite, Canva" },
              { name: "Paid Ads Management", inc: "Campaign setup, A/B testing, optimization", out: "Improved ROAS and CPL", tools: "Meta Ads, TikTok Ads" },
              { name: "Influencer Campaigns", inc: "Creator sourcing, briefs, contracts", out: "Earned trust and reach", tools: "CreatorIQ, GRIN" },
              { name: "Community Management", inc: "Engagement workflows, moderation", out: "Higher retention and loyalty", tools: "Sprout Social" },
              { name: "Analytics & Reporting", inc: "Dashboards, KPIs, insights", out: "Transparent growth reporting", tools: "Looker Studio" },
            ].map(item => (
              <div key={item.name} style={{ border: "1px solid rgba(10,37,64,0.08)", borderRadius: 16, padding: 22 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>{item.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 10 }}>Includes: {item.inc}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 10 }}>Outcome: {item.out}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(10,37,64,0.5)" }}>Tools: {item.tools}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-method" style={{ padding: "90px 5%", background: "#F7FAFC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 36 }}>
            <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Framework</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginTop: 12 }}>The Momentum Framework</h2>
          </div>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {[
              { step: "Discover", desc: "Audit channels, audience, and competitors to identify leverage." },
              { step: "Strategize", desc: "Define positioning, content pillars, and KPIs." },
              { step: "Create", desc: "Design a repeatable content system and creative library." },
              { step: "Launch", desc: "Ship campaigns across priority channels with structured testing." },
              { step: "Optimize", desc: "Weekly reporting, iteration, and performance improvements." },
              { step: "Scale", desc: "Double down on what works and expand to new channels." },
            ].map(item => (
              <div key={item.step} style={{ background: "#fff", borderRadius: 16, padding: 22, border: "1px solid rgba(10,37,64,0.08)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>{item.step}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.6)", fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-cases" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F7FAFC 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
            <div>
              <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Case Studies</span>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginTop: 10 }}>Proof of Profit, Not Just Posts</h2>
            </div>
          </div>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { name: "DTC Launch Sprint", tag: "E‑commerce", uplift: "+$180k revenue", metric: "3.2x ROAS", timeline: "90 days", problem: "Low engagement on launch posts", strategy: "Positioning refresh + creator collabs + paid boosts" },
              { name: "SaaS Waitlist Engine", tag: "B2B SaaS", uplift: "+420 leads", metric: "2.8x CTR", timeline: "60 days", problem: "Low CTR + unclear positioning", strategy: "New creative angles + offer testing + funnel rebuild" },
              { name: "Creator Flywheel", tag: "Lifestyle", uplift: "+$74k pipeline", metric: "32% lead conversion", timeline: "75 days", problem: "Weak trust signals", strategy: "Micro‑influencer rollout + UGC system" },
            ].map(item => (
              <div key={item.name} style={{
                border: "1px solid rgba(10,37,64,0.08)", borderRadius: 18, padding: 24,
                background: "#fff", boxShadow: "0 10px 30px rgba(10,37,64,0.06)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540" }}>{item.name}</div>
                  <span style={{ padding: "6px 10px", borderRadius: 999, background: "rgba(0,180,216,0.12)", color: "#0077B6", fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>{item.tag}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div style={{ borderRadius: 12, background: "rgba(0,180,216,0.08)", padding: 12 }}>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#00B4D8", marginBottom: 4 }}>{item.uplift}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(10,37,64,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>Revenue Impact</div>
                  </div>
                  <div style={{ borderRadius: 12, background: "rgba(3,4,94,0.08)", padding: 12 }}>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#023E8A", marginBottom: 4 }}>{item.metric}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(10,37,64,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>Efficiency</div>
                  </div>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(10,37,64,0.55)", marginBottom: 12 }}>
                  Timeline: <span style={{ fontWeight: 700, color: "#0A2540" }}>{item.timeline}</span>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 8 }}>Problem: {item.problem}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)" }}>Strategy: {item.strategy}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-results" style={{ padding: "90px 5%", background: "#0A2540" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Serif Display', serif", color: "#fff", marginBottom: 24 }}>Results Dashboard</h2>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { num: "+180%", label: "Engagement Growth" },
              { num: "2.6x", label: "CTR Improvement" },
              { num: "34%", label: "Follower Growth" },
              { num: "3.2x", label: "ROAS Lift" },
            ].map(item => (
              <div key={item.label} style={{ padding: 22, borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#00B4D8", marginBottom: 8 }}>{item.num}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-pricing" style={{ padding: "90px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginBottom: 24 }}>Transparent Pricing</h2>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { name: "Starter", price: "From $1.5k/mo", who: "Early-stage brands", items: ["Strategy + content plan", "8 posts/mo", "Monthly reporting"] },
              { name: "Growth", price: "From $3.5k/mo", who: "Scaling teams", items: ["Full content production", "Paid ads management", "Weekly reporting"] },
              { name: "Scale", price: "From $7k/mo", who: "Multi-channel brands", items: ["Influencers + UGC", "Advanced testing", "Dedicated strategist"] },
            ].map(item => (
              <div key={item.name} style={{ border: "1px solid rgba(10,37,64,0.1)", borderRadius: 18, padding: 26 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 6 }}>{item.name}</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#00B4D8", marginBottom: 10 }}>{item.price}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 12 }}>Ideal for: {item.who}</div>
                <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", lineHeight: 1.7 }}>
                  {item.items.map(i => <li key={i}>{i}</li>)}
                </ul>
                <a href="#contact" style={{ display: "inline-block", marginTop: 16, color: "#0A2540", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13 }}>Book a Consultation →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-about" style={{ padding: "90px 5%", background: "#F7FAFC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, alignItems: "center" }} className="service-cols">
          <div>
            <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Founder-Led</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginTop: 12 }}>Built by Strategists, Not Just Executors</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.6)", lineHeight: 1.7, marginTop: 12 }}>
              We are a founder-led team with a bias for strategy. Every engagement starts with positioning and ends with measurable revenue impact.
            </p>
          </div>
          <div style={{ background: "#fff", borderRadius: 18, padding: 24, border: "1px solid rgba(10,37,64,0.08)" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>Why teams choose us</div>
            <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", lineHeight: 1.7 }}>
              {["Clear positioning and messaging", "Documented strategy and process", "Accountability through reporting", "Fast execution cycles"].map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="service-tools" style={{ padding: "90px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginBottom: 20 }}>Tech & Tools Stack</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["Meta Business Suite", "GA4", "TikTok Ads Manager", "SEMrush", "Canva", "Adobe Suite", "HubSpot", "Sprout Social"].map(t => (
              <span key={t} style={{ padding: "10px 16px", borderRadius: 999, background: "#F0F4F8", border: "1px solid rgba(10,37,64,0.08)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.7)" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="service-testimonials" style={{ padding: "90px 5%", background: "#0A2540" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Serif Display', serif", color: "#fff", marginBottom: 24 }}>Early Client Feedback</h2>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {[
              { name: "Alicia M., DTC Founder", quote: "They gave us a real strategy and execution system. Engagement jumped in weeks." },
              { name: "Rahul K., SaaS Marketer", quote: "The reporting cadence and creative testing were what we needed to scale." },
            ].map(item => (
              <div key={item.name} style={{ borderRadius: 16, padding: 22, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 12 }}>"{item.quote}"</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#00B4D8" }}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="service-insights" style={{ padding: "90px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginBottom: 20 }}>Insights & Education</h2>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { title: "How to build a content system that scales", tag: "Strategy" },
              { title: "Creative testing frameworks for Meta Ads", tag: "Paid Media" },
              { title: "What to measure in the first 30 days", tag: "Analytics" },
            ].map(item => (
              <div key={item.title} style={{ border: "1px solid rgba(10,37,64,0.08)", borderRadius: 16, padding: 22 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#00B4D8", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>{item.tag}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", lineHeight: 1.6 }}>{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "70px 5%", background: "#F0F4F8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div>
            <h2 style={{ fontSize: 32, fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginBottom: 8 }}>Ready to build a real growth engine?</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.6)" }}>Book a consultation and we will outline a 90-day plan.</p>
          </div>
          <a href="#contact" style={{ background: "linear-gradient(90deg, #00B4D8, #0077B6)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 20px rgba(0,180,216,0.45)" }}>Book a Consultation</a>
        </div>
      </section>

      <Contact />
    </div>
  );
}

// ─── Why Cyvera ───────────────────────────────────────────────────────────────
function WhyCyvera() {
  return (
    <section id="about" style={{ padding: "100px 5%", background: "#0A2540" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Stats Strip */}
        <Reveal>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 0, borderRadius: 16, overflow: "hidden",
            border: "1px solid rgba(0,180,216,0.2)", marginBottom: 80
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: "36px 24px", textAlign: "center",
                borderRight: i < stats.length - 1 ? "1px solid rgba(0,180,216,0.15)" : "none",
                background: "rgba(0,180,216,0.05)"
              }}>
                <div style={{ fontSize: 44, fontFamily: "'DM Serif Display', serif", fontWeight: 400, color: "#00B4D8", lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", marginTop: 8, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Two column */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="two-col">
          <Reveal>
            <div>
              <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Why Us</span>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Serif Display', serif", color: "#fff", marginTop: 12, marginBottom: 32, letterSpacing: "-0.5px" }}>
                One Agency.<br />Every Digital Need.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {differentiators.map((d, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(0,180,216,0.15)", border: "1px solid rgba(0,180,216,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, color: "#00B4D8", marginTop: 1 }}>✓</span>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {/* Stylized graphic */}
            <div style={{ position: "relative" }}>
              <div style={{
                background: "linear-gradient(135deg, rgba(0,180,216,0.1), rgba(0,119,182,0.2))",
                borderRadius: 20, padding: 40, border: "1px solid rgba(0,180,216,0.2)",
                backdropFilter: "blur(10px)"
              }}>
                {/* Fake UI mockup */}
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 24, border: "1px solid rgba(255,255,255,0.07)", marginBottom: 16 }}>
                  <div style={{ height: 8, background: "rgba(0,180,216,0.4)", borderRadius: 4, width: "60%", marginBottom: 12 }} />
                  <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 4, width: "80%", marginBottom: 8 }} />
                  <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 4, width: "50%" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {["📊 Analytics", "🔐 Security", "📈 Growth", "💡 Strategy"].map((item, i) => (
                    <div key={i} style={{
                      background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "16px 14px",
                      border: "1px solid rgba(255,255,255,0.07)", fontSize: 13,
                      color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontWeight: 500
                    }}>{item}</div>
                  ))}
                </div>
                <div style={{ marginTop: 16, background: "linear-gradient(90deg, #00B4D8, #0077B6)", borderRadius: 10, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700 }}>All systems operational</span>
                  <span style={{ color: "#fff", fontSize: 18 }}>✅</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .two-col { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter(p => p.tags.includes(active));

  return (
    <section id="work" style={{ padding: "100px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Portfolio</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginTop: 12, letterSpacing: "-1px" }}>Our Work</h2>
          </div>
        </Reveal>

        {/* Filter Tabs */}
        <Reveal>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            {filterTabs.map(t => (
              <button key={t} onClick={() => setActive(t)} style={{
                padding: "9px 22px", borderRadius: 100, fontSize: 13, fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "all 0.2s",
                background: active === t ? "linear-gradient(90deg, #00B4D8, #0077B6)" : "transparent",
                color: active === t ? "#fff" : "#0A2540",
                border: active === t ? "none" : "1.5px solid rgba(10,37,64,0.15)",
                boxShadow: active === t ? "0 4px 16px rgba(0,180,216,0.35)" : "none"
              }}>{t}</button>
            ))}
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {filtered.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  return (
    <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      borderRadius: 16, overflow: "hidden",
      border: `1.5px solid ${hov ? "#00B4D8" : "rgba(10,37,64,0.08)"}`,
      boxShadow: hov ? "0 12px 48px rgba(0,180,216,0.18)" : "0 2px 16px rgba(10,37,64,0.06)",
      transition: "all 0.3s ease", cursor: "default"
    }}>
      <div style={{ height: 200, background: p.gradient, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.3)", padding: "6px 16px", borderRadius: 100 }}>{p.category}</span>
      </div>
      <div style={{ padding: "24px 28px", background: "#fff" }}>
        <h3 style={{ fontSize: 18, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 10 }}>{p.name}</h3>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,180,216,0.08)", padding: "6px 14px", borderRadius: 100, marginBottom: 18 }}>
          <span style={{ color: "#00B4D8", fontSize: 18 }}>↑</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#0077B6", fontFamily: "'DM Sans', sans-serif" }}>{p.metric}</span>
        </div>
        <a href="#contact" style={{ color: hov ? "#00B4D8" : "rgba(10,37,64,0.4)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, transition: "color 0.2s" }}>
          View Case Study <span>→</span>
        </a>
      </div>
    </article>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
function Process() {
  return (
    <section style={{ padding: "100px 5%", background: "#F0F4F8" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Methodology</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginTop: 12, letterSpacing: "-1px" }}>How We Work</h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div style={{ background: "#fff", borderRadius: 16, padding: "36px 28px", border: "1.5px solid rgba(10,37,64,0.08)", position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: 60, fontFamily: "'DM Serif Display', serif", color: "rgba(0,180,216,0.1)", position: "absolute", top: -10, right: 16, fontWeight: 700 }}>{s.n}</div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #00B4D8, #0077B6)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <span style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 900, fontSize: 14 }}>{s.n}</span>
                </div>
                <h3 style={{ fontSize: 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(10,37,64,0.6)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section style={{ padding: "100px 5%", background: "#0A2540" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Proof</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontFamily: "'DM Serif Display', serif", color: "#fff", marginTop: 12, letterSpacing: "-1px" }}>What Clients Say</h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "36px 32px",
                border: "1px solid rgba(0,180,216,0.15)", backdropFilter: "blur(8px)"
              }}>
                <div style={{ fontSize: 36, color: "#00B4D8", fontFamily: "'DM Serif Display', serif", lineHeight: 1, marginBottom: 16 }}>"</div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75, marginBottom: 28, fontStyle: "italic" }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #00B4D8, #0077B6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 900, color: "#fff", fontSize: 16 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#fff", fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSent(true);
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "14px 18px", borderRadius: 10, fontSize: 14,
    fontFamily: "'DM Sans', sans-serif", outline: "none",
    border: `1.5px solid ${errors[field] ? "#ef4444" : "rgba(10,37,64,0.15)"}`,
    background: "#fff", color: "#0A2540", marginBottom: 4,
    transition: "border-color 0.2s"
  });

  return (
    <section id="contact" style={{ padding: "100px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Get Started</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginTop: 12, letterSpacing: "-1px" }}>Let's Work Together</h2>
            <p style={{ color: "rgba(10,37,64,0.55)", fontFamily: "'DM Sans', sans-serif", fontSize: 16, marginTop: 16, maxWidth: 500, margin: "16px auto 0" }}>Have a project in mind? Drop us a message and we'll get back to you within 24 hours.</p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 64, alignItems: "start" }} className="two-col">
          {/* Contact info */}
          <Reveal>
            <div>
              <h3 style={{ fontSize: 22, fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginBottom: 32 }}>Contact Information</h3>
              {[
                { icon: "✉️", label: "Email", val: "hello@cyvera.agency" },
                { icon: "📍", label: "Location", val: "San Francisco, CA (Remote-First)" },
                { icon: "⚡", label: "Response Time", val: "Within 24 hours" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: 16, marginBottom: 28, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(0,180,216,0.08)", border: "1px solid rgba(0,180,216,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: "rgba(10,37,64,0.45)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 15, color: "#0A2540", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "60px 40px", background: "rgba(0,180,216,0.05)", borderRadius: 16, border: "1.5px solid rgba(0,180,216,0.2)" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontSize: 24, fontFamily: "'DM Serif Display', serif", color: "#0A2540", marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: "rgba(10,37,64,0.6)", fontFamily: "'DM Sans', sans-serif" }}>We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <div style={{ background: "#F0F4F8", borderRadius: 16, padding: 40 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 0 }} className="form-grid">
                  <div>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name *" style={inputStyle("name")} aria-label="Full Name" />
                    {errors.name && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>{errors.name}</p>}
                  </div>
                  <div>
                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email Address *" style={inputStyle("email")} aria-label="Email Address" />
                    {errors.email && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>{errors.email}</p>}
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company (Optional)" style={{ ...inputStyle(), marginBottom: 0 }} aria-label="Company" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ ...inputStyle(), marginBottom: 0, cursor: "pointer" }} aria-label="Service">
                    <option value="">Select a Service...</option>
                    <option>Social Media & Branding</option>
                    <option>SEO</option>
                    <option>Cybersecurity</option>
                    <option>Software Development</option>
                    <option>Other</option>
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project... *" rows={5} style={{ ...inputStyle("message"), resize: "vertical", marginBottom: 0 }} aria-label="Message" />
                  {errors.message && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{errors.message}</p>}
                </div>
                <button onClick={handleSubmit} aria-label="Send message" style={{
                  width: "100%", padding: "16px 32px", background: "linear-gradient(90deg, #00B4D8, #0077B6)",
                  color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
                  boxShadow: "0 4px 24px rgba(0,180,216,0.4)", letterSpacing: "0.3px", transition: "transform 0.2s, box-shadow 0.2s"
                }}
                  onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 8px 32px rgba(0,180,216,0.5)"; }}
                  onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 4px 24px rgba(0,180,216,0.4)"; }}
                >Send Message</button>
              </div>
            )}
          </Reveal>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#03045E", padding: "64px 5% 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 7, background: "linear-gradient(135deg, #00B4D8, #0077B6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: "#fff" }}>C</div>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>Cyvera</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>Your end-to-end digital partner — from identity to infrastructure.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              {["in", "ig", "𝕏", "gh"].map(s => (
                <a key={s} href="#" aria-label={`Social ${s}`} style={{
                  width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                  textDecoration: "none", transition: "background 0.2s, color 0.2s"
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#00B4D8"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Nav */}
          {[
            { title: "Company", links: ["Home", "About", "Work", "Contact"] },
            { title: "Services", links: ["Social Media & Branding", "SEO", "Cybersecurity", "Software Dev"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</h4>
              {col.links.map(l => (
                <a key={l} href="#" style={{ display: "block", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, textDecoration: "none", marginBottom: 12, transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#00B4D8"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
                >{l}</a>
              ))}
            </div>
          ))}

          <div>
            <h4 style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 20 }}>Contact</h4>
            <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7 }}>hello@cyvera.agency</p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, marginTop: 8 }}>San Francisco, CA</p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>© 2025 Cyvera. All rights reserved.</p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service"].map(l => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#00B4D8"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function CyveraPortfolio() {
  const [view, setView] = useState("home");
  const isDetail = view !== "home";
  const pendingHash = useRef("");

  useEffect(() => {
    if (view !== "home") {
      window.scrollTo(0, 0);
      return;
    }
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

  return (
    <div>
      <Navbar isDetail={isDetail} onHome={goHome} />
      <main>
        {view === "home" ? (
          <>
            <Hero />
            <Services onSelect={(id) => setView(id)} />
            <WhyCyvera />
            <Portfolio />
            <Process />
            <Testimonials />
            <Contact />
          </>
        ) : (
          <ServiceDetail serviceId={view} onBack={() => setView("home")} />
        )}
      </main>
      <Footer />
    </div>
  );
}
