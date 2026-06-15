"use client";

import { useEffect, useRef } from "react";
import styles from "./ProfessionalExperience.module.scss";

const experienceData = [
  {
    id: 1,
    jobTitle: "Full Stack Engineer",
    company: "Ottr Technology",
    timePeriod: "Sep 2022 – Present",
    description:
      "Developing scalable full-stack web applications using Next.js, NestJS, React, Node.js, and PostgreSQL. Focused on building responsive user interfaces, optimizing application performance, designing APIs, and delivering maintainable solutions aligned with business goals.",
  },
  {
    id: 2,
    jobTitle: "Lead Front-End Engineer",
    company: "AsterGaze Technologies",
    timePeriod: "Sep 2024 – Feb 2025",
    description:
      "Led frontend architecture and development for modern web applications, building interactive user interfaces with advanced animations and scalable component systems using React and TypeScript.",
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
