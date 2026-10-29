import Link from "next/link";
import { DobaatoLogo } from "@/components/company-logos";
import { ArrowDown, ArrowUpRight, Download } from "@/components/icons";
import { heroSystem, person, proof } from "@/content/profile";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero">
      <div className="container-x pt-8 sm:pt-12 lg:pt-10">
        <div className="hero-fade flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-sm">
          <p className="flex items-center gap-2.5 font-medium">
            <span className="live-dot" aria-hidden="true" />
            <span className="inline-flex items-baseline gap-1.5">
              Currently building at
              <DobaatoLogo title="Dobaato Info Tech" className="h-[1.15em] w-auto translate-y-[0.12em]" />
            </span>
          </p>
          <p className="text-muted">
            {person.location} · {person.role}
          </p>
        </div>

        <div className="hero-grid mt-7 pb-10 sm:mt-8 lg:pb-12">
          <h1 id="hero-title" className="hero-title [grid-area:title]">
            <span className="hero-line">{person.firstName}</span>
            <br />
            <span className="hero-line">
              {person.lastName}
              <span className="hero-dot" aria-hidden="true" />
            </span>
          </h1>

          <div className="[grid-area:intro]">
            <p className="hero-fade hero-headline" style={{ "--d": 1 } as React.CSSProperties}>
              {person.headline}
            </p>

            <div
              className="hero-fade mt-8 flex flex-wrap items-center gap-3"
              style={{ "--d": 2 } as React.CSSProperties}
            >
              <Link href="#work" className="btn btn-primary">
                View work
                <ArrowDown />
              </Link>
              <a href={person.links.resume} className="btn" download>
                Download resume
                <Download />
              </a>
            </div>
          </div>

          <figure
            className="hero-fade hero-system [grid-area:visual]"
            style={{ "--d": 3 } as React.CSSProperties}
          >
            <figcaption className="label">Database to deployment</figcaption>
            <ol className="hero-system-rail" aria-label="Layers I build and run">
              {heroSystem.map((s, i) => (
                <li key={s.layer} style={{ "--i": i } as React.CSSProperties}>
                  <span className="hero-system-layer">{s.layer}</span>
                  <span className="hero-system-tools">{s.tools}</span>
                </li>
              ))}
            </ol>
            <Link href="#building" className="link mt-5 inline-flex items-center gap-1 text-sm font-medium">
              See the full architecture
              <ArrowUpRight className="size-4 text-accent" />
            </Link>
          </figure>
        </div>

        <dl className="proof hero-fade" style={{ "--d": 3 } as React.CSSProperties}>
          {proof.map((p, i) => {
            const value = (
              <span className="proof-roll" style={{ "--i": i } as React.CSSProperties}>
                <span>{p.value}</span>
              </span>
            );
            return (
              <div key={p.label}>
                <dt>{p.label}</dt>
                <dd className="tnum">
                  {p.href ? (
                    <Link href={p.href} className="group inline-flex items-start gap-1">
                      {value}
                      <ArrowUpRight className="mt-1 size-5 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
