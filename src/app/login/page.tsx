
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
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
        toast({
            title: 'Login Failed',
            description: 'Please enter both email and password.',
            variant: 'destructive',
        });
        setIsLoading(false);
        return;
    }

    try {
        if (!db) {
            throw new Error("Firestore is not initialized");
        }
        
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            toast({
                title: 'Login Failed',
                description: 'No user found with this email.',
                variant: 'destructive',
            });
            setIsLoading(false);
            return;
        }

        let userFound = false;
        querySnapshot.forEach((doc) => {
             const user = doc.data();
             // In a real app, you would hash and compare the password.
             // For this demo, we'll just check if the stored password matches.
             if (user.password === password) {
                userFound = true;
                toast({
                    title: 'Login Successful!',
                    description: `Welcome back, ${user.name}. Redirecting...`,
                });
                
                // Store user info in localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('user', JSON.stringify({ name: user.name, role: user.role, email: user.email }));
                }

                router.push(`/dashboard?role=${user.role}`);
             }
        });

        if (!userFound) {
             toast({
                title: 'Login Failed',
                description: 'Incorrect password. Please try again.',
                variant: 'destructive',
            });
        }

    } catch (error) {
        console.error("Error logging in: ", error);
        toast({
            title: 'Error',
            description: 'Something went wrong during login. Please try again.',
            variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  }


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
                     <form onSubmit={handleLogin} className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                              id="email"
                              type="email"
                              placeholder="alex@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input 
                            id="password" 
                            type="password" 
                            placeholder='********'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                           />
                        </div>
                        <Button type="submit" className="w-full !mt-6" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Login
                        </Button>
                    </form>
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
