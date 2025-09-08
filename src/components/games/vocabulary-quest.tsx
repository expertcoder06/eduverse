
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, HelpCircle, Lightbulb, Repeat, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const wordList = [
  { word: 'photosynthesis', hint: 'Process plants use to convert light into energy.' },
  { word: 'astronomy', hint: 'The study of celestial objects and space.' },
  { word: 'metamorphosis', hint: 'A profound transformation from one stage to the next.' },
  { word: 'algorithm', hint: 'A set of rules for solving a problem in computing.' },
  { word: 'onomatopoeia', hint: 'A word that imitates a sound.' },
  { word: 'renaissance', hint: 'A period of great cultural and artistic revival in Europe.' },
];

const shuffleString = (str: string) => {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Ensure the shuffled word is not the same as the original
  if (arr.join('') === str) {
    return shuffleString(str);
  }
  return arr.join('');
};

type GameStatus = 'playing' | 'correct' | 'incorrect' | 'finished';

export default function VocabularyQuest() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();

  const currentWord = useMemo(() => wordList[currentWordIndex], [currentWordIndex]);

  const setupRound = (index: number) => {
    if (index >= wordList.length) {
      setStatus('finished');
      return;
    }
    setScrambledWord(shuffleString(wordList[index].word));
    setUserInput('');
    setStatus('playing');
    setShowHint(false);
    setCurrentWordIndex(index);
  };

  useEffect(() => {
    setupRound(0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.toLowerCase() === currentWord.word) {
      setStatus('correct');
      setScore(s => s + 10);
      toast({
        title: 'Correct!',
        description: `You earned 10 points.`,
      });
    } else {
      setStatus('incorrect');
       toast({
        title: 'Incorrect',
        description: 'Try again or use a hint!',
        variant: 'destructive'
      });
    }
  };

  const handleNext = () => {
    if (currentWordIndex < wordList.length -1) {
        setupRound(currentWordIndex + 1);
    } else {
        setStatus('finished')
    }
  };
  
  const handleRestart = () => {
      setupRound(0);
      setScore(0);
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen /> Vocabulary Quest
        </CardTitle>
        <CardDescription>Unscramble the letters to form the correct word. Good luck!</CardDescription>
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
              <h2 className="text-3xl font-bold mb-2 text-primary">Quest Complete!</h2>
              <p className="text-lg text-muted-foreground mb-6">You've successfully unscrambled all the words.</p>
              <p className="text-5xl font-bold mb-8">
                Final Score: {score}
              </p>
              <Button onClick={handleRestart} size="lg">
                <Repeat className="mr-2 h-4 w-4" />
                Play Again
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={currentWordIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full max-w-lg text-center"
            >
              <p className="text-sm text-muted-foreground mb-4">Round {currentWordIndex + 1} of {wordList.length} &bull; Score: {score}</p>
              <div className="flex justify-center gap-2 mb-6">
                {scrambledWord.split('').map((char, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex h-16 w-16 items-center justify-center rounded-md bg-secondary text-3xl font-bold uppercase shadow-inner"
                  >
                    {char}
                  </motion.div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex w-full max-w-sm mx-auto items-center space-x-2">
                 <Input 
                    type="text" 
                    placeholder="Your answer..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className={cn(
                        "h-12 text-center text-lg tracking-widest",
                        status === 'correct' && 'border-green-500 focus-visible:ring-green-500',
                        status === 'incorrect' && 'border-destructive focus-visible:ring-destructive'
                    )}
                    disabled={status === 'correct'}
                />
                <Button type="submit" size="lg" className="h-12" disabled={status === 'correct'}>
                    Submit
                </Button>
              </form>
              
              <AnimatePresence>
              {status === 'correct' ? (
                <motion.div 
                    initial={{ opacity: 0, y: 10}}
                    animate={{ opacity: 1, y: 0}}
                    className="mt-4 text-center"
                >
                    <p className="text-green-600 font-semibold mb-2">Correct! The word was "{currentWord.word}".</p>
                    <Button onClick={handleNext}>
                      Next Word
                    </Button>
                </motion.div>
              ) : (
                <div className="mt-6">
                    <Button variant="outline" onClick={() => setShowHint(true)} disabled={showHint}>
                        <Lightbulb className="mr-2 h-4 w-4" /> Get a Hint
                    </Button>
                    {showHint && (
                        <p className="mt-4 text-muted-foreground italic">
                            Hint: {currentWord.hint}
                        </p>
                    )}
                </div>
              )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

