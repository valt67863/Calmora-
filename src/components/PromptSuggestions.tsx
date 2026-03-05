
'use client';

export default function PromptSuggestions({ setPrompt }: { setPrompt: (prompt: string) => void }) {

const suggestions = [
"Create SaaS landing page",
"Build AI startup homepage",
"Make portfolio website",
"Create product landing page"
]

return (

<div className="w-full max-w-[600px] mx-auto">
    <div className="flex flex-wrap justify-center gap-2.5">

    {suggestions.map((text,index)=>(
    <button
        key={index}
        onClick={()=>setPrompt(text)}
        className="px-4 py-2 text-sm rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] transition-all"
    >
        {text}
    </button>
    ))}

    </div>
</div>

)
}
