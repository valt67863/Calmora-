
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Copy, Download, Wand2, RefreshCw, Maximize, Minimize,
  Save, Sparkles, Monitor, Tablet, Smartphone, X
} from 'lucide-react';

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
    ${code}
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

// Stripped down purely to editor container
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

// Stripped down purely to preview container
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

export default function BuilderPage({ onExit }: { onExit: () => void; }) {
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
    setTimeout(() => setPreviewKey(k => k + 1), 400);
    setTimeout(() => { setIsReloading(false); setIsRevealing(true); }, 800);
    setTimeout(() => setIsRevealing(false), 1200);
  };

  // Debounced Compilation Hook
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCode(code);
      setSaveStatus(isGenerating ? 'Saving...' : 'Auto-saved');
    }, 500);
    return () => clearTimeout(handler);
  }, [code, isGenerating]);

  return (
    <div className="w-full h-full flex flex-col bg-[var(--surface)] overflow-hidden">
        <header className="builder-header justify-between px-4">
            {/* Left: Device Toggles & Preview Controls */}
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
                    <button onClick={handleReload} title="Reload Preview" disabled={isReloading} className="flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50">
                        <RefreshCw size={16} className={isReloading ? "animate-spin" : ""} /> 
                    </button>
                    <button onClick={() => setIsFullscreen(!isFullscreen)} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"} className="flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                    </button>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                <span className="text-[12px] text-gray-500 font-mono hidden xl:inline">{saveStatus}</span>
                <button onClick={handleCopy} title="Copy Code" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                    <Copy size={15} /> <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button onClick={handleDownloadZip} title="Download as ZIP" disabled={isDownloading} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors disabled:opacity-50">
                    <Download size={15} /> <span>{isDownloading ? 'Zipping...' : 'Export Code'}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-1.5 text-[14px] font-medium bg-white text-black rounded-md hover:bg-gray-200 transition-colors">
                    Deploy
                </button>
            </div>
        </header>

        <div className="builder-body">
            <CodePanel 
              code={code} 
              setCode={setCode} 
              isGenerating={isGenerating}
              editorRef={editorRef}
            />
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
    </div>
  );
}
