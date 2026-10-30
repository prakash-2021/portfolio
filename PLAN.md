# Revamp plan (Phase 2, awaiting approval)

Goal: a visitor knows in 10 seconds who you are, that you're a full stack engineer who ships
production work, and how to reach you or get your resume. The site itself has to be the
fastest and most polished thing a reviewer sees that day.

On "the data is already there": I reuse the repo's existing content (screenshots, links,
wording) wherever it matches the fact sheet, and drop anything that isn't in it (AUDIT.md §3).
The `[FILL: …]` items from your Dobaato notes become visible `[TODO: …]` placeholders.

---

## 0. Decisions I need from you

| # | Decision | My recommendation |
|---|---|---|
| 1 | **The JS budget can't be met as written.** An *empty* Next 16 + React 19 App Router page already ships ~142 KB gzipped (measured, AUDIT.md §1). "<100 KB" is only possible by leaving Next.js (e.g. Astro), which breaks the tech rules. | Keep Next.js. Budget becomes **first-party JS ≤ 20 KB gz on home, total ≤ 165 KB gz, nothing render-blocking**. The framework JS loads `async` after the server-rendered HTML, so it doesn't block LCP. Mobile ≥ 95 stays realistic. |
| 2 | **"Smooth like butter" without Lenis.** Smooth-scroll libraries hijack the wheel, add JS, hurt INP and fight reduced-motion settings. | Remove Lenis. Smoothness comes from 60 fps compositor-only animation (transform/opacity), no long tasks and native scrolling. It feels smoother on phones, which is where recruiters open links. |
| 3 | **"Lighthouse 100" in the proof strip.** Today's single run gave Invicta Kent 95 mobile / 96 desktop. | Write "Lighthouse 100 performance at launch, Invicta Kent" and add `[TODO: link a saved PageSpeed Insights report]`. Or switch to "95+ on a production client site", which I measured today. |
| 4 | **Details in the repo that aren't in the fact sheet** (Achieve Treks languages, Invicta Kent features, etc.) | Drop them all. Tell me which are true and I'll add them back. |
| 5 | **Projects not in the fact sheet:** Serang School, FYP Pet Haven, Meatmandu | Remove them and redirect their URLs. Biskajatra gets an "Also shipped" row (live link + Lighthouse 93), no case study page. |
| 6 | **Contact form + `/api/contact` (nodemailer)** | Remove. The brief asks for email/LinkedIn/GitHub/resume. This drops a serverless function, a dependency and a spam vector. |
| 7 | **Resume file** | Move the existing PDF to `/Prakash_Shrestha_Resume.pdf` and redirect the old URL. `[TODO: confirm the PDF matches the new facts: Dobaato title "Full Stack Engineer", May 2026, BSc Computer Science]` |

---

## 1. Information architecture

**Header** (sticky, 56 px, minimal):
- `Prakash Shrestha` (home link)
- Work · Building · Experience · Contact
- **Resume** button
- Theme toggle

On mobile the links sit in a native `popover` menu, with zero JS. A skip-to-content link
comes first in tab order.

### Home (`/`), in order

| # | Section | Purpose | Change vs. your outline, and why |
|---|---|---|---|
| 01 | **Hero** | Name, role + location, one plain sentence, headline stack, CTAs (View work / Download resume), email | No change |
| 02 | **Proof strip** | 4 facts with tabular numerals, shown under the hero CTAs | Placed **inside the first viewport** at 1280 × 800 and directly under the CTAs at 360 px, because the 10-second test needs the proof on screen |
| 03 | **Selected work** | 4 case-study rows (problem → frontend → backend → result → stack → live link), plus an "Also shipped" line for Biskajatra | No change in order |
| 04 | **Currently building** | OSHC, Expert PTE, CNI Swadeshi, marked *pre-launch*, around the **signature element** (§3) | The architecture diagram *is* this section's overview, so the signature has a job instead of being decoration |
| 05 | **Experience** | Compact timeline; Dobaato is the most detailed entry | **Education is folded in** as the last two rows. "First Class Honours while working full time" is proof, but doesn't need its own section. |
| 06 | **Skills** | 6 groups, plain text (Languages, Frontend, Backend, Data, Infra, CMS & AI). No icons, bars or percentages. | No change |
| 07 | **About** | 3–4 sentences | No change |
| 08 | **Contact** | Large email + copy button, LinkedIn, GitHub, resume, phone, location | No change |
| – | Footer | © year, "Built with Next.js, statically generated", source link | – |

