import Link from "next/link";
import { projects } from "@/lib/projects";
import styles from "./ProjectsList.module.scss";
import CustomCursor from "@/components/ui/CustomCursor";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function ProjectsPage() {
  return (
    <>
      <CustomCursor />
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.backButton}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M15 10H5M5 10L10 5M5 10L10 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Home
          </Link>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>
            Selected <span className={styles.accent}>Projects</span>
          </h1>
          <p className={styles.subtitle}>
            A collaborative archive of design and development work built through
            teamwork and shared contributions across multiple projects.
          </p>
        </header>

        <main className={styles.grid}>
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={styles.card}
            >
              <div className={styles.cardImageContainer}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.overlay} />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.meta}>
                  <span className={styles.number}>{pad2(index + 1)}</span>
                  <span className={styles.year}>{project.year}</span>
                </div>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={styles.tagline}>{project.tagline}</p>
                <div className={styles.techStack}>
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={styles.techBadge}>
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </>
  );
}
