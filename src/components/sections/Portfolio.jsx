import { useState } from "react";
import Reveal from "../common/Reveal";
import { filterTabs, projects } from "../../data/siteData";
import styles from "./Portfolio.module.css";

function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter(p => p.tags.includes(active));

  return (
      <section id="work" className={styles.section}>
        <div className={styles.glow} />

        <div className={styles.container}>
          <Reveal>
            <div className={styles.headingRow}>
              <div>
                <div className={styles.eyebrow}>
                  <div className={styles.eyebrowLine} />
                  <span className={styles.eyebrowText}>Portfolio</span>
                </div>
                <h2 className={styles.title}>Our Work</h2>
              </div>
              <div className={styles.tabs}>
                {filterTabs.map(t => (
                    <button
                      key={t}
                      onClick={() => setActive(t)}
                      className={`${styles.tab} ${active === t ? styles.tabActive : ""}`}
                    >
                      {t}
                    </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className={styles.grid}>
            {filtered.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.1}>
                  <ProjectCard p={p} />
                </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
}

function ProjectCard({ p }) {
  return (
      <article className={styles.card}>
        <div className={styles.thumb} style={{ background: p.gradient }}>
          <div className={styles.shine} />
          <div className={styles.thumbContent}>
            <span className={styles.category}>{p.category}</span>
            <div>
              {p.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <h3 className={styles.cardTitle}>{p.name}</h3>
          <div className={styles.metric}>
            <span className={styles.metricIcon}>↑</span>
            <span className={styles.metricText}>{p.metric}</span>
          </div>
          <div>
            <a href="#contact" className={styles.link}>
              View Case Study <span className={styles.linkArrow}>→</span>
            </a>
          </div>
        </div>
      </article>
  );
}


export default Portfolio;
