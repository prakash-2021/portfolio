"use client";

import { useRef, useState, useCallback, useMemo, useEffect, memo } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { useScrollProgress } from "@/lib/scroll-provider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { site } from "@/lib/site";
import { Mascot } from "@/components/mascot/Mascot";
import { HalftoneCorner, SpeedLines } from "@/components/comic/ComicElements";
import { cn } from "@/lib/cn";
import styles from "./HeroSection.module.scss";

const traits = [
  "Product thinker",
  "Animation nerd",
  "System designer",
  "UX obsessive",
  "Problem solver",
];

/* ─── CROP MARKS ──────────────────────────────────────────── */

function CropMarks() {
  return (
    <>
      {/* Top-left */}
      <div className={cn(styles.cropMark, "top-3 left-3")}>
        <div className={cn(styles.cropMarkLine, "w-3 h-px")} />
        <div className={cn(styles.cropMarkLine, "w-px h-3")} />
      </div>
      {/* Top-right */}
      <div className={cn(styles.cropMark, "top-3 right-3")}>
        <div className={cn(styles.cropMarkLine, "w-3 h-px ml-auto")} />
        <div className={cn(styles.cropMarkLine, "w-px h-3 ml-auto")} />
      </div>
      {/* Bottom-left */}
      <div className={cn(styles.cropMark, "bottom-3 left-3")}>
        <div className={cn(styles.cropMarkLine, "w-3 h-px")} />
        <div className={cn(styles.cropMarkLine, "w-px h-3")} />
      </div>
      {/* Bottom-right */}
      <div className={cn(styles.cropMark, "bottom-3 right-3")}>
        <div className={cn(styles.cropMarkLine, "w-3 h-px ml-auto")} />
        <div className={cn(styles.cropMarkLine, "w-px h-3 ml-auto")} />
      </div>
    </>
  );
}

/* ─── REGISTRATION MARK ───────────────────────────────────── */

function RegMark({ className }: { className?: string }) {
  return (
    <svg
      className={cn(styles.regMark, className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <circle className={styles.regCircle} cx="8" cy="8" r="6" />
      <circle className={styles.regCircle} cx="8" cy="8" r="3" />
      <line className={styles.regCross} x1="0" y1="8" x2="16" y2="8" />
      <line className={styles.regCross} x1="8" y1="0" x2="8" y2="16" />
    </svg>
  );
}

/* ─── PRAKASH WORD ───────────────────────────────────────── */

function PrakashWord() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const letters = "PRAKASH";

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (reduced) {
    return <span className={styles.prakashWord}>{letters}</span>;
  }

  return (
    <span
      className={styles.prakashWord}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {letters.split("").map((char, i) => {
        const isAsh = i >= 4;
        return (
          <motion.span
            key={i}
            className={styles.prakashLetter}
            initial={{ opacity: 0, y: 30 }}
            animate={
              !mounted
                ? { opacity: 0, y: 30 }
                : hovered
                  ? {
                      opacity: 1,
                      y: isAsh ? -3 : -1,
                      color: isAsh ? "var(--color-red)" : "var(--color-ink)",
                    }
                  : { opacity: 1, y: 0, color: "var(--color-ink)" }
            }
            transition={{
              duration: hovered ? 0.25 : 0.4,
              delay: hovered ? i * 0.025 : 0.3 + 0.03 * i,
              ease: "easeOut",
            }}
          >
            {char}
          </motion.span>
        );
      })}
      {hovered && <AshParticles />}
    </span>
  );
}

/* ─── ASH PARTICLES ──────────────────────────────────────── */

function AshParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: `${20 + Math.random() * 50}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${3 + Math.random() * 2}s`,
      })),
    [],
  );

  return (
    <span className={styles.ashParticles} aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className={styles.ashParticle}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </span>
  );
}

/* ─── SCROLL INDICATOR ─────────────────────────────────── */

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.6 }}
    >
      <span
        className="text-[0.4rem] font-bold tracking-[0.2em] uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        Scroll to begin
      </span>
      <motion.svg
        width="14"
        height="20"
        viewBox="0 0 14 20"
        fill="none"
        animate={{ y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <path
          d="M7 2v12M2 9l5 5 5-5"
          stroke="var(--color-ink)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.15"
        />
      </motion.svg>
    </motion.div>
  );
}

