import type { ReactNode } from "react";

export function SectionHead({
  index,
  label,
  title,
  kicker,
  id,
}: {
  index: string;
  label: string;
  title: ReactNode;
  kicker?: ReactNode;
  id: string;
}) {
  return (
    <div className="section-head">
      <p className="section-index label">
        <span className="tnum">{index}</span>
        <span aria-hidden="true">/</span>
        <span>{label}</span>
      </p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {kicker ? <p className="section-kicker">{kicker}</p> : null}
    </div>
  );
}
