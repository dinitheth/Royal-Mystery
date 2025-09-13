'use client';

import { useGame } from '@/app/game-context';
import { Button } from '@/components/ui/button';
import SceneContainer from './SceneContainer';
import type { GameScene } from '@/lib/game-data';

export default function MisdirectionScene({ scene }: { scene: GameScene }) {
  const { startNextScene } = useGame();

  return (
    <SceneContainer backgroundId={scene.backgroundId}>
      <h2 className="font-headline text-4xl md:text-5xl text-primary mb-4">A Confusing Turn</h2>
      <p className="text-lg md:text-xl text-foreground mb-6 max-w-2xl mx-auto">
        Just as things were starting to make sense, a new piece of information surfaces that contradicts your findings. Could this be a deliberate attempt to mislead you, or is your entire theory built on a lie?
      </p>
      <Button
        onClick={startNextScene}
        className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-lg text-lg px-8 py-6"
      >
        Re-evaluate the Evidence
      </Button>
    </SceneContainer>
  );
}
