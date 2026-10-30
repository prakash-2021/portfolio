import { ImageResponse } from "next/og";
import { caseStudies, person } from "@/content/profile";
import { stripTodos } from "@/lib/format";

export const alt = "Case study by Prakash Shrestha";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = caseStudies.find((c) => c.slug === slug);
  const title = work?.title ?? person.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0e0f11",
          color: "#edebe6",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a3a19b" }}>
          <span>Case study · {work ? stripTodos(work.company) || "Client work" : ""}</span>
          <span>{person.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95 }}>
            {title}
            <span style={{ color: "#ff7a3d" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#a3a19b", maxWidth: 960, lineHeight: 1.3 }}>
            {work?.summary}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #2a2b2f",
            paddingTop: 28,
            fontSize: 26,
            color: "#a3a19b",
          }}
        >
          <span>{work?.stack.slice(0, 4).join(" · ")}</span>
          {work?.metric ? (
            <span style={{ color: "#ff7a3d" }}>
              {work.metric.value} {work.metric.label}
            </span>
          ) : null}
        </div>
      </div>
    ),
    size,
  );
}
