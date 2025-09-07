
"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Calendar,
  Library,
  Bot,
  TrendingUp,
  Trophy,
  User,
  Bell,
  Settings,
  Briefcase,
  Upload,
  Users,
  MessageSquare,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMemo } from 'react';

const studentNav = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/timetable', icon: Calendar, label: 'Timetable' },
  { href: '/dashboard/library', icon: Library, label: 'Resource Library' },
  { href: '/dashboard/chatbot', icon: Bot, label: 'AI Chatbot' },
  { href: '/dashboard/performance', icon: TrendingUp, label: 'Performance' },
  { href: '/dashboard/rewards', icon: Trophy, label: 'Rewards' },
  { href: '/dashboard/mentor', icon: User, label: 'Virtual Mentor' },
  { href: '/dashboard/career', icon: Briefcase, label: 'Career' },
  { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
];

const teacherNav = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/timetable', icon: Calendar, label: 'Class Schedule' },
    { href: '/dashboard/library', icon: Upload, label: 'Manage Resources' },
    { href: '/dashboard/performance', icon: Users, label: 'Student Performance' },
    { href: '/dashboard/notifications', icon: MessageSquare, label: 'Announcements' },
];

const parentNav = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/performance', icon: TrendingUp, label: "Child's Performance" },
    { href: '/dashboard/timetable', icon: Calendar, label: "Child's Timetable" },
    { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
];

const getNavItems = (role: string | null) => {
    switch (role) {
        case 'teacher':
            return teacherNav;
        case 'parent':
            return parentNav;
        case 'student':
        default:
            return studentNav;
    }
}

export function DashboardNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const navItems = useMemo(() => getNavItems(role), [role]);
  
  const getHref = (href: string) => {
    return `${href}?role=${role || 'student'}`;
  }

  return (
    <>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <Link href={getHref(item.href)}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <div className="mt-auto flex flex-col gap-2 p-2">
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                <Link href="#">
                    <Settings />
                    <span>Settings</span>
                </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/login">
                        <div className="flex w-full items-center gap-2">
                             <Avatar className="h-7 w-7">
                                <AvatarImage src="https://picsum.photos/100" alt="Alex" data-ai-hint="person" />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col text-left">
                                <span className='text-sm font-semibold'>Alex Doe</span>
                                <span className='text-xs text-muted-foreground'>Logout</span>
                            </div>
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </>
  );
}
