import Link from "next/link";
import { projects } from "@/lib/projects";
import styles from "./ProjectsShowcase.module.scss";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function ProjectsShowcase() {
  // Show first 3 projects as showcase
  const showcaseProjects = projects.slice(0, 3);

  return (
    <div className={styles.projectsShowcase}>
      <div className={styles.projectsGrid}>
        {showcaseProjects.map((project, index) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.projectCard}>
            <div className={styles.cardInner}>
              <div className={styles.cardImage}>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
                <div className={styles.imageOverlay} />
                <div className={styles.cardGlow} style={{ background: project.heroGradient }} />
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.projectHeader}>
                  <span className={styles.projectNumber}>{pad2(index + 1)}</span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>
                <p className={styles.projectTagline}>{project.tagline}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
