# prakashshrestha7.com.np

Portfolio of Prakash Shrestha, full stack engineer. Next.js 16 (App Router), React 19, TypeScript (strict),
Tailwind CSS v4. Every page is statically generated.

## Editing content

All copy lives in [`src/content/profile.ts`](src/content/profile.ts): profile, proof strip, case studies,
the "Currently building" systems and architecture diagram, experience, education, skills and about.
Any string containing `[TODO: …]` renders as a highlighted placeholder on the site, so gaps stay visible:

```sh
grep -n "\[TODO:" src/content/profile.ts
```

Case study screenshots are in `src/assets/projects/` (1600px-wide WebP; `next/image` serves AVIF/WebP at
the right size). The resume is `public/Prakash_Shrestha_Resume.pdf`.

## Scripts

```sh
pnpm dev       # local dev server
pnpm build     # production build (all routes static)
pnpm budget    # after a build: fails if home-page JS > 165 KB or CSS > 15 KB gzipped
pnpm lint
```

## Structure

```
src/app/                 routes: / , /work , /work/[slug] , OG images, sitemap, robots, 404
src/components/home/     home page sections (Server Components)
src/components/trace/    "Trace a request" diagram: server markup + lazily loaded enhancer
src/components/*.tsx     header, footer, and the only client islands (theme, copy email, time, menu)
src/content/profile.ts   all content
```

Old URLs (`/projects`, `/projects/:slug`, the old CV filename) redirect permanently via `next.config.ts`.
