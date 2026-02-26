import Reveal from "../common/Reveal";

function CTABanner({ onSchedule }) {
  return (
      <section style={{
        padding: "100px 5%",
        background: "linear-gradient(135deg, #00B4D8, #0077B6, #03045E)",
        backgroundSize: "200%",
        animation: "gradient-shift 6s ease infinite",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div style={{ position: "absolute", top: "-20%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }} />

        <Reveal>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#fff", letterSpacing: "-2px", marginBottom: 20, lineHeight: 1.1 }}>
              Ready to grow<br />without limits?
            </h2>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", marginBottom: 40, lineHeight: 1.7 }}>
              Book a consultation and we'll build a 90-day growth plan — at no cost.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#contact" style={{
                background: "#fff", color: "#0A2540", textDecoration: "none",
                padding: "18px 40px", borderRadius: 12, fontSize: 15, fontWeight: 800,
                fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 50px rgba(0,0,0,0.25)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
                 onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.35)"; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 50px rgba(0,0,0,0.25)"; }}
              >Start Your Project →</a>
            </div>
          </div>
        </Reveal>
      </section>
  );
}


export default CTABanner;
