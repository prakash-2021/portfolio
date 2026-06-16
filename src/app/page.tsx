"use client";

import { useEffect, useRef, useState } from "react";
import { sections } from "@/lib/sections";
import { site } from "@/lib/site";
import Link from "next/link";
import CustomCursor from "@/components/ui/CustomCursor";
import HeroGradient from "@/components/ui/HeroGradient";
import { SectionMiniGame } from "@/components/games/SectionMiniGame";
import AcademicJourney from "@/components/academic/AcademicJourney";
import ProjectsShowcase from "@/components/projects/ProjectsShowcase";
import ProfessionalExperience from "@/components/work/ProfessionalExperience";
import styles from "./VerticalPortfolio.module.scss";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function VerticalPortfolio() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(
    new Set(),
  );
  const [activeSection, setActiveSection] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0",
          );

          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(index));
            // Once revealed, stop observing so it never reverts
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    const sectionElements = document.querySelectorAll(".section-observer");
    sectionElements.forEach((element) => observerRef.current?.observe(element));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const sectionElements =
        document.querySelectorAll<HTMLElement>(".section-observer");

      if (sectionElements.length === 0) return;

      const referencePoint = 140;
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      sectionElements.forEach((section, index) => {
        const top = section.getBoundingClientRect().top;
        const distance = Math.abs(top - referencePoint);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });

      setActiveSection(bestIndex);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <div className={styles.verticalPortfolio}>
        {/* Navigation */}
        <nav className={styles.navigation}>
          <div className={styles.navContent}>
            <div className={styles.navLinks}>
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={styles.navLink}
                  data-active={activeSection === index ? "true" : "false"}
                >
                  {pad2(index + 1)} {section.label}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className={styles.hamburgerBtn}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div
                className={`${styles.hamburgerIcon} ${isMobileMenuOpen ? styles.open : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ""}`}
        >
          <div className={styles.mobileMenuLinks}>
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={styles.mobileNavLink}
                data-active={activeSection === index ? "true" : "false"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className={styles.mobileNavNumber}>
                  {pad2(index + 1)}
                </span>
                {section.label}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <main className={styles.main}>
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className={`${styles.section} ${visibleSections.has(index) ? styles.visible : ""} section-observer`}
              data-index={index}
            >
              {section.id === "intro" && <HeroGradient />}
              <div className={styles.sectionContent}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNumber}>
                    {pad2(index + 1)}
                  </span>
                  <h2 className={styles.sectionLabel}>{section.label}</h2>
                </div>

                <div className={styles.sectionBody}>
                  <h1 className={styles.headline}>
                    {section.titleBefore}{" "}
                    <span className={styles.headlineAccent}>
                      {section.titleAccent}
                    </span>
                  </h1>
                  <p className={styles.subtitle}>{section.subtitle}</p>

                  {/* Section-specific content */}
                  {section.id === "work" && (
                    <div className={styles.workContent}>
                      <ProjectsShowcase />
                      <div className={styles.buttonContainer}>
                        <Link href="/projects" className={styles.primaryButton}>
                          View All Projects
                          <svg viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path
                              d="M3 8h10M9 4l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}

                  {section.id === "education" && (
                    <div className={styles.educationContent}>
                      <AcademicJourney />
                    </div>
                  )}

                  {section.id === "experience" && (
                    <div className={styles.experienceContent}>
                      <ProfessionalExperience />
                    </div>
                  )}

                  {section.id === "stack" && (
                    <div className={styles.stackContent}>
                      <div className={styles.techGrid}>
                        {[
                          "Next.js",
                          "React.js",
                          "TypeScript",
                          "Tailwind",
                          "SASS",
                          "Web Animation",
                          "Three.js",
                          "GSAP",
                          "Node.js",
                          "NestJS",
                          "Express",
                          "REST APIs",
                          "WebSockets",
                          "Swagger",
                          "PostgreSQL",
                          "MySQL",
                          "MongoDB",
                          "Prisma",
                          "Strapi",
                          "Directus",
                          "Docker",
                          "Git",
                          "CI/CD",
                          "Jira",
                        ].map((tech, i) => (
                          <div
                            key={i}
                            className={`${styles.techCard} ${visibleSections.has(index) ? styles.visible : ""}`}
                          >
                            <span className={styles.techIcon}>⚡</span>
                            <span className={styles.techName}>{tech}</span>
                          </div>
                        ))}
                      </div>

                      {/* AI & LLM Section */}
                      <div
                        className={`${styles.aiSection} ${visibleSections.has(index) ? styles.visible : ""}`}
                      >
                        <div className={styles.aiSectionHeader}>
                          <span className={styles.aiSectionBadge}>✦ Keen</span>
                          <h3 className={styles.aiSectionTitle}>
                            Working with AI
                          </h3>
                          <p className={styles.aiSectionDesc}>
                            Lately I&apos;ve been diving deep into the AI
                            ecosystem — from day-to-day dev tooling to building
                            full-fledged LLM-powered applications.
                          </p>
                        </div>

                        <div className={styles.aiCategories}>
                          {/* AI-assisted development */}
                          <div className={styles.aiCategory}>
                            <span className={styles.aiCategoryLabel}>
                              AI-assisted development
                            </span>
                            <div className={styles.aiGrid}>
                              {[
                                { icon: "🦙", name: "Claude Code" },
                                { icon: "🖱️", name: "Cursor" },
                                { icon: "🚀", name: "Antigravity" },
                                { icon: "🤖", name: "GitHub Copilot" },
                              ].map((tool, i) => (
                                <div
                                  key={i}
                                  className={`${styles.aiCard} ${visibleSections.has(index) ? styles.visible : ""}`}
                                  style={{ transitionDelay: `${i * 60}ms` }}
                                >
                                  <span className={styles.aiCardIcon}>
                                    {tool.icon}
                                  </span>
                                  <span className={styles.aiCardName}>
                                    {tool.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* AI skills & capabilities */}
                          <div className={styles.aiCategory}>
                            <span className={styles.aiCategoryLabel}>
                              AI skills &amp; capabilities
                            </span>
                            <div className={styles.aiGrid}>
                              {[
                                { icon: "🐛", name: "AI debugging & testing" },
                                { icon: "🔗", name: "Working with LLM APIs" },
                                { icon: "📚", name: "RAG" },
                                { icon: "💡", name: "Building AI apps" },
                                { icon: "🗣️", name: "AI chatbots" },
                                { icon: "🔧", name: "n8n · LangChain · MCP" },
                              ].map((skill, i) => (
                                <div
                                  key={i}
                                  className={`${styles.aiCard} ${styles.aiCardSkill} ${visibleSections.has(index) ? styles.visible : ""}`}
                                  style={{
                                    transitionDelay: `${(i + 4) * 60}ms`,
                                  }}
                                >
                                  <span className={styles.aiCardIcon}>
                                    {skill.icon}
                                  </span>
                                  <span className={styles.aiCardName}>
                                    {skill.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "intro" && (
                    <div className={styles.introContent}>
                      <div className={styles.introActions}>
                        <a
                          href={site.links.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.primaryButton}
                        >
                          View Resume
                          <svg viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path
                              d="M3 8h10M9 4l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}

                  {section.id === "contact" && (
                    <div className={styles.contactContent}>
                      {/* Direct contact */}
                      <div className={styles.contactDirect}>
                        <a
                          href={`mailto:${site.email}`}
                          className={styles.contactChip}
                        >
                          {/* Email icon */}
                          <svg viewBox="0 0 20 20" fill="none" aria-hidden>
                            <rect
                              x="2"
                              y="5"
                              width="16"
                              height="11"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M2 7l8 5 8-5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          {site.email}
                        </a>
                        <a
                          href={`tel:${site.phone}`}
                          className={styles.contactChip}
                        >
                          {/* Phone icon */}
                          <svg viewBox="0 0 20 20" fill="none" aria-hidden>
                            <path
                              d="M4 4h4l1.5 3.5-2 1.5a10 10 0 004.5 4.5l1.5-2L17 13v4a1 1 0 01-1 1C7.163 18 2 12.837 2 5a1 1 0 011-1z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {site.phone}
                        </a>
                      </div>

                      {/* Social cards */}
                      <div className={styles.socialGrid}>
                        <a
                          href={site.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialCard}
                          data-platform="linkedin"
                        >
                          <span className={styles.socialCardIcon}>
                            {/* LinkedIn */}
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </span>
                          <span className={styles.socialCardLabel}>
                            LinkedIn
                          </span>
                          <span className={styles.socialCardArrow}>↗</span>
                        </a>

                        <a
                          href={site.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialCard}
                          data-platform="github"
                        >
                          <span className={styles.socialCardIcon}>
                            {/* GitHub */}
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden
                            >
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                          </span>
                          <span className={styles.socialCardLabel}>GitHub</span>
                          <span className={styles.socialCardArrow}>↗</span>
                        </a>

                        <a
                          href={site.links.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialCard}
                          data-platform="instagram"
                        >
                          <span className={styles.socialCardIcon}>
                            {/* Instagram */}
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden
                            >
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                          </span>
                          <span className={styles.socialCardLabel}>
                            Instagram
                          </span>
                          <span className={styles.socialCardArrow}>↗</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Side panel with mini game */}
              <div className={styles.sidePanel}>
                <SectionMiniGame game={section.miniGame} />
              </div>
            </section>
          ))}
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p className={styles.footerHint}>
              🎮 Don&apos;t forget to enjoy the mini games in each section!
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
