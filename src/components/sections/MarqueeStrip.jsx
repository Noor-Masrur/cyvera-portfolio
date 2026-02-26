import { clients } from "../../data/siteData";

function MarqueeStrip() {
  const items = [...clients, ...clients];
  return (
      <div style={{
        background: "linear-gradient(90deg, #03045E, #0A2540)",
        padding: "20px 0", overflow: "hidden",
        borderTop: "1px solid rgba(0,180,216,0.15)",
        borderBottom: "1px solid rgba(0,180,216,0.15)",
      }}>
        <div style={{ display: "flex", animation: "marquee 22s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
          {items.map((c, i) => (
              <span key={i} style={{ padding: "0 40px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 20 }}>
            {c}
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(0,180,216,0.5)", display: "inline-block" }} />
          </span>
          ))}
        </div>
      </div>
  );
}


export default MarqueeStrip;
