

"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight,
  Bell,
  Calendar,
  Lightbulb,
  TrendingUp,
  Users,
  Book,
  ClipboardList,
  MessageSquare
} from 'lucide-react';
import { ProgressChart, SubjectPerformanceChart } from '@/components/performance-charts';
import { useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const teacherClasses = [
    { name: 'Physics 101', students: 32, schedule: '10 AM - 11 AM' },
    { name: 'History 202', students: 28, schedule: '11 AM - 12 PM' },
    { name: 'Math 301', students: 25, schedule: '1 PM - 2 PM' },
]

const recentActivity = [
    { student: 'Alice Johnson', activity: 'submitted an assignment for Physics 101.', avatar: 'https://picsum.photos/seed/alice/40/40' },
    { student: 'Bob Williams', activity: 'scored 95% on the History quiz.', avatar: 'https://picsum.photos/seed/bob/40/40' },
    { student: 'Charlie Brown', activity: 'has a 3-day study streak.', avatar: 'https://picsum.photos/seed/charlie/40/40' },
]


const TeacherDashboard = () => {
    const getHref = (path: string) => `${path}?role=teacher`;
    
    return (
        <div className="flex flex-col gap-6 animate-fade-in-up">
             <div>
                <h1 className="text-3xl font-bold font-headline">Welcome back, Mrs. Davis!</h1>
                <p className="text-muted-foreground">
                Here’s what’s happening with your classes today.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-accent" />
                        <span>Manage Classes</span>
                        </CardTitle>
                        <CardDescription>Oversee your subjects and student rosters.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                        {teacherClasses.map(c => (
                            <div key={c.name} className="flex justify-between items-center p-2 rounded-md bg-secondary/50">
                                <div>
                                    <p className="font-semibold">{c.name}</p>
                                    <p className="text-sm text-muted-foreground">{c.students} students</p>
                                </div>
                                <span className="text-sm font-mono bg-primary/10 text-primary rounded px-2 py-1">{c.schedule}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-accent" />
                        <span>Recent Student Activity</span>
                        </CardTitle>
                        <CardDescription>Latest updates from your students.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        {recentActivity.map(a => (
                            <div key={a.student} className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={a.avatar} data-ai-hint="person" />
                                    <AvatarFallback>{a.student.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{a.student}</span> {a.activity}</p>
                            </div>
                        ))}
                    </CardContent>
                     <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href={getHref("/dashboard/performance")}>View All Performance <ArrowRight/></Link>
                        </Button>
                    </CardFooter>
                </Card>
                 <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-accent" />
                        <span>Quick Actions</span>
                        </CardTitle>
                        <CardDescription>Engage with your students instantly.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow grid grid-cols-2 gap-3">
                       <Button variant="outline">New Announcement</Button>
                       <Button variant="outline">Create Quiz</Button>
                       <Button variant="outline">Upload Resource</Button>
                       <Button variant="outline">Schedule Meeting</Button>
                    </CardContent>
                </Card>
            </div>
             <div className="grid gap-6 lg:grid-cols-2">
                <SubjectPerformanceChart />
                <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Book className="h-5 w-5 text-accent" />
                        <span>Resource Library</span>
                        </CardTitle>
                        <CardDescription>Manage and share learning materials.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-lg text-muted-foreground">You have <span className="font-bold text-foreground">15 notes</span>, <span className="font-bold text-foreground">8 e-books</span>, and <span className="font-bold text-foreground">5 videos</span> available for your students.</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="default" className="w-full" asChild>
                            <Link href={getHref("/dashboard/library")}>Manage Resources <ArrowRight/></Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

const ParentDashboard = () => {
    const getHref = (path: string) => `${path}?role=parent`;
     return (
        <div className="flex flex-col gap-6 animate-fade-in-up">
             <div>
                <h1 className="text-3xl font-bold font-headline">Welcome, Mr. Smith!</h1>
                <p className="text-muted-foreground">
                Here's an overview of Alex's progress.
                </p>
            </div>
        </div>
    )
}


const StudentDashboard = () => {
    const getHref = (path: string) => `/dashboard${path}?role=student`;
    return (
     <div className="flex flex-col gap-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, Alex!</h1>
        <p className="text-muted-foreground">
          Here's a snapshot of your academic world.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              <span>Upcoming Class</span>
            </CardTitle>
            <CardDescription>Your next lesson is just around the corner.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-2xl font-bold">Physics 101</p>
            <p className="text-muted-foreground">10:00 AM - 11:00 AM</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href={getHref("/timetable")}>View Full Timetable <ArrowRight/></Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span>Learning Score</span>
            </CardTitle>
            <CardDescription>A measure of your recent performance.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  className="stroke-current text-secondary"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                />
                <path
                  className="stroke-current text-accent"
                  strokeDasharray="85, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">85%</span>
              </div>
            </div>
          </CardContent>
           <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href={getHref("/performance")}>View Performance Details <ArrowRight/></Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-accent" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>Recent alerts and reminders.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-3">
             <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-accent"></div>
                <div>
                    <p className="font-medium">Math assignment due</p>
                    <p className="text-sm text-muted-foreground">Due tomorrow at 11:59 PM</p>
                </div>
             </div>
             <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-accent"></div>
                 <div>
                    <p className="font-medium">New resource added</p>
                    <p className="text-sm text-muted-foreground">History: The Roman Empire notes</p>
                </div>
             </div>
          </CardContent>
           <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href={getHref("/notifications")}>View All Notifications <ArrowRight/></Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

       <div className="grid gap-6 lg:grid-cols-2">
            <ProgressChart />
            <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    <span>AI Mentor Suggestion</span>
                    </CardTitle>
                    <CardDescription>A tip from your virtual mentor.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-lg italic text-muted-foreground">"Your scores in History are slightly lower this month. Let's create a study plan to focus on key historical periods before your next exam."</p>
                </CardContent>
                <CardFooter>
                    <Button variant="default" className="w-full" asChild>
                        <Link href={getHref("/mentor")}>Get Personalized Plan <ArrowRight/></Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
    )
}

export default function Dashboard() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'student';
  
  if (role === 'teacher') {
    return <TeacherDashboard />;
  }

  if (role === 'parent') {
    return <ParentDashboard />;
  }
  
  return <StudentDashboard />;
}
