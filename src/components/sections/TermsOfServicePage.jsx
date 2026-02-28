import styles from "./TermsOfServicePage.module.css";

function TermsOfServicePage({ onBack }) {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <button type="button" onClick={onBack} className={styles.backBtn}>← Back to Home</button>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.subtitle}>
            Effective date: February 28, 2026
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.lead}>
            These Terms of Service govern your access to and use of Cyvera&apos;s website and services.
            By using our website or engaging our services, you agree to these terms.
          </p>

          <div className={styles.block}>
            <h2>1. About Cyvera</h2>
            <p>
              Cyvera provides digital agency services including branding, marketing, cybersecurity,
              website development, and software development.
            </p>
          </div>

          <div className={styles.block}>
            <h2>2. Use of the website</h2>
            <ul>
              <li>You agree to use this website lawfully and responsibly.</li>
              <li>You must not attempt unauthorized access, disruption, or abuse of our systems.</li>
              <li>You must not upload malicious content, spam, or deceptive submissions.</li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2>3. Enquiries and bookings</h2>
            <p>
              Information submitted through our contact and scheduling forms must be accurate and submitted in good faith.
              We may decline, cancel, or reschedule consultations at our discretion.
            </p>
          </div>

          <div className={styles.block}>
            <h2>4. Scope of services</h2>
            <p>
              Specific deliverables, timelines, fees, and responsibilities are governed by separate proposals,
              statements of work, or client agreements.
            </p>
          </div>

          <div className={styles.block}>
            <h2>5. Fees and payments</h2>
            <p>
              Unless otherwise agreed in writing, fees are payable according to the terms in the applicable proposal
              or contract. Late payments may result in paused work or additional charges as permitted by law.
            </p>
          </div>

          <div className={styles.block}>
            <h2>6. Intellectual property</h2>
            <ul>
              <li>All pre-existing Cyvera materials and methods remain Cyvera intellectual property.</li>
              <li>Client ownership and usage rights for deliverables are defined in the governing client agreement.</li>
              <li>You must not copy, reproduce, or redistribute site content without permission.</li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2>7. Confidentiality</h2>
            <p>
              Both parties should protect confidential information shared during discussions and service delivery,
              subject to legal obligations and agreed contract terms.
            </p>
          </div>

          <div className={styles.block}>
            <h2>8. Third-party tools and platforms</h2>
            <p>
              Services may involve third-party platforms and providers. Their own terms and policies apply,
              and Cyvera is not responsible for third-party outages or policy changes.
            </p>
          </div>

          <div className={styles.block}>
            <h2>9. Warranties disclaimer</h2>
            <p>
              The website is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the maximum extent
              allowed by law, we disclaim implied warranties including merchantability, fitness for a particular purpose,
              and non-infringement.
            </p>
          </div>

          <div className={styles.block}>
            <h2>10. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Cyvera will not be liable for indirect, incidental, special,
              consequential, or punitive damages, including loss of revenue, data, or goodwill.
            </p>
          </div>

          <div className={styles.block}>
            <h2>11. Indemnity</h2>
            <p>
              You agree to indemnify and hold Cyvera harmless from claims, losses, and expenses arising from your
              misuse of the website or breach of these terms.
            </p>
          </div>

          <div className={styles.block}>
            <h2>12. Suspension and termination</h2>
            <p>
              We may suspend or terminate website access or service discussions where misuse, security concerns,
              or legal requirements apply.
            </p>
          </div>

          <div className={styles.block}>
            <h2>13. Governing law</h2>
            <p>
              These terms are governed by the laws of Queensland, Australia, unless otherwise required by applicable law.
            </p>
          </div>

          <div className={styles.block}>
            <h2>14. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. Updated terms take effect when published on this page.
            </p>
          </div>

          <div className={styles.block}>
            <h2>15. Contact us</h2>
            <p>Cyvera</p>
            <p>Email: info@cyvera.com.au</p>
            <p>Address: G3/62 Didsbury St, East Brisbane, QLD 4169, Australia</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TermsOfServicePage;
