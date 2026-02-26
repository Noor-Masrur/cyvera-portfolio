import { useRef, useState } from "react";
import Reveal from "../common/Reveal";
import { services } from "../../data/siteData";

function Services({ onSelect }) {
  return (
      <section id="services" style={{ padding: "120px 5%", background: "linear-gradient(180deg, #F7FAFC 0%, #EBF4FF 100%)", position: "relative", overflow: "hidden" }}>
        {/* Big background text */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "clamp(80px, 15vw, 200px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "rgba(0,180,216,0.04)", pointerEvents: "none", whiteSpace: "nowrap", userSelect: "none" }}>
          CAPABILITIES
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ marginBottom: 72 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #00B4D8, transparent)" }} />
                <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase" }}>What We Do</span>
              </div>
              <h2 style={{ fontSize: "clamp(34px, 4.5vw, 60px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", letterSpacing: "-2px", lineHeight: 1.1 }}>
                Five disciplines.<br /><span style={{ color: "#00B4D8" }}>One team.</span>
              </h2>
            </div>
          </Reveal>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, alignItems: "stretch", gridAutoRows: "1fr" }}>
            {services.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.08}>
                  <TiltCard s={s} onSelect={onSelect} />
                </Reveal>
            ))}
          </div>
          <style>{`
            @media (min-width: 1200px) {
              .services-grid { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; }
            }
          `}</style>
        </div>
      </section>
  );
}

function TiltCard({ s, onSelect }) {
  const cardRef = useRef(null);
  const [style3d, setStyle3d] = useState({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hov, setHov] = useState(false);

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle3d({ transform: `perspective(600px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale(1.03)` });
    setGlowPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };
  const onMouseLeave = () => { setStyle3d({ transform: "perspective(600px) rotateX(0) rotateY(0) scale(1)", transition: "transform 0.5s ease" }); setHov(false); };
  const onMouseEnter = () => { setHov(true); };

  return (
      <button
          ref={cardRef} type="button"
          onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}
          onClick={() => onSelect?.(s.id)}
          style={{
            position: "relative", overflow: "hidden",
            background: "linear-gradient(160deg, #fff 0%, #f0f7ff 100%)",
            borderRadius: 24, padding: "40px 32px",
            border: `1.5px solid ${hov ? s.color + "80" : "rgba(10,37,64,0.07)"}`,
            boxShadow: hov ? `0 28px 70px ${s.color}30, 0 0 0 1px ${s.color}20` : "0 8px 32px rgba(10,37,64,0.08)",
            cursor: "pointer", textAlign: "left", width: "100%",
            display: "flex", flexDirection: "column", minHeight: 300, height: "100%",
            transition: "border-color 0.3s, box-shadow 0.3s",
            ...style3d,
            willChange: "transform"
          }}
      >
        {/* Spotlight glow */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 24,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${s.accent} 0%, transparent 60%)`,
          opacity: hov ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none"
        }} />

        {/* Number watermark */}
        <span style={{
          position: "absolute", top: 16, right: 20,
          fontSize: 64, fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
          color: "rgba(0,180,216,0.06)", lineHeight: 1, pointerEvents: "none",
          transition: "color 0.3s"
        }}>0{services.indexOf(services.find(x => x.id === s.id)) + 1}</span>

        <div style={{
          width: 56, height: 56, borderRadius: 18,
          background: `linear-gradient(135deg, ${s.color}25, ${s.color}10)`,
          border: `1px solid ${s.color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, marginBottom: 22,
          transition: "transform 0.3s",
          transform: hov ? "scale(1.1) rotate(-5deg)" : "scale(1)"
        }}>{s.icon}</div>

        <h3 style={{ fontSize: 19, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", marginBottom: 12, lineHeight: 1.3 }}>{s.name}</h3>
        <p style={{ fontSize: 14, color: "rgba(10,37,64,0.55)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75, marginBottom: 24 }}>{s.desc}</p>
        <div style={{ flex: 1 }} />

        <span style={{
          color: "#0A2540",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 900,
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          letterSpacing: "0.6px",
          textTransform: "uppercase",
          padding: "12px 18px",
          borderRadius: 999,
          background: hov
              ? `linear-gradient(90deg, ${s.color}55, ${s.color}25)`
              : `linear-gradient(90deg, ${s.color}35, ${s.color}15)`,
          border: `1px solid ${s.color}77`,
          boxShadow: hov
              ? `0 14px 30px ${s.color}40, 0 0 0 2px ${s.color}25`
              : `0 10px 22px ${s.color}25`,
          transform: hov ? "translateY(-1px)" : "translateY(0)",
          transition: "color 0.2s, gap 0.2s, background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s"
        }}>
          Explore service
          <span style={{
            width: 30, height: 30, borderRadius: "50%",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: hov ? s.color : "rgba(10,37,64,0.22)",
            color: "#fff", fontSize: 14, lineHeight: 1,
            transform: hov ? "translateX(4px) scale(1.08)" : "translateX(0) scale(1)",
            transition: "transform 0.2s, background 0.2s"
          }}>→</span>
        </span>
      </button>
  );
}


export default Services;
