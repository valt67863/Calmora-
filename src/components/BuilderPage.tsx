
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Copy, Download, Wand2, RefreshCw, Maximize, Minimize,
  Save, Sparkles, Monitor, Tablet, Smartphone, X, Lightbulb, XCircle,
  AlertCircle, ChevronDown, ChevronUp, Undo, Redo, Loader2,
  ArrowLeft, MoreHorizontal, Edit3, Trash2, Send, CheckCircle2, Circle, Zap, Mic, Menu,
} from 'lucide-react';
import PromptSuggestions from "@/components/PromptSuggestions";


// Suppress benign ResizeObserver errors caused by Monaco Editor's automaticLayout
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    if (e.message && e.message.includes('ResizeObserver loop')) {
      e.stopImmediatePropagation();
    }
  });
  
  const originalError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('ResizeObserver loop')) {
      return;
    }
    originalError.call(console, ...args);
  };
}

// Single File React Component Architecture
const initialCode = `function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 font-sans">
      <div className="max-w-3xl text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          AI-First Architecture
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          SaaS Landing Page
        </h1>
        
        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
          Welcome to the future of AI builders. Everything is generated as a single React component, instantly compiled and rendered.
        </p>
        
        <div className="flex items-center justify-center gap-4 paddingTop-4">
          <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors">
            Get Started
          </button>
          <button className="px-8 py-4 bg-transparent border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);`;

