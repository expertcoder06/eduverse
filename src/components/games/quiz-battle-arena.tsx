
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  generateQuizQuestions,
  QuizQuestion,
} from '@/ai/flows/generate-quiz-questions';
import { Loader2, Swords, Sparkles, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type GameState = 'subject' | 'loading' | 'quiz' | 'results';

export default function QuizBattleArena() {
  const [gameState, setGameState] = useState<GameState>('subject');
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const { toast } = useToast();

  const handleStartQuiz = async () => {
    if (subject.trim().length < 3) {
      toast({
        title: 'Invalid Subject',
        description: 'Please enter a subject with at least 3 characters.',
        variant: 'destructive',
      });
      return;
    }
    setGameState('loading');
    try {
      const result = await generateQuizQuestions({ subject });
      if (result.questions && result.questions.length > 0) {
        setQuestions(result.questions);
        setGameState('quiz');
        // Reset state for new quiz
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        throw new Error('No questions were generated.');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Failed to Generate Quiz',
        description:
          'There was an issue creating your quiz. Please try another subject.',
        variant: 'destructive',
      });
      setGameState('subject');
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setGameState('results');
    }
  };
  
  const restartQuiz = () => {
    setGameState('subject');
    setSubject('');
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Swords /> Quiz Battle Arena
        </CardTitle>
        <CardDescription>
          Challenge your knowledge with an AI-generated quiz on any subject!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {gameState === 'subject' && (
            <motion.div
              key="subject"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md text-center"
            >
              <h2 className="text-2xl font-semibold mb-4">
                What would you like to be quizzed on?
              </h2>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., 'The Roman Empire' or 'Quantum Physics'"
                  className="text-lg h-12"
                  onKeyUp={(e) => e.key === 'Enter' && handleStartQuiz()}
                />
                <Button onClick={handleStartQuiz} size="lg" className="h-12">
                  <Sparkles className="mr-2" /> Start Quiz
                </Button>
              </div>
            </motion.div>
          )}

          {gameState === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center text-muted-foreground"
            >
              <Loader2 className="h-12 w-12 mx-auto animate-spin mb-4" />
              <p className="text-lg">
                Generating your quiz on "{subject}"...
              </p>
            </motion.div>
          )}

          {gameState === 'quiz' && currentQuestion && (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl"
            >
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <h2 className="text-2xl font-semibold mt-1">
                  {currentQuestion.questionText}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = option === currentQuestion.correctAnswer;
                  const isSelected = option === selectedAnswer;
                  return (
                    <Button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={cn(
                        "h-auto py-4 text-wrap text-md justify-start",
                        isAnswered && isCorrect && 'bg-green-600 hover:bg-green-700',
                        isAnswered && isSelected && !isCorrect && 'bg-destructive hover:bg-destructive/90'
                      )}
                      variant="outline"
                      disabled={isAnswered}
                    >
                      <div className="flex-1 text-left">{option}</div>
                       {isAnswered && isCorrect && <Check />}
                       {isAnswered && isSelected && !isCorrect && <X />}
                    </Button>
                  );
                })}
              </div>
               {isAnswered && (
                <div className='mt-6 text-center'>
                    <Button onClick={handleNextQuestion}>
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Show Results'}
                    </Button>
                </div>
               )}
            </motion.div>
          )}

           {gameState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md text-center"
            >
              <h2 className="text-3xl font-bold mb-2 text-primary">Quiz Complete!</h2>
              <p className="text-lg text-muted-foreground mb-6">You challenged your knowledge on "{subject}"</p>
              <p className="text-5xl font-bold mb-8">
                Your Score: {score} / {questions.length}
              </p>
              <Button onClick={restartQuiz} size="lg">
                Play Another Quiz
              </Button>
            </motion.div>
           )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
