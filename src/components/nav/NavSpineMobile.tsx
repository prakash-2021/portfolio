"use client";

import { useRef, useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import styles from "./NavSpineMobile.module.scss";

const chapters = [
  { id: "hero", issue: "01", label: "Cover" },
  { id: "origin", issue: "02", label: "Origin" },
  { id: "projects", issue: "03", label: "Archive" },
  { id: "toolkit", issue: "04", label: "Toolkit" },
  { id: "experience", issue: "05", label: "Experience" },
  { id: "education", issue: "06", label: "Education" },
  { id: "contact", issue: "07", label: "Connect" },
];

let lenisInstance: { scrollTo: (target: string | number, opts?: any) => void } | null = null;

export function setLenisMobile(l: typeof lenisInstance) {
  lenisInstance = l;
}

export const NavSpineMobile = memo(function NavSpineMobile() {
  const [activeIdx, setActiveIdx] = useState(0);
  const prevActive = useRef(0);

  useEffect(() => {
    const els = document.querySelectorAll("[data-chapter]");
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        let bestIdx = prevActive.current;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            const idx = Number(entry.target.getAttribute("data-chapter"));
            if (!isNaN(idx) && entry.intersectionRatio > 0.3) {
              bestRatio = entry.intersectionRatio;
              bestIdx = idx;
            }
          }
        }
        prevActive.current = bestIdx;
        setActiveIdx(bestIdx);
      },
      { threshold: [0.3] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(`[data-chapter-id="${id}"]`);
    if (el && lenisInstance) {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY - 80;
      lenisInstance.scrollTo(top, {
        duration: 0.3,
        easing: (t: number) => t,
      });
    }
  };

  return (
    <nav className={styles.root}>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          animate={{ width: `${(activeIdx / (chapters.length - 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
        />
      </div>
      <div className={styles.nodes}>
        {chapters.map((ch, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={ch.id}
              className={cn(styles.node, isActive && styles.nodeActive)}
              onClick={() => scrollTo(ch.id)}
              aria-label={`Scroll to ${ch.label}`}
              data-cursor-nav
            >
              <span className={cn(styles.issueNum, isActive && styles.issueNumActive)}>
                {ch.issue}
              </span>
              <div className={styles.dash} />
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.span
                    className={styles.label}
                    initial={{ opacity: 0, x: 6, filter: "blur(3px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -6, filter: "blur(3px)" }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    {ch.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}

      </div>
    </nav>
  );
});