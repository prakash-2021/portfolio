const TODO = /(\[TODO:[^\]]*\])/g;

/** Renders copy from content/profile.ts, highlighting any `[TODO: …]` placeholders. */
export function Rich({ text }: { text: string }) {
  if (!text.includes("[TODO:")) return text;
  return text.split(TODO).map((part, i) =>
    part.startsWith("[TODO:") ? (
      <mark key={i} className="todo">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
