import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Award,
  BookOpen,
  CalendarCheck,
  Flame,
  Star,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type BadgeProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  unlocked: boolean;
};

const Badge = ({ icon: Icon, title, description, unlocked }: BadgeProps) => (
  <div
    className={cn(
      'flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-all',
      unlocked
        ? 'border-accent/50 bg-accent/10'
        : 'border-dashed bg-secondary opacity-60'
    )}
  >
    <div
      className={cn(
        'rounded-full p-3',
        unlocked ? 'bg-accent text-accent-foreground' : 'bg-muted-foreground/20 text-muted-foreground'
      )}
    >
      <Icon className="h-8 w-8" />
    </div>
    <p className="font-semibold">{title}</p>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

const badges: BadgeProps[] = [
  { icon: Star, title: 'Perfect Score', description: 'Ace a quiz with 100%', unlocked: true },
  { icon: Flame, title: 'Streak Master', description: '5-day study streak', unlocked: true },
  { icon: Award, title: 'Top Performer', description: 'Top 10% in a subject', unlocked: false },
  { icon: CalendarCheck, title: 'Early Bird', description: 'Submit an assignment 2 days early', unlocked: true },
  { icon: BookOpen, title: 'Bookworm', description: 'Read 5 e-books from the library', unlocked: false },
  { icon: Zap, title: 'Quick Learner', description: 'Complete a module in record time', unlocked: true },
  { icon: Award, title: 'Semester Star', description: 'Achieve an A grade overall', unlocked: false },
  { icon: Star, title: 'Perfect Attendance', description: '100% attendance for a month', unlocked: true },
];

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Gamified Rewards</h1>
        <p className="text-muted-foreground">
          Track your stats and unlock achievements for your hard work.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Rank</CardDescription>
            <CardTitle className="text-4xl">#12</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Top 5% of your class</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Points</CardDescription>
            <CardTitle className="text-4xl">1,420</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">+80 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Study Streak</CardDescription>
            <CardTitle className="flex items-center text-4xl">
              5 <Flame className="ml-2 h-8 w-8 text-orange-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Keep the flame alive!</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Achievements & Badges</CardTitle>
          <CardDescription>
            Collect them all by excelling in your studies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {badges.map((badge) => (
              <Badge key={badge.title} {...badge} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
