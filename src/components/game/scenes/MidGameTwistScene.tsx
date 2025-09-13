'use client';

import { useGame } from '@/app/game-context';
import { Button } from '@/components/ui/button';
import SceneContainer from './SceneContainer';
import type { GameScene } from '@/lib/game-data';

export default function MidGameTwistScene({ scene }: { scene: GameScene }) {
  const { startNextScene } = useGame();

  return (
    <SceneContainer backgroundId={scene.backgroundId}>
      <h2 className="font-headline text-4xl md:text-5xl text-primary mb-4">A Shocking Revelation!</h2>
      <p className="text-lg md:text-xl text-foreground mb-6 max-w-2xl mx-auto">
        A hidden witness steps forward, revealing that the poison was not meant for the King, but for someone else at the royal table. The true target's identity changes everything. The plot is thicker than you imagined.
      </p>
      <Button
        onClick={startNextScene}
        className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-lg text-lg px-8 py-6"
      >
        Press On
      </Button>
    </SceneContainer>
  );
}
