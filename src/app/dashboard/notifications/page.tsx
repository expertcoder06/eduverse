import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bell, Calendar, FileText, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const notifications = [
  {
    id: 1,
    icon: FileText,
    title: 'Math Assignment Due',
    description: 'Calculus assignment #3 is due tomorrow at 11:59 PM.',
    time: '2 hours ago',
    read: false,
    category: 'Assignment'
  },
  {
    id: 2,
    icon: Calendar,
    title: 'Physics Midterm Exam Scheduled',
    description: 'Your midterm exam is scheduled for next Friday.',
    time: '1 day ago',
    read: false,
    category: 'Exam'
  },
  {
    id: 3,
    icon: CheckCircle,
    title: 'History Paper Graded',
    description: 'Your paper on the Renaissance has been graded. Score: A-',
    time: '2 days ago',
    read: true,
    category: 'Grade'
  },
   {
    id: 4,
    icon: FileText,
    title: 'New Resource Added',
    description: 'A new video lecture for Computer Science has been uploaded.',
    time: '3 days ago',
    read: true,
    category: 'Resource'
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Notifications</h1>
        <p className="text-muted-foreground">
          Stay up-to-date with assignments, exams, and grades.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>You have {notifications.filter(n => !n.read).length} unread notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-secondary/50"
              >
                {!notification.read && (
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                )}
                <notification.icon className="h-5 w-5 shrink-0 text-muted-foreground mt-1" style={{marginLeft: notification.read ? '16px' : '0'}} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                   <Badge variant="outline" className='mt-2'>{notification.category}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
