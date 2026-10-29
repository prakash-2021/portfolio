import type { MetadataRoute } from "next";
import { person, site } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: person.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0e0f11",
    theme_color: "#0e0f11",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
