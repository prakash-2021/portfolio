"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "motion/react";
import { academicData } from "@/lib/academic";
import { Mascot } from "@/components/mascot/Mascot";
import { HalftoneCorner } from "@/components/comic/ComicElements";
import { cn } from "@/lib/cn";
import styles from "./EducationSection.module.scss";

function EducationCard({ item, index }: { item: typeof academicData[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={styles.page}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
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
          className="text-xl sm:text-2xl font-black text-ink mt-0.5"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {item.college}
        </motion.h3>
        <motion.div
          className="text-sm text-ink/50 mt-0.5"
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
        <span className="text-sm font-bold text-ink/60">{item.marks}</span>
        <span className={styles.stampCorner} style={{ borderColor: `${item.color}40`, color: `${item.color}80` }}>
          ✓ Approved
        </span>
      </motion.div>

      {/* Achievements */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink/40 block mb-2">
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
            {a}
          </motion.div>
        ))}
      </motion.div>



      {/* Stamp in bottom right */}
      <motion.div
        className={styles.stampCorner}
        style={{ borderColor: `${item.color}30`, color: `${item.color}60` }}
        initial={{ opacity: 0, rotate: -5 }}
        animate={isInView ? { opacity: 1, rotate: -3 } : {}}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        {item.marks}
      </motion.div>
    </motion.div>
  );
}

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
      <HalftoneCorner className="top-0 left-0" />
      <HalftoneCorner className="bottom-0 right-0 rotate-180" />

      <div className={styles.notebook}>
        {/* Chapter header */}
        <div className="text-center mb-14">
          <span className="comic-caption">/// Chapter 04</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-ink mt-2">
            The <span className="text-green">notebook</span>
          </h2>
          <p className="text-xs text-ink/40 mt-2 max-w-[300px] mx-auto">
            Opening the engineering journal
          </p>
        </div>

        <div className="space-y-10 sm:space-y-12">
          {academicData.map((item, i) => (
            <div key={item.id}>
              <EducationCard item={item} index={i} />

              {/* Mascot studying between items */}
              {i < academicData.length - 1 && (
                <motion.div
                  className="flex justify-center mt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Mascot size={24} action="sit" className="opacity-30" />
                  <span className="text-[0.55rem] font-bold tracking-[0.15em] uppercase text-ink/30 ml-2 self-end mb-1">
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
