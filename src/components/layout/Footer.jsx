import styles from "./Footer.module.css";

function Footer({ onNavigate, onSelectService, onFAQ }) {
  const companyLinks = [
    { label: "Home", href: "/#home" },
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
  const policyLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ];

  return (
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={`${styles.grid} footer-grid`}>
            <div>
              <div className={styles.brandRow}>
                <span className={styles.logoMark}>
                  <img src="/logo-without-name.png" alt="Cyvera" className={styles.logoImg} />
                </span>
                <span className={styles.logoText}>Cyvera</span>
              </div>
              <p className={styles.brandDesc}>Your end-to-end digital partner — from identity to infrastructure.</p>
            </div>

            <div>
              <h4 className={styles.sectionTitle}>Company</h4>
              {companyLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => {
                      if (l.action === "faq" && onFAQ) {
                        e.preventDefault();
                        onFAQ();
                        return;
                      }
                      const hash = l.href.includes("#") ? l.href.slice(l.href.indexOf("#")) : "";
                      if (hash && onNavigate) {
                        e.preventDefault();
                        onNavigate(hash);
                      }
                    }}
                    className={styles.linkButton}
                  >
                    {l.label}
                  </a>
              ))}
            </div>

            <div>
              <h4 className={styles.sectionTitle}>Services</h4>
              {serviceLinks.map((l) => (
                  <a
                    key={l.id}
                    href={`/services/${l.id}`}
                    onClick={(e) => {
                      if (!onSelectService) return;
                      e.preventDefault();
                      onSelectService(l.id);
                    }}
                    className={styles.linkButton}
                  >
                    {l.label}
                  </a>
              ))}
            </div>

            <div>
              <h4 className={styles.sectionTitle}>Contact</h4>
              <p className={styles.contactText}>info@cyvera.com.au</p>
              <p className={styles.contactText}>G3/62 Didsbury St, East Brisbane, QLD 4169</p>
            </div>
          </div>

          <div className={styles.bottomRow}>
            <p className={styles.copyright}>© 2026 Cyvera. All rights reserved.</p>
            <div className={styles.policyLinks}>
              {policyLinks.map((link) => (
                  <a key={link.label} href={link.href} className={styles.policyLink}>
                    {link.label}
                  </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
