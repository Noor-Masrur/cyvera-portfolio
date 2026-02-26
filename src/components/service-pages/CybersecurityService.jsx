import Reveal from "../common/Reveal";
import Contact from "../sections/Contact";
import HeroBackdrop from "./HeroBackdrop";

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


export default CybersecurityService;
