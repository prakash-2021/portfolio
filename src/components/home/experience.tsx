import { companyLogos } from "@/components/company-logos";
import { Rich } from "@/components/rich";
import { SectionHead } from "@/components/section-head";
import { education, experience } from "@/content/profile";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="container-x">
        <SectionHead
          id="experience-title"
          index="03"
          label="Experience"
          title="Experience"
          kicker="4+ years shipping client work, now leading backend development."
        />

        {experience.map((role, i) => {
          const logo = companyLogos[role.company];
          return (
            <article key={role.company} className="role" aria-labelledby={`role-${i}`}>
              <div className="role-side">
                {logo && <logo.Logo className={`mb-5 w-auto ${logo.size}`} />}
                <p className="label tnum">{role.period}</p>
                <h3 id={`role-${i}`} className="mt-2 text-2xl lg:text-3xl">
                  {role.company}
                </h3>
                <p className="mt-1 text-muted">
                  {role.title}
                  {role.type ? ` · ${role.type}` : ""}
                </p>
                <ul className="mt-5 hidden flex-wrap gap-2 lg:flex" aria-label="Stack">
                  {role.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="role-main">
                <p className="text-lg leading-snug font-medium lg:text-xl">{role.summary}</p>
                <div className="mt-8 grid gap-8">
                  {role.groups.map((g) => (
                    <div key={g.title}>
                      <h4 className="label">{g.title}</h4>
                      <ul className="ticks mt-3">
                        {g.items.map((item) => (
                          <li key={item}>
                            <Rich text={item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}

        <article className="role" aria-labelledby="education-title">
          <div className="role-side">
            <p className="label">Education</p>
            <h3 id="education-title" className="mt-2 text-2xl lg:text-3xl">
              First Class Honours, while working full time
            </h3>
          </div>
          <div className="role-main grid gap-8 sm:grid-cols-2">
            {education.map((e) => (
              <div key={e.degree} className="border-t border-rule pt-4">
                {e.period ? <p className="label tnum">{e.period}</p> : null}
                <h4 className="mt-2 text-xl">{e.degree}</h4>
                <p className="mt-1 text-muted">{e.school}</p>
                <p className="mt-3 font-semibold text-accent">{e.result}</p>
                <ul className="ticks mt-3">
                  {e.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
