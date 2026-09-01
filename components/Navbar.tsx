"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SiteLink from "./SiteLink";

const LINKS = [
  { href: "/#cost", label: "Cost" },
  { href: "/#about", label: "About" },
  { href: "/#tracks", label: "Tracks" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/#prizes", label: "Prizes" },
  { href: "/#partners", label: "Partners" },
  { href: "/#founders", label: "Founders" },
  { href: "/#info", label: "Info" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-2 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 shadow-[0_4px_24px_rgba(1,69,180,0.10)] backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <SiteLink
          href="/"
          className="flex items-center gap-2"
          aria-label="Saigon Kids Hackathon — home"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Saigon Kids Hackathon logo"
            width={44}
            height={44}
            priority
          />
          <span className="hidden text-sm font-semibold text-saigon lg:block">
            Saigon Kids Hackathon
          </span>
        </SiteLink>

        <ul className="hidden items-center gap-5 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <SiteLink
                href={link.href}
                className="text-sm font-medium text-ink transition-colors hover:text-saigon"
              >
                {link.label}
              </SiteLink>
            </li>
          ))}
        </ul>

        <span className="hidden rounded-full bg-energy px-4 py-2 text-sm font-semibold text-ink sm:inline-block">
          March 6, 2027
        </span>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle mobile menu"
        >
          <span className={`h-0.5 w-5 bg-saigon transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`h-0.5 w-5 bg-saigon transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-saigon transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className={`absolute left-4 right-4 top-20 rounded-2xl bg-white/95 shadow-lg backdrop-blur md:hidden ${scrolled ? "" : "border border-saigon/20"}`}>
          <ul className="flex flex-col gap-0">
            {LINKS.map((link, i) => (
              <li key={link.href}>
                <SiteLink
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-6 py-3 text-sm font-medium text-ink transition-colors hover:text-saigon ${
                    i !== LINKS.length - 1 ? "border-b border-saigon/10" : ""
                  }`}
                >
                  {link.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
