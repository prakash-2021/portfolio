"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { person } from "@/content/profile";
import { ArrowUpRight, Download, GitHub, LinkedIn, Mail } from "./icons";

type NavLink = { href: string; label: string };

/** How far (px) a downward swipe on the handle must travel to close the sheet. */
const SWIPE_CLOSE = 80;

/**
 * Bottom sheet for small screens. Built on the Popover API, so light-dismiss,
 * Esc and focus return come from the browser; this adds the current-section
 * highlight and swipe-to-close.
 */
export function MobileNav({ links }: { links: NavLink[] }) {
  const sheet = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);

  // On open, mark the section you're currently reading.
  useEffect(() => {
    const el = sheet.current;
    if (!el) return;
    const onToggle = (e: Event) => {
      if ((e as ToggleEvent).newState !== "open") return;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const { href } of links) {
        const id = href.split("#")[1];
        const section = id ? document.getElementById(id) : null;
        if (section && section.getBoundingClientRect().top <= line) current = href;
      }
      setActive(current);
    };
    el.addEventListener("toggle", onToggle);
    return () => el.removeEventListener("toggle", onToggle);
  }, [links]);

  // Swipe the handle down to close.
  const drag = useRef<{ y: number; dy: number } | null>(null);
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { y: e.clientY, dy: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    sheet.current?.setAttribute("data-dragging", "");
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !sheet.current) return;
    drag.current.dy = Math.max(0, e.clientY - drag.current.y);
    sheet.current.style.translate = `0 ${drag.current.dy}px`;
  };
  const onPointerUp = () => {
    const el = sheet.current;
    if (!el || !drag.current) return;
    el.removeAttribute("data-dragging");
    el.style.translate = "";
    if (drag.current.dy > SWIPE_CLOSE) el.hidePopover();
    drag.current = null;
  };

  const close = () => sheet.current?.hidePopover();
  const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

  return (
    <>
      <button
        type="button"
        className="icon-btn menu-toggle lg:hidden"
        popoverTarget="mobile-nav"
        aria-label="Menu"
      >
        <span className="menu-toggle-lines" aria-hidden="true" />
      </button>

      <nav
        ref={sheet}
        id="mobile-nav"
        popover="auto"
        className="mobile-nav lg:hidden"
        aria-label="Mobile"
      >
        <div
          className="mobile-nav-handle"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-hidden="true"
        >
          <span />
        </div>

        <ul className="mobile-nav-links">
          {links.map((l, i) => (
            <li key={l.href} style={stagger(i)}>
              <Link
                href={l.href}
                onClick={close}
                aria-current={active === l.href ? "location" : undefined}
              >
                <span className="mobile-nav-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="mobile-nav-label">{l.label}</span>
                <ArrowUpRight className="mobile-nav-arrow" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mobile-nav-actions" style={stagger(links.length)}>
          <a href={person.links.resume} className="btn btn-primary" target="_blank" rel="noopener">
            <Download />
            Resume
          </a>
          <a href={`mailto:${person.email}`} className="icon-btn" aria-label="Email">
            <Mail />
          </a>
          <a
            href={person.links.github}
            className="icon-btn"
            target="_blank"
            rel="me noopener"
            aria-label="GitHub"
          >
            <GitHub />
          </a>
          <a
            href={person.links.linkedin}
            className="icon-btn"
            target="_blank"
            rel="me noopener"
            aria-label="LinkedIn"
          >
            <LinkedIn />
          </a>
        </div>
      </nav>
    </>
  );
}
