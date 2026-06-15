"use client";

import { useCallback, useState } from "react";
import shell from "./gameChrome.module.scss";
import styles from "./SimonGame.module.scss";

const PADS = 4;

export function SimonGame() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerStep, setPlayerStep] = useState(0);
  const [phase, setPhase] = useState<"off" | "show" | "play" | "over">("off");
  const [activePad, setActivePad] = useState<number | null>(null);
  const [status, setStatus] = useState("Press start.");

  const flash = useCallback((pad: number, ms: number) => {
    setActivePad(pad);
    return new Promise<void>((resolve) => {
      window.setTimeout(() => {
        setActivePad(null);
        window.setTimeout(resolve, 80);
      }, ms);
    });
  }, []);

  const playSequence = useCallback(
    async (seq: number[]) => {
      setPhase("show");
      setStatus("Watch…");
      for (const p of seq) {
        await flash(p, 300);
      }
      setPhase("play");
      setPlayerStep(0);
      setStatus("Repeat the pattern.");
    },
    [flash],
  );

  const startGame = () => {
    const first = [Math.floor(Math.random() * PADS)];
    setSequence(first);
    setPlayerStep(0);
    void playSequence(first);
  };

  const reset = () => {
    setSequence([]);
    setPlayerStep(0);
    setPhase("off");
    setStatus("Press start.");
  };

  const onPad = (pad: number) => {
    if (phase !== "play") return;
    const expected = sequence[playerStep];
    void flash(pad, 140);
    if (pad !== expected) {
      setPhase("over");
      setStatus(`Game over — reached ${sequence.length} steps.`);
      return;
    }
    const nextStep = playerStep + 1;
    if (nextStep >= sequence.length) {
      const nextSeq = [...sequence, Math.floor(Math.random() * PADS)];
      setSequence(nextSeq);
      setPlayerStep(0);
      setStatus("Next round…");
      setPhase("show");
      window.setTimeout(() => void playSequence(nextSeq), 450);
      return;
    }
    setPlayerStep(nextStep);
  };

  return (
    <div className={shell.wrap} data-lenis-prevent tabIndex={0}>
      <div className={shell.head}>
        <span className={shell.title}>Simon</span>
        <div className={shell.scoreRow}>
          <span className={shell.score}>
            {String(sequence.length).padStart(2, "0")}
          </span>
          <button type="button" className={shell.restart} onClick={reset}>
            RESET
          </button>
        </div>
      </div>
      <div className={styles.padWrap}>
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            type="button"
            className={`${styles.pad} ${styles[`p${i}` as "p0" | "p1" | "p2" | "p3"]} ${activePad === i ? styles.padActive : ""}`}
            onClick={() => onPad(i)}
            disabled={phase === "show"}
            aria-label={`Pad ${i + 1}`}
          />
        ))}
      </div>
      <p className={shell.hint}>{status}</p>
      {(phase === "off" || phase === "over") && (
        <button type="button" className={shell.restart} onClick={startGame}>
          {phase === "over" ? "PLAY AGAIN" : "START"}
        </button>
      )}
    </div>
  );
}
