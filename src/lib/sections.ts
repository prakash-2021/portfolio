export type MiniGameId =
  | "snake"
  | "tictactoe"
  | "memory"
  | "lightsout"
  | "simon";

export type Section = {
  id: string;
  label: string;
  /** First line of headline (white) */
  titleBefore: string;
  /** Accent line (lime) */
  titleAccent: string;
  subtitle: string;
  /** Mini game shown in the side panel for this section */
  miniGame: MiniGameId;
};

export const sections: Section[] = [
  {
    id: "intro",
    label: "INTRO",
    titleBefore: "Building products that",
    titleAccent: "people love.",
    subtitle: "Clean code. Thoughtful design. Real impact.",
    miniGame: "snake",
  },
  {
    id: "work",
    label: "WORK",
    titleBefore: "Selected",
    titleAccent: "projects.",
    subtitle:
      "Case studies and product work — tap through for narrative, stack, and outcomes.",
    miniGame: "tictactoe",
  },
  {
    id: "stack",
    label: "STACK",
    titleBefore: "Tools I",
    titleAccent: "use.",
    subtitle:
      "Next.js, TypeScript, design systems, and motion — tuned for clarity and speed.",
    miniGame: "memory",
  },
  {
    id: "education",
    label: "EDUCATION",
    titleBefore: "Academic",
    titleAccent: "journey.",
    subtitle: "",
    miniGame: "simon",
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    titleBefore: "Professional",
    titleAccent: "background.",
    subtitle: "Career journey and key roles in web development and design.",
    miniGame: "lightsout",
  },
  {
    id: "contact",
    label: "CONTACT",
    titleBefore: "Let's",
    titleAccent: "talk.",
    subtitle:
      "Open to collaborations and interesting problems — reach out by email or social links below.",
    miniGame: "simon",
  },
];
