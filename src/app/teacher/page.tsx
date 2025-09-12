
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Upload, BarChart3, Megaphone, CheckCircle } from 'lucide-react';
import { FeatureCard } from '../features/page';
import { Logo } from '@/components/logo';

const teacherFeatures = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: 'Manage Classes & Timetable',
      description: 'Easily schedule classes, manage rosters, and organize your teaching week.',
    },
    {
      icon: <Upload className="h-8 w-8 text-primary" />,
      title: 'Upload Resources',
      description: 'Share notes, assignments, and video lectures with a simple drag-and-drop uploader.',
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: 'Review Student Performance',
      description: 'Track class-wide analytics and individual student progress with interactive graphs.',
    },
    {
      icon: <Megaphone className="h-8 w-8 text-primary" />,
      title: 'Quick Announcements',
      description: 'Instantly send announcements or create quizzes for your entire class.',
    },
];

const teacherBenefits = [
  'Save Valuable Time with automated tools for classroom management.',
  'Improve Teaching Efficiency by focusing on what matters most—your students.',
  'Foster Better Communication through instant announcements and resource sharing.',
  'Gain Data-Driven Insights to understand and support every student.',
];


const faqs = [
    {
        question: "Can I manage multiple classes?",
        answer: "Yes, the dashboard is designed to help you manage multiple classes and subjects seamlessly. You can switch between classes with a single click."
    },
    {
        question: "What file types can I upload?",
        answer: "You can upload various file types, including PDFs, DOCX, MP4, and more. The system is designed to handle common educational material formats."
    },
    {
        question: "How are student privacy and data protected?",
        answer: "We use end-to-end encryption and follow strict data privacy protocols to ensure that all student and teacher data is secure."
    }
]

export default function TeacherPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">A Smarter Way to Teach</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Pro Learning streamlines classroom management, saving you time and providing powerful insights to help your students succeed.
          </p>
           <Button asChild size="lg" className="mt-8 text-lg">
            <Link href="/login">Get Started</Link>
          </Button>
        </section>

        {/* Features Section */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center font-headline">Tools for the Modern Educator</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {teacherFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

         {/* Benefits Section */}
         <section className="mt-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <Image
                    src="https://picsum.photos/seed/teacher-benefit/600/400"
                    alt="Teacher using Pro Learning dashboard"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl"
                    data-ai-hint="happy teacher"
                />
                <div>
                     <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Focus on What Matters Most</h2>
                    <ul className="space-y-4">
                        {teacherBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 shrink-0" />
                            <span className="text-lg text-muted-foreground">{benefit}</span>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>


        {/* Demo Previews Section */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center font-headline">A Glimpse of Your New Dashboard</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Class Overview</CardTitle>
                <CardDescription>Manage your classes at a glance.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="https://picsum.photos/seed/class-overview-demo/600/400" alt="Class overview preview" width={600} height={400} className="rounded-md" data-ai-hint="teacher dashboard" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Track student performance easily.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="https://picsum.photos/seed/analytics-demo/600/400" alt="Analytics preview" width={600} height={400} className="rounded-md" data-ai-hint="dashboard charts" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="mt-20 max-w-4xl mx-auto">
            <Card className="bg-secondary/50">
                <CardContent className="pt-6">
                    <blockquote className="text-center text-xl md:text-2xl font-semibold italic text-foreground">
                       "Pro Learning has cut my administrative work in half. I can now spend more time creating engaging lessons and less time on paperwork. The performance analytics are a game-changer!"
                    </blockquote>
                    <p className="text-center mt-4 text-muted-foreground">— Mrs. Davis, High School Teacher</p>
                </CardContent>
            </Card>
        </section>


        {/* FAQ Section */}
         <section className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline">Your Questions, Answered</h2>
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
             <h2 className="text-3xl md:text-4xl font-bold font-headline">Join the Future of Teaching</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Empower your teaching with AI and create a more efficient, engaging classroom.
            </p>
            <Button asChild size="lg" className="mt-8 text-lg">
                <Link href="/login">Get Early Access <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