### Other pages
- `/work`: a short index of the 4 case studies plus "Also shipped". It is the redirect
  target for `/projects`.
- `/work/[slug]`: `invicta-kent`, `achieve-treks`, `cuts-and-coffee`, `orgyen-ling`.
  Statically generated, each with its own metadata and OG image.
- `not-found`: a custom 404 with links to Work and Contact.

### Case study page template
1. Title, one-line summary, and a facts row: Role · Client (company / country) · Stack ·
   Live link.
2. **Problem**: `[TODO]` unless it's in the facts.
3. **What I built**, in three columns: Frontend / Backend / Infrastructure. Facts only.
4. **Result**: e.g. Invicta Kent "Lighthouse performance 100", Cuts and Coffee "Lighthouse
   performance 90".
5. Screenshot (`next/image`, `priority`, the only priority image on the page).
6. Previous / next case study.

What the facts give each case study today:

| Case study | Known facts | TODOs |
|---|---|---|
| Invicta Kent | Freelance, UK client; full management system; Next.js + Strapi + PostgreSQL; Docker; CI/CD; I handled server setup and deployment; Lighthouse 100 | Problem, key features, year, link to a saved report |
| Achieve Treks | Ottr; REST APIs, CMS dashboard, multi-language, technical SEO | Stack confirmation (repo says Next.js + Strapi), languages, problem, result |
| Cuts and Coffee | Ottr; Next.js, Three.js, GSAP; 3D scroll animations; Lighthouse 90 | Problem; any backend work, or say it was frontend-led |
| Orgyen Ling | Ottr; Next.js, Directus, GSAP; multi-language | Languages, problem, result |

### Draft copy (approve or edit)
- **Eyebrow:** Full Stack Engineer · Kathmandu, Nepal
- **H1:** Prakash Shrestha
- **Sentence:** "I build web applications end to end, from the PostgreSQL schema to the
  Next.js interface, and I deploy and run them in production."
- **Stack line:** React · Next.js · Node.js · NestJS · FastAPI · PostgreSQL · AWS
- **Proof strip:** `4+` years shipping production apps · `25+` client applications delivered
  · Clients in `Nepal` and the `UK` · Lighthouse `100` at launch, Invicta Kent
- **About:** "I'm a full stack engineer in Kathmandu. At Dobaato Info Tech I lead backend
  development on client projects and build the Next.js frontends on top. Before that I
  shipped 16+ client applications at Ottr Technology. I finished a First Class BSc in
  Computer Science from the University of Wolverhampton while working full time."

---

## 2. Visual direction

**Concept: an engineering spec sheet.** The page reads like a well-made technical document:
- hairline rules and a precise grid
- numbered sections (`01 — Selected work`)
- metadata rows with tabular figures
- one signal colour

It is credible and quiet, and it stands out because almost every developer portfolio is
either a gradient template or a motion showcase. The personality comes from type, rhythm and
the one interactive diagram, not from props.

### Type: one display face, one text face (both `next/font/google`, variable, Latin subset)

| Role | Face | Why |
|---|---|---|
| Display (H1, H2, numbers in the proof strip) | **Bricolage Grotesque**, 600–800 | Characterful at large sizes (ink traps, optical-size axis), so the name is memorable without effects. Less common than Space Grotesk or Geist. |
| Text (body, UI, labels) | **Inter**, 400–600 | Highly legible at 14–16 px on low-DPI Android screens. Tabular numerals (`tnum`) for dates and metrics. One variable file. The display face carries the personality, so the text face can stay neutral. |

- Scale: fluid `clamp()`. H1 is `clamp(2.75rem, 9vw, 6.5rem)`.
- Body is 17 px (desktop) / 16 px (mobile). The smallest text is 13 px, for metadata labels only.
- Fallback metrics are adjusted (`adjustFontFallback`), so swapping in the web font causes
  no layout shift.

