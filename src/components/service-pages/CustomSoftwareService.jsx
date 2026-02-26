import Reveal from "../common/Reveal";
import Contact from "../sections/Contact";
import HeroBackdrop from "./HeroBackdrop";

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


export default CustomSoftwareService;
