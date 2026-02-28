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

function CustomSoftwareService({ onBack, onSchedule }) {
  const hoverCardStyle = {
    "--hover-shadow": "0 18px 44px rgba(245,158,11,0.18)",
    "--hover-border": "rgba(245,158,11,0.5)",
  };

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
      <ServiceHero
        scheme={heroScheme}
        background="radial-gradient(900px 600px at 12% -20%, rgba(245,158,11,0.28), transparent 60%), radial-gradient(900px 600px at 90% 10%, rgba(16,185,129,0.2), transparent 55%), linear-gradient(150deg, #111827 0%, #0F172A 50%, #1F2937 100%)"
        title="Custom Software Systems"
        subtitle="Reliable, scalable software products that support growth, security, and speed."
        onBack={onBack}
        onSchedule={onSchedule}
        primaryCta={{
          label: "Schedule a Meeting",
          gradient: "linear-gradient(90deg, #F59E0B, #10B981)",
          shadow: "0 0 32px rgba(245,158,11,0.35)",
        }}
        secondaryCtas={[
          { href: "#service-offer", label: "See what we build" },
          { href: "#service-process", label: "View process", variant: "ghost" },
        ]}
        tags={["Product strategy", "System architecture", "Secure delivery", "DevOps-ready"]}
      />

      <ServiceSection id="service-offer" background="linear-gradient(180deg, #FFFBF2 0%, #ECFDF5 100%)">
        <Reveal>
          <SectionHeading kicker="Capability" kickerColor="#F59E0B" title="End-to-End Product Delivery" />
        </Reveal>
        <ServiceGrid variant="auto">
          {[
            { title: "Product Strategy", desc: "Roadmaps, requirements, and system design aligned to growth." },
            { title: "Architecture", desc: "Scalable foundations with reliability, security, and performance." },
            { title: "Engineering", desc: "Full-stack delivery, QA, and release management." },
            { title: "Optimization", desc: "Monitoring, iteration, and long-term support." },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <ServiceCard className={layout.cardInteractive} style={hoverCardStyle} title={item.title} desc={item.desc} />
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-services" background="linear-gradient(180deg, #FFFFFF 0%, #F1F7FF 100%)">
        <Reveal>
          <SectionHeading title="Custom Software Services" />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { name: "MVP to Scale", inc: "Discovery, rapid prototyping, scaling", out: "Launch-ready product" },
            { name: "SaaS Platforms", inc: "Multi-tenant, billing, analytics", out: "Recurring revenue engine" },
            { name: "Internal Systems", inc: "Ops tooling, workflow automation", out: "Operational efficiency" },
            { name: "Integrations", inc: "APIs, webhooks, data sync", out: "Unified data stack" },
            { name: "Security Hardening", inc: "Threat modeling, audits, fixes", out: "Reduced risk" },
            { name: "DevOps & SRE", inc: "CI/CD, infra, monitoring", out: "Stable deployments" },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <ServiceCard
                className={layout.cardInteractive}
                style={hoverCardStyle}
                title={item.name}
                meta={`Includes: ${item.inc}`}
                desc={`Outcome: ${item.out}`}
              />
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-process" background="linear-gradient(180deg, #F6F9FF 0%, #EDF7F1 100%)">
        <Reveal>
          <SectionHeading kicker="Process" kickerColor="#F59E0B" title="Discovery to Delivery" />
        </Reveal>
        <ServiceGrid variant="auto">
          {["Discover", "Design", "Build", "Ship", "Optimize"].map((step, i) => (
            <Reveal key={step} delay={i * 0.08}>
              <ServiceCard
                className={`${layout.cardTight} ${layout.cardInteractive}`}
                title={`0${i + 1}`}
                desc={step}
                style={{ ...hoverCardStyle, "--title-color": "#F59E0B" }}
              />
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-cases" background="linear-gradient(180deg, #FFFFFF 0%, #EFF7FF 100%)">
        <Reveal>
          <SectionHeading title="Software That Moves the Needle" />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { name: "Orion SaaS", focus: "Platform rebuild", lift: "3x faster", metric: "Release velocity" },
            { name: "NovaPay", focus: "Infrastructure overhaul", lift: "99.99%", metric: "Uptime" },
            { name: "ShieldNet", focus: "Automation layer", lift: "-45%", metric: "Manual ops" },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <ServiceCard className={layout.cardInteractive} style={hoverCardStyle} title={item.name} meta={item.focus} accent="#F59E0B">
                <div className={layout.cardMetric} style={{ "--accent": "#F59E0B" }}>{item.lift}</div>
                <div className={layout.cardText}>{item.metric}</div>
              </ServiceCard>
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-results" background="linear-gradient(180deg, #0A2540 0%, #071B39 100%)">
        <Reveal>
          <SectionHeading title="Delivery Metrics" titleColor="#fff" />
        </Reveal>
        <ServiceGrid variant="auto">
          {[
            { num: "4x", label: "Release Speed" },
            { num: "98%", label: "Reliability Score" },
            { num: "90d", label: "MVP Timeline" },
          ].map((item) => (
            <StatCard key={item.label} value={item.num} label={item.label} accent="#F59E0B" />
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-tools" background="linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)">
        <Reveal>
          <SectionHeading title="Engineering Stack" />
        </Reveal>
        <PillRow
          items={["Node", "Python", "Postgres", "AWS", "Kubernetes", "Terraform"]}
          pillBg="rgba(245,158,11,0.08)"
          pillBorder="rgba(245,158,11,0.2)"
        />
      </ServiceSection>

      <ServiceSection id="service-pricing" background="linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)">
        <Reveal>
          <SectionHeading title="Software Engagements" />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { name: "MVP", price: "$10k+", who: "Startups", items: ["Discovery sprint", "MVP build", "Launch support"] },
            { name: "Growth", price: "$25k+", who: "Scaleups", items: ["Feature velocity", "DevOps", "Security reviews"] },
            { name: "Scale", price: "Custom", who: "Enterprise buildouts", items: ["Architecture overhaul", "Security reviews", "24/7 support"] },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <ServiceCard className={layout.cardInteractive} style={hoverCardStyle} title={item.name} accent="#F59E0B">
                <div className={layout.price} style={{ "--accent": "#F59E0B" }}>{item.price}</div>
                <div className={layout.cardText} style={{ marginBottom: 12 }}>{item.who}</div>
                <ul className={layout.list}>
                  {item.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
                <button type="button" onClick={() => onSchedule?.()} className={layout.linkButton}>Schedule a Meeting →</button>
              </ServiceCard>
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <CTASection
        background="linear-gradient(90deg, #0F172A, #1F2937)"
        title="Ready to build with confidence?"
        text="We can scope your product and propose a roadmap in 10 days."
        accentShadow="0 0 32px rgba(245,158,11,0.4)"
        button={{
          label: "Schedule a Meeting →",
          gradient: "linear-gradient(90deg, #F59E0B, #10B981)",
          onClick: () => onSchedule?.(),
        }}
      />

      <Contact
        theme={{
          sectionBg: "linear-gradient(180deg, #F7FAFC 0%, #ECF4FF 100%)",
          accent: "#F59E0B",
          accentStrong: "#10B981",
          accentSoft: "rgba(245,158,11,0.08)",
          accentBorder: "rgba(245,158,11,0.2)",
          heading: "#0A2540",
          text: "rgba(10,37,64,0.55)",
        }}
      />
    </div>
  );
}

export default CustomSoftwareService;
