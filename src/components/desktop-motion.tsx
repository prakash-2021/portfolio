"use client";

import { useEffect } from "react";

/**
 * Loads smooth scrolling and the cursor follower once the page is idle, only for
 * mouse/trackpad users who haven't asked for reduced motion. Touch devices keep
 * native scrolling and no custom cursor.
 */
export function DesktopMotion() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wanted = () => finePointer.matches && !reduced.matches;
    let stops: (() => void)[] | undefined;
    let unmounted = false;

    const stop = () => {
      stops?.forEach((s) => s());
      stops = undefined;
    };
    const start = () => {
      if (stops || !wanted()) return;
      void Promise.all([import("@/lib/smooth-scroll"), import("@/lib/cursor")]).then(([scroll, cursor]) => {
        if (!unmounted && !stops && wanted()) stops = [scroll.startSmoothScroll(), cursor.startCursor()];
      });
    };
    const onChange = () => (wanted() ? start() : stop());

    // requestIdleCallback is missing in older Safari.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle ? window.requestIdleCallback(start, { timeout: 2000 }) : window.setTimeout(start, 1200);
    finePointer.addEventListener("change", onChange);
    reduced.addEventListener("change", onChange);

    return () => {
      unmounted = true;
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      finePointer.removeEventListener("change", onChange);
      reduced.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}
