"use client";

import { useEffect, useRef } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ThemeProvider } from "@/lib/theme-context";
import { ScrollProvider } from "@/lib/scroll-provider";
import { NavSpine, setLenis } from "@/components/nav/NavSpine";
import { NavSpineMobile, setLenisMobile } from "@/components/nav/NavSpineMobile";
import { CursorSystem } from "@/components/cursor/CursorSystem";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.14,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0.6,
      infinite: false,
    });
    
    lenisRef.current = lenis;
    setLenis(lenis);
    setLenisMobile(lenis);

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    
    rafRef.current = requestAnimationFrame(raf);
    
    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      setLenis(null);
      setLenisMobile(null);
      lenisRef.current = null;
    };
  }, []);

  return (
      <LazyMotion features={domAnimation}>
      <ThemeProvider>
        <ScrollProvider>
          <div style={{ background: "var(--color-paper)" }}>
            {children}
            <div className="hidden lg:block">
              <NavSpine />
            </div>
            <div className="block lg:hidden">
              <NavSpineMobile />
            </div>
            <CursorSystem />
          </div>
        </ScrollProvider>
      </ThemeProvider>
    </LazyMotion>
  );
}
