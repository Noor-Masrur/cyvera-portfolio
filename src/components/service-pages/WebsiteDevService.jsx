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
      <ServiceHero
        scheme={heroScheme}
        background="radial-gradient(900px 600px at 10% -20%, rgba(251,146,60,0.3), transparent 60%), radial-gradient(900px 600px at 90% 10%, rgba(59,130,246,0.2), transparent 55%), linear-gradient(150deg, #2A103B 0%, #1E1B4B 52%, #1E293B 100%)"
        title="Websites That Convert"
        subtitle="High-performance marketing sites that pair brand storytelling with conversion-focused UX."
        onBack={onBack}
        onSchedule={onSchedule}
        primaryCta={{
          label: "Schedule a Meeting",
          gradient: "linear-gradient(90deg, #FB923C, #3B82F6)",
          shadow: "0 0 32px rgba(251,146,60,0.35)",
        }}
        secondaryCtas={[
          { href: "#service-offer", label: "See what we build" },
          { href: "#service-process", label: "View process", variant: "ghost" },
        ]}
        tags={["UX strategy", "Brand design", "Performance engineering", "SEO ready"]}
      />

      <ServiceSection id="service-offer" background="linear-gradient(180deg, #FDF7F0 0%, #EEF4FF 100%)">
        <Reveal>
          <SectionHeading kicker="Offer" kickerColor="#FB923C" title="Strategy, Design, Build, Optimize" />
        </Reveal>
        <ServiceGrid variant="auto">
          {[
            { title: "UX + CRO", desc: "Journey mapping, wireframes, conversion testing." },
            { title: "Visual Design", desc: "Brand system, UI kit, storytelling." },
            { title: "Development", desc: "Modern stacks, CMS builds, integrations." },
            { title: "Performance", desc: "Core Web Vitals, SEO, analytics." },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <ServiceCard title={item.title} desc={item.desc} />
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-services" background="linear-gradient(180deg, #FFFFFF 0%, #F1F7FF 100%)">
        <Reveal>
          <SectionHeading title="Web Development Services" />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { name: "Marketing Websites", inc: "Copy, design, build", out: "Launch-ready site" },
            { name: "Ecommerce", inc: "Storefronts, checkout, integrations", out: "Higher conversion rate" },
            { name: "CMS Builds", inc: "Custom CMS, content workflows", out: "Fast content updates" },
            { name: "Landing Pages", inc: "Campaign pages, A/B testing", out: "Better ROAS" },
            { name: "Performance Tune-ups", inc: "CWV, accessibility, SEO", out: "Improved rankings" },
            { name: "Analytics Setup", inc: "GA4, tag manager, dashboards", out: "Measurable growth" },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <ServiceCard title={item.name} meta={`Includes: ${item.inc}`} desc={`Outcome: ${item.out}`} />
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-process" background="linear-gradient(180deg, #F6F9FF 0%, #EDF7F1 100%)">
        <Reveal>
          <SectionHeading kicker="Process" kickerColor="#FB923C" title="From Strategy to Launch" />
        </Reveal>
        <ServiceGrid variant="auto">
          {["Discover", "Design", "Build", "Launch", "Optimize"].map((step, i) => (
            <Reveal key={step} delay={i * 0.08}>
              <ServiceCard
                className={layout.cardTight}
                title={`0${i + 1}`}
                desc={step}
                style={{ "--title-color": "#FB923C" }}
              />
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-cases" background="linear-gradient(180deg, #FFFFFF 0%, #EFF7FF 100%)">
        <Reveal>
          <SectionHeading title="Websites That Perform" />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { name: "NovaPay", focus: "Rebrand + conversion UX", lift: "+3.2x demo rate", metric: "12-week lift" },
            { name: "Orion Labs", focus: "Performance rebuild", lift: "-68% load time", metric: "CWV score" },
            { name: "Zenith Digital", focus: "Landing page system", lift: "+42% ROAS", metric: "Paid conversion" },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <ServiceCard title={item.name} meta={item.focus} accent="#FB923C">
                <div className={layout.cardMetric} style={{ "--accent": "#FB923C" }}>{item.lift}</div>
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
            { num: "3.2x", label: "Conversion Lift" },
            { num: "92+", label: "Lighthouse Scores" },
            { num: "6-8w", label: "Launch Timeline" },
          ].map((item) => (
            <StatCard key={item.label} value={item.num} label={item.label} accent="#FB923C" />
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-tools" background="linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)">
        <Reveal>
          <SectionHeading title="Build Stack" />
        </Reveal>
        <PillRow
          items={["React", "Next.js", "Webflow", "Framer", "Shopify", "Vercel"]}
          pillBg="rgba(251,146,60,0.08)"
          pillBorder="rgba(251,146,60,0.2)"
        />
      </ServiceSection>

      <ServiceSection id="service-pricing" background="linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)">
        <Reveal>
          <SectionHeading title="Website Engagements" />
        </Reveal>
        <ServiceGrid cols={3}>
          {[
            { name: "Launch", price: "$5k+", who: "Startups & SMB", items: ["Strategy + design", "Build + launch", "Analytics"] },
            { name: "Growth", price: "$10k+", who: "Scaling teams", items: ["CRO testing", "Performance tune", "Content system"] },
            { name: "Scale", price: "Custom", who: "Enterprise", items: ["Multi-site systems", "Integrations", "Dedicated team"] },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <ServiceCard title={item.name} accent="#FB923C">
                <div className={layout.price} style={{ "--accent": "#FB923C" }}>{item.price}</div>
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
        title="Ready to build a website that converts?"
        text="Launch a conversion-focused site with performance baked in."
        accentShadow="0 0 32px rgba(251,146,60,0.4)"
        button={{
          label: "Schedule a Meeting →",
          gradient: "linear-gradient(90deg, #FB923C, #3B82F6)",
          onClick: () => onSchedule?.(),
        }}
      />

      <Contact
        theme={{
          sectionBg: "linear-gradient(180deg, #F7FAFC 0%, #ECF4FF 100%)",
          accent: "#FB923C",
          accentStrong: "#3B82F6",
          accentSoft: "rgba(251,146,60,0.08)",
          accentBorder: "rgba(251,146,60,0.2)",
          heading: "#0A2540",
          text: "rgba(10,37,64,0.55)",
        }}
      />
    </div>
  );
}

export default WebsiteDevService;
