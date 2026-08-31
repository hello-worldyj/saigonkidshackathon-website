"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, PixelGrid, PixelStack } from "./decorations";
import { Screws, Hook } from "./parts";
import { Trophy, Medal, Rosette, PrizeTag } from "./illustrations";
import { TEAM_AWARDS, SOLO_AWARDS, PRIZE_TBA, type TeamAward } from "./awards";

gsap.registerPlugin(ScrollTrigger);

const TOPPER: Record<TeamAward["place"], React.ReactNode> = {
  1: (
    <span className="relative inline-block">
      <Trophy size={76} className="h-auto w-[3.75rem] md:w-[76px]" />
      <Medal tone="gold" size={30} className="absolute -right-3 bottom-1 -z-[1] rotate-12" />
    </span>
  ),
  2: <Medal tone="silver" size={40} />,
  3: <Medal tone="bronze" size={38} />,
};

/* 2nd | 1st | 3rd left to right, the way a real podium reads — by grid
   order, so the dom (and a screen reader) still goes 1st, 2nd, 3rd */
const ORDER: Record<TeamAward["place"], string> = {
  1: "order-2",
  2: "order-1",
  3: "order-3",
};

/* each step has its own height — the winner stands tallest */
const CLIP: Record<TeamAward["place"], string> = {
  1: "h-32 md:h-40",
  2: "h-24 md:h-28",
  3: "h-20 md:h-24",
};

export default function Prizes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.from(gsap.utils.toArray<HTMLElement>(".prizes-line", section), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%" },
      });

      gsap.from(gsap.utils.toArray<HTMLElement>(".podium-step-col", section), {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: section, start: "top 75%" },
      });

      gsap.from(gsap.utils.toArray<HTMLElement>(".solo-award", section), {
        y: -40,
        opacity: 0,
        rotation: (i: number) => (i % 2 ? 6 : -6),
        stagger: 0.15,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: section.querySelector(".solo-grid") ?? section, start: "top 80%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="prizes" className="relative px-4 py-24">
      <div className="anchor-drift pointer-events-none absolute bottom-24 left-6 -z-[1] hidden lg:block">
        <PixelStack width={190} />
      </div>
      <div className="pointer-events-none absolute right-16 top-[30%] -z-[1] hidden lg:block">
        <Sparkle className="ambient-twinkle" size={56} />
      </div>
      <div className="pointer-events-none absolute left-[12%] top-28 -z-[1] hidden lg:block">
        <PixelGrid className="ambient-float" size={72} />
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="prizes-line mb-3 text-sm font-semibold text-saigon">Podium &amp; prizes ✦</p>
          <h2 className="prizes-line text-4xl font-bold leading-tight md:text-5xl">
            Three teams take the <span className="text-saigon">podium</span>
          </h2>
          <p className="prizes-line mt-4 font-medium text-ink/60">
            Every placing team goes home with medals and a prize for each member — and three solo
            awards go to individual builders.
          </p>
        </div>

        {/* the stage: a dark riveted box, three steps rising to different
            heights, a topper (trophy or medal) above each */}
        <div className="relative mx-auto mt-10 max-w-3xl rounded-3xl border-4 border-saigon bg-saigon-deep p-5 pt-10 shadow-[0_8px_0_#01337f] md:p-8 md:pt-14">
          <Screws className="opacity-60" />
          <div className="grid grid-cols-3 items-end gap-3 px-1 md:gap-6 md:px-4">
            {TEAM_AWARDS.map((award) => (
              <div key={award.place} className={`podium-step-col flex flex-col items-center ${ORDER[award.place]}`}>
                <div className="relative z-10 -mb-3 flex items-end justify-center">{TOPPER[award.place]}</div>
                <div
                  className={`${CLIP[award.place]} flex w-full flex-col items-center justify-center gap-1.5 rounded-t-2xl border-4 border-saigon-deep border-t-[8px] border-t-energy bg-saigon px-1 pb-3 shadow-[inset_0_-6px_0_#01337f]`}
                >
                  <span className="text-outline-white text-3xl font-bold leading-none md:text-5xl">
                    {award.ordinal}
                  </span>
                  <span className="metal-brushed rounded-md border-2 border-saigon px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-ink/70 md:text-[10px]">
                    {award.name}
                  </span>
                  <PrizeTag tone="white" className="mt-0.5 hidden sm:inline-flex">
                    <span className="whitespace-nowrap text-[10px]">+ a prize each</span>
                  </PrizeTag>
                </div>
              </div>
            ))}
          </div>
          <div className="stage-floor relative z-10 mt-1 h-8 rounded-b-xl border-4 border-t-0 border-saigon shadow-[0_5px_0_#01337f]" aria-hidden="true" />
        </div>

        {/* captions under each step, in the same three columns */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 px-1 text-center md:gap-6 md:px-4">
          {TEAM_AWARDS.map((award) => (
            <div key={award.place} className={ORDER[award.place]}>
              <h3 className="font-bold">{award.name}</h3>
              <ul className="mt-1 space-y-0.5 text-sm font-medium text-ink/70">
                {award.wins.map((win) => (
                  <li key={win} className="flex items-start justify-center gap-1.5">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-[2px] bg-energy" aria-hidden="true" />
                    <span>{win}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs font-semibold text-ink/60">{PRIZE_TBA}</p>
            </div>
          ))}
        </div>
      </div>

      {/* the solo awards: three rosettes hanging off one sagging string */}
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="mt-24 text-sm font-semibold text-saigon">Solo awards ✦</p>
          <h3 className="mt-3 text-2xl font-bold md:text-3xl">
            Three awards for <span className="text-energy">builders of one</span>
          </h3>
          <p className="mt-3 font-medium text-ink/60">
            No medals or trophies here — just a prize, for the individual builders who stood out.
          </p>
        </div>

        <div className="mt-10">
          <svg
            className="solo-string hidden h-10 w-full md:block"
            viewBox="0 0 600 40"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 8 Q300 40 600 8" stroke="#0145b4" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="solo-grid grid grid-cols-1 gap-8 md:-mt-6 md:grid-cols-3">
            {SOLO_AWARDS.map((award) => (
              <div key={award.id} className="solo-award">
                <div className="ambient-hang flex flex-col items-center">
                  <Hook />
                  <Rosette symbol={award.symbol} size={80} />
                  <div className="mt-2 w-full max-w-[16rem] rounded-xl border-[3px] border-saigon bg-white p-4 text-center shadow-[0_6px_0_#cbd8ee]">
                    <h4 className="text-lg font-bold">{award.name}</h4>
                    <p className="text-sm font-medium text-ink/65">{award.blurb}</p>
                    <PrizeTag className="mt-3">
                      <span className="text-xs">{award.prize}</span>
                    </PrizeTag>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
