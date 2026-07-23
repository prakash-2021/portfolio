"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";
import styles from "./ManifestoSection.module.scss";

const traits = [
  "Product thinker", "Animation nerd", "System designer",
  "UX obsessive", "Problem solver",
]

const stats = [
  { label: "Frontend", value: 95 },
  { label: "Animation", value: 90 },
  { label: "Backend", value: 85 },
  { label: "Design", value: 80 },
  { label: "Systems", value: 75 },
]

const principles = [
  {
    title: "Pixel Craft",
    text: "Every element earns its place. Nothing decorative — everything purposeful.",
    accent: "#e63946",
  },
  {
    title: "Motion Soul",
    text: "Animation isn't flair. It's the handshake between user and interface.",
    accent: "#457b9d",
  },
  {
    title: "System Mind",
    text: "Don't build pages. Build systems that generate pages. Scale thinking.",
    accent: "#2d9b4e",
  },
  {
    title: "Memory Maker",
    text: "The best products aren't used — they're remembered and revisited.",
    accent: "#7c3aed",
  },
]

function StatBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className={styles.statRow}>
      <span className={styles.statLabel}>{label}</span>
      <div className={styles.statTrack}>
        <motion.div
          className={styles.statFill}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: value / 100 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: "left" }}
        />
      </div>
      <span className={styles.statValue}>{value}%</span>
    </div>
  )
}

function PrincipleNote({ principle, index }: { principle: typeof principles[number]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const rotations = [-1.5, 1, -0.5, 1.5]

  return (
    <motion.div
      ref={ref}
      className={styles.principleNote}
      style={{ "--accent": principle.accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 20, rotate: rotations[index] }}
      animate={isInView ? { opacity: 1, y: 0, rotate: rotations[index] } : {}}
      transition={{ duration: 0.4, delay: 0.1 * index }}
    >
      <div className={styles.notePin} />
      <div className={styles.noteTape} />
      <span className={styles.noteTitle} style={{ color: principle.accent }}>{principle.title}</span>
      <p className={styles.noteText}>{principle.text}</p>
    </motion.div>
  )
}

export function ManifestoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [hoveredQuote, setHoveredQuote] = useState(false)

  return (
    <section ref={ref} className={styles.section}>
      {/* Blueprint background */}
      <svg className={styles.bgGrid} viewBox="0 0 1200 800" fill="none">
        <pattern id="man-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0L0 0 0 30" fill="none" stroke="#1a1a2e" strokeWidth="0.3" opacity="0.04" />
        </pattern>
        <rect width="1200" height="800" fill="url(#man-grid)" />
        <circle cx="150" cy="120" r="60" stroke="#e63946" strokeWidth="0.4" opacity="0.04" fill="none" strokeDasharray="4 4" />
        <line x1="150" y1="60" x2="150" y2="30" stroke="#e63946" strokeWidth="0.3" opacity="0.04" />
        <line x1="150" y1="180" x2="150" y2="210" stroke="#e63946" strokeWidth="0.3" opacity="0.04" />
      </svg>

      {/* Halftone accent */}
      <div className={styles.halftoneBg} />

      {/* Section header */}
      <div className={styles.header}>
        <span className={styles.headerLabel}>/// Manifesto</span>
        <h2 className={styles.headerTitle}>
          Developer <span className={styles.headerAccent}>DNA</span>
        </h2>
        <div className={styles.headerMeta}>
          <span className={styles.headerIssue}>ISSUE #00</span>
          <span className={styles.headerTag}>ORIGIN STORY</span>
        </div>
      </div>

      {/* Main content area — two columns */}
      <div className={styles.mainGrid}>
        {/* LEFT: Stats panel */}
        <div className={styles.statsPanel}>
          <div className={styles.panelCorner} />
          <div className={styles.panelTape} />

          <span className={styles.panelLabel}>/// CAPABILITY</span>
          <h3 className={styles.panelTitle}>Attribute Matrix</h3>

          <div className={styles.statsList}>
            {stats.map((s, i) => (
              <StatBar key={s.label} label={s.label} value={s.value} delay={0.1 + i * 0.08} />
            ))}
          </div>

          <div className={styles.statsFooter}>
            <span className={styles.statsLevel}>LV. ENGINEER</span>
            <span className={styles.statsXp}>Since 2020</span>
          </div>

          {/* Decorative annotations */}
          <svg className={styles.statsArrow} width="60" height="20" viewBox="0 0 60 20" fill="none">
            <path d="M5 15 L42 15 L42 15 M42 15 L35 8 M42 15 L35 22" stroke="#e63946" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
          </svg>
          <span className={styles.statsAnnot}>core skills</span>
        </div>

        {/* RIGHT: Origin story + traits */}
        <div className={styles.originPanel}>
          <div className={styles.panelCorner} />
          <div className={styles.paperLines}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={styles.paperLine} />
            ))}
          </div>

          <span className={styles.panelLabel}>/// PHILOSOPHY</span>

          <div
            className={styles.quoteBlock}
            onMouseEnter={() => setHoveredQuote(true)}
            onMouseLeave={() => setHoveredQuote(false)}
          >
            <h3 className={styles.quoteText}>
              I build products that{" "}
              <span className={styles.quoteAccent}>people remember.</span>
            </h3>

            {/* Animated underline */}
            <motion.div
              className={styles.quoteUnderline}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ transformOrigin: "left" }}
            />

            <p className={styles.quoteSub}>
              Design-driven full stack engineer. Every pixel intentional. Every interaction purposeful.
            </p>

            {/* Red marker circle on hover */}
            <motion.div
              className={styles.markerCircle}
              animate={hoveredQuote ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Traits as comic annotation tags */}
          <div className={styles.traitsRow}>
            <span className={styles.traitsLabel}>PERSONALITY</span>
            <div className={styles.traitsList}>
              {traits.map((t, i) => (
                <motion.span
                  key={t}
                  className={styles.traitTag}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Editor's note sticker */}
          <motion.div
            className={styles.editNote}
            initial={{ opacity: 0, rotate: 3, scale: 0.9 }}
            animate={isInView ? { opacity: 1, rotate: 2, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <span className={styles.editNoteLabel}>EDITOR&apos;S NOTE</span>
            <p className={styles.editNoteText}>This is the kind of engineer you want on your team.</p>
          </motion.div>

          {/* Approved stamp */}
          <motion.div
            className={styles.stamp}
            initial={{ opacity: 0, rotate: -12, scale: 0.6 }}
            animate={isInView ? { opacity: 1, rotate: -8, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <span className={styles.stampText}>APPROVED</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom: Principles as sticky notes */}
      <div className={styles.principlesRow}>
        <div className={styles.principlesHeader}>
          <span className={styles.principlesLabel}>/// CORE PRINCIPLES</span>
          <svg width="80" height="12" viewBox="0 0 80 12" fill="none">
            <path d="M5 6 H60 M60 6 L55 2 M60 6 L55 10" stroke="#e63946" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
          </svg>
        </div>
        <div className={styles.principlesGrid}>
          {principles.map((p, i) => (
            <PrincipleNote key={p.title} principle={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
