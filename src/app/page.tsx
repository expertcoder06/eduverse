
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, BookOpen, CalendarCheck, ChevronRight, User, Users, GraduationCap, BrainCircuit, ShieldCheck, HeartPulse, BarChart, MessageSquare, Star } from 'lucide-react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import './landing.css';
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SignUpForm } from '@/components/signup-form';
import Autoplay from "embla-carousel-autoplay"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const featureCards = [
  {
    icon: <User className="h-10 w-10 text-accent transition-transform group-hover:animate-bounce" />,
    title: 'Student Dashboard',
    description: 'AI Timetable, Gamification, Chatbot, and Performance Tracking.',
    link: '/student',
  },
  {
    icon: <Users className="h-10 w-10 text-accent transition-transform group-hover:animate-bounce" />,
    title: 'Teacher Dashboard',
    description: 'Class Management, Upload Resources, and Review Students.',
    link: '/teacher',
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-accent transition-transform group-hover:animate-bounce" />,
    title: 'Parent Dashboard',
    description: 'Track Attendance, Progress Alerts, and Suggestions.',
    link: '/parent',
  },
];

const uniqueFeatures = [
    { icon: <BrainCircuit className="h-8 w-8" />, name: 'AI Mentor' },
    { icon: <Bot className="h-8 w-8" />, name: 'Voice & Sign Language Recognition' },
    { icon: <Users className="h-8 w-8" />, name: 'Virtual PTM' },
    { icon: <BarChart className="h-8 w-8" />, name: 'Career Recommendations' },
]

const whyChooseUsFeatures = [
    { icon: <BrainCircuit className="h-8 w-8 text-primary" />, title: "AI Mentor", description: "Personalized guidance to help students excel." },
    { icon: <BarChart className="h-8 w-8 text-primary" />, title: "Career Guidance", description: "AI-powered recommendations for future paths." },
    { icon: <ShieldCheck className="h-8 w-8 text-primary" />, title: "Blockchain Security", description: "Ensuring data privacy and security for all users." },
    { icon: <HeartPulse className="h-8 w-8 text-primary" />, title: "Wellness Monitor", description: "Tracking student well-being for a healthy learning environment." },
]

