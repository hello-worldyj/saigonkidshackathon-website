"use client";

import { useState, type FormEvent } from "react";
import { Sparkle } from "./decorations";

// on a static (Firebase) build there's no local /api — calls go straight to
// the Vercel deployment that hosts the real API routes.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

type Status = "idle" | "open" | "submitting" | "done" | "error";

export default function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      parentEmail: String(data.get("parentEmail") ?? ""),
      builderPhone: String(data.get("builderPhone") ?? ""),
      parentPhone: String(data.get("parentPhone") ?? ""),
    };

    try {
      const res = await fetch(`${API_BASE}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="hero-fade flex flex-col items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-energy px-7 py-3.5 text-base font-extrabold text-ink shadow-[0_6px_0_#d18e07]">
          You&apos;re on the list! Check your email.
          <Sparkle size={16} color="#1e293b" />
        </span>
        <p className="text-sm font-semibold text-ink/60">
          Don&apos;t see it? Check your spam folder.
        </p>
      </div>
    );
  }

  if (status === "idle") {
    return (
      <button
        type="button"
        onClick={() => setStatus("open")}
        className="hero-fade inline-flex items-center gap-2 rounded-full bg-energy px-7 py-3.5 text-base font-extrabold text-ink shadow-[0_6px_0_#d18e07] transition-transform hover:-translate-y-0.5"
      >
        Registration opens soon — notify me
        <Sparkle size={16} color="#1e293b" />
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hero-fade flex w-full max-w-md flex-col gap-3 rounded-2xl border-2 border-saigon bg-white/90 p-5 text-left shadow-[0_6px_0_#01337f]"
    >
      <p className="text-base font-extrabold text-ink">
        Be the first to know when registration opens
      </p>
      <input
        name="name"
        required
        placeholder="Participant's name"
        maxLength={200}
        className="rounded-lg border-2 border-saigon/40 px-3 py-2.5 text-base font-semibold text-ink placeholder:font-medium placeholder:text-ink/50 focus:border-saigon focus:outline-none"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        maxLength={200}
        className="rounded-lg border-2 border-saigon/40 px-3 py-2.5 text-base font-semibold text-ink placeholder:font-medium placeholder:text-ink/50 focus:border-saigon focus:outline-none"
      />
      <input
        name="parentEmail"
        type="email"
        placeholder="Parent/guardian email (optional)"
        maxLength={200}
        className="rounded-lg border-2 border-saigon/40 px-3 py-2.5 text-base font-semibold text-ink placeholder:font-medium placeholder:text-ink/50 focus:border-saigon focus:outline-none"
      />
      <input
        name="builderPhone"
        type="tel"
        placeholder="Builder's phone number (optional)"
        maxLength={40}
        className="rounded-lg border-2 border-saigon/40 px-3 py-2.5 text-base font-semibold text-ink placeholder:font-medium placeholder:text-ink/50 focus:border-saigon focus:outline-none"
      />
      <input
        name="parentPhone"
        type="tel"
        placeholder="Parent's phone number (optional)"
        maxLength={40}
        className="rounded-lg border-2 border-saigon/40 px-3 py-2.5 text-base font-semibold text-ink placeholder:font-medium placeholder:text-ink/50 focus:border-saigon focus:outline-none"
      />
      {error && <p className="text-sm font-bold text-red-600">{error}</p>}
      <div className="mt-1 flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-energy px-6 py-2.5 text-sm font-extrabold text-ink shadow-[0_4px_0_#d18e07] disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Notify me"}
        </button>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-extrabold text-ink/70 hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
