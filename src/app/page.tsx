import { GameProvider } from '@/app/game-context';
import GameUI from '@/components/game/GameUI';

export default function Home() {
  return (
    <GameProvider>
      <GameUI />
    </GameProvider>
  );
}
