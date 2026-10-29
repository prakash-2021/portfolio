import { ArrowUpRight } from "@/components/icons";
import { Rich } from "@/components/rich";
import { SectionHead } from "@/components/section-head";
import { TraceDiagram } from "@/components/trace/trace-diagram";
import { building, buildingNote, engineeringNotes } from "@/content/profile";

export function Building() {
  return (
    <section id="building" aria-labelledby="building-title" className="band">
      <div className="container-x py-18 lg:py-28">
        <SectionHead
          id="building-title"
          index="02"
          label="Building"
          title="Currently building"
          kicker="Systems I'm building at Dobaato Info Tech, most of them before launch. No screenshots yet, so here is the engineering. Pick a path to trace a request."
        />

        <div className="reveal">
          <TraceDiagram />
        </div>

        <h3 className="label mt-20">The systems</h3>
        <ul className="mt-5 grid gap-4 lg:grid-cols-3">
          {building.map((p) => (
            <li key={p.name} className="card reveal flex flex-col">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h4 className="text-2xl">{p.name}</h4>
                <span className="pill">
                  <Rich text={p.status} />
                </span>
              </div>
              <p className="mt-3">
                <Rich text={p.what} />
              </p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener"
                  className="link link-accent mt-3 inline-flex items-center gap-1 self-start text-sm"
                >
                  Visit the live site
                  <ArrowUpRight className="size-4" />
                </a>
              )}
              <ul className="ticks mt-5 text-[0.9375rem]">
                {p.built.map((b) => (
                  <li key={b}>
                    <Rich text={b} />
                  </li>
                ))}
              </ul>
              <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label={`${p.name} stack`}>
                {p.stack.map((s) => (
                  <li key={s} className="chip">
                    <Rich text={s} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {buildingNote && (
          <p className="mt-4 text-sm text-muted">
            <Rich text={buildingNote} />
          </p>
        )}

        <h3 className="label mt-16">Engineering notes</h3>
        <dl className="mt-5 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {engineeringNotes.map((n) => (
            <div key={n.title} className="reveal border-t border-rule pt-4">
              <dt className="font-display text-lg font-bold">{n.title}</dt>
              <dd className="mt-2 text-muted">
                <Rich text={n.body} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
