"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "motion/react";
import { projects, type Project } from "@/lib/projects";
import { cn } from "@/lib/cn";
import { ScrollProgress } from "@/components/shared";
import styles from "./ProjectsList.module.scss";

const categories = ["All", "Full-Stack", "Frontend", "Creative"]

const sortOptions = [
  { label: "Latest", value: "year-desc" },
  { label: "Oldest", value: "year-asc" },
  { label: "A-Z", value: "alpha" },
] as const

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
    <img src={url} alt={slug} className={styles.techIcon} loading="lazy"
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
    />
  )
}

function ArchiveCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [hovered, setHovered] = useState(false)

  const wide = index % 3 === 0
  const tall = index % 4 === 0
  const rotate = [-0.3, 0.2, -0.1, 0.4, -0.2, 0.3, -0.4, 0.1][index % 8]

  return (
    <motion.div
      ref={ref}
      className={`${styles.archiveCard} ${wide ? styles.cardWide : ""} ${tall ? styles.cardTall : ""}`}
      style={{ "--accent": project.accent, "--accent-text": contrastText(project.accent) } as React.CSSProperties}
      initial={{ opacity: 0, y: 30, rotate }}
      animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.04 * index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/projects/${project.slug}`} className={styles.archiveLink}>
        {/* Tape decoration */}
        <div className={styles.arcTape} />

        {/* Card image */}
        <div className={styles.arcImageWrap}>
          <motion.div
            className={styles.arcImage}
            style={{ backgroundImage: `url(${project.image})` }}
            animate={hovered ? { scale: 1.04 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className={styles.arcOverlay} />
        </div>

        {/* Issue badge */}
        <div className={styles.arcIssue} style={{ background: project.accent }}>
          <span className={styles.arcIssueNum}>{String(index + 1).padStart(2, "0")}</span>
        </div>

        {/* Difficulty stars */}
        <div className={styles.arcDifficulty}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`${styles.arcStar} ${i < project.difficulty ? styles.arcStarActive : ""}`} style={i < project.difficulty ? { color: readableAccent(project.accent) } : undefined}>✦</span>
          ))}
        </div>

        {/* Category label */}
        <span className={styles.arcCategory} style={{ borderColor: `${project.accent}44`, color: readableAccent(project.accent) }}>{project.category}</span>

        {/* Content */}
        <div className={styles.arcContent}>
          <span className={styles.arcYear}>{project.year}</span>
          <h3 className={styles.arcTitle}>{project.title}</h3>
          <p className={styles.arcTagline}>{project.tagline}</p>

          <div className={styles.arcTech}>
            {project.technologies.slice(0, 4).map((t) => (
              <TechIcon key={t} slug={t} accent={project.accent} />
            ))}
            {project.technologies.length > 4 && (
              <span className={styles.arcTechMore} style={{ color: readableAccent(project.accent) }}>+{project.technologies.length - 4}</span>
            )}
          </div>

          <motion.span className={styles.arcCta} animate={hovered ? { gap: "0.6rem" } : { gap: "0.3rem" }} style={{ color: readableAccent(project.accent) }}>
            Open Case File →
          </motion.span>
        </div>

        {/* Halftone corner */}
        <div className={styles.arcHalftone} />
      </Link>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState<string>("year-desc")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    let result = [...projects]

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
      )
    }

    switch (sortBy) {
      case "year-asc": result.sort((a, b) => parseInt(a.year) - parseInt(b.year)); break
      case "alpha": result.sort((a, b) => a.title.localeCompare(b.title)); break
      default: result.sort((a, b) => parseInt(b.year) - parseInt(a.year)); break
    }

    return result
  }, [activeCategory, sortBy, search])

  return (
    <>
      <ScrollProgress />
      <div className={styles.page}>
        {/* Navigation */}
        <nav className={styles.nav}>
          <Link href="/" className={styles.backBtn}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden width="14" height="14">
              <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </Link>
        </nav>

        {/* Header */}
        <header className={styles.archiveHeader}>
          <span className={styles.archiveLabel}>/// Project Archive</span>
          <h1 className={styles.archiveTitle}>
            Issue <span className={styles.archiveAccent}>Library</span>
          </h1>
          <p className={styles.archiveDesc}>
            A collection of <strong>{projects.length} projects</strong> spanning full-stack platforms, creative experiments, and frontend craftsmanship.
          </p>
        </header>

        {/* Controls bar */}
        <div className={styles.controls}>
          {/* Category tabs */}
          <div className={styles.categories}>
            {categories.map((cat) => (
              <motion.button
                key={cat}
                className={`${styles.categoryTab} ${activeCategory === cat ? styles.categoryActive : ""}`}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {cat}
                {activeCategory === cat && (
                  <div className={styles.categoryUnderline} />
                )}
              </motion.button>
            ))}
          </div>

          {/* Search */}
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.searchClear} onClick={() => setSearch("")}>✕</button>
            )}
          </div>

          {/* Sort */}
          <div className={styles.sortWrap}>
            <span className={styles.sortLabel}>Sort</span>
            <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Project count */}
        <div className={styles.countBar}>
          <span className={styles.countText}>
            Showing {filtered.length} of {projects.length} issues
          </span>
        </div>

        {/* Grid */}
        <div
          key={activeCategory + sortBy + search}
          className={styles.archiveGrid}
        >
          {filtered.length > 0 ? (
            filtered.map((p, i) => (
              <ArchiveCard key={p.slug} project={p} index={projects.indexOf(p)} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📭</span>
              <p className={styles.emptyText}>No projects match your search.</p>
              <button className={styles.emptyReset} onClick={() => { setSearch(""); setActiveCategory("All") }}>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
