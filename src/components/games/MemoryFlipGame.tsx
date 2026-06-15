"use client";

import { useCallback, useState } from "react";
import shell from "./gameChrome.module.scss";
import styles from "./MemoryFlipGame.module.scss";

const PAIRS = ["α", "β", "γ", "δ"] as const;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Card = { id: number; symbol: string };

function makeDeck(): Card[] {
  const cards: Card[] = [];
  let id = 0;
  for (const s of PAIRS) {
    cards.push({ id: id++, symbol: s });
    cards.push({ id: id++, symbol: s });
  }
  return shuffle(cards);
}

export function MemoryFlipGame() {
  const [deck, setDeck] = useState(makeDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [lock, setLock] = useState(false);

  const reset = useCallback(() => {
    setDeck(makeDeck());
    setFlipped([]);
    setMatched(new Set());
    setLock(false);
  }, []);

  const onCard = (idx: number) => {
    const c = deck[idx];
    if (!c || lock) return;
    if (flipped.includes(idx)) return;
    if (matched.has(c.symbol)) return;
    if (flipped.length === 2) return;

    const next = [...flipped, idx];
    setFlipped(next);
    if (next.length < 2) return;

    const [a, b] = next;
    const symA = deck[a].symbol;
    const symB = deck[b].symbol;
    if (symA === symB) {
      setMatched((m) => new Set(m).add(symA));
      setFlipped([]);
      return;
    }
    setLock(true);
    window.setTimeout(() => {
      setFlipped([]);
      setLock(false);
    }, 650);
  };

  const done = matched.size === PAIRS.length;

  return (
    <div className={shell.wrap} data-lenis-prevent tabIndex={0}>
      <div className={shell.head}>
        <span className={shell.title}>Memory</span>
        <button type="button" className={shell.restart} onClick={reset}>
          SHUFFLE
        </button>
      </div>
      <div className={`${shell.board} ${styles.grid}`}>
        {deck.map((c, idx) => {
          const isOpen = flipped.includes(idx) || matched.has(c.symbol);
          const isMatched = matched.has(c.symbol);
          return (
            <button
              key={c.id}
              type="button"
              className={styles.card}
              onClick={() => onCard(idx)}
              disabled={isMatched || lock}
              aria-label={isOpen ? `Card ${c.symbol}` : "Hidden card"}
            >
              <span
                className={`${styles.face} ${isOpen ? styles.revealed : styles.hidden} ${isMatched ? styles.matched : ""}`}
              >
                {isOpen ? c.symbol : ""}
              </span>
            </button>
          );
        })}
      </div>
      <p className={shell.hint}>
        {done
          ? "All pairs found — shuffle for a new board."
          : "Flip two cards to find pairs."}
      </p>
    </div>
  );
}
