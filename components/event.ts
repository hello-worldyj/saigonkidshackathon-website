/* the facts about the day, in one place — every number that appears in
   copy (spots, ages, team size, the fee) reads from here so the hero,
   the footer, the faq, the rulebook and the parents' guide can never
   disagree with each other */

export const EVENT = {
  name: "Saigon Kids Hackathon",
  date: "March 6, 2027",
  dateLong: "Saturday, March 6, 2027",
  city: "Ho Chi Minh City",
  spots: 120,
  hours: 8,
  ages: { min: 9, max: 16 },
  grades: { min: 3, max: 11 },
  team: { min: 1, max: 3 },
  // kept for anywhere a single figure is all that fits (chips, summaries) —
  // the low end of TICKETS, below
  fee: { amount: 250_000, currency: "VND", display: "250,000 VND" },
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

/* what every ticket pays for, regardless of tier */
export const FEE_COVERS = [
  "The whole day, kickoff to awards",
  "Snacks",
  "The builders kit",
  "Mentors on the floor all day",
  "The judging lab and awards",
];

/* the lunch item on the pricier ticket */
export const LUNCH_ITEM = "bánh mì";

/* the two ticket tiers — same day, same everything, except lunch */
export type Ticket = {
  id: "standard" | "lunch";
  name: string;
  amount: number;
  display: string;
  lunch: boolean;
};

export const TICKETS: Ticket[] = [
  { id: "standard", name: "Standard", amount: 250_000, display: "250,000 VND", lunch: false },
  { id: "lunch", name: `With lunch (${LUNCH_ITEM})`, amount: 350_000, display: "350,000 VND", lunch: true },
];

/* the non-profit line, reused wherever we talk about the fee or who runs
   the day — one sentence, everywhere it appears */
export const NONPROFIT_NOTE =
  "We are a non-profit organization — the fee covers the day's costs and nothing more.";
