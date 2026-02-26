import { useState } from "react";
import Reveal from "../common/Reveal";

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
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const inputStyle = (field) => ({
    width: "100%", padding: "15px 18px", borderRadius: 12, fontSize: 14,
    fontFamily: "'DM Sans', sans-serif", outline: "none",
    border: `1.5px solid ${errors[field] ? "#ef4444" : "rgba(10,37,64,0.12)"}`,
    background: "rgba(255,255,255,0.96)", color: "#0A2540",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 16px rgba(10,37,64,0.05)"
  });

  return (
      <section id="contact" style={{ padding: "120px 5%", background: resolvedTheme.sectionBg, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${resolvedTheme.accent}, transparent)` }} />

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16, justifyContent: "center" }}>
                <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, transparent, #00B4D8)" }} />
                <span style={{ color: resolvedTheme.accent, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase" }}>Get Started</span>
                <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${resolvedTheme.accent}, transparent)` }} />
              </div>
              <h2 style={{ fontSize: "clamp(34px, 4.5vw, 60px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: resolvedTheme.heading, letterSpacing: "-2px" }}>Let's Work Together</h2>
              <p style={{ color: resolvedTheme.text, fontFamily: "'DM Sans', sans-serif", fontSize: 16, marginTop: 16, maxWidth: 480, margin: "16px auto 0", lineHeight: 1.7 }}>Have a project in mind? Drop us a message and we'll get back within 24 hours.</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: 72, alignItems: "start" }} className="two-col">
            <Reveal>
              <div>
                <h3 style={{ fontSize: 24, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: resolvedTheme.heading, marginBottom: 36 }}>Contact Information</h3>
                {[
                  { icon: "✉️", label: "Email", val: "info@cyvera.com.au" },
                  { icon: "📍", label: "Location", val: "G3/62 Didsbury St, East Brisbane, QLD 4169" },
                  { icon: "⚡", label: "Response Time", val: "Within 24 hours" },
                ].map(item => (
                    <div key={item.label} style={{ display: "flex", gap: 16, marginBottom: 28, alignItems: "flex-start" }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: resolvedTheme.accentSoft, border: `1px solid ${resolvedTheme.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontSize: 11, color: "rgba(10,37,64,0.4)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 4 }}>{item.label}</div>
                        <div style={{ fontSize: 15, color: resolvedTheme.heading, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{item.val}</div>
                      </div>
                    </div>
                ))}

                {/* Social links */}
                <div style={{ marginTop: 40 }}>
                  <div style={{ fontSize: 11, color: "rgba(10,37,64,0.4)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 16 }}>Follow Us</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {["in", "ig", "𝕏", "gh"].map(s => (
                        <a key={s} href="#" style={{
                          width: 40, height: 40, borderRadius: 10, background: resolvedTheme.accentSoft,
                          border: `1px solid ${resolvedTheme.accentBorder}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "rgba(10,37,64,0.5)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                          textDecoration: "none", transition: "all 0.2s"
                        }}
                           onMouseEnter={e => { e.currentTarget.style.background = resolvedTheme.accent; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = resolvedTheme.accent; }}
                           onMouseLeave={e => { e.currentTarget.style.background = resolvedTheme.accentSoft; e.currentTarget.style.color = "rgba(10,37,64,0.5)"; e.currentTarget.style.borderColor = resolvedTheme.accentBorder; }}
                        >{s}</a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {sent ? (
                  <div style={{ textAlign: "center", padding: "80px 40px", background: "rgba(0,180,216,0.04)", borderRadius: 24, border: "1.5px solid rgba(0,180,216,0.15)" }}>
                    <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                    <h3 style={{ fontSize: 28, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 12 }}>Message Sent!</h3>
                    <p style={{ color: "rgba(10,37,64,0.55)", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>We'll be in touch within 24 hours.</p>
                  </div>
              ) : (
                  <form onSubmit={handleSubmit} style={{
                    background: "linear-gradient(180deg, #fff 0%, #f5f9ff 100%)",
                    borderRadius: 24, padding: 44,
                    border: `1px solid ${resolvedTheme.accentBorder}`,
                    boxShadow: "0 24px 60px rgba(10,37,64,0.1)"
                  }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-grid">
                      <div>
                        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name *" style={inputStyle("name")} aria-label="Full Name" />
                        {errors.name && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{errors.name}</p>}
                      </div>
                      <div>
                        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email Address *" style={inputStyle("email")} aria-label="Email Address" />
                        {errors.email && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{errors.email}</p>}
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company (Optional)" style={inputStyle()} aria-label="Company" />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ ...inputStyle(), cursor: "pointer" }} aria-label="Service">
                        <option value="">Select a Service...</option>
                        <option>Social Media & Branding</option>
                        <option>Search Engine Optimization</option>
                        <option>Cybersecurity & Digital Forensics</option>
                        <option>Website Development</option>
                        <option>Custom Software</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: 28 }}>
                      <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project... *" rows={5} style={{ ...inputStyle("message"), resize: "vertical" }} aria-label="Message" />
                      {errors.message && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{errors.message}</p>}
                    </div>
                    {submitError && (
                      <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>
                        {submitError}
                      </p>
                    )}
                    <button type="submit" disabled={sending} aria-label="Send message" style={{
                      width: "100%", padding: "17px 32px", background: `linear-gradient(90deg, ${resolvedTheme.accent}, ${resolvedTheme.accentStrong})`,
                      color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800,
                      fontFamily: "'DM Sans', sans-serif", cursor: sending ? "not-allowed" : "pointer",
                      opacity: sending ? 0.8 : 1,
                      boxShadow: "0 0 40px rgba(0,180,216,0.4)", letterSpacing: "0.3px", transition: "transform 0.2s, box-shadow 0.2s"
                    }}
                            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 0 60px rgba(0,180,216,0.6)"; }}
                            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 0 40px rgba(0,180,216,0.4)"; }}
                    >{sending ? "Sending..." : "Send Message"}</button>
                  </form>
              )}
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .form-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
  );
}


export default Contact;
