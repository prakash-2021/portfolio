"use client";

import { useEffect, useRef } from "react";
import styles from "./ProfessionalExperience.module.scss";

const experienceData = [
  {
    id: 1,
    jobTitle: "Full Stack Developer",
    company: "Ottr Technology (Kathmandu)",
    timePeriod: "Sep, 2022 - May, 2026",
    description:
      "Contributed as a developer and code reviewer across 20+ client projects, building scalable full-stack web applications using Next.js, React.js, NestJS, and PostgreSQL. Conducted code reviews to maintain code quality, consistency, and adherence to best practices across the team. Developed responsive, high-performance user interfaces, with delivered projects achieving Lighthouse performance scores of 90+. Collaborated with cross-functional teams to deliver and deploy production-ready software solutions for both Nepali and international clients.",
  },
  {
    id: 2,
    jobTitle: "Lead Frontend Developer",
    company: "Astergaze Technologies",
    timePeriod: "Sep, 2024 - Feb, 2025",
    description:
      "Directed frontend architecture and development decisions as a part-time Lead Frontend Developer. Designed and engineered dynamic, responsive UI components utilizing modern design practices. Integrated smooth animations to create highly engaging user interfaces while enforcing stringent performance, quality, and consistency standards across all frontend systems.",
  },
  {
    id: 3,
    jobTitle: "Freelance Full Stack Engineer",
    company: "Self-Employed",
    timePeriod: "2023 – Present",
    description:
      "Working with clients to design and develop full-stack web applications, SaaS platforms, dashboards, APIs, and automation systems using React, Next.js, NestJS, Node.js, PostgreSQL, and TypeScript.",
  },
];

export default function ProfessionalExperience() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.professionalExperience}>
      <div className={styles.timeline}>
        {experienceData.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={styles.experienceItem}
          >
            {/* Left: index dot */}
            <div className={styles.indexCol}>
              <span className={styles.dot} />
              {i < experienceData.length - 1 && (
                <span className={styles.line} />
              )}
            </div>

            {/* Right: content */}
            <div className={styles.content}>
              <div className={styles.jobTitle}>{item.jobTitle}</div>
              <div className={styles.company}>{item.company}</div>
              <div className={styles.timePeriod}>{item.timePeriod}</div>
              <div className={styles.description}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
