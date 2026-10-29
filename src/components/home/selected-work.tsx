import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { Rich } from "@/components/rich";
import { SectionHead } from "@/components/section-head";
import { featuredWork, moreWork, type CaseStudy } from "@/content/profile";
import { hostname } from "@/lib/format";

function WorkItem({ work, index }: { work: CaseStudy; index: number }) {
  const facts = [
    { term: "Problem", detail: work.problem },
    { term: "Frontend", detail: work.built.frontend.slice(0, 2).join(". ") },
    { term: "Backend", detail: work.built.backend.slice(0, 2).join(". ") || "Frontend-led project." },
    { term: "Result", detail: work.result },
  ];

  return (
    <article className="work-item" aria-labelledby={`work-${work.slug}`}>
      <div className="reveal lg:col-span-5">
        <div className="flex items-end justify-between gap-4">
          <span className="work-index tnum" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          {work.metric ? (
            <p className="text-right">
              <span className="block font-display text-3xl font-bold tracking-tight text-accent tnum">
                {work.metric.value}
              </span>
              <span className="text-sm text-muted">{work.metric.label}</span>
            </p>
          ) : null}
        </div>

        <p className="label mt-6">
          {work.company} · {work.year} · {work.client}
        </p>
        <h3 id={`work-${work.slug}`} className="work-title mt-3">
          <Link href={`/work/${work.slug}`}>{work.title}</Link>
        </h3>
        <p className="mt-4 text-lg leading-snug">{work.summary}</p>

        <dl className="work-facts mt-7">
          {facts.map((f) => (
            <div key={f.term}>
              <dt className="label">{f.term}</dt>
              <dd className="line-clamp-3">
                <Rich text={f.detail} />
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
          {work.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href={`/work/${work.slug}`} className="btn btn-primary btn-sm">
            Read case study
            <ArrowRight />
            <span className="sr-only">: {work.title}</span>
          </Link>
          {work.link ? (
            <a href={work.link} target="_blank" rel="noopener" className="link inline-flex items-center gap-1 text-sm font-semibold">
              {hostname(work.link)}
              <ArrowUpRight className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>

      <Link
        href={`/work/${work.slug}`}
        aria-label={`${work.title} case study`}
        tabIndex={-1}
        data-cursor="View case"
        className="reveal-frame block lg:col-span-7 lg:col-start-6 lg:self-center"
      >
        <div className="frame">
          <div className="frame-bar">
            <i />
            <i />
            <i />
            <span>{work.link ? hostname(work.link) : work.title}</span>
          </div>
          <Image
            src={work.image}
            alt={work.imageAlt}
            sizes="(min-width: 1280px) 680px, (min-width: 1024px) 56vw, 100vw"
            placeholder="blur"
            className="block w-full"
          />
        </div>
      </Link>
    </article>
  );
}

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <div className="container-x">
        <SectionHead
          id="work-title"
          index="01"
          label="Work"
          title="Selected work"
          kicker="Production client work, frontend to backend to deployment. Each one has a full case study."
        />

        <div>
          {featuredWork.map((w, i) => (
            <WorkItem key={w.slug} work={w} index={i} />
          ))}
        </div>

        <div className="mt-16 lg:mt-24">
          <h3 className="label">More shipped work</h3>
          <ul className="mt-4 border-b border-rule">
            {moreWork.map((w) => (
              <li key={w.slug}>
                <Link href={`/work/${w.slug}`} className="shipped-row">
                  <span className="font-display text-xl font-bold tracking-tight">{w.title}</span>
                  <span className="text-muted">
                    <Rich text={w.summary} />
                  </span>
                  <span className="text-sm text-muted tnum">
                    {w.metric ? `Lighthouse ${w.metric.value} · ` : ""}
                    <Rich text={w.year.split(" ")[0] ?? w.year} />
                  </span>
                  <ArrowRight className="arrow hidden md:block" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
