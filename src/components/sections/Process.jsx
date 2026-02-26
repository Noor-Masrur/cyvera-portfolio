import Reveal from "../common/Reveal";
import { steps } from "../../data/siteData";
import styles from "./Process.module.css";

function Process() {
  return (
      <section className={styles.section}>
        <div className={styles.topDivider} />

        <div className={styles.container}>
          <Reveal>
            <div className={styles.headingWrap}>
              <div className={styles.eyebrow}>
                <div className={styles.eyebrowLine} />
                <span className={styles.eyebrowText}>Methodology</span>
                <div className={styles.eyebrowLineReverse} />
              </div>
              <h2 className={styles.title}>How We Work</h2>
            </div>
          </Reveal>

          <div className={styles.grid}>
            <div className={styles.connector} />

            {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.15}>
                  <div className={styles.step}>
                    <div
                      className={styles.node}
                      style={{
                        animation: `float ${5 + i}s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    >
                      {s.icon}
                    </div>

                    <div className={styles.stepIndex}>{s.n}</div>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepDesc}>{s.desc}</p>
                  </div>
                </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
}


export default Process;
