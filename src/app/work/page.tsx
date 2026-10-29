import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Rich } from "@/components/rich";
import { caseStudies } from "@/content/profile";
import { stripTodos } from "@/lib/format";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Prakash Shrestha: production web applications for clients in Nepal and the UK, frontend to backend to deployment.",
  alternates: { canonical: "/work" },
  openGraph: { title: "Work · Prakash Shrestha", url: "/work" },
};

export default function WorkIndex() {
  return (
    <div className="container-x pt-10 pb-20 lg:pt-16 lg:pb-28">
      <p className="label">Case studies</p>
      <h1 className="mt-4 text-[clamp(3rem,9vw,7.5rem)] leading-[0.88] font-extrabold tracking-[-0.05em]">
        Work<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 max-w-[46ch] text-xl text-muted">
        {caseStudies.length} projects, each with the problem, what I built on the frontend and backend, and the
        result.
      </p>

      <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {caseStudies.map((c, i) => (
          <li key={c.slug} className={i > 1 ? "reveal" : undefined}>
            <Link href={`/work/${c.slug}`} className="group block" data-cursor="Open">
              <div className="frame">
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  sizes="(min-width: 1280px) 584px, (min-width: 768px) 48vw, 100vw"
                  placeholder="blur"
                  preload={i === 0}
                  className="block w-full"
                />
              </div>
              <p className="label mt-5 tnum">
                {String(i + 1).padStart(2, "0")} · {stripTodos(c.company) || "Client work"} · {c.year.split(" ")[0]}
              </p>
              <h2 className="mt-2 flex items-center justify-between gap-4 text-3xl tracking-tight transition-colors group-hover:text-accent">
                {c.title}
                <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" />
              </h2>
              <p className="mt-2 text-muted">
                <Rich text={c.summary} />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
