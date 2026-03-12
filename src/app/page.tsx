
'use client';
import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import {
  Loader2,
  LogOut,
  Folder,
  History,
  Activity,
  ChevronLeft,
  Send,
  Mic,
  ChevronDown,
  X,
  Plus,
  Settings,
  MessageSquare,
  Mail,
  Zap,
  User,
  Flame,
  ArrowLeft,
  MoreHorizontal,
  Edit3,
  Copy,
  Trash2,
  CheckCircle2,
  Circle,
  Pin,
  Menu
} from "lucide-react";
import { safeLocalStorage, generateId, normalizeStatus, triggerConfetti, generateBasicTasks, aiSystemInstruction, FOCUS_DEMO_STEPS } from "@/lib/calmora-utils";
import {
    CalmoraLogo,
    NewProjectModal,
    NewGoalModal,
    NavItem,
    ProjectsView,
    HistoryView,
    GoalsView,
    ProjectActivityView,
    CompletedView,
    FocusMode,
    ProjectActionSheet,
    EditNameModal,
    DeleteConfirmModal,
    SettingsView,
    EditProfileModal,
    ChangePasswordModal,
    BillingModal,
    SettingsSheet,
    ThreadActionSheet,
} from "@/components/calmora";
import Header from "@/components/Header";
import ModeToggle from "@/components/ModeToggle";
import PromptSuggestionList from "@/components/PromptSuggestionList";
import PromptSuggestions from "@/components/PromptSuggestions";
import BuilderPage from "@/components/BuilderPage";

