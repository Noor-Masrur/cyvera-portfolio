import { useState } from "react";
import Reveal from "../common/Reveal";
import { filterTabs, projects } from "../../data/siteData";

function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter(p => p.tags.includes(active));

  return (
      <section id="work" style={{ padding: "120px 5%", background: "linear-gradient(180deg, #FFFFFF 0%, #F0F6FF 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,216,0.05), transparent 70%)", transform: "translateY(-50%)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #00B4D8, transparent)" }} />
                  <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase" }}>Portfolio</span>
                </div>
                <h2 style={{ fontSize: "clamp(34px, 4.5vw, 60px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", letterSpacing: "-2px", lineHeight: 1.1 }}>
                  Our Work
                </h2>
              </div>
              {/* Filter Tabs */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {filterTabs.map(t => (
                    <button key={t} onClick={() => setActive(t)} style={{
                      padding: "9px 20px", borderRadius: 100, fontSize: 13, fontWeight: 700,
                      fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "all 0.2s",
                      background: active === t ? "linear-gradient(90deg, #00B4D8, #0077B6)" : "transparent",
                      color: active === t ? "#fff" : "#0A2540",
                      border: active === t ? "none" : "1.5px solid rgba(10,37,64,0.12)",
                      boxShadow: active === t ? "0 0 24px rgba(0,180,216,0.4)" : "none",
                    }}>{t}</button>
                ))}
              </div>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="project-grid">
            {filtered.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.1}>
                  <ProjectCard p={p} />
                </Reveal>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .project-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
  );
}

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  return (
      <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
        borderRadius: 22, overflow: "hidden",
        boxShadow: hov ? "0 30px 70px rgba(0,30,80,0.18)" : "0 8px 32px rgba(10,37,64,0.08)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: hov ? "translateY(-8px)" : "translateY(0)",
        background: "#fff", cursor: "pointer"
      }}>
        <div style={{ height: 220, background: p.gradient, position: "relative", overflow: "hidden" }}>
          {/* Animated shine */}
          <div style={{
            position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%",
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
            transform: hov ? "translateX(400%)" : "translateX(0)",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)"
          }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px 24px" }}>
            <span style={{ alignSelf: "flex-start", padding: "6px 16px", borderRadius: 100, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.85)", fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>{p.category}</span>
            <div>
              {p.tags.map(t => <span key={t} style={{ marginRight: 8, padding: "4px 12px", borderRadius: 100, background: "rgba(0,0,0,0.25)", color: "rgba(255,255,255,0.7)", fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{t}</span>)}
            </div>
          </div>
        </div>
        <div style={{ padding: "24px 28px" }}>
          <h3 style={{ fontSize: 18, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 10 }}>{p.name}</h3>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,180,216,0.07)", padding: "7px 14px", borderRadius: 100, marginBottom: 16, border: "1px solid rgba(0,180,216,0.15)" }}>
            <span style={{ color: "#00B4D8", fontSize: 14 }}>↑</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0077B6", fontFamily: "'DM Sans', sans-serif" }}>{p.metric}</span>
          </div>
          <div>
            <a href="#contact" style={{
              color: hov ? "#00B4D8" : "rgba(10,37,64,0.35)", fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
              transition: "color 0.2s"
            }}>View Case Study <span style={{ transform: hov ? "translateX(4px)" : "none", display: "inline-block", transition: "transform 0.2s" }}>→</span></a>
          </div>
        </div>
      </article>
  );
}


export default Portfolio;
