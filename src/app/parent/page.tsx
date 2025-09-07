
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BarChartHorizontal, Bell, ShieldCheck, Lightbulb, CheckCircle } from 'lucide-react';
import { FeatureCard } from '../features/page';
import { Logo } from '@/components/logo';

const parentFeatures = [
    {
      icon: <BarChartHorizontal className="h-8 w-8 text-primary" />,
      title: 'Track Attendance',
      description: 'Stay informed with daily, weekly, and monthly attendance records for your child.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: 'Progress Monitoring',
      description: "Understand your child's academic strengths and weaknesses in each subject.",
    },
    {
      icon: <Bell className="h-8 w-8 text-primary" />,
      title: 'Alerts & Notifications',
      description: 'Receive timely alerts for exams, assignments, and other important events.',
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: 'Suggestions from AI Mentor',
      description: "Get AI-driven insights and tips to support your child's learning and well-being.",
    },
];

const parentBenefits = [
  'Stay More Involved in your child\'s academic journey.',
  'Provide Better Support with actionable insights and data.',
  'Never Miss an Update with timely notifications and alerts.',
  'Foster a Collaborative relationship with teachers and the school.',
];


const faqs = [
    {
        question: "Can I communicate with teachers through the app?",
        answer: "Yes, we are developing a secure messaging feature that will allow parents to communicate directly with teachers to discuss their child's progress and well-being."
    },
    {
        question: "How is my child's data kept private?",
        answer: "We adhere to strict privacy policies and use advanced security measures to ensure that all student data is confidential and accessible only to authorized users (you and the school staff)."
    },
    {
        question: "Can I track more than one child?",
        answer: "Yes, the parent dashboard is designed to support multiple children. You can easily switch between profiles to track the progress of each of your children."
    }
]

export default function ParentPage() {
  return (
    <div className="bg-background text-foreground">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <Logo />
                <span className="font-bold sm:inline-block">EduVerse</span>
            </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Stay Connected to Your Child's Success</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            The EduVerse Parent Dashboard offers a transparent window into your child's academic world, helping you support them every step of the way.
          </p>
          <Button asChild size="lg" className="mt-8 text-lg">
            <Link href="/login">Explore the Dashboard</Link>
          </Button>
        </section>

        {/* Features Section */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center font-headline">Insights at Your Fingertips</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {parentFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>


        {/* Benefits Section */}
         <section className="mt-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                     <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">A Partnership in Education</h2>
                    <ul className="space-y-4">
                        {parentBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 shrink-0" />
                            <span className="text-lg text-muted-foreground">{benefit}</span>
                        </li>
                        ))}
                    </ul>
                </div>
                <Image
                    src="https://picsum.photos/seed/parent-benefit/600/400"
                    alt="Parent and child using EduVerse"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl"
                    data-ai-hint="happy parent child"
                />
            </div>
        </section>


        {/* Demo Previews Section */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center font-headline">Your Window into the Classroom</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Chart</CardTitle>
                <CardDescription>A clear overview of attendance.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="https://picsum.photos/seed/attendance-demo/600/400" alt="Attendance chart preview" width={600} height={400} className="rounded-md" data-ai-hint="attendance chart" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Mentor Suggestions</CardTitle>
                 <CardDescription>Personalized tips for your child.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="https://picsum.photos/seed/suggestions-demo/600/400" alt="Suggestions feed preview" width={600} height={400} className="rounded-md" data-ai-hint="notifications feed" />
              </CardContent>
            </Card>
          </div>
        </section>

         {/* Testimonial Section */}
        <section className="mt-20 max-w-4xl mx-auto">
            <Card className="bg-secondary/50">
                <CardContent className="pt-6">
                    <blockquote className="text-center text-xl md:text-2xl font-semibold italic text-foreground">
                       "The parent dashboard is fantastic. I love getting real-time notifications about my son's assignments. The AI mentor's suggestions have given us great topics to discuss at home."
                    </blockquote>
                    <p className="text-center mt-4 text-muted-foreground">— Sarah J., Parent</p>
                </CardContent>
            </Card>
        </section>


        {/* FAQ Section */}
        <section className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline">Common Questions from Parents</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Be an Active Partner in Your Child's Education</h2>
             <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Sign up to connect with your child's school and unlock a new level of involvement.
            </p>
            <Button asChild size="lg" className="mt-8 text-lg">
                <Link href="/login">Create Your Parent Account <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </section>
      </main>
       <footer className="border-t py-6">
            <div className="container text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} EduVerse. All rights reserved.
            </div>
        </footer>
    </div>
  );
}
