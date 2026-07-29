"use client";

import { useRef, useState, useEffect, useCallback, memo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/lib/scroll-provider";
import { cn } from "@/lib/cn";
import styles from "./NavSpine.module.scss";

interface Chapter {
  id: string;
  issue: string;
  label: string;
}

const chapters: Chapter[] = [
  { id: "hero", issue: "01", label: "Cover" },
  { id: "origin", issue: "02", label: "Origin" },
  { id: "projects", issue: "03", label: "Archive" },
  { id: "toolkit", issue: "04", label: "Toolkit" },
  { id: "experience", issue: "05", label: "Experience" },
  { id: "education", issue: "06", label: "Education" },
  { id: "contact", issue: "07", label: "Next Mission" },
];

export const NavSpine = memo(function NavSpine() {
  const reduced = useReducedMotion();
  const { lenis } = useScrollProgress();
  const [activeIdx, setActiveIdx] = useState(0);
  const [navHovered, setNavHovered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);
  const prevActiveIdx = useRef(0);

  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const els = document.querySelectorAll("[data-chapter]");
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        let bestIdx = prevActiveIdx.current;
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
        if (bestIdx !== prevActiveIdx.current) {
          prevActiveIdx.current = bestIdx;
          activeIdxRef.current = bestIdx;
          setActiveIdx(bestIdx);
        }
      },
      { threshold: [0.3, 0.6] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    progress.set(activeIdx / (chapters.length - 1));
  }, [activeIdx, progress]);

  const pct = (i: number) => `${(i / (chapters.length - 1)) * 100}%`;

  const scrollTo = useCallback((id: string, idx: number) => {
    const el = document.querySelector(`[data-chapter-id="${id}"]`);
    if (el) {
      setClickedIdx(idx);
      setTimeout(() => setClickedIdx(null), 500);
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      if (lenis) {
        lenis.scrollTo(top, {
          duration: reduced ? 0 : 0.3,
          easing: (t: number) => t,
        });
      } else {
        window.scrollTo({ top, behavior: reduced ? "instant" : "smooth" });
      }
    }
  }, [reduced, lenis]);

  return (
    <nav
      ref={rootRef}
      className={cn(styles.root, navHovered && styles.rootHovered, clickedIdx !== null && styles.rootClicked)}
      onMouseEnter={() => setNavHovered(true)}
      onMouseLeave={() => {
        setNavHovered(false);
        setHoveredIdx(null);
      }}
    >
      <motion.div
        className={styles.paperBg}
        animate={{ opacity: navHovered ? 0.55 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      <div className={styles.inkTrack}>
        <motion.div
          className={styles.inkStroke}
          style={{ scaleY: springProgress, originY: 0 }}
        />
      </div>

      <div className={styles.items}>
        {chapters.map((ch, i) => {
          const isActive = i === activeIdx;
          const isHovered = i === hoveredIdx;
          const isClicked = i === clickedIdx;
          const showLabel = navHovered || isActive;

          return (
            <div
              key={ch.id}
              className={cn(
                styles.item,
                isActive && styles.itemActive,
                isHovered && navHovered && styles.itemHovered,
                isClicked && styles.itemClicked,
                !isActive && !navHovered && styles.itemQuiet
              )}
              style={{ top: pct(i) }}
              onClick={() => scrollTo(ch.id, i)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              role="button"
              tabIndex={0}
              aria-label={`Scroll to ${ch.label}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") scrollTo(ch.id, i);
              }}
              data-cursor-nav
            >
              <div className={styles.itemInner}>
                {isActive ? (
                  <div className={styles.activeContent}>
                    <div className={styles.connectorTop} />
                    <span className={styles.activeLabel}>
                      {ch.label}
                      <div className={styles.labelUnderline} />
                    </span>
                    <div className={styles.connectorBottom} />
                    <span className={styles.activeIssue}>
                      {ch.issue}
                    </span>
                    <div className={styles.paperHighlight} />
                  </div>
                ) : (
                  <>
                    <span className={cn(styles.issueNum, (isHovered && navHovered) && styles.issueNumHovered)}>
                      {ch.issue}
                    </span>

                    <div className={cn(styles.horzLine, (isHovered && navHovered) && styles.horzLineHovered)} />

                    {showLabel && (
                      <span className={styles.itemLabel}>
                        {ch.label}
                      </span>
                    )}

                    {isHovered && navHovered && (
                      <span className={styles.hoverArrow}>→</span>
                    )}
                  </>
                )}
              </div>

              {isHovered && navHovered && !isActive && (
                <div className={styles.paperShadow} />
              )}

              {isClicked && (
                <div className={styles.flash} />
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.editorialDetails}>
        <span className={styles.editorialMark}>◆</span>
        <span className={styles.editorialMark}>◈</span>
      </div>
    </nav>
  );
});