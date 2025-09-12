import React, { useState } from 'react';
import { ChevronDown, Users, Search, BarChart3, Database, Brain, Settings, LogOut, Zap, Building2 } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const projects = [
  { id: 1, name: 'PR NL agency drivers', color: 'bg-primary' },
  { id: 2, name: 'Tech Startups EU', color: 'bg-secondary' },
  { id: 3, name: 'Healthcare US', color: 'bg-success' },
];

const menuItems = [
  { title: 'Prospects', url: '/', icon: Users, active: true },
  { title: 'Target Finder', url: '/target-finder', icon: Search, active: false },
  { title: 'Analytics', url: '/analytics', icon: BarChart3, active: false },
  { title: 'Collected Jobs', url: '/jobs', icon: Database, active: false },
  { title: 'AI Insights', url: '/insights', icon: Brain, active: false },
];

interface AppSidebarProps {
  onLogout: () => void;
}

export function AppSidebar({ onLogout }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarHeader className="border-b border-border/50">
        <div className="flex items-center gap-3 p-4">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow flex-shrink-0">
            <Zap className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                LeadFlow Pro
              </h2>
            </div>
          )}
        </div>
        
        {!collapsed && (
          <div className="px-4 pb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-10 border-border/50 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-3 h-3 rounded-full ${selectedProject.color} flex-shrink-0`} />
                    <span className="truncate text-sm">{selectedProject.name}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {projects.map((project) => (
                  <DropdownMenuItem
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-3 h-3 rounded-full ${project.color}`} />
                    <span>{project.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'px-2' : ''}>
            {!collapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`${
                      isActive(item.url)
                        ? 'bg-primary/10 text-primary border-r-2 border-primary font-medium'
                        : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                    } ${!item.active ? 'opacity-60 cursor-not-allowed' : ''} transition-all`}
                    disabled={!item.active}
                  >
                    <NavLink to={item.active ? item.url : '#'} className="flex items-center gap-3">
                      <item.icon className={`h-4 w-4 ${collapsed ? 'mx-auto' : ''}`} />
                      {!collapsed && (
                        <div className="flex items-center justify-between w-full">
                          <span>{item.title}</span>
                          {!item.active && (
                            <span className="text-xs bg-muted px-1.5 py-0.5 rounded">Soon</span>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50">
        <div className="p-4">
          {!collapsed && (
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@leadflow.pro</p>
              </div>
            </div>
          )}
          
          <div className={`flex ${collapsed ? 'flex-col gap-2' : 'gap-2'}`}>
            <Button
              variant="ghost"
              size={collapsed ? 'icon' : 'sm'}
              className="hover:bg-muted/50 transition-colors"
              disabled
            >
              <Settings className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Settings</span>}
            </Button>
            
            <Button
              variant="ghost"
              size={collapsed ? 'icon' : 'sm'}
              onClick={onLogout}
              className="hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}