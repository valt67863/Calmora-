'use client';

import { ArrowUpRight, CornerUpLeft } from "lucide-react"

export default function PromptSuggestionList({ suggestions, onSelect }: { suggestions: string[], onSelect: (prompt: string) => void }) {
  return (
    <div className="w-full max-w-xl mx-auto mt-3 bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden shadow-lg animate-in fade-in-0 slide-in-from-top-2 duration-200">
      {suggestions.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect(item)}
          className="flex items-center justify-between w-full px-4 py-3 hover:bg-[var(--surface-hover)] transition-colors text-left"
        >
          <div className="flex items-center gap-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
            <ArrowUpRight size={16} />
            <span className="text-[var(--text-primary)] font-sans text-sm">{item}</span>
          </div>
          <CornerUpLeft size={16} className="text-[var(--text-tertiary)]" />
        </button>
      ))}
    </div>
  )
}
