import { useEffect, useRef } from "react";
import { Code2, MonitorSmartphone, Search, Server, ShieldCheck } from "lucide-react";
import styles from "./PlaygroundPage.module.css";

function PlaygroundPage({ onBack }) {
  const stackRef = useRef(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const handleMouse = (event) => {
      const rect = stack.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -8;
      const ry = ((x / rect.width) - 0.5) * 10;
      stack.style.setProperty("--tilt-x", `${rx.toFixed(2)}deg`);
      stack.style.setProperty("--tilt-y", `${ry.toFixed(2)}deg`);
    };

    const resetTilt = () => {
      stack.style.setProperty("--tilt-x", "0deg");
      stack.style.setProperty("--tilt-y", "0deg");
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseleave", resetTilt);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", resetTilt);
    };
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroOverlayGrid} />
        <div className={styles.heroAccentGlow} />
        <div className={styles.heroInner}>
          <button type="button" onClick={onBack} className={styles.backBtn}>← Back to Home</button>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Modern Tech Agency</p>
              <h1 className={styles.title}>
                Build authority-first brands
                <span> with </span>
                <span className={styles.titleAccent}>security-minded growth</span>
              </h1>
              <p className={styles.subtitle}>
                We blend narrative, performance marketing, and hardened infrastructure to ship digital experiences
                that convert and scale without compromise.
              </p>
              <div className={styles.tagRow}>
                {["Social Media", "SEO", "Cybersecurity", "Software Engineering"].map((tag) => (
                  <span key={tag} className={styles.tagPill}>{tag}</span>
                ))}
              </div>
              <div className={styles.heroActions}>
                <button type="button" className={styles.primaryBtn}>Book Strategy Call</button>
                <button type="button" className={styles.secondaryBtn}>View Capabilities</button>
              </div>
              <div className={styles.trustRow}>
                <div>
                  <strong>120+</strong>
                  <span>Clients served</span>
                </div>
                <div>
                  <strong>5.0</strong>
                  <span>Average rating</span>
                </div>
                <div>
                  <strong>ISO-ready</strong>
                  <span>Security workflows</span>
                </div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.perspectiveStage}>
                <div className={styles.ambientTilt}>
                  <div ref={stackRef} className={styles.visualStack}>
                    <div className={`${styles.visualCard} ${styles.visualCardTop}`}>
                      <p className={styles.cardLabel}>Social Analytics</p>
                      <div className={styles.cardChart}>
                        <div className={styles.cardBar} style={{ height: "60%" }} />
                        <div className={styles.cardBar} style={{ height: "82%" }} />
                        <div className={styles.cardBar} style={{ height: "40%" }} />
                        <div className={styles.cardBar} style={{ height: "72%" }} />
                      </div>
                      <span className={styles.cardBadge}>+312% engagement</span>
                    </div>
                    <div className={`${styles.visualCard} ${styles.visualCardMid}`}>
                      <p className={styles.cardLabel}>SEO Momentum</p>
                      <div className={styles.cardLine} />
                      <div className={styles.cardLine} />
                      <span className={styles.cardBadgeAlt}>Top 3 rankings</span>
                    </div>
                    <div className={`${styles.visualCard} ${styles.visualCardBottom}`}>
                      <p className={styles.cardLabel}>Security Monitor</p>
                      <div className={styles.iconRow}>
                        <span className={styles.iconBadge} aria-hidden="true">
                          <ShieldCheck size={20} />
                        </span>
                      </div>
                      <span className={styles.cardBadgeAlt}>Forensics Ready</span>
                    </div>
                    <div className={`${styles.visualCard} ${styles.visualCardBottomAlt}`}>
                      <p className={styles.cardLabel}>Software Engineering</p>
                      <div className={styles.iconBlockGrid} aria-hidden="true">
                        <span className={styles.iconBlock}><Code2 size={18} /></span>
                        <span className={styles.iconBlock}><MonitorSmartphone size={18} /></span>
                        <span className={styles.iconBlock}><Server size={18} /></span>
                        <span className={styles.iconBlock}><Search size={18} /></span>
                      </div>
                      <span className={styles.cardBadge}>Release Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.scrollIndicator}>
            <span>Scroll</span>
            <div className={styles.scrollArrow} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Block 01</p>
            <h2>Feature grid with media chips</h2>
          </div>
          <div className={styles.cardGrid}>
            {[
              {
                title: "Signal-rich dashboards",
                body: "Clean data layers with smart defaults so every team sees what matters.",
                chip: "Ops",
              },
              {
                title: "Launch-ready copy blocks",
                body: "Tone-matched narratives that translate product value into momentum.",
                chip: "Brand",
              },
              {
                title: "Security-first layouts",
                body: "Trust cues built into every interaction, without slowing conversion.",
                chip: "Security",
              },
            ].map((item) => (
              <div key={item.title} className={styles.card}>
                <span className={styles.cardChip}>{item.chip}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <button type="button" className={styles.cardButton}>Use Block</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Block 02</p>
            <h2>Split layout with timeline accents</h2>
          </div>
          <div className={styles.splitLayout}>
            <div className={styles.splitCopy}>
              <h3>Lifecycle-ready design system</h3>
              <p>
                Snap in components from this library as campaigns evolve. Each block is built with clear hierarchy,
                adaptable spacing, and a single source of truth for colors.
              </p>
              <div className={styles.timeline}>
                {[
                  "Exploration and visual language",
                  "Interactive prototypes and QA",
                  "Launch-ready components",
                ].map((step, index) => (
                  <div key={step} className={styles.timelineItem}>
                    <span className={styles.timelineIndex}>{index + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.splitPanel}>
              <div className={styles.panelHeader}>
                <span>Design Status</span>
                <strong>Active</strong>
              </div>
              <div className={styles.panelMetric}>
                <p>Reusable blocks</p>
                <h4>18</h4>
              </div>
              <div className={styles.panelMetric}>
                <p>In review</p>
                <h4>4</h4>
              </div>
              <div className={styles.panelFooter}>
                <span>Updated 2 hours ago</span>
                <button type="button">Open Library</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Block 03</p>
            <h2>Metric strip + quote combo</h2>
          </div>
          <div className={styles.metricStrip}>
            {[
              { label: "Conversion lift", value: "+28%" },
              { label: "Avg. time to ship", value: "9 days" },
              { label: "Design variants", value: "32" },
            ].map((metric) => (
              <div key={metric.label} className={styles.metricItem}>
                <p>{metric.label}</p>
                <h3>{metric.value}</h3>
              </div>
            ))}
          </div>
          <div className={styles.quoteCard}>
            <p>
              “We keep every experiment here until it proves itself. Once it does, it gets promoted to production
              sections with minimal friction.”
            </p>
            <div className={styles.quoteFooter}>
              <span className={styles.quoteAvatar}>CP</span>
              <div>
                <strong>Cyvera Design Lab</strong>
                <span>Internal Ops</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Block 04</p>
            <h2>CTA band with gradient accent</h2>
          </div>
          <div className={styles.ctaBand}>
            <div>
              <h3>Promote this block into production</h3>
              <p>Attach copy, swap imagery, and wire actions for any live section.</p>
            </div>
            <button type="button">Promote Block</button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Block 05</p>
            <h2>Data card layout (mini case-study tiles)</h2>
          </div>
          <div className={styles.dataGrid}>
            {[
              {
                industry: "Travel",
                title: "Bookings up, friction down",
                body: "A concierge-led booking platform that bundles itineraries, payment, and vendor ops into a single dashboard.",
                kpis: [
                  { label: "Pages in project", value: "42+", icon: "▦" },
                  { label: "Retention growth", value: "36%", icon: "↗" },
                  { label: "Time to launch", value: "6 wks", icon: "⏱" },
                  { label: "Pipeline lift", value: "2.1x", icon: "✦" },
                ],
                client: "Amara Group",
                role: "Head of Growth",
              },
              {
                industry: "Healthcare",
                title: "Patient journeys, unified",
                body: "A secure patient portal that syncs clinics, intake forms, and post-visit care in real time.",
                kpis: [
                  { label: "Automations shipped", value: "18", icon: "⚙" },
                  { label: "Care completion", value: "+24%", icon: "✓" },
                  { label: "Data latency", value: "<2s", icon: "⟲" },
                  { label: "SLA compliance", value: "99.9%", icon: "◎" },
                ],
                client: "Northbridge Health",
                role: "Chief Digital Officer",
              },
              {
                industry: "SaaS",
                title: "Sales enablement, reimagined",
                body: "An interactive demo hub and pipeline command center for an enterprise SaaS marketplace.",
                kpis: [
                  { label: "New ARR pipeline", value: "$3.8M", icon: "💠" },
                  { label: "Win rate", value: "+19%", icon: "▲" },
                  { label: "Buyer time-on-page", value: "4.2m", icon: "⟡" },
                  { label: "CSAT", value: "4.9/5", icon: "★" },
                ],
                client: "Vantagecloud",
                role: "VP Revenue",
              },
            ].map((card) => (
              <a key={card.title} href="#work" className={styles.dataCard}>
                <span className={styles.dataIndustry}>{card.industry}</span>
                <h3>{card.title}</h3>
                <p className={styles.dataBody}>{card.body}</p>
                <div className={styles.kpiGrid}>
                  {card.kpis.map((kpi) => (
                    <div key={kpi.label} className={styles.kpiCard}>
                      <span className={styles.kpiLabel}>
                        <span className={styles.kpiIcon}>{kpi.icon}</span>
                        {kpi.label}
                      </span>
                      <strong>{kpi.value}</strong>
                    </div>
                  ))}
                </div>
                <div className={styles.dataFooter}>
                  <div className={styles.clientStamp}>
                    <strong>{card.client}</strong>
                    <span>{card.role}</span>
                  </div>
                  <span className={styles.dataCta}>View Project →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Option 1</p>
            <h2>Editorial Rail Portfolio</h2>
          </div>
          <div className={styles.railLayout}>
            <div className={styles.railIntro}>
              <p className={styles.railEyebrow}>Portfolio Highlights</p>
              <h3>Five service case studies in an editorial rail.</h3>
              <p>
                A sticky narrative column paired with oversized data cards. Ideal for
                scrollytelling and bold outcome-led storytelling.
              </p>
              <button type="button">Use This Layout</button>
            </div>
            <div className={styles.railCards}>
              {[
                { service: "Social Media", title: "Audience momentum", result: "+312% engagement" },
                { service: "SEO", title: "Search dominance", result: "Top 3 rankings" },
                { service: "Cybersecurity", title: "Zero breach posture", result: "99.9% uptime" },
                { service: "Web Development", title: "High-convert launches", result: "+48% CVR" },
                { service: "Software Engineering", title: "Platform scale-up", result: "2.4x throughput" },
              ].map((card, index) => (
                <article
                  key={card.service}
                  className={`${styles.railCard} ${index % 2 === 0 ? styles.railCardShift : ""}`}
                >
                  <span>{card.service}</span>
                  <h4>{card.title}</h4>
                  <p>{card.result}</p>
                  <div className={styles.railKpis}>
                    <span>Launch-ready</span>
                    <span>Growth secured</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Option 2</p>
            <h2>Masonry Showcase Portfolio</h2>
          </div>
          <div className={styles.masonryGrid}>
            {[
              { service: "Social Media", title: "Social Commerce Funnel", size: "tall" },
              { service: "SEO", title: "Search-Led Demand Engine", size: "medium" },
              { service: "Cybersecurity", title: "Threat Intelligence Hub", size: "medium" },
              { service: "Web Development", title: "Conversion-First Site", size: "wide" },
              { service: "Software Engineering", title: "Enterprise Workflow Suite", size: "tall" },
            ].map((card) => (
              <article key={card.title} className={`${styles.masonryCard} ${styles[`masonry${card.size}`]}`}>
                <span>{card.service}</span>
                <h4>{card.title}</h4>
                <p>Outcome-focused build with measurable growth signals.</p>
                <div className={styles.masonryKpis}>
                  <strong>+28%</strong>
                  <span>Pipeline lift</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Option 3</p>
            <h2>Case Study Carousel Portfolio</h2>
          </div>
          <div className={styles.carouselWrap}>
            <div className={styles.carouselTrack}>
              {[
                { service: "Social Media", title: "Engagement flywheel", stat: "+312%" },
                { service: "SEO", title: "Search capture", stat: "Top 3" },
                { service: "Cybersecurity", title: "Zero breach architecture", stat: "99.9%" },
                { service: "Web Development", title: "Conversion launch", stat: "+48%" },
                { service: "Software Engineering", title: "Platform velocity", stat: "2.4x" },
              ].map((card) => (
                <article key={card.title} className={styles.carouselCard}>
                  <span>{card.service}</span>
                  <h4>{card.title}</h4>
                  <p>Structured deliverables with KPI-backed outcomes.</p>
                  <div className={styles.carouselKpis}>
                    <strong>{card.stat}</strong>
                    <span>Impact</span>
                  </div>
                  <button type="button">View Case Study</button>
                </article>
              ))}
            </div>
            <div className={styles.carouselHint}>Drag to explore →</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlaygroundPage;
