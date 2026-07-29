"use client";

import { useRef, useState, memo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { projects } from "@/lib/projects";
import { HalftoneCorner } from "@/components/comic/ComicElements";
import { cn } from "@/lib/cn";
import styles from "./ProjectSection.module.scss";

const featured = projects.slice(0, 3)

function contrastText(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return l > 0.55 ? "#1a1a2e" : "#ffffff"
}

function readableAccent(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b
  if (l > 0.6) {
    const darken = (c: number) => Math.round(c * 0.55 * 255)
    return `#${darken(r).toString(16).padStart(2, "0")}${darken(g).toString(16).padStart(2, "0")}${darken(b).toString(16).padStart(2, "0")}`
  }
  return hex
}

function TechIcon({ slug, accent }: { slug: string; accent: string }) {
  const url = `https://cdn.simpleicons.org/${slug.toLowerCase().replace(/\s+/g, "").replace(/\./g, "dot")}/${accent.replace("#", "")}`
  return (
    <img src={url} alt={slug} width={14} height={14} className={styles.techIcon} loading="lazy"
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
    />
  )
}

const FeaturedCard = memo(function FeaturedCard({ project, index, onExpand }: { project: typeof featured[number]; index: number; onExpand: (slug: string) => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const rotations = [-0.4, 0.3, -0.2]

  return (
    <motion.div
      ref={ref}
      className={styles.featuredCard}
      style={{ "--accent": project.accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 30, rotate: rotations[index] }}
      animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      onClick={() => onExpand(project.slug)}
      data-cursor-card
    >
      <div className={styles.featuredCover}>
        <div className={styles.featuredImgWrap}>
          <div className={styles.featuredImg} style={{ backgroundImage: `url(${project.image})` }} />
        </div>
        <div className={styles.featuredOverlay} />
      </div>
      <div className={styles.featuredIssue}>{String(index + 1).padStart(2, "0")}</div>
      <div className={styles.featuredYear} style={{ background: project.accent, color: contrastText(project.accent) }}>{project.year}</div>
      <div className={styles.featuredContent}>
        <h3 className={styles.featuredTitle}>{project.title}</h3>
        <p className={styles.featuredTagline}>{project.tagline}</p>
        <div className={styles.featuredTech}>
          {project.technologies.slice(0, 4).map((t) => (
            <TechIcon key={t} slug={t} accent={project.accent} />
          ))}
        </div>
        <span className={styles.featuredCta} style={{ color: readableAccent(project.accent) }}>
          View Project →
        </span>
      </div>
      <div className={styles.featuredCorner} style={{ borderLeftColor: project.accent }} />
    </motion.div>
  );
});

const ExpandOverlay = memo(function ExpandOverlay({ slug, onClose }: { slug: string; onClose: () => void }) {
  const project = projects.find((p) => p.slug === slug)
  if (!project) return null

  return (
    <motion.div className={styles.expandOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className={styles.expandCard}
        style={{ "--accent": project.accent } as React.CSSProperties}
        initial={{ scale: 0.85, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.expandClose} onClick={onClose}>✕</button>
        <div className={styles.expandInner}>
          <div className={styles.expandImage} style={{ backgroundImage: `url(${project.image})` }} />
          <div className={styles.expandInfo}>
            <span className={styles.expandLabel} style={{ color: readableAccent(project.accent) }}>{project.year} · {project.role}</span>
            <h2 className={styles.expandTitle}>{project.title}</h2>
            <p className={styles.expandTagline}>{project.tagline}</p>
            <Link href={`/projects/${project.slug}`} className={styles.expandCta} style={{ background: project.accent, color: contrastText(project.accent) }} data-cursor-link>
              Read Full Case Study →
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

export const ProjectSection = memo(function ProjectSection() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section data-chapter={2} data-chapter-id="projects" className={styles.root}>
      <HalftoneCorner className="top-0 right-0" />
      <HalftoneCorner className="bottom-0 left-0 rotate-180" />

      <div className={styles.rootHeader}>
        <motion.span
          className={styles.rootLabel}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          /// Chapter 06 — Mission Archive
        </motion.span>
        <motion.h2
          className={styles.rootTitle}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          Featured <span className={styles.rootAccent}>Projects</span>
        </motion.h2>
        <motion.p
          className={styles.rootDesc}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          Three featured issues. Each one a different mission.
        </motion.p>
      </div>

      <div className={styles.featuredGrid}>
        {featured.map((p, i) => (
          <FeaturedCard key={p.slug} project={p} index={i} onExpand={setExpanded} />
        ))}
      </div>

      {/* View All CTA */}
      <motion.div
        className={styles.viewAllWrap}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
<Link href="/projects" className={styles.viewAllCta} data-cursor-link>
          <motion.span className={styles.viewAllIcon}
            whileTap={{ scale: 0.85 }}
          >◆</motion.span>
          <motion.span className={styles.viewAllText}
            whileTap={{ scale: 0.95 }}
          >VIEW ALL MISSIONS</motion.span>
          <motion.span className={styles.viewAllArrow}
            whileTap={{ x: -2 }}
          >→</motion.span>
        </Link>
        <p className={styles.viewAllSub}>Browse the complete archive — 8 issues</p>
      </motion.div>

      <AnimatePresence>
        {expanded && <ExpandOverlay slug={expanded} onClose={() => setExpanded(null)} />}
      </AnimatePresence>
    </section>
  );
});
