'use client';

import { useGame } from '@/app/game-context';
import { Button } from '@/components/ui/button';
import SceneContainer from './SceneContainer';
import type { GameScene } from '@/lib/game-data';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

export default function QuizScene({ scene }: { scene: GameScene }) {
  const { startNextScene, getQuizById, submitAnswer } = useGame();
  const quiz = getQuizById(scene.data.quizId);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!quiz) return <div>Error: Quiz not found.</div>;

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    const correct = submitAnswer(quiz.id, selectedOptionId);
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  const ResultCard = () => (
    <Card className={`mt-6 ${isCorrect ? 'border-green-500' : 'border-destructive'}`}>
        <CardHeader className='text-center'>
            <div className='flex items-center justify-center gap-2'>
                {isCorrect ? <CheckCircle className="h-8 w-8 text-green-500" /> : <XCircle className="h-8 w-8 text-destructive" />}
                <CardTitle className={`font-headline text-3xl ${isCorrect ? 'text-green-600' : 'text-destructive'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                </CardTitle>
            </div>
            <CardDescription className='text-lg'>
                {isCorrect ? `You earned ${quiz.points} points.` : "You did not earn any points."}
            </CardDescription>
        </CardHeader>
        <CardContent className='text-center'>
             <Button
                onClick={startNextScene}
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-lg text-lg px-8 py-6"
              >
                Continue Investigation
              </Button>
        </CardContent>
    </Card>
  )

  return (
    <SceneContainer backgroundId={scene.backgroundId}>
      <h2 className="font-headline text-4xl md:text-5xl text-primary mb-4">Knowledge Check</h2>
      <p className="text-lg md:text-xl text-foreground mb-6 max-w-2xl mx-auto">
        {quiz.question}
      </p>

    { isAnswered ? <ResultCard /> :
      <>
        <RadioGroup onValueChange={setSelectedOptionId} className="space-y-2 max-w-md mx-auto items-start">
            {quiz.options.map(option => (
            <div key={option.id} className="flex items-center space-x-2 p-3 bg-background/50 rounded-md border">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="text-lg cursor-pointer">{option.text}</Label>
            </div>
            ))}
        </RadioGroup>

        <Button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-lg text-lg px-8 py-6"
        >
            Submit Answer
        </Button>
      </>
    }
    </SceneContainer>
  );
}
