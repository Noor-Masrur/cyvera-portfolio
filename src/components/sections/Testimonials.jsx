import Reveal from "../common/Reveal";
import { testimonials } from "../../data/siteData";

function Testimonials() {
  const doubled = [...testimonials, ...testimonials];
  return (
      <section style={{ padding: "120px 0", background: "linear-gradient(160deg, #03045E 0%, #0A2540 50%, #023E8A 100%)", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(0,180,216,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", marginBottom: 56, position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, #00B4D8, transparent)" }} />
                  <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase" }}>Testimonials</span>
                </div>
                <h2 style={{ fontSize: "clamp(34px, 4.5vw, 60px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", letterSpacing: "-2px", lineHeight: 1.1 }}>
                  What clients say
                </h2>
              </div>
              <div style={{ padding: "10px 24px", borderRadius: 100, border: "1px solid rgba(0,180,216,0.3)", background: "rgba(0,180,216,0.08)", backdropFilter: "blur(8px)" }}>
                <span style={{ color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13 }}>5.0 ★★★★★</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Marquee row 1 */}
        <div style={{ overflow: "hidden", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 20, animation: "marquee 35s linear infinite", width: "max-content" }}>
            {doubled.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
        {/* Marquee row 2 — reversed */}
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 20, animation: "marquee 40s linear infinite reverse", width: "max-content" }}>
            {[...doubled].reverse().map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </section>
  );
}

function TestimonialCard({ t }) {
  return (
      <div style={{
        width: 340, flexShrink: 0,
        background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)",
        borderRadius: 20, padding: "28px 28px",
        border: "1px solid rgba(0,180,216,0.15)",
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "linear-gradient(135deg, #00B4D8, #0077B6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 900, color: "#fff", fontSize: 16, flexShrink: 0
          }}>{t.initials}</div>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#fff", fontSize: 14 }}>{t.name}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{t.role}</div>
          </div>
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75 }}>{t.quote}</p>
      </div>
  );
}


export default Testimonials;
