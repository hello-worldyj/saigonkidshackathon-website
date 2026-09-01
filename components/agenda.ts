/* the day, hour by hour — the schedule lanterns and the parents' guide
   both read from here */

export type Slot = { time: string; title: string; body: string };

export const AGENDA: Slot[] = [
  { time: "7:30 AM", title: "Check-In Opens", body: "Participants arrive, check in, receive materials, and get settled." },
  { time: "8:00 AM", title: "Opening Ceremony", body: "Welcome remarks, rules, judging info, safety guidelines, and day overview." },
  { time: "8:30 AM", title: "Tracks Revealed + Hacking Begins", body: "Official hackathon tracks are revealed. Teams begin building." },
  { time: "10:00 AM", title: "Workshop: How to Submit Your Hack", body: "Learn how to prepare and submit your project — descriptions, demos, videos, and more." },
  { time: "10:30 AM", title: "Hacking Continues", body: "Teams return to building their projects." },
  { time: "11:30 AM", title: "Lunch Break", body: "Participants may take a lunch break. Teams may continue working if they choose." },
  { time: "1:00 PM", title: "Hacking Continues", body: "Full hacking session resumes." },
  { time: "3:30 PM", title: "Final Submission Warning", body: "30 minutes remaining. Teams should begin final testing and preparation." },
  { time: "4:00 PM", title: "Submissions Close", body: "All projects must be submitted. No major changes after this deadline." },
  { time: "4:15 PM", title: "Project Judging Begins", body: "Judges test every project at 10 stations using the 120-point rubric." },
  { time: "5:20 PM", title: "Scores Finalized", body: "Judges finalize scores and winners are determined." },
  { time: "5:30 PM", title: "Top 3 Project Showcase", body: "The top three teams present on stage to all participants and guests." },
  { time: "5:50 PM", title: "Awards Ceremony", body: "Winners are announced and prizes, trophies, and medals are presented." },
  { time: "6:10 PM", title: "Closing Remarks + Photos", body: "Final remarks, acknowledgements, and group photos with everyone." },
  { time: "6:30 PM", title: "Event Ends", body: "All participants and guardians leave. Staff remains for cleanup." },
];
