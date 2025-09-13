'use client';

import { useGame } from '@/app/game-context';
import { Button } from '@/components/ui/button';
import SceneContainer from './SceneContainer';
import type { GameScene } from '@/lib/game-data';

export default function SuspectInteractionScene({ scene }: { scene: GameScene }) {
  const { startNextScene, getSuspectById } = useGame();
  const suspect = getSuspectById(scene.data.suspectId);

  if (!suspect) return <div>Error: Suspect not found.</div>;

  return (
    <SceneContainer backgroundId={scene.backgroundId}>
      <h2 className="font-headline text-4xl md:text-5xl text-primary mb-2">{suspect.name}</h2>
      <p className="text-base text-muted-foreground italic mb-4">{suspect.title}</p>
      <p className="text-lg md:text-xl text-foreground mb-6 max-w-2xl mx-auto">
        {suspect.description}
      </p>
      <Button
        onClick={startNextScene}
        className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-lg text-lg px-8 py-6"
      >
        Continue Investigation
      </Button>
    </SceneContainer>
  );
}
