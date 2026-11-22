import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { DSA_TOPICS } from '../data/dsaRoadmap';
import { 
  GitFork, 
  Flame, 
  Trophy, 
  BookOpen, 
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
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-bold">
              <GitFork className="w-5 h-5 rotate-90" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                  AlgoTree
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  DSA Chronological
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Interactive Branch Roadmap & Adaptive Beginner Quiz Engine
              </p>
            </div>
          </div>

          {/* Quick stats on mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-semibold border border-amber-500/20">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>{currentStreak}</span>
            </div>
            <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg text-xs font-semibold border border-emerald-500/20">
              <Trophy className="w-3.5 h-3.5" />
              <span>{totalScore}</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search topics (e.g. Tree, O(1), Stack)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/80 hover:bg-slate-800 focus:bg-slate-950 text-xs text-slate-200 placeholder-slate-400 rounded-lg pl-9 pr-4 py-2 border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* View Switcher, Stats & Actions */}
        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
          
          {/* Timeline vs Mindmap toggle */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Roadmap</span>
            </button>
            <button
              onClick={() => setViewMode('mindmap')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                viewMode === 'mindmap'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Tree View</span>
            </button>
          </div>

          {/* Desktop Streak & Score Stats */}
          <div className="hidden md:flex items-center gap-2">
            <div 
              title="Current streak of correct answers"
              className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 text-amber-400 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition"
            >
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{currentStreak} Streak</span>
            </div>

            <div 
              title="Total accumulated score"
              className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition"
            >
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>{totalScore} pts</span>
            </div>
          </div>

          {/* Mistakes Notebook Button */}
          <button
            onClick={() => setIsMistakesOpen(true)}
            className="relative flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            title="Review questions answered incorrectly"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Mistakes</span>
            {mistakes.length > 0 && (
              <span className="ml-1 bg-rose-500 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                {mistakes.length}
              </span>
            )}
          </button>

          {/* Reset progress */}
          <button
            onClick={resetAllProgress}
            title="Reset all progress and score"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Secondary Progress Bar */}
      <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span>Curriculum Progress:</span>
          <span className="font-semibold text-slate-200">
            {completedCount} of {totalTopics} Topics Mastered ({progressPercent}%)
          </span>
        </div>
        <div className="w-48 bg-slate-800 rounded-full h-2 overflow-hidden hidden sm:block border border-slate-700/60">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
}
