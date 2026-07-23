"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { site } from "@/lib/site";
import { Mascot } from "@/components/mascot/Mascot";
import { HalftoneCorner, SpeedLines } from "@/components/comic/ComicElements";
import { cn } from "@/lib/cn";
import styles from "./HeroSection.module.scss";

const traits = [
  "Product thinker", "Animation nerd", "System designer",
  "UX obsessive", "Problem solver",
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
    <svg className={cn(styles.regMark, className)} width="16" height="16" viewBox="0 0 16 16">
      <circle className={styles.regCircle} cx="8" cy="8" r="6" />
      <circle className={styles.regCircle} cx="8" cy="8" r="3" />
      <line className={styles.regCross} x1="0" y1="8" x2="16" y2="8" />
      <line className={styles.regCross} x1="8" y1="0" x2="8" y2="16" />
    </svg>
  );
}

/* ─── EDITORIAL OBJECTS ───────────────────────────────────── */

function CoffeeMug({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn(styles.coffeeMug, className)}
      animate={{ rotate: [-0.5, 0.5, -0.5] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    >
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
        <rect x="2" y="4" width="12" height="16" rx="1" stroke="#1a1a2e" strokeWidth="0.8" />
        <path d="M14 8h2a2 2 0 010 4h-2" stroke="#1a1a2e" strokeWidth="0.8" fill="none" />
        <path d="M4 2l1 2" stroke="#1a1a2e" strokeWidth="0.4" />
        <path d="M6 1l1 2" stroke="#1a1a2e" strokeWidth="0.4" />
        {/* Steam */}
        <motion.path
          d="M6 3Q7 1 6 0"
          stroke="#1a1a2e" strokeWidth="0.3" fill="none"
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M9 3Q10 0 9-1"
          stroke="#1a1a2e" strokeWidth="0.3" fill="none"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
        />
      </svg>
    </motion.div>
  );
}

function Pencil({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn(styles.pencil, className)}
      animate={{ rotate: [-1, 1, -1] }}
      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
    >
      <svg width="32" height="6" viewBox="0 0 32 6" fill="none">
        <rect x="6" y="0.5" width="24" height="5" rx="0.5" fill="#1a1a2e" opacity="0.08" />
        <polygon points="6,0.5 3,3 6,5.5" fill="#1a1a2e" opacity="0.12" />
        <rect x="27" y="0.5" width="5" height="5" rx="0.3" fill="#e63946" opacity="0.1" />
      </svg>
    </motion.div>
  );
}

function StickyNote({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn(styles.stickyNote, className)}
      animate={{ y: [-1, 1, -1], rotate: [1.5, 2.5, 1.5] }}
      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
    >
      BUILD v2.4.1
      <br />
      /* deploy notes */
    </motion.div>
  );
}

/* ─── DUST PARTICLES ──────────────────────────────────────── */

