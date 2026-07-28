import { memo } from "react";
import { cn } from "@/lib/cn";

type Action = "wave" | "point" | "sit" | "walk";

function getBodyAnimation(action?: Action) {
  switch (action) {
    case "walk":
      return (
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 5,-1; 0,0"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
        />
      );
    case "sit":
      return (
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-1; 0,0"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
        />
      );
    default:
      return null;
  }
}

function getArmAnimation(action?: Action) {
  if (action !== "wave") return null;
  return (
    <animateTransform
      attributeName="transform"
      type="rotate"
      values="0 14 25; -15 14 25; 0 14 25; -15 14 25; 0 14 25"
      dur="2s"
      repeatCount="indefinite"
      calcMode="spline"
      keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
    />
  );
}

function MascotComponent({
  className,
  size = 32,
  action,
}: {
  className?: string
  size?: number
  action?: Action
}) {
  return (
    <svg
      viewBox="0 0 40 50"
      width={size}
      height={size * 1.25}
      fill="none"
      className={cn("overflow-visible", className)}
    >
      <g>
        {getBodyAnimation(action)}
        {/* Body */}
        <rect x="14" y="20" width="12" height="18" rx="2.5" fill="var(--color-ink)" />
        {/* Head */}
        <circle cx="20" cy="13" r="8" fill="var(--color-ink)" />
        {/* Eyes */}
        <circle cx="17" cy="11" r="1.2" fill="var(--color-paper)" />
        <circle cx="23" cy="11" r="1.2" fill="var(--color-paper)" />
        {/* Smile */}
        <path d="M16 15 Q20 17.5 24 15" stroke="var(--color-paper)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        {/* Hood */}
        <path d="M14 10 L20 3 L26 10" stroke="var(--color-red)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Left arm */}
        {action === "wave" ? (
          <g>
            {getArmAnimation(action)}
            <path d="M14 25 L6 18" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : action === "point" ? (
          <path d="M14 25 L7 22" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <path d="M14 25 L8 28" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
        )}
        {/* Right arm */}
        <path d="M26 25 L32 28" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
        {/* Code symbol */}
        <text x="26" y="40" fontSize="5" fill="var(--color-red)" fontFamily="monospace" fontWeight="700">&lt;/&gt;</text>
      </g>
    </svg>
  );
}

export const Mascot = memo(MascotComponent);
