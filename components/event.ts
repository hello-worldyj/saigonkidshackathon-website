/* the facts about the day, in one place — every number that appears in
   copy (spots, ages, team size, the fee) reads from here so the hero,
   the footer, the faq, the rulebook and the parents' guide can never
   disagree with each other */

export const EVENT = {
  name: "Saigon Kids Hackathon",
  date: "March 6, 2027",
  dateLong: "Saturday, March 6, 2027",
  city: "Ho Chi Minh City",
  registrationUrl: "https://forms.gle/hC3vg8rJ5ze4k8vt7",
  spots: 135,
  hours: 8,
  ages: { min: 9, max: 16 },
  grades: { min: 3, max: 11 },
  team: { min: 1, max: 3 },
  fee: { amount: 300_000, currency: "VND", display: "300,000 VND" },
  aiAllowed: true,
  // the clock the rules run on
  kickoff: "8:30",
  reveal: "8:45",
  submissionsClose: "16:00",
  demos: "17:15",
} as const;

export const AGES = `${EVENT.ages.min}–${EVENT.ages.max}`;
export const GRADES = `Grades ${EVENT.grades.min}–${EVENT.grades.max}`;
export const TEAM_SIZE = `${EVENT.team.min}–${EVENT.team.max}`;

/* what the ticket pays for */
export const FEE_COVERS = [
  "The whole day, kickoff to awards",
  "Light snacks: cookies, fruits, and a few drinks",
  "The builders kit",
  "The judging lab and awards",
];

export type Ticket = {
  id: "builder";
  name: string;
  amount: number;
  display: string;
  lunch: boolean;
};

export const TICKETS: Ticket[] = [
  { id: "builder", name: "Builder Pass", amount: 300_000, display: "300,000 VND", lunch: false },
];

/* the non-profit line, reused wherever we talk about the fee or who runs
   the day — one sentence, everywhere it appears */
export const NONPROFIT_NOTE =
  "We are a non-profit organization — the fee covers the day's costs and nothing more.";
