export type Filing = "keep" | "shape" | "close";

export type MentalTab = {
  id: string;
  kicker: string;
  text: string;
  answer: Filing;
  why: string;
};

export const filingOrder: Filing[] = ["keep", "shape", "close"];

export const filingMeta: Record<Filing, { label: string; hint: string }> = {
  keep: { label: "Keep", hint: "Save the context" },
  shape: { label: "Shape", hint: "Make it public" },
  close: { label: "Close", hint: "Let the tab go" },
};

export const mentalTabs: MentalTab[] = [
  {
    id: "grab-note",
    kicker: "Whacked",
    text: "A voice note from a Grab in KL: the client said the last post felt like a brochure, not like her.",
    answer: "keep",
    why: "That's a preference the next draft needs. Save it somewhere the team can find it after the ride.",
  },
  {
    id: "speaker-bio",
    kicker: "Cleve",
    text: "A speaker bio arrived calling you CEO of Cleve. Ashvin runs the company. You want the line fixed before it goes on the slide.",
    answer: "shape",
    why: "The fact is already there. Shape the public line: CMO and co-founder, with Ashvin as CEO and Rashad as CTO.",
  },
  {
    id: "recipe",
    kicker: "Off hours",
    text: "One of the open tabs is a weeknight recipe you will not cook, next to a reminder that you are mid-chapter in a fantasy novel.",
    answer: "close",
    why: "A full head collects souvenirs. This one isn't work. Close it and go back to the book.",
  },
  {
    id: "train",
    kicker: "Capture",
    text: "Half a sentence from the LRT: people trust the version of you that remembers what they said last time.",
    answer: "keep",
    why: "It isn't a post yet. It would also be gone by the next stop. Keep the raw line.",
  },
  {
    id: "no-brief",
    kicker: "Whacked",
    text: "A founder asks for a LinkedIn post and the only brief is “make it thought leadership.”",
    answer: "shape",
    why: "There's a person in there, and no point of view yet. Shape the brief before anything goes out.",
  },
  {
    id: "model-chat",
    kicker: "Cleve",
    text: "A group chat is twelve messages deep on which model is the best, with no piece of work attached.",
    answer: "close",
    why: "Loyalty to one model isn't the job. Close the tab and come back when there's something to write.",
  },
  {
    id: "quitter",
    kicker: "Whacked",
    text: "The account manager quit. Every client preference they knew is still in their head, and in a March chat nobody else can search.",
    answer: "keep",
    why: "That context is the brand. Keep it in a place the next person can open.",
  },
  {
    id: "generic",
    kicker: "Writing",
    text: "You like the sentence, and it also sounds like every other post on your feed this morning.",
    answer: "shape",
    why: "Generic isn't finished. Shape it until it could only have come from this team.",
  },
];

export function shuffleTabs<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const current = next[i];
    next[i] = next[j]!;
    next[j] = current!;
  }
  return next;
}

export function resultForScore(score: number, total: number) {
  const ratio = total === 0 ? 0 : score / total;
  if (ratio >= 0.875) {
    return {
      title: "Clear head",
      detail: "The useful thoughts have a place. The rest were allowed to close.",
    };
  }
  if (ratio >= 0.5) {
    return {
      title: "A few tabs still open",
      detail: "You caught some of the real ones. Filing is a rep, not a talent.",
    };
  }
  return {
    title: "The tabs won this round",
    detail: "Pick one true thing and give it a home. Then come back.",
  };
}
