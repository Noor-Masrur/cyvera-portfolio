import Reveal from "../common/Reveal";
import { differentiators } from "../../data/siteData";
import styles from "./WhyCyvera.module.css";

function WhyCyvera() {
  return (
      <section id="about" className={styles.section}>
        <div className={styles.decorOuter} />
        <div className={styles.decorInner} />

        <div className={styles.container}>
          <div className={styles.grid}>
            <Reveal>
              <div>
                <div className={styles.eyebrow}>
                  <div className={styles.eyebrowLine} />
                  <span className={styles.eyebrowText}>Why Us</span>
                </div>
                <h2 className={styles.heading}>
                  One agency.<br />
                  <span className={styles.headingAccent}>Every</span> digital need.
                </h2>
                <div className={styles.list}>
                  {differentiators.map((d, i) => (
                      <Reveal key={i} delay={i * 0.1}>
                        <div className={styles.listItem}>
                          <div className={styles.check}>✓</div>
                          <p className={styles.listText}>{d}</p>
                        </div>
                      </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className={styles.mockupWrap}>
                <div className={styles.mockupCard}>
                  <div className={styles.topBar}>
                    <div className={styles.windowDots}>
                      {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
                        <div key={i} className={styles.windowDot} style={{ background: c }} />
                      ))}
                    </div>
                    <div className={styles.topLabel}>CYVERA DASHBOARD</div>
                  </div>

                  <div className={styles.metricsGrid}>
                    {[
                      { label: "Organic Traffic", val: "+140%", trend: "↑", color: "#00B4D8" },
                      { label: "Security Score", val: "98/100", trend: "✓", color: "#48CAE4" },
                      { label: "ROAS", val: "3.2×", trend: "↑", color: "#0096C7" },
                      { label: "Load Time", val: "−67%", trend: "↓", color: "#00B4D8" },
                    ].map((m, i) => (
                        <div key={i} className={styles.metricCard}>
                          <div className={styles.metricLabel}>{m.label}</div>
                          <div className={styles.metricValue} style={{ color: m.color }}>{m.val}</div>
                        </div>
                    ))}
                  </div>

                  <div className={styles.chart}>
                    <div className={styles.chartLabel}>PERFORMANCE TREND</div>
                    <div className={styles.bars}>
                      {[30, 45, 40, 55, 48, 65, 58, 70, 62, 80, 75, 90].map((h, i) => (
                          <div key={i} className={styles.bar} style={{ height: `${h}%`, opacity: 0.6 + i * 0.03 }} />
                      ))}
                    </div>
                  </div>

                  <div className={styles.status}>
                    <span className={styles.statusText}>All Systems Operational</span>
                    <div className={styles.statusLive}>
                      <span className={styles.statusDot} />
                      <span className={styles.statusLabel}>LIVE</span>
                    </div>
                  </div>
                </div>

                <div className={styles.badge}>4× ROI</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
  );
}


export default WhyCyvera;
