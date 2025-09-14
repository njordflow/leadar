import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { ChevronDown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AppLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const projects = [
  { id: 1, name: 'PR NL agency drivers', color: 'bg-primary' },
  { id: 2, name: 'Tech Startups EU', color: 'bg-secondary' },
  { id: 3, name: 'Healthcare US', color: 'bg-success' },
];

const AppLayout = ({ children, onLogout }: AppLayoutProps) => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar onLogout={onLogout} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center gap-4 h-full px-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h2 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                  LeadFlow Pro
                </h2>
              </div>

              {/* Project Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="min-w-[200px] justify-between h-9 border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-3 h-3 rounded-full ${selectedProject.color} flex-shrink-0`} />
                      <span className="truncate text-sm">{selectedProject.name}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur-sm border border-border/50 shadow-lg">
                  {projects.map((project) => (
                    <DropdownMenuItem
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-2 hover:bg-muted/50"
                    >
                      <div className={`w-3 h-3 rounded-full ${project.color}`} />
                      <span>{project.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
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