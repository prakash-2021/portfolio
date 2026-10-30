/**
 * Every piece of copy on the site lives in this file.
 * Strings containing `[TODO: …]` render as highlighted placeholders, so gaps are visible on the page.
 */
import type { StaticImageData } from "next/image";
import achieveTreksShot from "@/assets/projects/achievetrek.webp";
import beefManduShot from "@/assets/projects/beefmandu.webp";
import biskajatraShot from "@/assets/projects/biskajatra.webp";
import cutsAndCoffeeShot from "@/assets/projects/cutsandcoffee.webp";
import invictaKentShot from "@/assets/projects/invictakent.webp";
import orgyenLingShot from "@/assets/projects/orgyenling.webp";
import petHavenShot from "@/assets/projects/pethaven.webp";
import serangSchoolShot from "@/assets/projects/serangschool.webp";

/* ─── Site & person ──────────────────────────────────────────────────────── */

export const site = {
  url: "https://prakashshrestha7.com.np",
  title: "Prakash Shrestha · Full Stack Engineer",
  description:
    "Full stack engineer in Kathmandu with 4+ years and 25+ client applications shipped for clients in Nepal and the UK. React, Next.js, Node.js, NestJS, FastAPI, PostgreSQL, AWS.",
} as const;

export const person = {
  name: "Prakash Shrestha",
  firstName: "Prakash",
  lastName: "Shrestha",
  role: "Full Stack Engineer",
  location: "Kathmandu, Nepal",
  timeZone: "Asia/Kathmandu",
  email: "prakashrestha2075@gmail.com",
  phone: { display: "+977 9860659996", href: "tel:+9779860659996" },
  currentRole: { title: "Full Stack Engineer", company: "Dobaato Info Tech" },
  headline: "I build products from database to deployment.",
  intro:
    "Thoughtful data models, reliable APIs and polished interfaces, shipped and kept running in production.",
  stack: ["React", "Next.js", "Node.js", "NestJS", "FastAPI", "PostgreSQL", "AWS"],
  links: {
    linkedin: "https://www.linkedin.com/in/prakashresthaa/",
    github: "https://github.com/prakash-2021",
    resume: "/Prakash_Shrestha_Resume.pdf",
  },
} as const;

export type ProofItem = { value: string; label: string; href?: string };

export const proof: ProofItem[] = [
  { value: "4+", label: "years building production web apps" },
  { value: "25+", label: "client applications delivered" },
  { value: "NP · UK", label: "clients in Nepal and the United Kingdom" },
  {
    value: "100",
    label: "Lighthouse performance at launch on Invicta Kent, a UK client",
    href: "/work/invicta-kent",
  },
];

/** The hero's signature visual: the layers I own on every product, top to bottom. */
export const heroSystem: { layer: string; tools: string }[] = [
  { layer: "Interface", tools: "React · Next.js" },
  { layer: "API", tools: "Node.js · NestJS · FastAPI" },
  { layer: "Data", tools: "PostgreSQL · Prisma · Redis" },
  { layer: "Deploy", tools: "AWS · Docker · CI/CD" },
];

export const about: string[] = [
  "I'm a full stack engineer in Kathmandu, equally at home in a database schema and a React component.",
  "At Dobaato Info Tech I lead backend development on client projects and build the Next.js frontends on top, so I own each product from the database to the UI.",
  "Before that I shipped 16+ client applications at Ottr Technology.",
  "I finished a First Class BSc (Hons) in Computer Science from the University of Wolverhampton while working full time.",
];

/* ─── Case studies ───────────────────────────────────────────────────────── */

