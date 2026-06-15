"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroGradient.module.scss";

export default function HeroGradient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const animate = () => {
      // Ease towards target
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      const time = performance.now() * 0.001;
      const driftX = Math.cos(time * 0.5) * 150;
      const driftY = Math.sin(time * 0.3) * 150;

      container.style.setProperty("--mouse-x", `${currentX + driftX}px`);
      container.style.setProperty("--mouse-y", `${currentY + driftY}px`);

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Initialize target coords to center of screen roughly
    // Ensure we handle SSR gracefully by checking window
    if (typeof window !== "undefined") {
      targetX = window.innerWidth / 2;
      targetY = window.innerHeight / 2;
      currentX = targetX;
      currentY = targetY;
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={styles.heroBackground} ref={containerRef}>
      <div className={styles.gradientContainer}>
        <div className={`${styles.gradientBlob} ${styles.blob1}`} />
        <div className={`${styles.gradientBlob} ${styles.blob2}`} />
        <div className={`${styles.gradientBlob} ${styles.blob3}`} />
        <div className={styles.interactiveBlob} />
      </div>
      <div className={styles.noiseOverlay} />
    </div>
  );
}
