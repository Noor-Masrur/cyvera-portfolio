import Reveal from "../common/Reveal";
import Contact from "../sections/Contact";
import {
  ServiceHero,
  ServiceSection,
  SectionHeading,
  ServiceGrid,
  ServiceCard,
  StatCard,
  PillRow,
  CTASection,
} from "./ServicePageLayout";
import layout from "./ServicePageLayout.module.css";

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
      <ServiceHero
        scheme={heroScheme}
        background="radial-gradient(1200px 700px at 10% -10%, rgba(0,180,216,0.45), transparent 60%), radial-gradient(900px 600px at 90% 20%, rgba(72,202,228,0.25), transparent 55%), linear-gradient(160deg, #03045E 0%, #0A2540 48%, #023E8A 100%)"
        title="Turn Attention Into Revenue"
        subtitle="Data-driven social media growth for modern brands. We build the strategy, creative system, and performance engine that converts attention into pipeline."
        onBack={onBack}
        onSchedule={onSchedule}
        primaryCta={{
          label: "Schedule a Meeting",
          gradient: "linear-gradient(90deg, #00B4D8, #0077B6)",
          shadow: "0 0 32px rgba(0,180,216,0.5)",
        }}
        secondaryCtas={[
          { href: "#service-services", label: "Explore Services" },
          { href: "#service-method", label: "View Approach", variant: "ghost" },
        ]}
        tags={["Positioning-first strategy", "Performance creative testing", "Weekly reporting", "Founder-led oversight"]}
      />

      <ServiceSection id="service-problem" background="linear-gradient(180deg, #F7FAFC 0%, #ECF4FF 100%)">
        <Reveal>
          <SectionHeading kicker="Problem to Solution" kickerColor="#00B4D8" title="We Fix the Gaps That Stall Growth" />
        </Reveal>
        <ServiceGrid cols={2}>
          {[
            { problem: "Low engagement and weak brand recall", solution: "Positioning clarity, content pillars, and story-driven creative." },
            { problem: "Inconsistent visual and messaging standards", solution: "Brand system + content templates for repeatable execution." },
            { problem: "Poor ROAS and ad fatigue", solution: "Full-funnel Meta and TikTok ads with A/B creative testing." },
            { problem: "No clear strategy or reporting cadence", solution: "Monthly strategy, weekly reporting, and KPI dashboards." },
          ].map((item, i) => (
            <Reveal key={item.problem} delay={i * 0.08}>
              <ServiceCard
                className={layout.cardInteractive}
                title="Problem"
                desc={item.problem}
                style={{
                  "--hover-shadow": "0 18px 44px rgba(0,180,216,0.18)",
                  "--hover-border": "rgba(0,180,216,0.5)",
                }}
              >
                <div className={layout.cardTitle} style={{ color: "#00B4D8", marginTop: 14 }}>Solution</div>
                <div className={layout.cardText}>{item.solution}</div>
              </ServiceCard>
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-services" background="linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)">
        <Reveal>
          <SectionHeading
            kicker="Services"
            kickerColor="#00B4D8"
            title="Structured, Tiered Services"
            subtitle="Each service lists scope, outcomes, and platforms so you know exactly what you are getting."
          />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { name: "Social Media Strategy", inc: "Positioning, content pillars, channel mix", out: "Clarity on what to say and where", tools: "Notion, GA4, Meta Insights" },
            { name: "Content Creation", inc: "Creative direction, production, editing", out: "Consistent, high-quality content", tools: "Adobe Suite, Canva" },
            { name: "Paid Ads Management", inc: "Campaign setup, A/B testing, optimization", out: "Improved ROAS and CPL", tools: "Meta Ads, TikTok Ads" },
            { name: "Influencer Campaigns", inc: "Creator sourcing, briefs, contracts", out: "Earned trust and reach", tools: "CreatorIQ, GRIN" },
            { name: "Community Management", inc: "Engagement workflows, moderation", out: "Higher retention and loyalty", tools: "Sprout Social" },
            { name: "Analytics & Reporting", inc: "Dashboards, KPIs, insights", out: "Transparent growth reporting", tools: "Looker Studio" },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <ServiceCard className={layout.cardInteractive} title={item.name} meta={`Includes: ${item.inc}`} desc={`Outcome: ${item.out}`}>
                <div className={layout.cardText} style={{ fontSize: 12 }}>Tools: {item.tools}</div>
              </ServiceCard>
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-method" background="linear-gradient(180deg, #F6F9FF 0%, #EDF3FF 100%)">
        <Reveal>
          <SectionHeading kicker="Framework" kickerColor="#00B4D8" title="The Momentum Framework" />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { step: "Discover", desc: "Audit channels, audience, and competitors to identify leverage." },
            { step: "Strategize", desc: "Define positioning, content pillars, and KPIs." },
            { step: "Create", desc: "Design a repeatable content system and creative library." },
            { step: "Launch", desc: "Ship campaigns across priority channels with structured testing." },
            { step: "Optimize", desc: "Weekly reporting, iteration, and performance improvements." },
            { step: "Scale", desc: "Double down on what works and expand to new channels." },
          ].map((item, i) => (
            <Reveal key={item.step} delay={i * 0.08}>
              <ServiceCard
                className={layout.cardInteractive}
                title={item.step}
                desc={item.desc}
                style={{
                  "--hover-shadow": "0 18px 44px rgba(0,180,216,0.18)",
                  "--hover-border": "rgba(0,180,216,0.5)",
                }}
              />
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-cases" background="linear-gradient(180deg, #FFFFFF 0%, #EFF5FF 100%)">
        <Reveal>
          <SectionHeading
            kicker="Case Studies"
            kickerColor="#00B4D8"
            title="Proof of Profit, Not Just Posts"
            subtitle="We show revenue impact, not vanity metrics. Each engagement ties creative output to pipeline growth."
          />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { name: "DTC Launch Sprint", tag: "E‑commerce", uplift: "+$180k revenue", metric: "3.2x ROAS", timeline: "90 days", problem: "Low engagement on launch posts", strategy: "Positioning refresh + creator collabs + paid boosts" },
            { name: "SaaS Waitlist Engine", tag: "B2B SaaS", uplift: "+420 leads", metric: "2.8x CTR", timeline: "60 days", problem: "Low CTR + unclear positioning", strategy: "New creative angles + offer testing + funnel rebuild" },
            { name: "Creator Flywheel", tag: "Lifestyle", uplift: "+$74k pipeline", metric: "32% lead conversion", timeline: "75 days", problem: "Weak trust signals", strategy: "Micro‑influencer rollout + UGC system" },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <ServiceCard
                className={layout.cardInteractive}
                style={{
                  "--hover-shadow": "0 18px 44px rgba(0,180,216,0.18)",
                  "--hover-border": "rgba(0,180,216,0.5)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div className={layout.cardTitle}>{item.name}</div>
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
                <div className={layout.cardText} style={{ marginBottom: 12 }}>
                  Timeline: <span style={{ fontWeight: 700, color: "#0A2540" }}>{item.timeline}</span>
                </div>
                <div className={layout.cardText} style={{ marginBottom: 8 }}>Problem: {item.problem}</div>
                <div className={layout.cardText}>Strategy: {item.strategy}</div>
              </ServiceCard>
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-results" background="linear-gradient(180deg, #0A2540 0%, #071B39 100%)">
        <Reveal>
          <SectionHeading title="Results Dashboard" titleColor="#fff" />
        </Reveal>
        <ServiceGrid variant="auto">
          {[
            { num: "+180%", label: "Engagement Growth" },
            { num: "2.6x", label: "CTR Improvement" },
            { num: "34%", label: "Follower Growth" },
            { num: "3.2x", label: "ROAS Lift" },
          ].map((item) => (
            <StatCard key={item.label} value={item.num} label={item.label} accent="#00B4D8" />
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-pricing" background="linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)">
        <Reveal>
          <SectionHeading title="Transparent Pricing" />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { name: "Starter", price: "From $1.5k/mo", who: "Early-stage brands", items: ["Strategy + content plan", "8 posts/mo", "Monthly reporting"] },
            { name: "Growth", price: "From $3.5k/mo", who: "Scaling teams", items: ["Full content production", "Paid ads management", "Weekly reporting"] },
            { name: "Scale", price: "From $7k/mo", who: "Multi-channel brands", items: ["Influencers + UGC", "Advanced testing", "Dedicated strategist"] },
          ].map((item, idx) => (
            <Reveal key={item.name} delay={idx * 0.08}>
              <ServiceCard
                className={layout.cardInteractive}
                style={{
                  background: idx === 1 ? "linear-gradient(160deg, #0A2540, #023E8A)" : undefined,
                  border: idx === 1 ? "1.5px solid rgba(0,180,216,0.4)" : undefined,
                  boxShadow: idx === 1 ? "0 20px 50px rgba(0,180,216,0.25)" : undefined,
                }}
              >
                {idx === 1 && (
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#00B4D8", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>
                    MOST POPULAR
                  </div>
                )}
                <div className={layout.cardTitle} style={{ color: idx === 1 ? "#fff" : "#0A2540" }}>{item.name}</div>
                <div className={layout.price} style={{ "--accent": "#00B4D8" }}>{item.price}</div>
                <div className={layout.cardText} style={{ color: idx === 1 ? "rgba(255,255,255,0.6)" : "rgba(10,37,64,0.6)", marginBottom: 12 }}>
                  Ideal for: {item.who}
                </div>
                <ul className={layout.list} style={{ color: idx === 1 ? "rgba(255,255,255,0.7)" : "rgba(10,37,64,0.6)" }}>
                  {item.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
                <button type="button" onClick={() => onSchedule?.()} className={layout.linkButton} style={{ color: idx === 1 ? "#00B4D8" : "#0A2540" }}>
                  Schedule a Meeting →
                </button>
              </ServiceCard>
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-about" background="linear-gradient(180deg, #F7FAFC 0%, #EEF4FF 100%)">
        <div className={layout.twoCol}>
          <Reveal>
            <div>
              <span className={layout.kicker} style={{ "--kicker-color": "#00B4D8" }}>Founder-Led</span>
              <h2 className={layout.title} style={{ marginTop: 12 }}>Built by Strategists, Not Just Executors</h2>
              <p className={layout.cardText} style={{ marginTop: 12 }}>
                We are a founder-led team with a bias for strategy. Every engagement starts with positioning and ends with measurable revenue impact.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ServiceCard>
              <div className={layout.cardTitle}>Why teams choose us</div>
              <ul className={layout.list}>
                {["Clear positioning and messaging", "Documented strategy and process", "Accountability through reporting", "Fast execution cycles"].map((i) => <li key={i}>{i}</li>)}
              </ul>
            </ServiceCard>
          </Reveal>
        </div>
      </ServiceSection>

      <ServiceSection id="service-tools" background="linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)">
        <Reveal>
          <SectionHeading title="Tech & Tools Stack" />
        </Reveal>
        <PillRow
          items={["Meta Business Suite", "GA4", "TikTok Ads Manager", "SEMrush", "Canva", "Adobe Suite", "HubSpot", "Sprout Social"]}
          pillBg="rgba(0,180,216,0.08)"
          pillBorder="rgba(0,180,216,0.2)"
        />
      </ServiceSection>

      <ServiceSection id="service-testimonials" background="linear-gradient(180deg, #0A2540 0%, #071B39 100%)">
        <Reveal>
          <SectionHeading title="Early Client Feedback" titleColor="#fff" />
        </Reveal>
        <ServiceGrid cols={2}>
          {[
            { name: "Alicia M., DTC Founder", quote: "They gave us a real strategy and execution system. Engagement jumped in weeks." },
            { name: "Rahul K., SaaS Marketer", quote: "The reporting cadence and creative testing were what we needed to scale." },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <div className={layout.darkCard}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: 16, fontSize: 15, fontStyle: "italic" }}>
                  "{item.quote}"
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#00B4D8" }}>{item.name}</div>
              </div>
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-insights" background="linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)">
        <Reveal>
          <SectionHeading title="Insights & Education" />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { title: "How to build a content system that scales", tag: "Strategy" },
            { title: "Creative testing frameworks for Meta Ads", tag: "Paid Media" },
            { title: "What to measure in the first 30 days", tag: "Analytics" },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <ServiceCard
                className={layout.cardInteractive}
                style={{
                  "--hover-shadow": "0 18px 44px rgba(0,180,216,0.18)",
                  "--hover-border": "rgba(0,180,216,0.5)",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#00B4D8", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>
                  {item.tag}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", lineHeight: 1.6 }}>
                  {item.title}
                </div>
              </ServiceCard>
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <CTASection
        background="linear-gradient(90deg, #03045E, #0A2540)"
        title="Ready to build a real growth engine?"
        text="Book a consultation and we will outline a 90-day plan at no cost."
        accentShadow="0 0 32px rgba(0,180,216,0.5)"
        button={{
          label: "Schedule a Meeting →",
          gradient: "linear-gradient(90deg, #00B4D8, #0077B6)",
          onClick: () => onSchedule?.(),
        }}
        showPattern
      />

      <Contact
        theme={{
          sectionBg: "linear-gradient(180deg, #F7FAFC 0%, #ECF4FF 100%)",
          accent: "#00B4D8",
          accentStrong: "#0077B6",
          accentSoft: "rgba(0,180,216,0.08)",
          accentBorder: "rgba(0,180,216,0.2)",
          heading: "#0A2540",
          text: "rgba(10,37,64,0.55)",
        }}
      />
    </div>
  );
}

export default SocialMediaMarketing;
