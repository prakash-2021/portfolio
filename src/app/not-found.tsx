import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { person } from "@/content/profile";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="container-x py-20 lg:py-32">
      <p className="label tnum">Error 404</p>
      <h1 className="mt-4 text-[clamp(3rem,10vw,8rem)] leading-[0.88] font-extrabold tracking-[-0.05em]">
        Nothing here<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 max-w-[42ch] text-xl text-muted">
        This page doesn&apos;t exist, or it moved when the site was rebuilt. The work and contact details are one
        click away.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/work" className="btn btn-primary">
          See the work
          <ArrowRight />
        </Link>
        <a href={`mailto:${person.email}`} className="btn">
          Email me
        </a>
      </div>
    </div>
  );
}
