"use client";

import { useRef, useEffect, useMemo } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { useReducedMotionRef } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/lib/scroll-provider";
import { cn } from "@/lib/cn";
import { useTheme } from "@/lib/theme-context";
import styles from "./CursorSystem.module.scss";

type CursorMode = "default" | "text" | "button" | "card" | "toolkit" | "nav" | "input" | "link";

const MODE_CONFIG: Record<CursorMode, { scale: number; accent: string; shape: "circle" | "square" | "line" }> = {
  default: { scale: 1, accent: "var(--color-ink)", shape: "circle" },
  text:    { scale: 0.6, accent: "var(--color-ink)", shape: "line" },
  button:  { scale: 1.35, accent: "var(--color-red)", shape: "circle" },
  card:    { scale: 1.5, accent: "var(--color-red)", shape: "square" },
  toolkit: { scale: 1.2, accent: "var(--color-blue)", shape: "circle" },
  nav:     { scale: 0.8, accent: "var(--color-ink)", shape: "square" },
  input:   { scale: 0.7, accent: "var(--color-red)", shape: "line" },
  link:    { scale: 1.15, accent: "var(--color-red)", shape: "circle" },
};

function getCursorMode(el: Element): CursorMode {
  const tag = el.tagName.toLowerCase();
  if (el.hasAttribute("data-cursor-text")) return "text";
  if (el.hasAttribute("data-cursor-card")) return "card";
  if (el.hasAttribute("data-cursor-toolkit")) return "toolkit";
  if (el.hasAttribute("data-cursor-nav")) return "nav";
  if (el.hasAttribute("data-cursor-input")) return "input";
  if (el.hasAttribute("data-cursor-link")) return "link";
  if (tag === "button" || el.getAttribute("role") === "button") return "button";
  if (tag === "a" || tag === "input" || tag === "textarea") return "button";
  const interactive = el.closest("button, a, [role='button'], [data-cursor-card], [data-cursor-toolkit], [data-cursor-nav], [data-cursor-link], [data-cursor-input]");
  if (interactive) return getCursorMode(interactive);
  const isText = el.closest("p, h1, h2, h3, h4, h5, h6, span, label, li");
  if (isText) return "text";
  return "default";
}

const MAGNET_MODES: Set<CursorMode> = new Set(["button", "card", "toolkit", "nav", "link"]);
const MAGNET_STRENGTH = 6;

function getMagnetTarget(el: Element): Element | null {
  const mode = getCursorMode(el);
  if (!MAGNET_MODES.has(mode)) return null;
  if (el.hasAttribute("data-cursor-card") || el.hasAttribute("data-cursor-toolkit") || el.hasAttribute("data-cursor-nav") || el.hasAttribute("data-cursor-link")) return el;
  if (el.tagName === "BUTTON" || el.getAttribute("role") === "button" || el.tagName === "A") return el;
  return el.closest("button, a, [role='button'], [data-cursor-card], [data-cursor-toolkit], [data-cursor-nav], [data-cursor-link]");
}

const CURSOR_SIZE = 16;

