'use client';

import { useGame } from '@/app/game-context';
import { Button } from '@/components/ui/button';
import SceneContainer from './SceneContainer';
import { useEffect } from 'react';
import type { GameScene } from '@/lib/game-data';

export default function ClueDiscoveryScene({ scene }: { scene: GameScene }) {
  const { startNextScene, addClue, getClueById } = useGame();
  const clue = getClueById(scene.data.clueId);

  useEffect(() => {
    if (clue) {
      addClue(clue.id);
    }
  }, [clue, addClue]);

  if (!clue) return <div>Error: Clue not found.</div>;

  return (
    <SceneContainer backgroundId={scene.backgroundId}>
      <h2 className="font-headline text-4xl md:text-5xl text-primary mb-4">Clue Found!</h2>
      <div className="bg-primary/10 p-4 rounded-lg border-2 border-dashed border-primary mb-6 max-w-2xl mx-auto">
        <h3 className="font-bold text-xl text-primary">{clue.title}</h3>
        <p className="text-foreground mt-1">{clue.description}</p>
      </div>
      <p className="text-lg text-foreground mb-6">This has been added to your notebook.</p>
      <Button
        onClick={startNextScene}
        className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-lg text-lg px-8 py-6"
      >
        Continue Investigation
      </Button>
    </SceneContainer>
  );
}
