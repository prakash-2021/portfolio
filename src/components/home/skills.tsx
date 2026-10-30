import { SectionHead } from "@/components/section-head";
import { skills } from "@/content/profile";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="container-x">
        <SectionHead
          id="skills-title"
          index="04"
          label="Skills"
          title="Skills"
          kicker="Grouped by layer. No percentages: the work above is the evidence."
        />
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g) => (
            <div key={g.group} className="reveal border-t border-ink pt-4">
              <h3 className="flex items-baseline justify-between text-lg">
                {g.group}
                <span className="text-sm font-normal text-muted tnum">{g.items.length}</span>
              </h3>
              <ul className="mt-4 grid gap-1.5 text-muted">
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