### Colour: one accent, measured against WCAG 2.2 AA

| Token | Light | Dark | Contrast vs. background |
|---|---|---|---|
| `--bg` | `#F6F4EF` (warm paper) | `#0E0F11` | – |
| `--surface` | `#FFFFFF` | `#17181B` | – |
| `--ink` | `#141414` | `#EDEBE6` | 16.8 : 1 / 16.1 : 1 |
| `--muted` | `#5C5A55` | `#A3A19B` | 6.3 : 1 / 7.4 : 1 |
| `--rule` (hairlines, decorative) | `#DAD7CF` | `#2A2B2F` | – |
| `--rule-strong` (input/control borders) | `#8A877F` | `#6A6964` | ≥ 3 : 1 |
| **`--accent`** | **`#C2410C`** | **`#FF7A3D`** | 4.7 : 1 / 7.4 : 1 (passes as body text) |

- **Why signal orange:** it is the colour of "live" and "on air" lights, which fits
  "ships real production work". Dev portfolios are overwhelmingly blue or purple, and warm
  orange on warm paper is uncommon and memorable.
- **Where the accent appears:** links, the primary CTA, the active diagram path and
  focus rings. Nowhere else.
- **Theme:** the system preference by default. A manual toggle is stored in
  `localStorage`, and a ~300-byte inline `<head>` script applies it before first paint, so
  there is no flash.

### Layout system
- 12 columns at ≥ 1024 px, 8 at ≥ 640 px, 4 below. Content max-width 1200 px. Gutters are
  16 px on mobile, 24 on tablet, 32 on desktop.
- 4 px spacing base. Section rhythm is 96 px on desktop, 64 px on mobile.
- Structure comes from 1 px rules and whitespace, not cards and shadows.
- Every section opens with a numbered label and a full-width rule.
- Checked at 360, 768, 1280 and 1920 px. At 1920 the content stays at 1200 px and the
  rules run full-bleed, so wide screens don't look empty.

### Motion principles

1. **Content never depends on JS to be visible.** There is no server-rendered
   `opacity:0`. This alone fixes the current 2.4 s render delay.
2. **Only `transform` and `opacity`.** Durations are 150–400 ms, with one easing curve,
   `cubic-bezier(.2,.8,.2,1)`.
3. **Scroll reveals use CSS scroll-driven animations** (`animation-timeline: view()`)
   inside `@supports` and `prefers-reduced-motion: no-preference`. That costs zero JS;
   older browsers show static content.
4. **Motion points at something.**
   - Link underlines draw in on hover.
   - Work rows nudge their arrow and reveal the screenshot.
   - The diagram's request packet is the one big motion moment.
5. **Home → case study navigation uses View Transitions** (React `<ViewTransition>`), with
   the project title morphing. This is *nice to have*: I'll cut it if it adds measurable
   JS or misbehaves.
6. **No GSAP, framer-motion or Lenis.** Nothing on this page needs a timeline library; CSS
   and the Web Animations API cover it at 0 KB.
7. **Under `prefers-reduced-motion: reduce`:** all reveals, the packet animation and view
   transitions are off. State changes are instant.

---

## 3. Signature element: "Trace a request"

An interactive architecture diagram at the top of **Currently building**. It shows how the
systems you're building fit together.

It has four tabs, each lighting up a path through the nodes:
- **Page load (cache hit):** Browser → Nginx → Next.js → NestJS API → Redis → back.
- **Cache miss:** … → NestJS → PostgreSQL (Prisma) → result written to Redis → back.
- **Background job:** NestJS → BullMQ queue (Redis) → worker → email / notification /
  scheduled task. The user's request returns immediately.
- **Deploy:** GitHub Actions → Docker image → AWS EC2 / Linux VPS behind Nginx; files on S3.

**Interaction**
- A small "packet" travels along the active path.
- Clicking or tabbing to a node opens a panel: *"What I do at this layer"*, written only
  from facts. Example (PostgreSQL): "Design schemas from scratch with Prisma, including a
  24+ table system with multiple user roles, indexing and migrations."
