function Footer({ onNavigate, onSelectService, onFAQ }) {
  const companyLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
    { label: "FAQ", href: "#faq", action: "faq" },
  ];
  const serviceLinks = [
    { id: "social-media", label: "Social Media & Branding" },
    { id: "seo", label: "Search Engine Optimization" },
    { id: "cybersecurity", label: "Cybersecurity & Digital Forensics" },
    { id: "website-dev", label: "Website Development" },
    { id: "custom-software", label: "Custom Software" },
  ];

  return (
      <footer style={{ background: "linear-gradient(180deg, #03045E 0%, #020B2B 100%)", padding: "72px 5% 36px", borderTop: "1px solid rgba(0,180,216,0.12)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }} className="footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78))",
                  border: "1px solid rgba(255,255,255,0.35)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.25)"
                }}>
                  <img src="/logo-without-name.png" alt="Cyvera" style={{ height: 24, width: "auto", display: "block" }} />
                </span>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>Cyvera</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.75, maxWidth: 260 }}>Your end-to-end digital partner — from identity to infrastructure.</p>
            </div>

            <div>
              <h4 style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 24 }}>Company</h4>
              {companyLinks.map((l) => (
                  <button
                    key={l.label}
                    type="button"
                    onClick={() => (l.action === "faq" ? onFAQ?.() : onNavigate?.(l.href))}
                    style={{
                      display: "block",
                      background: "none",
                      border: "none",
                      padding: 0,
                      marginBottom: 14,
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "color 0.2s"
                    }}
                    onMouseEnter={e => e.target.style.color = "#00B4D8"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
                  >
                    {l.label}
                  </button>
              ))}
            </div>

            <div>
              <h4 style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 24 }}>Services</h4>
              {serviceLinks.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => onSelectService?.(l.id)}
                    style={{
                      display: "block",
                      background: "none",
                      border: "none",
                      padding: 0,
                      marginBottom: 14,
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "color 0.2s"
                    }}
                    onMouseEnter={e => e.target.style.color = "#00B4D8"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
                  >
                    {l.label}
                  </button>
              ))}
            </div>

            <div>
              <h4 style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 24 }}>Contact</h4>
              <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.75 }}>info@cyvera.com.au</p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.75, marginTop: 8 }}>G3/62 Didsbury St, East Brisbane, QLD 4169</p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>© 2026 Cyvera. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service"].map(l => (
                  <a key={l} href="#" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                     onMouseEnter={e => e.target.style.color = "#00B4D8"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.25)"}
                  >{l}</a>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }`}</style>
      </footer>
  );
}

export default Footer;
