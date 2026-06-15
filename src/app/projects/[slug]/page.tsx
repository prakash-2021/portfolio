import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/projects";
import styles from "./ProjectDetails.module.scss";
import CustomCursor from "@/components/ui/CustomCursor";

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <CustomCursor />
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
          <div className={styles.heroImageContainer}>
            <img
              src={project.image}
              alt={project.title}
              className={styles.heroImage}
            />
            <div
              className={styles.heroOverlay}
              style={{ background: project.heroGradient }}
            />
          </div>

          <div className={styles.headerContent}>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.tagline}>{project.tagline}</p>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.layout}>
            <div className={styles.leftCol}>
              <section className={styles.section}>
                <h2>Overview</h2>
                <p className={styles.description}>{project.description}</p>
              </section>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryButton}
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
                </a>
              )}
            </div>

            <aside className={styles.rightCol}>
              <div className={styles.metaCard}>
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
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
