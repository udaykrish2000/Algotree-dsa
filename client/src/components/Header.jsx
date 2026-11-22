import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { DSA_TOPICS } from '../data/dsaRoadmap';
import { 
  GitFork, 
  Flame, 
  Trophy, 
  Search, 
  RotateCcw, 
  LayoutList, 
  Network,
  AlertCircle,
  GraduationCap
} from 'lucide-react';

export default function Header({ 
  viewMode, 
  setViewMode, 
  searchQuery, 
  setSearchQuery,
  difficultyFilter,
  setDifficultyFilter 
}) {
  const { 
    totalScore, 
    currentStreak, 
    completedTopics, 
    mistakes, 
    setIsMistakesOpen, 
    resetAllProgress 
  } = useProgress();

  const totalTopics = DSA_TOPICS.length;
  const completedCount = completedTopics.length;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Brand & Mobile Stats */}
        <div className="flex items-center justify-between w-full md:w-auto gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-bold shrink-0">
              <GitFork className="w-4 h-4 sm:w-5 sm:h-5 rotate-90" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent truncate">
                  AlgoTree
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                  DSA
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate">
                Chronological Roadmap & Adaptive Quiz
              </p>
            </div>
          </div>

          {/* Quick stats on mobile view */}
          <div className="flex items-center gap-1.5 md:hidden shrink-0">
            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2 py-1 rounded-lg text-xs font-semibold border border-amber-500/20">
              <Flame className="w-3 h-3 fill-amber-400" />
              <span>{currentStreak}</span>
            </div>
            <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg text-xs font-semibold border border-emerald-500/20">
              <Trophy className="w-3 h-3" />
              <span>{totalScore}</span>
            </div>
          </div>
        </div>

        {/* Search Bar - Full width on mobile, fixed width on desktop */}
        <div className="w-full md:w-64 lg:w-72 relative">
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search topics (e.g. Tree, O(1), Stack)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/80 hover:bg-slate-800 focus:bg-slate-950 text-xs text-slate-200 placeholder-slate-400 rounded-lg pl-8 sm:pl-9 pr-7 py-1.5 sm:py-2 border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200 p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* View Switcher, Stats & Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full md:w-auto">
          
          {/* Timeline vs Mindmap toggle */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700 text-xs shrink-0">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-medium transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutList className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Roadmap</span>
            </button>
            <button
              onClick={() => setViewMode('mindmap')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-medium transition-colors ${
                viewMode === 'mindmap'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Network className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Tree View</span>
            </button>
          </div>

          {/* Desktop Streak & Score Stats */}
          <div className="hidden md:flex items-center gap-2">
            <div 
              title="Current streak of correct answers"
              className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 text-amber-400 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{currentStreak} Streak</span>
            </div>

            <div 
              title="Total accumulated score"
              className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition"
            >
              <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              <span>{totalScore} pts</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Mistakes Notebook Button */}
            <button
              onClick={() => setIsMistakesOpen(true)}
              className="relative flex items-center gap-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-colors"
              title="Review questions answered incorrectly"
            >
              <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline">Mistakes</span>
              {mistakes.length > 0 && (
                <span className="bg-rose-500 text-white font-bold text-[9px] px-1.5 py-0.2 rounded-full">
                  {mistakes.length}
                </span>
              )}
            </button>

            {/* Reset progress */}
            <button
              onClick={resetAllProgress}
              title="Reset all progress and score"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Progress Bar */}
      <div className="max-w-7xl mx-auto mt-2 pt-1.5 sm:pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
        <div className="flex items-center gap-1.5 truncate">
          <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">
            Progress: <strong className="text-slate-200">{completedCount}/{totalTopics}</strong> Mastered ({progressPercent}%)
          </span>
        </div>
        <div className="w-24 sm:w-48 bg-slate-800 rounded-full h-1.5 sm:h-2 overflow-hidden shrink-0 border border-slate-700/60 ml-2">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
}
