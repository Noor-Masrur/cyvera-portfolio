import { useState } from "react";
import Reveal from "../common/Reveal";
import styles from "./Contact.module.css";

function Contact({ theme }) {
  const resolvedTheme = {
    sectionBg: "linear-gradient(180deg, #FFFFFF 0%, #F2F7FF 100%)",
    accent: "#00B4D8",
    accentStrong: "#0077B6",
    accentSoft: "rgba(0,180,216,0.07)",
    accentBorder: "rgba(0,180,216,0.18)",
    heading: "#0A2540",
    text: "rgba(10,37,64,0.5)",
    ...theme,
  };
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "", website: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [firstInteractionAt, setFirstInteractionAt] = useState(null);
  const socialLinks = [
    { label: "in", href: "https://www.linkedin.com/company/cyvera0/" },
    { label: "ig", href: "https://www.instagram.com/cyvera0/" },
    { label: "𝕏", href: "https://x.com/cyvera0" },
    { label: "fb", href: "https://www.facebook.com/cyvera0/" },
  ];

  const markInteraction = () => {
    if (!firstInteractionAt) {
      setFirstInteractionAt(Date.now());
    }
  };

  const setField = (field, value) => {
    markInteraction();
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    const elapsedSinceFirstInteraction = firstInteractionAt ? Date.now() - firstInteractionAt : 0;
    if (!firstInteractionAt || elapsedSinceFirstInteraction < 2500) {
      setSubmitError("Please take a moment before submitting.");
      return;
    }
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-cyvera-form": "1",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Unable to send message. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setSubmitError(err?.message || "Unable to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
      <section
        id="contact"
        className={styles.section}
        style={{
          background: resolvedTheme.sectionBg,
        }}
      >
        <div
          className={styles.divider}
          style={{
            background: `linear-gradient(90deg, transparent, ${resolvedTheme.accent}, transparent)`,
          }}
        />

        <div className={styles.container}>
          <Reveal>
            <div className={styles.heading}>
              <div className={styles.eyebrow}>
                <div className={styles.eyebrowLine} />
                <span className={styles.eyebrowText} style={{ color: resolvedTheme.accent }}>Get Started</span>
                <div
                  className={styles.eyebrowLineReverse}
                  style={{ background: `linear-gradient(90deg, ${resolvedTheme.accent}, transparent)` }}
                />
              </div>
              <h2 className={styles.title} style={{ color: resolvedTheme.heading }}>Let's Work Together</h2>
              <p className={styles.subtitle} style={{ color: resolvedTheme.text }}>
                Have a project in mind? Drop us a message and we'll get back within 24 hours.
              </p>
            </div>
          </Reveal>

          <div className={styles.grid}>
            <Reveal>
              <div>
                <h3 className={styles.infoTitle} style={{ color: resolvedTheme.heading }}>Contact Information</h3>
                {[
                  { icon: "✉️", label: "Email", val: "info@cyvera.com.au" },
                  { icon: "📍", label: "Location", val: "G3/62 Didsbury St, East Brisbane, QLD 4169" },
                  { icon: "⚡", label: "Response Time", val: "Within 24 hours" },
                ].map(item => (
                    <div key={item.label} className={styles.infoItem}>
                      <div
                        className={styles.infoIcon}
                        style={{
                          background: resolvedTheme.accentSoft,
                          borderColor: resolvedTheme.accentBorder,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className={styles.infoLabel}>{item.label}</div>
                        <div className={styles.infoValue} style={{ color: resolvedTheme.heading }}>{item.val}</div>
                      </div>
                    </div>
                ))}

                <div className={styles.socialWrap}>
                  <div className={styles.socialTitle}>Follow Us</div>
                  <div className={styles.socialRow}>
                    {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialLink}
                          style={{
                            background: resolvedTheme.accentSoft,
                            borderColor: resolvedTheme.accentBorder,
                            color: "rgba(10,37,64,0.5)",
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = resolvedTheme.accent;
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.borderColor = resolvedTheme.accent;
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = resolvedTheme.accentSoft;
                            e.currentTarget.style.color = "rgba(10,37,64,0.5)";
                            e.currentTarget.style.borderColor = resolvedTheme.accentBorder;
                          }}
                        >
                          {social.label}
                        </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {sent ? (
                  <div className={styles.sentCard}>
                    <div className={styles.sentEmoji}>🎉</div>
                    <h3 className={styles.sentTitle}>Message Sent!</h3>
                    <p className={styles.sentText}>We'll be in touch within 24 hours.</p>
                  </div>
              ) : (
                  <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                    style={{ borderColor: resolvedTheme.accentBorder }}
                  >
                    <input
                      type="text"
                      value={form.website}
                      onChange={(e) => setField("website", e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-10000px", opacity: 0, pointerEvents: "none" }}
                    />
                    <div className={styles.formGrid}>
                      <div>
                        <input
                          value={form.name}
                          onChange={e => setField("name", e.target.value)}
                          placeholder="Full Name *"
                          className={`${styles.field} ${errors.name ? styles.fieldError : ""}`}
                          aria-label="Full Name"
                        />
                        {errors.name && <p className={styles.error}>{errors.name}</p>}
                      </div>
                      <div>
                        <input
                          value={form.email}
                          onChange={e => setField("email", e.target.value)}
                          placeholder="Email Address *"
                          className={`${styles.field} ${errors.email ? styles.fieldError : ""}`}
                          aria-label="Email Address"
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                      </div>
                    </div>
                    <div className={styles.fieldWrap}>
                      <input
                        value={form.company}
                        onChange={e => setField("company", e.target.value)}
                        placeholder="Company (Optional)"
                        className={styles.field}
                        aria-label="Company"
                      />
                    </div>
                    <div className={styles.fieldWrap}>
                      <select
                        value={form.service}
                        onChange={e => setField("service", e.target.value)}
                        className={styles.field}
                        aria-label="Service"
                      >
                        <option value="">Select a Service...</option>
                        <option>Social Media & Branding</option>
                        <option>Search Engine Optimization</option>
                        <option>Cybersecurity & Digital Forensics</option>
                        <option>Website Development</option>
                        <option>Custom Software</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className={styles.fieldWrapLg}>
                      <textarea
                        value={form.message}
                        onChange={e => setField("message", e.target.value)}
                        placeholder="Tell us about your project... *"
                        rows={5}
                        className={`${styles.field} ${errors.message ? styles.fieldError : ""}`}
                        aria-label="Message"
                        style={{ resize: "vertical" }}
                      />
                      {errors.message && <p className={styles.error}>{errors.message}</p>}
                    </div>
                    {submitError && (
                      <p className={styles.submitError}>{submitError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={sending}
                      aria-label="Send message"
                      className={styles.submitBtn}
                      style={{
                        background: `linear-gradient(90deg, ${resolvedTheme.accent}, ${resolvedTheme.accentStrong})`,
                      }}
                    >
                      {sending ? "Sending..." : "Send Message"}
                    </button>
                  </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
  );
}


export default Contact;
