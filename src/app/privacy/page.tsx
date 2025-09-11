
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">Pro Learning</span>
          </Link>
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Back to App
          </Link>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline text-primary">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-6">
            <p>
              Welcome to Pro Learning. We are committed to protecting your privacy and handling your data in an open and transparent manner. This privacy policy explains how we collect, use, and share information about you when you use our platform.
            </p>

            <section>
              <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
              <p>
                We may collect personal information that you provide directly to us, such as when you create an account, update your profile, or communicate with us. This may include:
              </p>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, password, role (student, teacher, parent), and phone number.</li>
                <li><strong>Profile Information:</strong> Field of study for students, subjects taught by teachers.</li>
                <li><strong>Academic Data:</strong> Assignments, grades, performance metrics, and timetable information.</li>
                <li><strong>Communications:</strong> Any feedback, questions, or information you provide when you contact us.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide, operate, and maintain our services.</li>
                <li>Improve, personalize, and expand our services.</li>
                <li>Understand and analyze how you use our services.</li>
                <li>Develop new products, services, features, and functionality.</li>
                <li>Communicate with you for customer service, to provide you with updates and other information relating to the platform, and for marketing purposes.</li>
                <li>Process your transactions and manage your account.</li>
                <li>For compliance purposes, including enforcing our Terms of Service, or other legal rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">3. Data Security</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. However, no electronic storage or transmission over the internet is completely secure, and we cannot guarantee its absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">4. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us by visiting the <Link href="/contact" className="text-primary hover:underline">Contact Page</Link>.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