export type CaseStudy = {
  slug: string;
  title: string;
  /** One line used in lists, meta descriptions and OG images. */
  summary: string;
  description: string;
  client: string;
  company: string;
  year: string;
  role: string;
  stack: string[];
  link?: string;
  image: StaticImageData;
  imageAlt: string;
  featured: boolean;
  /** Short, verifiable headline result for list views. */
  metric?: { value: string; label: string };
  mission: string;
  problem: string;
  approach: string;
  built: { frontend: string[]; backend: string[]; infrastructure: string[] };
  features: string[];
  architecture?: string;
  challenges?: string[];
  result: string;
  lessons: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "invicta-kent",
    title: "Invicta Kent Management",
    summary: "A full property management system for a UK company, built, deployed and run by me.",
    description:
      "A production management system for a UK property company: Next.js frontend, Strapi and PostgreSQL backend, Docker, CI/CD, and a server I set up and deploy to myself.",
    client: "UK property management company",
    company: "Freelance",
    year: "2025",
    role: "Full stack developer and DevOps",
    stack: ["Next.js", "Strapi", "PostgreSQL", "Docker", "Nginx", "CI/CD"],
    link: "https://www.invictakentmanagement.co.uk",
    image: invictaKentShot,
    imageAlt:
      "Invicta Kent Management homepage: the headline “Your Perfect Home Awaits.” over a photo of house rooftops, with buttons to view listings or list a house.",
    featured: true,
    metric: { value: "100", label: "Lighthouse performance at launch" },
    mission: "Build a production-grade management system for a UK property firm, from code to deployment.",
    problem:
      "The client had no digital infrastructure. Work ran on spreadsheets, emails and paper. There was no CI/CD, no staging environment and no automated testing.",
    approach:
      "I set up CI/CD on day one, then built feature by feature while the client gave feedback on a staging environment.",
    built: {
      frontend: [
        "Next.js frontend for properties, tenant services and landlord services",
        "Role-based dashboards for tenants, landlords and admins",
      ],
      backend: [
        "Strapi as the API and content backend, on PostgreSQL",
        "Maintenance tickets with status tracking, and a document vault with role-based access",
      ],
      infrastructure: [
        "Docker for every service",
        "CI/CD pipeline from repository to production",
        "Server setup, Nginx and deployment handled by me",
      ],
    },
    features: [
      "Role-based dashboards for tenants, landlords and admins",
      "Automated rent collection with payment gateway integration",
      "Maintenance ticket system with real-time status tracking",
      "Document vault with role-based access control",
    ],
    architecture:
      "Next.js frontend → Strapi API → PostgreSQL. Each service runs in Docker behind an Nginx reverse proxy on a server I set up, and a CI/CD pipeline deploys every change.",
    challenges: [
      "The client had no existing technical infrastructure",
      "Data had to stay in sync across several user roles",
      "Near-perfect performance on a limited hosting budget",
    ],
    result:
      "Zero-downtime deployments. The client moved off spreadsheets entirely within 2 weeks of launch.",
    lessons: [
      "CI/CD should never be an afterthought. It paid off on every iteration.",
      "Real-time feedback on staging builds trust faster than any spec document.",
      "A perfect Lighthouse score is possible without cutting features.",
    ],
  },
  {
    slug: "achieve-treks",
    title: "Achieve Treks",
    summary: "A multi-language trekking platform with REST APIs, a CMS dashboard and technical SEO.",
    description:
      "A travel and trekking platform where people explore packages, itineraries and travel details. I worked across the frontend and backend: REST APIs, a CMS dashboard, multi-language support and technical SEO.",
    client: "Trekking and expedition company, Nepal",
    company: "Ottr Technology",
    year: "2025",
    role: "Full stack developer",
    stack: ["Next.js", "Node.js", "Strapi", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    link: "https://www.achievetreks.com/en",
    image: achieveTreksShot,
    imageAlt:
      "Achieve Treks homepage: “Experience Nepal's Enchanting Landscapes” over snow-capped Himalayan peaks, with an Enquire Now button.",
    featured: true,
    metric: { value: "3", label: "languages, one CMS" },
    mission: "A multi-language trekking platform that feels as adventurous as the Himalayas it shows.",
    problem:
      "The old site was static HTML with no CMS, no multi-language support and poor mobile performance. Every content update needed a developer.",
    approach:
      "Strapi as a headless CMS so the content team works on its own, Next.js for fast server-rendered pages, and i18n routing for 3 languages. I built the CMS dashboard first so the client could add content while we built the frontend.",
    built: {
      frontend: [
        "Next.js pages with i18n routing for English, Japanese and Korean",
        "Trek pages with structured data for search",
        "Itinerary pages with difficulty ratings",
      ],
      backend: [
        "REST APIs for packages, itineraries and travel details",
        "CMS dashboard that non-technical editors use daily",
      ],
      infrastructure: ["Technical SEO: structured data, metadata, multi-language routing"],
    },
    features: [
      "Multi-language support (English, Japanese, Korean) with i18n routing",
      "CMS dashboard for non-technical content editors",
      "SEO-optimised trek pages with structured data",
      "Interactive itinerary builder with difficulty ratings",
    ],
    architecture:
      "Next.js with i18n routing → Strapi CMS (self-hosted) → PostgreSQL → Redis caching layer. Deployed on Vercel with automated backups.",
    result:
      "300% increase in organic traffic within 3 months. The content team publishes updates without engineering support.",
    lessons: [
      "Building the CMS first lets the client move in parallel and speeds up delivery.",
      "Plan i18n from day one. Retrofitting it is painful.",
      "Structured data is the highest-return SEO work on content sites.",
    ],
  },
  {
    slug: "cuts-and-coffee",
    title: "Cuts and Coffee",
    summary: "A barbershop-café site with 3D scroll animations in Three.js and GSAP, at Lighthouse 90.",
    description:
      "A dynamic website built with Next.js, Three.js and GSAP: 3D scroll animations, smooth page transitions and interactive visual effects, while keeping a Lighthouse performance score of 90.",
    client: "Barbershop and café, Kathmandu",
    company: "Ottr Technology",
    year: "2024",
    role: "Frontend developer",
    stack: ["Next.js", "Three.js", "GSAP", "Strapi"],
    link: "https://cutsandcoffee.com.np",
    image: cutsAndCoffeeShot,
    imageAlt:
      "Cuts and Coffee homepage: the words “Feel the change” over a dark close-up of an espresso machine, with a Become a Member button.",
    featured: true,
    metric: { value: "90", label: "Lighthouse performance with 3D" },
    mission: "A barbershop-café website that uses 3D to show one space with two personalities.",
    problem:
      "Two businesses in one space, a barbershop and a café, each with its own branding. A standard template couldn't carry both.",
    approach:
      "A Three.js scene that moves between barber and café modes as you scroll, with GSAP orchestrating the transitions between sections.",
    built: {
      frontend: [
        "3D scene with scroll-driven camera movement between barber and café zones",
        "GSAP page transitions",
        "Menu and service cards with interactive 3D tilt",
        "Three.js loaded with dynamic imports to keep the first load small",
      ],
      backend: ["Strapi as the content backend"],
      infrastructure: [],
    },
    features: [
      "3D scene with scroll-driven camera movement between barber and café zones",
      "GSAP page transitions",
      "Menu and service cards with interactive 3D tilt",
      "Performance-tuned Three.js",
    ],
    architecture:
      "Next.js → Three.js → GSAP for transition orchestration. Three.js is dynamically imported to keep the initial bundle lean.",
    challenges: [
      "Balancing 3D visual quality with mobile performance",
      "One cohesive identity for two distinct businesses",
    ],
    result:
      "Lighthouse performance 90 despite heavy 3D content. The client reported customers booking appointments because of the website.",
    lessons: [
      "Three.js and performance can coexist with careful loading.",
      "Dual-brand sites need a strong visual bridge between the two identities.",
      "Scroll-driven 3D makes a memorable first impression.",
    ],
  },
  {
    slug: "orgyen-ling",
    title: "Orgyen Ling",
    summary: "A multi-language platform on Next.js and Directus, with scroll animation in GSAP.",
    description:
      "A web platform built with Next.js and Directus, with GSAP scroll animations, page transitions and multi-language content management.",
    client: "Buddhist monastery and school",
    company: "Ottr Technology",
    year: "2025",
    role: "Full stack developer",
    stack: ["Next.js", "Directus", "PostgreSQL", "REST APIs", "GSAP", "i18n"],
    link: "https://www.ogl.world/en",
    image: orgyenLingShot,
    imageAlt:
      "Orgyen Ling homepage: “Preserving Wisdom, Empowering the Future” in red on a cream background with cloud motifs, with Donate and Get Involved buttons.",
    featured: true,
    metric: { value: "Multi-language", label: "content managed in Directus" },
    mission: "An animation-led platform that respects traditional aesthetics and still feels modern.",
    problem:
      "The client wanted rich animation and a premium feel, but most animation-heavy sites give up load time and accessibility. It needed both.",
    approach:
      "GSAP ScrollTrigger for scroll animation, Directus for content, and code-splitting to keep the bundle small. Every animation has a purpose.",
    built: {
      frontend: [
        "Scroll-triggered GSAP animations with scrub",
        "Page transitions and responsive layouts that keep animation quality on mobile",
      ],
      backend: [
        "Directus headless CMS for multi-language content",
        "Media galleries served from Directus over REST",
      ],
      infrastructure: [],
    },
    features: [
      "Scroll-triggered GSAP animations with scrub",
      "Multi-language content platform",
      "Directus-powered media galleries",
      "Responsive design that keeps animation quality on mobile",
    ],
    architecture:
      "Next.js → Directus headless CMS → PostgreSQL. GSAP ScrollTrigger drives every scroll animation. Each dependency earns its place.",
    result:
      "Lighthouse performance 95+ with animations at 60fps. The client reported more engagement and longer sessions.",
    lessons: [
      "ScrollTrigger stays fast when you animate transforms and use will-change carefully.",
      "Content teams pick up Directus almost immediately.",
      "Animation should serve the story, not distract from it.",
    ],
  },
  {
    slug: "biskajatra",
    title: "Biskajatra",
    summary: "A cultural festival site built for search, at Lighthouse 93.",
    description:
      "A visually rich website for a cultural festival with a 93 Lighthouse performance score, built around SEO, smooth UI interactions and responsive design.",
    client: "Biska Jatra festival, Bhaktapur",
    company: "Ottr Technology",
    year: "2023",
    role: "Frontend developer",
    stack: ["React", "Tailwind CSS", "SCSS"],
    link: "https://biskajatra.com",
    image: biskajatraShot,
    imageAlt:
      "Biskajatra homepage: “The Vibrant Biska Jatras” in bold white type on a blue background with an orange festival emblem.",
    featured: false,
    metric: { value: "93", label: "Lighthouse performance" },
    mission: "Capture the energy of the festival while driving awareness and attendance.",
    problem:
      "Cultural events struggle to be found online. The site needed to rank well and still feel immersive.",
    approach:
      "Semantic HTML, structured data and complete metadata for SEO. Tailwind and SCSS for the UI, with small interactions that make browsing feel alive.",
    built: {
      frontend: [
        "SEO-first markup with structured data and Open Graph",
        "Event schedule with countdown timers",
        "Gallery with lazy-loaded images",
        "Mobile-first responsive layout",
      ],
      backend: [],
      infrastructure: [],
    },
    features: [
      "SEO-optimised with structured data and Open Graph",
      "Event schedule with countdown timers",
      "Gallery with lazy-loaded images",
      "Mobile-first, touch-friendly layout",
    ],
    result:
      "Lighthouse performance 93. The event saw more online ticket sales than the previous year's print-only marketing.",
    lessons: [
      "SEO and good UX are not a trade-off. Semantic HTML serves both.",
      "Small interactions raise perceived quality a lot.",
      "Cultural sites benefit from bold type and generous whitespace.",
    ],
  },
  {
    slug: "serang-school",
    title: "Serang School",
    summary: "A fast, accessible school website for families on slow connections.",
    description:
      "A high-performing school website built with Next.js 12, tuned for speed and responsiveness on low-bandwidth connections.",
    client: "Serang Secondary School",
    company: "Ottr Technology",
    year: "2024",
    role: "Frontend developer",
    stack: ["Next.js"],
    link: "https://www.serangschool.org",
    image: serangSchoolShot,
    imageAlt:
      "Serang Secondary School homepage: “Empowering children of the Himalayas” over a photo of students cheering on a hillside, with Donate Now and Watch Video buttons.",
    featured: false,
    mission: "A fast, accessible school website parents and students can use on any device, even on slow connections.",
    problem:
      "The previous site took 12+ seconds to load on mobile data, so parents couldn't reach schedules, events and announcements.",
    approach:
      "Static generation for most pages and ISR for dynamic content. Every image optimised, critical CSS inlined, aggressive caching, and accessibility as a first-class requirement.",
    built: {
      frontend: [
        "Static generation with ISR",
        "Event calendar and announcements",
        "Mobile-first layout for low-bandwidth users",
      ],
      backend: [],
      infrastructure: [],
    },
    features: [
      "Near-instant page loads with static generation and ISR",
      "Built to WCAG 2.1 AA",
      "Event calendar and announcement system",
      "Mobile-first design for low-bandwidth users",
    ],
    result:
      "Load time dropped from 12 s to under 2 s on 3G. The school reported more parent engagement with announcements.",
    lessons: [
      "Performance for low-bandwidth users is an equity issue, not a luxury.",
      "Static generation with ISR is the sweet spot for content sites.",
      "Accessibility work improves the experience for everyone.",
    ],
  },
  {
    slug: "fyp-pet-haven",
    title: "Pet Haven",
    summary: "My final-year project: a full stack pet adoption platform with real-time chat.",
    description:
      "A complete pet adoption system where users browse pets, view details and manage adoption requests. I designed the database, wrote the backend and built the frontend from scratch.",
    client: "Final-year project, University of Wolverhampton",
    company: "Academic",
    year: "2023 [TODO: confirm year; the BSc ran 2023 2025 - confirm]",
    role: "Full stack developer",
    stack: ["React", "Node.js", "Koa.js", "Express", "PostgreSQL", "Socket.IO", "JWT"],
    link: "https://fyp-pethaven.netlify.app",
    image: petHavenShot,
    imageAlt:
      "Pet Haven homepage: “Say hi to your new adopted pet” in navy on a cream background, with an Adopt your pet button.",
    featured: false,
    mission: "A complete pet adoption platform, from browsing pets to real-time adoption conversations.",
    problem:
      "Pet adoption in Nepal is scattered across Facebook groups and WhatsApp chats, with no central place for listings, discovery or contact.",
    approach:
      "Database design first (shelters, pets, users, adoption requests, messages), then a REST API with JWT auth, then the React frontend. Socket.IO came last for real-time chat.",
    built: {
      frontend: ["React UI with pet filters by species, breed, age and location", "Adoption request flow with status tracking"],
      backend: [
        "REST API with JWT access and refresh tokens and role-based access",
        "Real-time chat between adopters and shelters with Socket.IO",
        "PostgreSQL schema for the full adoption lifecycle",
      ],
      infrastructure: ["Deployed on Netlify and Railway"],
    },
    features: [
      "Pet listings with filters (species, breed, age, location)",
      "Real-time chat with read receipts",
      "JWT authentication with role-based access",
      "Adoption request workflow with status tracking",
    ],
    architecture:
      "React frontend → Koa.js + Express API → PostgreSQL, with Socket.IO for real-time messaging. JWT access and refresh tokens. Deployed on Netlify and Railway.",
    challenges: [
      "A schema that handles the whole adoption lifecycle",
      "Keeping messages in sync across devices",
    ],
    result: "Successfully defended as my final-year project, with a working end-to-end adoption flow and real-time messaging.",
    lessons: [
      "Design the schema first. Everything else follows.",
      "Socket.IO makes real-time features approachable.",
      "JWT with refresh tokens balances security and UX.",
    ],
  },
  {
    slug: "meatmandu",
    title: "BeefMandu",
    summary: "An animated, responsive food delivery frontend built with React and GSAP.",
    description:
      "A responsive, interactive frontend for a meat delivery service, focused on animation, usability and performance.",
    client: "Meat delivery service, Kathmandu",
    company: "Personal",
    year: "2022",
    role: "Frontend developer",
    stack: ["React", "Tailwind CSS", "JavaScript", "GSAP"],
    link: "https://meetmandu.netlify.app",
    image: beefManduShot,
    imageAlt:
      "BeefMandu homepage: “We Love Delicious Foods!” next to a photo of a fruit bowl, with fast delivery, fresh food and 24/7 support icons.",
    featured: false,
    mission: "A playful, animated interface that makes ordering groceries feel good.",
    problem:
      "Meat delivery apps are usually utilitarian. The client wanted something fresh and even fun, which is a hard brief for a meat shop.",
    approach:
      "GSAP entrance animations on products, category filters with smooth transitions, and a floating cart with a bounce on add and remove.",
    built: {
      frontend: [
        "GSAP-animated product cards with staggered entrances",
        "Floating cart with bounce animation",
        "Category filters with smooth transitions",
      ],
      backend: [],
      infrastructure: [],
    },
    features: [
      "GSAP-animated product cards with staggered entrances",
      "Floating cart with bounce animation on add and remove",
      "Category filters with smooth transitions",
      "Responsive grid with touch-friendly interactions",
    ],
    result:
      "The client reported strong engagement with product browsing, and average session length above industry benchmarks for food delivery.",
    lessons: [
      "Even utilitarian apps benefit from playful interactions.",
      "GSAP stagger makes list animations easy.",
      "Decide on animation per component, not globally.",
    ],
  },
];

