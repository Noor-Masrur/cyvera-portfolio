import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import styles from "./SchedulerModal.module.css";

const getZonedParts = (date, timeZone) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = formatter.formatToParts(date).filter((p) => p.type !== "literal");
  return parts.reduce((acc, p) => {
    acc[p.type] = p.value;
    return acc;
  }, {});
};

const zonedDateTimeToUtc = ({ year, month, day, hour, minute, timeZone }) => {
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const parts = getZonedParts(utcDate, timeZone);
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  const offset = asUTC - utcDate.getTime();
  return new Date(utcDate.getTime() - offset);
};

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
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [tempDateTime, setTempDateTime] = useState(null);
  const [firstInteractionAt, setFirstInteractionAt] = useState(null);

  const markInteraction = () => {
    if (!firstInteractionAt) {
      setFirstInteractionAt(Date.now());
    }
  };

  const setField = (field, value) => {
    markInteraction();
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
      setFirstInteractionAt(null);
    }
  }, [open]);

  if (!open) return null;

  const pad2 = (val) => String(val).padStart(2, "0");
  const toDateString = (dt) => `${dt.year()}-${pad2(dt.month() + 1)}-${pad2(dt.date())}`;
  const toTimeString = (dt) => `${pad2(dt.hour())}:${pad2(dt.minute())}`;

  const openPicker = () => {
    markInteraction();
    const next = form.dateTime ? dayjs(form.dateTime) : dayjs().minute(Math.ceil(dayjs().minute() / 15) * 15).second(0);
    setTempDateTime(next);
    setPickerOpen(true);
  };

  const applyPicker = () => {
    markInteraction();
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
      try {
        const asDayjs = dayjs(form.dateTime);
        const utcDate = zonedDateTimeToUtc({
          year: asDayjs.year(),
          month: asDayjs.month() + 1,
          day: asDayjs.date(),
          hour: asDayjs.hour(),
          minute: asDayjs.minute(),
          timeZone: form.timezone || "Australia/Brisbane",
        });
        const brisbaneParts = getZonedParts(utcDate, "Australia/Brisbane");
        const h = Number(brisbaneParts.hour);
        const m = Number(brisbaneParts.minute);
        const validMinute = m % 15 === 0;
        const withinWindow = h >= 9 && h <= 23 && (h !== 23 || m === 0);
        if (!validMinute || !withinWindow) {
          e.dateTime = "Select a time between 9:00 AM and 11:00 PM AEST (15-min increments).";
        }
      } catch {
        e.dateTime = "Select a time between 9:00 AM and 11:00 PM AEST (15-min increments).";
      }
    }
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
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-cyvera-form": "1",
        },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            company: form.company,
            phone: form.phone,
            service: form.service,
            message: form.message,
            website: form.website,
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

  return (
      <div
        className={styles.overlay}
        onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      >
        <div className={styles.modal}>
          <button type="button" onClick={() => onClose?.()} aria-label="Close scheduler" className={styles.closeBtn}>×</button>

          <div className={styles.header}>
            <div className={styles.title}>Schedule a Meeting</div>
            <div className={styles.subtitle}>
              Availability: 9:00 AM to 11:00 PM AEST (Australia/Brisbane).
            </div>
          </div>

          {sent ? (
              <div className={styles.sentCard}>
                <div className={styles.sentEmoji}>🎉</div>
                <h3 className={styles.sentTitle}>Request Sent!</h3>
                <p className={styles.sentText}>We will confirm your time by email.</p>
              </div>
          ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={form.website}
                  onChange={(e) => setField("website", e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-10000px", opacity: 0, pointerEvents: "none" }}
                />
                <div className={styles.grid}>
                  <div>
                    <input value={form.name} onChange={e => setField("name", e.target.value)} placeholder="Full Name *" className={`${styles.field} ${errors.name ? styles.fieldError : ""}`} aria-label="Full Name" />
                    {errors.name && <p className={styles.error}>{errors.name}</p>}
                  </div>
                  <div>
                    <input value={form.email} onChange={e => setField("email", e.target.value)} placeholder="Email Address *" className={`${styles.field} ${errors.email ? styles.fieldError : ""}`} aria-label="Email Address" />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                  </div>
                </div>
                <div className={styles.fieldWrap}>
                  <input value={form.company} onChange={e => setField("company", e.target.value)} placeholder="Company (Optional)" className={styles.field} aria-label="Company" />
                </div>
                <div className={styles.fieldWrap}>
                  <select value={form.service} onChange={e => setField("service", e.target.value)} className={styles.field} aria-label="Service">
                    <option value="">Select a Service...</option>
                    <option>Social Media & Branding</option>
                    <option>Search Engine Optimization</option>
                    <option>Cybersecurity & Digital Forensics</option>
                    <option>Website Development</option>
                    <option>Custom Software</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.fieldWrap}>
                  <input value={form.phone} onChange={e => setField("phone", e.target.value)} placeholder="Contact Number (Optional)" className={styles.field} aria-label="Contact Number" />
                </div>
                <div className={styles.fieldWrap}>
                  <button
                    type="button"
                    onClick={openPicker}
                    className={`${styles.datetimeBtn} ${errors.dateTime ? styles.datetimeBtnError : ""}`}
                  >
                    <span>
                      {form.dateTime
                        ? dayjs(form.dateTime).format("MMMM D, YYYY · h:mm A")
                        : "Select date and time..."}
                    </span>
                    <span style={{ color: "rgba(10,37,64,0.45)" }}>📅</span>
                  </button>
                  <div className={styles.hint}>
                    Times are interpreted in the selected timezone.
                  </div>
                {errors.dateTime && <p className={styles.error}>{errors.dateTime}</p>}
              </div>
              {pickerOpen && (
                <div
                  className={styles.pickerOverlay}
                  onClick={(e) => { if (e.target === e.currentTarget) setPickerOpen(false); }}
                >
                  <div className={styles.pickerCard}>
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
                    <div className={styles.pickerActions}>
                      <button type="button" onClick={() => setPickerOpen(false)} className={styles.btnSecondary}>Cancel</button>
                      <button type="button" onClick={applyPicker} className={styles.btnPrimary}>Apply</button>
                    </div>
                  </div>
                </div>
              )}
                <div className={styles.fieldWrap}>
                  <select value={form.timezone} onChange={e => setField("timezone", e.target.value)} className={styles.field} aria-label="Timezone">
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
                <div className={styles.fieldWrap}>
                  <textarea value={form.message} onChange={e => setField("message", e.target.value)} placeholder="Notes (Optional)" rows={4} className={styles.field} aria-label="Notes" style={{ resize: "vertical" }} />
                </div>
                {submitError && (
                  <p className={styles.submitError}>{submitError}</p>
                )}
                <button type="submit" disabled={sending} aria-label="Schedule meeting" className={styles.submitBtn}>
                  {sending ? "Sending..." : "Send Request"}
                </button>
              </form>
          )}
        </div>
      </div>
  );
}

export default SchedulerModal;
