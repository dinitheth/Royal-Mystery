'use client';

import { useGame } from '@/app/game-context';
import { Button } from '@/components/ui/button';
import SceneContainer from './SceneContainer';
import { Play } from 'lucide-react';

export default function HomeScene() {
  const { startGame } = useGame();

  return (
    <SceneContainer backgroundId="scene-home">
      <h1 className="font-headline text-5xl md:text-7xl text-primary mb-4">Royal Mystery</h1>
      <div className="text-lg md:text-xl text-foreground mb-8 max-w-2xl text-left space-y-4">
       <p>Welcome, Detective. The kingdom of Eldoria is in turmoil. King Theron has been murdered, and a web of deceit and ambition threatens to unravel the realm. Your sharp mind is our only hope.</p>
       <p><span className='font-bold'>How to Play:</span> You will interrogate suspects, uncover clues, and piece together the events of that fateful night. Pay close attention to every detail. Use your notebook to keep track of the evidence. When you believe you have solved the case, make your accusation. But be warned, a false accusation could be disastrous.</p>
      </div>
      <Button
        onClick={startGame}
        className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-lg text-lg px-8 py-6"
      >
        <Play className="mr-2 h-5 w-5" />
        Play
      </Button>
    </SceneContainer>
  );
}
