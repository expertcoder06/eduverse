
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Repeat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Flashcard = {
  id: number;
  type: 'term' | 'definition';
  content: string;
  pairId: number;
};

const sampleFlashcards = [
  { term: 'Renaissance', definition: 'A period of great cultural change and artistic flourishing in Europe from the 14th to the 17th century.', pairId: 1 },
  { term: 'Feudalism', definition: 'The dominant social system in medieval Europe, with lords, vassals, and fiefs.', pairId: 2 },
  { term: 'Reformation', definition: 'A 16th-century movement for the reform of abuses in the Roman Catholic Church leading to the establishment of the Protestant Churches.', pairId: 3 },
  { term: 'Columbian Exchange', definition: 'The widespread transfer of plants, animals, culture, human populations, technology, and ideas between the Americas and the Old World.', pairId: 4 },
  { term: 'Absolutism', definition: 'A form of government where the monarch holds supreme autocratic authority, not being restricted by written laws, legislature, or customs.', pairId: 5 },
  { term: 'Mercantilism', definition: 'An economic policy that is designed to maximize the exports and minimize the imports for an economy.', pairId: 6 },
];

const shuffleArray = (array: any[]) => {
  return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const MemoryCard = ({ card, isFlipped, isMatched, onCardClick }: { card: Flashcard, isFlipped: boolean, isMatched: boolean, onCardClick: (card: Flashcard) => void }) => {
  const cardVariants = {
    hidden: { rotateY: 180 },
    visible: { rotateY: 0 },
  };

  return (
    <motion.div
      className="perspective-1000"
      onClick={() => !isFlipped && !isMatched && onCardClick(card)}
    >
      <motion.div
        className={cn(
          "relative h-32 w-full transform-style-3d rounded-lg shadow-md transition-transform duration-500",
          isFlipped || isMatched ? 'bg-card' : 'bg-primary cursor-pointer hover:scale-105'
        )}
        variants={cardVariants}
        animate={isFlipped || isMatched ? "visible" : "hidden"}
        transition={{ duration: 0.5 }}
      >
        <div className="backface-hidden absolute flex h-full w-full items-center justify-center rounded-lg border bg-primary text-primary-foreground">
          <BrainCircuit className="h-8 w-8" />
        </div>
        <div className="backface-hidden absolute flex h-full w-full rotate-y-180 items-center justify-center rounded-lg border bg-card p-2 text-center">
          <p className="text-sm">{card.content}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function MemoryDuel() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [flippedCards, setFlippedCards] = useState<Flashcard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  const initializeGame = () => {
    const gameCards: Flashcard[] = sampleFlashcards.flatMap((item, index) => [
      { id: index * 2, type: 'term', content: item.term, pairId: item.pairId },
      { id: index * 2 + 1, type: 'definition', content: item.definition, pairId: item.pairId },
    ]);
    setCards(shuffleArray(gameCards));
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsGameWon(false);
  };
  
  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card: Flashcard) => {
    if (flippedCards.length < 2) {
      setFlippedCards(prev => [...prev, card]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(moves => moves + 1);
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.pairId === secondCard.pairId) {
        setMatchedPairs(prev => [...prev, firstCard.pairId]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1200);
      }
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedPairs.length > 0 && matchedPairs.length === sampleFlashcards.length) {
      setIsGameWon(true);
    }
  }, [matchedPairs]);

  return (
    <Card className="h-full">
      <CardHeader className='flex-row items-center justify-between'>
        <div className='flex items-center gap-2'>
            <BrainCircuit />
            <CardTitle>Flashcard Memory Duel</CardTitle>
        </div>
         <div className='flex items-center gap-4'>
            <p className='font-mono text-lg'>Moves: <span className='font-bold'>{moves}</span></p>
            <Button onClick={initializeGame} variant="outline" size="icon">
                <Repeat className="h-4 w-4" />
                <span className="sr-only">Restart Game</span>
            </Button>
         </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {isGameWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg bg-background/90 backdrop-blur-sm"
            >
              <h2 className="text-4xl font-bold text-primary">Congratulations!</h2>
              <p className="mt-2 text-lg text-muted-foreground">You completed the duel in {moves} moves.</p>
              <Button onClick={initializeGame} className="mt-6">
                Play Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {cards.map(card => (
            <MemoryCard
              key={card.id}
              card={card}
              isFlipped={flippedCards.some(c => c.id === card.id)}
              isMatched={matchedPairs.includes(card.pairId)}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

    