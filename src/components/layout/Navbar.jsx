import { useEffect, useRef, useState } from "react";

function Navbar({ isDetail = false, onHome, onSchedule, onSelectService, onFAQ }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesCloseTimer = useRef(null);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
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

  const handleNavClick = (e, href) => {
    if (!isDetail) return;
    e.preventDefault();
    onHome?.(href);
  };

  const openServicesMenu = () => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
    setServicesOpen(true);
  };

  const closeServicesMenu = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    servicesCloseTimer.current = setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimer.current = null;
    }, 160);
  };

  return (
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,37,64,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,180,216,0.12)" : "none",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", padding: "0 5%"
      }}>
        <nav style={{ maxWidth: 1200, margin: "0 auto", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78))",
              border: "1px solid rgba(255,255,255,0.35)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 6px 18px rgba(0,0,0,0.25)"
            }}>
              <img src="/logo-without-name.png" alt="Cyvera" style={{ height: 26, width: "auto", display: "block" }} />
            </span>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.5px" }}>Cyvera</span>
          </a>

          <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
            {navLinks.map(l => {
              if (l.label !== "Services") {
                if (l.action === "faq") {
                  return (
                      <button key={l.label} type="button" onClick={() => onFAQ?.()} style={{
                        color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14,
                        fontWeight: 500, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.3px",
                        transition: "color 0.2s", background: "none", border: "none", cursor: "pointer", padding: 0
                      }}
                         onMouseEnter={e => e.currentTarget.style.color = "#00B4D8"}
                         onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                      >{l.label}</button>
                  );
                }
                return (
                    <a key={l.label} href={l.href} onClick={(e) => handleNavClick(e, l.href)} style={{
                      color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14,
                      fontWeight: 500, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.3px",
                      transition: "color 0.2s"
                    }}
                       onMouseEnter={e => e.target.style.color = "#00B4D8"}
                       onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}
                    >{l.label}</a>
                );
              }

              return (
                  <div key={l.label} style={{ position: "relative" }}
                       onMouseEnter={openServicesMenu}
                       onMouseLeave={closeServicesMenu}
                  >
                    <a href={l.href} onClick={(e) => handleNavClick(e, l.href)} style={{
                      color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14,
                      fontWeight: 500, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.3px",
                      transition: "color 0.2s"
                    }}
                       onMouseEnter={e => e.target.style.color = "#00B4D8"}
                       onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}
                    >Services</a>
                    <div style={{
                      position: "absolute",
                      top: "calc(100% + 14px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      minWidth: 240,
                      padding: 12,
                      borderRadius: 16,
                      background: "rgba(6,22,41,0.95)",
                      border: "1px solid rgba(0,180,216,0.2)",
                      boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
                      display: servicesOpen ? "grid" : "none",
                      gap: 6
                    }}
                    onMouseEnter={openServicesMenu}
                    onMouseLeave={closeServicesMenu}
                    >
                      {serviceLinks.map((service) => (
                          <button key={service.id} type="button"
                                  onClick={() => {
                                    setServicesOpen(false);
                                    onSelectService?.(service.id);
                                  }}
                                  style={{
                                    textAlign: "left",
                                    background: "transparent",
                                    border: "none",
                                    color: "rgba(255,255,255,0.8)",
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 13,
                                    cursor: "pointer"
                                  }}
                                  onMouseEnter={e => e.currentTarget.style.background = "rgba(0,180,216,0.18)"}
                                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >
                            {service.label}
                          </button>
                      ))}
                    </div>
                  </div>
              );
            })}
            <button type="button" onClick={() => onSchedule?.()} style={{
              background: "linear-gradient(90deg, #00B4D8, #0077B6)",
              color: "#fff", textDecoration: "none", padding: "10px 22px",
              borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 0 24px rgba(0,180,216,0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
              border: "none", cursor: "pointer"
            }}
               onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 0 36px rgba(0,180,216,0.6)"; }}
               onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 0 24px rgba(0,180,216,0.4)"; }}
            >Schedule a Meeting</button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{
            display: "none", background: "none", border: "none", color: "#fff",
            fontSize: 24, cursor: "pointer"
          }} className="mobile-menu-btn">☰</button>
        </nav>

        {menuOpen && (
            <div style={{ background: "rgba(10,37,64,0.97)", backdropFilter: "blur(20px)", padding: "20px 5%", borderBottom: "1px solid rgba(0,180,216,0.15)" }}>
              {navLinks.map(l => (
                  l.action === "faq" ? (
                      <button key={l.label} type="button"
                              onClick={() => { setMenuOpen(false); onFAQ?.(); }}
                              style={{ display: "block", width: "100%", textAlign: "left", color: "rgba(255,255,255,0.85)", background: "none", border: "none", padding: "12px 0", fontSize: 16, fontFamily: "'DM Sans', sans-serif", borderBottom: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}
                      >{l.label}</button>
                  ) : (
                      <a key={l.label} href={l.href} onClick={(e) => { setMenuOpen(false); handleNavClick(e, l.href); }}
                         style={{ display: "block", color: "rgba(255,255,255,0.85)", textDecoration: "none", padding: "12px 0", fontSize: 16, fontFamily: "'DM Sans', sans-serif", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                      >{l.label}</a>
                  )
              ))}
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: "1px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 8 }}>Services</div>
                {serviceLinks.map((service) => (
                    <button key={service.id} type="button"
                            onClick={() => { setMenuOpen(false); onSelectService?.(service.id); }}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              background: "transparent",
                              border: "none",
                              color: "rgba(255,255,255,0.85)",
                              padding: "10px 0",
                              fontSize: 15,
                              fontFamily: "'DM Sans', sans-serif",
                              cursor: "pointer"
                            }}
                    >
                      {service.label}
                    </button>
                ))}
              </div>
            </div>
        )}

        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Serif+Display:ital@0;1&display=swap');
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: block !important; } }
        @media (max-width: 900px) { .service-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .service-grid { grid-template-columns: 1fr !important; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F7FAFC; overflow-x: hidden; color: #061629; }
        ::selection { background: rgba(0,180,216,0.25); }

        @keyframes float { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
        @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 20px rgba(0,180,216,0.3); } 50% { box-shadow: 0 0 50px rgba(0,180,216,0.7), 0 0 80px rgba(0,180,216,0.3); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes blob0 { from { transform: translate(0,0) scale(1); } to { transform: translate(60px,80px) scale(1.15); } }
        @keyframes blob1 { from { transform: translate(0,0) scale(1); } to { transform: translate(-80px,40px) scale(0.85); } }
        @keyframes blob2 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,-60px) scale(1.2); } }
        @keyframes blob3 { from { transform: translate(0,0) scale(1); } to { transform: translate(-40px,60px) scale(0.9); } }
        @keyframes scanline { from { transform: translateY(-100%); } to { transform: translateY(100vh); } }
        @keyframes tilt-float { 0%,100% { transform: perspective(800px) rotateX(2deg) rotateY(-3deg); } 50% { transform: perspective(800px) rotateX(-2deg) rotateY(3deg); } }
        @keyframes counter-in { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes line-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes reveal-up { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:translateY(0); } }
        @keyframes orbit { from { transform: rotate(0deg) translateX(120px) rotate(0deg); } to { transform: rotate(360deg) translateX(120px) rotate(-360deg); } }
        @keyframes glow-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
      `}</style>
      </header>
  );
}

export default Navbar;
