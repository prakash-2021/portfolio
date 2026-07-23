"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useInView } from "motion/react";
import { cn } from "@/lib/cn";
import { HeroSection } from "@/components/hero/HeroSection";
import { ToolkitSection } from "@/components/toolkit/ToolkitSection";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { ManifestoSection } from "@/components/manifesto/ManifestoSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { EducationSection } from "@/components/education/EducationSection";
import { ContactSection } from "@/components/contact/ContactSection";

/* ─── HOOKS ────────────────────────────────────────────────── */

function useReducedMotion() {
  const [r, s] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    s(m.matches);
    m.addEventListener("change", (e) => s(e.matches));
  }, []);
  return r;
}

/* ─── LOADING: Comic Assembling ────────────────────────────── */

function ComicLoading({ done }: { done: () => void }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) { done(); return; }
    const t = setTimeout(done, 2600);
    return () => clearTimeout(t);
  }, [reduced, done]);

  if (reduced) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-paper flex items-center justify-center overflow-hidden"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Paper texture base */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Halftone bloom */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 2.6, times: [0, 0.6, 1] }}
        style={{
          backgroundImage: "radial-gradient(circle, rgba(26,26,46,0.04) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Panel border drawing */}
      <motion.div
        className="absolute"
        style={{ width: "60%", height: "50%" }}
        initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="w-full h-full border-2 border-ink/20" />
        <div className="absolute inset-[4px] border border-ink/10" />
      </motion.div>

      {/* Typography revealing */}
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-[clamp(2rem,8vw,6rem)] font-black leading-[0.85] tracking-[-0.04em] text-ink select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: 1.4 }}
        >
          {"PRAKASH\nSHRESTHA".split("\n").map((line, li) => (
            <div key={li}>
              {line.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.4 + li * 0.15 + 0.025 * i }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.h1>
      </div>

      {/* Red accent streak */}
      <motion.div
        className="absolute bottom-[20%] left-0 h-[3px] bg-red"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 2.6, times: [0, 0.5, 1], ease: [0.25, 0.1, 0.25, 1] }}
        style={{ width: "100%" }}
      />
    </motion.div>
  );
}

/* ─── SCROLL PROGRESS ───────────────────────────────────────── */

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 150, damping: 25 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-red/80 origin-left z-[100]"
      style={{ scaleX: sx }}
    />
  );
}

/* ─── PHILOSOPHY ───────────────────────────────────────────── */

/* ─── PROJECTS ─────────────────────────────────────────────── */

/* ─── TOOLS ────────────────────────────────────────────────── */

function ToolsSection() {
  return <ToolkitSection />;
}

/* ─── JOURNEY ──────────────────────────────────────────────── */

/* ─── MAIN ─────────────────────────────────────────────────── */

/* ─── SECTION DIVIDER ───────────────────────────────────────── */

function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="px-6 sm:px-10 max-w-[1200px] mx-auto relative py-2">
      {/* Floating ink dots */}
      <motion.div
        className="absolute left-1/4 top-0 w-1 h-1 rounded-full bg-ink/10"
        animate={{ y: [-4, 4, -4], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-1/3 top-1 w-1.5 h-1.5 rounded-full bg-red/10"
        animate={{ y: [0, -5, 0], opacity: [0.08, 0.18, 0.08] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute left-2/3 -bottom-1 w-[3px] h-[3px] rounded-full bg-blue/10"
        animate={{ y: [-3, 3, -3], opacity: [0.06, 0.15, 0.06] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="ink-drip"
        initial={{ opacity: 0, scaleX: 0.8 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {label && <span>{label}</span>}
      </motion.div>
    </div>
  );
}

/* ─── DRAWING ARROW ──────────────────────────────────────────── */

function DrawingArrow({
  className,
  fromX = 0,
  fromY = 0,
  toX = 40,
  toY = -30,
  label,
  delay = 0,
}: {
  className?: string
  fromX?: number
  fromY?: number
  toX?: number
  toY?: number
  label?: string
  delay?: number
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
  const d = `M ${fromX} ${fromY} Q ${midX + 8} ${midY - 10} ${toX} ${toY}`;
  return (
    <div ref={ref} className={cn("absolute pointer-events-none", className)} style={{ width: Math.abs(fromX - toX) + 40, height: Math.abs(fromY - toY) + 40 }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${Math.abs(fromX - toX) + 40} ${Math.abs(fromY - toY) + 40}`} fill="none" className="overflow-visible">
        <motion.path
          d={d}
          stroke="#e63946"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="0 1"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
        {/* Arrowhead */}
        <motion.polygon
          points="0,-4 8,0 0,4"
          fill="#e63946"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: delay + 0.6 }}
          style={{ transform: `translate(${toX}px, ${toY}px) rotate(${Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI) + 180}deg)` }}
        />
      </svg>
      {label && (
        <motion.span
          className="absolute text-[0.5rem] font-bold tracking-[0.15em] uppercase text-red"
          style={{ left: midX + 12, top: midY - 14 }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.4 }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();

  return (
    <>
      <AnimatePresence>
        {!loaded && <ComicLoading done={() => setLoaded(true)} />}
      </AnimatePresence>

      <ScrollBar />

      <main className="text-ink min-h-screen" style={{ background: "transparent" }}>
        <HeroSection />
        <SectionDivider label="Manifesto" />
        <div className="relative">
          <ManifestoSection />
          <DrawingArrow
            className="hidden md:block absolute -top-2 right-8 z-10"
            fromX={10}
            fromY={10}
            toX={70}
            toY={-50}
            label="origin story"
            delay={0.3}
          />
        </div>
        <SectionDivider label="Projects" />
        <ProjectSection />
        <SectionDivider label="Toolkit" />
        <ToolsSection />
        <SectionDivider label="Experience" />
        <ExperienceSection />
        <SectionDivider label="Education" />
        <EducationSection />
        <SectionDivider label="Connect" />
        <ContactSection />
      </main>
    </>
  );
}
