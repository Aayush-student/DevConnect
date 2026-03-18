import React from "react";
import { Loader2, Sparkles, Trash2, Save } from "lucide-react";

const Header = ({ isAiLoading, askAI, saveWorkspace, isAuthor, onClear }) => {
  const handleClear = () => {
    const confirmClear = window.confirm("Wipe editor for everyone?");
    if (confirmClear) onClear();
  };

  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-[#0B0E14]">
      
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest tabular-nums">
          Workspace / main.js
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-3">

        {isAuthor && (
          <button
            onClick={handleClear}
            title="Clear Workspace"
            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg border border-red-500/20 transition-all cursor-pointer"
          >
            <Trash2 size={14} />
          </button>
        )}

        <button
          onClick={saveWorkspace}
          className="bg-white/5 hover:bg-white/10 text-white px-3 md:px-4 py-2 rounded-lg text-[9px] md:text-[10px] font-black uppercase border border-white/10 flex items-center gap-1 md:gap-2 transition-all cursor-pointer"
        >
          <Save size={12} />
          <span className="hidden sm:inline">Save</span>
        </button>

        <button
          onClick={askAI}
          disabled={isAiLoading}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 md:px-6 py-2 rounded-lg text-[9px] md:text-[10px] font-black uppercase flex items-center gap-1 md:gap-2 disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-indigo-500/10"
        >
          {isAiLoading ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              <span className="hidden sm:inline">Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles size={12} />
              <span className="hidden sm:inline">Ask AI</span>
            </>
          )}
        </button>

      </div>
    </header>
  );
};

export default Header;