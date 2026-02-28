import styles from "./PrivacyPolicyPage.module.css";

function PrivacyPolicyPage({ onBack }) {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <button type="button" onClick={onBack} className={styles.backBtn}>← Back to Home</button>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>
            Effective date: February 28, 2026
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.lead}>
            This Privacy Policy explains how Cyvera collects, uses, discloses, and safeguards your information
            when you visit our website and use our services.
          </p>

          <div className={styles.block}>
            <h2>1. Who we are</h2>
            <p>
              Cyvera is a digital agency providing branding, marketing, cybersecurity, website development,
              and software services.
            </p>
            <p>
              Contact: info@cyvera.com.au
            </p>
            <p>
              Address: G3/62 Didsbury St, East Brisbane, QLD 4169, Australia
            </p>
          </div>

          <div className={styles.block}>
            <h2>2. Information we collect</h2>
            <p>We may collect:</p>
            <ul>
              <li>Identity and contact details such as name, email, company, and phone number.</li>
              <li>Project details and messages you submit through contact and booking forms.</li>
              <li>Scheduling preferences such as preferred date, time, and timezone.</li>
              <li>Technical data such as browser, device, IP address, and usage analytics.</li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2>3. How we collect information</h2>
            <p>We collect information when you:</p>
            <ul>
              <li>Submit a contact enquiry.</li>
              <li>Request a meeting through our scheduler.</li>
              <li>Interact with our website and marketing pages.</li>
              <li>Communicate with us by email or phone.</li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2>4. How we use information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Respond to enquiries and provide requested services.</li>
              <li>Schedule and manage consultations.</li>
              <li>Improve our website, offerings, and user experience.</li>
              <li>Maintain security, prevent abuse, and detect fraud.</li>
              <li>Comply with legal and regulatory obligations.</li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2>5. Legal bases and consent</h2>
            <p>
              Where required by law, we process personal information based on consent, contractual necessity,
              legitimate interests, and legal obligations.
            </p>
          </div>

          <div className={styles.block}>
            <h2>6. Cookies and analytics</h2>
            <p>
              We may use cookies or similar technologies for functionality, performance, and analytics.
              You can manage cookie preferences in your browser settings.
            </p>
          </div>

          <div className={styles.block}>
            <h2>7. Third-party services</h2>
            <p>
              We may use third-party providers for hosting, email delivery, scheduling support, and analytics.
              These providers only process information for authorized purposes and under contractual safeguards.
            </p>
          </div>

          <div className={styles.block}>
            <h2>8. Data retention</h2>
            <p>
              We keep personal information only as long as needed for service delivery, legal compliance,
              dispute resolution, and legitimate business purposes.
            </p>
          </div>

          <div className={styles.block}>
            <h2>9. Data security</h2>
            <p>
              We apply reasonable technical and organizational safeguards to protect personal information.
              No internet transmission or storage method can be guaranteed 100% secure.
            </p>
          </div>

          <div className={styles.block}>
            <h2>10. International transfers</h2>
            <p>
              If information is processed outside your country, we take steps to ensure appropriate protections
              are in place consistent with applicable laws.
            </p>
          </div>

          <div className={styles.block}>
            <h2>11. Your rights</h2>
            <p>Depending on your jurisdiction, you may have rights to:</p>
            <ul>
              <li>Access, correct, or delete personal information.</li>
              <li>Object to or restrict certain processing.</li>
              <li>Withdraw consent where processing relies on consent.</li>
              <li>Request data portability where applicable.</li>
            </ul>
            <p>To exercise your rights, contact info@cyvera.com.au.</p>
          </div>

          <div className={styles.block}>
            <h2>12. Children&apos;s privacy</h2>
            <p>
              Our services are not directed to children under 16. We do not knowingly collect personal data from
              children. If you believe a child has provided data, contact us for removal.
            </p>
          </div>

          <div className={styles.block}>
            <h2>13. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. Updated versions will be posted on this page with
              a revised effective date.
            </p>
          </div>

          <div className={styles.block}>
            <h2>14. Contact us</h2>
            <p>Cyvera</p>
            <p>Email: info@cyvera.com.au</p>
            <p>Address: G3/62 Didsbury St, East Brisbane, QLD 4169, Australia</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;
