
"use client";

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, PlayCircle, History, Radio, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const recordings = [
  { title: 'Introduction to Quantum Physics', subject: 'Physics', date: '2023-10-26', image: 'https://picsum.photos/seed/quantum/400/225' },
  { title: 'The Roman Empire - Rise and Fall', subject: 'History', date: '2023-10-24', image: 'https://picsum.photos/seed/rome/400/225' },
  { title: 'Calculus I: Limits and Derivatives', subject: 'Math', date: '2023-10-22', image: 'https://picsum.photos/seed/calculus/400/225' },
];

const StudentLiveClassesPage = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold font-headline">Live Classes</h1>
      <p className="text-muted-foreground">Join ongoing classes or watch previous recordings.</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="text-red-500" />
          Ongoing Live Class
        </CardTitle>
        <CardDescription>A session is currently live. Join now!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg bg-secondary/50 p-6">
        <div>
          <h3 className="text-xl font-semibold">Organic Chemistry: Carbonyl Compounds</h3>
          <p className="text-muted-foreground">with Mrs. Davis</p>
        </div>
        <Button size="lg" className="bg-red-600 hover:bg-red-700 transition-colors">
          <PlayCircle className="mr-2 h-5 w-5" /> Join Live
        </Button>
      </CardContent>
    </Card>

    <div>
      <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2">
        <History />
        Recorded Classes
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recordings.map((rec) => (
          <Card key={rec.title} className="overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="relative">
              <Image src={rec.image} alt={rec.title} width={400} height={225} className="aspect-video w-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <PlayCircle className="h-12 w-12 text-white/80" />
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{rec.title}</CardTitle>
              <CardDescription>{rec.subject} - {rec.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <PlayCircle className="mr-2 h-4 w-4" /> Watch Recording
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

const TeacherLiveClassesPage = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold font-headline">Manage Live Classes</h1>
      <p className="text-muted-foreground">Start a new class or manage your recordings.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Start a New Class</CardTitle>
          <CardDescription>Go live and interact with your students in real-time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="class-title">Class Title</Label>
            <Input id="class-title" placeholder="e.g., The French Revolution" />
          </div>
          <Button size="lg" className="w-full">
            <Video className="mr-2 h-5 w-5" /> Go Live Now
          </Button>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Your Recordings</CardTitle>
          <CardDescription>Here are the classes you've recorded previously.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recordings.map((rec) => (
            <div key={rec.title} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-semibold">{rec.title}</p>
                <p className="text-sm text-muted-foreground">{rec.date}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Manage</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
);

function LiveClassesContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  if (role === 'teacher') {
    return <TeacherLiveClassesPage />;
  }

  return <StudentLiveClassesPage />;
}

export default function LiveClassesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LiveClassesContent />
    </Suspense>
  )
}
