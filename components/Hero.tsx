"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PixelGrid,
  Sparkle,
  SaigonSkyline,
  PalmSilhouette,
  PixelPlanet,
  FloatingLaptop,
  FlightArc,
  PixelStack,
} from "./decorations";
import { LogoSlot } from "./parts";
import SiteLink from "./SiteLink";
import WaitlistForm from "./WaitlistForm";
import { PARTNERS } from "./partners";
import { EVENT, AGES } from "./event";

gsap.registerPlugin(ScrollTrigger);

function SplitWord({ word, className }: { word: string; className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      {word.split("").map((char, i) => (
        <span
          key={i}
          className="hero-letter inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      const intro = gsap.timeline({ defaults: { ease: "back.out(1.6)" } });
      intro
        .from(".hero-sign", {
          y: 50,
          scale: 0.92,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.4)",
        })
        .from(
          ".hero-letter",
          {
            y: 40,
            opacity: 0,
            rotate: () => gsap.utils.random(-12, 12),
            duration: 0.6,
            stagger: 0.03,
          },
          "-=0.35"
        )
        .from(
          ".hero-fade",
          { y: 24, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" },
          "-=0.3"
        )
        .from(
          ".hero-spire-ring",
          {
            scale: 0,
            opacity: 0,
            transformOrigin: "50% 50%",
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(2)",
          },
          "-=1"
        )
        .from(".hero-logo", { scale: 0, duration: 0.7, ease: "back.out(2)" }, "-=1");

      // the sign gently floats (translate only — the logo inside never rotates)
      gsap.to(".hero-sign", {
        y: -8,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.5,
      });

      // floating accents drift at their own parallax speeds
      // (constant idle motion lives on the inner svg via AmbientMotion)
      gsap.utils.toArray<HTMLElement>(".hero-float").forEach((el) => {
        const speed = Number(el.dataset.speed ?? 1);
        gsap.to(el, {
          y: () => -120 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });

      // the whole hero gently recedes as you scroll on
      gsap.to(".hero-content", {
        opacity: 0,
        scale: 0.94,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "40% top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-hint", {
        y: 8,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-3 pt-16 pb-8 sm:px-4 sm:pt-28 md:pb-16 md:pt-40"
    >
      {/* scene: saigon skyline left, palms right (the hoover-tower analog) */}
      {/* the three anchors: big tower left, sign center, foliage corner right */}
      <SaigonSkyline
        className="hero-float pointer-events-none absolute -left-16 bottom-0 hidden sm:block"
        width={660}
        data-speed="0.3"
      />
      <div className="hero-float pointer-events-none absolute -right-8 bottom-0 hidden md:block" data-speed="0.35">
        <PalmSilhouette className="ambient-sway" width={420} />
      </div>
      <div className="hero-float pointer-events-none absolute -right-4 -bottom-3 hidden md:block" data-speed="0.32">
        <PixelStack className="ambient-float" data-amp="s" width={160} />
      </div>

      {/* floating scene props (fewer, bigger — the anchors carry the scene) */}
      <div className="hero-float absolute left-[7%] top-[12%]" data-speed="1.2">
        <PixelPlanet className="ambient-float" size={124} />
      </div>
      <div className="hero-float absolute right-[7%] top-[13%] hidden md:block" data-speed="1.4">
        <FloatingLaptop className="ambient-float" width={132} />
      </div>
      <div className="hero-float absolute right-[11%] top-[34%] hidden lg:block" data-speed="1.1">
        <FlightArc className="ambient-float" width={245} />
      </div>
      <div className="hero-float absolute left-[6%] bottom-[28%] hidden lg:block" data-speed="0.9">
        <FlightArc className="ambient-float -scale-x-100" width={195} color="#f8ac1a" />
      </div>
      <div className="hero-float absolute left-[21%] top-[26%]" data-speed="1.6">
        <PixelGrid className="ambient-float" size={48} />
      </div>
      <div className="hero-float absolute right-[19%] top-[9%]" data-speed="1.1">
        <Sparkle className="ambient-twinkle" size={34} />
      </div>
      <div className="hero-float absolute right-[5%] bottom-[40%] hidden md:block" data-speed="1.3">
        <Sparkle className="ambient-twinkle" size={27} />
      </div>

      <div className="hero-content relative flex max-w-4xl flex-col items-center text-center">
        <div className="relative">
          {/* the sign */}
          <div className="hero-sign relative rounded-[1.5rem] border-4 border-saigon bg-white px-4 py-5 shadow-[inset_0_0_0_4px_#c9d7ee,inset_0_-3px_0_4px_#a8bfe2,0_6px_24px_rgba(1,69,180,0.12)] sm:rounded-[2rem] sm:border-[6px] sm:px-8 sm:py-8 sm:shadow-[inset_0_0_0_6px_#c9d7ee,inset_0_-4px_0_6px_#a8bfe2,0_10px_40px_rgba(1,69,180,0.12)] md:px-14 md:py-10">
            {/* pixel-grid accents tucked into the bevel's corners */}
            <PixelGrid className="absolute left-2 top-2 sm:left-4 sm:top-4" size={12} />
            <PixelGrid className="absolute right-2 top-2 -scale-x-100 sm:right-4 sm:top-4 sm:size-4" size={12} />
            <PixelGrid className="absolute bottom-2 left-2 -scale-y-100 sm:bottom-4 sm:left-4" size={12} />
            <PixelGrid className="absolute bottom-2 right-2 -scale-100 sm:bottom-4 sm:right-4" size={12} />
            {/* spire + golden rings */}
            <svg
              className="absolute -top-16 left-1/2 h-20 w-16 -translate-x-1/2"
              viewBox="0 0 64 80"
              fill="none"
              aria-hidden="true"
            >
              <path d="M32 80 L32 14" stroke="#0145b4" strokeWidth="6" strokeLinecap="round" />
              <circle cx="32" cy="10" r="7" fill="#f8ac1a" stroke="#0145b4" strokeWidth="3" />
              <ellipse className="hero-spire-ring" cx="32" cy="30" rx="26" ry="7" stroke="#f8ac1a" strokeWidth="3.5" />
              <ellipse className="hero-spire-ring" cx="32" cy="46" rx="19" ry="5.5" stroke="#f8ac1a" strokeWidth="3" />
            </svg>
            {/* tapered spike planting the sign in the ground */}
            <svg
              className="absolute -bottom-20 left-1/2 h-20 w-16 -translate-x-1/2"
              viewBox="0 0 64 80"
              fill="none"
              aria-hidden="true"
            >
              <path d="M26 0 L38 0 L32 74 Z" fill="#0145b4" />
              <path d="M32 2 L32 60" stroke="#a8bfe2" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              <ellipse className="hero-spire-ring" cx="32" cy="22" rx="21" ry="6" stroke="#f8ac1a" strokeWidth="3" />
            </svg>
            {/* yellow bolts on the frame */}
            <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-[3px] border-saigon bg-energy" aria-hidden="true" />
            <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-[3px] border-saigon bg-energy" aria-hidden="true" />

            <Image
              src="/logo.png"
              alt="Saigon Kids Hackathon logo"
              width={110}
              height={110}
              priority
              className="hero-logo mx-auto mb-2 h-20 w-20 sm:mb-4 sm:h-28 sm:w-28"
            />

            <h1 className="relative text-3xl font-bold leading-[0.9] sm:text-5xl sm:leading-[0.95] md:text-6xl lg:text-7xl">
              <span className="sr-only">Saigon Kids Hackathon</span>
              <SplitWord word="Saigon Kids" className="block text-energy" />
              <SplitWord word="Hackathon" className="block text-saigon" />
            </h1>

            <p className="hero-fade mt-2 text-sm font-semibold text-ink sm:mt-5 sm:text-lg">
              March 6, 2027 · Ho Chi Minh City
            </p>
          </div>
        </div>

        {/* who's behind it — plain bold names with a logo slot each, no pills.
            each × lives inside the span of the name that follows it, so the
            pair never splits across a line break */}
        <div className="hero-fade mt-6 flex w-max max-w-[calc(100vw-1.5rem)] flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:mt-24 sm:gap-x-8 sm:gap-y-4">
          {PARTNERS.map((partner, i) => (
            <span key={partner.name} className="inline-flex items-center gap-2 sm:gap-3">
              {i > 0 && (
                <span className="text-xl font-bold leading-none text-energy sm:text-2xl md:text-3xl" aria-hidden="true">
                  ×
                </span>
              )}
              <LogoSlot partner={partner} size={48} />
              <span className="text-sm font-bold text-saigon sm:text-lg sm:font-bold md:text-xl lg:text-2xl">{partner.name}</span>
            </span>
          ))}
        </div>

        <p className="hero-fade mt-3 max-w-xl text-xs font-medium text-ink/80 sm:text-lg md:text-xl">
          One big day of building, coding, and playing — for {EVENT.spots} young makers
          aged {AGES}.
        </p>

        <p className="hero-fade mt-2 inline-flex items-center gap-2 rounded-full border-2 border-saigon/30 bg-white/70 px-3 py-1 text-xs font-bold text-saigon sm:mt-3 sm:px-4 sm:py-1.5 sm:text-sm">
          <Sparkle size={14} color="#0145b4" />
          We are a non-profit organization
        </p>

        <div className="hero-fade mt-4 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row sm:gap-4">
          <WaitlistForm />
          <SiteLink
            href="/#about"
            className="rounded-full border-2 border-saigon bg-white/70 px-7 py-3 text-base font-semibold text-saigon transition-colors hover:bg-saigon hover:text-white"
          >
            What is it?
          </SiteLink>
        </div>

        <p className="hero-hint mt-8 text-sm font-medium text-ink/50 sm:mt-12">
          Scroll to explore ↓
        </p>
      </div>
    </section>
  );
}
