import type { MetadataRoute } from "next";
import { caseStudies, site } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/work`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...caseStudies.map((c) => ({
      url: `${site.url}/work/${c.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: c.featured ? 0.7 : 0.5,
    })),
  ];
}
