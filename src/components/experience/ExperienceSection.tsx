"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "motion/react";
import { experienceData } from "@/lib/experience";
import { Mascot } from "@/components/mascot/Mascot";
import { HalftoneCorner } from "@/components/comic/ComicElements";
import { cn } from "@/lib/cn";
import styles from "./ExperienceSection.module.scss";

function FactNote({ text, color, delay }: { text: string; color: string; delay: number }) {
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
          className="block text-ink/30"
          initial={{ opacity: 0.3 }}
          whileHover={{ opacity: 0.6, x: 2 }}
        >
          Click to reveal
        </motion.span>
      )}
    </motion.div>
  );
}

function ExperienceCard({ item, index }: { item: typeof experienceData[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={styles.sceneCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
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
              className="text-xl sm:text-2xl font-black text-ink tracking-tight mt-0.5"
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
            <span className="text-[0.65rem] font-medium text-ink/50">{item.timePeriod}</span>
            <div className={styles.stamp}>Verified</div>
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
              className="text-base text-ink/70 mt-2 leading-relaxed"
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
            {item.techStack.map((t) => (
              <span key={t} className={styles.techBadge}>
                {t}
              </span>
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
          <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink/40 block mb-2">
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

      <div className={styles.scene}>
        {/* Chapter header */}
        <div className="text-center mb-14">
          <span className="comic-caption">/// Chapter 03</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-ink mt-2">
            The <span className="text-purple">experience</span>
          </h2>
          <p className="text-xs text-ink/40 mt-2 max-w-[300px] mx-auto">
            Walking through my career — one scene at a time
          </p>
        </div>

        <div className="space-y-10 sm:space-y-14">
          {experienceData.map((item, i) => (
            <div key={item.id}>
              <ExperienceCard item={item} index={i} />

              {/* Mascot walks to next — only between items */}
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
