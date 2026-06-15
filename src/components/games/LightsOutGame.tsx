"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import shell from "./gameChrome.module.scss";
import styles from "./LightsOutGame.module.scss";

function toggleAt(g: boolean[], i: number) {
  const next = [...g];
  const affected = [i];
  if (i % 3 > 0) affected.push(i - 1);
  if (i % 3 < 2) affected.push(i + 1);
  if (i > 2) affected.push(i - 3);
  if (i < 6) affected.push(i + 3);
  for (const j of affected) next[j] = !next[j];
  return next;
}

function randomBoard(): boolean[] {
  let g = Array(9).fill(false) as boolean[];
  for (let k = 0; k < 14; k++) {
    g = toggleAt(g, Math.floor(Math.random() * 9));
  }
  return g;
}

export function LightsOutGame() {
  const [grid, setGrid] = useState<boolean[]>(() => Array(9).fill(false));
  const [isHydrated, setIsHydrated] = useState(false);

  // Generate random board only after hydration
  useEffect(() => {
    setIsHydrated(true);
    setGrid(randomBoard());
  }, []);

  const moves = useMemo(
    () => grid.reduce((n, on) => n + (on ? 1 : 0), 0),
    [grid],
  );

  const won = grid.every((on) => !on);

  const reset = useCallback(() => {
    setGrid(randomBoard());
  }, []);

  const onCell = (i: number) => {
    setGrid((g) => toggleAt(g, i));
  };

  return (
    <div className={shell.wrap} data-lenis-prevent tabIndex={0}>
      <div className={shell.head}>
        <span className={shell.title}>Lights out</span>
        <button type="button" className={shell.restart} onClick={reset}>
          NEW
        </button>
      </div>
      <div className={`${shell.board} ${styles.grid}`}>
        {grid.map((on, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.cell} ${on ? styles.on : styles.off}`}
            onClick={() => onCell(i)}
            aria-label={`Light ${i + 1} ${on ? "on" : "off"}`}
          />
        ))}
      </div>
      <p className={shell.hint}>
        {won
          ? "All lights off — nice."
          : `Tap to toggle + neighbors. Lit cells: ${moves}.`}
      </p>
    </div>
  );
}
