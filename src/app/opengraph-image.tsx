import { ImageResponse } from "next/og";
import { person } from "@/content/profile";

export const alt = `${person.name}, ${person.role} in ${person.location}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#a3a19b" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#ff7a3d" }} />
          {person.role} · {person.location}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 160,
            fontWeight: 700,
            letterSpacing: -7,
            lineHeight: 0.92,
          }}
        >
          <span>{person.firstName}</span>
          <span style={{ display: "flex" }}>
            {person.lastName}
            <span style={{ color: "#ff7a3d" }}>.</span>
          </span>
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
          <span>{person.stack.join(" · ")}</span>
          <span style={{ color: "#ff7a3d" }}>4+ yrs · 25+ apps</span>
        </div>
      </div>
    ),
    size,
  );
}
