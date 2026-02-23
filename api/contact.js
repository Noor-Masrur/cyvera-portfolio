import nodemailer from "nodemailer";

const sanitize = (value) =>
  String(value || "")
    .replace(/[<>]/g, "")
    .trim();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = req.body || {};

  const name = sanitize(payload?.name);
  const email = sanitize(payload?.email);
  const company = sanitize(payload?.company);
  const service = sanitize(payload?.service);
  const message = sanitize(payload?.message);

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.CONTACT_TO_EMAIL) {
    return res.status(500).json({ error: "Server not configured" });
  }

  const subject = `New contact from ${name}`;
  const html = `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Company:</strong> ${company || "-"}</p>
    <p><strong>Service:</strong> ${service || "-"}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br />")}</p>
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
  } catch (err) {
    return res.status(500).json({ error: "Email send failed" });
  }
}
