'use client';

import { useGame } from '@/app/game-context';
import { Button } from '@/components/ui/button';
import SceneContainer from './SceneContainer';
import type { GameScene } from '@/lib/game-data';
import { SUSPECTS } from '@/lib/game-data';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function FinalAccusationScene({ scene }: { scene: GameScene }) {
  const { makeAccusation } = useGame();
  const [selectedSuspectId, setSelectedSuspectId] = useState<string | null>(null);

  const selectedSuspect = SUSPECTS.find(s => s.id === selectedSuspectId);

  const handleAccuse = () => {
    if (selectedSuspectId) {
      makeAccusation(selectedSuspectId);
    }
  };

  return (
    <SceneContainer backgroundId={scene.backgroundId}>
      <h2 className="font-headline text-4xl md:text-5xl text-primary mb-4">Who is the Killer?</h2>
      <p className="text-lg md:text-xl text-foreground mb-6 max-w-3xl mx-auto">
        The time has come. The evidence has been presented, the testimonies heard. Point your finger at the one you believe is responsible for the King's demise. Choose wisely, for the fate of the kingdom rests on your judgment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-8">
        {SUSPECTS.map((suspect) => (
          <Card
            key={suspect.id}
            className="text-left cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-200"
            onClick={() => setSelectedSuspectId(suspect.id)}
          >
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary">{suspect.name}</CardTitle>
              <CardDescription>{suspect.title}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!selectedSuspectId} onOpenChange={(open) => !open && setSelectedSuspectId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline">Confirm Accusation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you certain you want to accuse <span className="font-bold text-primary">{selectedSuspect?.name}</span> of murdering the King? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Reconsider</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAccuse}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Accuse
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SceneContainer>
  );
}
