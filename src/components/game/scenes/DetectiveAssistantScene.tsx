'use client';

import { useGame } from '@/app/game-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';
import SceneContainer from './SceneContainer';
import type { GameScene } from '@/lib/game-data';
import { SUSPECTS } from '@/lib/game-data';

export default function DetectiveAssistantScene({ scene }: { scene: GameScene }) {
  const { startNextScene, analyzeClues, gameState } = useGame();
  const { analysis, isLoadingAI } = gameState;

  return (
    <SceneContainer backgroundId={scene.backgroundId}>
      <h2 className="font-headline text-4xl md:text-5xl text-primary mb-4">Consult the Detective Assistant</h2>
      <p className="text-lg md:text-xl text-foreground mb-6 max-w-3xl mx-auto">
        You've gathered the clues. Now, it's time to piece them together. Use your detective's intuition, or consult your AI-powered assistant for an analysis of the evidence before making your final accusation.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
        {analysis ? (
          <Card className="text-left w-full">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Evidence Analysis</CardTitle>
              <CardDescription>The AI assistant's assessment of the clues against each suspect.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-4">
                  {SUSPECTS.map((suspect) => (
                    <div key={suspect.id}>
                      <h4 className="font-headline text-lg font-bold">{suspect.name}</h4>
                      {analysis.analyses
                        .filter((a) => a.suspect === suspect.name)
                        .map((a) => (
                          <p key={a.clue} className="text-sm text-muted-foreground ml-4 pl-4 border-l-2">
                            <span className="font-bold text-foreground">{a.clue}:</span> {a.analysis}
                          </p>
                        ))}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <Button
            onClick={analyzeClues}
            disabled={isLoadingAI}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-lg text-lg px-8 py-6"
          >
            {isLoadingAI ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            {isLoadingAI ? 'Analyzing...' : 'Analyze Clues'}
          </Button>
        )}

        <Button
          onClick={startNextScene}
          className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-lg text-lg px-8 py-6"
        >
          Proceed to Final Accusation
        </Button>
      </div>
    </SceneContainer>
  );
}
