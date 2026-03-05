
'use client';

export default function PromptSuggestions({ setPrompt }: { setPrompt: (prompt: string) => void }) {

const suggestions = [
"Create SaaS landing page",
"Build AI startup homepage",
"Make portfolio website",
"Create product landing page"
]

return (

<div className="flex flex-wrap justify-center gap-2 mt-4">

{suggestions.map((text,index)=>(
<button
key={index}
onClick={()=>setPrompt(text)}
className="px-4 py-2 text-sm rounded-full bg-[#1e1e22] border border-[#2b2b2f] text-gray-300 hover:border-[#E91E63] hover:text-white transition"
>
{text}
</button>
))}

</div>

)
}
