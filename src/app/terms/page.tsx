
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="bg-background text-foreground">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">EduVerse</span>
          </Link>
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Back to App
          </Link>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline text-primary">Terms of Service</CardTitle>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-6">
            <p>
              Please read these Terms of Service carefully before using the EduVerse platform. Your access to and use of the service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the service.
            </p>

            <section>
              <h2 className="text-2xl font-semibold">1. Accounts</h2>
              <p>
                When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">2. Content</h2>
              <p>
                Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post on or through the service, including its legality, reliability, and appropriateness. We do not claim ownership of your content, but you grant us a license to use it for the purpose of operating and providing the service.
              </p>
            </section>
            
             <section>
              <h2 className="text-2xl font-semibold">3. Acceptable Use</h2>
              <p>
                You agree not to use the service in any way that is unlawful, or harms EduVerse, its service providers, its suppliers, or any other user. You agree not to use the service in any way that breaches any code of conduct, policy or other notice on the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">4. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">5. Changes to These Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
              </p>
            </section>

             <section>
              <h2 className="text-2xl font-semibold">6. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us by visiting the <Link href="/contact" className="text-primary hover:underline">Contact Page</Link>.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
