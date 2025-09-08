
"use client";

import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';

import QuizBattleArena from '@/components/games/quiz-battle-arena';
import VocabularyQuest from '@/components/games/vocabulary-quest';
import PuzzleLearning from '@/components/games/puzzle-learning';
import CodingChallenge from '@/components/games/coding-challenge';
import MemoryDuel from '@/components/games/memory-duel';
import TreasureHunt from '@/components/games/treasure-hunt';

type GamePageProps = {
  params: {
    slug: string;
  };
};

const gameComponents: { [key: string]: React.ComponentType } = {
  'quiz-battle': QuizBattleArena,
  'vocabulary-quest': VocabularyQuest,
  'puzzle-learning': PuzzleLearning,
  'coding-challenge': CodingChallenge,
  'memory-duel': MemoryDuel,
  'treasure-hunt': TreasureHunt,
};

export default function GamePage({ params }: GamePageProps) {
  const { slug } = params;
  const GameComponent = gameComponents[slug];

  if (!GameComponent) {
    notFound();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <GameComponent />
    </motion.div>
  );
}
