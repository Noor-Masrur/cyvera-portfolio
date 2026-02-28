import Reveal from "../common/Reveal";
import { Compass, Route, Rocket, LineChart } from "lucide-react";
import { steps } from "../../data/siteData";
import styles from "./Process.module.css";

function Process() {
  const stepIcons = {
    "01": <Compass size={30} strokeWidth={1.8} color="#ffffff" />,
    "02": <Route size={30} strokeWidth={1.8} color="#ffffff" />,
    "03": <Rocket size={30} strokeWidth={1.8} color="#ffffff" />,
    "04": <LineChart size={30} strokeWidth={1.8} color="#ffffff" />,
  };

  const humanHighlights = {
    "01": "We start by listening so we understand what matters most to your team.",
    "02": "Then we map a clear plan together, with priorities and tradeoffs you can trust.",
    "03": "Our team gets to work and keeps you in the loop at every meaningful milestone.",
    "04": "After launch, we keep refining with real feedback so results continue to improve.",
  };

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
                      {stepIcons[s.n]}
                    </div>

                    <div className={styles.stepIndex}>{s.n}</div>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepDesc}>{humanHighlights[s.n] || s.desc}</p>
                  </div>
                </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
}


export default Process;
