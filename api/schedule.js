import nodemailer from "nodemailer";

const sanitize = (value) =>
  String(value || "")
    .replace(/[<>]/g, "")
    .trim();

const parseDateParts = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  return { year, month, day };
};

const parseTimeParts = (value) => {
  if (!/^\d{2}:\d{2}$/.test(value)) return null;
  const [hour, minute] = value.split(":").map(Number);
  return { hour, minute };
};

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

const zonedTimeToUtc = (dateStr, timeStr, timeZone) => {
  const dateParts = parseDateParts(dateStr);
  const timeParts = parseTimeParts(timeStr);
  if (!dateParts || !timeParts) return null;

  const utcDate = new Date(Date.UTC(
    dateParts.year,
    dateParts.month - 1,
    dateParts.day,
    timeParts.hour,
    timeParts.minute,
    0
  ));

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = req.body || {};
  const name = sanitize(payload?.name);
  const email = sanitize(payload?.email);
  const company = sanitize(payload?.company);
  const phone = sanitize(payload?.phone);
  const service = sanitize(payload?.service);
  const message = sanitize(payload?.message);
  const website = sanitize(payload?.website);
  const preferredDate = sanitize(payload?.preferredDate);
  const preferredTime = sanitize(payload?.preferredTime);
  const timezone = sanitize(payload?.timezone) || "Australia/Brisbane";

  // Honeypot field: bots often fill hidden fields.
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !preferredDate || !preferredTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.CONTACT_TO_EMAIL) {
    return res.status(500).json({ error: "Server not configured" });
  }

  let utcDate;
  try {
    utcDate = zonedTimeToUtc(preferredDate, preferredTime, timezone);
  } catch {
    return res.status(400).json({ error: "Invalid timezone" });
  }

  if (!utcDate || Number.isNaN(utcDate.getTime())) {
    return res.status(400).json({ error: "Invalid date or time" });
  }

  const brisbaneParts = getZonedParts(utcDate, "Australia/Brisbane");
  const brisbaneHour = Number(brisbaneParts.hour);
  const brisbaneMinute = Number(brisbaneParts.minute);
  const validMinute = brisbaneMinute % 15 === 0;
  const withinWindow = brisbaneHour >= 9 && brisbaneHour <= 23 && (brisbaneHour !== 23 || brisbaneMinute === 0);
  if (!validMinute || !withinWindow) {
    return res.status(400).json({ error: "Time must be between 9:00 AM and 11:00 PM AEST in 15-minute increments" });
  }

  const displaySelected = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: timezone,
  }).format(utcDate);

  const displayBrisbane = new Intl.DateTimeFormat("en-AU", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Australia/Brisbane",
  }).format(utcDate);

  const subject = `New meeting request from ${name}`;
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111827; background: #f9fafb; padding: 24px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="padding: 20px 24px; background: #111827; color: #ffffff;">
          <p style="margin: 0; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.8;">Cyvera</p>
          <h2 style="margin: 6px 0 0; font-size: 20px;">New Meeting Request</h2>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tbody>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; width: 160px;">Name</td>
                <td style="padding: 10px 0; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280;">Email</td>
                <td style="padding: 10px 0; font-weight: 600;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280;">Company</td>
                <td style="padding: 10px 0; font-weight: 600;">${company || "-"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280;">Service</td>
                <td style="padding: 10px 0; font-weight: 600;">${service || "-"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280;">Contact Number</td>
                <td style="padding: 10px 0; font-weight: 600;">${phone || "-"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280;">Requested Time</td>
                <td style="padding: 10px 0; font-weight: 600;">${displaySelected} (${timezone})</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280;">Queensland Time</td>
                <td style="padding: 10px 0; font-weight: 600;">${displayBrisbane} (Australia/Brisbane)</td>
              </tr>
            </tbody>
          </table>
          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em;">Notes</p>
            <p style="margin: 0; line-height: 1.6;">${(message || "-").replace(/\n/g, "<br />")}</p>
          </div>
        </div>
        <div style="padding: 16px 24px; background: #f3f4f6; color: #6b7280; font-size: 12px;">
          Received on ${new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
        </div>
      </div>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_TO_EMAIL,
      subject,
      html,
      replyTo: email,
    });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Email send failed" });
  }
}
