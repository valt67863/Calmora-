
'use client';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Copy, Download, Wand2, RefreshCw, Maximize, Minimize,
  Save, Sparkles, Monitor, Tablet, Smartphone, X, Lightbulb, XCircle,
  AlertCircle, ChevronDown, ChevronUp, Undo, Redo, Loader2,
  ArrowLeft, MoreHorizontal, Edit3, Trash2, Send, CheckCircle2, Circle, Zap, Mic, Menu,
  Split, Code2, Eye, Rocket
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
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontLigatures: true,
        minimap: { enabled: false },
        lineNumbers: "on",
        lineNumbersMinChars: 3,
        lineHeight: 24,
        padding: { top: 24, bottom: 24 },
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
  }, [onChange, readOnly, value]);

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
  messages, thinking, input, setInput, sendMessage, formatAIResponse, generationSteps, progressStep,
  messagesEndRef, textareaRef, chipSuggestions, onSuggestionClick, onExit, activeProject, onRename, onDuplicate, onDelete
}) {
  const [chatStage, setChatStage] = useState('new-chat');
  const [showBuilderMenu, setShowBuilderMenu] = useState(false);
  const builderMenuRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking, messagesEndRef]);

  useEffect(() => {
    if (messages.length > 0 && chatStage === 'new-chat') {
        setChatStage('active');
    }
  }, [messages, chatStage]);
  
  useLayoutEffect(() => {
    const chatInput = textareaRef.current;
    if (chatInput) {
      chatInput.style.height = "auto";
      chatInput.style.height = `${Math.min(chatInput.scrollHeight, 160)}px`;
    }
  }, [input, textareaRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (builderMenuRef.current && !(builderMenuRef.current as any).contains(event.target)) {
        setShowBuilderMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="builder-chat-panel">
      <header className="builder-chat-header">
        <div className="flex items-center gap-2 flex-1 justify-start min-w-0">
          <button onClick={onExit} title="Exit Builder" className="control-button -ml-2">
              <ArrowLeft size={18} />
          </button>
          <div className="h-5 w-px bg-white/10" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-medium text-white truncate">{activeProject?.title || "Untitled Project"}</span>
            <div className="relative" ref={builderMenuRef}>
              <button onClick={() => setShowBuilderMenu(v => !v)} title="Options" className="control-button" disabled={!activeProject}>
                <MoreHorizontal size={18} />
              </button>
              {showBuilderMenu && activeProject && (
                <div className="menu-pop animate-pop-in" style={{ left: 0, right: 'auto', top: 'calc(100% + 8px)', width: '220px' }}>
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
        </div>
      </header>

      <div className="flex-1 min-h-0 relative flex flex-col">
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
          <div ref={messagesEndRef} className="h-24" />
        </div>
        
        <div className={`chat-input-layer ${chatStage === 'new-chat' ? 'home-mode' : ''} !relative !bottom-0 !left-0 !transform-none !max-w-none !p-4`}>
          {chatStage === 'new-chat' && !input && (
            <div className="mb-4">
              <PromptSuggestions suggestions={chipSuggestions} setPrompt={onSuggestionClick} />
            </div>
          )}
          <div className="chat-input-surface">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder={"Ask a follow-up or give a new instruction..."}
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
        </div>
      </div>
    </div>
  );
}

const CodePanel = React.forwardRef(({ code, onChange, readOnly }, ref) => (
  <div className="code-panel">
    <MonacoEditor
      ref={ref}
      value={code}
      onChange={onChange}
      readOnly={readOnly}
    />
  </div>
));
CodePanel.displayName = 'CodePanel';

function PreviewPanel({ code, reloadKey, deviceMode, isReloading, isRevealing }) {
  const sandboxDoc = generateSandboxDoc(code);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const panelContent = (
    <div className={`preview-panel`}>
      <style>{`
        @keyframes previewLoad { 0% { width: 0%; } 40% { width: 60%; } 80% { width: 85%; } 100% { width: 100%; } }
        @keyframes shine { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes previewReveal { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .preview-loading-bar { position: absolute; top: 0; left: 0; height: 2px; background: linear-gradient(90deg, #f43f5e, #fb7185, #f43f5e); background-size: 200% 100%; animation: previewLoad 0.8s ease forwards, shine 1s linear infinite; z-index: 50; }
        .preview-reveal { animation: previewReveal 0.35s ease forwards; }
        @keyframes skeletonLoading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .skeleton { background: linear-gradient(90deg, #1f1f23 25%, #353540 50%, #1f1f23 75%); background-size: 400% 100%; animation: skeletonLoading 1.5s ease-in-out infinite; }
      `}</style>
      
      {isReloading && <div className="preview-loading-bar" />}

      <div className="flex-1 bg-[#0f0f12] overflow-hidden flex justify-center items-center relative">
        <div className={`relative h-full transition-all duration-300 ease-in-out ${deviceMode === 'Mobile' ? 'w-[375px] max-w-full border-x border-white/10' : deviceMode === 'Tablet' ? 'w-[768px] max-w-full border-x border-white/10' : 'w-full'}`}>
          <iframe key={reloadKey} title="preview" srcDoc={sandboxDoc} className={`preview-frame ${isRevealing ? 'preview-reveal' : ''}`} sandbox="allow-scripts allow-modals allow-forms allow-same-origin" />
        </div>
      </div>
    </div>
  );

  return panelContent;
}

function ConsolePanel({ error, isOpen, setIsOpen }) {
  const getTime = () => new Date().toLocaleTimeString('en-US', { hour12: false });

  return (
      <div className="console">
          <div className="console-header">
              Console
          </div>
          <div className="console-logs">
              {error ? (
                  <div className="log error">
                      Error: {error.message}
                  </div>
              ) : (
                  <div className="log">
                      Build successful. Live preview is active.
                  </div>
              )}
          </div>
      </div>
  );
}

function OutputHeader({
  viewMode, setViewMode, deviceMode, setDeviceMode, onReload, onCopy, copied, onExport, isDownloading, error, onDeploy, saveStatus
}) {
  return (
    <div className="output-header">
      <div className="flex items-center gap-4">
        <div className="device-switch">
          {[{mode: 'Desktop', icon: Monitor}, {mode: 'Tablet', icon: Tablet}, {mode: 'Mobile', icon: Smartphone}].map(item => (
            <button key={item.mode} onClick={() => setDeviceMode(item.mode)} className={deviceMode === item.mode ? 'active' : ''}>
              <item.icon size={16} />
            </button>
          ))}
        </div>

        <div className="view-switch">
          {[{mode: 'code', icon: Code2}, {mode: 'preview', icon: Eye}, {mode: 'split', icon: Split}].map(item => (
            <button key={item.mode} onClick={() => setViewMode(item.mode)} className={viewMode === item.mode ? 'active' : ''}>
              <item.icon size={16} />
            </button>
          ))}
        </div>
      </div>

      <div className="output-actions">
        {error ? (
          <span className="status error">1 error detected</span>
        ) : (
          <span className="status">Live preview</span>
        )}
        <span className="status !hidden md:!flex">{saveStatus}</span>
        
        <button onClick={onReload}><RefreshCw size={14}/></button>
        <button onClick={onCopy}><Copy size={14}/> {copied ? 'Copied!' : 'Copy'}</button>
        <button onClick={onExport} disabled={isDownloading}><Download size={14}/> {isDownloading ? 'Exporting...' : 'Export'}</button>

        <button className="deploy-btn" onClick={onDeploy}>
          <Rocket size={14}/> Deploy
        </button>
      </div>
    </div>
  );
}

function OutputWorkspace({
  code, setCode, isGenerating, debouncedCode, previewKey,
  setPreviewKey, isReloading, setIsReloading, isRevealing,
  setIsRevealing, consoleError, setConsoleError, handleCopy, copied,
  handleDownloadZip, isDownloading, saveStatus
}) {
  const [viewMode, setViewMode] = useState('split');
  const [deviceMode, setDeviceMode] = useState('Desktop');
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const editorRef = useRef(null);

  const handleReload = () => {
    if (isReloading) return;
    setIsReloading(true);
    setIsRevealing(false);
    setConsoleError(null);
    setTimeout(() => setPreviewKey(k => k + 1), 400);
    setTimeout(() => { setIsReloading(false); setIsRevealing(true); }, 800);
    setTimeout(() => setIsRevealing(false), 1200);
  };
  
  const handleFormat = () => {
    if (editorRef.current) {
      (editorRef.current as any).format();
    }
  };

  return (
    <div className="builder-workspace">
      <OutputHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        onReload={handleReload}
        onCopy={handleCopy}
        copied={copied}
        onExport={handleDownloadZip}
        isDownloading={isDownloading}
        error={consoleError}
        onDeploy={() => {}}
        saveStatus={saveStatus}
      />
      <div className="workspace-panels">
        <div className={`panel code-panel ${viewMode === "preview" ? "hidden" : ""}`}>
          <CodePanel
            ref={editorRef}
            code={code}
            onChange={setCode}
            readOnly={isGenerating}
          />
        </div>
        <div className={`panel preview-panel-wrapper ${viewMode === "code" ? "hidden" : ""}`}>
          <PreviewPanel
            code={debouncedCode}
            reloadKey={previewKey}
            deviceMode={deviceMode}
            isReloading={isReloading}
            isRevealing={isRevealing}
          />
        </div>
      </div>
      <ConsolePanel
        error={consoleError}
        isOpen={isConsoleOpen}
        setIsOpen={setIsConsoleOpen}
      />
    </div>
  );
}


export default function BuilderPage({ 
  onExit, activeProject, onRename, onDuplicate, onDelete, messages, thinking, input, setInput, sendMessage,
  formatAIResponse, generationSteps, progressStep, onSuggestionClick, messagesEndRef, textareaRef, chipSuggestions
}) {
  const [code, setCode] = useState(initialCode);
  const [debouncedCode, setDebouncedCode] = useState(initialCode);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Auto-saved');

  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [isReloading, setIsReloading] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  
  const [consoleError, setConsoleError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
        setConsoleError({ message: "React hook cannot be used in a server component." });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
      zip.file("package.json", JSON.stringify({ name: "calmora-project", type: "module", scripts: { dev: "vite", build: "vite build" }, dependencies: { react: "^18.2.0", "react-dom": "^18.2.0" }, devDependencies: { "@vitejs/plugin-react": "^4.2.1", autoprefixer: "^10.4.18", postcss: "^8.4.35", tailwindcss: "^3.4.1", vite: "^5.1.4" } }, null, 2));
      zip.file("tailwind.config.js", `export default { content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], theme: { extend: {} }, plugins: [] }`);
      zip.file("postcss.config.js", `export default { plugins: { tailwindcss: {}, autoprefixer: {} } }`);
      zip.file("index.html", `<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8" /><title>Calmora Project</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`);
      
      const src = zip.folder("src");
      src.file("main.jsx", `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.jsx'\nimport './index.css'\nReactDOM.createRoot(document.getElementById('root')).render(<App />)`);
      src.file("index.css", `@tailwind base;\n@tailwind components;\n@tailwind utilities;\nbody { @apply bg-black text-white; }`);
      src.file("App.jsx", exportCode);

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "calmora-project.zip";
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCode(code);
      setSaveStatus(isGenerating ? 'Saving...' : 'Auto-saved');
    }, 500);
    return () => clearTimeout(handler);
  }, [code, isGenerating]);
  
  return (
    <div className="builder-window animating-in">
        <div className="builder-body-grid">
            <ChatPanel 
              messages={messages} thinking={thinking} input={input} setInput={setInput}
              sendMessage={sendMessage} formatAIResponse={formatAIResponse}
              generationSteps={generationSteps} progressStep={progressStep}
              messagesEndRef={messagesEndRef} textareaRef={textareaRef}
              chipSuggestions={chipSuggestions} onSuggestionClick={onSuggestionClick}
              onExit={onExit} activeProject={activeProject} onRename={onRename}
              onDuplicate={onDuplicate} onDelete={onDelete}
            />
            <OutputWorkspace
              code={code} setCode={setCode} isGenerating={isGenerating} debouncedCode={debouncedCode}
              previewKey={previewKey} setPreviewKey={setPreviewKey}
              isReloading={isReloading} setIsReloading={setIsReloading}
              isRevealing={isRevealing} setIsRevealing={setIsRevealing}
              consoleError={consoleError} setConsoleError={setConsoleError}
              handleCopy={handleCopy} copied={copied}
              handleDownloadZip={handleDownloadZip} isDownloading={isDownloading}
              saveStatus={saveStatus}
            />
        </div>
    </div>
  );
}
