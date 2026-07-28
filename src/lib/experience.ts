export type ExperienceItem = {
  id: number;
  jobTitle: string;
  company: string;
  slug: string;
  timePeriod: string;
  description: string;
  achievements: string[];
  techStack: string[];
  facts: string[];
  color: string;
  iconSlug: string;
  coverNote: string;
};

export const experienceData: ExperienceItem[] = [
  {
    id: 1,
    jobTitle: "Mid Full Stack Developer",
    company: "Dobaato",
    slug: "dobaato",
    timePeriod: "Jun 2026 – Present",
    description:
      "Building scalable web apps end-to-end — system architecture, backend APIs, database design, auth, payments, and frontend.",
    achievements: [
      "Architected system design and backend infrastructure with NestJS & Node.js",
      "Designed and optimized database schemas for performance and security",
      "Integrated secure auth flows and payment gateways",
    ],
    techStack: ["NestJS", "Node.js", "PostgreSQL", "Next.js", "React", "TypeScript"],
    facts: [
      "Wears the system architect hat daily",
      "Backend-heavy role with full-stack ownership",
      "Security and payment logic are my primary zone",
    ],
    color: "#06b6d4",
    iconSlug: "nestjs",
    coverNote: "Where I architect systems",
  },
  {
    id: 2,
    jobTitle: "Full Stack Developer",
    company: "Ottr Technology",
    slug: "ottr",
    timePeriod: "Sep 2022 – May 2026",
    description:
      "Built and shipped 16+ client projects as a developer and code reviewer. Owned full-stack architecture decisions and maintained quality standards across the team.",
    achievements: [
      "Delivered 16+ production projects with 90+ Lighthouse scores",
      "Led code reviews enforcing best practices across the team",
      "Built responsive UIs for Nepali and international clients",
    ],
    techStack: ["Next.js", "React", "NestJS", "PostgreSQL", "TypeScript"],
    facts: [
      "Reviewed more code than I wrote — and loved it",
      "Worked across 3 time zones daily",
      "First production NestJS app I built is still running in production",
    ],
    color: "#457b9d",
    iconSlug: "vercel",
    coverNote: "Where I learned to ship at scale",
  },
  {
    id: 3,
    jobTitle: "Lead Frontend Developer",
    company: "Astergaze Technologies",
    slug: "astergaze",
    timePeriod: "Sep 2024 – Feb 2025",
    description:
      "Directed frontend architecture and development as a part-time Lead. Designed dynamic UI systems with smooth, engaging animations.",
    achievements: [
      "Architected the frontend foundation for a SaaS platform",
      "Integrated animation systems that set the product's design language",
      "Enforced performance budgets across all frontend deliverables",
    ],
    techStack: ["React", "TypeScript", "Framer Motion", "Tailwind", "Next.js"],
    facts: [
      "Started as contributor, ended up leading the frontend",
      "The animation system I built is still their selling point",
      "Part-time role, full-time impact",
    ],
    color: "#7c3aed",
    iconSlug: "react",
    coverNote: "Where I owned the frontend",
  },
];
