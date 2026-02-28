import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "../common/Reveal";
import styles from "./Portfolio.module.css";

function getOffset(index, phase, total) {
  let offset = index - phase;
  const half = Math.floor(total / 2);
  if (offset > half) offset -= total;
  if (offset < -half) offset += total;
  return offset;
}

function Portfolio() {
  const CARD_COUNT = 5;
  const HOLD_MS = 1500;
  const MOVE_MS = 700;
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const phaseRef = useRef(0);
  const pausedRef = useRef(false);
  const currentIndexRef = useRef(0);
  const holdTimerRef = useRef(null);
  const frameRef = useRef(0);

  const clearCycle = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
  };

  const scheduleHold = () => {
    clearCycle();
    holdTimerRef.current = setTimeout(() => {
      if (pausedRef.current) return;
      const from = currentIndexRef.current;
      const to = (from + 1) % CARD_COUNT;
      const start = performance.now();

      const tick = (now) => {
        if (pausedRef.current) return;
        const t = Math.min((now - start) / MOVE_MS, 1);
        const eased = t < 0.5 ? 2 * t * t : 1 - (Math.pow(-2 * t + 2, 2) / 2);
        const nextPhase = from + eased;
        phaseRef.current = nextPhase;
        setPhase(nextPhase);

        if (t < 1) {
          frameRef.current = requestAnimationFrame(tick);
          return;
        }

        currentIndexRef.current = to;
        phaseRef.current = to;
        setPhase(to);
        scheduleHold();
      };

      frameRef.current = requestAnimationFrame(tick);
    }, HOLD_MS);
  };

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) {
      clearCycle();
      const snap = currentIndexRef.current;
      phaseRef.current = snap;
      setPhase(snap);
      return;
    }
    scheduleHold();
    return clearCycle;
  }, [paused]);

  const nudge = (step) => {
    clearCycle();
    const next = (currentIndexRef.current + step + CARD_COUNT) % CARD_COUNT;
    currentIndexRef.current = next;
    phaseRef.current = next;
    setPhase(next);
    if (!pausedRef.current) scheduleHold();
  };

  const cards = useMemo(
    () =>
      [1, 2, 3, 4, 5].map((id, index) => {
        const offset = getOffset(index, phase, CARD_COUNT);
        const abs = Math.abs(offset);
        return {
          id,
          transform:
            `translate(-50%, -50%) translateX(${offset * 70}%) translateZ(${-abs * 180}px) ` +
            `rotateY(${offset * -12}deg) scale(${Math.max(0.62, 1 - abs * 0.11)})`,
          opacity: abs > 2 ? 0 : 1 - abs * 0.24,
          zIndex: 100 - abs,
        };
      }),
    [phase]
  );

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
          </div>
        </Reveal>

        <Reveal>
          <div
            className={`${styles.dataCarouselWrap} ${styles.portfolioCarouselWrap}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0]?.clientX || 0;
            }}
            onTouchEnd={(event) => {
              const end = event.changedTouches[0]?.clientX || 0;
              const delta = end - touchStartX.current;
              if (delta > 40) nudge(-1);
              if (delta < -40) nudge(1);
            }}
          >
            <div className={styles.dataCarouselTrack}>
              {cards.map((card) => (
                <article
                  key={card.id}
                  className={`${styles.designCard} ${styles.dataSlideCard} ${styles[`c${card.id}`]}`}
                  style={{ transform: card.transform, opacity: card.opacity, zIndex: card.zIndex }}
                >
                  <DataCardContent id={card.id} />
                </article>
              ))}
            </div>
            <button
              type="button"
              aria-label="Previous card"
              className={`${styles.navButton} ${styles.navPrev}`}
              onClick={() => nudge(-1)}
            >
              &#10094;
            </button>
            <button
              type="button"
              aria-label="Next card"
              className={`${styles.navButton} ${styles.navNext}`}
              onClick={() => nudge(1)}
            >
              &#10095;
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DataCardContent({ id }) {
  if (id === 1) {
    return (
      <>
        <div className={styles.c1Left}>
          <div className={styles.c1ServiceTag}>
            <span className={styles.c1Dot} />
            <span className={styles.c1TagText}>Social Media Marketing</span>
          </div>
          <div>
            <div className={styles.c1Client}>Zestora Beverages Co.</div>
            <div className={styles.c1Title}>From <em>Unknown</em> to Viral</div>
          </div>
          <div className={styles.c1Desc}>Scaled social presence across Instagram, TikTok, and LinkedIn with measurable growth.</div>
          <div className={styles.c1Tags}>
            <span className={styles.c1Chip}>Content Strategy</span>
            <span className={styles.c1Chip}>Paid Social</span>
            <span className={styles.c1Chip}>Influencers</span>
          </div>
        </div>
        <div className={styles.c1Right}>
          <div className={styles.c1Stat}>
            <div className={styles.c1StatLabel}>Follower Growth</div>
            <div className={styles.c1StatValue}><span className={styles.c1Accent}>8.4</span>x</div>
            <div className={styles.c1StatSub}><span className={styles.up}>↑</span> 4,200 to 35,300</div>
          </div>
          <div className={styles.c1Stat}>
            <div className={styles.c1StatLabel}>Engagement Rate</div>
            <div className={styles.c1StatValue}>7.<span className={styles.c1Accent}>2</span>%</div>
            <div className={styles.c1StatSub}><span className={styles.up}>↑</span> Above category average</div>
          </div>
          <div className={styles.c1Stat}>
            <div className={styles.c1StatLabel}>Reach / Month</div>
            <div className={styles.c1StatValue}>2.<span className={styles.c1Accent}>1</span>M</div>
            <div className={styles.c1StatSub}><span className={styles.up}>↑</span> Organic + paid</div>
          </div>
          <div className={styles.c1Stat}>
            <div className={styles.c1StatLabel}>ROAS</div>
            <div className={styles.c1StatValue}><span className={styles.c1Accent}>4</span>.8x</div>
            <div className={styles.c1StatSub}><span className={styles.up}>↑</span> Campaign efficiency gain</div>
          </div>
        </div>
      </>
    );
  }

  if (id === 2) {
    return (
      <>
        <div className={styles.c2Left}>
          <div className={styles.c2Overline}>
            <span className={styles.c2ServiceBadge}>SEO Campaign</span>
            <span className={styles.c2ClientName}>Meridian Legal Group</span>
          </div>
          <div className={styles.c2Headline}><strong>Dominating</strong> Page <em>One</em></div>
          <div className={styles.c2MetricsRow}>
            <div className={styles.c2Metric}>
              <div className={styles.c2MetricVal}>312%</div>
              <div className={styles.c2MetricLabel}>Organic Traffic Growth</div>
            </div>
            <div className={styles.c2Metric}>
              <div className={styles.c2MetricVal}>48</div>
              <div className={styles.c2MetricLabel}>Keywords Ranking #1</div>
            </div>
            <div className={styles.c2Metric}>
              <div className={styles.c2MetricVal}>9<span className={styles.c2MetricUnit}>mo</span></div>
              <div className={styles.c2MetricLabel}>Time to Results</div>
            </div>
          </div>
        </div>
        <div className={styles.c2Right}>
          <div className={styles.c2RankLabel}>// top serp position</div>
          <div className={styles.c2RankNumber}>#1</div>
          <div className={styles.c2RankContext}>Google Search - UAE & GCC</div>
          <div className={styles.c2KeywordList}>
            <div className={styles.c2Keyword}><span className={styles.c2KwRank}>#1</span><div className={styles.c2KwTrack}><div className={styles.c2KwFill} style={{ width: "100%" }} /></div><span className={styles.c2KwText}>legal services</span></div>
            <div className={styles.c2Keyword}><span className={styles.c2KwRank}>#1</span><div className={styles.c2KwTrack}><div className={styles.c2KwFill} style={{ width: "100%" }} /></div><span className={styles.c2KwText}>business lawyer</span></div>
            <div className={styles.c2Keyword}><span className={styles.c2KwRank}>#2</span><div className={styles.c2KwTrack}><div className={styles.c2KwFill} style={{ width: "85%" }} /></div><span className={styles.c2KwText}>contract dispute</span></div>
          </div>
        </div>
      </>
    );
  }

  if (id === 3) {
    return (
      <>
        <div className={styles.c3GridBg} />
        <div className={styles.c3Scan} />
        <div className={styles.c3Inner}>
          <div className={styles.c3Left}>
            <div className={styles.c3Service}>Cyber Security</div>
            <div className={styles.c3Name}>NexVault <em>Financial</em></div>
            <div className={styles.c3ResultTag}><span>Zero breaches post-engagement</span></div>
          </div>
          <div className={styles.c3Mid}>
            <div className={styles.c3MidTop}>
              <div className={styles.c3Label}>Vulnerabilities Patched</div>
              <div className={styles.c3Big}>214</div>
              <div className={styles.c3Label}>across 6 systems</div>
            </div>
            <div className={styles.c3MidBot}>
              <div className={styles.c3Label}>Threat Breakdown</div>
              <div className={styles.c3ThreatBars}>
                <div className={styles.c3ThreatRow}><span className={styles.c3ThreatType}>Blocked</span><div className={styles.c3ThreatTrack}><div className={`${styles.c3ThreatFill} ${styles.fillBlocked}`} style={{ width: "88%" }} /></div><span className={styles.c3ThreatNum}>88%</span></div>
                <div className={styles.c3ThreatRow}><span className={styles.c3ThreatType}>Detected</span><div className={styles.c3ThreatTrack}><div className={`${styles.c3ThreatFill} ${styles.fillDetected}`} style={{ width: "100%" }} /></div><span className={styles.c3ThreatNum}>100%</span></div>
                <div className={styles.c3ThreatRow}><span className={styles.c3ThreatType}>Patched</span><div className={styles.c3ThreatTrack}><div className={`${styles.c3ThreatFill} ${styles.fillPatched}`} style={{ width: "96%" }} /></div><span className={styles.c3ThreatNum}>96%</span></div>
              </div>
            </div>
          </div>
          <div className={styles.c3Right}>
            <div className={styles.c3Label}>Compliance Score</div>
            <div className={styles.c3RingPct}>98%</div>
            <div className={styles.c3ClientInfo}>
              <span>Industry <strong>FinTech</strong></span>
              <span>Pentest <strong>Full Stack</strong></span>
              <span>Duration <strong>6 Weeks</strong></span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (id === 4) {
    return (
      <>
        <div className={styles.c4Left}>
          <div className={styles.c4Header}><span className={styles.c4Badge}>Custom Software</span><span className={styles.c4Year}>2024 - Delivered</span></div>
          <div className={styles.c4Title}>Supply Chain <em>Intelligence</em> Platform</div>
          <div className={styles.c4Desc}>Real-time logistics and supplier analytics across 14 warehouses and 9 countries.</div>
          <div className={styles.c4TechStack}>
            <span className={styles.c4Tech}>React</span>
            <span className={styles.c4Tech}>Node.js</span>
            <span className={styles.c4Tech}>PostgreSQL</span>
            <span className={styles.c4Tech}>AWS</span>
          </div>
        </div>
        <div className={styles.c4Right}>
          <div className={styles.c4StatsGrid}>
            <div className={styles.c4StatCell}><div className={styles.c4StatTag}>Delivery Time</div><div className={styles.c4StatNum}>64%</div><div className={styles.c4StatHint}>decrease</div></div>
            <div className={styles.c4StatCell}><div className={styles.c4StatTag}>Active Users</div><div className={styles.c4StatNum}>1.2K</div><div className={styles.c4StatHint}>daily operators</div></div>
            <div className={styles.c4StatCell}><div className={styles.c4StatTag}>Uptime SLA</div><div className={styles.c4StatNum}>99.9</div><div className={styles.c4StatHint}>percent</div></div>
            <div className={styles.c4StatCell}><div className={styles.c4StatTag}>Cost Saved</div><div className={styles.c4StatNum}>$2.8M</div><div className={styles.c4StatHint}>year one</div></div>
          </div>
          <div className={styles.c4Delivery}><span>Client: Orion Group</span><span className={styles.c4DeliveryBadge}>On Time</span></div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.c5Left}>
        <div className={styles.c5Overline}><span className={styles.c5ServiceLabel}>Web Development</span><span className={styles.c5ServiceLine} /></div>
        <div className={styles.c5Title}><strong>E-Commerce</strong> Re<em>launch</em></div>
        <div className={styles.c5ClientRow}>
          <div className={styles.c5Avatar}>LX</div>
          <div>
            <div className={styles.c5ClientName}>Luxara Home Interiors</div>
            <div className={styles.c5ClientType}>Premium Furniture · B2C</div>
          </div>
        </div>
        <div className={styles.c5Outcome}>Full redesign + custom build delivered in <strong>11 weeks</strong>.</div>
      </div>
      <div className={styles.c5Right}>
        <div className={styles.c5Cell}><span className={styles.c5CellTag}>Revenue Uplift</span><div className={styles.c5CellVal}>+186%</div><div className={styles.c5CellSub}>3 months post-launch</div></div>
        <div className={styles.c5Cell}><span className={styles.c5CellTag}>Bounce Rate</span><div className={styles.c5CellVal}>-41%</div><div className={styles.c5CellSub}>68% to 27%</div></div>
        <div className={styles.c5Cell}><span className={styles.c5CellTag}>Page Speed</span><div className={styles.c5CellVal}>98/100</div><div className={styles.c5CellSub}>CWV pass</div></div>
        <div className={styles.c5Cell}><span className={styles.c5CellTag}>Conversion</span><div className={styles.c5CellVal}>4.7%</div><div className={styles.c5CellSub}>from 1.2%</div></div>
      </div>
    </>
  );
}

export default Portfolio;
