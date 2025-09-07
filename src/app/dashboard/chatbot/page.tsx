"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { answerSubjectQuestion } from '@/ai/flows/answer-subject-questions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Send, Loader2, User, Bot } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  subject: z.string().min(2, { message: 'Subject is required.' }),
  question: z.string().min(5, { message: 'Question must be at least 5 characters.' }),
});

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: 'Physics',
      question: '',
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: `Subject: ${values.subject}\nQuestion: ${values.question}`,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const result = await answerSubjectQuestion(values);
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: result.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      form.reset({ ...values, question: '' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Getting Answer',
        description: 'There was an issue with the AI service. Please try again.',
        variant: 'destructive',
      });
      setMessages((prev) => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold font-headline">AI Chatbot</h1>
        <p className="text-muted-foreground">
          Ask any question about your subjects and get instant help.
        </p>
      </div>

      <ScrollArea className="flex-1 rounded-md border p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.length === 0 ? (
            <div className="flex h-full min-h-[300px] items-center justify-center">
              <p className="text-muted-foreground">
                No messages yet. Ask a question to start the conversation.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-4',
                  message.role === 'user' ? 'justify-end' : ''
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xl rounded-lg p-3',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  )}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar>
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          )}
           {isLoading && (
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot />
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-2 rounded-lg bg-secondary p-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                </div>
              </div>
            )}
        </div>
      </ScrollArea>

      <div className="mt-4 border-t pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
            <div className="grid flex-1 gap-2">
                <div className='flex gap-2'>
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem className="w-1/3">
                            <FormControl>
                                <Input placeholder="Subject" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                placeholder="Type your question here..."
                                autoComplete="off"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>
            </div>
            <Button type="submit" disabled={isLoading} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
