"use client";

import type { MiniGameId } from "@/lib/sections";
import { LightsOutGame } from "./LightsOutGame";
import { MemoryFlipGame } from "./MemoryFlipGame";
import { SimonGame } from "./SimonGame";
import { SnakeGame } from "./SnakeGame";
import { TicTacToeGame } from "./TicTacToeGame";

export function SectionMiniGame({ game }: { game: MiniGameId }) {
  switch (game) {
    case "snake":
      return <SnakeGame />;
    case "tictactoe":
      return <TicTacToeGame />;
    case "memory":
      return <MemoryFlipGame />;
    case "lightsout":
      return <LightsOutGame />;
    case "simon":
      return <SimonGame />;
    default:
      return <SnakeGame />;
  }
}
