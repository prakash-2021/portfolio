import type { Metadata } from "next";
import { About } from "@/components/home/about";
import { Building } from "@/components/home/building";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { Skills } from "@/components/home/skills";
import { JsonLd } from "@/components/json-ld";
import { education, person, site, skills } from "@/content/profile";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  url: site.url,
  email: `mailto:${person.email}`,
  telephone: person.phone.href.replace("tel:", ""),
  image: `${site.url}/opengraph-image`,
  address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
  worksFor: { "@type": "Organization", name: person.currentRole.company },
  alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
  sameAs: [person.links.linkedin, person.links.github],
  knowsAbout: skills.flatMap((g) => g.items),
};

export default function Home() {
  return (
    <>
      <JsonLd data={personSchema} />
      <Hero />
      <SelectedWork />
      <Building />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
