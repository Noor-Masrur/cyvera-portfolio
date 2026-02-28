import nodemailer from "nodemailer";

const sanitize = (value) =>
  String(value || "")
    .replace(/[<>]/g, "")
    .trim();

const TRUSTED_HOSTS = ["cyvera.com.au", "www.cyvera.com.au", "localhost", "127.0.0.1", "www.cyvera-portfolio.vercel.app"];

const getHostname = (value) => {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return "";
  }
};

const isAllowedHost = (host) => {
  if (!host) return false;
  if (TRUSTED_HOSTS.includes(host)) return true;
  return false;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const contentType = String(req.headers["content-type"] || "").toLowerCase();
  if (!contentType.includes("application/json")) {
    return res.status(415).json({ error: "Unsupported content type" });
  }

  const originHost = getHostname(req.headers.origin);
  const refererHost = getHostname(req.headers.referer);
  if (!isAllowedHost(originHost) && !isAllowedHost(refererHost)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (sanitize(req.headers["x-cyvera-form"]) !== "1") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const payload = req.body || {};

  const name = sanitize(payload?.name);
  const email = sanitize(payload?.email);
  const company = sanitize(payload?.company);
  const service = sanitize(payload?.service);
  const message = sanitize(payload?.message);
  const website = sanitize(payload?.website);

  // Honeypot field: bots often fill hidden fields.
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.CONTACT_TO_EMAIL) {
    return res.status(500).json({ error: "Server not configured" });
  }

  const subject = `New contact from ${name}`;
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111827; background: #f9fafb; padding: 24px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="padding: 20px 24px; background: #111827; color: #ffffff;">
          <p style="margin: 0; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.8;">Cyvera Portfolio</p>
          <h2 style="margin: 6px 0 0; font-size: 20px;">New Contact Request</h2>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tbody>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; width: 140px;">Name</td>
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
            </tbody>
          </table>
          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em;">Message</p>
            <p style="margin: 0; line-height: 1.6;">${message.replace(/\n/g, "<br />")}</p>
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
