
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getPersonalizedStudyPlan } from '@/ai/flows/get-personalized-study-plan';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Loader2, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  studentName: z.string().default('Alex'),
  subject: z.string().min(2, 'Subject is required.'),
  strengths: z.string().min(10, 'Please describe strengths.'),
  weaknesses: z.string().min(10, 'Please describe weaknesses.'),
  examDate: z.date({ required_error: 'Exam date is required.' }),
});

export default function MentorPage() {
  const [studyPlan, setStudyPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: 'Alex',
      subject: 'History',
      strengths: 'Good at remembering dates and key figures.',
      weaknesses: 'Struggles with understanding the broader context and consequences of events.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setStudyPlan('');
    try {
      const result = await getPersonalizedStudyPlan({
        ...values,
        examDate: format(values.examDate, 'PPP'),
      });
      setStudyPlan(result.studyPlan);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Generating Plan',
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
        <h1 className="text-3xl font-bold font-headline">Virtual Mentor</h1>
        <p className="text-muted-foreground">
          Get a personalized study plan to help your student succeed.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create a Plan</CardTitle>
            <CardDescription>
              Tell the AI about the student's learning style and goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Physics" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="strengths"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Strengths</FormLabel>
                      <FormControl>
                        <Textarea placeholder="What is the student good at in this subject?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weaknesses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weaknesses</FormLabel>
                      <FormControl>
                        <Textarea placeholder="What does the student struggle with?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="examDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Upcoming Exam Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Lightbulb className="mr-2 h-4 w-4" />
                  )}
                  Generate Study Plan
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>The Student's Personalized Study Plan</CardTitle>
            <CardDescription>
              A tailored plan to help the student succeed will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {isLoading && (
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                  <p className="mt-2">Crafting the plan...</p>
                </div>
              </div>
            )}
            {!isLoading && studyPlan && (
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-lg bg-secondary/50 p-4">
                {studyPlan}
              </div>
            )}
            {!isLoading && !studyPlan && (
              <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">
                  The generated plan awaits...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
