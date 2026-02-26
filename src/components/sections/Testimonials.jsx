import Reveal from "../common/Reveal";
import { testimonials } from "../../data/siteData";
import styles from "./Testimonials.module.css";

function Testimonials() {
  const doubled = [...testimonials, ...testimonials];
  return (
      <section className={styles.section}>
        <div className={styles.dotGrid} />

        <div className={styles.container}>
          <Reveal>
            <div className={styles.headingRow}>
              <div>
                <div className={styles.eyebrow}>
                  <div className={styles.eyebrowLine} />
                  <span className={styles.eyebrowText}>Testimonials</span>
                </div>
                <h2 className={styles.title}>What clients say</h2>
              </div>
              <div className={styles.ratingPill}>
                <span className={styles.ratingText}>5.0 ★★★★★</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className={styles.marqueeRow}>
          <div className={`${styles.marquee} ${styles.marqueeForward}`}>
            {doubled.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
        <div className={styles.marqueeRow}>
          <div className={`${styles.marquee} ${styles.marqueeReverse}`}>
            {[...doubled].reverse().map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </section>
  );
}

function TestimonialCard({ t }) {
  return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.avatar}>{t.initials}</div>
          <div>
            <div className={styles.name}>{t.name}</div>
            <div className={styles.role}>{t.role}</div>
          </div>
        </div>
        <p className={styles.quote}>{t.quote}</p>
      </div>
  );
}


export default Testimonials;
