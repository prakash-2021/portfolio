"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/cn";
import styles from "./EditionSwitch.module.scss";

export function EditionSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isMidnight = theme === "midnight";
  const [hovered, setHovered] = useState(false);
  const [state, setState] = useState<"idle" | "prep" | "flipOut" | "flipIn" | "settle">("idle");
  const [wobblePhase, setWobblePhase] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [sweep, setSweep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const comicRef = useRef<HTMLButtonElement>(null);
  const stickyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasInteracted = localStorage.getItem("edition-interacted");
    if (!hasInteracted) {
      stickyTimerRef.current = setTimeout(() => setShowSticky(true), 4000);
    }
    return () => {
      if (stickyTimerRef.current) clearTimeout(stickyTimerRef.current);
    };
  }, []);

  const markInteracted = useCallback(() => {
    localStorage.setItem("edition-interacted", "true");
    setShowSticky(false);
  }, []);

  const clearTimers = useCallback(() => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  }, []);

  const handleClick = useCallback(() => {
    if (state !== "idle") return;
    markInteracted();
    setState("prep");
    timerRef.current = [
      setTimeout(() => setState("flipOut"), 100),
      setTimeout(() => { toggleTheme(); setState("flipIn"); }, 260),
      setTimeout(() => setState("settle"), 420),
      setTimeout(() => { setState("idle"); clearTimers(); }, 580),
    ];
  }, [state, toggleTheme, clearTimers, markInteracted]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const idle = state === "idle";

  /* ── Idle wobble every 8–10s ── */
  useEffect(() => {
    if (!idle) return;
    let tid: ReturnType<typeof setTimeout>;
    const go = () => {
      const delay = 8000 + Math.random() * 4000;
      tid = setTimeout(() => {
        setWobblePhase(1);
        setTimeout(() => setWobblePhase(2), 250);
        setTimeout(() => setWobblePhase(3), 500);
        setTimeout(() => setWobblePhase(0), 700);
        go();
      }, delay);
    };
    go();
    return () => clearTimeout(tid);
  }, [idle]);

  /* ── Light sweep every 12s ── */
  useEffect(() => {
    if (!idle) return;
    const interval = setInterval(() => setSweep((p) => p + 1), 12000);
    return () => clearInterval(interval);
  }, [idle]);

  /* ── Dismiss sticky on interaction ── */
  useEffect(() => {
    if (state !== "idle" || hovered) {
      if (stickyTimerRef.current) { clearTimeout(stickyTimerRef.current); stickyTimerRef.current = null; }
      setShowSticky(false);
    }
  }, [state, hovered]);

  /* ── Mouse proximity ──
   * The switch is fixed in a corner, so the rect only moves on resize. Values
   * are rounded before hitting state: the tilt is +-3deg, so anything finer
   * than 1/64th of the range is sub-pixel and only costs a re-render. */
  const [prox, setProx] = useState({ x: 0, y: 0, active: false });
  const proxRaf = useRef(0);
  const proxRef = useRef(prox);
  const stateRef = useRef(state);
  useEffect(() => { proxRef.current = prox; }, [prox]);
  useEffect(() => { stateRef.current = state; }, [state]);

  useEffect(() => {
    let rect: DOMRect | null = null;
    const invalidate = () => { rect = null; };

    const deactivate = () => {
      if (proxRef.current.active) setProx((p) => ({ ...p, active: false }));
    };

    const onMove = (e: MouseEvent) => {
      if (stateRef.current !== "idle" || !comicRef.current) {
        deactivate();
        return;
      }
      if (proxRaf.current) return;
      const px = e.clientX, py = e.clientY;
      proxRaf.current = requestAnimationFrame(() => {
        proxRaf.current = 0;
        const el = comicRef.current;
        if (!el) return;
        if (!rect) rect = el.getBoundingClientRect();
        const dx = px - (rect.left + rect.width / 2);
        const dy = py - (rect.top + rect.height / 2);
        if (dx * dx + dy * dy < 120 * 120) {
          const x = Math.round((dx / 120) * 64) / 64;
          const y = Math.round((dy / 120) * 64) / 64;
          const cur = proxRef.current;
          if (!cur.active || cur.x !== x || cur.y !== y) setProx({ x, y, active: true });
        } else {
          deactivate();
        }
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
      cancelAnimationFrame(proxRaf.current);
      proxRaf.current = 0;
    };
  }, []);

  const isAnimating = state !== "idle";

  const getAnim = () => {
    if (state === "prep") return { y: -16, rotate: 0, scale: 1.06, rotateY: 0 };
    if (state === "flipOut") return { y: -16, rotate: -3, scale: 1.06, rotateY: 75 };
    if (state === "flipIn") return { y: -12, rotate: 1, scale: 1.03, rotateY: 0 };
    if (state === "settle") return { y: -5, rotate: -1, scale: 1, rotateY: 0 };
    if (hovered) return { y: -8, rotate: 0, scale: 1.05, rotateY: 0 };
    if (wobblePhase === 1) return { y: -3, rotate: -3.8, scale: 1.015, rotateY: 0 };
    if (wobblePhase === 2) return { y: -1.5, rotate: -2.4, scale: 1.008, rotateY: 0 };
    if (wobblePhase === 3) return { y: -0.5, rotate: -3, scale: 1, rotateY: 0 };
    return { y: [0, -1, 0], rotate: [-3, -2.6, -3], scale: 1, rotateY: 0 };
  };

  const getTrans = () => {
    if (state === "prep" || state === "flipOut") return { duration: 0.16, ease: [0.25, 0.1, 0.25, 1] as const };
    if (state === "flipIn") return { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] as const };
    if (state === "settle") return { duration: 0.16, ease: [0.65, 0, 0.35, 1] as const };
    if (hovered || wobblePhase !== 0) return { duration: 0.22, ease: "easeOut" };
    return {
      y: { duration: 3.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" as const },
      rotate: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" as const },
    };
  };

  return (
    <m.div
      className={cn(styles.root, isMidnight && styles.rootMidnight)}
      onMouseEnter={() => { if (idle) setHovered(true); if (stickyTimerRef.current) { clearTimeout(stickyTimerRef.current); stickyTimerRef.current = null; } setShowSticky(false); }}
      onMouseLeave={() => setHovered(false)}
      initial={{ y: 40, opacity: 0 }}
      animate={mounted ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Sticky note — first visit, after 4s idle */}
      <AnimatePresence>
        {showSticky && (
          <m.div
            className={styles.stickyNote}
            initial={{ opacity: 0, x: -8, rotate: -2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -8, rotate: -2 }}
            transition={{ duration: 0.35 }}
          >
            <div className={styles.stickyPin} />
            <span className={styles.stickyText}>→ Flip the Issue</span>
          </m.div>
        )}
      </AnimatePresence>

      {/* Hover tooltip — printed comic style */}
      <AnimatePresence>
        {hovered && idle && !showSticky && (
          <m.div
            className={styles.tooltip}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
          >
            <span className={styles.tooltipArrow}>└─</span>
            <span className={styles.tooltipText}>
              <span className={styles.tooltipLabel}>click to</span>{" "}
              {isMidnight ? "flip to Print" : "flip to Midnight"}
            </span>
          </m.div>
        )}
      </AnimatePresence>

      {/* Proximity tilt wrapper */}
      <m.div
        animate={idle && prox.active && !hovered ? {
          rotateX: prox.y * -3,
          rotateY: prox.x * 3,
        } : { rotateX: 0, rotateY: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {/* Shadow */}
        <m.div
          className={styles.shadow}
          animate={{
            opacity: hovered || isAnimating ? 0.18 : wobblePhase !== 0 ? 0.09 : 0.05,
            scale: hovered || isAnimating ? 1.35 : wobblePhase !== 0 ? 1.12 : 1,
            x: prox.active && !hovered ? prox.x * 5 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Light sweep overlay */}
        <m.div
          className={styles.lightSweep}
          key={sweep}
          initial={{ left: "-30%", opacity: 0 }}
          animate={{ left: "130%", opacity: [0, 0.1, 0] }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          aria-hidden
        />

        {/* Comic book button */}
        <m.button
          ref={comicRef}
          className={cn(styles.comic, isMidnight && styles.comicMidnight)}
          onClick={handleClick}
          disabled={isAnimating}
          aria-label="Switch between Print Edition and Midnight Edition"
          onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && idle) handleClick(); }}
          animate={getAnim()}
          transition={getTrans() as any}
          style={{ perspective: 600, transformStyle: "preserve-3d" }}
          data-cursor-theme
        >
          {/* Tape */}
          <m.div
            className={styles.tape}
            animate={hovered ? { rotate: -6 } : { rotate: -2 }}
            transition={{ duration: 0.25 }}
          />

          {/* Folded corner */}
          <m.div
            className={styles.foldedCorner}
            animate={
              hovered ? { borderWidth: "0 0 14px 14px" } as any
                : wobblePhase !== 0 ? { borderWidth: "0 0 12px 12px" } as any
                : { borderWidth: "0 0 10px 10px" } as any
            }
            transition={{ duration: 0.2 }}
          />

          {/* Paper clip */}
          <svg className={styles.paperClip} width="8" height="18" viewBox="0 0 8 18" fill="none" aria-hidden>
            <path d="M2 2v12a2 2 0 004 0V6a1 1 0 00-2 0v8" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" fill="none" />
          </svg>

          <span className={styles.issue}>#001</span>

          <span className={styles.edition}>{isMidnight ? "MIDNIGHT" : "PRINT"}</span>
          <span className={styles.editionSub}>EDITION</span>

          <div className={styles.coverDeco}>
            {isMidnight ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.25" />
                <circle cx="9" cy="9" r="2.5" fill="currentColor" opacity="0.12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.25" />
                <circle cx="11.5" cy="6.5" r="1.8" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.15" />
              </svg>
            )}
          </div>

          <div className={styles.microDetails}>
            <span className={styles.barcode}>▌▌▌▌▌▌</span>
            <span className={styles.price}>$0.00</span>
            <span className={styles.classMark}>✦</span>
          </div>
        </m.button>
      </m.div>
    </m.div>
  );
}
