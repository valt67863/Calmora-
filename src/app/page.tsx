'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Home, 
  History, 
  ChevronDown, 
  Plus, 
  ArrowUp,
  Settings,
  LogOut,
  Sparkles,
  Palette,
  CreditCard,
  LifeBuoy,
  X,
  Calendar,
  FileUp,
  PlusCircle,
  Building2,
  Check,
  ChevronRight,
  LayoutGrid
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
  SidebarFooter,
  SidebarRail
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
import { PlaceHolderImages } from '@/lib/placeholder-images';

const FALLBACK_IMAGE = "https://picsum.photos/seed/fallback/400/250";

export default function AppDashboard() {
  const [hasPlan, setHasPlan] = useState(false);

  const templates = useMemo(() => [
    {
      title: "Write a blog post",
      description: "Generate engaging and SEO-friendly content for your audience",
      image: PlaceHolderImages.find(img => img.id === 'template-blog')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "writing blog"
    },
    {
      title: "Code generation",
      description: "Efficiently build complex functions and fix logic bugs quickly",
      image: PlaceHolderImages.find(img => img.id === 'template-code')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "software coding"
    },
    {
      title: "Brainstorm ideas",
      description: "Explore creative and unique concepts for your next project",
      image: PlaceHolderImages.find(img => img.id === 'template-brainstorm')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "creative brainstorming"
    },
    {
      title: "Marketing Copy",
      description: "Draft persuasive copy that converts visitors into customers",
      image: PlaceHolderImages.find(img => img.id === 'template-blog')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "marketing copy"
    },
    {
      title: "Video Scripts",
      description: "Outline and write engaging scripts for your YouTube videos",
      image: PlaceHolderImages.find(img => img.id === 'template-brainstorm')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "video script"
    },
    {
      title: "Social Media",
      description: "Generate trendy and viral-ready posts for all your platforms",
      image: PlaceHolderImages.find(img => img.id === 'template-code')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "social media"
    },
  ], []);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#131314] text-foreground overflow-hidden font-body">
        <Sidebar collapsible="icon" className="border-r border-white/5 bg-[#1e1f20]">
          <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
            <div className="flex items-center justify-between mb-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#B34DE6] to-[#5E8EDD] flex items-center justify-center shadow-lg shrink-0">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <SidebarTrigger className="text-muted-foreground hover:text-white group-data-[collapsible=icon]:hidden" />
            </div>
            
            <SidebarMenu className="group-data-[collapsible=icon]:hidden">
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="h-10 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/5">
                      <div className="flex items-center gap-2 w-full overflow-hidden">
                        <Avatar className="h-5 w-5 rounded-sm shrink-0">
                          <AvatarImage src={PlaceHolderImages.find(img => img.id === 'valt-brand')?.imageUrl || null} />
                          <AvatarFallback className="bg-[#B34DE6] text-[10px]">V</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium flex-1 truncate">Valt's Studio</span>
                        <ChevronDown className="h-3 w-3 opacity-50 shrink-0" />
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" sideOffset={12} className="w-64 bg-[#28292a] border-white/10 text-white shadow-2xl p-2 rounded-xl animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-2 py-1.5 mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Workspaces</p>
                    </div>
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5 flex items-center justify-between bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-[#B34DE6] flex items-center justify-center text-[10px] font-bold">V</div>
                        <span className="text-sm font-medium">Valt's Studio</span>
                      </div>
                      <Check className="h-3.5 w-3.5 text-[#B34DE6]" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5 flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold text-muted-foreground">L</div>
                      <span className="text-sm font-medium text-muted-foreground">Lovable Labs</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5 my-2" />
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5 text-[#B34DE6]">
                      <PlusCircle className="mr-3 h-4 w-4" />
                      <span className="text-sm font-medium">Create workspace</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5">
                      <Building2 className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Workspace settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent className="px-2 group-data-[collapsible=icon]:px-0">
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Home" className="text-white hover:bg-white/5">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Projects" className="text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
                    <LayoutGrid className="h-4 w-4" />
                    <span>Projects</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 px-3 mb-2 group-data-[collapsible=icon]:hidden">History</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Activity" className="hover:bg-white/5 text-muted-foreground hover:text-white transition-colors">
                      <History className="h-4 w-4" />
                      <span>Activity</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-white/5 group-data-[collapsible=icon]:p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton tooltip="Account" className="h-14 w-full hover:bg-white/5 transition-colors rounded-xl px-2 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
                      <div className="flex items-center gap-3 w-full overflow-hidden text-left group-data-[collapsible=icon]:justify-center">
                        <Avatar className="h-9 w-9 rounded-full ring-2 ring-white/5 group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7 shrink-0">
                          <AvatarImage src={PlaceHolderImages.find(img => img.id === 'valt-user')?.imageUrl || null} />
                          <AvatarFallback className="bg-[#B34DE6] text-white font-bold">V</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                          <span className="text-sm font-semibold text-white truncate">Valt</span>
                          <span className="text-xs text-muted-foreground/60 truncate">valt@example.com</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground/40 shrink-0 group-data-[collapsible=icon]:hidden" />
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="end" className="w-64 bg-[#28292a] border-white/10 text-white shadow-2xl p-1.5 rounded-xl animate-in fade-in zoom-in-95 duration-100">
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5 focus:bg-white/10 focus:text-white">
                      <Sparkles className="mr-3 h-4 w-4 text-[#B34DE6]" />
                      <span className="text-sm font-medium">What's New</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5 focus:bg-white/10 focus:text-white">
                      <Palette className="mr-3 h-4 w-4 text-[#5E8EDD]" />
                      <span className="text-sm font-medium">Appearance</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5 my-1.5 mx-1" />
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5 focus:bg-white/10 focus:text-white">
                      <CreditCard className="mr-3 h-4 w-4" />
                      <span className="text-sm font-medium">Subscription</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5 focus:bg-white/10 focus:text-white">
                      <Link href="/settings">
                        <Settings className="mr-3 h-4 w-4" />
                        <span className="text-sm font-medium">Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5 my-1.5 mx-1" />
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5 focus:bg-white/10 focus:text-white">
                      <LifeBuoy className="mr-3 h-4 w-4" />
                      <span className="text-sm font-medium">Help / Issue Feedback</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5 my-1.5 mx-1" />
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5 text-red-400 focus:text-red-400 focus:bg-white/10">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="text-sm font-medium">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <main className="relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide no-scrollbar">
          {/* Hero Section centered in viewport */}
          <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-6">
            <div className="absolute inset-0 z-0">
              <div className="absolute bottom-[-20%] left-[-10%] w-[120%] h-[80%] rounded-full lovable-gradient opacity-30" />
            </div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
              <h1 className="text-4xl font-semibold text-white mb-10 tracking-tight text-center">
                Let's build something, Valt
              </h1>

              <div className="w-full bg-[#1e1f20]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-2 shadow-2xl flex items-center gap-2 group focus-within:border-white/20 transition-all">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-white/10 text-white shrink-0">
                      <Plus className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="top" className="w-52 bg-[#28292a] border-white/10 text-white shadow-2xl p-1.5 mb-3 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-100">
                    <DropdownMenuItem 
                      className="hover:bg-white/10 cursor-pointer rounded-xl py-3 focus:bg-white/10 focus:text-white"
                      onClick={() => setHasPlan(true)}
                    >
                      <Calendar className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Plan</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-xl py-3 focus:bg-white/10 focus:text-white">
                      <FileUp className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Attachment</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {hasPlan && (
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10 shrink-0 animate-in zoom-in-90">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-semibold text-white">Plan</span>
                    <button 
                      onClick={() => setHasPlan(false)}
                      className="p-0.5 rounded-full hover:bg-white/20 text-muted-foreground hover:text-white transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                <Input 
                  placeholder="Ask Lovable to create" 
                  className="flex-1 bg-transparent border-none text-white text-base placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:ring-offset-0 h-10 p-1"
                />

                <Button 
                  size="icon" 
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all shrink-0"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Template Section below the fold */}
          <div className="w-full max-w-4xl mx-auto px-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between px-2 mb-4">
              <h2 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Templates</h2>
              <Button variant="link" className="text-[10px] font-bold text-[#B34DE6] p-0 h-auto hover:no-underline flex items-center gap-1 group opacity-80 hover:opacity-100">
                View all templates
                <ChevronRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {templates.map((template, idx) => (
                <button 
                  key={idx}
                  className="flex flex-col bg-[#1e1f20]/40 hover:bg-[#1e1f20] border border-white/5 hover:border-white/10 rounded-[1.5rem] overflow-hidden text-left transition-all group shadow-md"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image 
                      src={template.image || FALLBACK_IMAGE} 
                      alt={template.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={template.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f20]/80 to-transparent opacity-60" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xs font-bold text-white mb-1.5 uppercase tracking-wider opacity-90">{template.title}</h3>
                    <p className="text-[10px] text-muted-foreground/60 leading-relaxed line-clamp-2">{template.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}