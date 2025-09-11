
"use client";

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, PlusCircle, Send } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
export const dynamic = 'force-dynamic';

const initialResources = {
  notes: [
    { title: 'Calculus Cheat Sheet', subject: 'Math', image: 'https://picsum.photos/400/250?random=1', dataAiHint: 'math abstract' },
    { title: 'The Roman Republic', subject: 'History', image: 'https://picsum.photos/400/250?random=2', dataAiHint: 'ancient rome' },
    { title: 'Intro to Photosynthesis', subject: 'Science', image: 'https://picsum.photos/400/250?random=3', dataAiHint: 'nature leaf' },
    { title: 'Shakespearean Sonnets', subject: 'English', image: 'https://picsum.photos/400/250?random=4', dataAiHint: 'old book' },
  ],
  ebooks: [
    { title: 'Pride and Prejudice', subject: 'English', image: 'https://picsum.photos/seed/prejudice/400/250', dataAiHint: 'classic novel' },
    { title: 'Calculus: A Modern Approach', subject: 'Math', image: 'https://picsum.photos/seed/calculus-book/400/250', dataAiHint: 'math textbook' },
    { title: 'A Brief History of Time', subject: 'Physics', image: 'https://picsum.photos/400/250?random=5', dataAiHint: 'space galaxy' },
    { title: 'The Elements of Style', subject: 'English', image: 'https://picsum.photos/400/250?random=6', dataAiHint: 'writing typography' },
    { title: 'Cosmos', subject: 'Astronomy', image: 'https://picsum.photos/400/250?random=7', dataAiHint: 'stars night' },
  ],
  videos: [
    { title: 'Organic Chemistry Basics', subject: 'Chemistry', image: 'https://picsum.photos/400/250?random=8', dataAiHint: 'science lab' },
    { title: 'Supply and Demand', subject: 'Economics', image: 'https://picsum.photos/400/250?random=9', dataAiHint: 'city market' },
  ],
};


type Resource = {
    title: string;
    subject: string;
    image: string;
    dataAiHint: string;
}

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const handleDownload = () => {
    const fileContent = `This is a dummy file for ${resource.title}.\n\nIn a real application, this would be the actual resource file.`;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resource.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <Card className="overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
        <CardHeader className="p-0">
        <Image
            src={resource.image}
            alt={resource.title}
            width={400}
            height={250}
            className="aspect-video w-full object-cover"
            data-ai-hint={resource.dataAiHint}
        />
        </CardHeader>
        <CardContent className="p-4">
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <CardDescription>{resource.subject}</CardDescription>
        </CardContent>
        <CardFooter className='p-4 pt-0'>
            <Button variant="outline" className="w-full" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
            </Button>
        </CardFooter>
    </Card>
)};

const UploadResourceDialog = ({ onUpload }: { onUpload: (resource: Resource, type: 'notes' | 'ebooks' | 'videos') => void }) => {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const subject = formData.get('subject') as string;
        const type = formData.get('type') as 'notes' | 'ebooks' | 'videos';

        if (!title || !subject || !type) {
            toast({
                title: "Missing Information",
                description: "Please fill out all fields.",
                variant: "destructive",
            });
            return;
        }

        const newResource: Resource = {
            title,
            subject,
            image: `https://picsum.photos/400/250?random=${Math.floor(Math.random() * 1000)}`,
            dataAiHint: 'new resource',
        };

        onUpload(newResource, type);
        toast({
            title: "Resource Uploaded!",
            description: `"${title}" has been added to the library.`,
        });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="transition-transform transform hover:scale-105">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Upload New Resource
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload a New Resource</DialogTitle>
                    <DialogDescription>
                        Add a new learning material for your students.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input id="title" name="title" placeholder="e.g., The French Revolution" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="subject" className="text-right">
                                Subject
                            </Label>
                            <Input id="subject" name="subject" placeholder="e.g., History" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <Select name="type">
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select resource type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="notes">Note</SelectItem>
                                    <SelectItem value="ebooks">E-book</SelectItem>
                                    <SelectItem value="videos">Video</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                         <DialogClose asChild>
                            <Button type="button" variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Resource
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};


const TeacherLibraryPage = ({ resources, onUpload }: { resources: typeof initialResources, onUpload: (resource: Resource, type: 'notes' | 'ebooks' | 'videos') => void }) => (
    <div className="space-y-6 animate-fade-in-up">
         <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">
                Manage Resources
            </h1>
            <p className="text-muted-foreground">
                Upload and manage course materials for your students.
            </p>
            </div>
            <UploadResourceDialog onUpload={onUpload} />
        </div>
        <Tabs defaultValue="notes" className="w-full">
            <TabsList>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="ebooks">E-books</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {resources.notes.map((res) => (
                <ResourceCard key={res.title} resource={res} />
                ))}
            </div>
            </TabsContent>
            <TabsContent value="ebooks" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {resources.ebooks.map((res) => (
                <ResourceCard key={res.title} resource={res} />
                ))}
            </div>
            </TabsContent>
            <TabsContent value="videos" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {resources.videos.map((res) => (
                <ResourceCard key={res.title} resource={res} />
                ))}
            </div>
            </TabsContent>
        </Tabs>
    </div>
)


const StudentLibraryPage = ({resources}: {resources: typeof initialResources}) => {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const handleRequestSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: "Request Sent!",
            description: "Your resource request has been sent to your teachers.",
        });
        setOpen(false);
    }
    
    return (
    <div className="space-y-6 animate-fade-in-up">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold font-headline">
                Resource Library
            </h1>
            <p className="text-muted-foreground">
                Access notes, e-books, and video lectures.
            </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Request a Resource
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Request a New Resource</DialogTitle>
                        <DialogDescription>
                            Can't find what you're looking for? Let your teachers know what you need.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRequestSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="subject" className="text-right">
                                    Subject
                                </Label>
                                <Input id="subject" defaultValue="History" className="col-span-3" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input id="title" placeholder="e.g., Video on the French Revolution" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="reason" className="text-right">
                                    Reason
                                </Label>
                                <Textarea id="reason" placeholder="Why do you need this resource?" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">
                                <Send className="mr-2 h-4 w-4" />
                                Send Request
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
        <Tabs defaultValue="notes" className="w-full">
            <TabsList>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="ebooks">E-books</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {resources.notes.map((res) => (
                <ResourceCard key={res.title} resource={res} />
                ))}
            </div>
            </TabsContent>
            <TabsContent value="ebooks" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {resources.ebooks.map((res) => (
                <ResourceCard key={res.title} resource={res} />
                ))}
            </div>
            </TabsContent>
            <TabsContent value="videos" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {resources.videos.map((res) => (
                <ResourceCard key={res.title} resource={res} />
                ))}
            </div>
            </TabsContent>
        </Tabs>
    </div>
    )
}

function LibraryContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const [resources, setResources] = useState(initialResources);

  const handleUpload = (resource: Resource, type: 'notes' | 'ebooks' | 'videos') => {
      setResources(prevResources => ({
          ...prevResources,
          [type]: [...prevResources[type], resource],
      }));
  }

  if (role === 'teacher') {
      return <TeacherLibraryPage resources={resources} onUpload={handleUpload} />
  }

  return <StudentLibraryPage resources={resources} />
}


export default function LibraryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LibraryContent />
    </Suspense>
  )
}

    