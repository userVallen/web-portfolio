import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 3;
const ipRequestMap = new Map();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Invalid method" });
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  // * Rate limit
  const now = Date.now();
  const record = ipRequestMap.get(ip) || { reqCount: 0, lastReqTime: now };

  if (now - record.lastReqTime > RATE_LIMIT_WINDOW) {
    record.reqCount = 0;
    record.lastReqTime = now;
  }

  record.reqCount += 1;
  ipRequestMap.set(ip, record);

  if (record.reqCount > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: "Too many requests" });
  }

  const { name, email, message, company } = req.body;

  // * Honeypot
  if (company) {
    return res.status(200).json({ success: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing field" });
  }

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "vallen180303@gmail.com",
      subject: `New contact from ${name}`,
      replyTo: email,
      text: `${name} (${email})\n\n${message}`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Email failed" });
  }
}
