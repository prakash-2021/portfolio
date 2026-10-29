# Portfolio audit (Phase 1)

Date: 27 Oct 2026 · Repo: `main` @ `273d449` · Live: https://prakashshrestha7.com.np/

The live site is served by Netlify behind Cloudflare. The edge cache for `/` reported
`age: 5564909` (about 64 days), so the live build may be older than `main`. Where the repo and
the live site disagree, both are noted.

**Method**
- Lighthouse 12.x CLI on Brave (Chromium) headless. Default mobile preset (simulated slow 4G,
  4× CPU throttle) and desktop preset, 2 runs each, run from Kathmandu.
- Bundle sizes come from a local `next build` (Next 16.2.12, Turbopack). Each figure is
  `gzip -9` of every script that the prerendered HTML references.
- Raw Lighthouse JSON is kept outside the repo. Re-run with
  `CHROME_PATH=/opt/brave.com/brave/brave npx lighthouse <url>`.

---

## 1. Baseline: Lighthouse and Core Web Vitals ("before")

| Run | Perf | A11y | Best Pr. | SEO | FCP | LCP | TBT | CLS | Speed Index |
|---|---|---|---|---|---|---|---|---|---|
| Mobile #1 | **90** | 96 | 93 | 92 | 1.7 s | **3.1 s** | 120 ms | 0 | 4.0 s |
| Mobile #2 | **74** | 96 | 93 | 92 | 2.4 s | **5.8 s** | 100 ms | 0 | 4.0 s |
| Desktop #1 | 94 | 96 | 96 | 92 | 0.6 s | 1.1 s | 0 ms | 0 | 1.9 s |
| Desktop #2 | 94 | 96 | 96 | 92 | 0.6 s | 1.2 s | 0 ms | 0.006 | 1.9 s |

- **INP:** a navigation run can't measure INP. Lab proxies: TBT is 100–120 ms on mobile, and
  max potential FID is 160 ms. Field data (CrUX) was not checked; a site with this little
  traffic usually has none.
- **Page weight (mobile):** 4.1 MB. 3.8 MB of that is three PNG screenshots loaded as CSS
  `background-image`, so they skip `next/image`, AVIF/WebP and lazy loading:
  `invictakent.png` 2.0 MB, `achievetrek.png` 959 KB, `cutsandcoffee.png` 788 KB.
- **Initial JS (home):** 24 scripts, **286 KB gzipped** (936 KB raw). Lighthouse saw 265 KB
  transferred. Mobile main-thread work is 5.7 s, JS boot-up 1.6 s, unused JS 43 KB.
- **Framework floor:** an empty Next 16 + React 19 App Router page ships **~142 KB gzipped**
  (5 scripts; the 39 KB `noModule` polyfill is excluded because modern browsers skip it).
  The site's own code therefore adds about 144 KB on top.
- **CSS:** 11 stylesheets, ~24 KB gzipped, all render-blocking.
- **DOM:** 1,212 elements.
- **LCP element (mobile):** the decorative "CASE FILE" watermark. 79% of LCP (2.46 s) is
  *render delay*. The prerendered HTML contains **199 inline `opacity:0` styles**, so content
  only appears after framer-motion hydrates. A headless 390 px screenshot taken before
  hydration is completely blank.
- **Desktop loading screen:** a 2.6 s full-screen intro (`ComicLoading`) plays before any
  content on non-touch devices.

**Failing audits (mobile)**
- *Performance:* LCP, speed index, image delivery (3.4 MB est. savings), render-blocking CSS,
  Cloudflare `email-decode.min.js` (render-blocking), legacy JS, unused JS, server response
  time (630 ms), DOM size, bootup time, main-thread work, forced reflow.
- *Accessibility:* `color-contrast` (Manifesto measurement labels, mugshot labels) and
  `label-content-name-mismatch` (nav buttons, edition switch).
