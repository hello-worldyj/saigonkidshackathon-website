import type { Metadata } from "next";
import AmbientMotion from "@/components/AmbientMotion";
import Footer from "@/components/Footer";
import LegalPage, { eventLegalName, legalUpdated } from "@/components/LegalPage";

const description =
  "Privacy Policy for Saigon Kids Hackathon, including how participant and parent data is collected, used, protected, and handled under Vietnamese law.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  openGraph: { title: "Privacy Policy — Saigon Kids Hackathon", description },
};

const sections = [
  {
    title: "Who this policy covers",
    body: [
      `This Privacy Policy applies to ${eventLegalName}, our website, registration forms, email updates, event check-in, and event operations in Vietnam.`,
      "Because the event is for young participants, most registration and consent information must be provided or approved by a parent or legal guardian.",
    ],
  },
  {
    title: "Information we collect",
    body: [
      "We may collect a participant's name, age, grade, school, team preferences, project interests, coding experience, and whether they need a loaner laptop or other event support.",
      "We may collect parent or guardian contact details, emergency contact details, consent confirmations, payment status, and practical safety information such as allergies, dietary needs, or medical notes shared with us for event care.",
      "The website may also receive basic technical data such as device, browser, page visits, and form submission metadata needed to keep the site working and secure.",
    ],
  },
  {
    title: "How we use information",
    body: [
      "We use personal information to register participants, communicate with families, organize teams, plan food and safety arrangements, manage payment confirmation, run check-in, support the event day, and send important event updates.",
      "We do not sell participant or parent personal data. We do not use children's data for behavioral advertising.",
      "Photos, videos, project names, or showcase posts will only be used when we have appropriate consent or another lawful basis under Vietnamese law.",
    ],
  },
  {
    title: "Vietnam privacy law",
    body: [
      "We aim to handle personal data in line with Vietnamese law, including Vietnam's personal data protection rules, cyberinformation security rules, and other applicable rules for collecting, storing, using, sharing, and protecting personal information.",
      "Where consent is required, we will ask for clear consent from the participant's parent or legal guardian. Families may contact us to ask what data we hold, correct inaccurate data, withdraw consent where allowed, or request deletion where legally and operationally possible.",
      "Some information may need to be kept for a reasonable period for safety, payment, accounting, legal, dispute-resolution, or event-record purposes.",
    ],
  },
  {
    title: "Sharing and service providers",
    body: [
      "We may share information with people and services that help us run the event, such as registration tools, email services, payment confirmation tools, venue staff, safety helpers, judges, and technical service providers.",
      "We only share what is reasonably needed for the relevant purpose. If data is processed or stored outside Vietnam by a service provider, we aim to use providers with appropriate safeguards and to follow applicable Vietnamese requirements for cross-border processing.",
    ],
  },
  {
    title: "Security",
    body: [
      "We use reasonable administrative, technical, and organizational safeguards to protect event data from unauthorized access, loss, misuse, or disclosure.",
      "No website, email inbox, spreadsheet, or online service is perfectly secure. If we become aware of a data issue that creates a real risk to families, we will take reasonable steps to investigate, reduce harm, and notify affected people or authorities where required.",
    ],
  },
  {
    title: "Contact",
    body: [
      "To ask about privacy, update registration details, withdraw consent where allowed, or request deletion of personal data, contact saigonkidshackathon@ssis.edu.vn.",
      "We may need to verify that the request comes from a parent, legal guardian, or the relevant participant before changing or deleting records.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <AmbientMotion />
      <LegalPage
        eyebrow="Privacy"
        title="Privacy Policy"
        intro="How we collect, use, protect, and handle information for Saigon Kids Hackathon."
        updated={legalUpdated}
        sections={sections}
      />
      <Footer />
    </main>
  );
}
