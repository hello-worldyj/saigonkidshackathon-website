/* what's in the builders kit every builder picks up at check-in */

export type KitItem = { id: "snacks" | "stickers" | "hat" | "toteBags"; name: string; blurb: string };

export const KIT: KitItem[] = [
  { id: "snacks", name: "Light snacks", blurb: "Something to munch on between builds." },
  { id: "stickers", name: "Stickers", blurb: "For your laptop, your notebook, your water bottle." },
  { id: "hat", name: "A hat", blurb: "The official builders cap." },
  { id: "toteBags", name: "Tote bags", blurb: "A roomy event bag for your kit and projects." },
];