- *Best practices:* `font-size` (only 58% of text is legible on mobile) and
  `errors-in-console` (404s from `cdn.simpleicons.org/xxxx` icon URLs).
- *SEO:* `robots-txt` is invalid. Cloudflare's managed robots.txt, with "Content-Signal"
  lines, replaces the site's own.

### Client-site claims checked today (Lighthouse performance, 1 run each)

| Site | Claimed | Mobile today | Desktop today |
|---|---|---|---|
| invictakentmanagement.co.uk | 100 | 95 (LCP 1.9 s) | 96 |
| achievetreks.com | – | 50 (LCP 30.9 s) | 38 |
| cutsandcoffee.com.np | 90 | 74 | 85 |
| ogl.world | – (site says "95+") | 62 | 78 |
| biskajatra.com | 93 | 69 | 81 |

These are single runs from Nepal, so scores will vary. Still, a recruiter who runs
PageSpeed Insights will not see "100" on Invicta Kent today. The claim needs a date or
context ("at launch"), or a saved report to link to (see PLAN.md, decision 3).

---

## 2. Stack, structure and dependencies

| Area | Current state |
|---|---|
| Framework | Next 16.2.12 App Router, React 19.2.4, TypeScript `strict: true` |
| Styling | Tailwind v4 **and** 20+ Sass modules (`@import` is deprecated in Dart Sass 3, warning on build) |
| Motion | framer-motion 12 (`LazyMotion`), Lenis smooth scroll, custom cursor |
| Rendering | Root layout wraps everything in a `"use client"` tree (`layout-client.tsx`); the home page is one client component (`home-content.tsx`). Almost nothing is a Server Component. |
| Project pages | `/projects/[slug]` is a client component with no `generateStaticParams`, so it is **rendered on demand** (`ƒ`), not static, and can't export metadata |
| Contact | `/api/contact` sends mail via nodemailer/SMTP, with no rate limiting or bot protection |
| Hosting | Netlify (Next runtime) behind Cloudflare (Email Obfuscation, Web Analytics beacon, managed robots.txt all on) |

**Outdated, unused or risky**
- **`server/node_modules` is committed:** 5,250+ files, 142 MB on disk, Windows `esbuild.exe`
  binaries, and no server source code.