- Project chips (**OSHC · Expert PTE · CNI Swadeshi**) highlight the nodes each system
  uses:

  | Project | Nodes highlighted |
  |---|---|
  | OSHC | Next.js, NestJS, PostgreSQL, Redis, BullMQ, AWS |
  | Expert PTE | Next.js, NestJS, PostgreSQL, Redis, AWS |
  | CNI Swadeshi | FastAPI instead of NestJS, PostgreSQL `[TODO: confirm DB]` |
- The diagram shows **no fake numbers**: no millisecond timings. It is labelled
  "Simplified architecture".

**Below the diagram:** three pre-launch cards, each with:
- what it is `[TODO]`
- what I built `[TODO]`
- stack
- data model / queues / caching / deployment notes (from facts)
- a "Pre-launch" badge

**How it stays fast and accessible**
- The SVG diagram and every node's text are **server-rendered HTML**. It is crawlable,
  works without JS, and a screen reader reads it as an ordered list.
- Interactivity is a **client island loaded with `next/dynamic`** only when the section
  comes within ~400 px of the viewport. It is far below the fold, so it can't affect LCP.
- Estimated size is 5–7 KB gzipped.
- The packet moves with the Web Animations API on a CSS `offset-path` (compositor only).
  Under reduced motion there is no packet: nodes highlight instantly.
- Nodes are real `<button>`s with arrow-key navigation inside the diagram. The detail
  panel is `aria-live="polite"`. Tabs follow the ARIA tabs pattern.
- Mobile gets a vertical layout of the same diagram, not a shrunken copy.

**Not chosen:** the live web-vitals receipt. It is clever but generic, it only shows the
visitor's own browser, and it competes with the diagram. One signature element.

---

## 4. Tech decisions

| Decision | Detail |
|---|---|
| Framework | Next 16 App Router, React 19.2, TypeScript strict + `noUncheckedIndexedAccess` |
| Rendering | **Server Components by default.** Client islands only: `ThemeToggle` (~1 KB), `CopyEmail` (~1 KB), `TraceDiagram` (lazy, ~6 KB). Mobile menu via native `popover` (0 KB). |
| Static | Every page is static. `generateStaticParams` + `dynamicParams = false` on `/work/[slug]`. |
| Styling | Tailwind v4 with design tokens in `@theme` (one `globals.css`). **Sass removed.** |
| Content | **`src/content/profile.ts`**: one typed file for profile, proof, case studies, building, experience, education, skills, about and links. Pages render only from it. |
| Images | `next/image` with AVIF/WebP via the Netlify Image CDN. Static imports give intrinsic sizes and blur placeholders. Explicit `sizes`; `priority` only on the case-study hero. `remotePatterns` removed. |
| Fonts | `next/font/google`, 2 variable files, Latin subset, `display: swap` |
| SEO | `metadataBase`, per-page `title`/`description`/canonical. `opengraph-image.tsx` per route via `next/og` (async params in v16). JSON-LD `Person` on home, `CreativeWork` + `BreadcrumbList` on case studies. `sitemap.ts`, `robots.ts`, `not-found.tsx`. |
| Removed | framer-motion, lenis, sass, nodemailer, `@types/nodemailer`, clsx, tailwind-merge, concurrently, autoprefixer, `package-lock.json`, committed `server/`, unused public assets, simpleicons CDN, custom cursor, mascot, loader, nav spine, edition switch |
| Guardrail | `scripts/check-budget.mjs` runs after `next build` and fails if home first-party JS > 20 KB gz or total > 165 KB gz |
| Hosting | Stays on Netlify (Next runtime) + Cloudflare. Cloudflare settings to change in §6. |

---

## 5. Performance budget

