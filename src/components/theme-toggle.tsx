"use client";

import { useEffect } from "react";
import { Moon, Sun } from "./icons";

const KEY = "color-scheme";

function meta() {
  return document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
}

/**
 * Two-state toggle over a three-state model: following the system (nothing stored)
 * or an explicit override. Choosing the scheme the system already uses clears the override.
 */
export function ThemeToggle() {
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      const m = meta();
      if (e.key === KEY && m) m.content = e.newValue ?? "light dark";
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function toggle() {
    const m = meta();
    if (!m) return;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const current = m.content === "dark" || m.content === "light" ? m.content : system;
    const target = current === "dark" ? "light" : "dark";
    const stored = target === system ? null : target;
    try {
      if (stored) localStorage.setItem(KEY, stored);
      else localStorage.removeItem(KEY);
    } catch {
      // Storage blocked: still switch for this page view.
    }
    m.content = stored ?? "light dark";
  }

  return (
    <button type="button" className="icon-btn" onClick={toggle}>
      <span className="theme-icon-dark">
        <Moon />
        <span className="sr-only">Switch to dark theme</span>
      </span>
      <span className="theme-icon-light">
        <Sun />
        <span className="sr-only">Switch to light theme</span>
      </span>
    </button>
  );
}
