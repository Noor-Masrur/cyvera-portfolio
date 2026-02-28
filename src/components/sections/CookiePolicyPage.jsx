import styles from "./CookiePolicyPage.module.css";

function CookiePolicyPage({ onBack }) {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <button type="button" onClick={onBack} className={styles.backBtn}>← Back to Home</button>
          <h1 className={styles.title}>Cookie Policy</h1>
          <p className={styles.subtitle}>
            Effective date: February 28, 2026
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.lead}>
            This Cookie Policy explains how Cyvera uses cookies and similar technologies on this website.
            It should be read together with our Privacy Policy.
          </p>

          <div className={styles.block}>
            <h2>1. What are cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help sites
              remember preferences, keep services secure, and support performance.
            </p>
          </div>

          <div className={styles.block}>
            <h2>2. Cookies we currently use</h2>
            <p>Cyvera currently uses technologies in these categories:</p>
            <ul>
              <li>Strictly necessary technologies for website delivery, security, and abuse prevention.</li>
              <li>Performance and analytics technologies to understand site usage and reliability.</li>
            </ul>
            <p>We currently do not use advertising or retargeting cookies on this website.</p>
          </div>

          <div className={styles.block}>
            <h2>3. Cookie categories</h2>
            <ul>
              <li><strong>Strictly necessary:</strong> required for core website operation and security.</li>
              <li><strong>Analytics/performance:</strong> currently active to help us measure traffic and improve performance.</li>
              <li><strong>Marketing:</strong> not currently active.</li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2>4. Third-party services</h2>
            <p>
              Some infrastructure providers (such as hosting and content delivery platforms) may set technical cookies
              or use similar mechanisms required to deliver and secure the website.
            </p>
            <p>
              We also use Vercel Web Analytics and Vercel Speed Insights for aggregate traffic and performance metrics.
            </p>
          </div>

          <div className={styles.block}>
            <h2>5. Cookie duration</h2>
            <ul>
              <li><strong>Session cookies:</strong> expire when you close your browser.</li>
              <li><strong>Persistent cookies:</strong> remain for a limited period where needed for reliability or security.</li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2>6. Your choices</h2>
            <p>
              You can manage or delete cookies through browser settings. Blocking strictly necessary cookies may affect
              website functionality or security.
            </p>
          </div>

          <div className={styles.block}>
            <h2>7. Future changes</h2>
            <p>
              If Cyvera introduces additional non-essential cookies (for example marketing cookies), this policy
              will be updated and any required consent controls will be provided.
            </p>
          </div>

          <div className={styles.block}>
            <h2>8. Contact</h2>
            <p>Cyvera</p>
            <p>Email: info@cyvera.com.au</p>
            <p>Address: G3/62 Didsbury St, East Brisbane, QLD 4169, Australia</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CookiePolicyPage;
