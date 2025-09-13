'use client';

import { useGame } from '@/app/game-context';
import { Button } from '@/components/ui/button';
import SceneContainer from './SceneContainer';
import type { GameScene } from '@/lib/game-data';

export default function IntroScene({ scene }: { scene: GameScene }) {
  const { startNextScene } = useGame();

  return (
    <SceneContainer backgroundId={scene.backgroundId}>
      <h2 className="font-headline text-4xl md:text-5xl text-primary mb-4">A Royal Tragedy</h2>
      <p className="text-lg md:text-xl text-foreground mb-6 max-w-2xl mx-auto">
        The grand banquet hall, once filled with laughter and music, now echoes with screams. King Theron lies lifeless on the floor, a victim of poison. Treachery hangs heavy in the air. As the realm's finest detective, you must uncover the truth.
      </p>
      <Button
        onClick={startNextScene}
        className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-lg text-lg px-8 py-6"
      >
        Interrogate the First Suspect
      </Button>
    </SceneContainer>
  );
}
