

"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  SubjectPerformanceChart,
  ProgressChart,
} from '@/components/performance-charts';
import { BarChart, CheckCircle, TrendingUp, UserCheck, Users, Activity } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
export const dynamic = 'force-dynamic';

const StudentPerformancePage = () => {
    return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold font-headline">Performance Tracker</h1>
        <p className="text-muted-foreground">
          Monitor your academic progress and achievements.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Learning Score
            </CardDescription>
            <CardTitle className="text-4xl">85%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Improvement Meter
            </CardDescription>
            <CardTitle className="text-4xl">Good</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Consistent effort detected</p>
          </CardContent>
        </Card>
        <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Overall Grade
            </CardDescription>
            <CardTitle className="text-4xl">A-</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Tracking for a strong semester</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SubjectPerformanceChart />
        <ProgressChart />
      </div>
    </div>
    )
}

const TeacherPerformancePage = () => {
    return (
     <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold font-headline">Student Performance</h1>
        <p className="text-muted-foreground">
          Review class-wide analytics and individual student progress.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Class Average
            </CardDescription>
            <CardTitle className="text-4xl">82%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">+3% from last month</p>
          </CardContent>
        </Card>
        <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Attendance Rate
            </CardDescription>
            <CardTitle className="text-4xl">95%</CardTitle>
          </CardHeader>
           <CardContent>
            <Progress value={95} aria-label="95% attendance" />
          </CardContent>
        </Card>
        <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Engagement Level
            </CardDescription>
            <CardTitle className="text-4xl">High</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Great participation in discussions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SubjectPerformanceChart />
        <ProgressChart />
      </div>
    </div>
    )
}

export default function PerformancePage() {
    const searchParams = useSearchParams();
    const role = searchParams.get('role');

    if (role === 'teacher') {
        return <TeacherPerformancePage />
    }

    return <StudentPerformancePage />
}

    