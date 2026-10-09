import React from 'react';
import { Search, Sparkles, Terminal, Shield, Menu } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAiTutor: () => void;
  onToggleTerminal: () => void;
  onToggleMobileSidebar: () => void;
  overallPercentage: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAiTutor,
  onToggleTerminal,
  onToggleMobileSidebar,
  overallPercentage,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-600/30">
            KC
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight leading-tight flex items-center gap-1.5">
              <span>KernelCraft</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-semibold">
                ACADEMY
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Computer Science · Linux · Networking · Cybersecurity
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs rounded-lg border border-slate-800 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Search curriculum & commands...</span>
          <kbd className="hidden sm:inline text-[10px] font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 text-slate-500">
            Ctrl+K
          </kbd>
        </button>

        {/* Quick Terminal Launcher */}
        <button
          onClick={onToggleTerminal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 transition-colors"
          title="Toggle Sandbox Terminal"
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Terminal</span>
        </button>

        {/* AI Mentor Launcher */}
        <button
          onClick={onOpenAiTutor}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 text-xs font-semibold rounded-lg border border-indigo-800 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">AI Mentor</span>
        </button>

        {/* Progress Badge */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Progress:</span>
          <span className="text-indigo-400 font-bold">{overallPercentage}%</span>
        </div>
      </div>
    </header>
  );
};
