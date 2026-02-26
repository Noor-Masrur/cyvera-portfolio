import Reveal from "../common/Reveal";
import styles from "./CTABanner.module.css";

function CTABanner({ onSchedule }) {
  return (
      <section className={styles.section}>
        <div className={styles.gridOverlay} />
        <div className={styles.glow} />

        <Reveal>
          <div className={styles.inner}>
            <h2 className={styles.title}>
              Ready to grow<br />without limits?
            </h2>
            <p className={styles.subtitle}>
              Book a consultation and we'll build a 90-day growth plan — at no cost.
            </p>
            <div className={styles.actions}>
              <a href="#contact" className={styles.ctaLink}>Start Your Project →</a>
            </div>
          </div>
        </Reveal>
      </section>
  );
}


export default CTABanner;