export const featuredWork = caseStudies.filter((c) => c.featured);
export const moreWork = caseStudies.filter((c) => !c.featured);

/* ─── Currently building (Dobaato Info Tech, pre-launch) ─────────────────── */

export type BuildingProject = {
  name: string;
  status: string;
  link?: string;
  stack: string[];
  what: string;
  built: string[];
  /** Ids of architecture nodes this system uses; see `traceNodes`. */
  nodes: TraceNodeId[];
};

export const building: BuildingProject[] = [
  {
    name: "OSHC",
    status: "Pre-launch",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "BullMQ", "AWS"],
    what: "A platform for comparing and buying Overseas Student Health Cover, the health insurance international students need in Australia, sold direct and through education agents.",
    built: [
      "Lead backend developer, plus the Next.js frontend",
      "Three apps on one 89-table schema: a public compare-and-buy site, an agent and branch portal, and a master admin",
      "Checkout through Flywire direct pay or insurer affiliate links, plus refund, extension and policy-switch requests",
      "Agent business tools: clients, quotations, policies, commissions, payouts, tax invoices and purchase orders",
      "Team roles with per-branch and per-member permission overrides, agent onboarding with document review, and audit logs",
      "Admin tools for insurers, plans and pricing history, a CMS for pages and FAQs, bulk imports, statement reconciliation and reports",
    ],
    nodes: ["browser", "next", "api", "redis", "db", "queue", "worker", "host"],
  },
  {
    name: "Expert PTE",
    status: "Pre-launch",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "AWS"],
    what: "A PTE Academic exam-prep platform: students take practice questions and full mock tests, AI scores their answers, and institute teachers review the results.",
    built: [
      "Lead backend developer, plus the Next.js frontend",
      "Three NestJS apps (admin, institute branch, student) sharing one 41-table Prisma schema",
      "Full and mini mock tests plus per-question practice, with timing rules and audio and media uploads to S3",
      "Auto-grading for objective questions, and Gemini scoring of written answers against the PTE trait rubric, with feedback",
      "Teacher review queues for mock tests, mini mock tests and practice attempts",
      "Subscription plans, coupons, study material, and announcements sent in-app and by email",
    ],
    nodes: ["browser", "next", "api", "redis", "db", "host"],
  },
  {
    name: "CNI Swadeshi",
    status: "Live",
    link: "https://b2b.dobaato.com/",
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "Docker"],
    what: "A bilingual (English and Nepali) B2B marketplace for Nepali-made products, run for the Confederation of Nepalese Industries.",
    built: [
      "The complete backend in FastAPI: the REST API and data-processing workflows for vendor applications, product catalogues, pricing and RFQs",
      "Events with scheduled publishing and registrations, plus policy updates, alerts and advertisements",
      "Role-based access for admins, staff, vendors and buyers, with OTP email verification and rate limiting",
      "English and Nepali content with automatic translation, and both AD and BS date display",
    ],
    nodes: ["api", "redis", "db"],
  },
];

