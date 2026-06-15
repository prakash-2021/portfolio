"use client";

import { useEffect, useRef } from "react";
import styles from "./AcademicJourney.module.scss";

const academicData = [
  {
    id: 1,
    college: "Herald College Kathmandu",
    university: "University of Wolverhampton",
    stream: "BSc (Hons) in Information Technology",
    marks: "First Class Honors",
    achievements: [
      "Awarded AAA Scholarship during Bachelor's degree",
      "Developed a Pet Adoption System as an academic project",
      "Worked on projects involving Python and Java programming",
    ],
  },
  {
    id: 2,
    college: "Budhanilkantha Technical School",
    university: "CTEVT",
    stream: "Diploma in Computer Engineering",
    marks: "Distinction",
    achievements: [
      "Received scholarship as topper of the entrance examination",
      "Ranked topper in selected semesters",
      "Built strong foundations in programming, networking, and computer systems",
    ],
  },
];

export default function AcademicJourney() {
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
    <div className={styles.academicJourney}>
      <div className={styles.timeline}>
        {academicData.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={styles.academicItem}
          >
            {/* Left: index dot */}
            <div className={styles.indexCol}>
              <span className={styles.dot} />
              {i < academicData.length - 1 && <span className={styles.line} />}
            </div>

            {/* Right: content */}
            <div className={styles.content}>
              <div className={styles.college}>{item.college}</div>
              <div className={styles.university}>{item.university}</div>
              <div className={styles.stream}>{item.stream}</div>

              <div className={styles.marksBadge}>
                <span className={styles.marksLabel}>Marks</span>
                <span className={styles.marksValue}>{item.marks}</span>
              </div>

              <div className={styles.achievements}>
                <span className={styles.achieveTitle}>Achievements</span>
                <ul>
                  {item.achievements.map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
