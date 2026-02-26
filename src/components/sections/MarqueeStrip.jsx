import { clients } from "../../data/siteData";
import styles from "./MarqueeStrip.module.css";

function MarqueeStrip() {
  const items = [...clients, ...clients];
  return (
      <div className={styles.strip}>
        <div className={styles.row}>
          {items.map((c, i) => (
              <span key={i} className={styles.item}>
                {c}
                <span className={styles.dot} />
              </span>
          ))}
        </div>
      </div>
  );
}


export default MarqueeStrip;
