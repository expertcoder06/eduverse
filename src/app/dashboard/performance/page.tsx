

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
import { Suspense, useEffect, useState } from 'react';
export const dynamic = 'force-dynamic';

const StudentPerformancePage = ({userName}: {userName: string}) => {
    const isSanjay = userName.toLowerCase() === 'sanjay sharma';
    const learningScore = isSanjay ? 85 : 0;
    const improvement = isSanjay ? '+5% from last month' : 'Start your journey!';
    const overallGrade = isSanjay ? 'A-' : 'N/A';
    const gradeComment = isSanjay ? 'Tracking for a strong semester' : 'Complete some activities to get a grade';

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
            <CardTitle className="text-4xl">{learningScore}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{improvement}</p>
          </CardContent>
        </Card>
        <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Improvement Meter
            </CardDescription>
            <CardTitle className="text-4xl">{isSanjay ? "Good" : "New"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{isSanjay ? "Consistent effort detected" : "Ready to start"}</p>
          </CardContent>
        </Card>
        <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Overall Grade
            </CardDescription>
            <CardTitle className="text-4xl">{overallGrade}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{gradeComment}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SubjectPerformanceChart userName={userName} />
        <ProgressChart userName={userName} />
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
        <SubjectPerformanceChart userName="teacher" />
        <ProgressChart userName="teacher" />
      </div>
    </div>
    )
}

function PerformanceContent() {
    const searchParams = useSearchParams();
    const role = searchParams.get('role');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setUserName(user.name);
            }
        }
    }, []);

    if (role === 'teacher') {
        return <TeacherPerformancePage />
    }

    return <StudentPerformancePage userName={userName} />
}

export default function PerformancePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PerformanceContent />
    </Suspense>
  )
}

    