export const buildingNote = "";

export const engineeringNotes: { title: string; body: string }[] = [
  {
    title: "Data model",
    body: "PostgreSQL schemas designed from scratch with Prisma, including an 89-table system for OSHC and a 41-table system for Expert PTE, with multiple user roles, indexing and migrations.",
  },
  {
    title: "Queues",
    body: "Emails, notifications and scheduled tasks run as BullMQ background jobs on Redis, so user requests never wait on slow work.",
  },
  {
    title: "Caching",
    body: "Redis caching on high-traffic endpoints keeps the APIs fast.",
  },
  {
    title: "Deployment",
    body: "Services run on AWS (EC2, S3) and Linux VPS with Docker, Nginx and PM2, shipped by GitHub Actions CI/CD pipelines.",
  },
  {
    title: "AI features",
    body: "Gemini scores Expert PTE essays and summaries against the official PTE trait rubric (content, form, grammar, vocabulary, spelling, coherence) and returns feedback, so students get results without waiting for a teacher.",
  },
  {
    title: "Code review",
    body: "I review pull requests for a team of 3 developers and set shared conventions for API structure, error handling and code quality.",
  },
];

/* ─── Signature: request trace ───────────────────────────────────────────── */

export type TraceNodeId =
  | "browser"
  | "nginx"
  | "next"
  | "api"
  | "redis"
  | "db"
  | "queue"
  | "worker"
  | "ci"
  | "docker"
  | "host";

