import Link from "next/link";
import { person } from "@/content/profile";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#building", label: "Building" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container-x flex h-(--header-h) items-center justify-between gap-4">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          {person.name}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex gap-8">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="nav-link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={person.links.resume}
            className="btn btn-sm hidden sm:inline-flex"
            target="_blank"
            rel="noopener"
          >
            Resume
          </a>
          <ThemeToggle />
          <MobileNav links={[...nav, { href: person.links.resume, label: "Resume (PDF)" }]} />
        </div>
      </div>
    </header>
  );
}
