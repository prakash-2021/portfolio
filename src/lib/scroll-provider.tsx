"use client";

import { createContext, useContext, useRef, useEffect, memo, type ReactNode } from "react";
import { motion, useScroll, useSpring, type MotionValue } from "framer-motion";

interface ScrollCtx {
  scrollYProgress: MotionValue<number>;
  springProgress: MotionValue<number>;
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

  return (
    <ScrollContext.Provider value={{ scrollYProgress, springProgress }}>
      {children}
    </ScrollContext.Provider>
  );
});
