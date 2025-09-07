"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getCareerGuidance } from '@/ai/flows/get-career-guidance';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  interests: z.string().min(10, 'Please describe your interests.'),
  skills: z.string().min(10, 'Please list some of your skills.'),
  subjects: z.string().min(5, 'Please list your favorite subjects.'),
});

export default function CareerPage() {
  const [careerAdvice, setCareerAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: 'Video games, drawing, and space exploration.',
      skills: 'Problem-solving, creative thinking, basic Python programming.',
      subjects: 'Physics, Art, Computer Science',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setCareerAdvice('');
    try {
      const result = await getCareerGuidance(values);
      setCareerAdvice(result.recommendation);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Getting Career Advice',
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
        <h1 className="text-3xl font-bold font-headline">AI Career Advisor</h1>
        <p className="text-muted-foreground">
          Discover potential career paths based on your passions and skills.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tell Us About Yourself</CardTitle>
            <CardDescription>
              The more details you provide, the better the recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Interests & Hobbies</FormLabel>
                      <FormControl>
                        <Textarea placeholder="What do you enjoy doing in your free time?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Skills</FormLabel>
                      <FormControl>
                        <Textarea placeholder="What are you good at?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="subjects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Favorite School Subjects</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Math, History, Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Get Career Recommendations
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Your Future Career Paths</CardTitle>
            <CardDescription>
              AI-powered suggestions to guide your journey will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {isLoading && (
              <div className="flex h-full items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                  <p className="mt-2">Analyzing your potential...</p>
                </div>
              </div>
            )}
            {!isLoading && careerAdvice && (
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-lg bg-secondary/50 p-4">
                {careerAdvice}
              </div>
            )}
            {!isLoading && !careerAdvice && (
              <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">
                  Waiting for your details...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    