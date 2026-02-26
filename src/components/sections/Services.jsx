import { useRef, useState } from "react";
import Reveal from "../common/Reveal";
import { services } from "../../data/siteData";
import styles from "./Services.module.css";

function Services({ onSelect }) {
  return (
      <section id="services" className={styles.section}>
        <div className={styles.bgText}>CAPABILITIES</div>

        <div className={styles.container}>
          <Reveal>
            <div className={styles.heading}>
              <div className={styles.eyebrow}>
                <div className={styles.eyebrowLine} />
                <span className={styles.eyebrowText}>What We Do</span>
              </div>
              <h2 className={styles.title}>
                Five disciplines.<br /><span className={styles.titleAccent}>One team.</span>
              </h2>
            </div>
          </Reveal>

          <div className={styles.grid}>
            {services.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.08}>
                  <TiltCard s={s} onSelect={onSelect} />
                </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
}

function TiltCard({ s, onSelect }) {
  const cardRef = useRef(null);
  const [style3d, setStyle3d] = useState({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hov, setHov] = useState(false);

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle3d({ transform: `perspective(600px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale(1.03)` });
    setGlowPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };
  const onMouseLeave = () => { setStyle3d({ transform: "perspective(600px) rotateX(0) rotateY(0) scale(1)", transition: "transform 0.5s ease" }); setHov(false); };
  const onMouseEnter = () => { setHov(true); };

  const accentBorder = hov ? `${s.color}80` : "rgba(10,37,64,0.07)";
  const accentShadow = hov
    ? `0 28px 70px ${s.color}30, 0 0 0 1px ${s.color}20`
    : "0 8px 32px rgba(10,37,64,0.08)";

  return (
      <button
          ref={cardRef} type="button"
          onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}
          onClick={() => onSelect?.(s.id)}
          className={`${styles.card} ${hov ? styles.cardHover : ""}`}
          style={{
            ...style3d,
            "--accent-border": accentBorder,
            "--accent-shadow": accentShadow,
          }}
      >
        {/* Spotlight glow */}
        <div
          className={`${styles.glow} ${hov ? styles.glowActive : ""}`}
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${s.accent} 0%, transparent 60%)`,
          }}
        />

        {/* Number watermark */}
        <span className={styles.watermark}>0{services.indexOf(services.find(x => x.id === s.id)) + 1}</span>

        <div
          className={`${styles.iconWrap} ${hov ? styles.iconWrapHover : ""}`}
          style={{
            background: `linear-gradient(135deg, ${s.color}25, ${s.color}10)`,
            border: `1px solid ${s.color}40`,
          }}
        >
          {s.icon}
        </div>

        <h3 className={styles.name}>{s.name}</h3>
        <p className={styles.desc}>{s.desc}</p>
        <div className={styles.spacer} />

        <span
          className={`${styles.cta} ${hov ? styles.ctaHover : ""}`}
          style={{
            background: hov
              ? `linear-gradient(90deg, ${s.color}55, ${s.color}25)`
              : `linear-gradient(90deg, ${s.color}35, ${s.color}15)`,
            border: `1px solid ${s.color}77`,
            boxShadow: hov
              ? `0 14px 30px ${s.color}40, 0 0 0 2px ${s.color}25`
              : `0 10px 22px ${s.color}25`,
          }}
        >
          Explore service
          <span
            className={`${styles.ctaArrow} ${hov ? styles.ctaArrowHover : ""}`}
            style={{ background: hov ? s.color : "rgba(10,37,64,0.22)" }}
          >
            →
          </span>
        </span>
      </button>
  );
}


export default Services;
