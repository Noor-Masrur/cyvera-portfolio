import Reveal from "../common/Reveal";
import { steps } from "../../data/siteData";

function Process() {
  return (
      <section style={{ padding: "120px 5%", background: "linear-gradient(180deg, #F4F9FF 0%, #E8F0FF 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,180,216,0.3), transparent)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16, justifyContent: "center" }}>
                <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, transparent, #00B4D8)" }} />
                <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase" }}>Methodology</span>
                <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #00B4D8, transparent)" }} />
              </div>
              <h2 style={{ fontSize: "clamp(34px, 4.5vw, 60px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", letterSpacing: "-2px" }}>How We Work</h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative" }} className="process-grid">
            {/* Connector line */}
            <div style={{ position: "absolute", top: 48, left: "12.5%", right: "12.5%", height: 2, background: "linear-gradient(90deg, #00B4D8, #0077B6)", zIndex: 0, animation: "line-grow 1.5s ease-out" }} />

            {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.15}>
                  <div style={{ padding: "0 16px", textAlign: "center", position: "relative", zIndex: 1 }}>
                    {/* Node */}
                    <div style={{
                      width: 80, height: 80, borderRadius: "50%", margin: "0 auto 28px",
                      background: `linear-gradient(135deg, #00B4D8, #0077B6)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 28, boxShadow: "0 0 0 8px rgba(0,180,216,0.1), 0 16px 32px rgba(0,180,216,0.35)",
                      animation: `float ${5 + i}s ease-in-out infinite`, animationDelay: `${i * 0.5}s`
                    }}>{s.icon}</div>

                    <div style={{ fontSize: 11, color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "2px", marginBottom: 8 }}>{s.n}</div>
                    <h3 style={{ fontSize: 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 12 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: "rgba(10,37,64,0.55)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </Reveal>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .process-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </section>
  );
}


export default Process;
