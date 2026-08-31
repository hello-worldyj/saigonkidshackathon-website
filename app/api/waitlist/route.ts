import { NextRequest, NextResponse } from "next/server";
import { appendWaitlistRow } from "@/lib/sheets";
import { sendWaitlistConfirmation } from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// the frontend can be served from Firebase Hosting (a different origin
// than this API's own Vercel deployment), so these routes need CORS.
const ALLOWED_ORIGINS = [
  "https://saigon-kids-hackathon.web.app",
  "https://saigon-kids-hackathon.firebaseapp.com",
  "https://saigonkidshackathon.web.app",
  "https://saigonkidshackathon.firebaseapp.com",
];

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = new Headers();
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  return headers;
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

export async function POST(req: NextRequest) {
  const headers = corsHeaders(req);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400, headers });
  }

  const { name, email, parentEmail, builderPhone, parentPhone } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400, headers });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400, headers });
  }
  const parentEmailValue = typeof parentEmail === "string" ? parentEmail.trim() : "";
  if (parentEmailValue && !EMAIL_RE.test(parentEmailValue)) {
    return NextResponse.json({ error: "Parent/guardian email looks invalid" }, { status: 400, headers });
  }
  const builderPhoneValue = typeof builderPhone === "string" ? builderPhone.trim().slice(0, 40) : "";
  const parentPhoneValue = typeof parentPhone === "string" ? parentPhone.trim().slice(0, 40) : "";

  const trimmedName = name.trim().slice(0, 200);
  const trimmedEmail = email.trim().slice(0, 200);

  try {
    await appendWaitlistRow({
      name: trimmedName,
      email: trimmedEmail,
      parentEmail: parentEmailValue,
      builderPhone: builderPhoneValue,
      parentPhone: parentPhoneValue,
    });
  } catch (err) {
    console.error("waitlist: failed to write to sheet", err);
    return NextResponse.json(
      { error: "Could not save your signup right now. Please try again shortly." },
      { status: 502, headers }
    );
  }

  try {
    await sendWaitlistConfirmation(trimmedEmail, trimmedName);
  } catch (err) {
    // signup is already saved — a failed confirmation email shouldn't fail the request
    console.error("waitlist: failed to send confirmation email", err);
  }

  return NextResponse.json({ ok: true }, { headers });
}