const testimonials = [
    {
        quote: "The AI mentor is incredible! It helped me identify my weak spots in Physics and created a study plan that actually worked. My grades have improved so much.",
        name: "Alex",
        role: "11th Grade Student",
        rating: 5,
        avatar: "https://picsum.photos/seed/alex-testimonial/100/100",
    },
    {
        quote: "As a teacher, this platform has been a lifesaver. The ability to upload resources and track student performance in one place has saved me hours of work.",
        name: "Mrs. Davis",
        role: "High School Teacher",
        rating: 5,
        avatar: "https://picsum.photos/seed/davis-testimonial/100/100",
    },
    {
        quote: "I love that I can see my child's attendance and grades in real-time. The notifications keep me informed and involved in his education like never before.",
        name: "Sarah J.",
        role: "Parent",
        rating: 4,
        avatar: "https://picsum.photos/seed/sarah-testimonial/100/100",
    }
]

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <div className="flex flex-col min-h-screen bg-grid-white/[0.05]">
      <main className="flex-1">
        <section className="relative h-[100svh] flex items-center justify-center text-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x"></div>
          <div className="absolute inset-0 -z-10 bg-background bg-grid-purple-500/[0.05]"></div>
          
          <div className="z-10">
            <h1 className="text-4xl md:text-6xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Reimagine Learning with an AI-powered Smart Classroom
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              A unified platform for students, teachers, and parents with AI tools, a digital library, gamification, and more.
            </p>
            <div className="mt-8 flex justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <Button asChild size="lg" className="text-lg transition-transform transform hover:scale-105">
                <Link href="/login">Sign In</Link>
              </Button>
               <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                     <Button size="lg" variant="outline" className="text-lg transition-transform transform hover:scale-105">
                        Sign Up Free
                      </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create an Account</DialogTitle>
                      <DialogDescription>
                        Join Pro Learning today and start your journey towards smarter learning.
                      </DialogDescription>
                    </DialogHeader>
                    <SignUpForm onSubmitted={() => setOpen(false)} />
                  </DialogContent>
                </Dialog>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        <section id="features" className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline">A Dashboard for Everyone</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
                  Tailored experiences for every user. Whether you're a student, teacher, or parent, our platform has you covered.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featureCards.map((feature, index) => (
                <Card key={index} className="group bg-card/50 backdrop-blur-sm border-white/10 transform hover:scale-105 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms`}}>
                  <CardHeader className="items-center">
                    {feature.icon}
                    <CardTitle className='pt-4'>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                    <Button variant="link" asChild className="mt-4 group/link">
                        <Link href={feature.link}>
                            Learn More 
                            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <h3 className="text-2xl font-bold mb-8 font-headline">Discover Our Unique Features</h3>
                <div className="flex flex-wrap justify-center gap-8">
                    {uniqueFeatures.map((feature, index) => (
                        <div key={feature.name} className="flex items-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border-white/10 animate-fade-in-up transition-transform transform hover:scale-110" style={{ animationDelay: `${index * 150}ms` }}>
                            {feature.icon}
                            <span className="font-semibold">{feature.name}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 px-4 bg-background/50">
          <div className="container mx-auto text-center">
             <div className="animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 font-headline">How It Works</h2>
            </div>
            <div className="relative grid md:grid-cols-3 gap-8">
              <div className="absolute top-1/2 left-0 w-full h-1 hidden md:block">
                  <svg width="100%" height="100%">
                      <line x1="0" y1="50%" x2="100%" y2="50%" strokeDasharray="5,5" className="stroke-muted-foreground" strokeWidth="2" />
                  </svg>
              </div>
              <div className="flex flex-col items-center z-10 animate-fade-in-left" style={{ animationDelay: '0ms' }}>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 transition-transform transform hover:rotate-12">1</div>
                <h3 className="text-xl font-semibold">Login</h3>
                <p className="text-muted-foreground">Login as a Student, Teacher, or Parent.</p>
              </div>
              <div className="flex flex-col items-center z-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 transition-transform transform hover:rotate-12">2</div>
                <h3 className="text-xl font-semibold">Access Dashboard</h3>
                <p className="text-muted-foreground">View your personalized dashboard.</p>
              </div>
              <div className="flex flex-col items-center z-10 animate-fade-in-right" style={{ animationDelay: '400ms' }}>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 transition-transform transform hover:rotate-12">3</div>
                <h3 className="text-xl font-semibold">Learn, Track, Grow</h3>
                <p className="text-muted-foreground">Engage with tools to enhance learning.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 font-headline">See It In Action</h2>
            </div>
             <Carousel 
                className="w-full max-w-4xl mx-auto animate-fade-in-up" 
                style={{ animationDelay: '200ms' }} 
                opts={{}}
                plugins={[plugin.current]}
                onMouseEnter={() => plugin.current.stop()}
                onMouseLeave={() => plugin.current.play()}
                >
              <CarouselContent>
                <CarouselItem>
                  <Image src="https://picsum.photos/seed/dashboard/1200/700" alt="Student Dashboard Preview" width={1200} height={700} className="rounded-lg shadow-2xl" data-ai-hint="student dashboard analytics" />
                </CarouselItem>
                <CarouselItem>
                   <Image src="https://picsum.photos/seed/resources/1200/700" alt="Resource Library Preview" width={1200} height={700} className="rounded-lg shadow-2xl" data-ai-hint="digital library education" />
                </CarouselItem>
                <CarouselItem>
                   <Image src="https://picsum.photos/seed/gamification/1200/700" alt="Gamified Rewards Preview" width={1200} height={700} className="rounded-lg shadow-2xl" data-ai-hint="gamification rewards achievement" />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-[-50px] transition-transform transform hover:scale-110" />
              <CarouselNext className="right-[-50px] transition-transform transform hover:scale-110" />
            </Carousel>
          </div>
        </section>

         <section id="why-choose-us" className="py-20 px-4 bg-background/50">
            <div className="container mx-auto text-center">
                <div className="animate-fade-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 font-headline">Why Choose Pro Learning?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {whyChooseUsFeatures.map((feature, index) => (
                        <div key={index} className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border-white/10 text-center animate-fade-in-up transition-transform transform hover:scale-105" style={{animationDelay: `${(index * 200) + 200}ms`}}>
                            <div className="flex justify-center mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold">{feature.title}</h3>
                            <p className="text-muted-foreground mt-2">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="testimonials" className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center animate-fade-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 font-headline">What Our Users Say</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-card/50 backdrop-blur-sm border-white/10 animate-fade-in-up" style={{ animationDelay: `${(index * 200) + 200}ms` }}>
                            <CardContent className="p-6 text-center flex flex-col items-center">
                                <Avatar className="w-20 h-20 mb-4">
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person" />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex justify-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <blockquote className="italic text-muted-foreground">"{testimonial.quote}"</blockquote>
                                <p className="mt-4 font-semibold text-foreground">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>


        <section id="feedback" className="py-20 px-4 bg-background/50">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline">We'd Love Your Feedback</h2>
              <p className="text-muted-foreground mb-12">
                Have a suggestion or found a bug? Let us know!
              </p>
            </div>
            <Card className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Your Email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your feedback..." />
                  </div>
                  <Button type="submit" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="signup" className="py-20 px-4 text-center">
            <div className="container mx-auto animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline">Ready to Join?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                    Create an account today and take the first step towards a smarter learning future.
                </p>
                <Button asChild size="lg" className="text-lg transition-transform transform hover:scale-105 animate-pulse-glow">
                    <Link href="/login">Get Started for Free <ArrowRight className="h-5 w-5 ml-2" /></Link>
                </Button>
            </div>
        </section>



      </main>

       <footer className="py-8 px-4 border-t border-white/10 bg-background/50">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Pro Learning. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors animate-fade-in-up" style={{animationDelay: '200ms'}}>About</Link>
                    <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors animate-fade-in-up" style={{animationDelay: '300ms'}}>Contact</Link>
                    <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors animate-fade-in-up" style={{animationDelay: '400ms'}}>Privacy Policy</Link>
                    <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors animate-fade-in-up" style={{animationDelay: '500ms'}}>Terms of Service</Link>
                </div>
            </div>
        </footer>
    </div>
  );
}