export type TraceNode = {
  id: TraceNodeId;
  label: string;
  sub: string;
  /** Centre position in the 1000 × 520 desktop diagram. */
  x: number;
  y: number;
  detail: string;
};

export const traceNodes: TraceNode[] = [
  { id: "browser", label: "Browser", sub: "Next.js client", x: 100, y: 90, detail: "I build the Next.js frontends for the client projects I lead, so I own each product from the database to the UI." },
  { id: "nginx", label: "Nginx", sub: "Reverse proxy", x: 300, y: 90, detail: "Nginx sits in front of the services as a reverse proxy. I configure it as part of every deployment." },
  { id: "next", label: "Next.js", sub: "SSR · SSG", x: 500, y: 90, detail: "Server-rendered and statically generated pages, the same way this site is built." },
  { id: "api", label: "API", sub: "NestJS · FastAPI", x: 700, y: 90, detail: "I lead backend development on 4 client projects. OSHC and Expert PTE run on NestJS; CNI Swadeshi runs on the FastAPI backend I built. I set shared conventions for API structure and error handling." },
  { id: "redis", label: "Redis", sub: "Cache", x: 900, y: 90, detail: "Redis caching on high-traffic endpoints keeps APIs fast." },
  { id: "db", label: "PostgreSQL", sub: "Prisma", x: 700, y: 270, detail: "I design PostgreSQL schemas from scratch with Prisma, including a 24+ table system with multiple user roles, indexing and migrations." },
  { id: "queue", label: "BullMQ", sub: "Job queue on Redis", x: 900, y: 270, detail: "Emails, notifications and scheduled tasks run as BullMQ background jobs, so user requests never wait on slow work." },
  { id: "worker", label: "Worker", sub: "Email · notify · cron", x: 900, y: 450, detail: "Workers take jobs off the queue: they send emails and notifications and run scheduled tasks." },
  { id: "ci", label: "GitHub Actions", sub: "CI/CD", x: 100, y: 270, detail: "GitHub Actions CI/CD pipelines build and ship every service." },
  { id: "docker", label: "Docker", sub: "Images", x: 300, y: 270, detail: "Every service is packaged as a Docker image, so it runs the same on a laptop, a VPS or EC2." },
  { id: "host", label: "AWS · VPS", sub: "EC2 · S3 · PM2", x: 500, y: 270, detail: "I deploy and maintain services on AWS (EC2, S3) and Linux VPS, with Nginx and PM2." },
];

