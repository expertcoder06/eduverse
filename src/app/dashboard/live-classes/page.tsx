
"use client";

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, PlayCircle, History, Radio, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Suspense, useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';


const initialRecordings = [
  { id: 1, title: 'Introduction to Quantum Physics', subject: 'Physics', date: '2023-10-26', image: 'https://picsum.photos/seed/quantum/400/225' },
  { id: 2, title: 'The Roman Empire - Rise and Fall', subject: 'History', date: '2023-10-24', image: 'https://picsum.photos/seed/rome/400/225' },
  { id: 3, title: 'Calculus I: Limits and Derivatives', subject: 'Math', date: '2023-10-22', image: 'https://picsum.photos/seed/calculus/400/225' },
];

type Recording = typeof initialRecordings[0];
type LiveClass = {
    title: string;
    teacherName: string;
    isLive: boolean;
};


const EditRecordingDialog = ({ recording, onSave }: { recording: Recording, onSave: (updatedRecording: Recording) => void }) => {
    const [title, setTitle] = useState(recording.title);
    const [subject, setSubject] = useState(recording.subject);
    const [open, setOpen] = useState(false);

    const handleSave = () => {
        onSave({ ...recording, title, subject });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Details
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Recording Details</DialogTitle>
                    <DialogDescription>
                        Make changes to the title and subject of your recording.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="subject" className="text-right">
                            Subject
                        </Label>
                        <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


const StudentLiveClassesPage = ({recordings, liveClass}: {recordings: Recording[], liveClass: LiveClass | null}) => {
    const { toast } = useToast();
    const handleJoinLive = () => {
        toast({
            title: "Joining Live Class",
            description: "You are now being connected to the session."
        })
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Live Classes</h1>
                <p className="text-muted-foreground">Join ongoing classes or watch previous recordings.</p>
            </div>

            {liveClass?.isLive && (
                <Card className='border-accent ring-2 ring-accent'>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Radio className="text-red-500 animate-pulse" />
                        Ongoing Live Class
                        </CardTitle>
                        <CardDescription>A session is currently live. Join now!</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg bg-secondary/50 p-6">
                        <div>
                        <h3 className="text-xl font-semibold">{liveClass.title}</h3>
                        <p className="text-muted-foreground">with {liveClass.teacherName}</p>
                        </div>
                        <Button size="lg" className="bg-red-600 hover:bg-red-700 transition-colors" onClick={handleJoinLive}>
                        <PlayCircle className="mr-2 h-5 w-5" /> Join Live
                        </Button>
                    </CardContent>
                </Card>
            )}

            <div>
            <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2">
                <History />
                Recorded Classes
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recordings.map((rec) => (
                <Card key={rec.id} className="overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
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
};

const TeacherLiveClassesPage = ({recordings, onEdit, onDelete, onGoLive}: {recordings: Recording[], onEdit: (rec: Recording) => void, onDelete: (id: number) => void, onGoLive: (title: string) => void}) => {
    const [classTitle, setClassTitle] = useState('');
    
    const handleGoLiveClick = () => {
        if (classTitle.trim()) {
            onGoLive(classTitle.trim());
        }
    }
  
    return (
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
                <Input 
                    id="class-title" 
                    placeholder="e.g., The French Revolution" 
                    value={classTitle}
                    onChange={(e) => setClassTitle(e.target.value)}
                />
              </div>
              <Button size="lg" className="w-full" onClick={handleGoLiveClick} disabled={!classTitle.trim()}>
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
                <div key={rec.id} className="flex items-center justify-between rounded-lg border p-4">
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
                      <EditRecordingDialog recording={rec} onSave={onEdit} />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                         <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the recording "{rec.title}".
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(rec.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
};

function LiveClassesContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const [recordings, setRecordings] = useState(initialRecordings);
  const [liveClass, setLiveClass] = useState<LiveClass | null>(null);
  const [userName, setUserName] = useState('A Teacher');
  const { toast } = useToast();

   useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserName(user.name);
      }
    }
  }, []);

  const handleEdit = (updatedRecording: Recording) => {
      setRecordings(prev => prev.map(r => r.id === updatedRecording.id ? updatedRecording : r));
      toast({
          title: "Recording Updated",
          description: "The recording details have been saved."
      });
  }

  const handleDelete = (id: number) => {
      setRecordings(prev => prev.filter(r => r.id !== id));
      toast({
          title: "Recording Deleted",
          description: "The recording has been removed."
      })
  }

  const handleGoLive = (title: string) => {
      const newLiveClass: LiveClass = {
          title,
          teacherName: userName,
          isLive: true,
      };
      setLiveClass(newLiveClass);

      // This is a simulation of sending an email.
      // In a real app, this would be an API call to a backend service.
      console.log(`Simulating email to student: Your class '${title}' with ${userName} is now live!`);

      toast({
          title: "You are now live!",
          description: `The class "${title}" has started.`,
      })
  }

  if (role === 'teacher') {
    return <TeacherLiveClassesPage recordings={recordings} onEdit={handleEdit} onDelete={handleDelete} onGoLive={handleGoLive} />;
  }

  return <StudentLiveClassesPage recordings={recordings} liveClass={liveClass} />;
}

export default function LiveClassesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LiveClassesContent />
    </Suspense>
  )
}
