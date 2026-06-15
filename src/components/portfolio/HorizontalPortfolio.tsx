"use client";

import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import { sections } from "@/lib/sections";
import { site } from "@/lib/site";
import Link from "next/link";
import { SectionMiniGame } from "@/components/games/SectionMiniGame";
import CustomCursor from "@/components/ui/CustomCursor";
import AcademicJourney from "@/components/academic/AcademicJourney";

gsap.registerPlugin(ScrollTrigger);

const TOTAL = sections.length;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

import styles from "./HorizontalPortfolio.module.scss";

export default function HorizontalPortfolio() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const lastSectionIndexRef = useRef(0);
  const [index, setIndex] = useState(0);

  const scrollToSection = useCallback((i: number) => {
    const st = scrollTriggerRef.current;
    const lenis = lenisRef.current;
    if (!st || !lenis) return;
    
    // Calculate exact section position
    const sectionWidth = window.innerWidth;
    const targetPosition = i * sectionWidth;
    
    // Scroll to exact position
    lenis.scrollTo(targetPosition, { 
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  }, []);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    let lenis: Lenis | null = null;

    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    lenisRef.current = lenis;
    
    // Expose Lenis instance globally for other components to access
    (window as any).lenis = lenis;

    const tickerCb = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && lenis && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis ? lenis.scroll : 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const getScrollDistance = () =>
      Math.max(0, track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: "none",
      scrollTrigger: {
        scroller: document.documentElement,
        trigger: wrapper,
        pin: true,
        scrub: 1.15,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        end: () => `+=${getScrollDistance()}`,
        onUpdate: (self) => {
          const p = self.progress;
          const el = fillRef.current;
          if (el) {
            el.style.transform = `scaleX(${p})`;
          }
          const next = Math.min(
            TOTAL - 1,
            Math.floor(p * TOTAL + 1e-6),
          );
          if (next !== lastSectionIndexRef.current) {
            lastSectionIndexRef.current = next;
            setIndex(next);
          }
        },
      },
    });

    scrollTriggerRef.current = tween.scrollTrigger ?? null;

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tickerCb);
      tween.scrollTrigger?.kill();
      tween.kill();
      lenis?.destroy();
      lenisRef.current = null;
      scrollTriggerRef.current = null;
      
      // Clean up global Lenis reference
      (window as any).lenis = null;
    };
  }, []);

  const section = sections[index] ?? sections[0];
  const num = pad2(index + 1);

  return (
    <>
      <CustomCursor />
      <div className={styles.root}>
        <div className={styles.scrollProgress}>
          <div className={styles.scrollTrack}>
            <div ref={fillRef} className={styles.scrollFill} />
          </div>
          <div className={styles.checkpoints} role="tablist" aria-label="Sections">
            {sections.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={index === i}
                aria-label={`Go to ${pad2(i + 1)} ${s.label}`}
                className={styles.checkpoint}
                data-active={index === i ? "true" : "false"}
                onClick={() => scrollToSection(i)}
              >
                {pad2(i + 1)}
              </button>
            ))}
          </div>
        </div>

        <div className={`${styles.chrome} ${styles.topLeft}`} aria-hidden>
          {num} — {section.label}
        </div>
        <div className={`${styles.chrome} ${styles.topRight}`} aria-hidden>
          <span className={styles.dot} />
        </div>
        <div className={`${styles.chrome} ${styles.bottomLeft}`} aria-hidden>
          {num} / {pad2(TOTAL)}
        </div>
        <div className={`${styles.chrome} ${styles.bottomRight}`}>
          <a href={`mailto:${site.email}`}>{site.name}</a>
        </div>

        <div ref={wrapperRef} className={styles.pinWrap}>
          <div ref={trackRef} className={styles.track}>
            {sections.map((s, i) => (
              <section
                key={s.id}
                className={styles.panel}
                aria-label={`${pad2(i + 1)} ${s.label}`}
              >
                <span className={styles.bgNum} aria-hidden>
                  {pad2(i + 1)}
                </span>
                <div className={styles.content}>
                  <p className={styles.kicker}>{pad2(i + 1)} — {s.label}</p>
                  {s.id === "work" ? (
                    <>
                      <h1 className={styles.headline}>
                        {s.titleBefore}{" "}
                        <span className={styles.headlineAccent}>
                          {s.titleAccent}
                        </span>
                      </h1>
                      <p className={styles.subtitle}>{s.subtitle}</p>
                      <div className={styles.projectsButtonContainer}>
                        <Link href="/projects" className={styles.projectsButton}>
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
                    </>
                  ) : s.id === "education" ? (
                    <>
                      <h1 className={styles.headline}>
                        {s.titleBefore}{" "}
                        <span className={styles.headlineAccent}>
                          {s.titleAccent}
                        </span>
                      </h1>
                      <p className={styles.subtitle}>{s.subtitle}</p>
                      <AcademicJourney />
                    </>
                  ) : (
                    <>
                      <h1 className={styles.headline}>
                        {s.titleBefore}{" "}
                        <span className={styles.headlineAccent}>
                          {s.titleAccent}
                        </span>
                      </h1>
                      <p className={styles.subtitle}>{s.subtitle}</p>
                    </>
                  )}
                </div>
                <div className={styles.side}>
                  <SectionMiniGame game={s.miniGame} />
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
