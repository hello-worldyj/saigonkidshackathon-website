import { NextRequest, NextResponse } from "next/server";
import { appendWaitlistRow } from "@/lib/sheets";
import { sendWaitlistConfirmation } from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, parentEmail } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  const parentEmailValue = typeof parentEmail === "string" ? parentEmail.trim() : "";
  if (parentEmailValue && !EMAIL_RE.test(parentEmailValue)) {
    return NextResponse.json({ error: "Parent/guardian email looks invalid" }, { status: 400 });
  }

  const trimmedName = name.trim().slice(0, 200);
  const trimmedEmail = email.trim().slice(0, 200);

  try {
    await appendWaitlistRow({ name: trimmedName, email: trimmedEmail, parentEmail: parentEmailValue });
  } catch (err) {
    console.error("waitlist: failed to write to sheet", err);
    return NextResponse.json({ error: "Could not save your signup right now. Please try again shortly." }, { status: 502 });
  }

  try {
    await sendWaitlistConfirmation(trimmedEmail, trimmedName);
  } catch (err) {
    // signup is already saved — a failed confirmation email shouldn't fail the request
    console.error("waitlist: failed to send confirmation email", err);
  }

  return NextResponse.json({ ok: true });
}