export type TraceEdge = { id: string; d: string; dashed?: boolean };

/** Node boxes are 150 × 64 in diagram units; these paths connect box edges. */
export const traceEdges: TraceEdge[] = [
  { id: "browser-nginx", d: "M175 90 H225" },
  { id: "nginx-next", d: "M375 90 H425" },
  { id: "next-api", d: "M575 90 H625" },
  { id: "api-redis", d: "M775 90 H825" },
  { id: "api-db", d: "M700 122 V238" },
  { id: "api-queue", d: "M750 122 V180 H880 V238" },
  { id: "redis-queue", d: "M920 122 V238", dashed: true },
  { id: "queue-worker", d: "M900 302 V418" },
  { id: "ci-docker", d: "M175 270 H225" },
  { id: "docker-host", d: "M375 270 H425" },
  { id: "host-next", d: "M500 238 V122", dashed: true },
];

export type TraceScenario = {
  id: string;
  label: string;
  /** Nodes in route order; the index becomes the step number. */
  route: TraceNodeId[];
  edges: string[];
  steps: string[];
};

export const traceScenarios: TraceScenario[] = [
  {
    id: "hit",
    label: "Page load",
    route: ["browser", "nginx", "next", "api", "redis"],
    edges: ["browser-nginx", "nginx-next", "next-api", "api-redis"],
    steps: [
      "The browser requests a page.",
      "Nginx forwards the request to Next.js.",
      "Next.js renders the page and asks the API for data.",
      "The API finds the answer in Redis and returns it without touching the database.",
    ],
  },
  {
    id: "miss",
    label: "Cache miss",
    route: ["browser", "nginx", "next", "api", "redis", "db"],
    edges: ["browser-nginx", "nginx-next", "next-api", "api-redis", "api-db"],
    steps: [
      "Same request, but Redis has no cached answer.",
      "The API queries PostgreSQL through Prisma.",
      "It writes the result back to Redis, so the next request is a cache hit.",
    ],
  },
  {
    id: "job",
    label: "Background job",
    route: ["browser", "nginx", "next", "api", "queue", "worker"],
    edges: ["browser-nginx", "nginx-next", "next-api", "api-queue", "redis-queue", "queue-worker"],
    steps: [
      "A user does something that needs an email or notification.",
      "The API saves the change, adds a job to BullMQ and responds immediately.",
      "A worker picks up the job and sends the email or notification. Scheduled tasks run the same way.",
    ],
  },
  {
    id: "deploy",
    label: "Deploy",
    route: ["ci", "docker", "host", "next"],
    edges: ["ci-docker", "docker-host", "host-next"],
    steps: [
      "Code is pushed to GitHub.",
      "GitHub Actions builds the Docker images.",
      "The images ship to AWS EC2 or a Linux VPS, behind Nginx and managed by PM2.",
    ],
  },
];

