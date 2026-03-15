'use client';

import React, { useState } from 'react';
import { 
  Home, 
  LayoutGrid, 
  ChevronDown, 
  Plus, 
  MessageSquare, 
  Mic, 
  ArrowUp,
  Settings,
  LogOut,
  Sparkles,
  Palette,
  CreditCard,
  LifeBuoy,
  X,
  Calendar,
  FileUp
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
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppDashboard() {
  const [hasPlan, setHasPlan] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#201C22] text-foreground overflow-hidden">
        <Sidebar className="border-r border-white/5 bg-[#201C22]">
          <SidebarHeader className="p-4 pt-6">
            <div className="flex items-center justify-between mb-6">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#B34DE6] to-[#5E8EDD] flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <SidebarTrigger />
            </div>
            
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-10 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors">
                  <div className="flex items-center gap-2 w-full">
                    <Avatar className="h-5 w-5 rounded-sm">
                      <AvatarImage src="https://picsum.photos/seed/valt-brand/20/20" />
                      <AvatarFallback className="bg-[#B34DE6] text-[10px]">V</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium flex-1 truncate">Valt's Studio</span>
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
                  <SidebarMenuButton isActive tooltip="Home" className="text-white hover:bg-white/5">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/50 px-3">Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5">
                      <LayoutGrid className="h-4 w-4" />
                      <span>All projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-white/5">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="h-12 w-full hover:bg-white/5 transition-colors rounded-lg px-2">
                      <div className="flex items-center gap-3 w-full overflow-hidden text-left">
                        <Avatar className="h-8 w-8 rounded-full ring-1 ring-white/10">
                          <AvatarImage src="https://picsum.photos/seed/valt-user/80/80" />
                          <AvatarFallback className="bg-[#B34DE6] text-white">V</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white truncate">Valt</span>
                          <span className="text-xs text-muted-foreground truncate">valt@example.com</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="end" className="w-64 bg-[#1c1c1c] border-white/10 text-white shadow-2xl p-2">
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-md py-2 focus:bg-white/10 focus:text-white">
                      <Sparkles className="mr-2 h-4 w-4 text-[#B34DE6]" />
                      <span>What's New</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-md py-2 focus:bg-white/10 focus:text-white">
                      <Palette className="mr-2 h-4 w-4 text-[#5E8EDD]" />
                      <span>Appearance</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10 my-1" />
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-md py-2 focus:bg-white/10 focus:text-white">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Subscription</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-md py-2 focus:bg-white/10 focus:text-white">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10 my-1" />
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-md py-2 focus:bg-white/10 focus:text-white">
                      <LifeBuoy className="mr-2 h-4 w-4" />
                      <span>Help / Issue Feedback</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10 my-1" />
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-md py-2 text-red-400 focus:text-red-400 focus:bg-white/10">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-white/10 text-white shrink-0">
                    <Plus className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="top" className="w-48 bg-[#1c1c1c] border-white/10 text-white shadow-2xl p-1 mb-2">
                  <DropdownMenuItem 
                    className="hover:bg-white/10 cursor-pointer rounded-md py-2 focus:bg-white/10 focus:text-white"
                    onClick={() => setHasPlan(true)}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Plan</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-md py-2 focus:bg-white/10 focus:text-white">
                    <FileUp className="mr-2 h-4 w-4" />
                    <span>Attachment</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {hasPlan && (
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10 shrink-0 group">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm font-medium text-white">Plan</span>
                  <button 
                    onClick={() => setHasPlan(false)}
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              
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
