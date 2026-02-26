import Reveal from "../common/Reveal";
import { differentiators } from "../../data/siteData";

function WhyCyvera() {
  return (
      <section id="about" style={{ padding: "120px 5%", background: "linear-gradient(180deg, #061629 0%, #0A2540 50%, #071B3A 100%)", position: "relative", overflow: "hidden" }}>
        {/* Decorative circle */}
        <div style={{ position: "absolute", right: "-5%", top: "10%", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(0,180,216,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "2%", top: "15%", width: 350, height: 350, borderRadius: "50%", border: "1px dashed rgba(0,180,216,0.05)", pointerEvents: "none", animation: "spin-slow 30s linear infinite" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="two-col">
            <Reveal>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #00B4D8, transparent)" }} />
                  <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase" }}>Why Us</span>
                </div>
                <h2 style={{ fontSize: "clamp(30px, 3.8vw, 52px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 40, letterSpacing: "-1.5px", lineHeight: 1.1 }}>
                  One agency.<br />
                  <span style={{ color: "#00B4D8" }}>Every</span> digital need.
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {differentiators.map((d, i) => (
                      <Reveal key={i} delay={i * 0.1}>
                        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                            background: "linear-gradient(135deg, rgba(0,180,216,0.2), rgba(0,180,216,0.05))",
                            border: "1px solid rgba(0,180,216,0.3)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 12, color: "#00B4D8", marginTop: 2
                          }}>✓</div>
                          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>{d}</p>
                        </div>
                      </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              {/* Creative dashboard mockup */}
              <div style={{ position: "relative" }}>
                <div style={{
                  background: "linear-gradient(160deg, rgba(0,180,216,0.08), rgba(0,60,120,0.15))",
                  borderRadius: 28, padding: 32, border: "1px solid rgba(0,180,216,0.15)",
                  backdropFilter: "blur(20px)", boxShadow: "0 40px 80px rgba(0,0,0,0.4)"
                }}>
                  {/* Top bar */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "1px" }}>CYVERA DASHBOARD</div>
                  </div>

                  {/* Metrics row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                    {[
                      { label: "Organic Traffic", val: "+140%", trend: "↑", color: "#00B4D8" },
                      { label: "Security Score", val: "98/100", trend: "✓", color: "#48CAE4" },
                      { label: "ROAS", val: "3.2×", trend: "↑", color: "#0096C7" },
                      { label: "Load Time", val: "−67%", trend: "↓", color: "#00B4D8" },
                    ].map((m, i) => (
                        <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>{m.label}</div>
                          <div style={{ fontSize: 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: m.color }}>{m.val}</div>
                        </div>
                    ))}
                  </div>

                  {/* Fake chart bars */}
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "16px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 14 }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "1px", marginBottom: 12 }}>PERFORMANCE TREND</div>
                    <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 50 }}>
                      {[30, 45, 40, 55, 48, 65, 58, 70, 62, 80, 75, 90].map((h, i) => (
                          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 4, background: `linear-gradient(to top, #00B4D8, #48CAE4)`, opacity: 0.6 + i * 0.03 }} />
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div style={{ background: "linear-gradient(90deg, rgba(0,180,216,0.15), rgba(0,119,182,0.1))", borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(0,180,216,0.2)" }}>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600 }}>All Systems Operational</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00B4D8", display: "inline-block", animation: "pulse-glow 2s ease-in-out infinite" }} />
                      <span style={{ color: "#00B4D8", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>LIVE</span>
                    </div>
                  </div>
                </div>

                {/* Floating decorative badge */}
                <div style={{
                  position: "absolute", top: -20, right: -20,
                  background: "linear-gradient(135deg, #00B4D8, #0077B6)",
                  borderRadius: 16, padding: "12px 18px",
                  boxShadow: "0 0 40px rgba(0,180,216,0.6)",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                  fontSize: 13, color: "#fff", animation: "float 4s ease-in-out infinite"
                }}>4× ROI</div>
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .two-col { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
      </section>
  );
}


export default WhyCyvera;