const HomePage = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState({ email: "demo@calmora.app", name: "Jane Doe", plan: "Pro", memberSince: 'Jan 2024', workspace: 'Personal' });
  const headerUser = { name: user.name, email: user.email, isPro: user.plan === 'Pro', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' };

  const [appMode, setAppMode] = useState("chat");
  const [buildMode, setBuildMode] = useState("chat");
  const [focusStepIndex, setFocusStepIndex] = useState(0);
  const [chatStage, setChatStage] = useState("new-chat");
  
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  
  const [threads, setThreads] = useState<any[]>([]);
  const [historyStore, setHistoryStore] = useState<{[key: string]: any[]}>({});
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [thinking, setThinking] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
    
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
    
  const [activeProject, setActiveProject] = useState<any>(null);
  const [projectSessionsList, setProjectSessionsList] = useState<any[]>([]);
  const [projectTasks, setProjectTasks] = useState<any[]>([]);
  const [projectActivities, setProjectActivities] = useState<any[]>([]);

  const [projects, setProjects] = useState<any[]>([]);
  const [activeGoals, setActiveGoals] = useState<any[]>([]);

  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const [showSettingsSheet, setShowSettingsSheet] = useState(false);

  const [threadActionData, setThreadActionData] = useState<any>(null);
  const [renameThread, setRenameThread] = useState<any>(null);
  
  const chipSuggestions = useMemo(() => [
      "Build a SaaS landing page",
      "Create a startup waitlist",
      "Generate a portfolio website",
      "Review my website code"
  ], []);

  const followUpSuggestions = useMemo(() => [
    "Improve the design",
    "Add a pricing section",
    "Add testimonials",
    "Make it mobile responsive",
  ], []);

  const generationSteps = useMemo(() => [
    "Understanding request",
    "Designing layout",
    "Generating React code",
    "Building preview"
  ], []);

  const promptSuggestions = useMemo(() => [
      "Build a SaaS landing page for an AI email tool",
      "Create a startup waitlist landing page",
      "Generate a portfolio website for a developer",
      "Create a product launch page",
      "Remix a modern SaaS website"
  ], []);

  const filteredSuggestions = useMemo(() => {
    if (!input.trim() || chatStage !== 'new-chat') return [];
    const lowercasedInput = input.toLowerCase();
    return promptSuggestions.filter(s => s.toLowerCase().includes(lowercasedInput));
  }, [input, promptSuggestions, chatStage]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (thinking && progressStep < generationSteps.length - 1) {
      timer = setTimeout(() => {
        setProgressStep(prev => prev + 1);
      }, 1200); // Simulate 1.2s per step
    }
    return () => clearTimeout(timer);
  }, [thinking, progressStep, generationSteps.length]);

  useEffect(() => {
    const content = scrollContentRef.current;
    const wrapper = scrollWrapperRef.current;

    const handleScroll = () => {
      if (!content || !wrapper) return;
      const { scrollTop, scrollHeight, clientHeight } = content;
      const isAtTop = scrollTop < 10;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;

      wrapper.classList.toggle('show-top-glow', !isAtTop);
      wrapper.classList.toggle('show-bottom-glow', !isAtBottom);
    };

    if (content) {
        content.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
    }
    
    const resizeObserver = new ResizeObserver(handleScroll);
    if(content) resizeObserver.observe(content);

    return () => {
        if (content) content.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
    };
  }, [threads, !desktopSidebarOpen && !isMobile, appMode, buildMode]);


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (typeof window !== 'undefined') {
        const initialId = generateId();
        setActiveThreadId(initialId);

        const savedProjects = safeLocalStorage.getItem('projects');
        if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
        } else {
            setProjects([
                { id: 'p1', icon: 'file-text', title: 'Resume Update', progress: 30, lastActive: 'today', tasks: [] },
                { id: 'p2', icon: 'folder', title: 'Client Proposal', progress: 60, lastActive: '2 days ago', tasks: [] },
            ]);
        }

        const savedGoals = safeLocalStorage.getItem('goals');
        if(savedGoals) {
            setActiveGoals(JSON.parse(savedGoals));
        } else {
            setActiveGoals([
                { id: 'g1', icon: 'target', title: 'Launch portfolio website', startedDaysAgo: 3, currentStep: 5, totalSteps: 7, nextStep: 'Deploy to hosting', lastWorkedDaysAgo: 0, priority: 8, recommendedSince: Date.now() - (12 * 60 * 60 * 1000) },
            ]);
        }

        const savedThreads = safeLocalStorage.getItem('threads');
        if (savedThreads) {
            setThreads(JSON.parse(savedThreads));
        } else {
            const now = Date.now();
            setThreads([
                { id: generateId(), title: "SaaS landing page idea", createdAt: now, updatedAt: now, pinned: false },
                { id: generateId(), title: "Thoughts on resume builder", createdAt: now - 86400000, updatedAt: now - 86400000, pinned: false },
                { id: generateId(), title: "AI portfolio concepts", createdAt: now - 604800000, updatedAt: now - 604800000, pinned: false },
            ]);
        }

        const savedHistory = safeLocalStorage.getItem('historyStore');
        if (savedHistory) {
            setHistoryStore(JSON.parse(savedHistory));
        }
    }
    
    setDataLoaded(true);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
      if (dataLoaded) {
          safeLocalStorage.setItem('projects', JSON.stringify(projects));
      }
  }, [projects, dataLoaded]);

  useEffect(() => {
    if (dataLoaded) {
      safeLocalStorage.setItem('threads', JSON.stringify(threads));
      safeLocalStorage.setItem('historyStore', JSON.stringify(historyStore));
    }
  }, [threads, historyStore, dataLoaded]);

  useEffect(() => {
      if (dataLoaded) {
          safeLocalStorage.setItem('goals', JSON.stringify(activeGoals));
      }
  }, [activeGoals, dataLoaded]);

  const isCollapsed = !desktopSidebarOpen && !isMobile;
    
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  const [projectActionData, setProjectActionData] = useState<any>(null);
  const [renameProject, setRenameProject] = useState<any>(null);
  const [deleteProject, setDeleteProject] = useState<any>(null);
  
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);
   
  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Built personal website', completedDaysAgo: 2, duration: '2 weeks' },
    { id: 2, title: 'Finished "Atomic Habits"', completedDaysAgo: 7, duration: '3 weeks' },
  ]);
    
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const apiKey = "";

  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  useEffect(() => {
    const savedTheme = safeLocalStorage.getItem("calmora-theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      safeLocalStorage.setItem("calmora-theme", newTheme);
  };

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking, appMode, buildMode]);

  useEffect(() => {
    if (activeThreadId && messages.length > 0) {
      setHistoryStore(prev => ({ ...prev, [activeThreadId]: messages }));
    }
  }, [messages, activeThreadId]);

  const formatAIResponse = (text: string) => {
    let displayText = text;
    try {
        const parsed = JSON.parse(text);
        if(parsed.response) displayText = parsed.response;
        else if (parsed.intent) displayText = `(System: Action ${parsed.intent})`;
    } catch(e) {
        // Not JSON, normal text
    }

    const cleanText = displayText.replace(/[*#|]/g, '').trim();
    const blocks = cleanText.split(/\n\s*\n/);
    const output: React.ReactNode[] = [];
    blocks.forEach((rawBlock, index) => {
      let content = rawBlock.trim();
      let type = 'PARAGRAPH';
      if (content.match(/^TITLE:/i)) { type = 'TITLE'; content = content.replace(/^TITLE:\s*/i, ''); } 
      else if (content.match(/^SECTION:/i)) { type = 'SECTION'; content = content.replace(/^SECTION:\s*/i, ''); } 
      else if (content.match(/^LIST:/i) || content.startsWith('-') || content.startsWith('•')) { type = 'LIST'; content = content.replace(/^(LIST:|[-•])\s*/i, ''); } 
      else if (content.match(/^PARAGRAPH:/i)) { type = 'PARAGRAPH'; content = content.replace(/^PARAGRAPH:\s*/i, ''); } 
      else { if (content.length < 80 && !/[.!?]$/.test(content)) type = 'SECTION'; }
      if (!content.trim()) return;
      if (type === 'TITLE') output.push(<h2 key={index} className="text-xl md:text-2xl font-bold mt-10 mb-6 text-[var(--text-primary)] font-sans tracking-tight leading-[1.3]">{content}</h2>);
      else if (type === 'SECTION') output.push(<h3 key={index} className="text-lg md:text-xl font-medium mt-6 mb-2 text-[var(--text-primary)] font-sans">{content}</h3>);
      else if (type === 'LIST') { const listItems = content.split('\n').map(item => item.replace(/^[-•]\s*/, '').trim()).filter(Boolean); output.push(<ul key={index} className="mb-6 pl-4 space-y-2">{listItems.map((item, i) => (<li key={i} className="text-[16px] md:text-[17px] leading-7 text-[var(--text-secondary)] opacity-90 relative pl-4 before:content-['•'] before:absolute before:left-[-1rem] before:text-[var(--accent)] font-sans">{item}</li>))}</ul>); } 
      else output.push(<p key={index} className="mb-6 text-[16px] md:text-[17px] leading-[1.75] text-[var(--text-secondary)] opacity-90 font-sans tracking-[-0.01em] max-w-[720px]">{content}</p>);
    });
    return output;
  };

  const startNewChat = () => {
    const newId = generateId();
    setActiveThreadId(newId);
    setChatStage("new-chat"); 
    setMessages([]); 
    setSidebarOpen(false); 
    setThinking(false); 
    setInput(""); 
    setAppMode("chat");
    setBuildMode("chat"); // Exit builder mode on new chat
    setShowSuggestionList(false);
  };

  const switchThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setChatStage("active");
    setAppMode("chat");
    const storedMessages = historyStore[threadId];
    if (storedMessages && storedMessages.length > 0) setMessages(storedMessages); else setMessages([]); 
    if (isMobile) setSidebarOpen(false);
  };

  const toggleSidebar = () => { 
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setDesktopSidebarOpen(!desktopSidebarOpen);
    }
  };
    
  const handleScroll = () => { if (scrollRef.current) { const { scrollTop, scrollHeight, clientHeight } = scrollRef.current; setShowScrollButton(scrollHeight - scrollTop - clientHeight < 150); } };
  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
    
  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt);
    setShowSuggestionList(false);
    textareaRef.current?.focus();
  };

  const sendMessage = async () => {
    if (!input.trim() || !activeThreadId) return;
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(8);

    const userText = input;
    const userMsg = { id: Date.now().toString(), role: "user", content: userText };

    setMessages((prev) => [...prev, userMsg]);

    setThreads(prevThreads => {
        let newThreads = [...prevThreads];
        const threadIndex = newThreads.findIndex(t => t.id === activeThreadId);

        if (threadIndex > -1) {
            newThreads[threadIndex] = { ...newThreads[threadIndex], updatedAt: Date.now() };
        } else {
            const newThread = {
                id: activeThreadId,
                title: userText.slice(0, 40) + (userText.length > 40 ? "..." : ""),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                pinned: false,
            };
            newThreads.unshift(newThread);

            if (newThreads.length > 100) {
                newThreads.sort((a, b) => a.updatedAt - b.updatedAt);
                const oldestThread = newThreads.shift(); 
                if (oldestThread) {
                    setHistoryStore(prevHistory => {
                        const newHistory = { ...prevHistory };
                        delete newHistory[oldestThread.id];
                        return newHistory;
                    });
                }
            }
        }
        newThreads.sort((a,b) => b.updatedAt - a.updatedAt);
        return newThreads;
    });

    setChatStage("active");
    setInput("");
    setShowSuggestionList(false);
    setThinking(true);
    setProgressStep(0);

    const callGemini = async (retryCount = 0) => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ 
                contents: [{ parts: [{ text: userText }] }], 
                system_instruction: { parts: [{ text: aiSystemInstruction }] },
            }) 
        });
        
        if (!response.ok) throw new Error("API Error");
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        let aiData;
        try {
            aiData = JSON.parse(rawText);
        } catch (e) {
            aiData = { intent: "chat", response: rawText };
        }

        if (aiData.intent === "project") {
            const newProject = { 
                id: generateId(), 
                icon: 'file-text',
                title: aiData.title, 
                description: aiData.summary,
                progress: 0, 
                lastActive: 'just now',
                tasks: generateBasicTasks(aiData.title)
            };
            
            setProjects(prev => [...prev, newProject]);
            setActiveProject(newProject);
            setProjectTasks(newProject.tasks);
            setAppMode('chat');
            
            setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: `I've created a new project "${newProject.title}" for you. I've added some initial tasks to get you started.` }]);
        
        } else if (aiData.intent === "goal") {
            const newGoal = {
                id: generateId(),
                icon: 'target',
                title: aiData.title,
                startedDaysAgo: 0,
                currentStep: 0,
                totalSteps: 5,
                nextStep: "Define milestones",
                lastWorkedDaysAgo: 0,
                priority: 5
            };
            
            setActiveGoals(prev => [...prev, newGoal]);
            setAppMode('goals');
            setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: `Goal "${newGoal.title}" set. Let's make it happen.` }]);

        } else if (aiData.intent === "task") {
            if (activeProject) {
                handleAddTask(aiData.title);
                setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: `Added "${aiData.title}" to ${activeProject.title}.` }]);
            } else {
                setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: `I've noted "${aiData.title}". (Tip: Open a project to add tasks to it directly)` }]);
            }

        } else {
            setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: aiData.response || "I didn't catch that." }]);
        }

      } catch (error) {
        if (retryCount < 2) setTimeout(() => callGemini(retryCount + 1), 1000);
        else setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: "Connection issue. Please try again." }]);
      } finally { 
          if (retryCount === 0 || retryCount >= 2) setThinking(false); 
      }
    };
    callGemini();
  };

  const handleOpenProject = (project: any) => {
    setActiveProject(project);
    setProjectTasks(project.tasks || []);
    setAppMode('chat'); 
    if (isMobile) setSidebarOpen(false);
  };
    
  const handleRenameProject = (id: string, newTitle: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, title: newTitle } : p));
    if (activeProject?.id === id) {
      setActiveProject(prev => ({...prev, title: newTitle}));
    }
  };

  const handleDuplicateProject = (project: any) => {
    if (!project) return;
    const newProject = { ...project, id: generateId(), title: `${project.title} (Copy)` };
    setProjects(prev => [newProject, ...prev]);
  };

  const handleExitProject = () => {
    setActiveProject(null);
    setAppMode('projects'); 
  };

  const handleUpdateProject = (updatedProject: any) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    setActiveProject(updatedProject);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setProjectActionData(null);
    if(activeProject?.id === projectId) {
        setActiveProject(null);
        setAppMode('projects');
    }
    setDeleteProject(null);
  };

  const handleAddTask = (title: string) => {
      const newTask = { id: generateId(), title, status: 'todo', tag: 'General', priority: 'medium' };
      
      const newTasksList = [newTask, ...projectTasks];
      setProjectTasks(newTasksList);
      
      if (activeProject) {
          const updatedProject = { ...activeProject, tasks: newTasksList };
          handleUpdateProject(updatedProject);
      }

      setProjectActivities(prev => [{
          id: generateId(),
          type: 'task',
          content: `You added task "${title}"`,
          time: 'Just now',
          user: 'You'
      }, ...prev]);
  };

  const handleMoveTask = (taskId: string, newStatus: string) => {
      const updatedTasks = projectTasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t);
      setProjectTasks(updatedTasks);

      if (activeProject) {
          const doneCount = updatedTasks.filter(t => normalizeStatus(t.status) === 'done').length;
          const totalCount = updatedTasks.length;
          const newProgress = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);
          
          const updatedProject = { ...activeProject, tasks: updatedTasks, progress: newProgress };
          handleUpdateProject(updatedProject);
      }
      
      if (normalizeStatus(newStatus) === 'done') {
          triggerConfetti();
      }

      const task = projectTasks.find(t => t.id === taskId);
      if (task) {
          setProjectActivities(prev => [{
              id: generateId(),
              type: 'task',
              content: `Task "${task.title}" moved to ${newStatus === 'todo' ? 'To Do' : newStatus === 'in-progress' ? 'In Progress' : 'Done'}`,
              time: 'Just now',
              user: 'You'
          }, ...prev]);
      }
  };

  const handleRenameThread = (threadId: string, newTitle: string) => {
    setThreads(prev => prev.map(t => t.id === threadId ? { ...t, title: newTitle, updatedAt: Date.now() } : t).sort((a,b) => b.updatedAt - a.updatedAt));
    setRenameThread(null);
  };

  const handleDeleteThread = (threadId: string) => {
      setThreads(prev => prev.filter(t => t.id !== threadId));
      setHistoryStore(prev => {
          const newHistory = { ...prev };
          delete newHistory[threadId];
          return newHistory;
      });
      if (activeThreadId === threadId) {
          startNewChat();
      }
  };

  const handlePinThread = (threadId: string) => {
      setThreads(prev => prev.map(t => t.id === threadId ? { ...t, pinned: !t.pinned } : t).sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return b.updatedAt - a.updatedAt;
      }));
  };

  const handleUpdateUser = (updatedUser: any) => {
    setUser(updatedUser);
    setShowEditProfileModal(false);
  };

  const isBuilderModeActive = buildMode === 'builder' && appMode === 'chat' && !isMobile;
  
  const sidebarComponent = (
    <aside
      className={`app-sidebar ${isMobile ? (sidebarOpen ? 'open' : '') : (desktopSidebarOpen ? 'w-260' : 'w-72')}`}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border)] min-w-0 transition-all duration-300 flex-shrink-0">
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-3 overflow-hidden text-[var(--accent)]">
                <div className="w-8 h-8 flex-none rounded-lg bg-[var(--accent-subtle)] border border-[var(--accent-glow)] flex items-center justify-center">
                  <CalmoraLogo size={20} />
                </div>
                <span className="font-medium text-[var(--text-primary)] tracking-wide font-sans truncate text-sm">Calmora</span>
              </div>
              {!isMobile && (
                <button onClick={() => setDesktopSidebarOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all p-1 rounded-md hover:bg-[var(--surface-hover)]">
                  <ChevronLeft size={18} />
                </button>
              )}
              {isMobile && (
                  <button onClick={() => setSidebarOpen(false)} className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"><X size={20} /></button>
              )}
            </>
          ) : (
            <button onClick={() => setDesktopSidebarOpen(true)} className="p-2 hover:bg-[var(--surface-hover)] rounded-md transition-colors text-[hsl(var(--accent))]" title="Expand Sidebar">
                <CalmoraLogo size={24} />
            </button>
          )}
      </div>
      
        <div className="p-3 space-y-1 flex-shrink-0">
            <button onClick={startNewChat} title="Start New Session" className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all group active:scale-[0.98] shadow-lg shadow-primary/20">
                <Plus size={16} strokeWidth={2.5} />
                {!isCollapsed && <span className="text-sm font-semibold font-sans">Start New Session</span>}
            </button>
            <NavItem 
                icon={Folder} 
                label="Projects" 
                collapsed={isCollapsed} 
                onClick={() => { setAppMode('projects'); if(isMobile) setSidebarOpen(false); }} 
                active={appMode === 'projects' || appMode === 'project-view'} 
            />
            <NavItem 
                icon={History} 
                label="History" 
                collapsed={isCollapsed} 
                onClick={() => { setAppMode('history'); if(isMobile) setSidebarOpen(false); }} 
                active={appMode === 'history'}
            />
        </div>
        
        <div className="sidebar-scroll-wrapper" ref={scrollWrapperRef}>
            <div className="sidebar-scroll-content custom-scrollbar" ref={scrollContentRef}>
            <div className="px-3 pb-3">
                {!isCollapsed && <div className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-2 mt-4 px-3 font-semibold font-sans">Recent Chats</div>}
                <div className="space-y-1">
                {threads.sort((a,b) => {
                     if (a.pinned && !b.pinned) return -1;
                     if (!a.pinned && b.pinned) return 1;
                     return b.updatedAt - a.updatedAt;
                }).slice(0, 10).map(thread => (
                    isCollapsed ? (
                        <button
                            key={thread.id}
                            onClick={() => switchThread(thread.id)}
                            className={`
                                w-10 h-10 mx-auto flex items-center justify-center rounded-lg transition-all duration-200
                                ${activeThreadId === thread.id && appMode === 'chat' ? "sidebar-list-item active" : "hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}
                            `}
                            title={thread.title}
                        >
                            <MessageSquare size={18} strokeWidth={activeThreadId === thread.id && appMode === 'chat' ? 2 : 1.5} />
                        </button>
                    ) : (
                      <div key={thread.id} className="group relative">
                          <button
                              onClick={() => switchThread(thread.id)}
                              className={`sidebar-list-item pr-10 ${activeThreadId === thread.id && appMode === 'chat' ? 'active' : ''}`}
                              title={thread.title}
                          >
                              {thread.pinned && <Pin size={12} className="absolute left-2 top-2.5 text-[hsl(var(--accent))] opacity-60" />}
                              <MessageSquare size={16} className="mr-2 flex-shrink-0" />
                              <span className="truncate">{thread.title}</span>
                          </button>
                          <button
                              onClick={(e) => {
                                  e.stopPropagation();
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  setThreadActionData({ thread, position: { x: rect.left, y: rect.bottom + 5 } });
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] transition-opacity"
                          >
                              <MoreHorizontal size={16} />
                          </button>
                      </div>
                    )
                ))}
                {threads.length === 0 && !isCollapsed && (
                    <div className="px-3 py-4 text-center text-xs text-[var(--text-tertiary)]">
                        No history yet.
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>

        <div className="sidebar-bottom">
          <NavItem 
            icon={Settings} 
            label="Settings" 
            collapsed={isCollapsed}
            onClick={() => {
              if (isMobile) {
                setShowSettingsSheet(true);
              } else {
                setAppMode('settings');
              }
              if (isMobile && sidebarOpen) setSidebarOpen(false);
            }}
            active={appMode === 'settings'}
          />
          <NavItem 
            icon={LogOut} 
            label="Sign out" 
            collapsed={isCollapsed}
            onClick={() => window.location.reload()}
            danger
          />
        </div>
    </aside>
  );

  return (
    <>
      <div className={`app-root ${isBuilderModeActive ? 'builder-active' : ''}`}>
        {sidebarComponent}

        {isBuilderModeActive ? (
          <BuilderPage
            onExit={() => setBuildMode('chat')}
            activeProject={activeProject}
            onRename={setRenameProject}
            onDuplicate={handleDuplicateProject}
            onDelete={setDeleteProject}
            messages={messages}
            thinking={thinking}
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            formatAIResponse={formatAIResponse}
            generationSteps={generationSteps}
            progressStep={progressStep}
            followUpSuggestions={followUpSuggestions}
            chipSuggestions={chipSuggestions}
            onSuggestionClick={handleSuggestionClick}
            messagesEndRef={messagesEndRef}
            textareaRef={textareaRef}
            toggleSidebar={toggleSidebar}
          />
        ) : (
          <main className="app-main">
            <Header
              user={headerUser}
              isMobile={isMobile}
              onMenu={toggleSidebar}
              onSignOut={() => window.location.reload()}
              theme={theme}
              setTheme={changeTheme}
              projects={projects}
              onOpenProject={handleOpenProject}
              activeProject={activeProject}
              onTriggerProjectAction={setProjectActionData}
              onExitProject={handleExitProject}
            />
              
            <div className="flex-1 min-h-0 relative flex">
              <div className={`h-full relative flex flex-col transition-all duration-300 ease-in-out w-full`}>
                <div className="scroll-content custom-scrollbar" ref={scrollRef}>
                  <div className="content-container">
                    <div className="flex-1 w-full relative">
                      {appMode === 'chat' && chatStage === 'active' && (
                        <div className="flex flex-col items-center w-full px-4 py-6 min-h-full relative">
                          {messages.map((msg) => (
                            <div key={msg.id} className={`w-full flex ${msg.role === "user" ? "justify-end" : "justify-center"} mb-8 animate-message-in`}>
                              {msg.role === "user" ? (
                                <div className="bg-[var(--surface-raised)] px-5 py-3 rounded-[20px] rounded-br-sm text-[16px] leading-[1.6] max-w-[85%] md:max-w-[72%] text-[var(--text-primary)] font-sans tracking-normal border border-[var(--border)] backdrop-blur-md shadow-sm">{msg.content}</div>
                              ) : (
                                <div className="w-full max-w-[720px] font-sans text-[var(--text-secondary)]">{formatAIResponse(msg.content)}</div>
                              )}
                            </div>
                          ))}
                          {thinking && (
                             <div className="w-full flex justify-center mb-6 animate-message-in">
                              <div className="w-full max-w-[720px]">
                                <div className="text-lg font-medium text-[var(--text-primary)] mb-4">Generating website</div>
                                <div className="space-y-3">
                                  {generationSteps.map((step, index) => (
                                    <div key={index} className={`flex items-center gap-3 transition-all duration-500 ${index <= progressStep ? 'opacity-100' : 'opacity-40'}`}>
                                      {index < progressStep ? (
                                        <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                                      ) : index === progressStep ? (
                                        <Zap size={18} className="text-yellow-400 flex-shrink-0 animate-pulse" />
                                      ) : (
                                        <Circle size={18} className="text-[var(--text-tertiary)] flex-shrink-0" />
                                      )}
                                      <span className={`text-base ${index <= progressStep ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'}`}>{step}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          <div ref={messagesEndRef} className="h-24" />
                        </div>
                      )}
                      
                      {appMode !== 'chat' && (
                        <>
                          {appMode === "settings" && <SettingsView 
                              user={user} 
                              theme={theme} 
                              setTheme={changeTheme} 
                              onShowEditProfile={() => setShowEditProfileModal(true)}
                              onShowChangePassword={() => setShowChangePasswordModal(true)}
                              onShowBilling={() => setShowBillingModal(true)}
                            />}
                          {appMode === "projects" && <ProjectsView projects={projects} setShowProjectModal={setShowProjectModal} onOpenProject={handleOpenProject} setProjectActionData={setProjectActionData} />}
                          {appMode === "history" && <HistoryView sessions={threads} onOpenSession={switchThread} />}
                          {appMode === "goals" && <GoalsView activeGoals={activeGoals} setShowGoalModal={setShowGoalModal} />}
                          {appMode === "activity" && <ProjectActivityView activities={projectActivities} />}
                          {appMode === "completed" && <CompletedView achievements={achievements} />}
                          {appMode === "focus" && <FocusMode steps={FOCUS_DEMO_STEPS} stepIndex={focusStepIndex} setStepIndex={setFocusStepIndex} onExit={() => setAppMode("chat")} />}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {appMode === 'chat' && (
                  <div className={`chat-input-layer ${chatStage === 'new-chat' ? 'home-mode' : ''} ${isMobile ? 'mobile-input' : ''}`}>
                    
                    {chatStage === 'new-chat' && !input && (
                        <div className="mb-4">
                            <ModeToggle mode={buildMode} setMode={setBuildMode} />
                        </div>
                    )}

                    {chatStage === 'new-chat' && showSuggestionList && filteredSuggestions.length > 0 && (
                        <div className="absolute bottom-full mb-3 w-full">
                            <PromptSuggestionList suggestions={filteredSuggestions} onSelect={handleSuggestionClick} />
                        </div>
                    )}
                    
                    {chatStage === 'active' && !input && !isBuilderModeActive && (
                        <div className="mb-4">
                            <ModeToggle mode={buildMode} setMode={setBuildMode} />
                        </div>
                    )}

                    <div className="chat-input-surface">
                      <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          setShowSuggestionList(e.target.value.trim().length > 0 && chatStage === 'new-chat');
                        }}
                        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                        placeholder={chatStage === 'new-chat' ? "Example: “Build a SaaS landing page for an AI email assistant”" : "Ask a follow-up or give a new instruction..."}
                        className="relative z-10 flex-1 bg-transparent outline-none resize-none text-[15px] leading-relaxed text-[var(--text-primary)] placeholder-[var(--text-tertiary)] min-h-[24px] max-h-[160px] overflow-y-auto scrollbar-hide font-sans py-1"
                        rows={1}
                      />
                      {input.trim() ? (
                        <button onClick={sendMessage} disabled={thinking} className={`flex-shrink-0 flex items-center justify-center transition-all duration-200 w-9 h-9 rounded-full bg-primary text-primary-foreground shadow-md active:scale-95 hover:scale-105`}>
                          {thinking ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                        </button>
                      ) : (
                        <button className="flex-shrink-0 flex items-center justify-center transition-all duration-200 w-9 h-9 rounded-full text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] active:scale-95">
                          <Mic size={20} className="opacity-70 hover:opacity-100 transition-opacity" />
                        </button>
                      )}
                    </div>
                    
                    {chatStage === 'new-chat' && !input.trim() && (
                        <div className="mt-6">
                            <PromptSuggestions suggestions={chipSuggestions} setPrompt={handleSuggestionClick} />
                        </div>
                    )}
                    
                    {chatStage === 'active' && !thinking && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && !isBuilderModeActive && (
                        <div className="mt-6">
                            <PromptSuggestions suggestions={followUpSuggestions} setPrompt={handleSuggestionClick} />
                        </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </main>
        )}
          
          {isMobile && sidebarOpen && !isBuilderModeActive && (
            <div onTouchStart={() => setSidebarOpen(false)} onMouseDown={() => setSidebarOpen(false)} className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm" style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }} aria-hidden="true" />
          )}
      </div>
        
      {(showProjectModal || renameProject || deleteProject) && (
        <>
          {showProjectModal && <NewProjectModal onClose={() => setShowProjectModal(false)} onCreate={(t: string) => { 
              const newProject = { id: generateId(), icon: 'file-text', title: t, step: 1, lastActive: 'just now', tasks: [] };
              setProjects([...projects, newProject]); 
              setShowProjectModal(false);
              handleOpenProject(newProject);
          }} />}
          
          {renameProject && (
              <EditNameModal
                  currentName={(renameProject as any).title}
                  onSave={(newTitle: string) => {
                      handleRenameProject((renameProject as any).id, newTitle);
                      setRenameProject(null);
                  }}
                  onClose={() => setRenameProject(null)}
                  title="Rename Project"
              />
          )}
          {deleteProject && (
              <DeleteConfirmModal
                  projectName={(deleteProject as any).title}
                  onConfirm={() => handleDeleteProject((deleteProject as any).id)}
                  onClose={() => setDeleteProject(null)}
              />
          )}
        </>
      )}

      {projectActionData && (
          <ProjectActionSheet 
              projectData={projectActionData}
              onClose={() => setProjectActionData(null)}
              onRename={(project) => { setProjectActionData(null); setRenameProject(project); }}
              onDuplicate={(project) => {
                  handleDuplicateProject(project);
                  setProjectActionData(null);
              }}
              onDelete={(project) => { setProjectActionData(null); setDeleteProject(project); }}
          />
      )}

      {threadActionData && (
          <ThreadActionSheet
              threadData={threadActionData}
              onClose={() => setThreadActionData(null)}
              onRename={(thread) => { setThreadActionData(null); setRenameThread(thread); }}
              onDelete={(thread) => { setThreadActionData(null); handleDeleteThread(thread.id); }}
              onPin={(thread) => { setThreadActionData(null); handlePinThread(thread.id); }}
          />
      )}
      {renameThread && (
          <EditNameModal
              currentName={renameThread.title}
              onSave={(newTitle: string) => handleRenameThread(renameThread.id, newTitle)}
              onClose={() => setRenameThread(null)}
              title="Rename Chat"
          />
      )}
      
      {showEditProfileModal && (
          <EditProfileModal
              user={user}
              onSave={handleUpdateUser}
              onClose={() => setShowEditProfileModal(false)}
          />
      )}
      {showChangePasswordModal && (
          <ChangePasswordModal
              onClose={() => setShowChangePasswordModal(false)}
          />
      )}
      {showBillingModal && (
          <BillingModal
              user={user}
              onClose={() => setShowBillingModal(false)}
          />
      )}
      
      {isMobile && showSettingsSheet && (
        <SettingsSheet
          open={showSettingsSheet}
          onClose={() => setShowSettingsSheet(false)}
          user={user}
          theme={theme}
          setTheme={setTheme}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </>
  );
};

export default HomePage;
