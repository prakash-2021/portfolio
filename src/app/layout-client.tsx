"use client";

import dynamic from "next/dynamic";
import { LazyMotion, domAnimation } from "framer-motion";
import { ThemeProvider } from "@/lib/theme-context";
import { ScrollProvider } from "@/lib/scroll-provider";

const NavSpine = dynamic(() => import("@/components/nav/NavSpine").then(m => ({ default: m.NavSpine })));
const NavSpineMobile = dynamic(() => import("@/components/nav/NavSpineMobile").then(m => ({ default: m.NavSpineMobile })));
const CursorSystem = dynamic(() => import("@/components/cursor/CursorSystem").then(m => ({ default: m.CursorSystem })));

export function LayoutClient({ children }: { children: React.ReactNode }) {
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
