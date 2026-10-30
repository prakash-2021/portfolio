"use client";

import { useEffect } from "react";

/** Loads the diagram's interaction code only when the diagram is about to scroll into view. */
export function TraceEnhancer({ targetId }: { targetId: string }) {
  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        void import("./enhance").then((m) => {
          if (!cancelled) cleanup = m.enhanceTrace(root);
        });
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(root);

    return () => {
      cancelled = true;
      io.disconnect();
      cleanup?.();
    };
  }, [targetId]);

  return null;
}
