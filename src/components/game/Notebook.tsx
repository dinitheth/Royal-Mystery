'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { BookOpen, Star } from 'lucide-react';
import { useGame } from '@/app/game-context';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

export default function Notebook() {
  const { gameState, getClueById } = useGame();
  const clues = gameState.discoveredClues.map(getClueById).filter(Boolean);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white rounded-full">
          <BookOpen className="h-5 w-5" />
          <span className="sr-only">Open Notebook</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-background">
        <SheetHeader>
          <SheetTitle className="font-headline text-3xl text-primary">Detective's Notebook</SheetTitle>
          <div className='flex justify-between items-center'>
            <SheetDescription>A record of all clues discovered during the investigation.</SheetDescription>
            <div className="flex items-center gap-2 text-lg font-bold text-accent">
                <Star className="h-5 w-5" />
                <span>{gameState.score}</span>
            </div>
          </div>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="h-[calc(100%-8rem)] pr-4">
          <div className="space-y-4">
            {clues.length > 0 ? (
              clues.map((clue) => (
                <div key={clue!.id} className="p-4 rounded-lg border bg-card">
                  <h3 className="font-headline text-xl text-primary">{clue!.title}</h3>
                  <p className="text-muted-foreground mt-1">{clue!.description}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-10">
                <p>No clues discovered yet.</p>
                <p>Begin your investigation to gather evidence.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
