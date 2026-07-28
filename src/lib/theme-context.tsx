"use client";

import { createContext, useContext, useState, useEffect, useCallback, memo, type ReactNode } from "react";

type Theme = "print" | "midnight";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "print",
  setTheme: () => {},
  toggleTheme: () => {},
});

const STORAGE_KEY = "portfolio-theme";

function getInitial(): Theme {
  if (typeof window === "undefined") return "print";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "print" || stored === "midnight") return stored;
  return "print";
}

export const ThemeProvider = memo(function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("print");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(getInitial());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "print" ? "midnight" : "print"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
});

export function useTheme() {
  return useContext(ThemeContext);
}
