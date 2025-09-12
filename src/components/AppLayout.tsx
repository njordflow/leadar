import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const AppLayout = ({ children, onLogout }: AppLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar onLogout={onLogout} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center gap-4 h-full px-6">
              <SidebarTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted/50">
                  <Menu className="h-4 w-4" />
                </Button>
              </SidebarTrigger>
              
              <div className="flex-1" />
              
              {/* Header actions can be added here */}
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;