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
  LayoutGrid,
  Search,
  Filter
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const FALLBACK_IMAGE = "https://picsum.photos/seed/fallback/400/250";

export default function AppDashboard() {
  const [hasPlan, setHasPlan] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Content", "Creative", "Code", "Business"];

  const templates = useMemo(() => [
    {
      title: "Write a blog post",
      description: "Generate engaging and SEO-friendly content for your audience",
      image: PlaceHolderImages.find(img => img.id === 'template-blog')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "writing blog",
      category: "Content"
    },
    {
      title: "Code generation",
      description: "Efficiently build complex functions and fix logic bugs quickly",
      image: PlaceHolderImages.find(img => img.id === 'template-code')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "software coding",
      category: "Code"
    },
    {
      title: "Brainstorm ideas",
      description: "Explore creative and unique concepts for your next project",
      image: PlaceHolderImages.find(img => img.id === 'template-brainstorm')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "creative brainstorming",
      category: "Creative"
    },
    {
      title: "Marketing Copy",
      description: "Draft persuasive copy that converts visitors into customers",
      image: PlaceHolderImages.find(img => img.id === 'template-blog')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "marketing copy",
      category: "Business"
    },
    {
      title: "Video Scripts",
      description: "Outline and write engaging scripts for your YouTube videos",
      image: PlaceHolderImages.find(img => img.id === 'template-brainstorm')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "video script",
      category: "Creative"
    },
    {
      title: "Social Media",
      description: "Generate trendy and viral-ready posts for all your platforms",
      image: PlaceHolderImages.find(img => img.id === 'template-code')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "social media",
      category: "Content"
    },
  ], []);

  const allTemplates = useMemo(() => [
    ...templates,
    {
      title: "Email Drafts",
      description: "Professional and concise emails for any business situation",
      image: PlaceHolderImages.find(img => img.id === 'template-blog')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "email writing",
      category: "Business"
    },
    {
      title: "Presentation Outline",
      description: "Structure your ideas into compelling slides and narratives",
      image: PlaceHolderImages.find(img => img.id === 'template-brainstorm')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "presentation slides",
      category: "Creative"
    },
    {
      title: "Product Descriptions",
      description: "Compelling copy that highlights features and benefits",
      image: PlaceHolderImages.find(img => img.id === 'template-code')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "e-commerce product",
      category: "Business"
    },
    {
      title: "FAQ Generator",
      description: "Quickly answer common customer queries with clarity",
      image: PlaceHolderImages.find(img => img.id === 'template-blog')?.imageUrl || FALLBACK_IMAGE,
      imageHint: "customer support",
      category: "Content"
    }
  ], [templates]);

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           t.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allTemplates, searchQuery, activeCategory]);

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
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-[10px] font-bold text-[#B34DE6] p-0 h-auto hover:no-underline flex items-center gap-1 group opacity-80 hover:opacity-100">
                    View all templates
                    <ChevronRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] md:max-w-[85vw] w-full h-[90vh] bg-[#1e1f20]/90 backdrop-blur-3xl border-white/10 p-0 overflow-hidden rounded-[2.5rem] flex flex-col shadow-2xl transition-all duration-300">
                  <DialogHeader className="p-8 pb-6 border-b border-white/5 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <DialogTitle className="text-3xl font-semibold text-white tracking-tight">Explore Templates</DialogTitle>
                        <p className="text-sm text-muted-foreground/60 mt-1">Accelerate your workflow with pre-built AI configurations.</p>
                      </div>
                      
                      <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#B34DE6] transition-colors" />
                        <Input 
                          placeholder="Search templates..." 
                          className="bg-white/5 border-white/10 focus-visible:ring-[#B34DE6]/30 h-11 pl-10 rounded-xl text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <ScrollArea className="w-full">
                      <div className="flex items-center gap-2 pb-2">
                        {categories.map((cat) => (
                          <Button 
                            key={cat}
                            variant={activeCategory === cat ? "default" : "outline"}
                            size="sm"
                            className={cn(
                              "rounded-full px-5 h-8 text-xs font-medium transition-all",
                              activeCategory === cat 
                                ? "bg-[#B34DE6] hover:bg-[#B34DE6]/90 border-transparent shadow-[0_0_15px_rgba(179,77,230,0.3)]" 
                                : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white"
                            )}
                            onClick={() => setActiveCategory(cat)}
                          >
                            {cat}
                          </Button>
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" className="h-0" />
                    </ScrollArea>
                  </DialogHeader>

                  <ScrollArea className="flex-1 px-8 pb-8 pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredTemplates.length > 0 ? (
                        filteredTemplates.map((template, idx) => (
                          <button 
                            key={idx}
                            className="flex flex-col bg-[#131314]/40 hover:bg-[#131314]/80 border border-white/5 hover:border-white/10 rounded-[1.8rem] overflow-hidden text-left transition-all group shadow-md hover:shadow-xl hover:-translate-y-1 duration-300"
                          >
                            <div className="relative w-full aspect-[16/10] overflow-hidden">
                              <Image 
                                src={template.image || FALLBACK_IMAGE} 
                                alt={template.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                data-ai-hint={template.imageHint}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#131314]/90 via-transparent to-transparent opacity-60" />
                              <div className="absolute top-3 left-3">
                                <span className="bg-black/40 backdrop-blur-md text-[10px] font-bold text-white/70 px-2.5 py-1 rounded-full border border-white/10 tracking-wide uppercase">
                                  {template.category}
                                </span>
                              </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                              <h3 className="text-[13px] font-bold text-white mb-2 uppercase tracking-wider group-hover:text-[#B34DE6] transition-colors">{template.title}</h3>
                              <p className="text-[11px] text-muted-foreground/60 leading-relaxed line-clamp-2 mb-4 flex-1">{template.description}</p>
                              <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                                <span className="text-[10px] font-medium text-muted-foreground/40">Free</span>
                                <Plus className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-white transition-colors" />
                              </div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <Search className="h-6 w-6 text-muted-foreground/40" />
                          </div>
                          <h3 className="text-white font-medium">No templates found</h3>
                          <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your search or category filters.</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
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
