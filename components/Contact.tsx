"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteLink from "./SiteLink";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61594199272169", icon: "f" },
  { label: "Instagram", href: "https://www.instagram.com/saigonkidshackathon/", icon: "📷" },
  { label: "Discord", href: "#", disabled: true, icon: "💬" },
];

const EMAILS = [
  "ntran31@ssis.edu.vn",
  "nbui31@ssis.edu.vn",
  "cchan31@ssis.edu.vn",
  "bchoi31@ssis.edu.vn",
  "adao31@ssis.edu.vn",
  "lpham@ssis.edu.vn",
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.from(gsap.utils.toArray<HTMLElement>(".contact-line", section), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%" },
      });

      gsap.from(gsap.utils.toArray<HTMLElement>(".contact-card", section), {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative px-4 py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="contact-line mb-3 text-xs font-semibold text-saigon sm:text-sm">Get in touch ✦</p>
          <h2 className="contact-line text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Say <span className="text-energy">hello</span>
          </h2>
          <p className="contact-line mt-4 text-sm font-medium text-ink/60 sm:text-base">
            Have questions? Want to partner with us? Reach out any way that works for you.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:mt-12 md:gap-8 md:grid-cols-2">
          {/* Social & Quick Contact */}
          <div className="contact-card rounded-lg border-[3px] border-energy p-5 sm:p-6 md:p-8">
            <h3 className="text-lg font-bold text-energy">Follow & Connect</h3>

            <div className="mt-6 space-y-3">
              {SOCIALS.map((social) => (
                <div key={social.label}>
                  {social.disabled ? (
                    <button
                      disabled
                      className="inline-flex items-center gap-3 text-base font-semibold text-ink/40 cursor-not-allowed"
                    >
                      <span className="text-lg">{social.icon}</span>
                      <span>
                        {social.label} <span className="text-xs font-normal">— coming soon</span>
                      </span>
                    </button>
                  ) : (
                    <SiteLink
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-base font-semibold text-ink transition-colors hover:text-energy"
                    >
                      <span className="text-lg">{social.icon}</span>
                      {social.label}
                    </SiteLink>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-energy/20 pt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-energy">Quick Questions?</p>
              <p className="mt-3 text-base font-medium text-ink">
                Email us at{" "}
                <a
                  href="mailto:byeongminchoi12@gmail.com"
                  className="font-bold text-energy transition-colors hover:text-energy/80"
                >
                  byeongminchoi12@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Team Emails */}
          <div className="contact-card rounded-lg border-[3px] border-saigon p-5 sm:p-6 md:p-8">
            <h3 className="text-lg font-bold text-saigon">Organizing Team</h3>
            <p className="mt-2 text-sm font-medium text-ink/60">
              Reach out to any team member about partnerships, logistics, or specific questions.
            </p>

            <ul className="mt-6 space-y-2">
              {EMAILS.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="text-base font-medium text-ink transition-colors hover:text-energy"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
