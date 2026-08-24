"use client";

import { createContext, useContext, useRef, useEffect, useState, memo, type ReactNode } from "react";
import { useScroll, useSpring, type MotionValue } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

interface LenisApi {
  scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number }) => void;
  on?: (event: "scroll", callback: () => void) => () => void;
}

interface ScrollCtx {
  scrollYProgress: MotionValue<number>;
  springProgress: MotionValue<number>;
  lenis: LenisApi | null;
}

const ScrollContext = createContext<ScrollCtx | null>(null);

export function useScrollProgress() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScrollProgress must be used within ScrollProvider");
  return ctx;
}

/* Frames of stillness before the Lenis loop parks itself. Any user input or
 * native scroll wakes it again, so the only cost of a larger number is a few
 * extra idle frames; the only cost of a smaller one is waking more often. */
const IDLE_FRAMES = 40;

export const ScrollProvider = memo(function ScrollProvider({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const springProgress = useSpring(scrollYProgress, { stiffness: 150, damping: 25 });
  const [lenis, setLenis] = useState<ScrollCtx["lenis"]>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      setLenis({
        scrollTo: (target: number) => {
          window.scrollTo({ top: target, behavior: "smooth" });
        },
      });
      return;
    }

    const instance = new Lenis({
      lerp: 0.06,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0.8,
      infinite: false,
      overscroll: false,
    });

    let running = false;
    let idle = 0;

    const raf = (time: number) => {
      instance.raf(time);
      idle = instance.isScrolling ? 0 : idle + 1;
      if (idle > IDLE_FRAMES) {
        running = false;
        rafRef.current = 0;
        return;
      }
      rafRef.current = requestAnimationFrame(raf);
    };

    const wake = () => {
      idle = 0;
      if (running) return;
      running = true;
      rafRef.current = requestAnimationFrame(raf);
    };

    wake();

    setLenis({
      scrollTo: (target, options) => {
        wake();
        instance.scrollTo(target, options);
      },
      on: (event, callback) => instance.on(event, callback),
    });

    const opts = { passive: true } as const;
    const wakeEvents = ["wheel", "touchstart", "pointerdown", "keydown", "scroll", "resize"] as const;
    wakeEvents.forEach((e) => window.addEventListener(e, wake, opts));

    return () => {
      cancelAnimationFrame(rafRef.current);
      wakeEvents.forEach((e) => window.removeEventListener(e, wake));
      instance.destroy();
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollYProgress, springProgress, lenis }}>
      {children}
    </ScrollContext.Provider>
  );
});
