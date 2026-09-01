import type { Metadata } from "next";
import { DynaPuff } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SceneBackdrop from "@/components/SceneBackdrop";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import RouteScroll from "@/components/RouteScroll";
import { EVENT, AGES } from "@/components/event";

const dynapuff = DynaPuff({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dynapuff",
});

const SITE_URL = "https://saigonkidshackathon.web.app";
const DESCRIPTION = `One big day of building, coding, and playing — ${EVENT.spots} young makers aged ${AGES}, ${EVENT.date}, ${EVENT.city}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: EVENT.name, template: `%s — ${EVENT.name}` },
  description: DESCRIPTION,
  keywords: [
    "kids hackathon",
    "Saigon Kids Hackathon",
    "Ho Chi Minh City hackathon",
    "kids coding event Vietnam",
    "hackathon for kids",
    "STEM event Saigon",
  ],
  icons: { icon: "/logo.png" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // Google Search Console: URL-prefix property, HTML-tag verification method
  // (saigonkidshackathon.web.app is a subdomain of Google's own web.app, so
  // DNS TXT verification isn't available to us — no DNS access to it)
  verification: { google: "s2hsfn0KoWB9d5OcqEuvSobwbPlJiSz3IJ_B-y5-Ygs" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: EVENT.name,
    title: EVENT.name,
    description: `One big day of building, coding, and playing — ${EVENT.date}, ${EVENT.city}.`,
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: EVENT.name,
    description: `One big day of building, coding, and playing — ${EVENT.date}, ${EVENT.city}.`,
    images: ["/logo.png"],
  },
};

// lets Google (and other search engines) show this as a rich result —
// date, location, price — instead of a plain blue link
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: EVENT.name,
  description: DESCRIPTION,
  startDate: `2027-03-06T${EVENT.kickoff}:00+07:00`,
  endDate: `2027-03-06T${EVENT.demos}:00+07:00`,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: EVENT.city,
    address: { "@type": "PostalAddress", addressLocality: EVENT.city, addressCountry: "VN" },
  },
  image: [`${SITE_URL}/logo.png`],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "VND",
    lowPrice: "250000",
    highPrice: "350000",
    availability: "https://schema.org/PreOrder",
    url: SITE_URL,
  },
  organizer: { "@type": "Organization", name: EVENT.name, url: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dynapuff.variable}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        <SmoothScroll />
        {/* the chrome every page shares: the sky, the progress bar, the nav */}
        <SceneBackdrop />
        <ScrollProgress />
        <Navbar />
        {children}
        {/* last, so it runs after every section has set up its triggers */}
        <RouteScroll />
      </body>
    </html>
  );
}
