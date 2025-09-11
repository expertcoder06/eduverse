
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bell, Calendar, FileText, CheckCircle, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const initialNotifications = [
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

const iconMap = {
    FileText,
    Calendar,
    CheckCircle,
    MessageSquare,
} as const;

type Notification = {
    id: number;
    icon: keyof typeof iconMap | React.ElementType;
    title: string;
    description: string;
    time: string;
    read: boolean;
    category: string;
}


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  useEffect(() => {
    // This effect runs on the client after hydration
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    // Combine initial notifications with any from local storage, avoiding duplicates
    setNotifications(prev => {
      const existingIds = new Set(prev.map(n => n.id));
      const newNotifications = storedNotifications.filter((n: Notification) => !existingIds.has(n.id));
      return [...newNotifications, ...prev];
    });

  }, []);

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>, title: string) => {
    e.preventDefault();
    const fileContent = `This is a dummy file for the notification: ${title}.\n\nIn a real application, this would be the actual assignment, grade report, or resource file.`;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Notifications</h1>
        <p className="text-muted-foreground">
          Stay up-to-date with assignments, exams, and grades. Click to download.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>You have {notifications.filter(n => !n.read).length} unread notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon = typeof notification.icon === 'string' ? iconMap[notification.icon as keyof typeof iconMap] : notification.icon;
              return (
              <a
                key={notification.id}
                href="#"
                onClick={(e) => handleDownload(e, notification.title)}
                className={cn(
                  "flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-secondary/50 cursor-pointer",
                  !notification.read && "font-semibold"
                  )}
              >
                {!notification.read && (
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                )}
                <Icon className="h-5 w-5 shrink-0 text-muted-foreground mt-1" style={{marginLeft: notification.read ? '16px' : '0'}} />
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
              </a>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    