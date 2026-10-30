"use client";

import Link from "next/link";
import { Menu } from "./icons";

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  return (
    <>
      <button type="button" className="icon-btn lg:hidden" popoverTarget="mobile-nav">
        <Menu />
        <span className="sr-only">Menu</span>
      </button>
      <nav id="mobile-nav" popover="auto" className="mobile-nav lg:hidden" aria-label="Mobile">
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={(e) => e.currentTarget.closest<HTMLElement>("[popover]")?.hidePopover()}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
