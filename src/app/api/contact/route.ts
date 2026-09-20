import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = { name: 100, email: 254, message: 4000 };

/**
 * Validates and accepts a contact submission.
 *
 * NOTE: this does not yet deliver the message anywhere (no email/CRM
 * provider is configured for this project). Wire in a provider (e.g.
 * Resend, Postmark, or a webhook to your own inbox) before relying on this
 * in production — see the code comment below for exactly where.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message, company } = body as Record<string, unknown>;

  // Honeypot: a real visitor never fills this hidden field in. Treat a
  // filled one as a bot and pretend success so it doesn't learn anything.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ ok: false, error: "Enter your name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json(
      { ok: false, error: "Message must be at least 10 characters." },
      { status: 400 }
    );
  }
  if (
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    message.length > MAX_LENGTH.message
  ) {
    return NextResponse.json({ ok: false, error: "One of the fields is too long." }, { status: 400 });
  }

  // TODO: deliver the message once an email/CRM provider is configured,
  // e.g.:
  //   await resend.emails.send({ to: "...", subject: `Contact from ${name}`, text: message });
  // Until then this only validates the submission.

  return NextResponse.json({ ok: true });
}
