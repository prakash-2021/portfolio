import { SnakeGame } from "@/components/games/SnakeGame";
import { PageShell } from "@/components/layout/PageShell";

export default function SnakeGamePage() {
  return (
    <PageShell
      title="Snake"
      lede="Full-width version of the intro panel mini-game — use arrow keys or on-screen controls."
    >
      <SnakeGame />
    </PageShell>
  );
}
