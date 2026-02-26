import AnimatedNumber from "../common/AnimatedNumber";
import { stats } from "../../data/siteData";

function StatsStrip() {
  return (
      <div style={{
        background: "linear-gradient(90deg, #03045E 0%, #0A2540 50%, #023E8A 100%)",
        padding: "0", overflow: "hidden", position: "relative"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,180,216,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", position: "relative", zIndex: 2 }} className="stats-grid">
          {stats.map((s, i) => (
              <div key={i} style={{
                padding: "56px 32px", textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(0,180,216,0.12)" : "none",
                position: "relative", overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at 50% 0%, rgba(0,180,216,0.08), transparent 70%)",
                  opacity: 0, transition: "opacity 0.4s"
                }} className="stat-bg" />
                <div style={{ fontSize: "clamp(36px, 4vw, 60px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#00B4D8", lineHeight: 1, marginBottom: 10 }}>
                  <AnimatedNumber target={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>{s.label}</div>
              </div>
          ))}
        </div>
        <style>{`@media (max-width: 600px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </div>
  );
}


export default StatsStrip;
