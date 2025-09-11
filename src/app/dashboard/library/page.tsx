

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
import { Download, PlusCircle, Upload, FileText, Video, BookOpen } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Suspense } from 'react';
export const dynamic = 'force-dynamic';

const resources = {
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


const TeacherLibraryPage = () => (
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
            <Button className="transition-transform transform hover:scale-105">
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload New Resource
            </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                    <CardTitle>Upload New File</CardTitle>
                    <CardDescription>Drag and drop files here or browse to upload.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed py-16 text-center transition-colors hover:border-primary hover:bg-accent/50">
                        <Upload className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">Drag & drop files or click to browse</p>
                        <Button variant="outline">Browse Files</Button>
                    </div>
                </CardContent>
            </Card>
             <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                    <CardTitle>Uploading Progress</CardTitle>
                    <CardDescription>Track your active file uploads.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <p className="flex items-center gap-2 font-medium"><FileText className="h-4 w-4" /> Chapter_5_Notes.pdf</p>
                            <p>75%</p>
                        </div>
                        <Progress value={75} />
                   </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <p className="flex items-center gap-2 font-medium"><Video className="h-4 w-4" /> Lecture_12_Video.mp4</p>
                            <p>33%</p>
                        </div>
                        <Progress value={33} />
                   </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <p className="flex items-center gap-2 font-medium"><BookOpen className="h-4 w-4" /> History_eBook.epub</p>
                            <p>Completed</p>
                        </div>
                        <Progress value={100} />
                   </div>
                </CardContent>
            </Card>
        </div>
    </div>
)


const StudentLibraryPage = () => (
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
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Request a Resource
        </Button>
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

function LibraryContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  if (role === 'teacher') {
      return <TeacherLibraryPage />
  }

  return <StudentLibraryPage />
}


export default function LibraryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LibraryContent />
    </Suspense>
  )
}
