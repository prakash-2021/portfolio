"use client";

import { cn } from "@/lib/cn";
import { memo } from "react";

export const SpeedLines = memo(function SpeedLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06]">
      <div className="absolute inset-0" style={{
        background: "repeating-linear-gradient(90deg, transparent 0, transparent 20px, var(--color-ink) 20px, var(--color-ink) 21px)",
        animation: "speed-line 0.6s linear infinite",
      }} />
    </div>
  );
});

export const HalftoneCorner = memo(function HalftoneCorner({ className }: { className?: string }) {
  return (
    <div className={cn("absolute w-24 h-24 opacity-[0.07]", className)}
      style={{
        backgroundImage: "radial-gradient(circle, var(--color-ink) 1.5px, transparent 1.5px)",
        backgroundSize: "5px 5px",
      }}
    />
  );
});
