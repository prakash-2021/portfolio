"use client";

import { useState, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { toolCategories, type Tool, type ToolCategory } from "@/lib/tools";
import { cn } from "@/lib/cn";
import styles from "./ToolkitSection.module.scss";

/* ─── Tool Logo ─────────────────────────────────────────────── */

const ToolLogo = memo(function ToolLogo({
  tool,
  isExpanded,
  onClick,
  accentColor,
}: {
  tool: Tool
  isExpanded: boolean
  onClick: () => void
  accentColor: string
}) {
  const logoUrl = tool.localIcon
    ? `/icons/${tool.localIcon}.svg`
    : `https://cdn.simpleicons.org/${tool.simpleIconSlug}/${accentColor.replace("#", "")}`

  return (
    <motion.button
      onClick={onClick}
      className={cn(styles.toolLogo, isExpanded && styles.toolLogoExpanded)}
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ "--accent": accentColor } as React.CSSProperties}
      data-cursor-toolkit
    >
      <div className={styles.logoIcon}>
        <img
          src={logoUrl}
          alt={tool.name}
          width={40} height={40} className={styles.logoImg}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            (e.currentTarget.nextElementSibling as HTMLElement)?.style.setProperty("display", "flex");
          }}
        />
        <span className={styles.logoFallback}>{tool.name[0]}</span>
      </div>
      <span className={styles.logoName}>{tool.name}</span>
      <span className={styles.logoExp}>{tool.experience}</span>
    </motion.button>
  )
})

/* ─── Tool Detail (expanded) ─────────────────────────────────── */

const ToolDetail = memo(function ToolDetail({ tool, accentColor }: { tool: Tool; accentColor: string }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={styles.toolDetail}
      style={{ "--accent": accentColor } as React.CSSProperties}
    >
      <div className={styles.detailGrid}>
        <div className={styles.detailSection}>
          <span className={styles.detailLabel}>Experience</span>
          <span className={styles.detailValue}>{tool.experience}</span>
        </div>
        <div className={styles.detailSection}>
          <span className={styles.detailLabel}>Confidence</span>
          <div className={styles.confidenceBar}>
            <motion.div
              className={styles.confidenceFill}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: tool.confidence / 5 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </div>
        <div className={cn(styles.detailSection, styles.detailFull)}>
          <span className={styles.detailLabel}>Favorite Feature</span>
          <span className={styles.detailValue}>{tool.favoriteFeature}</span>
        </div>
        <div className={cn(styles.detailSection, styles.detailFull)}>
          <span className={styles.detailLabel}>Projects</span>
          <div className={styles.projectTags}>
            {tool.projects.map((p) => (
              <span key={p} className={styles.projectTag}>{p}</span>
            ))}
          </div>
        </div>
        <div className={cn(styles.detailSection, styles.detailFull)}>
          <span className={styles.detailLabel}>Fun Fact</span>
          <span className={styles.detailFun}>{tool.funFact}</span>
        </div>
      </div>
    </motion.div>
  )
})

/* ─── Category Panel ─────────────────────────────────────────── */

const CategoryPanel = memo(function CategoryPanel({
  category,
  index,
  expandedTool,
  setExpandedTool,
}: {
  category: ToolCategory
  index: number
  expandedTool: string | null
  setExpandedTool: (slug: string | null) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const catColors = {
    "--cat-color": category.color,
    "--cat-bg": category.bgColor,
    "--cat-border": category.borderColor,
  } as React.CSSProperties

  return (
    <motion.div
      ref={ref}
      className={styles.categoryPanel}
      style={catColors}
      initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -0.3 : 0.3 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: 0.06 * index, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className={styles.cornerFold} style={{ borderRightColor: category.color, borderTopColor: "transparent" }} />
      <div className={styles.tape} />
      <div className={styles.panelHeader}>
        <div className={styles.panelLabel}>
          <span className={styles.panelNumber}>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.panelCategory} style={{ color: category.color }}>{category.label}</span>
        </div>
        <p className={styles.panelDesc}>{category.description}</p>
      </div>
      <div className={styles.logoGrid}>
        {category.tools.map((tool) => (
          <ToolLogo
            key={tool.slug}
            tool={tool}
            isExpanded={expandedTool === tool.slug}
            onClick={() => setExpandedTool(expandedTool === tool.slug ? null : tool.slug)}
            accentColor={category.color}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {expandedTool &&
          (() => {
            const t = category.tools.find((tool) => tool.slug === expandedTool)
            return t ? <ToolDetail key={t.slug} tool={t} accentColor={category.color} /> : null
          })()}
      </AnimatePresence>
      <span className={styles.annotation}>{category.tools.length} tools</span>
      <div className={styles.halftoneCorner} />
    </motion.div>
  )
})

/* ─── Background Decorations ────────────────────────────────── */

function BlueprintBg() {
  return (
    <div className={styles.blueprintBg}>
      <svg className={styles.blueprintSvg} viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
        </pattern>
        <rect width="1200" height="800" fill="url(#grid)" />
        {/* Technical sketch lines */}
        <line x1="200" y1="100" x2="350" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
        <circle cx="275" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" opacity="0.06" fill="none" />
        <rect x="800" y="600" width="120" height="80" stroke="currentColor" strokeWidth="0.5" opacity="0.06" fill="none" />
        <text x="810" y="625" fill="currentColor" opacity="0.06" fontSize="8" fontFamily="monospace">ANNOTATION AREA</text>
        {/* Dimension lines */}
        <line x1="50" y1="50" x2="50" y2="200" stroke="currentColor" strokeWidth="0.3" opacity="0.05" strokeDasharray="2 2" />
        <line x1="45" y1="50" x2="55" y2="50" stroke="currentColor" strokeWidth="0.3" opacity="0.05" />
        <line x1="45" y1="200" x2="55" y2="200" stroke="currentColor" strokeWidth="0.3" opacity="0.05" />
      </svg>
    </div>
  )
}

/* ─── Main Section ───────────────────────────────────────────── */

export function ToolkitSection() {
  const [expandedTool, setExpandedTool] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section data-chapter={3} data-chapter-id="toolkit" className={styles.section} ref={ref}>
      <BlueprintBg />

      {/* Halftone overlay */}
      <div className={styles.halftoneOverlay} />

      {/* Section header */}
      <motion.div
        className={styles.sectionHeader}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.span
          className={styles.sectionLabel}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          /// Equipment Inventory
        </motion.span>
        <h2 className={styles.sectionTitle}>
          Engineering <span className={styles.sectionAccent}>Toolkit</span>
        </h2>
        <p className={styles.sectionDesc}>
          Every tool I reach for when building products — organized by discipline.
          Click any logo to see how I use it.
        </p>
      </motion.div>

      {/* Tooltip note */}
      <motion.div
        className={styles.noteSticky}
        initial={{ opacity: 0, rotate: -3, scale: 0.9 }}
        animate={isInView ? { opacity: 1, rotate: -2, scale: 1 } : { opacity: 0, rotate: -3, scale: 0.9 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className={styles.noteText}>hover &amp; click any logo →</span>
      </motion.div>

      {/* Category panels */}
      <div className={styles.panelsGrid}>
        {toolCategories.map((cat, i) => (
          <CategoryPanel
            key={cat.id}
            category={cat}
            index={i}
            expandedTool={expandedTool}
            setExpandedTool={setExpandedTool}
          />
        ))}
      </div>

      {/* Floating note at bottom */}
      <motion.div
        className={styles.footerNote}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <span className={styles.footerIcon}>⚡</span>
        <span>Stack evolves constantly — this is my current loadout.</span>
      </motion.div>
    </section>
  )
}
