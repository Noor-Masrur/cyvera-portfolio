import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function SchedulerModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    dateTime: null,
    timezone: "Australia/Brisbane",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [tempDateTime, setTempDateTime] = useState(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setSent(false);
      setSubmitError("");
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const pad2 = (val) => String(val).padStart(2, "0");
  const toDateString = (dt) => `${dt.year()}-${pad2(dt.month() + 1)}-${pad2(dt.date())}`;
  const toTimeString = (dt) => `${pad2(dt.hour())}:${pad2(dt.minute())}`;

  const openPicker = () => {
    const next = form.dateTime ? dayjs(form.dateTime) : dayjs().minute(Math.ceil(dayjs().minute() / 15) * 15).second(0);
    setTempDateTime(next);
    setPickerOpen(true);
  };

  const applyPicker = () => {
    if (tempDateTime) {
      setForm((prev) => ({ ...prev, dateTime: tempDateTime.toDate() }));
    }
    setPickerOpen(false);
  };

  const theme = createTheme({
    palette: {
      primary: { main: "#00B4D8" },
    },
    typography: {
      fontFamily: "'DM Sans', sans-serif",
    },
  });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.dateTime) e.dateTime = "Date and time are required";
    if (form.dateTime instanceof Date && !Number.isNaN(form.dateTime.getTime())) {
      const asDayjs = dayjs(form.dateTime);
      const h = asDayjs.hour();
      const m = asDayjs.minute();
      const validMinute = m % 15 === 0;
      const withinWindow = h >= 9 && h <= 23 && (h !== 23 || m === 0);
      if (!validMinute || !withinWindow) {
        e.dateTime = "Select a time between 9:00 AM and 11:00 PM AEST (15-min increments).";
      }
    }
    return e;
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            company: form.company,
            phone: form.phone,
            service: form.service,
            message: form.message,
            preferredDate: form.dateTime ? toDateString(dayjs(form.dateTime)) : "",
            preferredTime: form.dateTime ? toTimeString(dayjs(form.dateTime)) : "",
            timezone: form.timezone || "Australia/Brisbane",
          }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Unable to schedule. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setSubmitError(err?.message || "Unable to schedule. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "14px 16px", borderRadius: 12, fontSize: 14,
    fontFamily: "'DM Sans', sans-serif", outline: "none",
    border: `1.5px solid ${errors[field] ? "#ef4444" : "rgba(10,37,64,0.12)"}`,
    background: "rgba(255,255,255,0.96)", color: "#0A2540",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 16px rgba(10,37,64,0.05)"
  });

  return (
      <div style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(3, 8, 20, 0.6)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20
      }}
           onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      >
        <div style={{
          width: "100%", maxWidth: 720, background: "linear-gradient(180deg, #fff 0%, #f5f9ff 100%)",
          borderRadius: 24, padding: 36, border: "1px solid rgba(0,180,216,0.18)",
          boxShadow: "0 30px 80px rgba(10,37,64,0.25)", position: "relative"
        }}>
          <button type="button" onClick={() => onClose?.()} aria-label="Close scheduler" style={{
            position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: 10,
            border: "1px solid rgba(10,37,64,0.1)", background: "#fff", color: "#0A2540",
            cursor: "pointer", fontSize: 18, lineHeight: 1
          }}>×</button>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 26, color: "#0A2540" }}>Schedule a Meeting</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(10,37,64,0.55)", marginTop: 6 }}>
              Availability: 9:00 AM to 11:00 PM AEST (Australia/Brisbane).
            </div>
          </div>

          {sent ? (
              <div style={{ textAlign: "center", padding: "80px 40px", background: "rgba(0,180,216,0.04)", borderRadius: 24, border: "1.5px solid rgba(0,180,216,0.15)" }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                <h3 style={{ fontSize: 28, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: "#0A2540", marginBottom: 12 }}>Request Sent!</h3>
                <p style={{ color: "rgba(10,37,64,0.55)", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>We will confirm your time by email.</p>
              </div>
          ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="scheduler-grid">
                  <div>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name *" style={inputStyle("name")} aria-label="Full Name" />
                    {errors.name && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{errors.name}</p>}
                  </div>
                  <div>
                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email Address *" style={inputStyle("email")} aria-label="Email Address" />
                    {errors.email && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{errors.email}</p>}
                  </div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company (Optional)" style={inputStyle()} aria-label="Company" />
                </div>
                <div style={{ marginTop: 14 }}>
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
                <div style={{ marginTop: 14 }}>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Contact Number (Optional)" style={inputStyle()} aria-label="Contact Number" />
                </div>
                <div style={{ marginTop: 14 }}>
                  <button
                    type="button"
                    onClick={openPicker}
                    className="scheduler-datetime-input"
                    style={{
                      borderRadius: 12,
                      border: `1.5px solid ${errors.dateTime ? "#ef4444" : "rgba(10,37,64,0.12)"}`,
                      background: "rgba(255,255,255,0.96)",
                      boxShadow: "0 4px 16px rgba(10,37,64,0.05)",
                      padding: "12px 16px",
                      width: "100%",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      cursor: "pointer"
                    }}
                  >
                    <span>
                      {form.dateTime
                        ? dayjs(form.dateTime).format("MMMM D, YYYY · h:mm A")
                        : "Select date and time..."}
                    </span>
                    <span style={{ color: "rgba(10,37,64,0.45)" }}>📅</span>
                  </button>
                  <div style={{ marginTop: 6, fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "rgba(10,37,64,0.45)" }}>
                    Times are interpreted in the selected timezone.
                  </div>
                {errors.dateTime && <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{errors.dateTime}</p>}
              </div>
              {pickerOpen && (
                <div style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 260,
                  background: "rgba(3, 8, 20, 0.65)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20
                }}
                     onClick={(e) => { if (e.target === e.currentTarget) setPickerOpen(false); }}
                >
                  <div style={{
                    width: "100%",
                    maxWidth: 520,
                    background: "linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%)",
                    borderRadius: 20,
                    border: "1px solid rgba(0,180,216,0.2)",
                    boxShadow: "0 30px 80px rgba(10,37,64,0.35)",
                    padding: 18
                  }}>
                    <ThemeProvider theme={theme}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker
                          value={tempDateTime}
                          onChange={(value) => setTempDateTime(value)}
                          minutesStep={15}
                          minTime={dayjs().hour(9).minute(0)}
                          maxTime={dayjs().hour(23).minute(0)}
                          slotProps={{
                            actionBar: { actions: [] },
                          }}
                          sx={{
                            width: "100%",
                            "& .MuiPickersLayout-contentWrapper": { width: "100%" },
                            "& .MuiPickersCalendarHeader-root": { color: "#0A2540" },
                            "& .MuiTypography-root": { fontFamily: "'DM Sans', sans-serif" },
                            "& .MuiPickersDay-root.Mui-selected": {
                              backgroundColor: "#00B4D8",
                            },
                            "& .MuiClock-pin, & .MuiClockPointer-root, & .MuiClockPointer-thumb": {
                              backgroundColor: "#00B4D8",
                              borderColor: "#00B4D8",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </ThemeProvider>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                      <button type="button" onClick={() => setPickerOpen(false)} style={{
                        padding: "10px 16px",
                        borderRadius: 10,
                        border: "1px solid rgba(10,37,64,0.15)",
                        background: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}>Cancel</button>
                      <button type="button" onClick={applyPicker} style={{
                        padding: "10px 18px",
                        borderRadius: 10,
                        border: "none",
                        background: "linear-gradient(90deg, #00B4D8, #0077B6)",
                        color: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}>Apply</button>
                    </div>
                  </div>
                </div>
              )}
                <div style={{ marginTop: 14 }}>
                  <select value={form.timezone} onChange={e => setForm({ ...form, timezone: e.target.value })} style={{ ...inputStyle(), cursor: "pointer" }} aria-label="Timezone">
                    {[
                      { value: "Australia/Brisbane", label: "Australia/Brisbane (AEST)" },
                      { value: "Australia/Sydney", label: "Australia/Sydney (AEDT/AEST)" },
                      { value: "Australia/Perth", label: "Australia/Perth (AWST)" },
                      { value: "Asia/Singapore", label: "Asia/Singapore (SGT)" },
                      { value: "Europe/London", label: "Europe/London (GMT/BST)" },
                      { value: "America/New_York", label: "America/New_York (ET)" },
                      { value: "America/Los_Angeles", label: "America/Los_Angeles (PT)" },
                      { value: "UTC", label: "UTC" },
                    ].map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div style={{ marginTop: 14 }}>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Notes (Optional)" rows={4} style={{ ...inputStyle(), resize: "vertical" }} aria-label="Notes" />
                </div>
                {submitError && (
                  <p style={{ color: "#ef4444", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 10 }}>
                    {submitError}
                  </p>
                )}
                <button type="submit" disabled={sending} aria-label="Schedule meeting" style={{
                  width: "100%", padding: "16px 26px", background: "linear-gradient(90deg, #00B4D8, #0077B6)",
                  color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800,
                  fontFamily: "'DM Sans', sans-serif", cursor: sending ? "not-allowed" : "pointer",
                  opacity: sending ? 0.8 : 1,
                  boxShadow: "0 0 40px rgba(0,180,216,0.4)", letterSpacing: "0.3px", transition: "transform 0.2s, box-shadow 0.2s",
                  marginTop: 16
                }}
                        onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 0 60px rgba(0,180,216,0.6)"; }}
                        onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 0 40px rgba(0,180,216,0.4)"; }}
                >{sending ? "Sending..." : "Send Request"}</button>
              </form>
          )}
        </div>
        <style>{`
          @media (max-width: 680px) { .scheduler-grid { grid-template-columns: 1fr !important; } }
          .scheduler-datetime-input {
            font-size: 14px;
            font-family: 'DM Sans', sans-serif;
            color: #0A2540;
          }
        `}</style>
      </div>
  );
}

export default SchedulerModal;
