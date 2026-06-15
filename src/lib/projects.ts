export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  heroGradient: string;
  role: string;
  year: string;
  technologies: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "invicta-kent",
    title: "Invicta Kent Management",
    tagline:
      "Full-stack business management platform with CI/CD pipeline, deployment automation, and scalable architecture.",
    description:
      "Developed a complete production-grade management system for a UK-based client. The project included full-stack development along with DevOps responsibilities such as CI/CD setup, deployment automation, and server configuration. Focused on scalability, performance, and smooth user experience.",
    image: "/projects/invictakent.png",
    heroGradient:
      "linear-gradient(135deg, rgba(217, 255, 0, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Full-Stack Developer & DevOps Engineer",
    year: "2025",
    technologies: [
      "Next.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST APIs",
      "CI/CD",
      "Nginx",
      "Vercel",
    ],
    link: "https://www.invictakentmanagement.co.uk",
  },
  {
    slug: "achieve-treks",
    title: "Achieve Treks",
    tagline:
      "Full-stack travel and trekking platform with dynamic content management and booking features.",
    description:
      "Built a modern travel and trekking website enabling users to explore packages, itineraries, and travel details. Worked on both frontend and backend systems, ensuring fast performance and SEO optimization for better visibility.",
    image: "/projects/achievetrek.png",
    heroGradient:
      "linear-gradient(135deg, rgba(100, 190, 255, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Full-Stack Developer",
    year: "2025",
    technologies: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
      "SEO",
      "Tailwind CSS",
      "Strapi",
    ],
    link: "https://www.achievetreks.com/en",
  },
  {
    slug: "csse-australia",
    title: "CSSE Australia",
    tagline:
      "Full-stack Catchmentship Simulation Solution with structured content management and responsive design.",
    description:
      "Developed a professional Catchmentship Simulation Solution focused on clean UI, content delivery, and performance optimization. Utilized Strapi for content management, ensuring smooth navigation, mobile responsiveness, and a scalable architecture.",
    image: "/projects/CSS.png",
    heroGradient:
      "linear-gradient(135deg, rgba(155, 120, 255, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Full-Stack Developer",
    year: "2023",
    technologies: [
      "React.js",
      "Node.js",
      "PostgreSQL",
      "Strapi",
      "Tailwind CSS",
      "REST APIs",
    ],
    link: "https://csse.com.au",
  },
  {
    slug: "cuts-and-coffee",
    title: "Cuts & Coffee",
    tagline:
      "Dynamic website with seamless animations and captivating effects.",
    description:
      "Created dynamic websites using Next.js, incorporating cutting-edge tools like Three.js and GSAP for seamless animations and captivating effects, enhancing the overall user experience.",
    image: "/projects/cutsandcoffee.png",
    heroGradient:
      "linear-gradient(135deg, rgba(200, 150, 100, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Frontend Developer",
    year: "2024",
    technologies: ["Next.js", "Three.js", "GSAP"],
    link: "https://cutsandcoffee.com.np",
  },
  {
    slug: "serang-school",
    title: "Serang School",
    tagline:
      "High-performing, dynamic website optimized for speed and responsiveness.",
    description:
      "Created high-performing, dynamic websites using Next.js 12, optimizing for speed and responsiveness.",
    image: "/projects/serangschool.png",
    heroGradient:
      "linear-gradient(135deg, rgba(100, 200, 150, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Frontend Developer",
    year: "2024",
    technologies: ["Next.js"],
    link: "https://www.serangschool.org",
  },
  {
    slug: "fyp-pet-haven",
    title: "FYP Pet Haven",
    tagline:
      "Final year full-stack project: a pet adoption and management platform.",
    description:
      "Designed and developed a complete pet adoption system where users can browse pets, view details, and manage adoption requests. Built full backend logic, database design, and frontend UI from scratch.",
    image: "/projects/pethaven.png",
    heroGradient:
      "linear-gradient(135deg, rgba(255, 155, 120, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Full-Stack Developer",
    year: "2023",
    technologies: [
      "React.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST APIs",
      "JWT",
    ],
    link: "https://fyp-pethaven.netlify.app",
  },
  {
    slug: "sincere-travels",
    title: "Sincere Travels",
    tagline:
      "Advanced travel booking platform with payment integration and Amadeus API integration.",
    description:
      "Built a production-grade travel booking system integrating Amadeus API for real-time flight data and booking services. Implemented secure payment gateway integration and handled end-to-end booking workflows.",
    image: "/projects/sinceretravels.png",
    heroGradient:
      "linear-gradient(135deg, rgba(120, 255, 155, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Full-Stack Developer",
    year: "2024",
    technologies: [
      "React.js",
      "Node.js",
      "Amadeus API",
      "PostgreSQL",
      "REST APIs",
      "JWT",
    ],
    link: "https://www.sinceretravels.com",
  },
  {
    slug: "biskajatra",
    title: "Biskajatra",
    tagline:
      "Event-based cultural website with dynamic content and animations.",
    description:
      "Developed a visually engaging website for cultural/event presentation. Focused heavily on SEO, smooth UI interactions, and responsive design for better engagement.",
    image: "/projects/biskajatra.png",
    heroGradient:
      "linear-gradient(135deg, rgba(255, 200, 100, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Frontend Developer",
    year: "2023",
    technologies: ["React.js", "Tailwind CSS", "SCSS"],
    link: "https://biskajatra.com",
  },
  {
    slug: "meatmandu",
    title: "Meatmandu",
    tagline:
      "Modern web application with interactive UI and smooth frontend experience.",
    description:
      "Built a responsive and interactive frontend application with focus on animations, usability, and performance optimization.",
    image: "/projects/beefmandu.png",
    heroGradient:
      "linear-gradient(135deg, rgba(200, 100, 255, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Frontend Developer",
    year: "2022",
    technologies: ["React.js", "Tailwind CSS", "JavaScript", "GSAP"],
    link: "https://meetmandu.netlify.app",
  },
];
