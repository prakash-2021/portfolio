export type Tool = {
  slug: string
  name: string
  simpleIconSlug: string
  experience: string
  yearsUsed: number
  confidence: number
  projects: string[]
  favoriteFeature: string
  funFact: string
  microAnim?: "spin" | "float" | "pulse" | "glow" | "stretch" | "wobble"
}

export type ToolCategory = {
  id: string
  name: string
  label: string
  color: string
  bgColor: string
  borderColor: string
  accentColor: string
  description: string
  tools: Tool[]
}

export const toolCategories: ToolCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    label: "FRONTEND",
    color: "#457b9d",
    bgColor: "rgba(69, 123, 157, 0.04)",
    borderColor: "rgba(69, 123, 157, 0.3)",
    accentColor: "#457b9d",
    description: "Crafting interfaces that feel alive",
    tools: [
      { slug: "nextjs", name: "Next.js", simpleIconSlug: "nextdotjs", experience: "4 years", yearsUsed: 4, confidence: 5, projects: ["Invicta Kent", "Orgyen Ling", "Achieve Treks"], favoriteFeature: "App Router & Server Components", funFact: "I've been using Next.js since v12 — watched the Pages-to-App Router transition live.", microAnim: "pulse" },
      { slug: "react", name: "React", simpleIconSlug: "react", experience: "5 years", yearsUsed: 5, confidence: 5, projects: ["All projects"], favoriteFeature: "Composition model & hooks", funFact: "React hooks clicked for me when I built a custom useForm — never looked back.", microAnim: "spin" },
      { slug: "typescript", name: "TypeScript", simpleIconSlug: "typescript", experience: "4 years", yearsUsed: 4, confidence: 5, projects: ["Everything since 2022"], favoriteFeature: "Discriminated unions & type narrowing", funFact: "I once typed an entire API layer before writing a single route handler.", microAnim: undefined },
      { slug: "tailwind", name: "Tailwind CSS", simpleIconSlug: "tailwindcss", experience: "4 years", yearsUsed: 4, confidence: 5, projects: ["All frontend work"], favoriteFeature: "Design system via config + cn() utility", funFact: "I wrote a Tailwind plugin for comic panel borders before they were cool.", microAnim: undefined },
      { slug: "shadcn", name: "Shadcn/ui", simpleIconSlug: "shadcnui", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["Orgyen Ling", "Portfolio"], favoriteFeature: "Copy-paste components you own", funFact: "I maintain a private collection of custom shadcn-style components.", microAnim: undefined },
      { slug: "radix", name: "Radix UI", simpleIconSlug: "radixui", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["Orgyen Ling", "Portfolio"], favoriteFeature: "Headless primitives with full a11y", funFact: "Radix's Dialog primitives saved me 40+ hours of a11y debugging.", microAnim: undefined },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    label: "BACKEND",
    color: "#7c3aed",
    bgColor: "rgba(124, 58, 237, 0.04)",
    borderColor: "rgba(124, 58, 237, 0.25)",
    accentColor: "#7c3aed",
    description: "Building systems that scale",
    tools: [
      { slug: "nodejs", name: "Node.js", simpleIconSlug: "nodedotjs", experience: "5 years", yearsUsed: 5, confidence: 5, projects: ["Invicta Kent", "Ottr Technology"], favoriteFeature: "Stream API & event-driven architecture", funFact: "I built a real-time sync engine using Node.js streams — zero buffering.", microAnim: undefined },
      { slug: "nestjs", name: "NestJS", simpleIconSlug: "nestjs", experience: "3 years", yearsUsed: 3, confidence: 4, projects: ["Invicta Kent", "Ottr Technology"], favoriteFeature: "Modular architecture + decorators", funFact: "NestJS's dependency injection made me actually enjoy writing backend code.", microAnim: undefined },
      { slug: "express", name: "Express", simpleIconSlug: "express", experience: "4 years", yearsUsed: 4, confidence: 5, projects: ["Multiple freelance projects"], favoriteFeature: "Middleware pipeline simplicity", funFact: "Express was my first backend framework — still reach for it for quick APIs.", microAnim: undefined },
      { slug: "socketio", name: "Socket.IO", simpleIconSlug: "socketdotio", experience: "3 years", yearsUsed: 3, confidence: 4, projects: ["Ottr Technology", "Real-time dashboards"], favoriteFeature: "Auto-reconnect & fallback transport", funFact: "I debugged a WebSocket memory leak for 3 days — learned more than any tutorial taught.", microAnim: undefined },
      { slug: "prisma", name: "Prisma", simpleIconSlug: "prisma", experience: "3 years", yearsUsed: 3, confidence: 4, projects: ["Invicta Kent", "Achieve Treks"], favoriteFeature: "Type-safe queries with auto-complete", funFact: "Prisma saved me from writing 200+ lines of raw SQL per model.", microAnim: undefined },
    ],
  },
  {
    id: "database",
    name: "Database",
    label: "DATABASE",
    color: "#2d9b4e",
    bgColor: "rgba(45, 155, 78, 0.04)",
    borderColor: "rgba(45, 155, 78, 0.25)",
    accentColor: "#2d9b4e",
    description: "Where the data lives",
    tools: [
      { slug: "postgresql", name: "PostgreSQL", simpleIconSlug: "postgresql", experience: "4 years", yearsUsed: 4, confidence: 5, projects: ["Invicta Kent", "Orgyen Ling"], favoriteFeature: "Window functions & CTEs", funFact: "I once optimized a query from 12s to 40ms using a partial index.", microAnim: undefined },
      { slug: "redis", name: "Redis", simpleIconSlug: "redis", experience: "3 years", yearsUsed: 3, confidence: 4, projects: ["Invicta Kent", "Caching layers"], favoriteFeature: "Pub/Sub + caching in one tool", funFact: "I use Redis for session storage, rate limiting, and job queues — one instance, three concerns.", microAnim: undefined },
      { slug: "mongodb", name: "MongoDB", simpleIconSlug: "mongodb", experience: "3 years", yearsUsed: 3, confidence: 4, projects: ["Achieve Treks", "Freelance"], favoriteFeature: "Flexible schema for rapid prototyping", funFact: "MongoDB's aggregation pipeline is my secret weapon for analytics dashboards.", microAnim: undefined },
      { slug: "sqlite", name: "SQLite", simpleIconSlug: "sqlite", experience: "2 years", yearsUsed: 2, confidence: 3, projects: ["Side projects", "Prototypes"], favoriteFeature: "Zero-config, single file", funFact: "I ship SQLite in desktop apps for offline-first data persistence.", microAnim: undefined },
      { slug: "supabase", name: "Supabase", simpleIconSlug: "supabase", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["Orgyen Ling", "Rapid prototypes"], favoriteFeature: "Real-time subscriptions + auth", funFact: "Supabase's row-level security replaced my entire auth middleware once.", microAnim: undefined },
    ],
  },
  {
    id: "devops",
    name: "DevOps & Cloud",
    label: "DEVOPS",
    color: "#06b6d4",
    bgColor: "rgba(6, 182, 212, 0.04)",
    borderColor: "rgba(6, 182, 212, 0.25)",
    accentColor: "#06b6d4",
    description: "Deploy, scale, repeat",
    tools: [
      { slug: "docker", name: "Docker", simpleIconSlug: "docker", experience: "3 years", yearsUsed: 3, confidence: 4, projects: ["Invicta Kent", "Ottr Technology"], favoriteFeature: "Multi-stage builds", funFact: "I containerized a legacy PHP app in 2024 — it worked on the first deploy.", microAnim: "float" },
      { slug: "linux", name: "Linux", simpleIconSlug: "linux", experience: "5 years", yearsUsed: 5, confidence: 4, projects: ["All server-side work"], favoriteFeature: "tmux + neovim workflow", funFact: "I use Arch (btw) — but honestly, I just love the package manager.", microAnim: undefined },
      { slug: "vercel", name: "Vercel", simpleIconSlug: "vercel", experience: "3 years", yearsUsed: 3, confidence: 5, projects: ["Orgyen Ling", "Portfolio", "Achieve Treks"], favoriteFeature: "Edge functions + automatic HTTPS", funFact: "I deploy preview URLs for every branch — best code review experience.", microAnim: undefined },
      { slug: "cloudflare", name: "Cloudflare", simpleIconSlug: "cloudflare", experience: "2 years", yearsUsed: 2, confidence: 3, projects: ["Orgyen Ling", "DNS & CDN"], favoriteFeature: "Workers + D1 for backendless APIs", funFact: "I migrated a whole site to Cloudflare Pages in an afternoon — no downtime.", microAnim: undefined },
      { slug: "aws", name: "AWS", simpleIconSlug: "amazonwebservices", experience: "3 years", yearsUsed: 3, confidence: 3, projects: ["Invicta Kent", "S3 storage"], favoriteFeature: "S3 + CloudFront for static assets", funFact: "I still triple-check IAM policies before every deploy — Jeff Bezos won't get my servers.", microAnim: undefined },
    ],
  },
  {
    id: "ai",
    name: "AI & LLM",
    label: "A.I.",
    color: "#d946ef",
    bgColor: "rgba(217, 70, 239, 0.04)",
    borderColor: "rgba(217, 70, 239, 0.25)",
    accentColor: "#d946ef",
    description: "The augmented developer",
    tools: [
      { slug: "openai", name: "OpenAI", simpleIconSlug: "openai", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["AI chat features", "Content generation"], favoriteFeature: "Function calling + structured output", funFact: "I built a GPT wrapper that generates commit messages — team adoption rate: 100%.", microAnim: "glow" },
      { slug: "claude", name: "Anthropic Claude", simpleIconSlug: "anthropic", experience: "1 year", yearsUsed: 1, confidence: 4, projects: ["This portfolio", "Code generation"], favoriteFeature: "Long context window (100K+ tokens)", funFact: "Claude helped me design this very component — meta, right?", microAnim: undefined },
      { slug: "langchain", name: "LangChain", simpleIconSlug: "langchain", experience: "1 year", yearsUsed: 1, confidence: 3, projects: ["RAG pipelines", "Research"], favoriteFeature: "Chain-of-thought prompting framework", funFact: "I built a RAG chatbot that answers questions from our internal docs.", microAnim: undefined },
      { slug: "n8n", name: "n8n", simpleIconSlug: "n8n", experience: "1 year", yearsUsed: 1, confidence: 3, projects: ["Automation workflows", "Ottr Technology"], favoriteFeature: "Visual workflow builder with code nodes", funFact: "I automated our entire deployment pipeline with 3 n8n nodes.", microAnim: undefined },
      { slug: "huggingface", name: "Hugging Face", simpleIconSlug: "huggingface", experience: "1 year", yearsUsed: 1, confidence: 2, projects: ["Experiments", "Fine-tuning"], favoriteFeature: "Model hub + inference API", funFact: "I fine-tuned a sentiment model on 5,000 support tickets — accuracy: 87%.", microAnim: undefined },
    ],
  },
  {
    id: "animation",
    name: "Animation",
    label: "MOTION",
    color: "#f4a261",
    bgColor: "rgba(244, 162, 97, 0.04)",
    borderColor: "rgba(244, 162, 97, 0.25)",
    accentColor: "#f4a261",
    description: "Making pixels dance",
    tools: [
      { slug: "framer", name: "Framer Motion", simpleIconSlug: "framer", experience: "3 years", yearsUsed: 3, confidence: 5, projects: ["Orgyen Ling", "This portfolio"], favoriteFeature: "useScroll + useTransform for scroll-driven animation", funFact: "I've written more motion variants than React components this year.", microAnim: "wobble" },
      { slug: "gsap", name: "GSAP", simpleIconSlug: "greensock", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["Landing pages", "Marketing sites"], favoriteFeature: "Timeline + easing visualizer", funFact: "GSAP's SplitText plugin is my secret weapon for text animations.", microAnim: "stretch" },
      { slug: "threejs", name: "Three.js", simpleIconSlug: "threedotjs", experience: "2 years", yearsUsed: 2, confidence: 3, projects: ["Creative experiments", "Portfolio"], favoriteFeature: "Custom shaders with GLSL", funFact: "I spent a weekend building a WebGL particle system — then scrapped it for Framer Motion.", microAnim: undefined },
      { slug: "lenis", name: "Lenis", simpleIconSlug: "lenis", experience: "1 year", yearsUsed: 1, confidence: 4, projects: ["This portfolio", "Landing pages"], favoriteFeature: "Smooth scroll with virtual scroll", funFact: "Lenis replaced three different scroll libraries in my stack.", microAnim: undefined },
      { slug: "animejs", name: "Anime.js", simpleIconSlug: "animejs", experience: "1 year", yearsUsed: 1, confidence: 3, projects: ["Experimental", "Animations"], favoriteFeature: "Timeline-based sequencing", funFact: "Anime.js is my goto for SVG morphing animations.", microAnim: undefined },
    ],
  },
  {
    id: "apis",
    name: "APIs",
    label: "APIS",
    color: "#0d9488",
    bgColor: "rgba(13, 148, 136, 0.04)",
    borderColor: "rgba(13, 148, 136, 0.25)",
    accentColor: "#0d9488",
    description: "Connecting the dots",
    tools: [
      { slug: "rest", name: "REST APIs", simpleIconSlug: "rest", experience: "5 years", yearsUsed: 5, confidence: 5, projects: ["Invicta Kent", "All backends"], favoriteFeature: "Stateless design + caching headers", funFact: "I designed an API that served 1M+ requests/day on a single $5 VPS.", microAnim: undefined },
      { slug: "websocket", name: "WebSocket", simpleIconSlug: "websocket", experience: "3 years", yearsUsed: 3, confidence: 4, projects: ["Ottr Technology", "Real-time features"], favoriteFeature: "Full-duplex persistent connection", funFact: "I built a collaborative whiteboard using WebSockets — latency under 50ms.", microAnim: undefined },
      { slug: "stripe", name: "Stripe", simpleIconSlug: "stripe", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["Invicta Kent", "Payment integration"], favoriteFeature: "Webhook event system + idempotency", funFact: "I've read Stripe's API docs cover-to-cover — twice.", microAnim: undefined },
      { slug: "trpc", name: "tRPC", simpleIconSlug: "trpc", experience: "1 year", yearsUsed: 1, confidence: 3, projects: ["Orgyen Ling", "Side projects"], favoriteFeature: "End-to-end type safety without codegen", funFact: "tRPC made me question why I ever wrote REST endpoints manually.", microAnim: undefined },
    ],
  },
]
