"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import shell from "./gameChrome.module.scss";
import styles from "./SnakeGame.module.scss";

/** ms between moves — higher = slower */
const TICK_MS = 160;
const GRID = 12;
type Dir = "up" | "down" | "left" | "right";

const DX: Record<Dir, number> = { up: 0, down: 0, left: -1, right: 1 };
const DY: Record<Dir, number> = { up: -1, down: 1, left: 0, right: 0 };

function wrapCoord(v: number): number {
  return ((v % GRID) + GRID) % GRID;
}

function randFood(exclude: Set<string>): { x: number; y: number } {
  for (let i = 0; i < 400; i++) {
    const x = Math.floor(Math.random() * GRID);
    const y = Math.floor(Math.random() * GRID);
    const key = `${x},${y}`;
    if (!exclude.has(key)) return { x, y };
  }
  return { x: 0, y: 0 };
}

export function SnakeGame() {
  const snakeRef = useRef<{ x: number; y: number }[]>([
    { x: 6, y: 9 },
    { x: 6, y: 10 },
    { x: 6, y: 11 },
  ]);
  const foodRef = useRef({ x: 4, y: 4 });
  const dirRef = useRef<Dir>("up");
  const nextDirRef = useRef<Dir>("up");
  const gameOverRef = useRef(false);
  const scoreRef = useRef(0);
  const [, setTick] = useState(0);

  const reset = useCallback(() => {
    snakeRef.current = [
      { x: 6, y: 9 },
      { x: 6, y: 10 },
      { x: 6, y: 11 },
    ];
    foodRef.current = { x: 4, y: 4 };
    dirRef.current = "up";
    nextDirRef.current = "up";
    gameOverRef.current = false;
    scoreRef.current = 0;
    setTick((n) => n + 1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        W: "up",
        s: "down",
        S: "down",
        a: "left",
        A: "left",
        d: "right",
        D: "right",
      };
      const d = map[e.key];
      if (!d) return;
      e.preventDefault();
      const cur = dirRef.current;
      if (cur === "up" && d === "down") return;
      if (cur === "down" && d === "up") return;
      if (cur === "left" && d === "right") return;
      if (cur === "right" && d === "left") return;
      nextDirRef.current = d;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const step = () => {
      if (gameOverRef.current) return;
      dirRef.current = nextDirRef.current;
      const snake = snakeRef.current;
      const head = snake[0];
      const d = dirRef.current;
      const nx = wrapCoord(head.x + DX[d]);
      const ny = wrapCoord(head.y + DY[d]);
      const newHead = { x: nx, y: ny };
      for (let i = 0; i < snake.length - 1; i++) {
        if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
          gameOverRef.current = true;
          setTick((n) => n + 1);
          return;
        }
      }
      const food = foodRef.current;
      if (newHead.x === food.x && newHead.y === food.y) {
        scoreRef.current += 1;
        snakeRef.current = [newHead, ...snake];
        const exclude = new Set<string>();
        snakeRef.current.forEach((p) => exclude.add(`${p.x},${p.y}`));
        foodRef.current = randFood(exclude);
      } else {
        snakeRef.current = [newHead, ...snake.slice(0, -1)];
      }
      setTick((n) => n + 1);
    };

    const id = window.setInterval(step, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const snake = snakeRef.current;
  const food = foodRef.current;
  const gameOver = gameOverRef.current;
  const score = scoreRef.current;

  const snakeSet = new Set(snake.map((p) => `${p.x},${p.y}`));

  return (
    <div
      className={shell.wrap}
      data-lenis-prevent
      tabIndex={0}
      role="application"
      aria-label="Snake mini game"
    >
      <div className={shell.head}>
        <span className={shell.title}>Snake</span>
        <div className={shell.scoreRow}>
          <span className={shell.score}>{String(score).padStart(3, "0")}</span>
          <button
            type="button"
            className={shell.restart}
            onClick={reset}
            aria-label="Restart game"
          >
            RESTART
          </button>
        </div>
      </div>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${GRID}, 1fr)`,
          gridTemplateRows: `repeat(${GRID}, 1fr)`,
        }}
      >
        {Array.from({ length: GRID * GRID }, (_, i) => {
          const x = i % GRID;
          const y = Math.floor(i / GRID);
          const key = `${x},${y}`;
          const isSnake = snakeSet.has(key);
          const isFood = food.x === x && food.y === y;
          let cellClass = styles.cell;
          if (isSnake) cellClass += ` ${styles.snake}`;
          if (isFood && !isSnake) cellClass += ` ${styles.food}`;
          return <div key={key} className={cellClass} />;
        })}
      </div>
      <p className={shell.hint}>
        {gameOver
          ? "Game over — press restart."
          : "Walls wrap. Hit yourself to lose. WASD or ↑↓←→"}
      </p>
    </div>
  );
}
