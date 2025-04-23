
import React, { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { ModeToggle } from './ModeToggle';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: ReactNode;
  userRole?: 'admin' | 'hod' | 'teacher' | 'student';
}

export function Layout({ children, userRole }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex relative">
      <Sidebar 
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen} 
        userRole={userRole} 
        className={isMobile ? "fixed z-30" : ""}
      />
      
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 px-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <h1 className="text-lg font-medium">
              {userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard` : 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </header>
        
        <div className="flex-1 p-4 md:p-6 overflow-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
