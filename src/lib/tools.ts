export type Tool = {
  slug: string
  name: string
  simpleIconSlug: string
  localIcon?: string
  experience: string
  yearsUsed: number
  confidence: number
  projects: string[]
  favoriteFeature: string
  funFact: string
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
      { slug: "nextjs", name: "Next.js", simpleIconSlug: "nextdotjs", experience: "4 years", yearsUsed: 4, confidence: 5, projects: ["Invicta Kent", "Orgyen Ling", "Achieve Treks"], favoriteFeature: "App Router & Server Components", funFact: "I've been using Next.js since v12 — watched the Pages-to-App Router transition live." },
      { slug: "react", name: "React", simpleIconSlug: "react", experience: "5 years", yearsUsed: 5, confidence: 5, projects: ["All projects"], favoriteFeature: "Composition model & hooks", funFact: "React hooks clicked for me when I built a custom useForm — never looked back." },
      { slug: "typescript", name: "TypeScript", simpleIconSlug: "typescript", experience: "4 years", yearsUsed: 4, confidence: 5, projects: ["Everything since 2022"], favoriteFeature: "Discriminated unions & type narrowing", funFact: "I once typed an entire API layer before writing a single route handler." },
      { slug: "tailwind", name: "Tailwind CSS", simpleIconSlug: "tailwindcss", experience: "4 years", yearsUsed: 4, confidence: 5, projects: ["All frontend work"], favoriteFeature: "Design system via config + cn() utility", funFact: "I wrote a Tailwind plugin for comic panel borders before they were cool." },
      { slug: "shadcn", name: "Shadcn/ui", simpleIconSlug: "shadcnui", experience: "4 years", yearsUsed: 4, confidence: 4, projects: ["Orgyen Ling", "Portfolio"], favoriteFeature: "Copy-paste components you own", funFact: "I maintain a private collection of custom shadcn-style components." },
      { slug: "radix", name: "Radix UI", simpleIconSlug: "radixui", experience: "4 years", yearsUsed: 4, confidence: 4, projects: ["Orgyen Ling", "Portfolio"], favoriteFeature: "Headless primitives with full a11y", funFact: "Radix's Dialog primitives saved me 40+ hours of a11y debugging." },
      { slug: "mantine", name: "Mantine UI", simpleIconSlug: "mantine", experience: "4 years", yearsUsed: 4, confidence: 4, projects: ["Dashboard UIs", "Admin panels"], favoriteFeature: "Component library with hooks", funFact: "Mantine's useForm is the most intuitive form library I've used." },
      { slug: "sass", name: "Sass", simpleIconSlug: "sass", experience: "4 years", yearsUsed: 4, confidence: 5, projects: ["All frontend work"], favoriteFeature: "Mixins, nesting & variables", funFact: "I switched from vanilla CSS to Sass in 2020 and never looked back." },
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
      { slug: "nodejs", name: "Node.js", simpleIconSlug: "nodedotjs", experience: "3 years", yearsUsed: 3, confidence: 5, projects: ["Invicta Kent", "Ottr Technology"], favoriteFeature: "Stream API & event-driven architecture", funFact: "I built a real-time sync engine using Node.js streams — zero buffering." },
      { slug: "nestjs", name: "NestJS", simpleIconSlug: "nestjs", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["Invicta Kent", "Ottr Technology"], favoriteFeature: "Modular architecture + decorators", funFact: "NestJS's dependency injection made me actually enjoy writing backend code." },
      { slug: "express", name: "Express", simpleIconSlug: "express", experience: "3 years", yearsUsed: 3, confidence: 5, projects: ["Multiple freelance projects"], favoriteFeature: "Middleware pipeline simplicity", funFact: "Express was my first backend framework — still reach for it for quick APIs." },
      { slug: "socketio", name: "Socket.IO", simpleIconSlug: "socketdotio", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["Ottr Technology", "Real-time dashboards"], favoriteFeature: "Auto-reconnect & fallback transport", funFact: "I debugged a WebSocket memory leak for 3 days — learned more than any tutorial taught." },
      { slug: "prisma", name: "Prisma", simpleIconSlug: "prisma", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["Invicta Kent", "Achieve Treks"], favoriteFeature: "Type-safe queries with auto-complete", funFact: "Prisma saved me from writing 200+ lines of raw SQL per model." },
      { slug: "koa", name: "Koa.js", simpleIconSlug: "koajs", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["FYP Pet Haven", "API gateways"], favoriteFeature: "Async middleware pattern", funFact: "Koa's ctx pattern made Express feel ancient overnight." },
      { slug: "strapi", name: "Strapi", simpleIconSlug: "strapi", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["Achieve Treks", "CMS backends"], favoriteFeature: "Headless CMS with plugins", funFact: "Strapi's content type builder saved me weeks of boilerplate." },
      { slug: "sanity", name: "Sanity CMS", simpleIconSlug: "sanity", experience: "2 years", yearsUsed: 2, confidence: 3, projects: ["Content platforms", "Blogs"], favoriteFeature: "GROQ queries + real-time collaboration", funFact: "Sanity's portable text is the best rich text format I've worked with." },
      { slug: "python", name: "Python", simpleIconSlug: "python", experience: "1 year", yearsUsed: 1, confidence: 3, projects: ["Automation scripts", "Data tooling"], favoriteFeature: "Readable syntax + the standard library", funFact: "I reach for Python whenever a task is faster to script than to click through." },
      { slug: "fastapi", name: "FastAPI", simpleIconSlug: "fastapi", experience: "1 year", yearsUsed: 1, confidence: 3, projects: ["Internal APIs"], favoriteFeature: "Type hints that generate OpenAPI docs for free", funFact: "The auto-generated /docs page has saved me from writing a spec more than once." },
    ],
  },
  {
    id: "animation",
    name: "Animation",
    label: "ANIMATION",
    color: "#f4a261",
    bgColor: "rgba(244, 162, 97, 0.04)",
    borderColor: "rgba(244, 162, 97, 0.25)",
    accentColor: "#f4a261",
    description: "Making pixels dance",
    tools: [
      { slug: "framer", name: "Framer Motion", simpleIconSlug: "framer", experience: "3 years", yearsUsed: 3, confidence: 5, projects: ["Orgyen Ling", "This portfolio"], favoriteFeature: "useScroll + useTransform for scroll-driven animation", funFact: "I've written more motion variants than React components this year." },
      { slug: "gsap", name: "GSAP", simpleIconSlug: "greensock", experience: "3 years", yearsUsed: 3, confidence: 4, projects: ["Landing pages", "Marketing sites"], favoriteFeature: "Timeline + easing visualizer", funFact: "GSAP's SplitText plugin is my secret weapon for text animations." },
      { slug: "threejs", name: "Three.js", simpleIconSlug: "threedotjs", experience: "2 years", yearsUsed: 2, confidence: 3, projects: ["Creative experiments", "Portfolio"], favoriteFeature: "Custom shaders with GLSL", funFact: "I spent a weekend building a WebGL particle system — then scrapped it for Framer Motion." },
      { slug: "lenis", name: "Lenis", simpleIconSlug: "xxxx", localIcon: "lenis", experience: "3 years", yearsUsed: 3, confidence: 4, projects: ["This portfolio", "Landing pages"], favoriteFeature: "Smooth scroll with virtual scroll", funFact: "Lenis replaced three different scroll libraries in my stack." },
      { slug: "animejs", name: "Anime.js", simpleIconSlug: "animedotjs", experience: "2 years", yearsUsed: 2, confidence: 3, projects: ["Experimental", "Animations"], favoriteFeature: "Timeline-based sequencing", funFact: "Anime.js is my goto for SVG morphing animations." },
    ],
  },
  {
    id: "system",
    name: "System",
    label: "SYSTEM",
    color: "#06b6d4",
    bgColor: "rgba(6, 182, 212, 0.04)",
    borderColor: "rgba(6, 182, 212, 0.25)",
    accentColor: "#06b6d4",
    description: "Deploy, scale, repeat",
    tools: [
      { slug: "docker", name: "Docker", simpleIconSlug: "docker", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["Invicta Kent", "Ottr Technology"], favoriteFeature: "Multi-stage builds", funFact: "I containerized a legacy PHP app in 2024 — it worked on the first deploy." },
      { slug: "linux", name: "Linux", simpleIconSlug: "linux", experience: "5 years", yearsUsed: 5, confidence: 4, projects: ["All server-side work"], favoriteFeature: "tmux + neovim workflow", funFact: "I use Arch (btw) — but honestly, I just love the package manager." },
      { slug: "vercel", name: "Vercel", simpleIconSlug: "vercel", experience: "3 years", yearsUsed: 3, confidence: 5, projects: ["Orgyen Ling", "Portfolio", "Achieve Treks"], favoriteFeature: "Edge functions + automatic HTTPS", funFact: "I deploy preview URLs for every branch — best code review experience." },
      { slug: "cloudflare", name: "Cloudflare", simpleIconSlug: "cloudflare", experience: "2 years", yearsUsed: 2, confidence: 3, projects: ["Orgyen Ling", "DNS & CDN"], favoriteFeature: "Workers + D1 for backendless APIs", funFact: "I migrated a whole site to Cloudflare Pages in an afternoon — no downtime." },
      { slug: "aws", name: "AWS", simpleIconSlug: "amazonwebservices", experience: "2 years", yearsUsed: 2, confidence: 3, projects: ["Invicta Kent", "S3 storage"], favoriteFeature: "S3 + CloudFront for static assets", funFact: "I still triple-check IAM policies before every deploy — Jeff Bezos won't get my servers." },
      { slug: "cicd", name: "CI/CD", simpleIconSlug: "githubactions", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["Invicta Kent", "Ottr Technology"], favoriteFeature: "Automated testing & deployment pipelines", funFact: "I once debugged a CI pipeline failure caused by a trailing comma." },
      { slug: "vps", name: "VPS", simpleIconSlug: "xxxx", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["All deployed projects"], favoriteFeature: "Full root access + custom server setup", funFact: "I manually configured Nginx + PM2 on a VPS before Docker existed in my workflow." },
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
      { slug: "openai", name: "OpenAI", simpleIconSlug: "openai", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["AI chat features", "Content generation"], favoriteFeature: "Function calling + structured output", funFact: "I built a GPT wrapper that generates commit messages — team adoption rate: 100%." },
      { slug: "claude", name: "Anthropic Claude", simpleIconSlug: "anthropic", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["This portfolio", "Code generation"], favoriteFeature: "Long context window (100K+ tokens)", funFact: "Claude helped me design this very component — meta, right?" },
      { slug: "n8n", name: "n8n", simpleIconSlug: "n8n", experience: "1 year", yearsUsed: 1, confidence: 3, projects: ["Automation workflows", "Ottr Technology"], favoriteFeature: "Visual workflow builder with code nodes", funFact: "I automated our entire deployment pipeline with 3 n8n nodes." },
      { slug: "vibecoding", name: "Vibe Coding", simpleIconSlug: "xxxx", localIcon: "vibecoding", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["Rapid prototypes", "Experiments"], favoriteFeature: "AI-assisted iterative development", funFact: "Vibe coding turned my weekend ideas into shipped products." },
      { slug: "agenticdev", name: "Agentic Dev", simpleIconSlug: "xxxx", experience: "1 year", yearsUsed: 1, confidence: 4, projects: ["Code generation", "Tooling"], favoriteFeature: "Autonomous task decomposition & execution", funFact: "I let an AI agent refactor a 500-line function — it worked on the first try." },
      { slug: "prompts", name: "Prompts Engineering", simpleIconSlug: "xxxx", experience: "2 years", yearsUsed: 2, confidence: 4, projects: ["Content generation", "Chat features"], favoriteFeature: "Chain-of-thought & few-shot prompting", funFact: "I wrote a prompt that writes other prompts — prompt-ception." },
    ],
  },

]