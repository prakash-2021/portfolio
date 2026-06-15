"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import shell from "./gameChrome.module.scss";
import styles from "./TicTacToeGame.module.scss";

type Cell = null | "X" | "O";

function checkWinner(b: Cell[]): "X" | "O" | "draw" | null {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [i0, i1, i2] of lines) {
    if (b[i0] && b[i0] === b[i1] && b[i1] === b[i2]) return b[i0] as "X" | "O";
  }
  if (b.every(Boolean)) return "draw";
  return null;
}

function minimax(b: Cell[], isAi: boolean): number {
  const w = checkWinner(b);
  if (w === "O") return 10;
  if (w === "X") return -10;
  if (w === "draw") return 0;
  if (isAi) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (b[i] === null) {
        const nb = [...b] as Cell[];
        nb[i] = "O";
        best = Math.max(best, minimax(nb, false));
      }
    }
    return best;
  }
  let best = Infinity;
  for (let i = 0; i < 9; i++) {
    if (b[i] === null) {
      const nb = [...b] as Cell[];
      nb[i] = "X";
      best = Math.min(best, minimax(nb, true));
    }
  }
  return best;
}

function bestMove(b: Cell[]): number {
  let bestI = -1;
  let bestScore = -Infinity;
  for (let i = 0; i < 9; i++) {
    if (b[i] === null) {
      const nb = [...b] as Cell[];
      nb[i] = "O";
      const score = minimax(nb, false);
      if (score > bestScore) {
        bestScore = score;
        bestI = i;
      }
    }
  }
  return bestI;
}

const empty = (): Cell[] => Array(9).fill(null);

export function TicTacToeGame() {
  const [board, setBoard] = useState<Cell[]>(empty);
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [status, setStatus] = useState<string>("You are X — tap a square.");
  const boardRef = useRef(board);
  boardRef.current = board;

  const reset = useCallback(() => {
    setBoard(empty());
    setTurn("X");
    setStatus("You are X — tap a square.");
  }, []);

  useEffect(() => {
    if (turn !== "O") return;
    if (checkWinner(boardRef.current)) return;
    const t = window.setTimeout(() => {
      setBoard((prev) => {
        const copy = [...prev] as Cell[];
        const mi = bestMove(copy);
        if (mi < 0) return prev;
        copy[mi] = "O";
        const nw = checkWinner(copy);
        if (nw === "O") setStatus("O wins — restart?");
        else if (nw === "draw") setStatus("Draw — restart?");
        else setStatus("Your turn (X).");
        setTurn("X");
        return copy;
      });
    }, 220);
    return () => clearTimeout(t);
  }, [turn]);

  const onCell = (i: number) => {
    if (turn !== "X") return;
    if (board[i]) return;
    const w0 = checkWinner(board);
    if (w0) return;
    const copy = [...board] as Cell[];
    copy[i] = "X";
    const w = checkWinner(copy);
    setBoard(copy);
    if (w === "X") {
      setStatus("You win!");
      return;
    }
    if (w === "draw") {
      setStatus("Draw — restart?");
      return;
    }
    setStatus("Computer thinking…");
    setTurn("O");
  };

  return (
    <div className={shell.wrap} data-lenis-prevent tabIndex={0}>
      <div className={shell.head}>
        <span className={shell.title}>Tic-tac-toe</span>
        <button type="button" className={shell.restart} onClick={reset}>
          RESTART
        </button>
      </div>
      <div className={`${shell.board} ${styles.board}`}>
        {board.map((c, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.cell} ${c === "X" ? styles.cellX : ""} ${c === "O" ? styles.cellO : ""}`}
            onClick={() => onCell(i)}
            disabled={!!c || turn !== "X" || !!checkWinner(board)}
            aria-label={`Cell ${i + 1} ${c ?? "empty"}`}
          >
            {c ?? ""}
          </button>
        ))}
      </div>
      <p className={shell.hint}>{status}</p>
    </div>
  );
}
