'use client';

import { useGame } from '@/app/game-context';
import { AnimatePresence, motion } from 'framer-motion';
import IntroScene from './scenes/IntroScene';
import SuspectInteractionScene from './scenes/SuspectInteractionScene';
import ClueDiscoveryScene from './scenes/ClueDiscoveryScene';
import MisdirectionScene from './scenes/MisdirectionScene';
import MidGameTwistScene from './scenes/MidGameTwistScene';
import DetectiveAssistantScene from './scenes/DetectiveAssistantScene';
import FinalAccusationScene from './scenes/FinalAccusationScene';
import EpilogueScene from './scenes/EpilogueScene';
import Auth from './Auth';
import Notebook from './Notebook';
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import HomeScene from './scenes/HomeScene';
import QuizScene from './scenes/QuizScene';

const sceneComponents = {
  home: HomeScene,
  intro: IntroScene,
  suspect: SuspectInteractionScene,
  clue: ClueDiscoveryScene,
  misdirection: MisdirectionScene,
  twist: MidGameTwistScene,
  ai_assistant: DetectiveAssistantScene,
  accusation: FinalAccusationScene,
  epilogue: EpilogueScene,
  quiz: QuizScene,
};

const NotAuthenticatedCover = () => {
    const { login } = usePrivy();
    return (
        <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
            <h1 className="font-headline text-5xl md:text-7xl text-primary mb-4">Royal Mystery</h1>
            <p className="text-lg md:text-xl text-foreground mb-8 max-w-2xl">
                The King has been murdered. A shadow of treason falls over the castle. Log in to begin your investigation and unmask the killer.
            </p>
            <Button
                onClick={login}
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-lg text-lg px-8 py-6"
            >
                <LogIn className="mr-2 h-5 w-5" />
                Begin Investigation
            </Button>
        </div>
    );
};


export default function GameUI() {
  const { currentScene, gameState } = useGame();
  const { authenticated } = usePrivy();

  const getSceneComponent = () => {
    if (!gameState.gameStarted) {
      return HomeScene;
    }
    return currentScene ? sceneComponents[currentScene.type] : null;
  }

  const SceneComponent = getSceneComponent();
  const sceneKey = gameState.gameStarted ? currentScene?.id : 'home';

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      {!authenticated && !gameState.gameStarted && <NotAuthenticatedCover />}
      
      <header className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 md:p-6 bg-transparent">
        <h1 className="font-headline text-2xl md:text-3xl text-white drop-shadow-lg">Royal Mystery</h1>
        { (gameState.gameStarted && authenticated) &&
          <div className="flex items-center gap-4">
            <Notebook />
            <Auth />
          </div>
        }
      </header>

      <AnimatePresence mode="wait">
        {SceneComponent && (
          <motion.div
            key={sceneKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="h-full w-full"
          >
            <SceneComponent scene={currentScene} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
