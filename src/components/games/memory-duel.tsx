
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

export default function MemoryDuel() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit /> Flashcard Memory Duel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-[60vh] items-center justify-center rounded-lg border-2 border-dashed">
          <p className="text-muted-foreground">Flashcard Memory Duel Game Coming Soon!</p>
        </div>
      </CardContent>
    </Card>
  );
}
