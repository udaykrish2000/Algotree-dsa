import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { 
  Sparkles, 
  GitBranch, 
  Brain, 
  Target, 
  CheckCircle2, 
  Flame, 
  GraduationCap,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function WelcomeHero({ onStartBeginner }) {
  const { totalScore, currentStreak, completedTopics } = useProgress();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 mb-8 shadow-2xl">
      {/* Background glow effects */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Column: Heading & Value Prop */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DSA Chronological Learning Engine &bull; Beginner-Friendly</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100 leading-tight">
            Master Data Structures & Algorithms{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              Branch by Branch
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
            Follow the optimal chronological path from absolute fundamentals to advanced paradigms. 
            Click any topic to expand deep sub-branches (ELI5 intuition, memory diagrams, complexity, traps), 
            and reinforce your understanding with our <strong>adaptive beginner quiz engine</strong> that re-tests you until you achieve mastery.
          </p>

          {/* Value props pills */}
          <div className="flex flex-wrap gap-2.5 mt-5">
            <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
              <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
              Chronological & Expandable
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
              <Brain className="w-3.5 h-3.5 text-teal-400" />
              Adaptive Re-testing Engine
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
              <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
              ELI5 Intuition First
            </span>
          </div>
        </div>

        {/* Right Column: Quick Status Card & Direct CTA */}
        <div className="w-full lg:w-auto shrink-0 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/90 shadow-xl flex flex-col gap-4 min-w-[280px]">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Your Current Level</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              DSA Novice (Phase 1)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Streak</span>
              </div>
              <p className="text-lg font-mono font-bold text-amber-400 mt-1">
                {currentStreak}
              </p>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>Score</span>
              </div>
              <p className="text-lg font-mono font-bold text-emerald-400 mt-1">
                {totalScore} pts
              </p>
            </div>
          </div>

          <button
            onClick={onStartBeginner}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs px-4 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start with Topic #01 (Big-O)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
}
