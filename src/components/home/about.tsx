import { about } from "@/content/profile";

export function About() {
  const [lead, ...rest] = about;

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x grid gap-8 lg:grid-cols-12">
        <p className="section-index label lg:col-span-3">
          <span className="tnum">05</span>
          <span aria-hidden="true">/</span>
          <span>About</span>
        </p>
        <div className="lg:col-span-9">
          <h2 id="about-title" className="sr-only">
            About
          </h2>
          <p className="reveal font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.08] font-semibold tracking-tight">
            {lead}
          </p>
          <div className="reveal mt-8 grid max-w-[60ch] gap-4 text-lg text-muted">
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
