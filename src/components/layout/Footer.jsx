import styles from "./Footer.module.css";

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
                  <button
                    key={l.label}
                    type="button"
                    onClick={() => (l.action === "faq" ? onFAQ?.() : onNavigate?.(l.href))}
                    className={styles.linkButton}
                  >
                    {l.label}
                  </button>
              ))}
            </div>

            <div>
              <h4 className={styles.sectionTitle}>Services</h4>
              {serviceLinks.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => onSelectService?.(l.id)}
                    className={styles.linkButton}
                  >
                    {l.label}
                  </button>
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
              {["Privacy Policy", "Terms of Service"].map(l => (
                  <a key={l} href="#" className={styles.policyLink}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
