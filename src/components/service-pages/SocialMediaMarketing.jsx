import Reveal from "../common/Reveal";
import Contact from "../sections/Contact";
import HeroBackdrop from "./HeroBackdrop";

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


export default SocialMediaMarketing;
