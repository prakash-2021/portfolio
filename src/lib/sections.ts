export type Section = {
  id: string;
  label: string;
  titleBefore: string;
  titleAccent: string;
  subtitle: string;
};

export const sections: Section[] = [
  {
    id: "intro",
    label: "INTRO",
    titleBefore: "Building products that",
    titleAccent: "people love.",
    subtitle: "Clean code. Thoughtful design. Real impact.",
  },
  {
    id: "work",
    label: "WORK",
    titleBefore: "Selected",
    titleAccent: "projects.",
    subtitle: "Case studies and product work — tap through for narrative, stack, and outcomes.",
  },
  {
    id: "stack",
    label: "STACK",
    titleBefore: "Tools I",
    titleAccent: "use.",
    subtitle: "Next.js, TypeScript, design systems, and motion — tuned for clarity and speed.",
  },
  {
    id: "education",
    label: "EDUCATION",
    titleBefore: "Academic",
    titleAccent: "journey.",
    subtitle: "",
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    titleBefore: "Professional",
    titleAccent: "background.",
    subtitle: "Career journey and key roles in web development and design.",
  },
  {
    id: "contact",
    label: "CONTACT",
    titleBefore: "Let's",
    titleAccent: "talk.",
    subtitle: "Open to collaborations and interesting problems — reach out by email or social links below.",
  },
];
