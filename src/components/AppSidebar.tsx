import React from 'react';
import { Users, Database, Building2, Settings, LogOut, Menu } from 'lucide-react';
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

const menuItems = [
  { title: 'Prospects', url: '/', icon: Users, active: true },
  { title: 'Collected Jobs', url: '/jobs', icon: Database, active: true },
  { title: 'Projects', url: '/projects', icon: Building2, active: true },
];

interface AppSidebarProps {
  onLogout: () => void;
}

export function AppSidebar({ onLogout }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarHeader className="border-b border-border/50 p-4">
        {/* Sidebar Toggle */}
        <div className="flex items-center justify-between">
          <SidebarTrigger className="hover:bg-muted/50">
            <Menu className="h-4 w-4" />
          </SidebarTrigger>
        </div>
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
                    } transition-all`}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3">
                      <item.icon className={`h-4 w-4 ${collapsed ? 'mx-auto' : ''}`} />
                      {!collapsed && <span>{item.title}</span>}
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