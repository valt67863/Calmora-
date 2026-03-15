'use client';

import React from 'react';
import { 
  Home, 
  Search, 
  BookOpen, 
  LayoutGrid, 
  ChevronDown, 
  Plus, 
  MessageSquare, 
  Mic, 
  ArrowUp
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AppDashboard() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-black overflow-hidden">
        <Sidebar className="border-r border-white/5">
          <SidebarHeader className="p-4 pt-6">
            <div className="flex items-center justify-between mb-6">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <SidebarTrigger />
            </div>
            
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-10 bg-white/5 hover:bg-white/10 text-white rounded-lg">
                  <div className="flex items-center gap-2 w-full">
                    <Avatar className="h-5 w-5 rounded-sm">
                      <AvatarImage src="https://picsum.photos/seed/valt/20/20" />
                      <AvatarFallback className="bg-pink-600 text-[10px]">V</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium flex-1 truncate">Valt's Lovable</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Home" className="text-white">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Search">
                    <Search className="h-4 w-4" />
                    <span className="flex-1">Search</span>
                    <Badge variant="outline" className="text-[10px] h-5 px-1 bg-white/5 border-white/10 text-muted-foreground ml-auto">Ctrl K</Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Resources">
                    <BookOpen className="h-4 w-4" />
                    <span>Resources</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/50 px-3">Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <LayoutGrid className="h-4 w-4" />
                      <span>All projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/50 px-3">Recents</SidebarGroupLabel>
              <div className="px-3 py-2 text-sm text-muted-foreground italic">
                No recent projects
              </div>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="relative flex-1 flex flex-col items-center justify-center overflow-hidden">
          {/* Background Gradient Effect */}
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-[-20%] left-[-10%] w-[120%] h-[80%] rounded-full lovable-gradient" />
          </div>

          {/* Central Content */}
          <div className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center">
            <h1 className="text-4xl font-semibold text-white mb-12 tracking-tight">
              Let's build something, Valt
            </h1>

            {/* Prompt Bar */}
            <div className="w-full bg-[#1c1c1c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-3 shadow-2xl flex items-center gap-3">
              <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-white/10 text-white">
                <Plus className="h-5 w-5" />
              </Button>
              
              <Input 
                placeholder="Ask Lovable to create" 
                className="flex-1 bg-transparent border-none text-white text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 h-10 p-0"
              />

              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white">
                  <MessageSquare className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button size="icon" className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white">
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