/* ─── Experience & education ─────────────────────────────────────────────── */

export type Role = {
  title: string;
  company: string;
  period: string;
  type?: string;
  summary: string;
  groups: { title: string; items: string[] }[];
  stack: string[];
};

export const experience: Role[] = [
  {
    title: "Full Stack Engineer",
    company: "Dobaato Info Tech",
    period: "May 2026 – Present",
    summary:
      "I lead backend development across 4 client projects and build their Next.js frontends, so I own each product from database to UI.",
    groups: [
      {
        title: "Role and scope",
        items: [
          "Lead backend development on 4 client projects, including OSHC and Expert PTE (both pre-launch), and build their Next.js frontends",
          "Contribute to system design: architecture, data modelling, and how services, queues and caching fit together",
          "Review pull requests for a team of 3 developers, and set shared conventions for API structure, error handling and code quality",
        ],
      },
      {
        title: "Backend and data",
        items: [
          "Built the FastAPI backend for CNI Swadeshi",
          "Design PostgreSQL schemas from scratch with Prisma, including a 24+ table system with multiple user roles, indexing and migrations",
          "Run emails, notifications and scheduled tasks as BullMQ background jobs on Redis, so user requests never wait on slow work",
          "Use Redis caching on high-traffic endpoints to keep APIs fast",
          "Integrate AI features with LLMs: Gemini scores Expert PTE written answers against the PTE rubric and gives students feedback",
        ],
      },
      {
        title: "Infrastructure",
        items: [
          "Deploy and maintain services on AWS (EC2, S3) and Linux VPS using Docker, Nginx, PM2 and GitHub Actions CI/CD pipelines",
        ],
      },
    ],
    stack: ["Next.js", "NestJS", "FastAPI", "PostgreSQL", "Prisma", "Redis", "BullMQ", "AWS", "Docker"],
  },
  {
    title: "Full Stack Developer",
    company: "Ottr Technology",
    period: "Sep 2022 – May 2026",
    summary: "16+ client applications for Nepali and international clients, from REST APIs and CMS dashboards to animation-heavy frontends.",
    groups: [
      {
        title: "What I did",
        items: [
          "Built 16+ client applications with Next.js, React, NestJS and PostgreSQL",
          "Built REST APIs and CMS dashboards with Strapi and Directus",
          "Built animation-heavy interfaces with GSAP and Three.js",
          "Led code reviews and kept best practices consistent across the team",
          "Built responsive UIs for Nepali and international clients",
        ],
      },
    ],
    stack: ["Next.js", "React", "NestJS", "PostgreSQL", "Strapi", "Directus", "GSAP", "Three.js"],
  },
  {
    title: "Lead Frontend Developer",
    company: "Astergaze Technologies",
    period: "Sep 2024 – Feb 2025",
    type: "Part-time",
    summary: "Led frontend architecture as a part-time lead and mentored a junior developer.",
    groups: [
      {
        title: "What I did",
        items: [
          "Led frontend architecture and set the foundation for a SaaS platform",
          "Mentored a junior developer",
          "Built the animation system that defined the product's design language",
          "Set performance budgets for every frontend deliverable",
        ],
      },
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
];

export type Education = {
  degree: string;
  school: string;
  period?: string;
  result: string;
  notes: string[];
};

export const education: Education[] = [
  {
    degree: "BSc (Hons) Computer Science",
    school: "University of Wolverhampton, via Herald College Kathmandu",
    period: "Feb 2023 – Dec 2025",
    result: "First Class Honours",
    notes: ["Completed while working full time", "AAA Scholarship"],
  },
  {
    degree: "Diploma in Computer Engineering",
    school: "Budhanilkantha Technical School (CTEVT)",
    period: "Jan 2019 – Apr 2022",
    result: "Distinction",
    notes: [
      "Topped the entrance examination and received a partial scholarship",
      "Ranked top of the class in selected semesters",
    ],
  },
];

/* ─── Skills ─────────────────────────────────────────────────────────────── */

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Sass", "React Query", "Zustand", "Material UI", "shadcn/ui", "Radix UI", "Mantine"],
  },
  { group: "Motion & 3D", items: ["GSAP", "Three.js", "Framer Motion", "Lenis", "Anime.js"] },
  {
    group: "Backend",
    items: ["Node.js", "NestJS", "Express", "FastAPI", "Koa", "REST", "WebSockets", "Socket.IO", "BullMQ"],
  },
  { group: "Data", items: ["PostgreSQL", "Redis", "MySQL", "MongoDB", "Prisma", "TypeORM"] },
  {
    group: "Infrastructure",
    items: ["AWS (EC2, S3)", "Docker", "Nginx", "PM2", "GitHub Actions", "Linux", "Vercel", "Cloudflare"],
  },
  { group: "CMS", items: ["Strapi", "Directus", "Sanity"] },
  {
    group: "AI & automation",
    items: ["OpenAI API", "Anthropic Claude", "n8n", "MCP", "AI-assisted development", "Prompt engineering"],
  },
];