- Two lockfiles (`package-lock.json` and `pnpm-lock.yaml`); pnpm is the one in use.
- Unused dev deps: `concurrently` (no script uses it) and `autoprefixer` (Tailwind v4
  doesn't need it).
- `eslint-config-next` is 16.2.1 while `next` is 16.2.12; `@types/node` is ^20 while the
  runtime is Node 24.
- **`images.remotePatterns: [{ hostname: "**" }]`** turns the image optimiser into an open
  proxy for any host (abuse and bandwidth cost). Nothing uses remote images.
- Unreferenced public assets (~0.75 MB): `/logos/*` (712 KB), `/company/*`, `favicon.png`,
  `icons/amazonwebservices.svg`, `icons/openai.svg`. The favicon is duplicated in
  `src/app/favicon.ico` and `public/favicon.ico`.
- Dozens of skill icons load from the third-party `cdn.simpleicons.org`, and some slugs are
  the placeholder `xxxx`, which 404s.
- The resume path has spaces: `/Prakash%20Shrestha%20CV.pdf`.
- The README is unedited `create-next-app` boilerplate.

---

## 3. Content: outdated, missing or inconsistent with the fact sheet

### Contradicts the facts
| Where | Site says | Fact sheet |
|---|---|---|
| `lib/experience.ts` | "Mid Full Stack Developer", "Dobaato", **Jun** 2026 – Present | Full Stack Engineer, **Dobaato Info Tech**, **May** 2026 – Present |
| `lib/academic.ts` | BSc (Hons) **Information Technology**, Herald College | BSc (Hons) **Computer Science**, Univ. of Wolverhampton, 2023–2025, completed while working full time |
| Manifesto stat bars | Frontend 95%, Backend 85% | "Equally strong on frontend and backend" |
| Hero | "COORD 28.58°N 77.33°E" | That is Delhi NCR; Kathmandu is 27.71°N 85.32°E (the contact section already uses this) |
| `lib/tools.ts` | React "5 years", Linux "5 years" | 4+ years of experience in total |
| Invicta Kent | Express, Vercel, AWS RDS | Next.js + Strapi + PostgreSQL, Docker, CI/CD, own server setup |

### Claims not in the fact sheet (invented or unverifiable; all to be removed)
- **Achieve Treks:** "300% increase in organic traffic within 3 months", English/Japanese/
  Korean, "interactive itinerary builder", Redis, Vercel.
- **Invicta Kent:** "UK property firm", tenants/landlords, "automated rent collection with
  payment gateway", "migrated from spreadsheets within 2 weeks", "zero-downtime deployments".
- **Cuts and Coffee:** React Three Fiber, "dynamic LOD", "customers booking appointments
  because of the website".
- **Orgyen Ling:** "Lighthouse 95+ … 60fps" (measured today: 62 mobile), "increased
  engagement".
- **Biskajatra:** "increased online ticket sales", "countdown timers".
- **Serang School, FYP Pet Haven, Meatmandu:** not in the fact sheet at all. Serang also
  claims "12 s → under 2 s on 3G" and "WCAG 2.1 AA compliance".
- **Experience:**
  - Dobaato: "auth flows and payment gateways".
  - Ottr: "16+ projects with 90+ Lighthouse scores", "3 time zones daily", "first NestJS app
    still running".
  - Astergaze: "SaaS platform", "animation system is still their selling point".
- **Education:** "Topper of entrance examination", "ranked topper in selected semesters".
- **Tools:** Shadcn, Radix, Mantine, Sanity, Koa, Anime.js, Cloudflare, Vercel, "Vibe
  Coding", "Prompts Engineering", plus jokes ("I use Arch (btw)", "Jeff Bezos won't get my
  servers").
- **Self-praise:** "EDITOR'S NOTE: This is the kind of engineer you want on your team."

### Missing
- One plain sentence about what you do, the headline stack, and a visible email address.
- 25+ applications, clients in Nepal **and** the UK, "4+ years" stated plainly.
- The whole current Dobaato role:
  - lead backend on 4 client projects, plus their Next.js frontends
  - OSHC, Expert PTE and CNI Swadeshi
  - Prisma schema of 24+ tables, BullMQ, Redis, AWS/Docker/Nginx/GitHub Actions
  - PR reviews for 3 developers, AI/LLM integrations
- Leadership: mentoring at Astergaze, PR reviews at Dobaato.
- Skills from the fact sheet: React Query, Zustand, Material UI, WebSockets, BullMQ, Redis,
  MySQL, MongoDB, TypeORM, PM2, Nginx, Directus, MCP.

### Buzzwords and vague copy
- Meta description: "Design-driven full stack engineer. **Crafting** scalable interfaces…".
- "Building products that people love", "Make pixels dance", trait chips ("Animation
  nerd", "UX obsessive").

---

## 4. Design: first-glance weaknesses

1. **The metaphor talks over the content.** The comic / "case file" theme puts jargon and
   props between the visitor and the facts:
   - labels: "Issue #001", "CLASSIFIED", "CONFIDENTIAL", "Mission brief", "Agent",
     "Transmit message", "1440 BC"
   - nav items: "Origin", "Archive", "Missions"
   - props: mascot, mugshot
2. **No hierarchy in the first viewport.** The name is huge, but below it sit a role badge,
   5 equal-weight chips and 3 equal-weight CTAs. There is no sentence, no proof and no email.
3. **Too many decorative layers at once:** watermark text, crop marks, registration marks,
   halftones, speed lines, mascot, mugshot, coordinate labels, scroll bar, side nav spine,
   custom cursor and an "edition" switch.
4. **Six accent colours** (red, blue, purple, orange, cyan, magenta), one per section, so
   nothing reads as *the* accent.
5. **Typography:** Geist (the `create-next-app` default), and many labels at 0.4–0.65 rem.
   Lighthouse finds 42% of mobile text below legible size.
6. **Forbidden patterns already present:** skill percentage bars (Manifesto) and confidence
   bars (Toolkit).
7. **Screenshot cards** for projects, with no problem → build → result story.
8. A **2.6 s intro screen** on desktop delays the first real impression.

---

## 5. SEO

| Item | State |
|---|---|
| Title | "Prakash Shrestha · Issue #001" has no role keyword. Project pages can't set their own title (client component). |
| Description | Present, but buzzword-heavy; the same on every page |
| Canonical / `metadataBase` | Missing |
| Open Graph / Twitter | Title and description only; **no `og:image`**, no `og:url` |
| Structured data | None (no JSON-LD) |
| `sitemap.xml` | **404** |
| `robots.txt` | Cloudflare-managed "Content-Signal" file; **fails Lighthouse validation** |
| Headings | Two `h1`s on home (loader + hero); the surname is an `h2` |
| Project pages | Not statically generated; no unique metadata |
| 404 page | Default Next.js page |

---

## 6. Accessibility

- **Contrast:** fails on Manifesto measurement labels/values, the mugshot ID/status, and
  several 0.4–0.6 rem labels.
- **Keyboard:**
  - The desktop nav spine uses `div role="button"`.
  - `outline: none` appears 5 times. The contact form inputs and the projects search/filter
    have no `:focus-visible` replacement.
  - There is no skip-to-content link.
- **Accessible names:** visible labels don't match `aria-label` on nav buttons and the
  edition switch.
- **Alt text:** home-page project screenshots are CSS backgrounds with no text
  alternative. The detail page uses `alt={project.title}`, which says nothing.
- **Reduced motion:** there is a `useReducedMotion` hook and one `@media` block, but:
  - Content starts at `opacity:0` and needs JS to appear.
  - Lenis smooth scroll still intercepts the wheel.
  - The custom cursor still runs.
- **Landmarks:** `main` exists, but the nav sits outside a `header`/`nav` landmark
  structure, and section headings skip levels.

---

## 7. Top 5 problems by impact on a recruiter's first impression

1. **The first screen doesn't say what you do or show proof.** There is no sentence, stack,
   proof or email; you get "Issue #001", "CLASSIFIED" and trait chips instead. On mobile the
   page is blank until JS runs, and on desktop a 2.6 s intro plays first. The 10-second test
   fails.
2. **Claims a careful reader can't trust.**
   - Invented outcome metrics ("300% organic traffic", rent-collection features).
   - Facts that contradict the CV: title, start date, degree name.
   - Lighthouse claims that today's measurements don't reproduce.

   One caught fabrication discounts every true claim next to it.
3. **Your strongest, newest work is missing, and the site reads as frontend-leaning.**
   - Missing: the Dobaato lead-backend role, OSHC / Expert PTE / CNI Swadeshi, BullMQ,
     Redis, AWS, PR reviews.
   - Frontend-leaning signals: "Frontend 95% / Backend 85%" bars, "Animation nerd", and
     animation as the main theme.
4. **Slow for a site that sells performance.**
   - Mobile Lighthouse 74–90, LCP 3.1–5.8 s.
   - 4.1 MB page, 3.8 MB of PNGs, 286 KB of JS.
   - 5.7 s of main-thread work.

   The site is evidence against the claim it makes.
5. **The theme drowns the content.**
   - The comic/case-file metaphor and jargon nav.
   - Six accent colours.
   - Forbidden skill bars.
   - Nearly half the text below legible size.

   It reads as a template experiment, not as an engineer who ships.

**Repo hygiene (not visible to recruiters, but visible to an engineering manager who opens
the GitHub repo):**
- a committed 142 MB `server/node_modules` with no server code
- two lockfiles
- a boilerplate README
- an open image-proxy config