// Generates the Sandboxed Runtime output
const generateSandboxDoc = (code) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>body { margin: 0; padding: 0; background: #000; }</style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-type="module">
    try {
      ${code}
    } catch (e) {
      const errorDiv = document.createElement('div');
      errorDiv.style.color = '#ff6b6b';
      errorDiv.style.padding = '20px';
      errorDiv.style.fontFamily = 'monospace';
      errorDiv.innerText = 'Render Error: ' + e.message;
      document.getElementById('root').appendChild(errorDiv);
    }
  </script>
</body>
</html>`;
};

// Dynamic Monaco Editor loader
const MonacoEditor = React.forwardRef(({ value, onChange, readOnly }, ref) => {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useImperativeHandle(ref, () => ({
    format: () => {
      if (editorRef.current) {
        editorRef.current.getAction('editor.action.formatDocument').run();
      }
    }
  }));

  useEffect(() => {
    if (editorRef.current && window.monaco) {
      editorRef.current.updateOptions({ readOnly: readOnly });
    }
  }, [readOnly]);

  useEffect(() => {
    let isMounted = true;

    const initEditor = () => {
      if (!containerRef.current || !window.monaco) return;
      setIsLoading(false);
      editorRef.current = window.monaco.editor.create(containerRef.current, {
        value: value,
        language: "javascript",
        theme: "vs-dark",
        fontSize: 14,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', // Better font fallback for exact line height alignment
        fontLigatures: true,
        minimap: { enabled: false },
        lineNumbers: "on",
        lineNumbersMinChars: 3, // Prevents layout shifting
        lineHeight: 24,
        padding: { top: 24, bottom: 24 }, // Slightly increased to ensure no top/bottom text clipping
        renderLineHighlight: "all",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: "on",
        smoothScrolling: true,
        cursorBlinking: "smooth",
        cursorSmoothCaretAnimation: "on",
        readOnly: readOnly
      });

      editorRef.current.onDidChangeModelContent(() => {
        onChange(editorRef.current.getValue());
      });
    };

    if (window.monaco) {
      initEditor();
    } else {
      const scriptId = 'monaco-loader-script';
      if (!document.getElementById(scriptId)) {
        const loaderScript = document.createElement('script');
        loaderScript.id = scriptId;
        loaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.js';
        document.head.appendChild(loaderScript);
        loaderScript.onload = () => {
          window.require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });
          window.require(['vs/editor/editor.main'], () => {
            if (isMounted) initEditor();
          });
        };
      } else {
         const checkReady = setInterval(() => {
           if (window.monaco) {
             clearInterval(checkReady);
             if (isMounted) initEditor();
           }
         }, 100);
      }
    }

    return () => {
      isMounted = false;
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#1e1e1e] overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-[#858585] font-mono text-sm z-10 bg-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"/>
            Loading SaaS Editor...
          </div>
        </div>
      )}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
});
MonacoEditor.displayName = 'MonacoEditor';

function ChatPanel({
  messages,
  thinking,
  input,
  setInput,
  sendMessage,
  formatAIResponse,
  generationSteps,
  progressStep,
  followUpSuggestions,
  onSuggestionClick,
  messagesEndRef,
  textareaRef,
  activeProject,
  onExit,
  onRename,
  onDuplicate,
  onDelete,
  toggleSidebar,
}: any) {
  
  const [showBuilderMenu, setShowBuilderMenu] = useState(false);
  const builderMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (builderMenuRef.current && !(builderMenuRef.current as any).contains(event.target)) {
        setShowBuilderMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input, textareaRef]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking, messagesEndRef]);

  return (
    <div className="builder-chat-panel">
      <header className="builder-chat-header flex justify-between">
          <div className="flex items-center gap-1">
              <button onClick={toggleSidebar} title="Toggle Sidebar" className="control-button -ml-2">
                <Menu size={18} />
              </button>
              <button onClick={onExit} title="Exit Builder" className="control-button">
                  <ArrowLeft size={18} />
              </button>
          </div>
          <div className="flex items-center gap-1 min-w-0">
              <span className="text-sm font-medium text-white truncate">{activeProject?.title || "Untitled Project"}</span>
              <div className="relative" ref={builderMenuRef}>
                  <button onClick={() => setShowBuilderMenu(v => !v)} title="Options" className="control-button" disabled={!activeProject}>
                    <MoreHorizontal size={18} />
                  </button>
                  {showBuilderMenu && activeProject && (
                    <div className="menu-pop animate-pop-in" style={{ left: 'auto', right: 0, top: 'calc(100% + 8px)', width: '220px' }}>
                      <div className="p-2">
                          <button onClick={() => { onRename(activeProject); setShowBuilderMenu(false); }} className="menu-item w-full text-left flex items-center gap-3"><Edit3 size={15} /> Rename</button>
                          <button onClick={() => { onDuplicate(activeProject); setShowBuilderMenu(false); }} className="menu-item w-full text-left flex items-center gap-3"><Copy size={15} /> Duplicate</button>
                          <div className="h-px bg-[var(--border)] my-1" />
                          <button onClick={() => { onDelete(activeProject); setShowBuilderMenu(false); }} className="menu-item w-full text-left !text-[var(--danger)] flex items-center gap-3"><Trash2 size={15} /> Delete</button>
                      </div>
                    </div>
                  )}
              </div>
          </div>
      </header>
      <div className="builder-chat-messages custom-scrollbar">
        {messages.map((msg: any) => (
          <div key={msg.id} className={`w-full flex mb-6 animate-message-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "user" ? (
              <div className="user-message">{msg.content}</div>
            ) : (
              <div className="ai-message">{formatAIResponse(msg.content)}</div>
            )}
          </div>
        ))}
        {thinking && (
           <div className="w-full flex justify-start mb-6 animate-message-in">
              <div className="ai-message">
                <div className="text-lg font-medium text-[var(--text-primary)] mb-4">Generating website</div>
                <div className="space-y-3">
                  {generationSteps.map((step: string, index: number) => (
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
        <div ref={messagesEndRef} />
      </div>
      <div className="builder-chat-input-area">
        {!thinking && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
          <div className="mb-4">
              <PromptSuggestions suggestions={followUpSuggestions} setPrompt={onSuggestionClick} />
          </div>
        )}
        <div className="chat-input-surface">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ask a follow-up or give a new instruction..."
            className="relative z-10 flex-1 bg-transparent outline-none resize-none text-[15px] leading-relaxed text-[var(--text-primary)] placeholder-[var(--text-tertiary)] min-h-[24px] max-h-[120px] overflow-y-auto scrollbar-hide font-sans py-1"
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
      </div>
    </div>
  );
}


function CodePanel({ code, setCode, isGenerating, editorRef }) {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#1c1c1e]">
      <div className="flex-1 relative min-h-0 bg-[#1e1e1e]">
        <MonacoEditor 
          ref={editorRef} 
          value={code} 
          onChange={setCode}
          readOnly={isGenerating}
        />
      </div>
    </div>
  );
}

function PreviewPanel({ code, reloadKey, isFullscreen, deviceMode, isReloading, isRevealing, onExitFullscreen }) {
  const sandboxDoc = generateSandboxDoc(code);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const panelContent = (
    <div className={`flex flex-col bg-[#141416] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] ${isFullscreen ? 'fixed inset-0 z-[1001]' : 'relative w-full h-full'}`}>
      <style>{`
        @keyframes previewLoad { 0% { width: 0%; } 40% { width: 60%; } 80% { width: 85%; } 100% { width: 100%; } }
        @keyframes shine { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes previewReveal { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .preview-loading-bar { position: absolute; top: 0; left: 0; height: 2px; background: linear-gradient(90deg, #f43f5e, #fb7185, #f43f5e); background-size: 200% 100%; animation: previewLoad 0.8s ease forwards, shine 1s linear infinite; z-index: 50; }
        .preview-reveal { animation: previewReveal 0.35s ease forwards; }
        @keyframes skeletonLoading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .skeleton { background: linear-gradient(90deg, #1f1f23 25%, #353540 50%, #1f1f23 75%); background-size: 400% 100%; animation: skeletonLoading 1.5s ease-in-out infinite; }
      `}</style>
      
      {isFullscreen && (
          <button 
              onClick={onExitFullscreen}
              className="absolute top-4 right-4 z-[1002] w-10 h-10 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors"
              title="Exit Fullscreen"
          >
              <X size={20} />
          </button>
      )}

      {isReloading && <div className="preview-loading-bar" />}

      <div className="flex-1 bg-[#0f0f12] overflow-hidden flex justify-center items-center relative">
        <div className={`relative h-full transition-all duration-300 ease-in-out ${deviceMode === 'Mobile' ? 'w-[375px] max-w-full border-x border-white/10' : deviceMode === 'Tablet' ? 'w-[768px] max-w-full border-x border-white/10' : 'w-full'}`}>
          <iframe key={reloadKey} title="preview" srcDoc={sandboxDoc} className={`w-full h-full border-none bg-white ${isRevealing ? 'preview-reveal' : ''}`} sandbox="allow-scripts allow-modals allow-forms allow-same-origin" />
          
          <div className={`absolute inset-0 bg-[#0f0f12] flex flex-col z-10 transition-opacity duration-[350ms] ease-in-out ${isReloading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="h-14 border-b border-[#1f1f23] flex items-center px-6 gap-4">
              <div className="w-24 h-5 skeleton rounded" />
              <div className="ml-auto flex gap-3">
                <div className="w-16 h-5 skeleton rounded hidden sm:block" />
                <div className="w-8 h-8 skeleton rounded-full" />
              </div>
            </div>
            <div className="flex flex-1 p-6 gap-6">
              <div className="hidden sm:flex flex-col gap-3 w-48">
                <div className="w-full h-8 skeleton rounded" /><div className="w-3/4 h-8 skeleton rounded" /><div className="w-5/6 h-8 skeleton rounded" />
              </div>
              <div className="flex-1 flex flex-col gap-5">
                <div className="w-1/3 h-8 skeleton rounded" /><div className="w-full h-40 skeleton rounded" /><div className="w-full flex-1 skeleton rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isFullscreen) {
    if (!isClient) return null; // Don't render portal on server
    return createPortal(panelContent, document.body);
  }

  return (
    <div className="relative w-full h-full">
      {panelContent}
    </div>
  );
}

function ConsolePanel({ error, isOpen, setIsOpen }) {
    const getTime = () => new Date().toLocaleTimeString('en-US', { hour12: false });

    return (
        <div className="console-panel">
            <header className="console-header justify-between">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-gray-300">Console</h3>
                    {error && <span className="w-2 h-2 rounded-full bg-red-500" />}
                </div>
                <button onClick={() => setIsOpen(!isOpen)} title={isOpen ? 'Collapse Console' : 'Expand Console'} className="p-1 text-gray-400 hover:text-white rounded-md hover:bg-white/10">
                    {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
            </header>
            {isOpen && (
                <div className="console-body custom-scrollbar">
                    {error ? (
                        <div className="console-error-view">
                            <div className="error-message">
                                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                                <div>
                                    <div className="text-red-400 font-medium">{error.message}</div>
                                    <div className="text-xs text-gray-500 mt-1">File: {error.file} &nbsp;&nbsp; Line: {error.line}</div>
                                </div>
                            </div>
                            <div className="error-actions">
                                <button className="ai-action-btn fix-btn">
                                    <Wand2 size={14} /> Fix with AI
                                </button>
                                <button className="ai-action-btn explain-btn">
                                    <Lightbulb size={14} /> Explain Error
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="console-log-view">
                            <div className="log-line">
                                <span className="timestamp">{getTime()}</span>
                                <span className="log-text">Build successful. Preview updated.</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function BuilderPage({ 
  onExit,
  activeProject,
  onRename,
  onDuplicate,
  onDelete,
  messages,
  thinking,
  input,
  setInput,
  sendMessage,
  formatAIResponse,
  generationSteps,
  progressStep,
  followUpSuggestions,
  onSuggestionClick,
  messagesEndRef,
  textareaRef,
  isBuilderSidebarOpen,
  toggleBuilderSidebar,
}: { 
  onExit: () => void;
  activeProject: any;
  onRename: (project: any) => void;
  onDuplicate: (project: any) => void;
  onDelete: (project: any) => void;
  messages: any[];
  thinking: boolean;
  input: string;
  setInput: (input: string) => void;
  sendMessage: () => void;
  formatAIResponse: (text: string) => React.ReactNode[];
  generationSteps: string[];
  progressStep: number;
  followUpSuggestions: string[];
  onSuggestionClick: (prompt: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  isBuilderSidebarOpen: boolean;
  toggleBuilderSidebar: () => void;
}) {
  // Global Application State
  const [code, setCode] = useState(initialCode);
  const [debouncedCode, setDebouncedCode] = useState(initialCode);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Auto-saved just now');
  const editorRef = useRef(null);
  
  // Header Tools State
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [deviceMode, setDeviceMode] = useState('Desktop');
  const [isReloading, setIsReloading] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isUndoing, setIsUndoing] = useState(false);
  const [isRedoing, setIsRedoing] = useState(false);
  
  // Console State
  const [consoleError, setConsoleError] = useState(null);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);

  // Menu State
  const [showBuilderMenu, setShowBuilderMenu] = useState(false);
  const builderMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (builderMenuRef.current && !(builderMenuRef.current as any).contains(event.target)) {
        setShowBuilderMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Simulate an error appearing in the console after 5 seconds for demonstration
    const timer = setTimeout(() => {
        setConsoleError({ 
            message: "TypeError: Cannot read properties of undefined (reading 'map')",
            file: "src/App.jsx",
            line: 42,
        });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Editor Actions
  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
    document.body.removeChild(textArea);
  };

  const handleDownloadZip = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const JSZipModule = await import('https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm');
      const JSZip = JSZipModule.default;
      const zip = new JSZip();

      let exportCode = code.replace(/const root = ReactDOM\.createRoot[\s\S]*root\.render\(<App \/>\);/g, '');
      exportCode = `import React from 'react';\n\n${exportCode.trim()}\n\nexport default App;`;

      zip.file("vite.config.js", `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nexport default defineConfig({ plugins: [react()] })`);
      zip.file("package.json", JSON.stringify({ name: "nexus-project", type: "module", scripts: { dev: "vite", build: "vite build" }, dependencies: { react: "^18.2.0", "react-dom": "^18.2.0", "lucide-react": "^0.344.0" }, devDependencies: { "@vitejs/plugin-react": "^4.2.1", autoprefixer: "^10.4.18", postcss: "^8.4.35", tailwindcss: "^3.4.1", vite: "^5.1.4" } }, null, 2));
      zip.file("tailwind.config.js", `export default { content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], theme: { extend: {} }, plugins: [] }`);
      zip.file("postcss.config.js", `export default { plugins: { tailwindcss: {}, autoprefixer: {} } }`);
      zip.file("index.html", `<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8" /><title>Nexus UI Project</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`);
      
      const src = zip.folder("src");
      src.file("main.jsx", `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.jsx'\nimport './index.css'\nReactDOM.createRoot(document.getElementById('root')).render(<App />)`);
      src.file("index.css", `@tailwind base;\n@tailwind components;\n@tailwind utilities;\nbody { @apply bg-black text-white; }`);
      src.file("App.jsx", exportCode);

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nexus-project.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.format();
    }
  };

  // Preview Actions
  const handleReload = () => {
    if (isReloading) return;
    setIsReloading(true);
    setIsRevealing(false);
    setConsoleError(null); // Clear error on reload
    setTimeout(() => setPreviewKey(k => k + 1), 400);
    setTimeout(() => { setIsReloading(false); setIsRevealing(true); }, 800);
    setTimeout(() => setIsRevealing(false), 1200);
  };
  
  const handleUndo = () => {
    setIsUndoing(true);
    // In a real app, you'd update the code from a history stack
    setTimeout(() => setIsUndoing(false), 800);
  };

  const handleRedo = () => {
    setIsRedoing(true);
    // In a real app, you'd update the code from a history stack
    setTimeout(() => setIsRedoing(false), 800);
  };

  // Debounced Compilation Hook
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCode(code);
      setSaveStatus(isGenerating ? 'Saving...' : 'Auto-saved');
    }, 500);
    return () => clearTimeout(handler);
  }, [code, isGenerating]);
  
  const chatPanelGridClass = isBuilderSidebarOpen ? 'minmax(350px, 420px)' : 'minmax(350px, 1fr)';

  return (
    <div className="w-full h-full flex flex-col bg-[var(--surface)] overflow-hidden">
        <header className="builder-header justify-between px-4">
            {/* Left placeholder */}
            <div className="flex items-center gap-2 flex-1 justify-start">
               
            </div>

            {/* Center: Device Toggles & Preview Controls */}
            <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#151519] rounded-lg p-1 border border-white/10">
                    {['Desktop', 'Tablet', 'Mobile'].map(mode => {
                    const Icon = mode === 'Desktop' ? Monitor : mode === 'Tablet' ? Tablet : Smartphone;
                    return (
                        <button
                        key={mode}
                        onClick={() => setDeviceMode(mode)}
                        title={mode}
                        className={`flex items-center justify-center w-9 h-7 rounded-md transition-all ${
                            deviceMode === mode 
                            ? 'bg-[#333338] text-white shadow-sm' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                        >
                        <Icon size={16} />
                        </button>
                    )
                    })}
                </div>
                <div className="h-5 w-px bg-white/10" />
                <div className="flex items-center gap-1">
                  <button onClick={handleUndo} title="Undo" disabled={isUndoing || isRedoing} className="flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50">
                      {isUndoing ? <Loader2 size={16} className="animate-spin" /> : <Undo size={16} />}
                  </button>
                  <button onClick={handleRedo} title="Redo" disabled={isUndoing || isRedoing} className="flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50">
                      {isRedoing ? <Loader2 size={16} className="animate-spin" /> : <Redo size={16} />}
                  </button>
                </div>
                <div className="h-5 w-px bg-white/10" />
                <div className="flex items-center gap-1">
                    <button onClick={handleReload} title="Reload Preview" disabled={isReloading} className="flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50">
                        <RefreshCw size={16} className={isReloading ? "animate-spin" : ""} /> 
                    </button>
                    <button onClick={() => setIsFullscreen(!isFullscreen)} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"} className="flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                    </button>
                </div>
                {consoleError && (
                    <>
                        <div className="h-5 w-px bg-white/10" />
                        <button onClick={() => setIsConsoleOpen(true)} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 font-medium px-2 py-1 rounded-md hover:bg-red-500/10">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            1 error detected
                        </button>
                    </>
                )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 flex-1 justify-end">
                <span className="text-[12px] text-gray-500 font-mono hidden xl:inline">{saveStatus}</span>
                <button onClick={handleCopy} title="Copy Code" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                    <Copy size={15} /> <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button onClick={handleDownloadZip} title="Download as ZIP" disabled={isDownloading} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors disabled:opacity-50">
                    <Download size={15} /> <span>{isDownloading ? 'Zipping...' : 'Export Code'}</span>
                </button>
            </div>
        </header>

        <div className="builder-body-grid" style={{gridTemplateColumns: `${chatPanelGridClass} 2fr 2fr`}}>
            <ChatPanel 
              messages={messages}
              thinking={thinking}
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
              formatAIResponse={formatAIResponse}
              generationSteps={generationSteps}
              progressStep={progressStep}
              followUpSuggestions={followUpSuggestions}
              onSuggestionClick={onSuggestionClick}
              messagesEndRef={messagesEndRef}
              textareaRef={textareaRef}
              activeProject={activeProject}
              onExit={onExit}
              onRename={onRename}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
              toggleSidebar={toggleBuilderSidebar}
            />
            <CodePanel 
              code={code} 
              setCode={setCode} 
              isGenerating={isGenerating}
              editorRef={editorRef}
            />
            <div className="flex flex-col h-full overflow-hidden bg-[var(--bg)]">
                <div className="flex-1 min-h-0">
                    <PreviewPanel 
                      reloadKey={previewKey} 
                      code={debouncedCode}
                      isFullscreen={isFullscreen}
                      deviceMode={deviceMode}
                      isReloading={isReloading}
                      isRevealing={isRevealing}
                      onExitFullscreen={() => setIsFullscreen(false)}
                    />
                </div>
                <div className="flex-shrink-0 border-t border-[var(--border)]">
                     <ConsolePanel 
                        error={consoleError} 
                        isOpen={isConsoleOpen} 
                        setIsOpen={setIsConsoleOpen} 
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
