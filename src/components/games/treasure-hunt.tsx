
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Diamond } from 'lucide-react';

export default function TreasureHunt() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Diamond /> Virtual Treasure Hunt
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-[60vh] items-center justify-center rounded-lg border-2 border-dashed">
          <p className="text-muted-foreground">Virtual Treasure Hunt Game Coming Soon!</p>
        </div>
      </CardContent>
    </Card>
  );
}
