import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Rich } from "@/components/rich";
import { caseStudies, person, site } from "@/content/profile";
import { hostname, stripTodos } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = caseStudies.find((c) => c.slug === slug);
  if (!work) return {};
  const title = `${work.title}: case study`;
  return {
    title,
    description: stripTodos(work.description),
    alternates: { canonical: `/work/${work.slug}` },
    openGraph: { type: "article", title, description: work.summary, url: `/work/${work.slug}` },
    twitter: { title, description: work.summary },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="reveal border-t border-rule pt-6">
      <h2 className="text-2xl lg:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  const work = caseStudies[index];
  if (!work) notFound();
  const next = caseStudies[(index + 1) % caseStudies.length]!;

  const built = [
    { title: "Frontend", items: work.built.frontend },
    { title: "Backend", items: work.built.backend },
    { title: "Infrastructure", items: work.built.infrastructure },
  ].filter((b) => b.items.length > 0);

  const facts = [
    { term: "Client", detail: work.client },
    { term: "Role", detail: work.role },
    { term: "With", detail: work.company },
    { term: "Year", detail: work.year },
  ];

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CreativeWork",
              name: work.title,
              description: stripTodos(work.description),
              url: `${site.url}/work/${work.slug}`,
              creator: { "@type": "Person", name: person.name, url: site.url },
              keywords: work.stack.join(", "),
              ...(work.link ? { sameAs: work.link } : {}),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
                { "@type": "ListItem", position: 3, name: work.title, item: `${site.url}/work/${work.slug}` },
              ],
            },
          ],
        }}
      />

      <header className="container-x pt-8 lg:pt-14">
        <nav aria-label="Breadcrumb">
          <Link href="/work" className="link inline-flex items-center gap-2 text-sm font-medium text-muted">
            <ArrowLeft className="size-4" />
            All work
          </Link>
        </nav>

        <p className="label mt-10">
          Case study · {work.stack.slice(0, 3).join(" · ")}
        </p>
        <h1 className="mt-4 text-[clamp(2.75rem,8vw,7rem)] leading-[0.9] font-extrabold tracking-[-0.045em]">
          {work.title}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-[46ch] text-xl leading-snug lg:text-2xl">{work.summary}</p>

        <dl className="mt-10 grid grid-cols-2 border-t border-rule lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.term} className="border-b border-rule py-4 pr-4 lg:border-b-0">
              <dt className="label">{f.term}</dt>
              <dd className="mt-1 font-medium">
                <Rich text={f.detail} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {work.link ? (
            <a href={work.link} target="_blank" rel="noopener" className="btn btn-primary">
              Visit {hostname(work.link)}
              <ArrowUpRight />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
          <ul className="flex flex-wrap gap-2" aria-label="Stack">
            {work.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <figure className="container-x mt-12 lg:mt-16">
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
            sizes="(min-width: 1280px) 1200px, 100vw"
            placeholder="blur"
            preload
            className="block w-full"
          />
        </div>
      </figure>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            {work.metric ? (
              <p>
                <span className="block font-display text-6xl font-extrabold tracking-tight text-accent tnum">
                  {work.metric.value}
                </span>
                <span className="text-muted">{work.metric.label}</span>
              </p>
            ) : null}
            <p className="label mt-8">Mission</p>
            <p className="mt-2 text-muted">{work.mission}</p>
          </div>
        </aside>

        <div className="grid gap-14 lg:col-span-8 lg:col-start-5">
          <Block title="The problem">
            <div className="prose-case">
              <p>
                <Rich text={work.problem} />
              </p>
            </div>
          </Block>

          <Block title="Approach">
            <div className="prose-case">
              <p>{work.approach}</p>
            </div>
          </Block>

          <Block title="What I built">
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {built.map((b) => (
                <div key={b.title}>
                  <h3 className="label">{b.title}</h3>
                  <ul className="ticks mt-3">
                    {b.items.map((item) => (
                      <li key={item}>
                        <Rich text={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Key features">
            <ul className="ticks">
              {work.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Block>

          {work.architecture ? (
            <Block title="Architecture">
              <p className="card text-[0.9375rem] leading-relaxed">{work.architecture}</p>
            </Block>
          ) : null}

          {work.challenges ? (
            <Block title="Challenges">
              <ul className="ticks">
                {work.challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Block>
          ) : null}

          <Block title="Result">
            <p className="text-xl leading-snug font-medium lg:text-2xl">
              <Rich text={work.result} />
            </p>
          </Block>

          <Block title="What I learned">
            <ul className="ticks">
              {work.lessons.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </Block>
        </div>
      </div>

      <nav aria-label="Next case study" className="border-t border-rule">
        <Link href={`/work/${next.slug}`} className="group container-x block py-14 lg:py-20" data-cursor="Next">
          <span className="label">Next case study</span>
          <span className="mt-3 flex items-center justify-between gap-6">
            <span className="font-display text-[clamp(2rem,6vw,5rem)] leading-none font-extrabold tracking-[-0.04em] transition-colors group-hover:text-accent">
              {next.title}
            </span>
            <ArrowRight className="size-10 shrink-0 transition-transform group-hover:translate-x-2" />
          </span>
        </Link>
      </nav>
    </article>
  );
}
