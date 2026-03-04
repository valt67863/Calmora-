export const safeLocalStorage = {
  getItem: (key: string) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn("LocalStorage access denied:", e);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn("LocalStorage access denied:", e);
    }
  }
};

export const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString() + Math.random().toString(36).substring(2);
};

export const normalizeStatus = (status?: string) => {
    const s = status?.toLowerCase().trim();
    if (s === 'backlog') return 'todo'; 
    return s;
};

export const triggerConfetti = () => {
  if (typeof window === 'undefined') return;
  
  const colors = ['#D97757', '#4ADE80', '#60A5FA', '#FBBF24', '#ffffff'];
  const particleCount = 100;
  
  for (let i = 0; i < particleCount; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.left = '50%';
    el.style.top = '50%';
    el.style.width = '6px';
    el.style.height = '6px';
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = '50%';
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none';
    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 4;
    const tx = Math.cos(angle) * velocity * 50; // spread
    const ty = Math.sin(angle) * velocity * 50;

    el.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
    ], {
      duration: 800 + Math.random() * 400,
      easing: 'cubic-bezier(0, .9, .57, 1)',
    }).onfinish = () => el.remove();
  }
};

export const generateNextAction = (tasks: any[]) => {
  const safeTasks = tasks || [];
  
  if (safeTasks.length === 0) {
      return {
          message: "Generate AI roadmap",
          type: "generate",
          actionTask: null
      };
  }

  const backlog = safeTasks.filter((t) => normalizeStatus(t.status) === "todo");
  const inProgress = safeTasks.filter((t) => normalizeStatus(t.status) === "in-progress");
  const done = safeTasks.filter((t) => normalizeStatus(t.status) === "done");

  const progress = safeTasks.length
    ? Math.round((done.length / safeTasks.length) * 100)
    : 0;

  if (progress === 100) {
      return {
          message: "Project completed. Time to celebrate.",
          type: "done",
          actionTask: null
      };
  }

  if (inProgress.length > 0) {
    return {
      message: `Continue: ${inProgress[0].title}`,
      type: 'continue',
      actionTask: inProgress[0]
    };
  }

  if (backlog.length > 0) {
    return {
      message: `Start: ${backlog[0].title}`,
      type: 'start',
      actionTask: backlog[0]
    };
  }

  return {
    message: "Review completed tasks",
    type: 'review',
    actionTask: null
  };
};

export const generateProjectInsights = (tasks: any[]) => {
  const insights: { type: string; message: string }[] = [];
  const safeTasks = tasks || [];
  
  const done = safeTasks.filter((t) => normalizeStatus(t.status) === "done");
  const backlog = safeTasks.filter((t) => normalizeStatus(t.status) === "todo");
  const inProgress = safeTasks.filter((t) => normalizeStatus(t.status) === "in-progress");

  const progress = safeTasks.length
      ? Math.round((done.length / safeTasks.length) * 100)
      : 0;

  if (safeTasks.length === 0) {
      insights.push({
          type: "warning",
          message: "No tasks yet. AI can generate a roadmap for you."
      });
      return insights;
  }

  if (backlog.length === safeTasks.length) {
      insights.push({
          type: "warning",
          message: "You haven’t started yet. Pick one task and begin."
      });
  }

  if (inProgress.length > 0 && done.length === 0) {
      insights.push({
          type: "info",
          message: "You started strong. Try finishing one task today."
      });
  }

  if (done.length > 0 && progress < 80) {
      insights.push({
          type: "success",
          message: `You're ${progress}% complete. Keep pushing forward.`
      });
  }

  if (progress >= 80 && progress < 100) {
      insights.push({
          type: "success",
          message: "You're almost there. Finish the final tasks."
      });
  }

  if (progress === 100) {
      insights.push({
          type: "success",
          message: "Project completed. Time to celebrate."
      });
  }
  
  if (insights.length === 0) {
      insights.push({ type: 'neutral', message: "Workflow active." });
  }

  return insights;
};

export const generateBasicTasks = (input: any) => {
  return [
    {
      id: generateId(),
      title: 'Research & Planning',
      status: 'todo', // mapped from backlog
      tag: 'Planning',
      priority: 'high'
    },
    {
      id: generateId(),
      title: 'Execution Phase',
      status: 'todo', // mapped from backlog
      tag: 'Execution',
      priority: 'medium'
    },
    {
      id: generateId(),
      title: 'Review & Improve',
      status: 'todo', // mapped from backlog
      tag: 'Review',
      priority: 'low'
    }
  ];
};

export const aiSystemInstruction = `You are Calmora, a productivity AI. 
Your goal is to detect the user's intent and return a JSON object to route the application.
Current Date: ${new Date().toLocaleDateString()}.

Analyze the user input and output valid JSON ONLY. Do not output markdown code blocks.

1. CREATE PROJECT: If user wants to "build", "create", "start" a project (e.g., "Build portfolio website").
 Return: { "intent": "project", "title": "Project Name", "summary": "Short ai summary" }

2. CREATE GOAL: If user wants to set a goal (e.g., "Read 5 books").
 Return: { "intent": "goal", "title": "Goal Title" }

3. ADD TASK: If user wants to add a quick task (e.g., "Remind me to buy milk").
 Return: { "intent": "task", "title": "Task Title" }

4. CHAT: For general conversation.
 Return: { "intent": "chat", "response": "Your friendly response here." }

Example Output:
{ "intent": "project", "title": "Portfolio Website", "summary": "A personal showcase site." }`;

export const FOCUS_DEMO_STEPS = [
  { id: 1, title: "Update Resume", instruction: "Open your current resume file or create a blank document.", detail: "Don't worry about formatting yet. Just get the file open." },
  { id: 2, title: "Update Resume", instruction: "Write just the first sentence of your summary.", detail: "Example: 'Senior Designer with 5 years of experience in mobile apps.'" },
  { id: 3, title: "Update Resume", instruction: "List your last 3 job titles and dates.", detail: "No descriptions yet. Just the skeleton." },
  { id: 4, title: "Update Resume", instruction: "Add one bullet point for your most recent job.", detail: "Focus on a specific achievement, not just a duty." },
  { id: 5, title: "Update Resume", instruction: "Review the document for typos.", detail: "Read it out loud to catch awkward phrasing." }
];