function CaseFileMugshot() {
  return (
    <motion.div
      className={cn(
        styles.mugshot,
        "hidden md:flex absolute right-[8%] top-[18%]",
      )}
      initial={{ opacity: 0, rotate: -3, scale: 0.92 }}
      animate={{ opacity: 1, rotate: -2, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className={styles.mugshotTape} />
      <div className={styles.mugshotInner}>
        <div className={styles.mugshotImage}>
          <Mascot size={48} action="sit" className="opacity-70" />
        </div>
        <div className={styles.mugshotFooter}>
          <span className={styles.mugshotId}>ID: DEV-001</span>
          <span className={styles.mugshotStatus}>CLASSIFIED</span>
        </div>
      </div>
      <svg
        className={styles.mugshotClip}
        width="12"
        height="28"
        viewBox="0 0 12 28"
        fill="none"
      >
        <path
          d="M2 2v20a4 4 0 008 0V6a2 2 0 00-4 0v16"
          stroke="var(--color-ink)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
      </svg>
    </motion.div>
  );
}

/* ─── HERO SECTION ────────────────────────────────────────── */

export const HeroSection = memo(function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScrollProgress();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -30]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.025, 0.05]);

  /* ── Mouse tracking (throttled) ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseRAF = useRef<number>(0);
  const mouseRect = useRef({ left: 0, width: 1, top: 0, height: 1 });
  const mouseNeedsRect = useRef(true);
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (mouseRAF.current) return;
      mouseRAF.current = requestAnimationFrame(() => {
        mouseRAF.current = 0;
        if (mouseNeedsRect.current && ref.current) {
          mouseRect.current = ref.current.getBoundingClientRect();
          mouseNeedsRect.current = false;
          setTimeout(() => {
            mouseNeedsRect.current = true;
          }, 300);
        }
        const r = mouseRect.current;
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      });
    },
    [mouseX, mouseY],
  );

  const nameX = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const nameY = useTransform(mouseY, [-0.5, 0.5], [-5, 5]);
  const surnameX = useTransform(mouseX, [-0.5, 0.5], [6, -6]);

  /* ── Mascot once ── */
  const mascotAction = "sit";

  return (
    <motion.section
      ref={ref}
      data-chapter={0}
      data-chapter-id="hero"
      className={cn("px-6 sm:px-10", styles.hero)}
      style={{ opacity: heroOpacity } as unknown as React.CSSProperties}
      onMouseMove={onMouseMove}
    >
      {/* ── Background layers ── */}
      <motion.div
        className={styles.blueprintGrid}
        style={{ opacity: bgOpacity } as unknown as React.CSSProperties}
      />
      <div className={styles.halftoneBg} />
      <CropMarks />
      <RegMark className="top-6 left-6" />
      <RegMark className="bottom-6 right-6" />

      {/* Blueprint background — no editorial objects */}

      {/* Watermark text — printed feel */}
      <div className={styles.watermarkLayer}>
        <span className={styles.watermarkText}>CASE FILE</span>
        <span
          className={cn(styles.watermarkText, styles.watermarkConfidential)}
        >
          CONFIDENTIAL
        </span>
      </div>

      {/* Issue details — larger, more visible */}
      <div
        className={styles.issueLabel}
        style={{ bottom: "2rem", left: "2rem" }}
      >
        ISSUE #001 · BUILD 2.4.1
      </div>
      <div className={styles.issueLabel} style={{ top: "1rem", left: "50%" }}>
        COORD 28.58°N 77.33°E · CLASSIFIED
      </div>

      <CaseFileMugshot />

      <HalftoneCorner className="top-0 right-0" />
      <HalftoneCorner className="bottom-0 left-0 rotate-180" />
      <SpeedLines />

      {/* Mascot with idle changes */}
      <Mascot
        className="absolute bottom-6 right-6 sm:right-10 animate-drift opacity-60 hover:opacity-100 transition-opacity"
        size={36}
        action={mascotAction}
      />

      <div className="w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: PRAKASH */}
          <motion.div
            className="md:col-span-7 relative"
            style={{ y, x: nameX } as unknown as React.CSSProperties}
          >
            <motion.h1
              className="text-[clamp(3.5rem,12vw,9rem)] font-black leading-[0.8] tracking-[-0.05em] select-none"
              style={{ color: "var(--color-ink)" }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <PrakashWord />
            </motion.h1>

            <motion.div
              className="hidden md:block absolute -right-6 top-0 w-[3px] bg-red/60"
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ height: "120%" }}
            />
          </motion.div>

          {/* Right: SHRESTHA + title */}
          <motion.div
            className="md:col-span-5 md:pl-6"
            style={
              {
                y: useTransform(
                  scrollYProgress,
                  [0, 1],
                  [0, reduced ? 0 : -20],
                ),
                x: surnameX,
              } as unknown as React.CSSProperties
            }
          >
            <motion.h2
              className="text-[clamp(1.8rem,5vw,4rem)] font-black leading-[0.85] tracking-[-0.06em] select-none"
              style={{ color: "var(--color-ink)" }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {"SHRESTHA".split("").map((c, i) => (
                <motion.span
                  key={i}
                  className={styles.nameLetter}
                  style={{ color: "var(--color-ink)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + 0.03 * i }}
                  whileHover={{
                    y: -4,
                    color: "var(--color-blue)",
                    transition: { duration: 0.15 },
                  }}
                >
                  {c}
                </motion.span>
              ))}
            </motion.h2>

            {/* Title label box */}
            <motion.div
              className="mt-4 inline-block border-2 px-4 py-2"
              style={{
                borderColor: "var(--border-strong)",
                background: "var(--surface-card)",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <span
                className="text-xs sm:text-sm font-bold tracking-[0.15em] uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                Full Stack Engineer
              </span>
            </motion.div>

            {/* Personality traits */}
            <motion.div
              className="mt-6 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {traits.map((t, i) => (
                <motion.span
                  key={t}
                  className="text-[0.6rem] sm:text-[0.65rem] px-2.5 py-1 border font-medium cursor-default"
                  style={{
                    borderColor: "var(--border-default)",
                    color: "var(--text-secondary)",
                    background: "var(--surface-hover)",
                  }}
                  whileHover={{
                    y: -2,
                    borderColor: "var(--color-red)",
                    color: "var(--color-red)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA links */}
            <motion.div
              className="mt-8 flex gap-6 flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              {[
                { label: "Resume →", href: site.links.resume, important: true },
                { label: "GitHub →", href: site.links.github },
                { label: "LinkedIn →", href: site.links.linkedin },
              ].map((l) => (
                <CTA
                  key={l.label}
                  label={l.label}
                  href={l.href}
                  important={l.important}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom caption */}
        <motion.div
          className="mt-12 md:mt-16 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <div
            className="h-px flex-1"
            style={{ background: "var(--border-default)" }}
          />
          <span
            className="text-[0.55rem] font-bold tracking-[0.2em] uppercase"
            style={{ color: "var(--text-tertiary)" }}
          >
            Building products that people love
          </span>
          <div
            className="h-px flex-1"
            style={{ background: "var(--border-default)" }}
          />
        </motion.div>
      </div>

      <ScrollIndicator />
    </motion.section>
  );
});

/* ─── CTA LINK ────────────────────────────────────────────── */

const CTA = memo(function CTA({
  label,
  href,
  important,
}: {
  label: string;
  href: string;
  important?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-link
      className={cn(
        styles.ctaWrap,
        "text-[0.65rem] font-bold tracking-[0.15em] uppercase cursor-pointer",
        important
          ? "text-red border-2 border-red/20 bg-red/[0.03] px-3 py-1.5"
          : "",
      )}
      style={
        important
          ? {
              boxShadow: hovered
                ? "2px 2px 0 rgba(var(--accent-rgb), 0.2)"
                : "none",
            }
          : { color: "var(--text-secondary)" }
      }
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={important ? { y: -2 } : undefined}
      whileTap={{ scale: 0.95 }}
    >
      {important && (
        <motion.span className="absolute -top-1 -right-1 text-[0.4rem] text-red/30">
          ◆
        </motion.span>
      )}
      <motion.div
        className={styles.ctaUnderline}
        initial={{ scaleX: 0 }}
        animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <motion.div
        className={styles.ctaInk}
        animate={
          hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.3 }}
      />
      <motion.span
        animate={
          hovered
            ? { x: 3, color: "var(--color-red)" }
            : {
                x: 0,
                color: important
                  ? "var(--color-red)"
                  : "rgba(var(--ink-rgb), 0.7)",
              }
        }
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
});
