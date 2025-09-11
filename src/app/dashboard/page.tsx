
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
  MessageSquare,
  UserCheck,
  CheckCircle,
  FileText
} from 'lucide-react';
import { ProgressChart, SubjectPerformanceChart } from '@/components/performance-charts';
import { useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Suspense, useEffect, useState } from 'react';


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

const upcomingDeadlines = [
    { title: "Math Assignment 5", due: "Friday, 11:59 PM", type: 'assignment' },
    { title: "History Midterm Exam", due: "Next Monday, 10:00 AM", type: 'exam' },
    { title: "Science Project Proposal", due: "Next Wednesday", type: 'assignment' },
]


const TeacherDashboard = ({userName}: {userName: string}) => {
    const getHref = (path: string) => `${path}?role=teacher`;
    
    return (
        <div className="flex flex-col gap-6 animate-fade-in-up">
             <div>
                <h1 className="text-3xl font-bold font-headline">Welcome back, {userName}!</h1>
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
                <SubjectPerformanceChart userName={userName}/>
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

const ParentDashboard = ({userName}: {userName: string}) => {
    const getHref = (path: string) => `${path}?role=parent`;
     return (
        <div className="flex flex-col gap-6 animate-fade-in-up">
             <div>
                <h1 className="text-3xl font-bold font-headline">Welcome, {userName}!</h1>
                <p className="text-muted-foreground">
                Here's an overview of Alex's progress and upcoming activities.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">95%</div>
                        <p className="text-xs text-muted-foreground">Present for all classes this week</p>
                    </CardContent>
                </Card>
                <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">A-</div>
                        <p className="text-xs text-muted-foreground">Slight improvement from last month</p>
                    </CardContent>
                </Card>
                <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Recent Score</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">88%</div>
                        <p className="text-xs text-muted-foreground">On the latest Physics quiz</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <SubjectPerformanceChart userName={userName} />
                <ProgressChart userName={userName}/>
            </div>

             <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Deadlines</CardTitle>
                        <CardDescription>Keep track of Alex's upcoming assignments and exams.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {upcomingDeadlines.map((item) => (
                        <div key={item.title} className="flex items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                                <FileText className="h-4 w-4 text-secondary-foreground" />
                            </div>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.due}</p>
                            </div>
                        </div>
                        ))}
                    </CardContent>
                </Card>
                <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-accent" />
                        <span>AI Mentor Suggestion for Alex</span>
                        </CardTitle>
                        <CardDescription>A tip to help support his learning.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-lg italic text-muted-foreground">"Alex has been doing great in Math but could use some extra practice in History. Try reviewing flashcards on key historical dates together this weekend."</p>
                    </CardContent>
                     <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href={getHref("/dashboard/mentor")}>Create a Study Plan for Alex<ArrowRight/></Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}


const StudentDashboard = ({userName}: {userName: string}) => {
    const getHref = (path: string) => `/dashboard${path}?role=student`;
    const learningScore = userName.toLowerCase() === 'sanjay sharma' ? 85 : 0;
    
    return (
     <div className="flex flex-col gap-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, {userName}!</h1>
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
                  strokeDasharray={`${learningScore}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{learningScore}%</span>
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
            <ProgressChart userName={userName} />
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

function DashboardContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'student';
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserName(user.name);
      }
    }
  }, []);
  
  if (role === 'teacher') {
    return <TeacherDashboard userName={userName}/>;
  }

  if (role === 'parent') {
    return <ParentDashboard userName={userName}/>;
  }
  
  return <StudentDashboard userName={userName}/>;
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}

    