
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Diamond, Flag, Map, Repeat, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

type Mission = {
  clue: string;
  answer: string;
  location: string;
};

const missions: Mission[] = [
  {
    clue: "I was the longest river in the world, home to an ancient civilization known for pyramids. What am I?",
    answer: "nile",
    location: "Ancient Egypt"
  },
  {
    clue: "Built for an emperor's wife, I am a symbol of love made of white marble in Agra, India. What am I?",
    answer: "taj mahal",
    location: "India"
  },
  {
    clue: "I am a 'Great Wall' built to protect an empire from northern invaders. Where am I?",
    answer: "china",
    location: "China"
  },
  {
    clue: "Home to the Colosseum where gladiators once fought. What ancient city am I?",
    answer: "rome",
    location: "The Roman Empire"
  }
];

type GameStatus = 'playing' | 'finished';

export default function TreasureHunt() {
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<GameStatus>('playing');
  const { toast } = useToast();

  const currentMission = missions[currentMissionIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim().toLowerCase() === currentMission.answer.toLowerCase()) {
      toast({
        title: 'Clue Solved!',
        description: `You're on the right track. On to the next mission!`,
      });
      if (currentMissionIndex < missions.length - 1) {
        setCurrentMissionIndex(i => i + 1);
        setUserInput('');
      } else {
        setStatus('finished');
      }
    } else {
      toast({
        title: 'Incorrect Answer',
        description: 'That doesn\'t seem right. Read the clue carefully and try again.',
        variant: 'destructive',
      });
    }
  };

  const handleRestart = () => {
    setCurrentMissionIndex(0);
    setUserInput('');
    setStatus('playing');
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Diamond /> Virtual Treasure Hunt
        </CardTitle>
        <CardDescription>Follow the educational clues to complete the mission.</CardDescription>
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
              <Gift className="h-24 w-24 mx-auto text-yellow-400 mb-4" />
              <h2 className="text-3xl font-bold mb-2 text-primary">Treasure Found!</h2>
              <p className="text-lg text-muted-foreground mb-6">Congratulations, you've successfully completed the mission!</p>
              <Button onClick={handleRestart} size="lg">
                <Repeat className="mr-2 h-4 w-4" />
                Start a New Hunt
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={currentMissionIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full max-w-2xl"
            >
              <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Map /> Mission {currentMissionIndex + 1}: {currentMission.location}
                    </CardTitle>
                    <CardDescription>Solve the clue to proceed to the next location.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-xl italic text-foreground mb-8 min-h-[60px]">"{currentMission.clue}"</p>
                     <form onSubmit={handleSubmit} className="flex w-full max-w-sm mx-auto items-center space-x-2">
                        <Input 
                            type="text" 
                            placeholder="Your answer..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="h-12 text-center text-lg"
                            autoComplete="off"
                        />
                        <Button type="submit" size="lg" className="h-12">
                            Submit Answer
                        </Button>
                    </form>
                </CardContent>
                 <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">Progress: </p>
                    <div className="flex gap-2 ml-2">
                        {missions.map((_, index) => (
                            <Flag key={index} className={index <= currentMissionIndex ? 'text-primary' : 'text-muted-foreground/50'}/>
                        ))}
                    </div>
                 </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
