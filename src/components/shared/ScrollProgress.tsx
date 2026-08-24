"use client";

import { m } from "framer-motion";
import { useScrollProgress } from "@/lib/scroll-provider";

export function ScrollProgress() {
  const { springProgress } = useScrollProgress();

  return (
    <m.div
      className="fixed top-0 left-0 right-0 h-[1px] origin-left z-[100]"
      style={{ scaleX: springProgress, background: "rgba(var(--accent-rgb), 0.6)" }}
    />
  );
}
