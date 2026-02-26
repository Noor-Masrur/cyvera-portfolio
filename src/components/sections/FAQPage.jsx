import { useState } from "react";
import Reveal from "../common/Reveal";
import Contact from "./Contact";
import { faqCategories } from "../../data/siteData";

function FAQPage({ onBack, onSchedule }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const hasQuery = normalizedQuery.length >= 2;

  const filteredCategories = faqCategories.map((cat) => {
    if (!hasQuery) return cat;
    const items = cat.items.filter((item) => {
      const hay = `${item.q} ${item.a}`.toLowerCase();
      return hay.includes(normalizedQuery);
    });
    return { ...cat, items };
  });

  const visibleCount = filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
      <div>
        <section id="faq-hero" style={{ padding: "140px 5% 80px", background: "linear-gradient(140deg, #0A2540 0%, #0B2D4B 55%, #0B3B66 100%)", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(72,202,228,0.08) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <Reveal>
              <button type="button" onClick={onBack} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer", marginBottom: 20 }}>← Back to Home</button>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 style={{ fontSize: "clamp(38px, 5.5vw, 72px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, marginBottom: 14, letterSpacing: "-1px" }}>Frequently Asked Questions</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "clamp(16px, 2vw, 20px)", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", maxWidth: 620, lineHeight: 1.7 }}>
                Quick answers about our services, delivery process, and support.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="faq" style={{ padding: "80px 5%", background: "linear-gradient(180deg, #F7FAFF 0%, #FFFFFF 100%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 28, alignItems: "start" }} className="faq-layout">
              <aside style={{ position: "sticky", top: 100 }}>
                <div style={{ borderRadius: 18, padding: 22, background: "#fff", border: "1px solid rgba(10,37,64,0.08)", boxShadow: "0 8px 24px rgba(10,37,64,0.06)" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 16 }}>Quick Links</div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {faqCategories.map((cat) => (
                        <a key={cat.id} href={`#${cat.id}`} style={{ textDecoration: "none", color: "#0A2540", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, padding: "10px 12px", borderRadius: 12, border: "1px solid rgba(10,37,64,0.08)", background: "rgba(10,37,64,0.02)" }}>
                          {cat.title}
                          <div style={{ fontSize: 12, color: "rgba(10,37,64,0.55)", fontWeight: 500 }}>{cat.subtitle}</div>
                        </a>
                    ))}
                  </div>
                  <div style={{ marginTop: 18 }}>
                    <button type="button" onClick={() => onSchedule?.()} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "none", background: "linear-gradient(90deg, #00B4D8, #0077B6)", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, cursor: "pointer" }}>
                      Schedule a Meeting
                    </button>
                  </div>
                </div>
              </aside>

              <div>
                <div style={{ position: "relative", marginBottom: 24 }}>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for answers..."
                    style={{ width: "100%", padding: "14px 16px 14px 44px", borderRadius: 14, border: "1.5px solid rgba(10,37,64,0.12)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none", boxShadow: "0 8px 24px rgba(10,37,64,0.06)" }}
                  />
                  <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(10,37,64,0.45)" }}>🔍</span>
                </div>

                {hasQuery && visibleCount === 0 && (
                    <div style={{ borderRadius: 18, padding: 26, background: "#fff", border: "1px solid rgba(10,37,64,0.08)", textAlign: "center" }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 6 }}>No results found</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.6)", fontSize: 14 }}>
                        Try different keywords or reach out for a custom answer.
                      </div>
                    </div>
                )}

                <div style={{ display: "grid", gap: 22 }}>
                  {filteredCategories.map((cat) => (
                      <div key={cat.id} id={cat.id} style={{ borderRadius: 20, padding: 24, background: "#fff", border: "1px solid rgba(10,37,64,0.08)", boxShadow: "0 10px 30px rgba(10,37,64,0.06)" }}>
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", fontSize: 18 }}>{cat.title}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.55)", fontSize: 13 }}>{cat.subtitle}</div>
                        </div>
                        <div style={{ display: "grid", gap: 10 }}>
                          {cat.items.map((item) => (
                              <details key={item.q} style={{ borderRadius: 14, border: "1px solid rgba(10,37,64,0.08)", background: "#f8fbff", padding: "10px 14px" }}>
                                <summary style={{ cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#0A2540", listStyle: "none" }}>
                                  {item.q}
                                </summary>
                                <div style={{ marginTop: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.65)", lineHeight: 1.7 }}>
                                  {item.a}
                                </div>
                              </details>
                          ))}
                          {hasQuery && cat.items.length === 0 && (
                              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(10,37,64,0.4)" }}>
                                No matches in this section.
                              </div>
                          )}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style>{`
            #faq summary::-webkit-details-marker { display: none; }
            #faq details[open] { box-shadow: 0 8px 22px rgba(10,37,64,0.08); }
            @media (max-width: 900px) {
              #faq .faq-layout { grid-template-columns: 1fr !important; }
              #faq .faq-layout aside { position: static !important; }
            }
          `}</style>
        </section>
        <Contact theme={{
          sectionBg: "linear-gradient(180deg, #F7FAFC 0%, #ECF4FF 100%)",
          accent: "#00B4D8",
          accentStrong: "#0077B6",
          accentSoft: "rgba(0,180,216,0.08)",
          accentBorder: "rgba(0,180,216,0.2)",
          heading: "#0A2540",
          text: "rgba(10,37,64,0.55)"
        }} />
      </div>
  );
}


export default FAQPage;
