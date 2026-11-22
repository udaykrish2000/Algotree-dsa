import React from 'react';
import { DSA_PHASES, DSA_TOPICS } from '../data/dsaRoadmap';
import TopicCard from './TopicCard';
import { 
  Milestone, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Filter
} from 'lucide-react';

export default function RoadmapView({ searchQuery, difficultyFilter, setDifficultyFilter }) {
  // Filter topics
  const filteredTopics = DSA_TOPICS.filter((topic) => {
    // Difficulty filter
    if (difficultyFilter !== 'All' && topic.difficulty !== difficultyFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = topic.title.toLowerCase().includes(q);
      const matchTagline = topic.tagline.toLowerCase().includes(q);
      const matchOverview = topic.overview.toLowerCase().includes(q);
      const matchBranches = topic.subBranches.some(b => 
        b.title.toLowerCase().includes(q) || b.content.toLowerCase().includes(q)
      );
      return matchTitle || matchTagline || matchOverview || matchBranches;
    }
    return true;
  });

  return (
    <div className="space-y-12">
      
      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-300">Filter by Difficulty:</span>
          <div className="flex items-center gap-1">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                  difficultyFilter === diff
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-800/60'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Showing <span className="font-bold text-slate-200">{filteredTopics.length}</span> of {DSA_TOPICS.length} Topics
        </div>
      </div>

      {/* Group by Phases in chronological sequence */}
      {DSA_PHASES.map((phase) => {
        const phaseTopics = filteredTopics.filter(t => t.phaseId === phase.id);

        if (phaseTopics.length === 0) return null;

        return (
          <section key={phase.id} className="relative">
            
            {/* Phase Header Banner */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 font-extrabold text-lg shadow-lg shadow-emerald-950/40 shrink-0">
                0{phase.number}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
                    Phase {phase.number} &bull; Chronological Sequence
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
                  {phase.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                  {phase.tagline}
                </p>
              </div>
            </div>

            {/* Topics Sequence with Visual Left Connector Line */}
            <div className="relative pl-4 sm:pl-6 border-l-2 border-slate-800 ml-6 space-y-6">
              {phaseTopics.map((topic, index) => (
                <div key={topic.id} className="relative">
                  {/* Step node dot on the connector line */}
                  <div className="absolute -left-[27px] sm:-left-[35px] top-6 w-3 h-3 rounded-full bg-slate-900 border-2 border-emerald-400 shadow-sm shadow-emerald-400/50" />
                  
                  {/* The Topic Card */}
                  <TopicCard topic={topic} />
                </div>
              ))}
            </div>

          </section>
        );
      })}

      {filteredTopics.length === 0 && (
        <div className="py-16 text-center bg-slate-900/40 rounded-3xl border border-slate-800">
          <p className="text-sm font-semibold text-slate-300">
            No topics matched your search "{searchQuery}"
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try searching for terms like "Array", "Binary Search", "Tree", or "O(1)".
          </p>
        </div>
      )}

    </div>
  );
}
