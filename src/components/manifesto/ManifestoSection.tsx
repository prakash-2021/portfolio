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
  { label: "Backend", value: 85 },
  { label: "Animation", value: 90 },
  { label: "System", value: 80 },
  { label: "AI", value: 75 },
  { label: "Design", value: 80 },
]

const principles = [
  {
    title: "Pixel Craft",
    text: "Every element earns its place. Nothing decorative — everything purposeful.",
    accent: "var(--color-red)",
  },
  {
    title: "Motion Soul",
    text: "Animation isn't flair. It's the handshake between user and interface.",
    accent: "var(--color-blue)",
  },
  {
    title: "System Mind",
    text: "Don't build pages. Build systems that generate pages. Scale thinking.",
    accent: "var(--color-green)",
  },
  {
    title: "Memory Maker",
    text: "The best products aren't used — they're remembered and revisited.",
    accent: "var(--color-purple)",
  },
]

function MeasurementBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className={styles.measRow}>
      <span className={styles.measLabel}>{label}</span>
      <div className={styles.measTrack}>
        <div className={styles.measTicks} aria-hidden>
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} className={styles.measTick} style={{ left: `${i * 10}%` }} />
          ))}
        </div>
        <motion.div
          className={styles.measFill}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <motion.div
          className={styles.measArrow}
          initial={{ left: 0 }}
          animate={isInView ? { left: `${value}%` } : { left: 0 }}
          transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
      <span className={styles.measValue}>{value}%</span>
    </div>
  )
}

function PrincipleNote({ principle, index }: { principle: typeof principles[number]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const [cardHovered, setCardHovered] = useState(false)
  const rotations = [-1.5, 1, -0.5, 1.5]

  return (
    <motion.div
      ref={ref}
      className={styles.principleNote}
      style={{ "--accent": principle.accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 20, rotate: rotations[index] }}
      animate={isInView ? { opacity: 1, y: 0, rotate: rotations[index] } : {}}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      whileHover={{ y: -3, rotate: rotations[index] - 1, transition: { type: "spring", stiffness: 260, damping: 18 } }}
    >
      {/* Folded corner */}
      <div className={styles.foldedCorner} />

      {/* Paper clip */}
      <svg className={styles.paperClip} width="10" height="24" viewBox="0 0 10 24" fill="none" aria-hidden>
        <path d="M2 2v16a3 3 0 006 0V6a1 1 0 00-2 0v12" stroke="var(--color-ink)" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.15" />
      </svg>

      <div className={styles.notePin} />
      <div className={styles.noteTape} />

      {/* Unique micro-interaction per card */}
      {index === 0 && (
        <motion.div
          className={styles.pixelGrid}
          animate={cardHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {index === 1 && (
        <motion.div className={styles.motionTimeline} aria-hidden>
          {[0, 1, 2].map((d) => (
            <motion.span
              key={d}
              className={styles.timelineDot}
              animate={cardHovered ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.6 }}
              transition={{ duration: 0.2, delay: d * 0.08 }}
            />
          ))}
        </motion.div>
      )}
      {index === 2 && (
        <motion.div className={styles.blueprintCorner} aria-hidden>
          <motion.svg width="30" height="30" viewBox="0 0 30 30" fill="none"
            animate={cardHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <path d="M2 28V2h26" stroke="var(--color-blue)" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
            <circle cx="2" cy="2" r="2" fill="var(--color-blue)" opacity="0.15" />
          </motion.svg>
        </motion.div>
      )}
      {index === 3 && (
        <motion.div
          className={styles.memoryBookmark}
          animate={cardHovered ? { x: 0, opacity: 1 } : { x: 8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
        >
          <svg width="8" height="16" viewBox="0 0 8 16" fill="none">
            <path d="M1 1v14l3-2 3 2V1H1z" stroke="var(--color-purple)" strokeWidth="0.8" fill="none" opacity="0.4" />
          </svg>
        </motion.div>
      )}

      <span className={styles.noteTitle} style={{ color: principle.accent }}>{principle.title}</span>
      <p className={styles.noteText}>{principle.text}</p>
    </motion.div>
  )
}

export function ManifestoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [hoveredQuote, setHoveredQuote] = useState(false)
  const bgRef = useRef(null)
  const bgInView = useInView(bgRef, { once: true, margin: "-200px" })

  return (
    <section ref={ref} data-chapter={1} data-chapter-id="origin" className={styles.section}>
      {/* Blueprint background */}
      <svg className={styles.bgGrid} viewBox="0 0 1200 800" fill="none">
        <pattern id="man-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0L0 0 0 30" fill="none" stroke="var(--color-ink)" strokeWidth="0.3" opacity="0.04" />
        </pattern>
        <rect width="1200" height="800" fill="url(#man-grid)" />
        <circle cx="150" cy="120" r="60" stroke="var(--color-red)" strokeWidth="0.4" opacity="0.04" fill="none" strokeDasharray="4 4" />
        <line x1="150" y1="60" x2="150" y2="30" stroke="var(--color-red)" strokeWidth="0.3" opacity="0.04" />
        <line x1="150" y1="180" x2="150" y2="210" stroke="var(--color-red)" strokeWidth="0.3" opacity="0.04" />
      </svg>

      {/* Halftone accent */}
      <motion.div
        ref={bgRef}
        className={styles.halftoneBg}
        animate={bgInView ? { opacity: 0.04 } : { opacity: 0.01 }}
        transition={{ duration: 0.8 }}
      />

      {/* Section header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.span
          className={styles.headerLabel}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          /// Manifesto
        </motion.span>
        <h2 className={styles.headerTitle}>
          Developer <span className={styles.headerAccent}>DNA</span>
        </h2>
        <div className={styles.headerMeta}>
          <span className={styles.headerIssue}>ISSUE #00</span>
          <span className={styles.headerTag}>ORIGIN STORY</span>
        </div>
      </motion.div>

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
              <MeasurementBar key={s.label} label={s.label} value={s.value} delay={0.1 + i * 0.08} />
            ))}
          </div>

          <div className={styles.statsFooter}>
            <span className={styles.statsLevel}>LV. ENGINEER</span>
            <span className={styles.statsXp}>Since 2020</span>
          </div>

          {/* Decorative annotations */}
          <svg className={styles.statsArrow} width="60" height="20" viewBox="0 0 60 20" fill="none">
            <path d="M5 15 L42 15 L42 15 M42 15 L35 8 M42 15 L35 22" stroke="var(--color-red)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
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
              Design-driven full stack engineer. <span className={styles.correctionOld}>Every pixel</span>
              <span className={styles.correctionNew}> Every element</span> intentional. Every interaction purposeful.
            </p>

            {/* Red marker circle on hover */}
            <motion.div
              className={styles.markerCircle}
              animate={hoveredQuote ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            />

            {/* Editorial margin note */}
            <motion.div
              className={styles.marginNote}
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <svg className={styles.marginNoteArrow} width="40" height="14" viewBox="0 0 40 14" fill="none">
                <path d="M38 7H4M4 7l4-4M4 7l4 4" stroke="var(--color-red)" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
              </svg>
              <span className={styles.marginNoteText}>bold claim.</span>
            </motion.div>
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
            initial={{ opacity: 0, rotate: -15, scale: 0.5 }}
            whileInView={{ opacity: 1, rotate: -8, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 160, damping: 12, delay: 1.2 }}
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
            <path d="M5 6 H60 M60 6 L55 2 M60 6 L55 10" stroke="var(--color-red)" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
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
