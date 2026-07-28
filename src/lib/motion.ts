/* ─── Motion System ────────────────────────────────────────────
 * Only 3 animation families: Entrance, Hover, Transition
 * Everything reuses these values.
 */

export const easings = {
  /* Standard cubic-bezier for all entrance/exit */
  standard: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  /* Decelerate — for exit animations */
  decelerate: [0.65, 0, 0.35, 1] as [number, number, number, number],
  /* Spring-like without actual spring (lighter) */
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
} as const;

export const durations = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  entrance: 0.6,
  loading: 0.8,
} as const;

export const delays = {
  stagger: 0.06,
  section: 0.08,
  card: 0.1,
  letter: 0.03,
} as const;

/* Shared spring presets */
export const springs = {
  gentle: { stiffness: 160, damping: 18 },
  snappy: { stiffness: 220, damping: 20 },
  soft: { stiffness: 120, damping: 14 },
} as const;

/* Hover lift — shared across all interactive cards */
export const hoverLift = {
  y: -3,
  transition: { duration: durations.fast, ease: easings.standard },
};

/* Shared shadow for card hover states */
export const hoverShadow = "4px 4px 0px var(--color-ink)";

/* Viewport defaults */
export const viewportOnce = { once: true, margin: "-80px" } as const;

/* Section entrance — used by every section header */
export const sectionEntrance = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportOnce,
  transition: { duration: durations.slow, ease: easings.standard },
};

/* Staggered children entrance */
export const staggerChild = (i: number, baseDelay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportOnce,
  transition: { duration: durations.normal, delay: baseDelay + i * delays.stagger, ease: easings.standard },
});