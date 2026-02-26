import { useState, useEffect, useRef } from "react";
import { useSEO, SEO_CONFIGS } from "./seo/useSEO";
import Reveal from "./components/common/Reveal";
import Navbar from "./components/layout/Navbar";
import SchedulerModal from "./components/layout/SchedulerModal";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import MarqueeStrip from "./components/sections/MarqueeStrip";
import Services from "./components/sections/Services";
import StatsStrip from "./components/sections/StatsStrip";
import WhyCyvera from "./components/sections/WhyCyvera";
import Portfolio from "./components/sections/Portfolio";
import Process from "./components/sections/Process";
import Testimonials from "./components/sections/Testimonials";
import FAQPage from "./components/sections/FAQPage";
import CTABanner from "./components/sections/CTABanner";
import Contact from "./components/sections/Contact";

function ServiceDetail({ serviceId, onBack, onSchedule }) {
  if (serviceId === "social-media") return <SocialMediaMarketing onBack={onBack} onSchedule={onSchedule} />;
  if (serviceId === "seo") return <SEOService onBack={onBack} onSchedule={onSchedule} />;
  if (serviceId === "cybersecurity") return <CybersecurityService onBack={onBack} onSchedule={onSchedule} />;
  if (serviceId === "website-dev") return <WebsiteDevService onBack={onBack} onSchedule={onSchedule} />;
  if (serviceId === "custom-software") return <CustomSoftwareService onBack={onBack} onSchedule={onSchedule} />;
  return null;
}

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

function SocialMediaMarketing({ onBack, onSchedule }) {
  const heroScheme = {
    particleRGB: "0,180,216",
    blobs: [
      { w: 650, h: 650, top: "-28%", left: "-8%", c: "rgba(0,180,216,0.14)", a: 10 },
      { w: 460, h: 460, top: "58%", left: "62%", c: "rgba(0,119,182,0.18)", a: 13 },
      { w: 320, h: 320, top: "22%", left: "42%", c: "rgba(72,202,228,0.1)", a: 8 },
      { w: 240, h: 240, top: "72%", left: "12%", c: "rgba(0,180,216,0.08)", a: 11 },
    ],
  };

  return (
      <div>
        <section id="service-overview" style={{ padding: "140px 5% 80px", background: "radial-gradient(1200px 700px at 10% -10%, rgba(0,180,216,0.45), transparent 60%), radial-gradient(900px 600px at 90% 20%, rgba(72,202,228,0.25), transparent 55%), linear-gradient(160deg, #03045E 0%, #0A2540 48%, #023E8A 100%)", color: "#fff", position: "relative", overflow: "hidden" }}>
          <HeroBackdrop scheme={heroScheme} />
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
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
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

        <Contact theme={{
          sectionBg: "linear-gradient(180deg, #F7FAFC 0%, #ECF4FF 100%)",
          accent: "#00B4D8",
          accentStrong: "#0077B6",
          accentSoft: "rgba(0,180,216,0.08)",
          accentBorder: "rgba(0,180,216,0.2)",
          heading: "#0A2540",
          text: "rgba(10,37,64,0.55)"
        }} />
      </div>
  );
}

