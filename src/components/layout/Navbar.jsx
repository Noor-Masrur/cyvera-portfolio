import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

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
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <nav className={styles.nav}>
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className={styles.logoLink}>
            <span className={styles.logoMark}>
              <img src="/logo-without-name.png" alt="Cyvera" className={styles.logoImg} />
            </span>
            <span className={styles.logoText}>Cyvera</span>
          </a>

          <div className={`${styles.desktopNav} desktop-nav`}>
            {navLinks.map(l => {
              if (l.label !== "Services") {
                if (l.action === "faq") {
                  return (
                      <button key={l.label} type="button" onClick={() => onFAQ?.()} className={`${styles.navLink} ${styles.navButton}`}>
                        {l.label}
                      </button>
                  );
                }
                return (
                    <a key={l.label} href={l.href} onClick={(e) => handleNavClick(e, l.href)} className={styles.navLink}>
                      {l.label}
                    </a>
                );
              }

              return (
                  <div key={l.label} className={styles.servicesWrap}
                       onMouseEnter={openServicesMenu}
                       onMouseLeave={closeServicesMenu}
                  >
                    <a href={l.href} onClick={(e) => handleNavClick(e, l.href)} className={styles.navLink}>Services</a>
                    <div
                      className={`${styles.servicesMenu} ${servicesOpen ? styles.servicesMenuOpen : ""}`}
                      onMouseEnter={openServicesMenu}
                      onMouseLeave={closeServicesMenu}
                    >
                      {serviceLinks.map((service) => (
                          <button key={service.id} type="button"
                                  onClick={() => {
                                    setServicesOpen(false);
                                    onSelectService?.(service.id);
                                  }}
                                  className={styles.serviceItem}
                          >
                            {service.label}
                          </button>
                      ))}
                    </div>
                  </div>
              );
            })}
            <button type="button" onClick={() => onSchedule?.()} className={styles.scheduleBtn}>Schedule a Meeting</button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className={`${styles.mobileMenuBtn} mobile-menu-btn`}>☰</button>
        </nav>

        {menuOpen && (
            <div className={styles.mobileMenu}>
              {navLinks.map(l => (
                  l.action === "faq" ? (
                      <button key={l.label} type="button"
                              onClick={() => { setMenuOpen(false); onFAQ?.(); }}
                              className={styles.mobileLink}
                      >{l.label}</button>
                  ) : (
                      <a key={l.label} href={l.href} onClick={(e) => { setMenuOpen(false); handleNavClick(e, l.href); }}
                         className={styles.mobileLink}
                      >{l.label}</a>
                  )
              ))}
              <div className={styles.mobileServices}>
                <div className={styles.mobileServicesTitle}>Services</div>
                {serviceLinks.map((service) => (
                    <button key={service.id} type="button"
                            onClick={() => { setMenuOpen(false); onSelectService?.(service.id); }}
                            className={styles.mobileServiceItem}
                    >
                      {service.label}
                    </button>
                ))}
              </div>
            </div>
        )}
      </header>
  );
}

export default Navbar;
