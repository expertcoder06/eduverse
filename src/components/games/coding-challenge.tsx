
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code } from 'lucide-react';

export default function CodingChallenge() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code /> Drag & Drop Coding Challenge
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-[60vh] items-center justify-center rounded-lg border-2 border-dashed">
          <p className="text-muted-foreground">Coding Challenge Game Coming Soon!</p>
        </div>
      </CardContent>
    </Card>
  );
}
