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
      <ServiceHero
        scheme={heroScheme}
        background="radial-gradient(900px 600px at 15% -20%, rgba(45,212,191,0.25), transparent 60%), radial-gradient(900px 600px at 85% 0%, rgba(59,130,246,0.2), transparent 55%), linear-gradient(150deg, #071724 0%, #0B2238 55%, #0B2D4B 100%)"
        title="Security That Builds Trust"
        subtitle="Zero-trust security programs that combine offensive testing, resilient architecture, and 24/7 monitoring."
        onBack={onBack}
        onSchedule={onSchedule}
        primaryCta={{
          label: "Schedule a Meeting",
          gradient: "linear-gradient(90deg, #2DD4BF, #3B82F6)",
          shadow: "0 0 32px rgba(45,212,191,0.35)",
        }}
        secondaryCtas={[
          { href: "#service-defend", label: "See the defenses" },
          { href: "#service-process", label: "View process", variant: "ghost" },
        ]}
        tags={["Penetration testing", "Incident response", "DevSecOps", "24/7 SOC", "Zero Trust"]}
      />

      <ServiceSection id="service-defend" background="linear-gradient(180deg, #F5FAFF 0%, #ECF7F5 100%)">
        <Reveal>
          <SectionHeading kicker="Capabilities" kickerColor="#2DD4BF" title="Core Cybersecurity Capabilities" />
        </Reveal>
        <ServiceGrid cols={3}>
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
              <ServiceCard className={layout.cardStretch} title={item.title} desc={item.desc} />
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-services" background="linear-gradient(180deg, #FFFFFF 0%, #F1F7FF 100%)">
        <Reveal>
          <SectionHeading title="Security Architecture" />
        </Reveal>
        <ServiceGrid cols={2}>
          {[
            { name: "Zero Trust Architecture (ZTA)", inc: "Identity-first access, continuous verification", out: "Reduced lateral movement" },
            { name: "Defense-in-Depth Architecture", inc: "Layered controls across network, app, and data", out: "Resilient security posture" },
            { name: "Secure Cloud Architecture", inc: "Hardened cloud baselines and monitoring", out: "Confident cloud operations" },
            { name: "DevSecOps Architecture", inc: "Security gates and policy-as-code", out: "Faster, safer releases" },
          ].map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <ServiceCard title={item.name} meta={`Includes: ${item.inc}`} desc={`Outcome: ${item.out}`} />
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-process" background="linear-gradient(180deg, #F6F9FF 0%, #EDF7F1 100%)">
        <Reveal>
          <SectionHeading kicker="Team" kickerColor="#2DD4BF" title="Core Team Structure" />
        </Reveal>
        <ServiceGrid variant="auto">
          {[
            { title: "Offensive Security", desc: "Red Team testing and adversary emulation." },
            { title: "Defensive Security", desc: "Blue Team / SOC detection and response." },
            { title: "DevSecOps & Secure Engineering", desc: "Secure build pipelines and code hardening." },
          ].map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <ServiceCard
                className={layout.cardTight}
                title={`0${i + 1}`}
                desc={`${step.title} — ${step.desc}`}
                style={{ "--title-color": "#2DD4BF" }}
              />
            </Reveal>
          ))}
        </ServiceGrid>
      </ServiceSection>

      <ServiceSection id="service-tools" background="linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)">
        <Reveal>
          <SectionHeading title="Security Tooling" />
        </Reveal>
        <PillRow
          items={["Burp Suite", "Metasploit", "Nessus", "OWASP ZAP", "Nmap", "Wireshark"]}
          pillBg="rgba(45,212,191,0.08)"
          pillBorder="rgba(45,212,191,0.2)"
        />
      </ServiceSection>

      <ServiceSection id="service-pricing" background="linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 100%)">
        <Reveal>
          <SectionHeading title="Recent Work" subtitle="Anti-Cloneable NFC/RFID Technology (USPTO, 63/792,437)" />
        </Reveal>
        <ServiceGrid cols={3}>
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
              ],
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
              ],
            },
            {
              name: "Cloning Protection",
              price: "Patented security model",
              who: "Device-level enforcement",
              items: [
                "Communication only with authorized devices",
                "Instant rejection of unknown readers",
                "Impossible to duplicate without matching hardware",
              ],
            },
          ].map((item, idx) => (
            <Reveal key={item.name} delay={idx * 0.08}>
              <ServiceCard title={item.name} accent="#2DD4BF">
                <div className={layout.price} style={{ "--accent": "#2DD4BF", fontSize: 16 }}>{item.price}</div>
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
        background="linear-gradient(90deg, #0B2238, #0B2D4B)"
        title="Ready to reduce risk fast?"
        text="Get a security posture review and a prioritized remediation plan."
        accentShadow="0 0 32px rgba(45,212,191,0.4)"
        button={{
          label: "Schedule a Meeting →",
          gradient: "linear-gradient(90deg, #2DD4BF, #3B82F6)",
          onClick: () => onSchedule?.(),
        }}
      />

      <Contact
        theme={{
          sectionBg: "linear-gradient(180deg, #F5FAFF 0%, #ECF7F5 100%)",
          accent: "#2DD4BF",
          accentStrong: "#3B82F6",
          accentSoft: "rgba(45,212,191,0.12)",
          accentBorder: "rgba(45,212,191,0.28)",
          heading: "#0A2540",
          text: "rgba(10,37,64,0.55)",
        }}
      />
    </div>
  );
}

export default CybersecurityService;
