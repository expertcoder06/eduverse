"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateStudentTimetable } from '@/ai/flows/generate-student-timetable';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  studentName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }).default('Alex'),
  courses: z.string().min(10, {
    message: 'Please list at least one course.',
  }),
  preferredStudyTimes: z.string().min(5, {
    message: 'Please mention your preferred times.',
  }),
});

export default function TimetablePage() {
  const [timetable, setTimetable] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: 'Alex',
      courses: 'Math, Physics, History, English Literature, Computer Science',
      preferredStudyTimes: 'Mornings and late afternoons',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimetable('');
    try {
      const result = await generateStudentTimetable({
        ...values,
        courses: values.courses.split(',').map((c) => c.trim()),
      });
      setTimetable(result.timetable);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Generating Timetable',
        description: 'There was an issue with the AI service. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Timetable Scheduler</h1>
        <p className="text-muted-foreground">
          Let our AI create the perfect weekly schedule for you.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Details</CardTitle>
            <CardDescription>
              Provide your courses and preferences to generate a schedule.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="courses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Courses</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Math, Science, History"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your courses, separated by commas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredStudyTimes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Study Times</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Mornings, weekends"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        When do you feel most productive?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Generate Timetable
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Generated Timetable</CardTitle>
            <CardDescription>
              Your personalized weekly schedule will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {isLoading && (
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                  <p className="mt-2">Generating your schedule...</p>
                </div>
              </div>
            )}
            {!isLoading && timetable && (
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-lg bg-secondary/50 p-4 font-mono text-sm">
                {timetable}
              </div>
            )}
            {!isLoading && !timetable && (
              <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">
                  Waiting for generation...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
