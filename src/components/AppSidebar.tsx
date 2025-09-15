import React from 'react';
import { Users, Database, Building2, Settings, LogOut, PanelLeftClose, PanelRightClose, Zap, MessageSquare } from 'lucide-react';
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
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const menuItems = [
  { title: 'Projects', url: '/projects', icon: Building2, active: true },
  { title: 'Collected Jobs', url: '/jobs', icon: Database, active: true },
  { title: 'Prospects', url: '/', icon: Users, active: true },
];

interface AppSidebarProps {
  onLogout: () => void;
}

export function AppSidebar({ onLogout }: AppSidebarProps) {
  const { state, setOpen } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon">{/* Remove manual width classes - use built-in animations */}
        <SidebarHeader className="border-b border-border/50 p-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className="flex items-center justify-center w-full cursor-pointer hover:bg-muted/50 rounded-md p-2 transition-colors"
                    onClick={() => setOpen(true)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary flex-shrink-0">
                      <Zap className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Open sidebar</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary flex-shrink-0">
                    <Zap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-semibold">LeadFlow</span>
                </div>
                
                {/* Collapse Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarTrigger className="h-8 w-8 hover:bg-muted/50 p-0">
                      <PanelLeftClose className="h-5 w-5" />
                    </SidebarTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Close sidebar</p>
                  </TooltipContent>
                </Tooltip>
              </>
            )}
          </div>
        </SidebarHeader>

      <SidebarContent className={collapsed ? 'px-1' : 'px-2'}>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'px-2 text-center' : ''}>
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
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
                    } transition-all ${collapsed ? 'justify-center' : ''}`}
                  >
                    <NavLink to={item.url} className={`flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3'}`}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Spacer to push Feedback & Issues down */}
        <div className="flex-1" />
        
        {/* Feedback & Issues section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`${
                    isActive('/feedback')
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
                  } transition-all ${collapsed ? 'justify-center' : ''}`}
                >
                  <NavLink to="/feedback" className={`flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3'}`}>
                    <MessageSquare className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span className="text-sm font-medium">Feedback & Issues</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50">
        <div className={collapsed ? 'p-2' : 'p-4'}>
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
          
          <div className={`flex ${collapsed ? 'flex-col gap-1' : 'gap-2'}`}>
            <Button
              variant="ghost"
              size={collapsed ? 'icon' : 'sm'}
              className={`hover:bg-muted/50 transition-colors ${collapsed ? 'w-full' : ''}`}
              asChild
            >
              <NavLink to="/settings" className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2'}`}>
                <Settings className="h-5 w-5" />
                {!collapsed && <span className="text-sm font-medium">Settings</span>}
              </NavLink>
            </Button>
            
            <Button
              variant="ghost"
              size={collapsed ? 'icon' : 'sm'}
              onClick={onLogout}
              className={`hover:bg-destructive/10 hover:text-destructive transition-colors ${collapsed ? 'w-full' : ''}`}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && <span className="ml-2 text-sm font-medium">Logout</span>}
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
    </TooltipProvider>
  );
}