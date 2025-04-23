
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Users,
  Video,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRole?: 'admin' | 'hod' | 'teacher' | 'student';
  className?: string;
}

export function Sidebar({
  open,
  onOpenChange,
  userRole,
  className,
}: SidebarProps) {
  // Define navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      {
        title: 'Dashboard',
        href: `/${userRole || ''}`,
        icon: LayoutDashboard,
      },
      {
        title: 'Notice Board',
        href: `/${userRole || ''}/notices`,
        icon: FileText,
      },
    ];

    if (userRole === 'admin') {
      return [
        ...baseItems,
        {
          title: 'Department Heads',
          href: '/admin/hods',
          icon: Users,
        },
        {
          title: 'Statistics',
          href: '/admin/statistics',
          icon: ClipboardList,
        },
      ];
    }

    if (userRole === 'hod') {
      return [
        ...baseItems,
        {
          title: 'Teachers',
          href: '/hod/teachers',
          icon: Users,
        },
        {
          title: 'Students',
          href: '/hod/students',
          icon: Users,
        },
        {
          title: 'Routine',
          href: '/hod/routine',
          icon: Calendar,
        },
        {
          title: 'Leave Approval',
          href: '/hod/leave',
          icon: FileText,
        },
      ];
    }

    if (userRole === 'teacher') {
      return [
        ...baseItems,
        {
          title: 'Attendance',
          href: '/teacher/attendance',
          icon: ClipboardList,
        },
        {
          title: 'Study Materials',
          href: '/teacher/materials',
          icon: BookOpen,
        },
        {
          title: 'Exams',
          href: '/teacher/exams',
          icon: FileText,
        },
        {
          title: 'Feedback',
          href: '/teacher/feedback',
          icon: MessageSquare,
        },
        {
          title: 'Leave',
          href: '/teacher/leave',
          icon: Calendar,
        },
      ];
    }

    if (userRole === 'student') {
      return [
        ...baseItems,
        {
          title: 'Attendance',
          href: '/student/attendance',
          icon: ClipboardList,
        },
        {
          title: 'Study Materials',
          href: '/student/materials',
          icon: BookOpen,
        },
        {
          title: 'Routine',
          href: '/student/routine',
          icon: Calendar,
        },
        {
          title: 'Exams',
          href: '/student/exams',
          icon: FileText,
        },
        {
          title: 'Leave',
          href: '/student/leave',
          icon: FileText,
        },
        {
          title: 'Feedback',
          href: '/student/feedback',
          icon: MessageSquare,
        },
      ];
    }

    return baseItems;
  };

  // Get the appropriate color for the user role
  const getRoleColor = () => {
    switch (userRole) {
      case 'admin':
        return 'bg-admin';
      case 'hod':
        return 'bg-hod';
      case 'teacher':
        return 'bg-teacher';
      case 'student':
        return 'bg-student';
      default:
        return 'bg-primary';
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}
      <div
        className={cn(
          'sidebar bg-sidebar border-r w-[280px] p-6 transition-all duration-300 min-h-screen flex flex-col',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', getRoleColor())}>
              <Home className="h-4 w-4 text-white" />
            </div>
            <h2 className="font-bold text-xl">Campus DMS</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => onOpenChange(false)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <nav className="mt-8 flex flex-col gap-6 flex-1">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground pl-4 mb-1 uppercase">
              Main Navigation
            </p>
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="justify-start gap-3 h-10 px-4 py-2"
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </nav>

        <div className="mt-auto border-t pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 px-4 py-2 text-destructive hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </Button>
        </div>
      </div>
    </>
  );
}
