import AnimatedNumber from "../common/AnimatedNumber";
import { stats } from "../../data/siteData";
import styles from "./StatsStrip.module.css";

function StatsStrip() {
  return (
      <div className={styles.strip}>
        <div className={styles.gridOverlay} />
        <div className={styles.grid}>
          {stats.map((s, i) => (
              <div key={i} className={styles.statCard}>
                <div className={styles.statBg} />
                <div className={styles.statValue}>
                  <AnimatedNumber target={s.num} suffix={s.suffix} />
                </div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
          ))}
        </div>
      </div>
  );
}


export default StatsStrip;
