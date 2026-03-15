"use client"

import { useMemo, useState } from "react"
import { Bell, CreditCard, Lock, Moon, Palette, ShieldCheck, Sun, User2, ChevronDown, Home, LayoutGrid, Settings, LifeBuoy, LogOut, Sparkles, CreditCard as BillingIcon } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SettingsPage() {
  const [fullName, setFullName] = useState("Valt Parker")
  const [email, setEmail] = useState("valt@lovable.ai")
  const [workspaceName, setWorkspaceName] = useState("Lovable Labs")
  const [timeZone, setTimeZone] = useState("UTC-8")
  const [bio, setBio] = useState("Product builder focused on AI-assisted creative workflows.")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSaving(false)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#131314] text-foreground overflow-hidden">
        {/* Sidebar Replicated from Main Dashboard */}
        <Sidebar className="border-r border-white/5 bg-[#1e1f20]">
          <SidebarHeader className="p-4 pt-6 bg-[#1e1f20]">
            <div className="flex items-center justify-between mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#B34DE6] to-[#5E8EDD] flex items-center justify-center shadow-lg">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <SidebarTrigger className="text-muted-foreground hover:text-white" />
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-10 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/5">
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

          <SidebarContent className="px-2 bg-[#1e1f20]">
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/" className="w-full">
                    <SidebarMenuButton tooltip="Home" className="text-muted-foreground hover:text-white hover:bg-white/5 w-full">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 px-3 mb-2">Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 text-muted-foreground hover:text-white transition-colors">
                      <LayoutGrid className="h-4 w-4" />
                      <span>All projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-white/5 bg-[#1e1f20]">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="h-14 w-full hover:bg-white/5 transition-colors rounded-xl px-2">
                      <div className="flex items-center gap-3 w-full overflow-hidden text-left">
                        <Avatar className="h-9 w-9 rounded-full ring-2 ring-white/5">
                          <AvatarImage src="https://picsum.photos/seed/valt-user/80/80" />
                          <AvatarFallback className="bg-[#B34DE6] text-white font-bold">V</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white truncate">Valt</span>
                          <span className="text-xs text-muted-foreground/60 truncate">valt@example.com</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="end" className="w-64 bg-[#28292a] border-white/10 text-white shadow-2xl p-1.5 rounded-xl">
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5">
                      <Sparkles className="mr-3 h-4 w-4 text-[#B34DE6]" />
                      <span className="text-sm font-medium">What's New</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5">
                      <Palette className="mr-3 h-4 w-4 text-[#5E8EDD]" />
                      <span className="text-sm font-medium">Appearance</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5 my-1.5 mx-1" />
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5">
                      <BillingIcon className="mr-3 h-4 w-4" />
                      <span className="text-sm font-medium">Subscription</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5 bg-white/5">
                      <Link href="/settings">
                        <Settings className="mr-3 h-4 w-4" />
                        <span className="text-sm font-medium">Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5 my-1.5 mx-1" />
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5">
                      <LifeBuoy className="mr-3 h-4 w-4" />
                      <span className="text-sm font-medium">Help / Issue Feedback</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5 my-1.5 mx-1" />
                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer rounded-lg py-2.5 text-red-400">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="text-sm font-medium">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Settings Content */}
        <main className="flex-1 overflow-y-auto bg-[#131314]">
          <div className="mx-auto max-w-5xl px-8 py-12 space-y-10">
            {/* Header Section */}
            <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground/60">Account center</p>
                <h1 className="text-4xl font-semibold tracking-tight text-white">Settings</h1>
                <p className="text-muted-foreground/80 mt-2 text-lg">Manage preferences, security, billing, and workspace experience.</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-[#1e1f20] text-muted-foreground border-none rounded-full px-4 py-1.5 text-xs font-semibold">
                  100% setup complete
                </Badge>
                <Button 
                  onClick={handleSave} 
                  disabled={saving} 
                  className="bg-[#9c78d6] hover:bg-[#8b67c5] text-white rounded-xl px-6 h-11 font-semibold transition-all shadow-lg"
                >
                  {saving ? "Saving changes..." : "Save all changes"}
                </Button>
              </div>
            </header>

            {/* Tabs Navigation */}
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="bg-[#1e1f20] p-1.5 h-auto rounded-[20px] w-full grid grid-cols-5 border border-white/5">
                <TabsTrigger 
                  value="profile" 
                  className="rounded-2xl py-2.5 data-[state=active]:bg-[#2d2e30] data-[state=active]:text-white text-muted-foreground/60 font-semibold text-sm transition-all"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="rounded-2xl py-2.5 data-[state=active]:bg-[#2d2e30] data-[state=active]:text-white text-muted-foreground/60 font-semibold text-sm transition-all">Notifications</TabsTrigger>
                <TabsTrigger value="appearance" className="rounded-2xl py-2.5 data-[state=active]:bg-[#2d2e30] data-[state=active]:text-white text-muted-foreground/60 font-semibold text-sm transition-all">Appearance</TabsTrigger>
                <TabsTrigger value="security" className="rounded-2xl py-2.5 data-[state=active]:bg-[#2d2e30] data-[state=active]:text-white text-muted-foreground/60 font-semibold text-sm transition-all">Security</TabsTrigger>
                <TabsTrigger value="billing" className="rounded-2xl py-2.5 data-[state=active]:bg-[#2d2e30] data-[state=active]:text-white text-muted-foreground/60 font-semibold text-sm transition-all">Billing</TabsTrigger>
              </TabsList>

              {/* Profile Tab Content */}
              <TabsContent value="profile" className="mt-8">
                <Card className="bg-[#1e1f20] border-none rounded-[28px] p-2 overflow-hidden shadow-2xl">
                  <CardHeader className="pb-4 pt-8 px-8">
                    <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-white">
                      <User2 className="w-6 h-6 text-muted-foreground" /> 
                      Profile details
                    </CardTitle>
                    <CardDescription className="text-muted-foreground/60 text-base">
                      Keep your public profile and workspace identity up to date.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 px-8 pb-10">
                    {/* User Profile Info */}
                    <div className="flex items-center gap-5 mt-2">
                      <Avatar className="h-16 w-16 rounded-full ring-4 ring-white/5">
                        <AvatarImage src="https://picsum.photos/seed/valt-profile-avatar/120" alt="Valt" />
                        <AvatarFallback className="bg-[#B34DE6] text-white text-xl font-bold">VP</AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5">
                        <p className="text-xl font-semibold text-white">Valt Parker</p>
                        <p className="text-sm font-medium text-muted-foreground/50">Admin • Verified founder</p>
                      </div>
                    </div>

                    {/* Form Grid */}
                    <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                      <div className="space-y-2.5">
                        <Label htmlFor="full-name" className="text-sm font-bold text-muted-foreground/70 ml-1">Full name</Label>
                        <Input 
                          id="full-name" 
                          value={fullName} 
                          onChange={(e) => setFullName(e.target.value)} 
                          className="bg-[#131314] border-white/5 text-white h-12 rounded-xl px-4 focus-visible:ring-1 focus-visible:ring-white/20"
                        />
                      </div>
                      <div className="space-y-2.5">
                        <Label htmlFor="email" className="text-sm font-bold text-muted-foreground/70 ml-1">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          className="bg-[#131314] border-white/5 text-white h-12 rounded-xl px-4 focus-visible:ring-1 focus-visible:ring-white/20"
                        />
                      </div>
                      <div className="space-y-2.5">
                        <Label htmlFor="workspace" className="text-sm font-bold text-muted-foreground/70 ml-1">Workspace name</Label>
                        <Input 
                          id="workspace" 
                          value={workspaceName} 
                          onChange={(e) => setWorkspaceName(e.target.value)} 
                          className="bg-[#131314] border-white/5 text-white h-12 rounded-xl px-4 focus-visible:ring-1 focus-visible:ring-white/20"
                        />
                      </div>
                      <div className="space-y-2.5">
                        <Label className="text-sm font-bold text-muted-foreground/70 ml-1">Time zone</Label>
                        <Select value={timeZone} onValueChange={setTimeZone}>
                          <SelectTrigger className="bg-[#131314] border-white/5 text-white h-12 rounded-xl px-4 focus:ring-1 focus:ring-white/20">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#28292a] border-white/10 text-white rounded-xl">
                            <SelectItem value="UTC-8">Pacific (UTC-8)</SelectItem>
                            <SelectItem value="UTC-5">Eastern (UTC-5)</SelectItem>
                            <SelectItem value="UTC+0">London (UTC+0)</SelectItem>
                            <SelectItem value="UTC+5:30">India (UTC+5:30)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <Label htmlFor="bio" className="text-sm font-bold text-muted-foreground/70 ml-1">Bio</Label>
                      <Textarea 
                        id="bio" 
                        rows={5} 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)} 
                        className="bg-[#131314] border-white/5 text-white rounded-xl px-4 py-3 focus-visible:ring-1 focus-visible:ring-white/20 resize-none text-base leading-relaxed"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
