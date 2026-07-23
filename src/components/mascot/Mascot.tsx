"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function Mascot({
  className,
  size = 32,
  animate = true,
  action,
}: {
  className?: string
  size?: number
  animate?: boolean
  action?: "wave" | "point" | "sit" | "walk"
}) {
  return (
    <motion.svg
      viewBox="0 0 40 50"
      width={size}
      height={size * 1.25}
      fill="none"
      className={cn("overflow-visible", className)}
      animate={
        animate
          ? action === "wave"
            ? { rotate: [0, -8, 0, -8, 0] }
            : action === "point"
              ? { x: [0, 3, 0] }
              : action === "walk"
                ? { x: [0, 5, 0], y: [0, -1, 0] }
                : { y: [0, -1, 0] }
          : undefined
      }
      transition={
        animate
          ? { repeat: Infinity, duration: action === "wave" ? 2 : 3, ease: "easeInOut" }
          : undefined
      }
    >
      {/* Body */}
      <rect x="14" y="20" width="12" height="18" rx="2.5" fill="#1a1a2e" />
      {/* Head */}
      <circle cx="20" cy="13" r="8" fill="#1a1a2e" />
      {/* Eyes */}
      <circle cx="17" cy="11" r="1.2" fill="#faf8f3" />
      <circle cx="23" cy="11" r="1.2" fill="#faf8f3" />
      {/* Smile */}
      <path d="M16 15 Q20 17.5 24 15" stroke="#faf8f3" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* Hood */}
      <path d="M14 10 L20 3 L26 10" stroke="#e63946" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Left arm */}
      {action === "wave" ? (
        <motion.path d="M14 25 L6 18" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round"
          animate={{ rotate: [0, -15, 0, -15, 0], transformOrigin: "14px 25px" }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      ) : action === "point" ? (
        <path d="M14 25 L7 22" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d="M14 25 L8 28" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
      )}
      {/* Right arm */}
      <path d="M26 25 L32 28" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
      {/* Code symbol */}
      <text x="26" y="40" fontSize="5" fill="#e63946" fontFamily="monospace" fontWeight="700">&lt;/&gt;</text>
    </motion.svg>
  )
}
