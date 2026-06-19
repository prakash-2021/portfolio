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
      "Developed a complete production-grade management system for a UK-based company, achieving a 100 Lighthouse performance score. The project included full-stack development along with DevOps responsibilities such as CI/CD setup, deployment automation, and server configuration. Focused on scalability, performance, and smooth user experience.",
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
      "Built a modern travel and trekking website enabling users to explore packages, itineraries, and travel details. Worked across both frontend and backend, implementing REST APIs and a CMS dashboard for efficient content management. Added localization support for multi-language accessibility and optimized the platform for performance and SEO to improve visibility and user experience. Developed as an Ottr Technology employee.",
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
    slug: "orgyen-ling",
    title: "Orgyen Ling",
    tagline:
      "Dynamic web platform with sophisticated GSAP animations and smooth interactions.",
    description:
      "Developed a modern, visually engaging web application leveraging Next.js and Directus. Focused on creating a rich user experience by integrating GSAP for fluid, high-performance animations and seamless page transitions. Utilized Directus REST APIs for scalable and dynamic content management. Added localization support for multi-language accessibility. Developed as an Ottr Technology employee.",
    image: "/projects/orgyenling.png",
    heroGradient:
      "linear-gradient(135deg, rgba(255, 100, 100, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Full-Stack Developer",
    year: "2025",
    technologies: [
      "Next.js",
      "Directus",
      "REST APIs",
      "GSAP",
      "Localization"
    ],
    link: "https://www.ogl.world/en",
  },
  {
    slug: "cuts-and-coffee",
    title: "Cuts & Coffee",
    tagline:
      "Dynamic website with seamless animations and captivating effects.",
    description:
      "Created a dynamic website using Next.js, Three.js, and GSAP, implementing 3D scroll animations, smooth page transitions, and interactive visual effects. Achieved a 90 Lighthouse performance score while delivering a visually rich and engaging user experience. Developed as an Ottr Technology employee.",
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
      "Created high-performing, dynamic websites using Next.js 12, optimizing for speed and responsiveness. Developed as an Ottr Technology employee.",
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
      "Final year full-stack project: a pet adoption and management platform with real-time chat.",
    description:
      "Designed and developed a complete pet adoption system where users can browse pets, view details, and manage adoption requests. Built full backend logic, database design, and frontend UI from scratch. Also integrated a real-time chat system to facilitate direct communication.",
    image: "/projects/pethaven.png",
    heroGradient:
      "linear-gradient(135deg, rgba(255, 155, 120, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Full-Stack Developer",
    year: "2023",
    technologies: [
      "React.js",
      "Node.js",
      "Koa.js",
      "Express",
      "PostgreSQL",
      "Socket.io",
      "REST APIs",
      "JWT",
    ],
    link: "https://fyp-pethaven.netlify.app",
  },

  {
    slug: "biskajatra",
    title: "Biskajatra",
    tagline:
      "Event-based cultural website with dynamic content and animations.",
    description:
      "Developed a visually engaging website for cultural/event presentation, achieving a 93 Lighthouse performance score. Focused heavily on SEO, smooth UI interactions, and responsive design for better engagement. Developed as an Ottr Technology employee.",
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
