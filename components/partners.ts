/* the organisations behind the day — one list so the hero, the
   partnership section and the footer never drift apart. a null logo
   gets a dashed placeholder slot until the real mark arrives. */

export type Partner = { name: string; logo: string | null };

export const PARTNERS: Partner[] = [
  { name: "Saigon Kids Hackathon", logo: "/logo.png" },
  { name: "Saigon South International School", logo: "/ssis-logo.png" },
];
