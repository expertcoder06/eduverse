
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Play, ArrowRight, RotateCcw, Trash2, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Block = {
  id: number;
  label: string;
  action: 'move' | 'turn-left' | 'turn-right' | 'goal';
  icon: React.ReactNode;
};

const availableBlocks: Omit<Block, 'id'>[] = [
  { label: 'Move Forward', action: 'move', icon: <ArrowRight className="h-5 w-5" /> },
  { label: 'Turn Left', action: 'turn-left', icon: <RotateCcw className="h-5 w-5 -scale-x-100" /> },
  { label: 'Turn Right', action: 'turn-right', icon: <RotateCcw className="h-5 w-5" /> },
];

const targetSequence: Block['action'][] = ['move', 'move', 'turn-right', 'move'];

export default function CodingChallenge() {
  const [workspaceBlocks, setWorkspaceBlocks] = useState<Block[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [botPosition, setBotPosition] = useState({ x: 0, y: 0, rotate: 0 });
  const { toast } = useToast();

  const addBlock = (block: Omit<Block, 'id'>) => {
    setWorkspaceBlocks([...workspaceBlocks, { ...block, id: Date.now() + Math.random() }]);
  };

  const clearWorkspace = () => {
    setWorkspaceBlocks([]);
    setBotPosition({ x: 0, y: 0, rotate: 0 });
  };
  
  const resetAnimation = () => {
    setIsAnimating(false);
    setBotPosition({ x: 0, y: 0, rotate: 0 });
  };

  const runCode = async () => {
    setIsAnimating(true);
    resetAnimation();
    
    // Check if the sequence is correct first
    const userSequence = workspaceBlocks.map(b => b.action);
    const isCorrect = JSON.stringify(userSequence) === JSON.stringify(targetSequence);

    await new Promise(resolve => setTimeout(resolve, 100));

    for (const block of workspaceBlocks) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setBotPosition(pos => {
        const newPos = {...pos};
        const rotationRad = (pos.rotate * Math.PI) / 180;
        switch (block.action) {
          case 'move':
            newPos.x += Math.cos(rotationRad) * 50;
            newPos.y += Math.sin(rotationRad) * 50;
            break;
          case 'turn-left':
            newPos.rotate -= 90;
            break;
          case 'turn-right':
            newPos.rotate += 90;
            break;
        }
        return newPos;
      });
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    if (isCorrect) {
        toast({
            title: "Success!",
            description: "You've guided the bot to the target!",
        });
    } else {
         toast({
            title: "Almost there!",
            description: "The sequence isn't quite right. Reset and try again.",
            variant: 'destructive'
        });
    }

    setIsAnimating(false);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code /> Bot's Coding Path
        </CardTitle>
        <CardDescription>
            Drag and drop (by clicking) the blocks to guide the bot to the target (
            <span className='inline-flex items-center justify-center h-4 w-4 rounded-full bg-green-500 text-white'>*</span>
            ). The correct sequence is: Move, Move, Turn Right, Move.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        
        {/* Toolbox */}
        <Card className="bg-secondary/30">
          <CardHeader>
            <CardTitle className="text-lg">Toolbox</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableBlocks.map((block) => (
              <Button
                key={block.action}
                onClick={() => addBlock(block)}
                variant="outline"
                className="w-full justify-start h-12 bg-background hover:bg-accent/50"
                disabled={isAnimating}
              >
                {block.icon}
                <span>{block.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Workspace */}
        <Card className="md:col-span-2 flex flex-col">
          <CardHeader className="flex-row items-center justify-between">
            <div className='space-y-1.5'>
              <CardTitle className="text-lg">Workspace</CardTitle>
              <CardDescription>Click blocks from the toolbox to add them here.</CardDescription>
            </div>
            <div className='flex gap-2'>
              <Button onClick={runCode} disabled={workspaceBlocks.length === 0 || isAnimating} className='bg-green-600 hover:bg-green-700'>
                <Play className="mr-2 h-4 w-4" /> Run Code
              </Button>
              <Button onClick={clearWorkspace} variant="destructive" size="icon" disabled={isAnimating}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-2 rounded-lg border-2 border-dashed p-4 bg-secondary/30">
            <div className='relative h-64 w-full'>
                <motion.div
                    className='absolute'
                    animate={{ x: botPosition.x, y: botPosition.y, rotate: botPosition.rotate }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    <Bot className='h-8 w-8 text-primary' />
                </motion.div>
                <div className='absolute h-4 w-4 rounded-full bg-green-500' style={{top: '0px', left: '150px'}} />
            </div>

            <div className='flex-1 overflow-y-auto space-y-2 p-2 rounded-md bg-background/50'>
              <AnimatePresence>
                {workspaceBlocks.length === 0 && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground mt-8">
                    Workspace is empty.
                  </motion.p>
                )}
                {workspaceBlocks.map((block, index) => (
                  <motion.div
                    key={block.id}
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex items-center gap-3 rounded-md border bg-background p-2 shadow-sm"
                  >
                    <span className="text-xs font-mono text-muted-foreground">{index + 1}</span>
                    {block.icon}
                    <span className="font-medium">{block.label}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
