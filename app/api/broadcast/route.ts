import { NextRequest, NextResponse } from "next/server";
import { listWaitlist } from "@/lib/sheets";
import { sendRegistrationOpenEmail } from "@/lib/mailer";

// Trigger manually once, when registration actually opens:
//   curl -X POST https://<your-site>/api/broadcast -H "Authorization: Bearer $BROADCAST_SECRET"
export async function POST(req: NextRequest) {
  const secret = process.env.BROADCAST_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "BROADCAST_SECRET is not configured" }, { status: 500 });
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entries = await listWaitlist();

  let sent = 0;
  const failed: string[] = [];
  for (const entry of entries) {
    try {
      await sendRegistrationOpenEmail(entry.email, entry.name);
      sent++;
    } catch (err) {
      console.error("broadcast: failed to email", entry.email, err);
      failed.push(entry.email);
    }
  }

  return NextResponse.json({ ok: true, total: entries.length, sent, failed });
}
