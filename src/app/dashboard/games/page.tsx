
"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Swords, Puzzle, BrainCircuit, Code, BookOpen, Diamond } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const games = [
  {
    title: 'Quiz Battle Arena',
    slug: 'quiz-battle',
    description: 'Challenge friends in a multiplayer quiz competition.',
    icon: <Swords className="h-10 w-10 text-accent" />,
  },
  {
    title: 'Vocabulary Quest',
    slug: 'vocabulary-quest',
    description: 'Build words and solve crosswords in this Scrabble-style game.',
    icon: <BookOpen className="h-10 w-10 text-accent" />,
  },
  {
    title: 'Puzzle-Based Learning',
    slug: 'puzzle-learning',
    description: 'Solve subject-related puzzles, from math riddles to geography maps.',
    icon: <Puzzle className="h-10 w-10 text-accent" />,
  },
  {
    title: 'Drag & Drop Coding',
    slug: 'coding-challenge',
    description: 'Learn logical thinking with a Blockly-style coding game.',
    icon: <Code className="h-10 w-10 text-accent" />,
  },
  {
    title: 'Flashcard Memory Duel',
    slug: 'memory-duel',
    description: 'Match terms and definitions in a fun memory game.',
    icon: <BrainCircuit className="h-10 w-10 text-accent" />,
  },
  {
    title: 'Virtual Treasure Hunt',
    slug: 'treasure-hunt',
    description: 'Follow educational clues to complete missions and find treasure.',
    icon: <Diamond className="h-10 w-10 text-accent" />,
  },
];

function GamesContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const getHref = (slug: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('role', role || 'student');
    return `/dashboard/games/${slug}?${newParams.toString()}`;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Educational Games</h1>
        <p className="text-muted-foreground">
          Sharpen your skills and have fun with these interactive challenges.
        </p>
      </div>

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {games.map((game) => (
          <motion.div key={game.slug} variants={itemVariants}>
            <Card className="flex h-full flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:shadow-accent/20">
              <CardHeader className="flex flex-row items-start gap-4">
                {game.icon}
                <div className="flex-1">
                  <CardTitle>{game.title}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow" />
              <div className="p-6 pt-0">
                <Button className="w-full" asChild>
                  <Link href={getHref(game.slug)}>Play Now</Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function GamesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GamesContent />
    </Suspense>
  )
}