| Metric | Budget | Before (AUDIT.md) |
|---|---|---|
| Lighthouse mobile: Perf / A11y / BP / SEO | ≥ 95 / 100 / 100 / 100 | 74–90 / 96 / 93 / 92 |
| LCP (mobile lab) | < 2.0 s, LCP element = hero text | 3.1–5.8 s (decorative watermark) |
| CLS | < 0.05 (target 0) | 0–0.006 |
| INP | < 150 ms (lab proxy: TBT < 100 ms; field check with `web-vitals` in a dev build) | TBT 100–120 ms |
| Home JS, total gz | ≤ 165 KB (framework ~142 + first-party ≤ 20) | 286 KB |
| Home JS, first-party gz | ≤ 20 KB | ~144 KB |
| CSS gz | ≤ 15 KB, one file | ~24 KB in 11 files |
| Fonts | 2 files, ≤ 100 KB total | 2 files |
| Home transfer, first load (mobile) | ≤ 400 KB | 4.1 MB |
| Third-party requests | 0 (Cloudflare beacon aside, see §6) | simpleicons CDN, Cloudflare scripts |
| DOM nodes | ≤ 800 | 1,212 |

If something breaks the budget, it gets lazy-loaded or cut, in this order: View
Transitions, then the diagram packet animation (static highlights instead), then
home-page screenshots (case pages only).

---

## 6. URL changes and redirects

Implemented as `redirects()` in `next.config.ts` (permanent, 308). Netlify's Next runtime
applies them at the edge.

| Old URL | New URL | Reason |
|---|---|---|
| `/projects` | `/work` | Clearer name |
| `/projects/invicta-kent` | `/work/invicta-kent` | – |
| `/projects/achieve-treks` | `/work/achieve-treks` | – |
| `/projects/cuts-and-coffee` | `/work/cuts-and-coffee` | – |
| `/projects/orgyen-ling` | `/work/orgyen-ling` | – |
| `/projects/biskajatra` | `/work` | "Also shipped", no case page |
| `/projects/serang-school`, `/projects/fyp-pet-haven`, `/projects/meatmandu` | `/work` | Not in the fact sheet (decision 5) |
| `/Prakash%20Shrestha%20CV.pdf` | `/Prakash_Shrestha_Resume.pdf` | Clean resume URL |
| `/api/contact` | *(removed, 404)* | Contact form removed (decision 6) |

**Cloudflare settings to change at deploy** (they are the cause of current SEO and
best-practice failures):
- Turn off **Managed robots.txt**, so the site's own `robots.txt` is served.
- Turn off **Email Address Obfuscation**. It injects a render-blocking script and rewrites
  `mailto:` links.
- Turn off **Rocket Loader** if it is on.
- **Web Analytics beacon:** your call. It is async, but Lighthouse flags its cache headers.

---

## 7. Placeholders I expect to insert (final list comes in the Phase 3 report)

**Dobaato projects**
- OSHC: what it is and who uses it, 2–3 key features.
- Expert PTE: what it is, features.
- CNI Swadeshi: one-line description, what data it processes, confirm the DB, live or
  pre-launch (+ link).
- The name of the 4th Dobaato project (or confirm CNI Swadeshi is the 4th).
- Which project has the 24+ table schema.
- What the AI/LLM feature does.

**Case studies**
- The problem, key features and year for each.
- Stack confirmation for Achieve Treks.
- Languages for Achieve Treks and Orgyen Ling.

**Proof and resume**
- A PageSpeed Insights link for the Lighthouse 100 claim.
- Confirm the resume PDF is current.

---

## 8. Phase 3 build order (after approval)

1. Clean the repo: delete `server/`, `package-lock.json`, unused deps and assets.
2. Tokens, fonts, layout shell, theme, header/footer, skip link.
3. Write `src/content/profile.ts` from the fact sheet, with TODOs.
4. Home sections 01–08 as Server Components.
5. Signature diagram (static first, then the lazy interactive island).
6. `/work` and `/work/[slug]`, OG images, JSON-LD, sitemap, robots, 404, redirects.
7. Accessibility pass (keyboard, contrast, headings, reduced motion) and screenshots at
   360 / 768 / 1280 / 1920 px.
8. Production build: budget script, then Lighthouse mobile + desktop (3 runs each) on a
   local prod server and on the Netlify deploy preview.
9. Final report: before/after scores, changes, TODO list with file:line, cuts, deploy steps.

Nothing is committed or pushed without your go-ahead.
