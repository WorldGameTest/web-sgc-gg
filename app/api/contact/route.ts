import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  role?: string;
  link?: string;
  discord?: string;
  message?: string;
};

type Submission = {
  name: string;
  email: string;
  role: string;
  link: string;
  discord: string;
  message: string;
  receivedAt: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// --- Telegram delivery --------------------------------------------------
async function sendTelegram(s: Submission): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const text =
    `📩 <b>New application — ${escapeHtml(s.role)}</b>\n\n` +
    `<b>Name:</b> ${escapeHtml(s.name)}\n` +
    `<b>Email:</b> ${escapeHtml(s.email)}\n` +
    `<b>Role:</b> ${escapeHtml(s.role)}\n` +
    `<b>Portfolio:</b> ${escapeHtml(s.link)}\n` +
    `<b>Discord:</b> ${escapeHtml(s.discord)}\n\n` +
    `<b>Message:</b>\n${escapeHtml(s.message)}`;

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    }
  );

  if (!res.ok) {
    console.error("[contact] Telegram error:", res.status, await res.text());
    return false;
  }
  return true;
}

// --- Email delivery (Resend) --------------------------------------------
async function sendEmail(s: Submission): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "collaborationsgc@mail.com";
  const from =
    process.env.CONTACT_FROM_EMAIL || "Sector Games <onboarding@resend.dev>";
  if (!apiKey) return false;

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;color:#0b0d10">
      <h2 style="margin:0 0 4px">New application — ${escapeHtml(s.role)}</h2>
      <p style="margin:0 0 16px;color:#6b7280;font-size:13px">Received ${new Date().toLocaleString()}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#6b7280;width:120px">Name</td><td style="padding:6px 0"><strong>${escapeHtml(s.name)}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#6b7280">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(s.email)}">${escapeHtml(s.email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#6b7280">Role</td><td style="padding:6px 0">${escapeHtml(s.role)}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280">Portfolio</td><td style="padding:6px 0">${escapeHtml(s.link)}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280">Discord</td><td style="padding:6px 0">${escapeHtml(s.discord)}</td></tr>
      </table>
      <p style="margin:16px 0 6px;color:#6b7280;font-size:13px">Message</p>
      <div style="white-space:pre-wrap;background:#f4f4f5;border-radius:8px;padding:14px;font-size:14px">${escapeHtml(s.message)}</div>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: s.email,
      subject: `New application — ${s.role} (${s.name})`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error:", res.status, await res.text());
    return false;
  }
  return true;
}

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const role = (body.role ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !role || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const submission: Submission = {
    name,
    email,
    role,
    link: (body.link ?? "").trim() || "—",
    discord: (body.discord ?? "").trim() || "—",
    message,
    receivedAt: new Date().toISOString(),
  };

  const telegramConfigured = Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
  );
  const emailConfigured = Boolean(process.env.RESEND_API_KEY);

  // No delivery channel set up (e.g. local dev) → log so nothing is lost.
  if (!telegramConfigured && !emailConfigured) {
    console.log("[contact] New application (no delivery configured):", submission);
    return NextResponse.json({ ok: true });
  }

  const results = await Promise.all([
    telegramConfigured ? sendTelegram(submission) : Promise.resolve(null),
    emailConfigured ? sendEmail(submission) : Promise.resolve(null),
  ]);

  // Succeed if at least one configured channel delivered.
  const delivered = results.some((r) => r === true);
  if (!delivered) {
    console.error("[contact] All delivery channels failed:", submission);
    return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
