
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Puzzle } from 'lucide-react';

export default function PuzzleLearning() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Puzzle /> Puzzle-Based Learning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-[60vh] items-center justify-center rounded-lg border-2 border-dashed">
          <p className="text-muted-foreground">Puzzle-Based Learning Game Coming Soon!</p>
        </div>
      </CardContent>
    </Card>
  );
}
