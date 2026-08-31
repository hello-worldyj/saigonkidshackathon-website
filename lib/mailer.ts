import nodemailer from "nodemailer";
import { EVENT } from "@/components/event";

function transporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD are not set");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendWaitlistConfirmation(to: string, name: string) {
  const from = process.env.GMAIL_USER!;
  await transporter().sendMail({
    from: `${EVENT.name} <${from}>`,
    to,
    subject: `You're on the list — ${EVENT.name}`,
    text: `Hi ${name},\n\nThanks for your interest in ${EVENT.name}! You're on the waitlist and we'll email you the moment registration opens (${EVENT.dateLong}, ${EVENT.city}).\n\nSee you there,\nThe ${EVENT.name} team`,
    html: `<p>Hi ${escapeHtml(name)},</p>
<p>Thanks for your interest in <strong>${EVENT.name}</strong>! You're on the waitlist and we'll email you the moment registration opens.</p>
<p><strong>${EVENT.dateLong}</strong> &middot; ${EVENT.city}</p>
<p>See you there,<br/>The ${EVENT.name} team</p>`,
  });
}

export async function sendRegistrationOpenEmail(to: string, name: string) {
  const from = process.env.GMAIL_USER!;
  await transporter().sendMail({
    from: `${EVENT.name} <${from}>`,
    to,
    subject: `Registration is open — ${EVENT.name}`,
    text: `Hi ${name},\n\nRegistration for ${EVENT.name} is now open! Spots are limited to ${EVENT.spots} makers, so grab yours soon.\n\n${EVENT.dateLong}, ${EVENT.city}\n\nSee you there,\nThe ${EVENT.name} team`,
    html: `<p>Hi ${escapeHtml(name)},</p>
<p>Registration for <strong>${EVENT.name}</strong> is now open! Spots are limited to ${EVENT.spots} makers, so grab yours soon.</p>
<p><strong>${EVENT.dateLong}</strong> &middot; ${EVENT.city}</p>
<p>See you there,<br/>The ${EVENT.name} team</p>`,
  });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}
