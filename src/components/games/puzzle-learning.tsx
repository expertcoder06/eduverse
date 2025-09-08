
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Puzzle, Repeat, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Puzzle = {
  riddle: string;
  answer: string;
  subject: string;
};

const puzzles: Puzzle[] = [
  {
    riddle: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    answer: "a map",
    subject: "Geography"
  },
  {
    riddle: "What has an eye, but cannot see?",
    answer: "a needle",
    subject: "General Knowledge"
  },
  {
    riddle: "I am a number. When you add me to 9 and then divide by 2, you get 8. What number am I?",
    answer: "7",
    subject: "Math"
  },
  {
    riddle: "I am a gas that you can't live without, and I make up about 21% of the air. What am I?",
    answer: "oxygen",
    subject: "Science"
  },
  {
    riddle: "What is the center of gravity?",
    answer: "v",
    subject: "Physics"
  }
];

type GameStatus = 'playing' | 'correct' | 'incorrect' | 'finished';

export default function PuzzleLearning() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<GameStatus>('playing');
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const currentPuzzle = useMemo(() => puzzles[currentPuzzleIndex], [currentPuzzleIndex]);

  const setupRound = (index: number) => {
    if (index >= puzzles.length) {
      setStatus('finished');
      return;
    }
    setCurrentPuzzleIndex(index);
    setUserInput('');
    setStatus('playing');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim().toLowerCase() === currentPuzzle.answer.toLowerCase()) {
      setStatus('correct');
      setScore(s => s + 1);
      toast({
        title: 'Correct!',
        description: `You solved the puzzle!`,
      });
    } else {
      setStatus('incorrect');
      toast({
        title: 'Not quite!',
        description: "That wasn't the right answer. Give it another try.",
        variant: 'destructive',
      });
    }
  };

  const handleNext = () => {
    setupRound(currentPuzzleIndex + 1);
  };
  
  const handleRestart = () => {
    setScore(0);
    setupRound(0);
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Puzzle /> Puzzle-Based Learning
        </CardTitle>
        <CardDescription>Solve these riddles to test your knowledge.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {status === 'finished' ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md text-center"
            >
              <h2 className="text-3xl font-bold mb-2 text-primary">Puzzles Solved!</h2>
              <p className="text-lg text-muted-foreground mb-6">You did a great job solving the riddles.</p>
              <p className="text-5xl font-bold mb-8">
                Final Score: {score} / {puzzles.length}
              </p>
              <Button onClick={handleRestart} size="lg">
                <Repeat className="mr-2 h-4 w-4" />
                Play Again
              </Button>
            </motion.div>
          ) : (
             <motion.div
              key={currentPuzzleIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full max-w-xl text-center"
            >
                <Card className="bg-secondary/50">
                    <CardHeader>
                        <CardDescription>Subject: {currentPuzzle.subject} &bull; Puzzle {currentPuzzleIndex + 1} of {puzzles.length}</CardDescription>
                        <CardTitle className='text-2xl leading-relaxed'>{currentPuzzle.riddle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex w-full max-w-sm mx-auto items-center space-x-2">
                            <Input 
                                type="text" 
                                placeholder="Your answer..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className={cn(
                                    "h-12 text-center text-lg",
                                    status === 'correct' && 'border-green-500 focus-visible:ring-green-500',
                                    status === 'incorrect' && 'border-destructive focus-visible:ring-destructive'
                                )}
                                disabled={status === 'correct'}
                                autoComplete="off"
                            />
                            <Button type="submit" size="lg" className="h-12" disabled={status === 'correct'}>
                                Solve
                            </Button>
                        </form>

                        <AnimatePresence>
                        {status === 'correct' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10}}
                                animate={{ opacity: 1, y: 0}}
                                className="mt-4 text-center"
                            >
                                <p className="text-green-600 font-semibold mb-2 flex items-center justify-center gap-2">
                                    <CheckCircle /> Correct! The answer is "{currentPuzzle.answer}".
                                </p>
                                <Button onClick={handleNext} className="mt-4">
                                Next Puzzle
                                </Button>
                            </motion.div>
                        )}
                        {status === 'incorrect' && (
                             <motion.div 
                                initial={{ opacity: 0, y: 10}}
                                animate={{ opacity: 1, y: 0}}
                                className="mt-4 text-center"
                            >
                                <p className="text-destructive font-semibold flex items-center justify-center gap-2">
                                    <XCircle /> That's not it. Think it over and try again!
                                </p>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
             </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
