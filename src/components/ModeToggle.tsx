"use client"

import type { Dispatch, SetStateAction } from "react"

export default function ModeToggle({ mode, setMode }: {mode: string, setMode: Dispatch<SetStateAction<string>>}) {

  return (
    <div className="flex justify-center">
      
      <div className="flex bg-[#1c1c1f] rounded-xl p-1 border border-[#2a2a2e]">

        <button
          onClick={() => setMode("chat")}
          className={`px-4 py-2 rounded-lg text-sm transition ${
            mode === "chat"
              ? "bg-[#E91E63] text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Chat Mode
        </button>

        <button
          onClick={() => setMode("builder")}
          className={`px-4 py-2 rounded-lg text-sm transition ${
            mode === "builder"
              ? "bg-[#E91E63] text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Builder Mode
        </button>

      </div>

    </div>
  )
}
