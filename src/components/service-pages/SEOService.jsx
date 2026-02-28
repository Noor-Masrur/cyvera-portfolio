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

function SEOService({ onBack, onSchedule }) {
  const hoverCardStyle = {
    "--hover-shadow": "0 18px 44px rgba(34,197,94,0.18)",
    "--hover-border": "rgba(34,197,94,0.5)",
  };

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
      <ServiceHero
        scheme={heroScheme}
        background="radial-gradient(900px 600px at 12% -20%, rgba(34,197,94,0.35), transparent 60%), radial-gradient(900px 600px at 88% 10%, rgba(14,165,233,0.2), transparent 55%), linear-gradient(150deg, #06283D 0%, #0B1F2E 50%, #0A2F4A 100%)"
        title="SEO That Compounds"
        subtitle="Technical excellence, content systems, and authority building that turn rankings into revenue."
        onBack={onBack}
        onSchedule={onSchedule}
        primaryCta={{
          label: "Schedule a Meeting",
          gradient: "linear-gradient(90deg, #22C55E, #0EA5E9)",
          shadow: "0 0 32px rgba(34,197,94,0.35)",
        }}
        secondaryCtas={[
          { href: "#service-pillars", label: "See the pillars" },
          { href: "#service-process", label: "View process", variant: "ghost" },
        ]}
        tags={["Technical audit", "Content roadmap", "Authority growth", "Transparent reporting"]}
      />

      <ServiceSection id="service-pillars" background="linear-gradient(180deg, #F6FBFF 0%, #ECF6F1 100%)">
        <Reveal>
          <SectionHeading
            kicker="Pillars"
            kickerColor="#22C55E"
            title="A Full-Stack SEO System"
            subtitle="We align technical foundations, content production, and authority signals to create long-term growth."
          />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { title: "Technical SEO", desc: "Crawlability, indexation, Core Web Vitals, and structured data fixes." },
            { title: "Content & Topics", desc: "Keyword research, content clusters, briefs, and on-page optimization." },
            { title: "Authority Building", desc: "Digital PR, link reclamation, and editorial outreach." },
            { title: "Local + Global", desc: "Local SEO, international targeting, and multi-region performance." },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <ServiceCard className={layout.cardInteractive} style={hoverCardStyle} title={item.title} desc={item.desc} />
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-services" background="linear-gradient(180deg, #FFFFFF 0%, #F1F7FF 100%)">
        <Reveal>
          <SectionHeading title="Core SEO Services" />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { name: "Technical Audit + Fixes", inc: "Crawl diagnostics, CWV, schema, index control", out: "Healthy, crawlable site" },
            { name: "Content Strategy", inc: "Topic modeling, briefs, on-page optimization", out: "Ranked content that converts" },
            { name: "Authority Growth", inc: "Digital PR, link outreach, reclaim", out: "Stronger domain authority" },
            { name: "Local SEO", inc: "GBP optimization, citations, reviews", out: "Local visibility lift" },
            { name: "International SEO", inc: "Hreflang, regional architecture", out: "Global reach without cannibalization" },
            { name: "Analytics + Reporting", inc: "GA4, GSC, KPI dashboards", out: "Clear growth visibility" },
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
          <SectionHeading kicker="Process" kickerColor="#22C55E" title="From Audit to Compounding Growth" />
        </Reveal>
        <ServiceGrid variant="auto">
          {["Discover", "Strategize", "Optimize", "Scale", "Report"].map((step, i) => (
            <Reveal key={step} delay={i * 0.08}>
              <ServiceCard
                className={`${layout.cardTight} ${layout.cardInteractive}`}
                title={`0${i + 1}`}
                desc={step}
                style={{ ...hoverCardStyle, "--title-color": "#22C55E" }}
              />
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-cases" background="linear-gradient(180deg, #FFFFFF 0%, #EFF7FF 100%)">
        <Reveal>
          <SectionHeading title="SEO Wins That Compound" />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { name: "NovaPay", focus: "Technical rebuild + content", lift: "+140% organic", metric: "12-month growth" },
            { name: "Zenith Digital", focus: "Local + authority lift", lift: "+220% traffic", metric: "6-month lift" },
            { name: "Orion Labs", focus: "Content clusters", lift: "+4.3x pipeline", metric: "Organic revenue" },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <ServiceCard className={layout.cardInteractive} style={hoverCardStyle} title={item.name} meta={item.focus} accent="#22C55E">
                <div className={layout.cardMetric} style={{ "--accent": "#22C55E" }}>{item.lift}</div>
                <div className={layout.cardText}>{item.metric}</div>
              </ServiceCard>
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-results" background="linear-gradient(180deg, #0A2540 0%, #071B39 100%)">
        <Reveal>
          <SectionHeading title="Performance Snapshot" titleColor="#fff" />
        </Reveal>
        <ServiceGrid variant="auto">
          {[
            { num: "3.8x", label: "Pipeline Growth" },
            { num: "+72%", label: "Keyword Visibility" },
            { num: "5.2x", label: "Content ROI" },
          ].map((item) => (
            <StatCard key={item.label} value={item.num} label={item.label} accent="#22C55E" />
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-tools" background="linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)">
        <Reveal>
          <SectionHeading title="SEO Tool Stack" />
        </Reveal>
        <PillRow
          items={["GA4", "Search Console", "Ahrefs", "Surfer", "Looker Studio", "Screaming Frog"]}
          pillBg="rgba(34,197,94,0.08)"
          pillBorder="rgba(34,197,94,0.2)"
        />
      </ServiceSection>

      <ServiceSection id="service-pricing" background="linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)">
        <Reveal>
          <SectionHeading title="SEO Engagements" />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { name: "Launch", price: "$2.5k/mo", who: "Startups & local", items: ["Audit + fixes", "Content plan", "Reporting"] },
            { name: "Growth", price: "$5k/mo", who: "Scaling teams", items: ["Content production", "Digital PR", "Conversion lift"] },
            { name: "Scale", price: "Custom", who: "Enterprise", items: ["International SEO", "Advanced PR", "Dedicated team"] },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <ServiceCard className={layout.cardInteractive} style={hoverCardStyle} title={item.name} accent="#22C55E">
                <div className={layout.price} style={{ "--accent": "#22C55E" }}>{item.price}</div>
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
        background="linear-gradient(90deg, #0B1F2E, #0A2F4A)"
        title="Ready to turn rankings into revenue?"
        text="Get a technical audit and growth roadmap within two weeks."
        accentShadow="0 0 32px rgba(34,197,94,0.4)"
        button={{
          label: "Schedule a Meeting →",
          gradient: "linear-gradient(90deg, #22C55E, #0EA5E9)",
          onClick: () => onSchedule?.(),
        }}
      />

      <Contact
        theme={{
          sectionBg: "linear-gradient(180deg, #F7FAFC 0%, #ECF4FF 100%)",
          accent: "#22C55E",
          accentStrong: "#0EA5E9",
          accentSoft: "rgba(34,197,94,0.08)",
          accentBorder: "rgba(34,197,94,0.2)",
          heading: "#0A2540",
          text: "rgba(10,37,64,0.55)",
        }}
      />
    </div>
  );
}

export default SEOService;
