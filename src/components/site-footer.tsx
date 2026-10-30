import { person } from "@/content/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <div className="container-x flex flex-col gap-6 py-10 text-sm md:flex-row md:items-center md:justify-between">
        <p className="text-muted">
          © {year} {person.name}. Built with Next.js and statically generated.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a className="link" href={person.links.linkedin} rel="me noopener" target="_blank">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="link" href={person.links.github} rel="me noopener" target="_blank">
              GitHub
            </a>
          </li>
          <li>
            <a className="link" href={person.links.resume} target="_blank" rel="noopener">
              Resume
            </a>
          </li>
          <li>
            <a className="link" href="#main">
              Back to top ↑
            </a>
          </li>
        </ul>
      </div>
      <div className="container-x overflow-hidden" aria-hidden="true">
        <p className="wordmark -mb-[0.08em]">{person.name}</p>
      </div>
    </footer>
  );
}