export function CursorSystem() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<CursorMode>("default");
  const magnetRef = useRef<Element | null>(null);
  const defaultAccent = useRef("var(--color-ink)");
  const isMidnightRef = useRef(false);
  const { theme } = useTheme();
  const isReduced = useReducedMotionRef();

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const mScale = useMotionValue(1);
  const mOpacity = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 350, damping: 28, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 350, damping: 28, mass: 0.5 });

  const rAF = useRef<number>(0);
  const running = useRef(false);
  const idleFrames = useRef(0);
  const clickScale = useRef(1);
  const lastFrame = useRef({ x: 0, y: 0, s: 0, o: -1 });
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isVisible = useRef(true);
  const isTouchDevice = useRef(false);
  const { lenis } = useScrollProgress();

  /* ── rAF render loop ──
   * Parks itself once the springs settle and nothing has changed, and is woken
   * again by any input that mutates a motion value. Without this it repaints
   * the cursor 60x/sec for the entire session, competing with scroll. */
  const wake = useMemo(() => {
    const render = () => {
      const el = cursorRef.current;
      const x = sx.get();
      const y = sy.get();

      if (el && !(x === -100 && y === -100)) {
        const s = (isReduced.current ? 1 : mScale.get()) * clickScale.current;
        const o = isReduced.current || !isVisible.current ? 0 : Math.max(0, Math.min(1, mOpacity.get()));
        const prev = lastFrame.current;

        if (x !== prev.x || y !== prev.y || s !== prev.s) {
          el.style.transform = `translate3d(${x - CURSOR_SIZE / 2}px, ${y - CURSOR_SIZE / 2}px, 0) scale(${s})`;
        }
        if (o !== prev.o) el.style.opacity = String(o);

        const settled = x === prev.x && y === prev.y && s === prev.s && o === prev.o;
        idleFrames.current = settled ? idleFrames.current + 1 : 0;
        prev.x = x; prev.y = y; prev.s = s; prev.o = o;
      } else {
        idleFrames.current++;
      }

      if (idleFrames.current > 4) {
        running.current = false;
        rAF.current = 0;
        return;
      }
      rAF.current = requestAnimationFrame(render);
    };

    return () => {
      idleFrames.current = 0;
      if (running.current || isTouchDevice.current) return;
      running.current = true;
      rAF.current = requestAnimationFrame(render);
    };
  }, [sx, sy, mScale, mOpacity, isReduced]);

  useEffect(() => {
    if (isTouchDevice.current) return;
    wake();
    return () => {
      cancelAnimationFrame(rAF.current);
      running.current = false;
    };
  }, [wake]);

  /* ── Mouse handler (optimized with passive listeners) ── */
  useEffect(() => {
    if (isTouchDevice.current) return;

    let rectCache = { left: 0, width: 1, top: 0, height: 1 };
    let rectOwner: Element | null = null;
    let rectStale = true;
    const invalidateRect = () => { rectStale = true; };

    /* getCursorMode/getMagnetTarget walk the ancestor chain with closest();
     * the pointer sits on the same element for most of a gesture, so resolve
     * once per element rather than once per mousemove event. */
    let lastTarget: Element | null = null;
    let lastMode: CursorMode = "default";
    let lastMagnet: Element | null = null;

    const handleMouse = (e: MouseEvent) => {
      mOpacity.set(1);
      wake();

      const target = e.target as Element;
      if (target !== lastTarget) {
        lastTarget = target;
        lastMode = getCursorMode(target);
        lastMagnet = getMagnetTarget(target);
      }
      const mode = lastMode;
      if (mode !== modeRef.current) {
        modeRef.current = mode;
        const cfg = MODE_CONFIG[mode];
        mScale.set(cfg.scale);
        cursorRef.current?.setAttribute("data-shape", cfg.shape);
        cursorRef.current?.style.setProperty("--cursor-accent", mode === "default" ? defaultAccent.current : cfg.accent);
      }

      const newMagnet = lastMagnet;
      magnetRef.current = newMagnet;
      let mxVal = e.clientX;
      let myVal = e.clientY;
      if (newMagnet) {
        if (rectStale || newMagnet !== rectOwner) {
          rectCache = newMagnet.getBoundingClientRect();
          rectOwner = newMagnet;
          rectStale = false;
        }
        const cx = rectCache.left + rectCache.width / 2;
        const cy = rectCache.top + rectCache.height / 2;
        const dx = cx - e.clientX;
        const dy = cy - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < 60) {
          const pull = Math.min(MAGNET_STRENGTH, dist * 0.15);
          mxVal = e.clientX + (dx / dist) * pull;
          myVal = e.clientY + (dy / dist) * pull;
        }
      }

      mx.set(mxVal);
      my.set(myVal);
    };

    const handleLeave = () => { mOpacity.set(0); wake(); };

    /* Folded into the rAF transform instead of string-patching el.style.transform,
     * which raced the loop rewriting that same property every frame. */
    let clickTimer: ReturnType<typeof setTimeout> | undefined;
    const handleClick = () => {
      clickScale.current = 0.85;
      wake();
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        clickScale.current = 1;
        wake();
      }, 120);
    };

    document.addEventListener("mousemove", handleMouse, { passive: true });
    document.addEventListener("mouseleave", handleLeave, { passive: true });
    document.addEventListener("mousedown", handleClick, { passive: true });
    window.addEventListener("scroll", invalidateRect, { passive: true });
    window.addEventListener("resize", invalidateRect, { passive: true });
    return () => {
      document.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("scroll", invalidateRect);
      window.removeEventListener("resize", invalidateRect);
      clearTimeout(clickTimer);
    };
  }, [mx, my, mScale, mOpacity, wake]);

  /* ── Scroll dim (via Lenis) ── */
  useEffect(() => {
    if (!lenis?.on) return;
    const handleScroll = () => {
      mOpacity.set(0.5);
      mScale.set(0.92);
      wake();
      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        mOpacity.set(1);
        mScale.set(MODE_CONFIG[modeRef.current].scale);
        wake();
      }, 150);
    };
    const unsub = lenis.on('scroll', handleScroll);
    return () => { unsub(); clearTimeout(scrollTimer.current); };
  }, [lenis, mOpacity, mScale, wake]);

  /* ── Section accent colors ── */
  useEffect(() => {
    isMidnightRef.current = theme === "midnight";
  }, [theme]);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-chapter]");
    if (!sections.length) return;

    const sectionColors: Record<string, string> = {
      hero: "var(--color-ink)",
      origin: "var(--color-ink)",
      projects: "var(--color-red)",
      toolkit: "var(--color-blue)",
      experience: "var(--color-purple)",
      education: "var(--color-green)",
      contact: "var(--color-red)",
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-chapter-id");
            if (id && sectionColors[id]) {
              defaultAccent.current = sectionColors[id];
              if (modeRef.current === "default") {
                cursorRef.current?.style.setProperty("--cursor-accent", defaultAccent.current);
              }
            }
            break;
          }
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cursorRef}
      className={styles.cursor}
      data-shape="circle"
      data-theme={theme}
      aria-hidden="true"
      style={{ "--cursor-accent": "var(--color-ink)" } as React.CSSProperties}
    >
      {isMidnightRef.current ? (
        <svg width={16} height={16} viewBox="0 0 16 16" className={styles.cursorSvg}>
          <circle cx={8} cy={8} r={6} fill="none" stroke="var(--color-ink)" strokeWidth="0.5" opacity="0.15" />
          <circle cx={8} cy={8} r={1.5} fill="var(--color-red)" opacity="0.35" />
        </svg>
      ) : (
        <svg width={CURSOR_SIZE} height={CURSOR_SIZE} viewBox={`0 0 ${CURSOR_SIZE} ${CURSOR_SIZE}`} className={styles.cursorSvg}>
          <circle
            cx={CURSOR_SIZE / 2}
            cy={CURSOR_SIZE / 2}
            r={CURSOR_SIZE / 2 - 1}
            fill="none"
            stroke="var(--cursor-accent, #1a1a2e)"
            strokeWidth="1"
            opacity="0.25"
          />
          <circle
            cx={CURSOR_SIZE / 2}
            cy={CURSOR_SIZE / 2}
            r="1.2"
            fill="var(--cursor-accent, #1a1a2e)"
            opacity="0.5"
          />
        </svg>
      )}
    </div>
  );
}
