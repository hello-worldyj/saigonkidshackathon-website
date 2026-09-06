/* the day, hour by hour — the schedule lanterns and the parents' guide
   both read from here */

export type Slot = { time: string; title: string; body: string };

export const AGENDA: Slot[] = [
  { time: "7:30 AM", title: "Check-In Opens", body: "Participants arrive, check in, receive materials, and get settled." },
  { time: "8:00 AM", title: "Opening Ceremony", body: "Welcome remarks, rules, judging information, safety guidelines, and an overview of the day." },
  { time: "8:30 AM", title: "Tracks Revealed + Hacking Begins", body: "Official hackathon tracks are revealed. Teams begin building." },
  { time: "10:00 AM", title: "Workshop: How to Submit Your Hack", body: "Learn how to prepare and submit your project, including descriptions, demos, videos, and project links. Teams can choose to keep building while listening to the presenter." },
  { time: "10:20 AM", title: "Hacking Continues", body: "Teams return to building and developing their projects." },
  { time: "11:45 AM", title: "Lunch Break", body: "Participants may take a lunch break. Teams may continue working if they choose." },
  { time: "12:30 PM", title: "Hacking Continues", body: "The main afternoon hacking session begins." },
  { time: "3:00 PM", title: "One-Hour Submission Warning", body: "One hour remains. Teams should begin final testing, polishing, and preparing their submissions." },
  { time: "3:30 PM", title: "Final Submission Warning", body: "30 minutes remain. Teams should finish testing and make sure their submission is ready." },
  { time: "3:50 PM", title: "Final 10-Minute Warning", body: "10 minutes remain. Upload files, verify links, and complete your submission." },
  { time: "4:00 PM", title: "Submissions Close", body: "All projects must be submitted. No major changes may be made after the deadline." },
  { time: "4:00–4:15 PM", title: "Judging Preparation", body: "Teams prepare their demos while organizers verify submissions and judges move to their stations." },
  { time: "4:15 PM", title: "Project Judging Begins", body: "Judges evaluate projects across 10 judging stations using the official 120-point rubric." },
  { time: "5:20 PM", title: "Finalist Selection", body: "Judges finalize scores, determine award winners, and select the Top 3 projects." },
  { time: "5:35 PM", title: "Top 3 Project Showcase", body: "The top three teams present their projects on stage to participants, judges, and guests." },
  { time: "5:55 PM", title: "Awards Ceremony", body: "Winners are announced and prizes, trophies, and medals are presented." },
  { time: "6:15 PM", title: "Closing Remarks + Photos", body: "Final acknowledgements, closing remarks, and group photos with participants, judges, volunteers, and organizers." },
  { time: "6:30 PM", title: "Event Ends", body: "Participants and guardians leave campus. Staff and organizers remain for cleanup." },
];
