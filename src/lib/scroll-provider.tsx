"use client";

import { createContext, useContext, useRef, useEffect, useState, memo, type ReactNode } from "react";
import { motion, useScroll, useSpring, type MotionValue } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

interface ScrollCtx {
  scrollYProgress: MotionValue<number>;
  springProgress: MotionValue<number>;
  lenis: { scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number }) => void } | null;
}

const ScrollContext = createContext<ScrollCtx | null>(null);

export function useScrollProgress() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScrollProgress must be used within ScrollProvider");
  return ctx;
}

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

    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      instance.destroy();
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollYProgress, springProgress, lenis }}>
      {children}
    </ScrollContext.Provider>
  );
});