function DustParticles() {
  const particles = useRef(
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 1.5,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 3,
    }))
  );

  return (
    <>
      {particles.current.map((p) => (
        <motion.div
          key={p.id}
          className={styles.dust}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.03,
          }}
          animate={{ y: [-6, 6, -6], opacity: [0.01, 0.04, 0.01] }}
          transition={{ repeat: Infinity, duration: p.duration, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </>
  );
}

/* ─── ASH EMBER EFFECT ────────────────────────────────────── */

function AshLetter({ char }: { char: string }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const id = useRef(Math.random().toString(36).slice(2, 6));

  const emberIntensity = hovered ? 1 : 0.5;
  const smokeOpacity = hovered ? 0.12 : 0.06;

  /* ── Delayed start ── */
  useEffect(() => {
    const t = setTimeout(() => setActive(true), 2500 + Math.random() * 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <span
      className={styles.ashWrap}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Warm glow behind letter */}
      <motion.span
        className={styles.ashGlow}
        animate={
          active
            ? {
                background: [
                  "rgba(230,57,70,0.03)",
                  "rgba(230,57,70,0.06)",
                  "rgba(230,57,70,0.03)",
                  "rgba(230,57,70,0.05)",
                  "rgba(230,57,70,0.03)",
                ],
                boxShadow: [
                  "0 0 2px rgba(230,57,70,0.02)",
                  "0 0 4px rgba(230,57,70,0.05)",
                  "0 0 2px rgba(230,57,70,0.02)",
                  "0 0 6px rgba(230,57,70,0.04)",
                  "0 0 2px rgba(230,57,70,0.02)",
                ],
              }
            : { background: "rgba(230,57,70,0)", boxShadow: "0 0 0px rgba(230,57,70,0)" }
        }
        transition={{ repeat: Infinity, duration: 3 + Math.random(), ease: "easeInOut" }}
      />

      {/* Floating ember particles */}
      {active && (
        <>
          {[0, 1, 2].map((j) => (
            <motion.span
              key={j}
              className={styles.ember}
              style={{
                left: `${20 + j * 25}%`,
                bottom: "-2px",
                background: hovered ? "#e63946" : "rgba(230,57,70,0.6)",
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, emberIntensity * 0.5, 0],
                y: [-4, -10 - 4 * j, -18 - 6 * j],
                x: [0, (j - 1) * 2, (j - 1) * 4],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5 + j * 0.8,
                delay: 1.5 + j * 1.2,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Smoke wisps */}
          {[0, 1].map((j) => (
            <motion.span
              key={`s-${j}`}
              className={styles.smoke}
              style={{
                left: `${30 + j * 30}%`,
                bottom: "0px",
                width: 2 + j,
                height: 2 + j,
                background: `rgba(230,57,70,${smokeOpacity})`,
              }}
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{
                opacity: [0, smokeOpacity, 0],
                y: [-2, -10 - 5 * j, -22 - 8 * j],
                scale: [0.5, 1.2, 2],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.5 + j,
                delay: 2 + j * 1.8,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Letter itself */}
      <motion.span
        className={styles.ashLetter}
        animate={active ? { color: hovered ? ["#b83a3a", "#e63946", "#b83a3a"] : ["#1a1a2e", "#8c2e2e", "#1a1a2e"] } : {}}
        transition={{ repeat: Infinity, duration: hovered ? 2.5 : 4, ease: "easeInOut" }}
      >{char}</motion.span>
    </span>
  );
}

/* ─── RARE EMBER TRAIL ─────────────────────────────────────── */

function AshEmberTrail() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    const spawn = () => {
      const id = idCounter.current++;
      const x = 30 + Math.random() * 40;
      const y = 30 + Math.random() * 20;
      setParticles((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 3000);
    };
    const interval = setInterval(spawn, 15000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={styles.emberTrail}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0.2, scale: 0.5, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0, x: -20 + Math.random() * 40, y: -60 + Math.random() * -40 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

/* ─── HERO SECTION ────────────────────────────────────────── */

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  /* ── Mouse tracking ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const nameX = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const nameY = useTransform(mouseY, [-0.5, 0.5], [-5, 5]);
  const surnameX = useTransform(mouseX, [-0.5, 0.5], [6, -6]);

  /* ── Mascot idle blink ── */
  const [mascotAction, setMascotAction] = useState<"wave" | "point" | "sit">("wave");
  useEffect(() => {
    const actions: Array<"wave" | "point" | "sit"> = ["wave", "point", "sit", "wave", "sit"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % actions.length;
      setMascotAction(actions[i]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      ref={ref}
      className={cn("px-6 sm:px-10", styles.hero)}
      style={{ opacity } as unknown as React.CSSProperties}
      onMouseMove={onMouseMove}
    >
      {/* ── Background layers ── */}
      <div className={styles.blueprintGrid} />
      <div className={styles.halftoneBg} />
      <CropMarks />
      <RegMark className="top-6 left-6" />
      <RegMark className="bottom-6 right-6" />

      {/* Editorial objects */}
      <CoffeeMug className="hidden md:block right-[8%] bottom-[15%]" />
      <Pencil className="hidden md:block left-[5%] top-[25%]" />
      <StickyNote className="hidden md:block right-[5%] top-[20%]" />

      {/* Issue details */}
      <div className={styles.issueLabel} style={{ bottom: "2rem", left: "2rem" }}>ISSUE #001</div>
      <div className={styles.issueLabel} style={{ bottom: "2rem", right: "2rem" }}>BUILD 2.4.1</div>
      <div className={styles.issueLabel} style={{ top: "1rem", left: "50%" }}>COORD 28.58°N 77.33°E</div>

      <AshEmberTrail />
      <DustParticles />

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
              className="text-[clamp(3.5rem,12vw,9rem)] font-black leading-[0.8] tracking-[-0.05em] text-ink select-none"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {"PRAKASH".split("").map((c, i) => {
                const isAsh = i >= 4;
                return (
                  <motion.span
                    key={i}
                    className={styles.nameLetter}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + 0.03 * i }}
                    whileHover={{ y: -4, color: "#e63946", transition: { duration: 0.15 } }}
                  >
                    {isAsh ? <AshLetter char={c} /> : c}
                  </motion.span>
                );
              })}
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
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]), x: surnameX } as unknown as React.CSSProperties}
          >
            <motion.h2
              className="text-[clamp(1.8rem,5vw,4rem)] font-black leading-[0.85] tracking-[-0.06em] text-ink/90 select-none"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {"SHRESTHA".split("").map((c, i) => (
                <motion.span
                  key={i}
                  className={styles.nameLetter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + 0.03 * i }}
                  whileHover={{ y: -4, color: "#457b9d", transition: { duration: 0.15 } }}
                >
                  {c}
                </motion.span>
              ))}
            </motion.h2>

            {/* Title label box */}
            <motion.div
              className="mt-4 inline-block border-2 border-ink bg-ink/5 px-4 py-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <span className="text-xs sm:text-sm font-bold tracking-[0.15em] uppercase text-ink/80">
                Full Stack Engineer
              </span>
            </motion.div>

            {/* Personality traits */}
            <motion.div
              className="mt-6 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {traits.map((t, i) => (
                <motion.span key={t}
                  className="text-[0.6rem] sm:text-[0.65rem] px-2.5 py-1 border border-ink/15 text-ink/60 font-medium cursor-default"
                  whileHover={{ y: -2, borderColor: "var(--color-red)", color: "var(--color-red)" }}
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
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              {[
                { label: "Resume →", href: site.links.resume, important: true },
                { label: "GitHub →", href: site.links.github },
                { label: "LinkedIn →", href: site.links.linkedin },
              ].map((l) => (
                <CTA key={l.label} label={l.label} href={l.href} important={l.important} />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom caption */}
        <motion.div
          className="mt-12 md:mt-16 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <div className="h-px flex-1 bg-ink/10" />
          <span className="text-[0.55rem] font-bold tracking-[0.2em] uppercase text-ink/40">
            Building products that people love
          </span>
          <div className="h-px flex-1 bg-ink/10" />
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ─── CTA LINK ────────────────────────────────────────────── */

function CTA({ label, href, important }: { label: string; href: string; important?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank" rel="noopener noreferrer"
      className={cn(
        styles.ctaWrap,
        "text-[0.65rem] font-bold tracking-[0.15em] uppercase cursor-pointer",
        important
          ? "text-red border-2 border-red/20 bg-red/[0.03] px-3 py-1.5"
          : "text-ink/70"
      )}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={important ? { y: -2 } : undefined}
      whileTap={{ scale: 0.95 }}
      style={important ? { boxShadow: hovered ? "2px 2px 0 rgba(230,57,70,0.2)" : "none" } : undefined}
    >
      {important && <motion.span className="absolute -top-1 -right-1 text-[0.4rem] text-red/30">◆</motion.span>}
      <motion.div
        className={styles.ctaUnderline}
        initial={{ scaleX: 0 }}
        animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <motion.div
        className={styles.ctaInk}
        animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        animate={hovered ? { x: 3, color: "#e63946" } : { x: 0, color: important ? "#e63946" : "rgba(26,26,46,0.7)" }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
}
