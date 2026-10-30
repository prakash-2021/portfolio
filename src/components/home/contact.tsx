import { CopyEmail } from "@/components/copy-email";
import { ArrowUpRight, Download } from "@/components/icons";
import { LocalTime } from "@/components/local-time";
import { SectionHead } from "@/components/section-head";
import { person } from "@/content/profile";

export function Contact() {
  const channels = [
    { term: "LinkedIn", value: "in/prakashresthaa", href: person.links.linkedin, external: true },
    { term: "GitHub", value: "prakash-2021", href: person.links.github, external: true },
    { term: "Phone", value: person.phone.display, href: person.phone.href, external: false },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="container-x">
        <SectionHead
          id="contact-title"
          index="06"
          label="Contact"
          title="Get in touch"
          kicker="Email is the fastest way to reach me. My resume has the full detail."
        />

        <a
          href={`mailto:${person.email}`}
          className="reveal group block font-display text-[clamp(1.375rem,5.6vw,5rem)] leading-none font-bold tracking-tight break-all"
        >
          <span className="link group-hover:text-accent">{person.email}</span>
        </a>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CopyEmail email={person.email} />
          <a href={person.links.resume} className="btn btn-primary btn-sm" download>
            Download resume
            <Download />
          </a>
        </div>

        <dl className="mt-14 grid border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <div key={c.term} className="border-b border-rule py-5 sm:pr-6 lg:border-b-0">
              <dt className="label">{c.term}</dt>
              <dd className="mt-2">
                <a
                  href={c.href}
                  className="link inline-flex items-center gap-1 text-lg font-medium"
                  {...(c.external ? { target: "_blank", rel: "me noopener" } : {})}
                >
                  {c.value}
                  {c.external ? <ArrowUpRight className="size-4" /> : null}
                </a>
              </dd>
            </div>
          ))}
          <div className="py-5">
            <dt className="label">Based in</dt>
            <dd className="mt-2 text-lg font-medium">
              {person.location} · <LocalTime /> <span className="text-sm font-normal text-muted">UTC+5:45</span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
