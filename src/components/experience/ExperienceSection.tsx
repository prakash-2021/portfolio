"use client";

import { useRef, useState, memo, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "motion/react";
import { experienceData } from "@/lib/experience";
import { Mascot } from "@/components/mascot/Mascot";
import { HalftoneCorner } from "@/components/comic/ComicElements";
import { cn } from "@/lib/cn";
import styles from "./ExperienceSection.module.scss";

/* ─── Fact Note ──────────────────────────────────────────── */

const FactNote = memo(function FactNote({ text, color, delay }: { text: string; color: string; delay: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className={styles.factNote}
      style={{ borderLeftColor: color }}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      onClick={() => setOpen(!open)}
    >
      <motion.span
        className="block text-[0.6rem] font-bold tracking-[0.15em] uppercase mb-1"
        style={{ color }}
      >
        {open ? "▼" : "▶"} Fun fact
      </motion.span>
      <AnimatePresence>
        {open && (
          <motion.span
            className="block"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
      {!open && (
        <motion.span
          className="block"
          style={{ color: "rgba(var(--ink-rgb), 0.3)" }}
          initial={{ opacity: 0.3 }}
          whileHover={{ opacity: 0.6, x: 2 }}
        >
          Click to reveal
        </motion.span>
      )}
    </motion.div>
  );
});

/* ─── Experience Card ────────────────────────────────────── */

function ExperienceCard({ item, index }: { item: typeof experienceData[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={styles.sceneCard}
      style={{ "--accent-color": item.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: 0.1 * index, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Deeper shadow layer (opacity-based for performance) */}
      <div className={styles.sceneCardShadow} />

      {/* Paper texture overlay */}
      <div className={styles.paperTexture} />

      {/* Tape strip */}
      <div className={styles.tapeStrip} />

      {/* Card number */}
      <span className={styles.cardNumber}>
        {(index + 1).toString().padStart(3, "0")}
      </span>

      {/* Registration marks */}
      <div className={cn(styles.registrationMark, styles.registrationMarkTopRight)} />
      <div className={cn(styles.registrationMark, styles.registrationMarkBottomLeft)} />

      {/* Corner brackets */}
      <div className={cn(styles.cornerBracket, styles.cornerBracketTopLeft)} />
      <div className={cn(styles.cornerBracket, styles.cornerBracketBottomRight)} />

      {/* Page coordinate */}
      <span className={styles.pageCoord}>pos: {String(index + 1).padStart(2, "0")},0</span>

      {/* Accent bar */}
      <div className={styles.accentBar} style={{ background: item.color }} />

      <div className="p-6 sm:p-8 pl-8 sm:pl-10">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <motion.div
              className="text-[0.6rem] font-bold tracking-[0.2em] uppercase"
              style={{ color: item.color }}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {item.jobTitle}
            </motion.div>
            <motion.h3
              className={cn("text-xl sm:text-2xl font-black tracking-tight mt-0.5", styles.companyName)}
              style={{ color: "var(--color-ink)" }}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {item.company}
            </motion.h3>
          </div>
          <motion.div
            className="flex items-center gap-2 shrink-0"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <span className={cn(styles.yearLabel)}>
              <span className={styles.statusDot} />
              {item.timePeriod}
            </span>
            <motion.div
              className={cn(styles.stamp, isInView && styles.stampAnimate)}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.01, delay: 0.5 }}
            >
              Verified
            </motion.div>
          </motion.div>
        </div>

        {/* Cover note + description */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-6 mb-5">
          <div className="sm:col-span-3">
            <motion.div
              className={styles.coverNote}
              style={{ color: item.color }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              &ldquo;{item.coverNote}&rdquo;
            </motion.div>
            <motion.p
              className="text-base leading-relaxed mt-2"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {item.description}
            </motion.p>
          </div>
          <motion.div
            className="sm:col-span-2 flex flex-wrap gap-1.5 content-start"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {item.techStack.map((t, ti) => (
              <motion.span
                key={t}
                className={styles.techBadge}
                initial={{ opacity: 0, y: 6 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.25, delay: 0.35 + ti * 0.04 }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase block mb-2"
            style={{ color: "rgba(var(--ink-rgb), 0.4)" }}
          >
            Key achievements
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
            {item.achievements.map((a, i) => (
              <motion.div
                key={i}
                className={styles.achievementItem}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + 0.08 * i }}
              >
                <span className={styles.achievementCounter}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {a}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun fact */}
        <FactNote text={item.facts[0]} color={item.color} delay={0.5} />
      </div>
    </motion.div>
  );
}

/* ─── Header ─────────────────────────────────────────────── */

function SectionHeader() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={styles.header}>
      <motion.span
        className={styles.headerLabel}
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        /// Chapter 03
      </motion.span>

      <motion.span
        className={styles.issueLabel}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.08 }}
      >
        ISSUE #05
      </motion.span>

      <div className={styles.headerRow}>
        <motion.div
          className={styles.headerDivider}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <motion.h2
          className={styles.headerTitle}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
        >
          The <span className={styles.headerAccent}>experience</span>
          <span className={styles.headerArrow}>↘</span>
        </motion.h2>
        <motion.div
          className={styles.headerDivider}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      <motion.p
        className={styles.headerDesc}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.22 }}
      >
        Walking through my career — one scene at a time
      </motion.p>
    </div>
  );
}

/* ─── Connector ──────────────────────────────────────────── */

function ConnectorLines() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={styles.connector}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <motion.div
        className={styles.connectorLine}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <div className={styles.connectorDots}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={styles.connectorDot}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 0.3, scale: 1 } : {}}
            transition={{ duration: 0.2, delay: 0.3 + i * 0.06 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────── */

export function ExperienceSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      className={cn("px-6 sm:px-10 py-20 sm:py-28", styles.section)}
      style={{ opacity } as unknown as React.CSSProperties}
    >
      <div className={styles.backgroundGrid} />

      {/* Scanning line */}
      <div className={styles.scanLine} style={{ background: "var(--color-red)" }} />

      <div className={styles.scene}>
        <SectionHeader />
        <ConnectorLines />

        <div className="space-y-10 sm:space-y-14">
          {experienceData.map((item, i) => (
            <div key={item.id}>
              <ExperienceCard item={item} index={i} />

              {i < experienceData.length - 1 && (
                <motion.div
                  className={styles.mascotPath}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className={styles.mascotPathLine} />
                  <Mascot size={22} action="walk" className="opacity-40" />
                  <div className={styles.mascotPathLine} />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <HalftoneCorner className="bottom-0 right-0 rotate-180" />
    </motion.section>
  );
}
