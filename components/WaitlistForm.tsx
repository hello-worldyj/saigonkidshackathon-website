"use client";

import { Sparkle } from "./decorations";
import { EVENT } from "./event";

export default function WaitlistForm() {
  return (
    <a
      href={EVENT.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-energy px-7 py-3 text-base font-extrabold text-ink shadow-[0_4px_0_#d18e07] transition-transform hover:-translate-y-0.5"
    >
      Registration opened — register now
      <Sparkle size={16} color="#1e293b" />
    </a>
  );
}
