"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Screws, Pushpin } from "./parts";
import { PrizeTag } from "./illustrations";
import SiteLink from "./SiteLink";
import { EVENT, FEE_COVERS, NONPROFIT_NOTE } from "./event";
import { ON_SITE_RULE, CHAPERONE_RULE } from "./parents";

gsap.registerPlugin(ScrollTrigger);

const SquareBullet = () => (
  <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-[3px] border-2 border-saigon bg-energy" aria-hidden="true" />
);

export default function CostAndRule() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;
      gsap.from(gsap.utils.toArray<HTMLElement>(".cost-line", section), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%" },
      });
      gsap.from(gsap.utils.toArray<HTMLElement>(".cost-card", section), {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cost" className="relative px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="cost-line mb-3 text-sm font-semibold text-saigon">Before anything else ✦</p>
          <h2 className="cost-line text-4xl font-bold leading-tight md:text-5xl">
            What it <span className="text-saigon">costs</span>, and the one{" "}
            <span className="text-energy">rule</span>
          </h2>
          <p className="cost-line mt-4 font-medium text-ink/60">
            Two things decide whether the day works for your family. Here they are, up front.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* the fee, on ruled paper */}
          <div className="cost-card paper-index relative rounded-2xl border-[3px] border-saigon p-6 pt-14 shadow-[0_6px_0_#cbd8ee] md:p-8 md:pt-14">
            <h3 className="absolute left-6 top-3 text-xs font-bold uppercase tracking-widest text-saigon/70">
              The fee
            </h3>
            <div className="relative inline-block pt-4">
              <span className="absolute left-[18px] top-0 h-5 w-[3px] rounded-full bg-saigon" aria-hidden="true" />
              <PrizeTag className="-rotate-1 [filter:drop-shadow(0_4px_0_#01337f)]">
                <span className="text-lg font-bold">{EVENT.fee.display} per builder</span>
              </PrizeTag>
            </div>
            <p className="mt-3 text-sm font-bold text-saigon">{NONPROFIT_NOTE}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-ink/50">What it covers</p>
            <ul className="mt-2 space-y-1">
              {FEE_COVERS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base font-medium leading-7 text-ink/70">
                  <SquareBullet />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-base font-medium leading-7 text-ink/70">
              How and when to pay comes with your registration confirmation. Registration opens soon.
            </p>
          </div>

          {/* the one rule, pinned to a white card */}
          <div className="cost-card relative rounded-2xl border-[3px] border-saigon bg-white p-6 shadow-[0_6px_0_#cbd8ee] md:p-8">
            <Screws />
            <Pushpin className="absolute -top-3 left-8" />
            <Pushpin className="absolute -top-3 right-8" />
            <span className="stamp -rotate-3 text-saigon" aria-hidden="true">
              Stays on site — all day
            </span>
            <h3 className="mt-4 text-xl font-bold leading-snug text-saigon md:text-2xl">{ON_SITE_RULE}</h3>
            <p className="mt-4 text-base font-medium leading-7 text-ink/70">{CHAPERONE_RULE}</p>
            <p className="mt-3 text-base font-medium leading-7 text-ink/70">
              Why: if a child feels unwell or anything unexpected happens, an adult who knows them is
              already on site.
            </p>
            <SiteLink
              href="/parents"
              className="mt-6 inline-flex rounded-full bg-energy px-5 py-2.5 text-sm font-bold text-ink shadow-[0_4px_0_#d18e07]"
            >
              Read the parents&apos; guide →
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
