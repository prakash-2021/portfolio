"use client";

import { motion } from "framer-motion";
import { useInView } from "motion/react";
import { useRef } from "react";

export function FadeIn({ children, className, delay = 0, y = 20 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
