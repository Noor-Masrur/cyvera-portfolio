import Reveal from "../common/Reveal";
import HeroBackdrop from "./HeroBackdrop";
import styles from "./ServicePageLayout.module.css";

export function ServiceHero({
  id = "service-overview",
  scheme,
  background,
  title,
  subtitle,
  onBack,
  onSchedule,
  primaryCta,
  secondaryCtas = [],
  tags = [],
}) {
  return (
    <section id={id} className={styles.hero} style={{ background }}>
      {scheme ? <HeroBackdrop scheme={scheme} /> : null}
      <div className={styles.heroContent}>
        <Reveal>
          <button type="button" onClick={onBack} className={styles.backBtn}>← Back to Home</button>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className={styles.heroTitle}>{title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.heroSubtitle}>{subtitle}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className={styles.heroActions}>
            <button
              type="button"
              onClick={() => (primaryCta?.onClick ? primaryCta.onClick() : onSchedule?.())}
              className={styles.heroPrimary}
              style={{
                "--cta-bg": primaryCta?.gradient,
                "--cta-shadow": primaryCta?.shadow,
              }}
            >
              {primaryCta?.label || "Schedule a Meeting"}
            </button>
            {secondaryCtas.map((cta) => (
              <a
                key={cta.href}
                href={cta.href}
                className={cta.variant === "ghost" ? styles.heroTertiary : styles.heroSecondary}
              >
                {cta.label}
              </a>
            ))}
          </div>
        </Reveal>
        {tags.length ? (
          <Reveal delay={0.2}>
            <div className={styles.tagRow}>
              {tags.map((item, i) => (
                <span
                  key={item}
                  className={styles.tag}
                  style={{
                    animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

export function ServiceSection({ id, background, children }) {
  return (
    <section id={id} className={styles.section} style={{ background }}>
      <div className={styles.sectionInner}>{children}</div>
    </section>
  );
}

export function SectionHeading({ kicker, title, subtitle, kickerColor, titleColor, subtitleColor, align = "center" }) {
  return (
    <div className={`${styles.heading} ${align === "left" ? styles.headingLeft : ""}`} style={{ "--kicker-color": kickerColor }}>
      {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
      {title ? <h2 className={styles.title} style={{ color: titleColor }}>{title}</h2> : null}
      {subtitle ? <div className={styles.subtitle} style={{ color: subtitleColor }}>{subtitle}</div> : null}
    </div>
  );
}

export function ServiceGrid({ cols = 3, variant = "fixed", className = "", children }) {
  const colClass = cols === 2 ? styles.gridCols2 : styles.gridCols3;
  const variantClass = variant === "auto" ? styles.gridAuto : colClass;
  return <div className={`${styles.grid} ${variantClass} ${className}`}>{children}</div>;
}

export function ServiceCard({ className = "", title, desc, meta, accent, children, style }) {
  return (
    <div className={`${styles.card} ${className}`} style={{ "--accent": accent, ...style }}>
      {title ? <div className={styles.cardTitle}>{title}</div> : null}
      {meta ? <div className={styles.cardMuted}>{meta}</div> : null}
      {desc ? <div className={styles.cardText}>{desc}</div> : null}
      {children}
    </div>
  );
}

export function StatCard({ value, label, accent }) {
  return (
    <div className={styles.statCard} style={{ "--accent": accent }}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export function PillRow({ items, pillBg, pillBorder }) {
  return (
    <div className={styles.pillRow} style={{ "--pill-bg": pillBg, "--pill-border": pillBorder }}>
      {items.map((t) => (
        <span key={t} className={styles.pill}>{t}</span>
      ))}
    </div>
  );
}

export function CTASection({ background, title, text, button, accentShadow, showPattern = false }) {
  return (
    <section className={styles.ctaStrip} style={{ "--cta-strip-bg": background }}>
      {showPattern ? <div className={styles.ctaPattern} /> : null}
      <div className={styles.ctaStripInner}>
        <div className={styles.ctaStripCopy}>
          <h2 className={styles.ctaStripTitle}>{title}</h2>
          <p className={styles.ctaStripText}>{text}</p>
        </div>
        <button
          type="button"
          onClick={button.onClick}
          className={styles.ctaStripBtn}
          style={{
            "--cta-bg": button.gradient,
            "--cta-shadow": accentShadow,
          }}
        >
          {button.label}
        </button>
      </div>
    </section>
  );
}
