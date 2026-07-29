"use client";

import dynamic from "next/dynamic";
import { LazyMotion, domAnimation } from "framer-motion";
import { ThemeProvider } from "@/lib/theme-context";
import { ScrollProvider } from "@/lib/scroll-provider";
import { useDevice } from "@/hooks/useDevice";

const NavSpine = dynamic(() => import("@/components/nav/NavSpine").then(m => ({ default: m.NavSpine })));
const NavSpineMobile = dynamic(() => import("@/components/nav/NavSpineMobile").then(m => ({ default: m.NavSpineMobile })));
const CursorSystem = dynamic(() => import("@/components/cursor/CursorSystem").then(m => ({ default: m.CursorSystem })));

function ClientSideCursor() {
  const { isTouch } = useDevice();
  if (isTouch) return null;
  return <CursorSystem />;
}

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
            <ClientSideCursor />
          </div>
        </ScrollProvider>
      </ThemeProvider>
    </LazyMotion>
  );
}
