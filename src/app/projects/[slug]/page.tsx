"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { m } from "framer-motion";
import { projects } from "@/lib/projects";
import { FadeIn, ScrollProgress } from "@/components/shared";
import styles from "./ProjectDetails.module.scss";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ScrollProgress />
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/projects" className={styles.backButton}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M15 10H5M5 10L10 5M5 10L10 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Selected Projects
          </Link>
        </nav>

        <header className={styles.header}>
          <m.div
            className={styles.heroImageContainer}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img
              src={project.image}
              alt={project.title}
              className={styles.heroImage}
            />
            <div
              className={styles.heroOverlay}
              style={{ background: project.heroGradient }}
            />
          </m.div>

          <FadeIn className={styles.headerContent} y={30}>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.tagline}>{project.tagline}</p>
          </FadeIn>
        </header>

        <main className={styles.mainContent}>
          <m.div
            className={styles.layout}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className={styles.leftCol}>
              <section className={styles.section}>
                <h2>Overview</h2>
                <p className={styles.description}>{project.description}</p>
              </section>

              {project.link && (
                <m.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryButton}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Live Site
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </m.a>
              )}
            </div>

            <aside className={styles.rightCol}>
              <m.div
                className={styles.metaCard}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Role</span>
                  <span className={styles.metaValue}>{project.role}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Year</span>
                  <span className={styles.metaValue}>{project.year}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Technologies</span>
                  <div className={styles.techStack}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </m.div>
            </aside>
          </m.div>
        </main>
      </div>
    </>
  );
}
