
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Bot, Library, TrendingUp, Trophy, CheckCircle, BrainCircuit } from 'lucide-react';
import { FeatureCard } from '../features/page';
import { Logo } from '@/components/logo';

const studentFeatures = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: 'AI Timetable Scheduler',
      description: 'Get a personalized schedule that adapts to your learning pace and preferences.',
    },
    {
      icon: <Library className="h-8 w-8 text-primary" />,
      title: 'Digital Library & Notes',
      description: 'Access a vast collection of e-books, notes, and videos anytime, anywhere.',
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: 'AI Chatbot Assistant',
      description: 'Get instant answers to your academic questions, 24/7.',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: 'Performance Tracker',
      description: 'Visualize your progress with interactive charts and improvement meters.',
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: 'Gamification & Rewards',
      description: 'Earn badges, coins, and climb the ranks by completing your work.',
    },
    {
        icon: <BrainCircuit className="h-8 w-8 text-primary" />,
        title: 'AI Virtual Mentor',
        description: 'Receive personalized study plans and guidance to overcome challenges.',
      },
];

const studentBenefits = [
  'Enhanced Learning through personalized and adaptive tools.',
  'Increased Motivation with gamified rewards and healthy competition.',
  'Real-Time Help from our AI chatbot whenever you need it.',
  'Stay Organized with an intelligent, automated timetable.',
];

const faqs = [
    {
        question: "Is the AI timetable flexible?",
        answer: "Yes, the timetable is fully flexible. You can regenerate it based on your changing preferences and workload."
    },
    {
        question: "How does the AI chatbot work?",
        answer: "The chatbot is powered by a large language model trained on a wide range of academic subjects. You can ask it questions, and it will provide detailed explanations and answers."
    },
    {
        question: "Can I upload my own notes?",
        answer: "Currently, the resource library is curated by teachers, but we are working on a feature to allow students to upload and share their own notes with peers."
    }
]

export default function StudentPage() {
  return (
    <div className="bg-background text-foreground">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                
                <span className="font-bold sm:inline-block">Pro Learning</span>
            </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Empower Your Learning Journey</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Pro Learning provides students with AI-powered tools, personalized tracking, and engaging rewards to make learning more effective and fun.
          </p>
          <Button asChild size="lg" className="mt-8 text-lg">
            <Link href="/login">Get Started</Link>
          </Button>
        </section>

        {/* Features Section */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center font-headline">Features Designed for You</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {studentFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        {/* Benefits Section */}
         <section className="mt-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                     <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Unlock Your Full Potential</h2>
                    <ul className="space-y-4">
                        {studentBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 shrink-0" />
                            <span className="text-lg text-muted-foreground">{benefit}</span>
                        </li>
                        ))}
                    </ul>
                </div>
                <Image
                    src="https://picsum.photos/seed/student-benefit/600/400"
                    alt="Student benefiting from Pro Learning"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl"
                    data-ai-hint="happy student"
                />
            </div>
        </section>

        {/* Demo Previews Section */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center font-headline">See It in Action</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>AI Timetable</CardTitle>
                <CardDescription>A perfectly balanced week.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="https://picsum.photos/seed/timetable-demo/600/400" alt="Timetable preview" width={600} height={400} className="rounded-md" data-ai-hint="schedule calendar" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Gamified Leaderboard</CardTitle>
                 <CardDescription>Climb to the top!</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="https://picsum.photos/seed/leaderboard-demo/600/400" alt="Leaderboard preview" width={600} height={400} className="rounded-md" data-ai-hint="leaderboard achievement" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Chatbot</CardTitle>
                 <CardDescription>Instant help is here.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="https://picsum.photos/seed/chatbot-demo/600/400" alt="Chatbot preview" width={600} height={400} className="rounded-md" data-ai-hint="chatbot interface" />
              </CardContent>
            </Card>
          </div>
        </section>

         {/* Testimonial Section */}
        <section className="mt-20 max-w-4xl mx-auto">
            <Card className="bg-secondary/50">
                <CardContent className="pt-6">
                    <blockquote className="text-center text-xl md:text-2xl font-semibold italic text-foreground">
                       "Using Pro Learning has completely changed how I study. The AI mentor helped me improve my history grades by 20% in just one month! It's like having a personal tutor."
                    </blockquote>
                    <p className="text-center mt-4 text-muted-foreground">— Alex, 10th Grade</p>
                </CardContent>
            </Card>
        </section>

        {/* FAQ Section */}
        <section className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full mt-8">
                 {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index+1}`} key={index}>
                        <AccordionTrigger className='text-lg'>{faq.question}</AccordionTrigger>
                        <AccordionContent className='text-base text-muted-foreground'>
                        {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                 ))}
            </Accordion>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Transform Your Learning?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of students who are learning smarter, not harder.
            </p>
            <Button asChild size="lg" className="mt-8 text-lg">
                <Link href="/login">Sign Up for Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </section>
      </main>

        <footer className="border-t py-6">
            <div className="container text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Pro Learning. All rights reserved.
            </div>
        </footer>
    </div>
  );
}
