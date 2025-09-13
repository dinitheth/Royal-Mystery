'use client';

import { useGame } from '@/app/game-context';
import { Button } from '@/components/ui/button';
import SceneContainer from './SceneContainer';
import type { GameScene } from '@/lib/game-data';
import { CORRECT_MURDERER_ID, SUSPECTS } from '@/lib/game-data';

export default function EpilogueScene({ scene }: { scene: GameScene }) {
  const { resetGame, gameState } = useGame();
  const { accusationResult } = gameState;
  const murderer = SUSPECTS.find(s => s.id === CORRECT_MURDERER_ID);

  const CorrectEnding = () => (
    <>
      <h2 className="font-headline text-4xl md:text-5xl text-green-600 mb-4">Justice is Served!</h2>
      <p className="text-lg md:text-xl text-foreground mb-6 max-w-2xl mx-auto">
        Your keen intellect has triumphed! You correctly identified <span className='font-bold'>{murderer?.name}</span> as the killer. The kingdom is safe, and your name will be sung by bards for generations to come.
      </p>
    </>
  );

  const IncorrectEnding = () => (
     <>
      <h2 className="font-headline text-4xl md:text-5xl text-destructive mb-4">A Grave Misjudgment</h2>
      <p className="text-lg md:text-xl text-foreground mb-6 max-w-2xl mx-auto">
        Disaster! You accused an innocent soul. The true killer has slipped through your fingers and will continue to plot in the shadows. The kingdom faces a dark future.
      </p>
    </>
  );

  return (
    <SceneContainer backgroundId={scene.backgroundId}>
        {accusationResult === 'correct' && <CorrectEnding />}
        {accusationResult === 'incorrect' && <IncorrectEnding />}
        {!accusationResult && <p>The story concludes...</p>}

      <Button
        onClick={resetGame}
        className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-lg text-lg px-8 py-6"
      >
        Play Again
      </Button>
    </SceneContainer>
  );
}
