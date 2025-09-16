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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
      <Sidebar collapsible="icon" className="w-56">{/* Narrower sidebar - 224px instead of default 256px */}
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
                    } transition-all h-12 ${collapsed ? 'px-0' : 'px-2'}`}
                  >
                    <NavLink to={item.url} className={`flex items-center w-full h-full ${collapsed ? 'justify-center' : 'gap-3 px-2'}`}>
                      <item.icon className="h-6 w-6 flex-shrink-0" />
                      <span className={`text-base font-semibold transition-all duration-300 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                        {item.title}
                      </span>
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
                  } transition-all h-12 ${collapsed ? 'px-0' : 'px-2'}`}
                >
                  <NavLink to="/feedback" className={`flex items-center w-full h-full ${collapsed ? 'justify-center' : 'gap-3 px-2'}`}>
                    <MessageSquare className="h-6 w-6 flex-shrink-0" />
                    <span className={`text-base font-semibold transition-all duration-300 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                      Feedback & Issues
                    </span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50">
        <div className={collapsed ? 'p-2' : 'p-4'}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-full h-10">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                          AD
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="end" className="w-48">
                    <div className="flex items-center gap-2 p-2 border-b">
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
                    <DropdownMenuItem asChild>
                      <NavLink to="/settings" className="flex items-center gap-2 w-full">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout} className="flex items-center gap-2 text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>User menu</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 w-full h-auto p-2 justify-start hover:bg-muted/50">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium truncate">Admin User</p>
                    <p className="text-xs text-muted-foreground truncate">admin@leadflow.pro</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <NavLink to="/settings" className="flex items-center gap-2 w-full">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className="flex items-center gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
    </TooltipProvider>
  );
}