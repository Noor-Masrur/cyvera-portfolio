import { useState } from "react";
import Reveal from "../common/Reveal";
import Contact from "./Contact";
import { faqCategories } from "../../data/siteData";
import styles from "./FAQPage.module.css";

function FAQPage({ onBack, onSchedule }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const hasQuery = normalizedQuery.length >= 2;

  const filteredCategories = faqCategories.map((cat) => {
    if (!hasQuery) return cat;
    const items = cat.items.filter((item) => {
      const hay = `${item.q} ${item.a}`.toLowerCase();
      return hay.includes(normalizedQuery);
    });
    return { ...cat, items };
  });

  const visibleCount = filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
      <div>
        <section id="faq-hero" className={styles.hero}>
          <div className={styles.heroDots} />
          <div className={styles.heroContent}>
            <Reveal>
              <button type="button" onClick={onBack} className={styles.backBtn}>← Back to Home</button>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className={styles.heroSubtitle}>
                Quick answers about our services, delivery process, and support.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="faq" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.layout}>
              <aside className={styles.aside}>
                <div className={styles.card}>
                  <div className={styles.cardTitle}>Quick Links</div>
                  <div className={styles.linkGrid}>
                    {faqCategories.map((cat) => (
                        <a key={cat.id} href={`#${cat.id}`} className={styles.quickLink}>
                          {cat.title}
                          <div className={styles.quickLinkSubtitle}>{cat.subtitle}</div>
                        </a>
                    ))}
                  </div>
                  <div className={styles.cardActions}>
                    <button type="button" onClick={() => onSchedule?.()} className={styles.scheduleBtn}>
                      Schedule a Meeting
                    </button>
                  </div>
                </div>
              </aside>

              <div>
                <div className={styles.searchWrap}>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for answers..."
                    className={styles.searchInput}
                  />
                  <span className={styles.searchIcon}>🔍</span>
                </div>

                {hasQuery && visibleCount === 0 && (
                    <div className={styles.noResults}>
                      <div className={styles.noResultsTitle}>No results found</div>
                      <div className={styles.noResultsText}>
                        Try different keywords or reach out for a custom answer.
                      </div>
                    </div>
                )}

                <div className={styles.categories}>
                  {filteredCategories.map((cat) => (
                      <div key={cat.id} id={cat.id} className={styles.category}>
                        <div style={{ marginBottom: 16 }}>
                          <div className={styles.categoryTitle}>{cat.title}</div>
                          <div className={styles.categorySubtitle}>{cat.subtitle}</div>
                        </div>
                        <div className={styles.items}>
                          {cat.items.map((item) => (
                              <details key={item.q} className={styles.details}>
                                <summary className={styles.summary}>{item.q}</summary>
                                <div className={styles.answer}>{item.a}</div>
                              </details>
                          ))}
                          {hasQuery && cat.items.length === 0 && (
                              <div className={styles.noMatches}>
                                No matches in this section.
                              </div>
                          )}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Contact theme={{
          sectionBg: "linear-gradient(180deg, #F7FAFC 0%, #ECF4FF 100%)",
          accent: "#00B4D8",
          accentStrong: "#0077B6",
          accentSoft: "rgba(0,180,216,0.08)",
          accentBorder: "rgba(0,180,216,0.2)",
          heading: "#0A2540",
          text: "rgba(10,37,64,0.55)"
        }} />
      </div>
  );
}


export default FAQPage;
