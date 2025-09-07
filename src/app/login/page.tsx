
"use client";

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignUpForm } from '@/components/signup-form';

export default function LoginPage() {

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
        <Link href="/" className='mx-auto mb-4'>
          <Logo />
        </Link>
          <CardTitle className="font-headline text-3xl font-bold text-primary">
            Welcome to EduVerse
          </CardTitle>
          <CardDescription>
            The unified learning ecosystem. Sign in or create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                     <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                              id="email"
                              type="email"
                              placeholder="alex@example.com"
                              defaultValue="alex@example.com"
                              disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" defaultValue="password" disabled />
                        </div>
                        <p className='text-sm text-center text-muted-foreground pt-2'>Select a role to login:</p>
                        <div className="grid grid-cols-1 gap-3 !mt-4">
                          <Button asChild>
                              <Link href={`/dashboard?role=student`}>Login as Student</Link>
                          </Button>
                           <Button asChild>
                              <Link href={`/dashboard?role=teacher`}>Login as Teacher</Link>
                          </Button>
                           <Button asChild>
                              <Link href={`/dashboard?role=parent`}>Login as Parent</Link>
                          </Button>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="signup">
                    <div className="pt-4">
                         <SignUpForm onSubmitted={() => {}} />
                    </div>
                </TabsContent>
            </Tabs>
        </CardContent>
        <CardFooter className="flex w-full justify-center text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary">
                Forgot password?
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