function SEOService({ onBack, onSchedule }) {
  const heroScheme = {
    particleRGB: "34,197,94",
    blobs: [
      { w: 620, h: 620, top: "-26%", left: "-10%", c: "rgba(34,197,94,0.14)", a: 10 },
      { w: 420, h: 420, top: "56%", left: "62%", c: "rgba(14,165,233,0.18)", a: 13 },
      { w: 300, h: 300, top: "24%", left: "44%", c: "rgba(34,197,94,0.1)", a: 8 },
      { w: 220, h: 220, top: "70%", left: "12%", c: "rgba(14,165,233,0.08)", a: 11 },
    ],
  };

  return (
      <div>
        <section id="service-overview" style={{ padding: "140px 5% 80px", background: "radial-gradient(900px 600px at 12% -20%, rgba(34,197,94,0.35), transparent 60%), radial-gradient(900px 600px at 88% 10%, rgba(14,165,233,0.2), transparent 55%), linear-gradient(150deg, #06283D 0%, #0B1F2E 50%, #0A2F4A 100%)", color: "#fff", position: "relative", overflow: "hidden" }}>
          <HeroBackdrop scheme={heroScheme} />
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <button type="button" onClick={onBack} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer", marginBottom: 20 }}>← Back to Home</button>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 style={{ fontSize: "clamp(36px, 5.5vw, 68px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, marginBottom: 16, letterSpacing: "-1px" }}>SEO That Compounds</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "clamp(16px, 2vw, 20px)", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", maxWidth: 640, lineHeight: 1.7 }}>
                Technical excellence, content systems, and authority building that turn rankings into revenue.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
                <button type="button" onClick={() => onSchedule?.()} style={{ background: "linear-gradient(90deg, #22C55E, #0EA5E9)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 32px rgba(34,197,94,0.35)", border: "none", cursor: "pointer" }}>Schedule a Meeting</button>
                <a href="#service-pillars" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>See the pillars</a>
                <a href="#service-process" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>View process</a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
                {["Technical audit", "Content roadmap", "Authority growth", "Transparent reporting"].map(item => (
                    <span key={item} style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="service-pillars" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #F6FBFF 0%, #ECF6F1 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span style={{ color: "#22C55E", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Pillars</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginTop: 10 }}>A Full-Stack SEO System</h2>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.6)", maxWidth: 560, margin: "12px auto 0" }}>
                  We align technical foundations, content production, and authority signals to create long-term growth.
                </div>
              </div>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {[
                { title: "Technical SEO", desc: "Crawlability, indexation, Core Web Vitals, and structured data fixes." },
                { title: "Content & Topics", desc: "Keyword research, content clusters, briefs, and on-page optimization." },
                { title: "Authority Building", desc: "Digital PR, link reclamation, and editorial outreach." },
                { title: "Local + Global", desc: "Local SEO, international targeting, and multi-region performance." },
              ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div style={{
                      borderRadius: 18, padding: 22,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)",
                      border: "1.5px solid rgba(10,37,64,0.07)",
                      boxShadow: "0 8px 28px rgba(10,37,64,0.08)"
                    }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 10 }}>{item.title}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-services" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F1F7FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24, textAlign: "center" }}>Core SEO Services</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {[
                { name: "Technical Audit + Fixes", inc: "Crawl diagnostics, CWV, schema, index control", out: "Healthy, crawlable site" },
                { name: "Content Strategy", inc: "Topic modeling, briefs, on-page optimization", out: "Ranked content that converts" },
                { name: "Authority Growth", inc: "Digital PR, link outreach, reclaim", out: "Stronger domain authority" },
                { name: "Local SEO", inc: "GBP optimization, citations, reviews", out: "Local visibility lift" },
                { name: "International SEO", inc: "Hreflang, regional architecture", out: "Global reach without cannibalization" },
                { name: "Analytics + Reporting", inc: "GA4, GSC, KPI dashboards", out: "Clear growth visibility" },
              ].map((item, i) => (
                  <Reveal key={item.name} delay={i * 0.08}>
                    <div style={{
                      borderRadius: 20, padding: 22,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)",
                      border: "1.5px solid rgba(10,37,64,0.07)",
                      boxShadow: "0 8px 28px rgba(10,37,64,0.08)"
                    }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 10 }}>Includes: {item.inc}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)" }}>Outcome: {item.out}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-process" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #F6F9FF 0%, #EDF7F1 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span style={{ color: "#22C55E", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Process</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginTop: 10 }}>From Audit to Compounding Growth</h2>
              </div>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
              {["Audit", "Prioritize", "Implement", "Measure", "Iterate"].map((step, i) => (
                  <Reveal key={step} delay={i * 0.08}>
                    <div style={{
                      borderRadius: 16, padding: 20,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)",
                      border: "1.5px solid rgba(10,37,64,0.07)",
                      boxShadow: "0 8px 24px rgba(10,37,64,0.08)"
                    }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#22C55E", marginBottom: 8 }}>0{i + 1}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540" }}>{step}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-cases" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #EFF7FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24, textAlign: "center" }}>SEO Wins That Compound</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {[
                { name: "Fintech Platform", lift: "+162% organic sessions", metric: "2.1x demo requests", focus: "Technical cleanup + content cluster build" },
                { name: "Healthcare Network", lift: "+94% local visibility", metric: "38% call increase", focus: "Local SEO + GBP management" },
                { name: "B2B SaaS", lift: "+128% keyword rankings", metric: "3.4x pipeline", focus: "Topical authority + link outreach" },
              ].map((item, i) => (
                  <Reveal key={item.name} delay={i * 0.08}>
                    <div style={{ borderRadius: 20, padding: 24, background: "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 12px 32px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 10 }}>{item.focus}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#22C55E", marginBottom: 6 }}>{item.lift}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)" }}>{item.metric}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-results" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #0A2540 0%, #071B39 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 24, textAlign: "center" }}>Performance Snapshot</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              {[
                { num: "+132%", label: "Organic Traffic" },
                { num: "+48%", label: "CTR Lift" },
                { num: "3.2x", label: "Keyword Growth" },
                { num: "+64%", label: "Pipeline Impact" },
              ].map((item, i) => (
                  <Reveal key={item.label} delay={i * 0.08}>
                    <div style={{ padding: 22, borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", textAlign: "center" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 28, color: "#22C55E", marginBottom: 8 }}>{item.num}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>{item.label}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-tools" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 20, textAlign: "center" }}>SEO Tool Stack</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {["Google Search Console", "GA4", "Screaming Frog", "Ahrefs", "SEMrush", "Looker Studio", "SurferSEO", "PageSpeed Insights"].map(t => (
                    <span key={t} style={{ padding: "10px 18px", borderRadius: 999, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.7)", fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="service-pricing" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24, textAlign: "center" }}>SEO Engagements</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { name: "Foundation", price: "From $1.5k/mo", who: "Technical + content fixes", items: ["Audit and backlog", "Quick wins", "Monthly report"] },
                { name: "Growth", price: "From $3.5k/mo", who: "Content and authority", items: ["Content production", "Digital PR", "Bi-weekly reporting"] },
                { name: "Scale", price: "Custom", who: "Enterprise search growth", items: ["Multi-region SEO", "Dedicated strategist", "Weekly syncs"] },
              ].map((item, idx) => (
                  <Reveal key={item.name} delay={idx * 0.08}>
                    <div style={{ borderRadius: 20, padding: 26, background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 10px 34px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 6, fontSize: 18 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 800, color: "#22C55E", marginBottom: 10 }}>{item.price}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 12 }}>{item.who}</div>
                      <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", lineHeight: 1.7 }}>
                        {item.items.map(i => <li key={i}>{i}</li>)}
                      </ul>
                      <button type="button" onClick={() => onSchedule?.()} style={{ display: "inline-block", marginTop: 16, color: "#0A2540", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Schedule a Meeting →</button>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "70px 5%", background: "linear-gradient(90deg, #0B1F2E, #0A2F4A)" }}>
          <Reveal>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.5px" }}>Ready to turn rankings into revenue?</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 15 }}>Get a technical audit and growth roadmap within two weeks.</p>
              </div>
              <button type="button" onClick={() => onSchedule?.()} style={{ background: "linear-gradient(90deg, #22C55E, #0EA5E9)", color: "#fff", textDecoration: "none", padding: "16px 32px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 32px rgba(34,197,94,0.4)", flexShrink: 0, border: "none", cursor: "pointer" }}>Schedule a Meeting →</button>
            </div>
          </Reveal>
        </section>
        <Contact theme={{
          sectionBg: "linear-gradient(180deg, #F6FBFF 0%, #ECF6F1 100%)",
          accent: "#22C55E",
          accentStrong: "#0EA5E9",
          accentSoft: "rgba(34,197,94,0.1)",
          accentBorder: "rgba(34,197,94,0.25)",
          heading: "#0A2540",
          text: "rgba(10,37,64,0.55)"
        }} />
      </div>
  );
}

function CybersecurityService({ onBack, onSchedule }) {
  const heroScheme = {
    particleRGB: "45,212,191",
    blobs: [
      { w: 620, h: 620, top: "-26%", left: "-10%", c: "rgba(45,212,191,0.14)", a: 10 },
      { w: 420, h: 420, top: "56%", left: "62%", c: "rgba(59,130,246,0.18)", a: 13 },
      { w: 300, h: 300, top: "24%", left: "44%", c: "rgba(45,212,191,0.1)", a: 8 },
      { w: 220, h: 220, top: "70%", left: "12%", c: "rgba(59,130,246,0.08)", a: 11 },
    ],
  };

  return (
      <div>
        <section id="service-overview" style={{ padding: "140px 5% 80px", background: "radial-gradient(900px 600px at 15% -20%, rgba(45,212,191,0.25), transparent 60%), radial-gradient(900px 600px at 85% 0%, rgba(59,130,246,0.2), transparent 55%), linear-gradient(150deg, #071724 0%, #0B2238 55%, #0B2D4B 100%)", color: "#fff", position: "relative", overflow: "hidden" }}>
          <HeroBackdrop scheme={heroScheme} />
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <button type="button" onClick={onBack} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer", marginBottom: 20 }}>← Back to Home</button>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 style={{ fontSize: "clamp(36px, 5.5vw, 68px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, marginBottom: 16, letterSpacing: "-1px" }}>Security That Builds Trust</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "clamp(16px, 2vw, 20px)", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", maxWidth: 680, lineHeight: 1.7 }}>
                Zero-trust security programs that combine offensive testing, resilient architecture, and 24/7 monitoring.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
                <button type="button" onClick={() => onSchedule?.()} style={{ background: "linear-gradient(90deg, #2DD4BF, #3B82F6)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 32px rgba(45,212,191,0.35)", border: "none", cursor: "pointer" }}>Schedule a Meeting</button>
                <a href="#service-defend" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>See the defenses</a>
                <a href="#service-process" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>View process</a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
                {["Penetration testing", "Incident response", "DevSecOps", "24/7 SOC", "Zero Trust"].map(item => (
                    <span key={item} style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="service-defend" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #F5FAFF 0%, #ECF7F5 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span style={{ color: "#2DD4BF", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Capabilities</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginTop: 10 }}>Core Cybersecurity Capabilities</h2>
              </div>
            </Reveal>
            <div className="service-grid cyber-cap-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, alignItems: "stretch" }}>
              {[
                { title: "Advanced Penetration Testing", desc: "Real-world attack simulations and exploit validation." },
                { title: "Incident Response & Breach Recovery", desc: "Containment, forensics, and rapid restoration." },
                { title: "Secure Software Development", desc: "Zero-vulnerability approach from design to release." },
                { title: "DevSecOps Implementation", desc: "Security embedded into CI/CD and delivery workflows." },
                { title: "Managed SOC (24/7 Monitoring)", desc: "Continuous detection, triage, and threat hunting." },
                { title: "Continuous Vulnerability & Patch Mgmt", desc: "Prioritized remediation and verification cycles." },
                { title: "Dependency & Patch Management", desc: "Supply chain hardening and library hygiene." },
                { title: "Risk Management & Governance", desc: "Policies, controls, and compliance readiness." },
                { title: "Security Awareness & Training", desc: "Role-based training and phishing resilience." },
              ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div style={{ borderRadius: 18, padding: 22, background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 8px 28px rgba(10,37,64,0.08)", height: "100%", minHeight: 168, display: "flex", flexDirection: "column" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 10 }}>{item.title}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
            <style>{`
              .cyber-cap-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
              @media (max-width: 900px) { .cyber-cap-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
              @media (max-width: 600px) { .cyber-cap-grid { grid-template-columns: 1fr !important; } }
            `}</style>
          </div>
        </section>

        <section id="service-services" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F1F7FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24, textAlign: "center" }}>Security Architecture</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
              {[
                { name: "Zero Trust Architecture (ZTA)", inc: "Identity-first access, continuous verification", out: "Reduced lateral movement" },
                { name: "Defense-in-Depth Architecture", inc: "Layered controls across network, app, and data", out: "Resilient security posture" },
                { name: "Secure Cloud Architecture", inc: "Hardened cloud baselines and monitoring", out: "Confident cloud operations" },
                { name: "DevSecOps Architecture", inc: "Security gates and policy-as-code", out: "Faster, safer releases" },
              ].map((item, i) => (
                  <Reveal key={item.name} delay={i * 0.08}>
                    <div style={{ borderRadius: 20, padding: 22, background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 8px 28px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 10 }}>Includes: {item.inc}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)" }}>Outcome: {item.out}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-process" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #F6F9FF 0%, #EDF7F1 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span style={{ color: "#2DD4BF", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Team</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginTop: 10 }}>Core Team Structure</h2>
              </div>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
              {[
                { title: "Offensive Security", desc: "Red Team testing and adversary emulation." },
                { title: "Defensive Security", desc: "Blue Team / SOC detection and response." },
                { title: "DevSecOps & Secure Engineering", desc: "Secure build pipelines and code hardening." },
              ].map((step, i) => (
                  <Reveal key={step.title} delay={i * 0.08}>
                    <div style={{ borderRadius: 16, padding: 20, background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 8px 24px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#2DD4BF", marginBottom: 8 }}>0{i + 1}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", marginBottom: 6 }}>{step.title}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(10,37,64,0.6)" }}>{step.desc}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-tools" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 20, textAlign: "center" }}>Security Tooling</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {["Burp Suite", "Metasploit", "Nessus", "OWASP ZAP", "Nmap", "Wireshark"].map(t => (
                    <span key={t} style={{ padding: "10px 18px", borderRadius: 999, background: "rgba(45,212,191,0.08)", border: "1px solid rgba(45,212,191,0.2)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.7)", fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="service-pricing" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 12, textAlign: "center" }}>Recent Work</h2>
              <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.6)", marginBottom: 28 }}>
                Anti-Cloneable NFC/RFID Technology (USPTO, 63/792,437)
              </p>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                {
                  name: "Hardware Security",
                  price: "Built from the chip level",
                  who: "Secure identity by design",
                  items: [
                    "Secure chip embedded in both card & reader",
                    "Hardware-based unique identity",
                    "Tamper-resistant architecture",
                    "No static UID dependency",
                  ]
                },
                {
                  name: "Smart Authentication",
                  price: "Verified before any access",
                  who: "Mutual trust handshake",
                  items: [
                    "Mutual chip-to-chip authentication",
                    "Encrypted challenge–response protocol",
                    "Dynamic session key on every tap",
                    "Blocks replay & fake reader attacks",
                  ]
                },
                {
                  name: "Cloning Protection",
                  price: "Patented security model",
                  who: "Device-level enforcement",
                  items: [
                    "Communication only with authorized devices",
                    "Instant rejection of unknown readers",
                    "Impossible to duplicate without matching hardware",
                  ]
                },
              ].map((item, idx) => (
                  <Reveal key={item.name} delay={idx * 0.08}>
                    <div style={{ borderRadius: 20, padding: 26, background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 10px 34px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 6, fontSize: 18 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 800, color: "#2DD4BF", marginBottom: 10 }}>{item.price}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 12 }}>{item.who}</div>
                      <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", lineHeight: 1.7 }}>
                        {item.items.map(i => <li key={i}>{i}</li>)}
                      </ul>
                      <button type="button" onClick={() => onSchedule?.()} style={{ display: "inline-block", marginTop: 16, color: "#0A2540", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Schedule a Meeting →</button>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "70px 5%", background: "linear-gradient(90deg, #0B2238, #0B2D4B)" }}>
          <Reveal>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.5px" }}>Ready to reduce risk fast?</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 15 }}>Get a security posture review and a prioritized remediation plan.</p>
              </div>
              <button type="button" onClick={() => onSchedule?.()} style={{ background: "linear-gradient(90deg, #2DD4BF, #3B82F6)", color: "#fff", textDecoration: "none", padding: "16px 32px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 32px rgba(45,212,191,0.4)", flexShrink: 0, border: "none", cursor: "pointer" }}>Schedule a Meeting →</button>
            </div>
          </Reveal>
        </section>
        <Contact theme={{
          sectionBg: "linear-gradient(180deg, #F5FAFF 0%, #ECF7F5 100%)",
          accent: "#2DD4BF",
          accentStrong: "#3B82F6",
          accentSoft: "rgba(45,212,191,0.12)",
          accentBorder: "rgba(45,212,191,0.28)",
          heading: "#0A2540",
          text: "rgba(10,37,64,0.55)"
        }} />
      </div>
  );
}

function WebsiteDevService({ onBack, onSchedule }) {
  const heroScheme = {
    particleRGB: "251,146,60",
    blobs: [
      { w: 620, h: 620, top: "-26%", left: "-10%", c: "rgba(251,146,60,0.18)", a: 10 },
      { w: 420, h: 420, top: "56%", left: "62%", c: "rgba(59,130,246,0.2)", a: 13 },
      { w: 300, h: 300, top: "24%", left: "44%", c: "rgba(251,146,60,0.12)", a: 8 },
      { w: 220, h: 220, top: "70%", left: "12%", c: "rgba(59,130,246,0.1)", a: 11 },
    ],
  };

  return (
      <div>
        <section id="service-overview" style={{ padding: "140px 5% 80px", background: "radial-gradient(900px 600px at 10% -20%, rgba(251,146,60,0.3), transparent 60%), radial-gradient(900px 600px at 90% 10%, rgba(59,130,246,0.2), transparent 55%), linear-gradient(150deg, #2A103B 0%, #1E1B4B 52%, #1E293B 100%)", color: "#fff", position: "relative", overflow: "hidden" }}>
          <HeroBackdrop scheme={heroScheme} />
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <button type="button" onClick={onBack} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer", marginBottom: 20 }}>← Back to Home</button>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 style={{ fontSize: "clamp(36px, 5.5vw, 68px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, marginBottom: 16, letterSpacing: "-1px" }}>Websites That Convert</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "clamp(16px, 2vw, 20px)", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", maxWidth: 640, lineHeight: 1.7 }}>
                High-performance marketing sites that pair brand storytelling with conversion-focused UX.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
                <button type="button" onClick={() => onSchedule?.()} style={{ background: "linear-gradient(90deg, #FB923C, #3B82F6)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 32px rgba(251,146,60,0.35)", border: "none", cursor: "pointer" }}>Schedule a Meeting</button>
                <a href="#service-offer" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>See what we build</a>
                <a href="#service-process" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>View process</a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
                {["UX strategy", "Brand design", "Performance engineering", "SEO ready"].map(item => (
                    <span key={item} style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="service-offer" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FDF7F0 0%, #EEF4FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span style={{ color: "#FB923C", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Offer</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginTop: 10 }}>Strategy, Design, Build, Optimize</h2>
              </div>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
              {[
                { title: "UX + CRO", desc: "Journey mapping, wireframes, conversion testing." },
                { title: "Visual Design", desc: "Brand system, UI kit, storytelling." },
                { title: "Development", desc: "Modern stacks, CMS builds, integrations." },
                { title: "Performance", desc: "Core Web Vitals, SEO, analytics." },
              ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div style={{ borderRadius: 18, padding: 22, background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 8px 28px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 10 }}>{item.title}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-services" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F1F7FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24, textAlign: "center" }}>Web Development Services</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {[
                { name: "Marketing Websites", inc: "Copy, design, build", out: "Launch-ready site" },
                { name: "Ecommerce", inc: "Storefronts, checkout, integrations", out: "Higher conversion rate" },
                { name: "CMS Builds", inc: "Custom CMS, content workflows", out: "Fast content updates" },
                { name: "Landing Pages", inc: "Campaign pages, A/B testing", out: "Better ROAS" },
                { name: "Performance Tune-ups", inc: "CWV, accessibility, SEO", out: "Improved rankings" },
                { name: "Analytics Setup", inc: "GA4, tag manager, dashboards", out: "Measurable growth" },
              ].map((item, i) => (
                  <Reveal key={item.name} delay={i * 0.08}>
                    <div style={{ borderRadius: 20, padding: 22, background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 8px 28px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 10 }}>Includes: {item.inc}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)" }}>Outcome: {item.out}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-process" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #F6F9FF 0%, #EDF7F1 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span style={{ color: "#FB923C", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Process</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginTop: 10 }}>From Strategy to Launch</h2>
              </div>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
              {["Discover", "Design", "Build", "Launch", "Optimize"].map((step, i) => (
                  <Reveal key={step} delay={i * 0.08}>
                    <div style={{ borderRadius: 16, padding: 20, background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 8px 24px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#FB923C", marginBottom: 8 }}>0{i + 1}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540" }}>{step}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-cases" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #EFF7FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24, textAlign: "center" }}>Launches That Convert</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {[
                { name: "SaaS Rebrand", lift: "2.4x conversion rate", metric: "35% faster load", focus: "UX overhaul + performance" },
                { name: "B2B Services", lift: "+48% form fills", metric: "A/B landing pages", focus: "CRO + messaging" },
                { name: "Ecommerce", lift: "+28% AOV", metric: "Checkout redesign", focus: "UX + analytics" },
              ].map((item, i) => (
                  <Reveal key={item.name} delay={i * 0.08}>
                    <div style={{ borderRadius: 20, padding: 24, background: "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 12px 32px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 10 }}>{item.focus}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#FB923C", marginBottom: 6 }}>{item.lift}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)" }}>{item.metric}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-results" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #0A2540 0%, #071B39 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 24, textAlign: "center" }}>Performance Metrics</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              {[
                { num: "90+", label: "Lighthouse Scores" },
                { num: "2.1x", label: "Conversion Lift" },
                { num: "-40%", label: "Bounce Rate" },
                { num: "1.8s", label: "Load Time" },
              ].map((item, i) => (
                  <Reveal key={item.label} delay={i * 0.08}>
                    <div style={{ padding: 22, borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", textAlign: "center" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 28, color: "#FB923C", marginBottom: 8 }}>{item.num}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>{item.label}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-tools" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 20, textAlign: "center" }}>Web Stack</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {["React", "Vite", "Next.js", "Webflow", "Storyblok", "Sanity", "GA4", "Hotjar"].map(t => (
                    <span key={t} style={{ padding: "10px 18px", borderRadius: 999, background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.2)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.7)", fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="service-pricing" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24, textAlign: "center" }}>Website Engagements</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { name: "Launch", price: "From $8k", who: "New site build", items: ["Strategy + design", "Development", "Launch support"] },
                { name: "Growth", price: "From $15k", who: "Conversion optimization", items: ["CRO testing", "Performance fixes", "Analytics"] },
                { name: "Scale", price: "Custom", who: "Multi-site programs", items: ["Global rollouts", "Design system", "Ongoing optimization"] },
              ].map((item, idx) => (
                  <Reveal key={item.name} delay={idx * 0.08}>
                    <div style={{ borderRadius: 20, padding: 26, background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 10px 34px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 6, fontSize: 18 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 800, color: "#FB923C", marginBottom: 10 }}>{item.price}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 12 }}>{item.who}</div>
                      <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", lineHeight: 1.7 }}>
                        {item.items.map(i => <li key={i}>{i}</li>)}
                      </ul>
                      <button type="button" onClick={() => onSchedule?.()} style={{ display: "inline-block", marginTop: 16, color: "#0A2540", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Schedule a Meeting →</button>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "70px 5%", background: "linear-gradient(90deg, #1E1B4B, #1E293B)" }}>
          <Reveal>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.5px" }}>Ready to ship a site that sells?</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 15 }}>We can deliver a launch plan and timeline in under a week.</p>
              </div>
              <button type="button" onClick={() => onSchedule?.()} style={{ background: "linear-gradient(90deg, #FB923C, #3B82F6)", color: "#fff", textDecoration: "none", padding: "16px 32px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 32px rgba(251,146,60,0.4)", flexShrink: 0, border: "none", cursor: "pointer" }}>Schedule a Meeting →</button>
            </div>
          </Reveal>
        </section>
        <Contact theme={{
          sectionBg: "linear-gradient(180deg, #FDF7F0 0%, #EEF4FF 100%)",
          accent: "#FB923C",
          accentStrong: "#3B82F6",
          accentSoft: "rgba(251,146,60,0.12)",
          accentBorder: "rgba(251,146,60,0.28)",
          heading: "#0A2540",
          text: "rgba(10,37,64,0.55)"
        }} />
      </div>
  );
}

function CustomSoftwareService({ onBack, onSchedule }) {
  const heroScheme = {
    particleRGB: "245,158,11",
    blobs: [
      { w: 620, h: 620, top: "-26%", left: "-10%", c: "rgba(245,158,11,0.18)", a: 10 },
      { w: 420, h: 420, top: "56%", left: "62%", c: "rgba(16,185,129,0.2)", a: 13 },
      { w: 300, h: 300, top: "24%", left: "44%", c: "rgba(245,158,11,0.12)", a: 8 },
      { w: 220, h: 220, top: "70%", left: "12%", c: "rgba(16,185,129,0.1)", a: 11 },
    ],
  };

  return (
      <div>
        <section id="service-overview" style={{ padding: "140px 5% 80px", background: "radial-gradient(900px 600px at 12% -20%, rgba(245,158,11,0.28), transparent 60%), radial-gradient(900px 600px at 90% 10%, rgba(16,185,129,0.2), transparent 55%), linear-gradient(150deg, #111827 0%, #0F172A 50%, #1F2937 100%)", color: "#fff", position: "relative", overflow: "hidden" }}>
          <HeroBackdrop scheme={heroScheme} />
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <button type="button" onClick={onBack} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer", marginBottom: 20 }}>← Back to Home</button>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 style={{ fontSize: "clamp(36px, 5.5vw, 68px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, marginBottom: 16, letterSpacing: "-1px" }}>Custom Software Systems</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "clamp(16px, 2vw, 20px)", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", maxWidth: 640, lineHeight: 1.7 }}>
                Build reliable platforms, internal tools, and apps that scale with your growth.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
                <button type="button" onClick={() => onSchedule?.()} style={{ background: "linear-gradient(90deg, #F59E0B, #10B981)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 32px rgba(245,158,11,0.35)", border: "none", cursor: "pointer" }}>Schedule a Meeting</button>
                <a href="#service-offer" style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#fff", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>See what we build</a>
                <a href="#service-process" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", padding: "14px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>View process</a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
                {["Product discovery", "Scalable architecture", "DevOps", "Continuous delivery"].map(item => (
                    <span key={item} style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="service-offer" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFBF2 0%, #ECFDF5 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span style={{ color: "#F59E0B", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Capability</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginTop: 10 }}>End-to-End Product Delivery</h2>
              </div>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
              {[
                { title: "Discovery", desc: "Workshops, user research, roadmap." },
                { title: "Design", desc: "UX flows, UI systems, prototypes." },
                { title: "Build", desc: "Full-stack development, QA." },
                { title: "Scale", desc: "DevOps, monitoring, optimization." },
              ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div style={{ borderRadius: 18, padding: 22, background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 8px 28px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 10 }}>{item.title}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-services" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F1F7FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24, textAlign: "center" }}>Custom Software Services</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {[
                { name: "Product Discovery", inc: "Workshops, PRDs, roadmap", out: "Aligned product scope" },
                { name: "MVP Builds", inc: "Design, development, QA", out: "Launch-ready MVP" },
                { name: "Platform Engineering", inc: "APIs, microservices, infra", out: "Scalable architecture" },
                { name: "Data + Automation", inc: "Pipelines, integrations", out: "Operational efficiency" },
                { name: "DevOps + SRE", inc: "CI/CD, monitoring", out: "Reliable deployments" },
                { name: "Ongoing Support", inc: "Maintenance, improvements", out: "Stable product growth" },
              ].map((item, i) => (
                  <Reveal key={item.name} delay={i * 0.08}>
                    <div style={{ borderRadius: 20, padding: 22, background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 8px 28px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 10 }}>Includes: {item.inc}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)" }}>Outcome: {item.out}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-process" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #F6F9FF 0%, #EDF7F1 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span style={{ color: "#F59E0B", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase" }}>Process</span>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginTop: 10 }}>Discovery to Delivery</h2>
              </div>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
              {["Discover", "Design", "Build", "Ship", "Scale"].map((step, i) => (
                  <Reveal key={step} delay={i * 0.08}>
                    <div style={{ borderRadius: 16, padding: 20, background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 8px 24px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#F59E0B", marginBottom: 8 }}>0{i + 1}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540" }}>{step}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-cases" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #EFF7FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24, textAlign: "center" }}>Software That Moves the Needle</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {[
                { name: "Logistics Platform", lift: "42% faster dispatch", metric: "Realtime routing", focus: "System re-architecture" },
                { name: "Fintech Workflow", lift: "3x faster onboarding", metric: "Automated KYC", focus: "Process automation" },
                { name: "SaaS Modernization", lift: "2x release speed", metric: "CI/CD overhaul", focus: "DevOps and QA" },
              ].map((item, i) => (
                  <Reveal key={item.name} delay={i * 0.08}>
                    <div style={{ borderRadius: 20, padding: 24, background: "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 12px 32px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 8 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 10 }}>{item.focus}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#F59E0B", marginBottom: 6 }}>{item.lift}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)" }}>{item.metric}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-results" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #0A2540 0%, #071B39 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 24, textAlign: "center" }}>Delivery Metrics</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              {[
                { num: "2x", label: "Release Velocity" },
                { num: "-35%", label: "Operational Cost" },
                { num: "99.9%", label: "Uptime" },
                { num: "6-12", label: "Week MVP" },
              ].map((item, i) => (
                  <Reveal key={item.label} delay={i * 0.08}>
                    <div style={{ padding: 22, borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", textAlign: "center" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 28, color: "#F59E0B", marginBottom: 8 }}>{item.num}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>{item.label}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service-tools" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 20, textAlign: "center" }}>Engineering Stack</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {["Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS", "Docker", "Kubernetes", "GitHub Actions"].map(t => (
                    <span key={t} style={{ padding: "10px 18px", borderRadius: 999, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.7)", fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="service-pricing" style={{ padding: "90px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 24, textAlign: "center" }}>Software Engagements</h2>
            </Reveal>
            <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { name: "MVP", price: "From $18k", who: "Validate fast", items: ["Discovery sprint", "MVP build", "Launch support"] },
                { name: "Growth", price: "From $35k", who: "Scale features", items: ["Dedicated squad", "QA automation", "Monthly releases"] },
                { name: "Scale", price: "Custom", who: "Enterprise buildouts", items: ["Architecture overhaul", "Security reviews", "24/7 support"] },
              ].map((item, idx) => (
                  <Reveal key={item.name} delay={idx * 0.08}>
                    <div style={{ borderRadius: 20, padding: 26, background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,250,255,0.92) 100%)", border: "1.5px solid rgba(10,37,64,0.07)", boxShadow: "0 10px 34px rgba(10,37,64,0.08)" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 6, fontSize: 18 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 800, color: "#F59E0B", marginBottom: 10 }}>{item.price}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", marginBottom: 12 }}>{item.who}</div>
                      <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.6)", lineHeight: 1.7 }}>
                        {item.items.map(i => <li key={i}>{i}</li>)}
                      </ul>
                      <button type="button" onClick={() => onSchedule?.()} style={{ display: "inline-block", marginTop: 16, color: "#0A2540", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Schedule a Meeting →</button>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "70px 5%", background: "linear-gradient(90deg, #0F172A, #1F2937)" }}>
          <Reveal>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.5px" }}>Ready to build with confidence?</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 15 }}>We can scope your product and propose a roadmap in 10 days.</p>
              </div>
              <button type="button" onClick={() => onSchedule?.()} style={{ background: "linear-gradient(90deg, #F59E0B, #10B981)", color: "#fff", textDecoration: "none", padding: "16px 32px", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 32px rgba(245,158,11,0.4)", flexShrink: 0, border: "none", cursor: "pointer" }}>Schedule a Meeting →</button>
            </div>
          </Reveal>
        </section>
        <Contact theme={{
          sectionBg: "linear-gradient(180deg, #FFFBF2 0%, #ECFDF5 100%)",
          accent: "#F59E0B",
          accentStrong: "#10B981",
          accentSoft: "rgba(245,158,11,0.12)",
          accentBorder: "rgba(245,158,11,0.28)",
          heading: "#0A2540",
          text: "rgba(10,37,64,0.55)"
        }} />
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
    if (view !== "home") {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
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

  const openScheduler = () => setSchedulerOpen(true);
  const closeScheduler = () => setSchedulerOpen(false);
  const goService = (serviceId) => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setView(serviceId);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  return (
      <div>
        <Navbar
          isDetail={isDetail}
          onHome={goHome}
          onSchedule={openScheduler}
          onSelectService={goService}
          onFAQ={() => setView("faq")}
        />
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
          ) : view === "faq" ? (
              <FAQPage onBack={() => setView("home")} onSchedule={openScheduler} />
          ) : (
              <ServiceDetail serviceId={view} onBack={() => setView("home")} onSchedule={openScheduler} />
          )}
        </main>
        <SchedulerModal open={schedulerOpen} onClose={closeScheduler} />
        <Footer onNavigate={goHome} onSelectService={goService} onFAQ={() => setView("faq")} />
      </div>
  );
}
