export type ProjectStory = {
  mission: string
  problem: string
  approach: string
  features: string[]
  result: string
  lessons: string[]
  architecture?: string
  challenges?: string[]
}

export type ProjectLayout = "dual" | "cinematic" | "blueprint" | "spotlight"

export type Project = {
  slug: string
  title: string
  tagline: string
  description: string
  image: string
  heroGradient: string
  role: string
  year: string
  technologies: string[]
  link?: string
  layout: ProjectLayout
  accent: string
  category: string
  difficulty: number
  story: ProjectStory
}

export const projects: Project[] = [
  {
    slug: "achieve-treks",
    title: "Achieve Treks",
    tagline: "Full-stack travel platform with dynamic CMS, multi-language support, and SEO optimization.",
    description: "Built a modern travel and trekking website enabling users to explore packages, itineraries, and travel details. Worked across both frontend and backend, implementing REST APIs and a CMS dashboard for efficient content management.",
    image: "/projects/achievetrek.png",
    heroGradient: "linear-gradient(135deg, rgba(100, 190, 255, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Full-Stack Developer",
    year: "2025",
    technologies: ["Next.js","Node.js","PostgreSQL","REST APIs","SEO","Tailwind CSS","Strapi"],
    link: "https://www.achievetreks.com/en",
    layout: "dual",
    accent: "#457b9d",
    category: "Full-Stack",
    difficulty: 4,
    story: {
      mission: "Create a multi-language trekking platform that feels as adventurous as the Himalayas it showcases.",
      problem: "The existing site was static HTML with no CMS, no multi-language support, and terrible mobile performance. Content updates required developer intervention.",
      approach: "Strapi headless CMS for content team autonomy, Next.js for SSR/ISR performance, i18n routing for 3 languages. Built the CMS dashboard first so the client could populate content while we iterated on the frontend.",
      features: ["Multi-language support (English, Japanese, Korean) with i18n routing","Dynamic CMS dashboard for non-technical content editors","SEO-optimized trek pages with structured data markup","Interactive itinerary builder with difficulty ratings"],
      result: "300% increase in organic traffic within 3 months. Content team publishes updates independently without engineering support.",
      lessons: ["Building the CMS interface first empowers the client and speeds up development","i18n should be planned from day one — retrofitting it is painful","SEO structured data is the highest ROI investment for content sites"],
      architecture: "Next.js with i18n routing → Strapi CMS (self-hosted) → PostgreSQL → Redis caching layer. Deployed on Vercel with automated backups.",
    },
  },
  {
    slug: "cuts-and-coffee",
    title: "Cuts & Coffee",
    tagline: "3D interactive website with Three.js scroll animations and smooth page transitions.",
    description: "Created a dynamic website using Next.js, Three.js, and GSAP, implementing 3D scroll animations, smooth page transitions, and interactive visual effects. Achieved a 90 Lighthouse performance score.",
    image: "/projects/cutsandcoffee.png",
    heroGradient: "linear-gradient(135deg, rgba(200, 150, 100, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Frontend Developer",
    year: "2024",
    technologies: ["Next.js","Three.js","GSAP"],
    link: "https://cutsandcoffee.com.np",
    layout: "blueprint",
    accent: "#f4a261",
    category: "Creative",
    difficulty: 3,
    story: {
      mission: "Create a barbershop-cafe hybrid website that uses 3D to convey the unique dual-brand experience.",
      problem: "Two businesses in one space — a barbershop and a cafe — each with separate branding. A standard template couldn't capture both personalities.",
      approach: "Built a 3D scene with Three.js that transitions between barber and cafe modes on scroll. Used GSAP to orchestrate seamless transitions between sections, each reflecting a different brand personality.",
      features: ["3D scene with scroll-driven camera movement between barber and cafe zones","GSAP-powered page transitions with morphing shapes","Menu and service cards with interactive 3D tilt","Performance-optimized Three.js with dynamic LOD"],
      result: "90 Lighthouse score despite heavy 3D content. Client reported customers booking appointments specifically because of the website experience.",
      lessons: ["Three.js and performance CAN coexist with careful optimization","Dual-brand websites need a strong visual bridge between identities","Scroll-driven 3D transitions create memorable first impressions"],
      architecture: "Next.js → Three.js with React Three Fiber → GSAP for transition orchestration. Dynamic imports for Three.js to keep initial bundle lean.",
      challenges: ["Balancing 3D visual quality with mobile performance","Creating cohesive branding for two distinct businesses in one site"],
    },
  },
  {
    slug: "invicta-kent",
    title: "Invicta Kent Management",
    tagline: "Full-stack business management platform with CI/CD pipeline and scalable architecture.",
    description: "Developed a complete production-grade management system for a UK-based company, achieving a 100 Lighthouse performance score. Included full-stack development along with DevOps responsibilities such as CI/CD setup, deployment automation, and server configuration.",
    image: "/projects/invictakent.png",
    heroGradient: "linear-gradient(135deg, rgba(217, 255, 0, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Full-Stack Developer & DevOps",
    year: "2025",
    technologies: ["Next.js","Node.js","Express","PostgreSQL","REST APIs","CI/CD","Nginx","Vercel"],
    link: "https://www.invictakentmanagement.co.uk",
    layout: "cinematic",
    accent: "#d9ff00",
    category: "Full-Stack",
    difficulty: 5,
    story: {
      mission: "Build a production-grade management system for a UK property firm — from code to deployment.",
      problem: "The client had no digital infrastructure. Everything was managed through spreadsheets, emails, and paper trails. No CI/CD, no staging environment, no automated testing.",
      approach: "Started with a monorepo using Next.js + Node.js, established CI/CD on day one, then built feature by feature while the client used the staging environment for real-time feedback.",
      features: ["Role-based dashboards for tenants, landlords, and admins","Automated rent collection with payment gateway integration","Maintenance ticket system with real-time status tracking","Document vault with role-based access control"],
      result: "100 Lighthouse score. Zero-downtime deployments. Client migrated from spreadsheets entirely within 2 weeks of launch.",
      lessons: ["CI/CD should never be an afterthought — it saved us during every iteration","Real-time feedback from staging builds trust faster than any spec document","A perfect Lighthouse score is achievable without sacrificing features"],
      architecture: "Next.js frontend on Vercel → Node.js/Express API → PostgreSQL on AWS RDS → Nginx reverse proxy with Let's Encrypt SSL. CI/CD via GitHub Actions with automated migration scripts.",
      challenges: ["Client had no existing technical infrastructure","Required real-time data sync between multiple user roles","Had to achieve near-perfect performance on limited hosting budget"],
    },
  },
  {
    slug: "biskajatra",
    title: "Biskajatra",
    tagline: "Event-based cultural website with SEO optimization and smooth UI interactions.",
    description: "Developed a visually engaging website for cultural/event presentation, achieving a 93 Lighthouse performance score. Focused heavily on SEO, smooth UI interactions, and responsive design.",
    image: "/projects/biskajatra.png",
    heroGradient: "linear-gradient(135deg, rgba(255, 200, 100, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Frontend Developer",
    year: "2023",
    technologies: ["React.js","Tailwind CSS","SCSS"],
    link: "https://biskajatra.com",
    layout: "blueprint",
    accent: "#457b9d",
    category: "Frontend",
    difficulty: 3,
    story: {
      mission: "Create a cultural festival website that captures the energy of the event while driving ticket sales and awareness.",
      problem: "Cultural events struggle with online visibility. The site needed to rank well on search engines while delivering an immersive experience that converts visitors into attendees.",
      approach: "Focused heavily on semantic HTML, structured data, and meta tags for SEO. Used Tailwind + SCSS for a polished UI with subtle micro-interactions that make browsing feel alive.",
      features: ["SEO-optimized with structured data and Open Graph","Event schedule with countdown timers","Gallery section with lazy-loaded images","Mobile-first responsive with touch-friendly interactions"],
      result: "93 Lighthouse score. Event saw increased online ticket sales compared to previous year's print-only marketing.",
      lessons: ["SEO and great UX are not a trade-off — semantic HTML serves both","Micro-interactions (hover states, transitions) dramatically improve perceived quality","Cultural sites benefit from bold typography and generous whitespace"],
    },
  },
  {
    slug: "orgyen-ling",
    title: "Orgyen Ling",
    tagline: "Dynamic web platform with sophisticated GSAP animations and multi-language content management.",
    description: "Developed a modern, visually engaging web application leveraging Next.js and Directus. Focused on creating a rich user experience by integrating GSAP for fluid, high-performance animations and seamless page transitions.",
    image: "/projects/orgyenling.png",
    heroGradient: "linear-gradient(135deg, rgba(255, 100, 100, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Full-Stack Developer",
    year: "2025",
    technologies: ["Next.js","Directus","REST APIs","GSAP","Localization"],
    link: "https://www.ogl.world/en",
    layout: "spotlight",
    accent: "#e63946",
    category: "Frontend",
    difficulty: 4,
    story: {
      mission: "Build a visually stunning, animation-driven platform that respects traditional aesthetics while feeling thoroughly modern.",
      problem: "The client wanted rich animations and a premium feel, but most animation-heavy sites sacrifice load time and accessibility. Needed both performance AND visual impact.",
      approach: "Used GSAP's ScrollTrigger for performance-optimized scroll animations, Directus for content management, and careful code-splitting to keep bundle size small. Animated every transition deliberately — nothing decorative, everything purposeful.",
      features: ["Cinematic scroll-triggered GSAP animations with scrub","Multi-language spiritual content platform","Directus-powered dynamic media galleries","Responsive design that maintains animation quality on mobile"],
      result: "Lighthouse score of 95+ with cinematic animations running at 60fps. Client reported increased user engagement and longer session durations.",
      lessons: ["GSAP's ScrollTrigger can be performant when you use will-change and transform carefully","Content teams love Directus — the learning curve is near zero","Animation should serve the story, not distract from it"],
      architecture: "Next.js → Directus headless CMS → PostgreSQL. GSAP ScrollTrigger for all scroll-driven animations. No unnecessary libraries — every dependency earns its place.",
    },
  },
  {
    slug: "serang-school",
    title: "Serang School",
    tagline: "High-performing educational website optimized for speed, accessibility, and responsive design.",
    description: "Created high-performing, dynamic websites using Next.js 12, optimizing for speed and responsiveness.",
    image: "/projects/serangschool.png",
    heroGradient: "linear-gradient(135deg, rgba(100, 200, 150, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Frontend Developer",
    year: "2024",
    technologies: ["Next.js"],
    link: "https://www.serangschool.org",
    layout: "cinematic",
    accent: "#2d9b4e",
    category: "Frontend",
    difficulty: 2,
    story: {
      mission: "Deliver a fast, accessible school website that parents and students can use on any device, even with slow connections.",
      problem: "The previous site took 12+ seconds to load on mobile data. Parents couldn't access important information about schedules, events, and announcements.",
      approach: "Next.js 12 with static generation for most pages, ISR for dynamic content. Optimized every image, inlined critical CSS, and used aggressive caching. Accessibility was a first-class requirement.",
      features: ["Near-instant page loads with static generation + ISR","Fully accessible with WCAG 2.1 AA compliance","Event calendar and announcement system","Mobile-first responsive design for low-bandwidth scenarios"],
      result: "Load time dropped from 12s to under 2s on 3G. School reported increased parent engagement with the announcement system.",
      lessons: ["Performance optimization for low-bandwidth users is an equity issue, not a luxury","Static generation with ISR is the sweet spot for content-driven sites","Accessibility compliance improves UX for everyone, not just screen reader users"],
    },
  },
  {
    slug: "fyp-pet-haven",
    title: "FYP Pet Haven",
    tagline: "Final year project: a full-stack pet adoption platform with real-time chat and JWT auth.",
    description: "Designed and developed a complete pet adoption system where users can browse pets, view details, and manage adoption requests. Built full backend logic, database design, and frontend UI from scratch.",
    image: "/projects/pethaven.png",
    heroGradient: "linear-gradient(135deg, rgba(255, 155, 120, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Full-Stack Developer",
    year: "2023",
    technologies: ["React.js","Node.js","Koa.js","Express","PostgreSQL","Socket.io","REST APIs","JWT"],
    link: "https://fyp-pethaven.netlify.app",
    layout: "dual",
    accent: "#f4a261",
    category: "Full-Stack",
    difficulty: 4,
    story: {
      mission: "Build a complete pet adoption ecosystem — from browsing furry friends to real-time adoption discussions.",
      problem: "Pet adoption in Nepal is fragmented across Facebook groups and WhatsApp chats. No centralized platform for listing, discovery, or communication.",
      approach: "Started with database design (shelters, pets, users, adoption requests, messages), then built the REST API with JWT auth, then the React frontend. Socket.io was integrated last for real-time chat between adopters and shelters.",
      features: ["Pet listings with filters (species, breed, age, location)","Real-time chat system using Socket.io with read receipts","JWT-based authentication with role-based access","Adoption request workflow with status tracking"],
      result: "Successfully defended as final year project. Prototype demonstrated end-to-end adoption flow with real-time messaging.",
      lessons: ["Database schema design first — everything else follows","Socket.io makes real-time features surprisingly accessible","JWT with refresh tokens is the right balance of security and UX"],
      architecture: "React.js frontend → Koa.js + Express API gateway → PostgreSQL → Socket.io for real-time. JWT with access + refresh tokens. Deployed on Netlify + Railway.",
      challenges: ["Designing a schema that handles the complex adoption lifecycle","Real-time message synchronization across multiple devices"],
    },
  },
  {
    slug: "meatmandu",
    title: "Meatmandu",
    tagline: "Interactive meat delivery platform with rich frontend animations and responsive design.",
    description: "Built a responsive and interactive frontend application with focus on animations, usability, and performance optimization.",
    image: "/projects/beefmandu.png",
    heroGradient: "linear-gradient(135deg, rgba(200, 100, 255, 0.4) 0%, rgba(5, 5, 5, 0) 100%)",
    role: "Frontend Developer",
    year: "2022",
    technologies: ["React.js","Tailwind CSS","JavaScript","GSAP"],
    link: "https://meetmandu.netlify.app",
    layout: "spotlight",
    accent: "#7c3aed",
    category: "Creative",
    difficulty: 3,
    story: {
      mission: "Design a playful, animation-rich interface for a meat delivery service — turning grocery shopping into a delightful experience.",
      problem: "Meat delivery apps are typically utilitarian and lifeless. The client wanted something that felt fresh, modern, and even fun — not an easy brief for a meat shop.",
      approach: "Used GSAP for playful entry animations on products, category filters with morph transitions, and a floating cart with a bounce animation. Every interaction was designed to feel tactile and responsive.",
      features: ["GSAP-animated product cards with staggered entrances","Floating cart with bounce animation on add/remove","Category filters with smooth morph transitions","Responsive grid with touch-optimized interactions"],
      result: "Client reported high user engagement with the product browsing experience. Average session duration exceeded industry benchmarks for food delivery.",
      lessons: ["Even utilitarian apps benefit from playful interactions","GSAP's staggerFrom makes list animations effortless","Animation decisions should be made at the component level, not globally"],
    },
  },
]
