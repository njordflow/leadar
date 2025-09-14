import React from 'react';
import { Users, Database, Building2, Settings, LogOut, PanelLeftClose, Zap } from 'lucide-react';
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
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div 
            className={`flex items-center gap-2 cursor-pointer ${collapsed ? 'justify-center w-full' : ''}`}
            onClick={() => {
              if (collapsed) {
                // Trigger sidebar expansion when clicked in collapsed state
                const trigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement;
                trigger?.click();
              }
            }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-lg font-semibold">LeadFlow</span>
            )}
          </div>
          
          {/* Collapse Button */}
          {!collapsed && (
            <SidebarTrigger className="h-8 w-8 hover:bg-muted/50 p-0">
              <PanelLeftClose className="h-4 w-4" />
            </SidebarTrigger>
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
                      <item.icon className="h-4 w-4 flex-shrink-0" />
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
              disabled
            >
              <Settings className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Settings</span>}
            </Button>
            
            <Button
              variant="ghost"
              size={collapsed ? 'icon' : 'sm'}
              onClick={onLogout}
              className={`hover:bg-destructive/10 hover:text-destructive transition-colors ${collapsed ? 'w-full' : ''}`}
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