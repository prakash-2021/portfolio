"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "motion/react";
import { academicData } from "@/lib/academic";
import { Mascot } from "@/components/mascot/Mascot";
import { HalftoneCorner } from "@/components/comic/ComicElements";
import { cn } from "@/lib/cn";
import styles from "./EducationSection.module.scss";

/* ─── Education Card ─────────────────────────────────────── */

function EducationCard({ item, index }: { item: typeof academicData[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={styles.page}
      style={{ "--accent-color": item.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: 0.1 * index, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Shadow layer */}
      <div className={styles.pageShadow} />

      {/* Paper texture */}
      <div className={styles.paperTexture} />

      {/* Tape strip */}
      <div className={styles.tapeStrip} />

      {/* Card number */}
      <span className={styles.cardNumber}>
        {(index + 1).toString().padStart(3, "0")}
      </span>

      {/* Registration marks */}
      <div className={cn(styles.registrationMark, styles.registrationMarkTopRight)} />

      {/* Corner brackets */}
      <div className={cn(styles.cornerBracket, styles.cornerBracketTopLeft)} />
      <div className={cn(styles.cornerBracket, styles.cornerBracketBottomRight)} />

      {/* Page coordinate */}
      <span className={styles.pageCoord}>folio: {String(index + 1).padStart(2, "0")}</span>

      {/* Red margin line */}
      <div className={styles.marginLine} />

      {/* Bookmark */}
      <motion.div
        className={styles.bookmark}
        style={{ background: item.color }}
        initial={{ y: -20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
      />

      {/* Header */}
      <div className="mb-5">
        <motion.div
          className="text-[0.6rem] font-bold tracking-[0.2em] uppercase"
          style={{ color: item.color }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {item.stream}
        </motion.div>
        <motion.h3
          className={cn("text-xl sm:text-2xl font-black mt-0.5", styles.institutionName)}
          style={{ color: "var(--color-ink)" }}
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <span className={styles.statusDot} />
          {item.college}
        </motion.h3>
        <motion.div
          className="text-sm mt-0.5"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {item.university}
        </motion.div>
      </div>

      {/* Pencil annotation */}
      <motion.div
        className={styles.pencilNote}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        &ldquo;{item.coverNote}&rdquo;
      </motion.div>

      {/* Marks + stamp */}
      <motion.div
        className="flex items-center gap-3 mt-4 mb-5"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <span className="text-sm font-bold" style={{ color: "var(--text-secondary)" }}>
          {item.marks}
        </span>
        <motion.span
          className={cn(styles.stampCorner, isInView && styles.stampAnimate)}
          style={{ borderColor: `${item.color}40`, color: `${item.color}80` }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.01, delay: 0.5 }}
        >
          ✓ Approved
        </motion.span>
      </motion.div>

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
          Highlights
        </span>
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
      </motion.div>

      {/* Stamp in bottom right */}
      <motion.div
        className={cn(styles.stampCorner, isInView && styles.stampAnimate)}
        style={{ borderColor: `${item.color}30`, color: `${item.color}60` }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.01, delay: 0.5 }}
      >
        {item.marks}
      </motion.div>
    </motion.div>
  );
}

/* ─── Section Header ─────────────────────────────────────── */

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
        /// Chapter 04
      </motion.span>

      <motion.span
        className={styles.issueLabel}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.08 }}
      >
        ISSUE #06
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
          The <span className={styles.headerAccent}>notebook</span>
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
        Opening the engineering journal
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

export function EducationSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.section
      ref={sectionRef}
      className={cn("px-6 sm:px-10 py-20 sm:py-28", styles.section)}
      style={{ y } as unknown as React.CSSProperties}
    >
      <div className={styles.linedBg} />

      {/* Scanning line */}
      <div className={styles.scanLine} style={{ background: "var(--color-red)" }} />

      <HalftoneCorner className="top-0 left-0" />
      <HalftoneCorner className="bottom-0 right-0 rotate-180" />

      <div className={styles.notebook}>
        <SectionHeader />
        <ConnectorLines />

        <div className="space-y-10 sm:space-y-12">
          {academicData.map((item, i) => (
            <div key={item.id}>
              <EducationCard item={item} index={i} />

              {i < academicData.length - 1 && (
                <motion.div
                  className="flex justify-center mt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Mascot size={24} action="sit" className="opacity-30" />
                  <span className="text-[0.55rem] font-bold tracking-[0.15em] uppercase ml-2 self-end mb-1"
                    style={{ color: "rgba(var(--ink-rgb), 0.3)" }}
                  >
                    studying...
                  </span>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
