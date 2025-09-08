
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Swords } from 'lucide-react';

export default function QuizBattleArena() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Swords /> Quiz Battle Arena
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-[60vh] items-center justify-center rounded-lg border-2 border-dashed">
          <p className="text-muted-foreground">Quiz Battle Arena Game Coming Soon!</p>
        </div>
      </CardContent>
    </Card>
  );
}
