export type AcademicItem = {
  id: number;
  college: string;
  university: string;
  stream: string;
  marks: string;
  achievements: string[];
  color: string;
  iconSlug: string;
  coverNote: string;
  semesters: { name: string; highlight: string }[];
  certificates: string[];
};

export const academicData: AcademicItem[] = [
  {
    id: 1,
    college: "Herald College Kathmandu",
    university: "University of Wolverhampton",
    stream: "BSc (Hons) Information Technology",
    marks: "First Class Honors",
    color: "#2d9b4e",
    iconSlug: "google-scholar",
    coverNote: "Where theory met practice",
    achievements: [
      "Awarded AAA Scholarship",
      "Developed Pet Adoption System as capstone project",
      "Built projects in Python, Java, and web technologies",
    ],
    semesters: [
      {
        name: "Year 1",
        highlight: "Programming fundamentals — Python, Java, SQL",
      },
      {
        name: "Year 2",
        highlight: "Web development, databases, software engineering",
      },
      { name: "Year 3", highlight: "Advanced web, mobile dev, dissertation" },
    ],
    certificates: ["AAA Scholarship Certificate", "First Class Honors Degree"],
  },
  {
    id: 2,
    college: "Budhanilkantha Technical School",
    university: "CTEVT",
    stream: "Diploma in Computer Engineering",
    marks: "Distinction",
    color: "#f4a261",
    iconSlug: "google-scholar",
    coverNote: "Where it all began",
    achievements: [
      "Topper of entrance examination — partial scholarship",
      "Ranked topper in selected semesters",
      "Built strong foundations in programming, networking, and systems",
    ],
    semesters: [
      {
        name: "Sem 1-2",
        highlight: "C programming, digital logic, mathematics",
      },
      {
        name: "Sem 3-4",
        highlight: "Data structures, networking, microprocessors",
      },
      {
        name: "Sem 5-6",
        highlight: "Web development, databases, capstone project",
      },
    ],
    certificates: ["Entrance Topper Scholarship", "Distinction Diploma"],
  },
];
