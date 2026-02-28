import Reveal from "../common/Reveal";
import styles from "./CTABanner.module.css";

function CTABanner({ onSchedule }) {
  const handlePrimaryAction = () => {
    if (onSchedule) {
      onSchedule();
      return;
    }
    const contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
              <button type="button" onClick={handlePrimaryAction} className={styles.ctaLink}>
                Start Your Project →
              </button>
            </div>
          </div>
        </Reveal>
      </section>
  );
}


export default CTABanner;
