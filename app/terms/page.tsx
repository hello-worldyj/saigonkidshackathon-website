import type { Metadata } from "next";
import AmbientMotion from "@/components/AmbientMotion";
import Footer from "@/components/Footer";
import LegalPage, { eventLegalName, legalUpdated } from "@/components/LegalPage";
import { EVENT } from "@/components/event";

const description =
  "Terms of Service for Saigon Kids Hackathon, including registration, parent consent, event conduct, payment, safety, intellectual property, and Vietnam-law terms.";

export const metadata: Metadata = {
  title: "Terms of Service",
  description,
  openGraph: { title: "Terms of Service — Saigon Kids Hackathon", description },
};

const sections = [
  {
    title: "Agreement to these terms",
    body: [
      `These Terms of Service apply to ${eventLegalName}, the website, registration, event communications, and participation in the event.`,
      "By registering a child, submitting a form, paying a fee, or attending the event, the parent or legal guardian agrees to these terms for themselves and for the participating child.",
    ],
  },
  {
    title: "Eligibility and parent consent",
    body: [
      `The event is for young makers ages ${EVENT.ages.min}-${EVENT.ages.max}. Registration information must be accurate and complete.`,
      "Each participant under 18 must have permission from a parent or legal guardian. A parent, legal guardian, or approved group chaperone must stay on site for the whole event unless we publish a different written rule.",
    ],
  },
  {
    title: "Registration, payment, and changes",
    body: [
      `The ticket fee is ${EVENT.fee.display}. The fee helps cover the event day, snacks, the builders kit, judging, awards, and operating costs. We are a non-profit event and the fee is intended to cover costs, not generate profit.`,
      "A place is not guaranteed until registration is accepted and any required payment is confirmed. We may close registration when capacity is reached.",
      "If a participant cannot attend, contact us as early as possible. Refunds, transfers, and substitutions may depend on timing, payment-provider limits, already-incurred costs, and Vietnamese law.",
    ],
  },
  {
    title: "Event rules and conduct",
    body: [
      "Participants must follow the event rules, venue rules, safety instructions, and reasonable directions from organisers, judges, venue staff, and adult chaperones.",
      "Harassment, bullying, unsafe behavior, cheating, theft, damage to property, or inappropriate projects may result in removal from the event without refund where allowed by law.",
      "Projects must be appropriate for a youth event and safe for a school environment.",
    ],
  },
  {
    title: "Health, safety, and responsibility",
    body: [
      "Parents or guardians are responsible for telling us about allergies, dietary needs, medical needs, accessibility needs, and emergency contact details that may affect participation.",
      "Participants should bring a laptop and charger unless they have requested a loaner. Families are responsible for personal items brought to the venue.",
      "We will take reasonable care when running the event, but participation in building, coding, presenting, and team activities involves normal event risks.",
    ],
  },
  {
    title: "Projects and intellectual property",
    body: [
      "Participants keep ownership of the projects, code, designs, and ideas they create, subject to any third-party tools, libraries, assets, or platform terms they choose to use.",
      "By submitting or presenting a project, participants confirm that they have the right to use the materials they include.",
      "We may ask to feature projects after the event. Public showcase use of a participant's name, image, project, or work will be handled with appropriate consent.",
    ],
  },
  {
    title: "Website and communications",
    body: [
      "The website may change as event details are finalized. We try to keep information accurate, but schedules, logistics, capacity, venue procedures, and registration details may change when reasonably necessary.",
      "Important updates may be sent by email or published on the website. Families are responsible for checking event communications before attending.",
    ],
  },
  {
    title: "Vietnam law and disputes",
    body: [
      "These terms are governed by the laws of Vietnam, unless mandatory law says otherwise.",
      "If a concern comes up, families should contact us first so we can try to resolve it informally. If it cannot be resolved informally, the matter may be handled through the competent authorities or courts in Vietnam, subject to applicable law.",
      "Nothing in these terms removes rights that cannot be waived under Vietnamese consumer protection, child protection, personal data protection, or other mandatory laws.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main>
      <AmbientMotion />
      <LegalPage
        eyebrow="Terms"
        title="Terms of Service"
        intro="The rules for registration, attendance, payments, conduct, projects, and event operations."
        updated={legalUpdated}
        sections={sections}
      />
      <Footer />
    </main>
  );
}
