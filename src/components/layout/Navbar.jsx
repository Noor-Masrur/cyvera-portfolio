import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

function Navbar({ onHome, onSchedule, onSelectService, onFAQ }) {
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
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/#work" },
    { label: "Contact", href: "/#contact" },
    { label: "FAQ", href: "/faq", action: "faq" },
  ];

  const serviceLinks = [
    { id: "social-media", label: "Social Media & Branding" },
    { id: "seo", label: "Search Engine Optimization" },
    { id: "cybersecurity", label: "Cybersecurity & Digital Forensics" },
    { id: "website-dev", label: "Website Development" },
    { id: "custom-software", label: "Custom Software" },
  ];

  const handleHashNavClick = (e, href) => {
    const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
    if (!hash || !onHome) return;
    e.preventDefault();
    onHome(hash);
  };

  const handleFaqClick = (e) => {
    if (!onFAQ) return;
    e.preventDefault();
    onFAQ();
  };

  const handleServiceClick = (e, serviceId) => {
    setServicesOpen(false);
    if (!onSelectService) return;
    e.preventDefault();
    onSelectService(serviceId);
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
          <a href="/#home" onClick={(e) => {
            if (!onHome) return;
            if (window.location.pathname !== "/") {
              e.preventDefault();
              onHome("#home");
            }
          }} className={styles.logoLink}>
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
                      <a key={l.label} href={l.href} onClick={handleFaqClick} className={styles.navLink}>
                        {l.label}
                      </a>
                  );
                }
                return (
                    <a key={l.label} href={l.href} onClick={(e) => handleHashNavClick(e, l.href)} className={styles.navLink}>
                      {l.label}
                    </a>
                );
              }

              return (
                  <div key={l.label} className={styles.servicesWrap}
                       onMouseEnter={openServicesMenu}
                       onMouseLeave={closeServicesMenu}
                  >
                    <a href={l.href} onClick={(e) => handleHashNavClick(e, l.href)} className={styles.navLink}>Services</a>
                    <div
                      className={`${styles.servicesMenu} ${servicesOpen ? styles.servicesMenuOpen : ""}`}
                      onMouseEnter={openServicesMenu}
                      onMouseLeave={closeServicesMenu}
                    >
                      {serviceLinks.map((service) => (
                          <a key={service.id}
                             href={`/services/${service.id}`}
                             onClick={(e) => handleServiceClick(e, service.id)}
                             className={styles.serviceItem}
                          >
                            {service.label}
                          </a>
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
                      <a key={l.label} href={l.href}
                         onClick={(e) => {
                           setMenuOpen(false);
                           handleFaqClick(e);
                         }}
                         className={styles.mobileLink}
                      >{l.label}</a>
                  ) : (
                      <a key={l.label} href={l.href} onClick={(e) => { setMenuOpen(false); handleHashNavClick(e, l.href); }}
                         className={styles.mobileLink}
                      >{l.label}</a>
                  )
              ))}
              <div className={styles.mobileServices}>
                <div className={styles.mobileServicesTitle}>Services</div>
                {serviceLinks.map((service) => (
                    <a key={service.id}
                       href={`/services/${service.id}`}
                       onClick={(e) => {
                         setMenuOpen(false);
                         handleServiceClick(e, service.id);
                       }}
                       className={styles.mobileServiceItem}
                    >
                      {service.label}
                    </a>
                ))}
              </div>
            </div>
        )}
      </header>
  );
}

export default Navbar;
