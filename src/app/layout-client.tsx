"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { motion, useScroll, useTransform } from "framer-motion";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll();
  const bgColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#faf8f3", "#f5f2ea"]
  );

  return (
    <motion.div style={{ background: bgColor } as unknown as React.CSSProperties}>
      {children}
    </motion.div>
  );
}
