import React, { useState } from 'react';
import { DSA_PHASES, DSA_TOPICS } from '../data/dsaRoadmap';
import { useProgress } from '../context/ProgressContext';
import { getMasteryTier } from '../utils/questionGenerator';
import { 
  Network, 
  ChevronRight, 
  ChevronDown, 
  GitBranch, 
  Brain, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function MindmapView() {
  const [expandedPhases, setExpandedPhases] = useState(['phase-1']);
  const [expandedTopic, setExpandedTopic] = useState('big-o-complexity');

  const { 
    topicMastery, 
    completedTopics, 
    setQuizTopicId 
  } = useProgress();

  const togglePhase = (phaseId) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) ? prev.filter(p => p !== phaseId) : [...prev, phaseId]
    );
  };

  const selectedTopicData = DSA_TOPICS.find(t => t.id === expandedTopic) || DSA_TOPICS[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Mindmap Instructions Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Network className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="text-sm font-bold text-slate-100">
              Interactive DSA Mind-Map Tree
            </h3>
            <p className="text-xs text-slate-400">
              Explore the entire hierarchical branch tree. Click any branch to see deep-dive cards and launch adaptive quizzes.
            </p>
          </div>
        </div>
      </div>

      {/* Main Mindmap Grid: Tree Navigation Left + Active Topic Inspector Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: The Hierarchical Tree Navigator */}
        <div className="lg:col-span-5 space-y-3">
          
          {/* Root Node */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 border border-emerald-500/30 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
              DSA
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-100">
                DSA Mastery Root
              </span>
              <p className="text-[11px] text-slate-400">
                6 Chronological Phases &bull; 23 Curated Topics
              </p>
            </div>
          </div>

          {/* Phases Nodes */}
          <div className="pl-4 border-l-2 border-slate-800 space-y-3 ml-4">
            {DSA_PHASES.map((phase) => {
              const isPhaseOpen = expandedPhases.includes(phase.id);
              const phaseTopics = DSA_TOPICS.filter(t => t.phaseId === phase.id);

              return (
                <div key={phase.id} className="space-y-2">
                  
                  {/* Phase Branch Header */}
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-[10px]">
                        {phase.number}
                      </span>
                      <span className="text-xs font-bold text-slate-200">
                        {phase.title}
                      </span>
                    </div>

                    {isPhaseOpen ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {/* Child Topics of this Phase */}
                  {isPhaseOpen && (
                    <div className="pl-4 border-l-2 border-emerald-500/30 space-y-1.5 ml-3">
                      {phaseTopics.map((topic) => {
                        const isSelected = expandedTopic === topic.id;
                        const isCompleted = completedTopics.includes(topic.id);
                        const mastery = topicMastery[topic.id] || 0;

                        return (
                          <button
                            key={topic.id}
                            onClick={() => setExpandedTopic(topic.id)}
                            className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition ${
                              isSelected
                                ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold'
                                : 'bg-slate-900/40 hover:bg-slate-800/80 border border-slate-800/80 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] text-slate-500">
                                #{topic.order < 10 ? `0${topic.order}` : topic.order}
                              </span>
                              <span className="truncate">{topic.title}</span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {isCompleted && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                              <span className="text-[10px] font-mono text-slate-400">
                                {mastery}%
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

        {/* RIGHT COLUMN: Active Topic Branch Inspector */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sticky top-20 shadow-xl space-y-6">
          
          {/* Header of selected topic */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  Topic #{selectedTopicData.order}
                </span>
                <span className="text-xs text-slate-400">
                  {selectedTopicData.difficulty} &bull; {selectedTopicData.estimatedHours}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-100 mt-1">
                {selectedTopicData.title}
              </h3>
            </div>

            <button
              onClick={() => setQuizTopicId(selectedTopicData.id)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition"
            >
              <Brain className="w-4 h-4" />
              <span>Practice Questions (Beginner)</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedTopicData.overview}
          </p>

          {/* Sub-branches visual breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
              <GitBranch className="w-4 h-4" />
              Sub-Branches ({selectedTopicData.subBranches.length})
            </h4>

            <div className="space-y-3">
              {selectedTopicData.subBranches.map((branch, idx) => (
                <div 
                  key={branch.id} 
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <strong className="text-slate-200">{branch.title}</strong>
                  </div>
                  <p className="text-emerald-400/90 font-medium text-[11px]">
                    💡 {branch.summary}
                  </p>
                  <p className="text-slate-400 whitespace-pre-line leading-relaxed text-[11px] pt-1">
                    {branch.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Complexity preview */}
          {selectedTopicData.complexityTable && (
            <div className="p-3.5 bg-slate-950/40 rounded-xl border border-slate-800">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Operations Complexity Quick View
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedTopicData.complexityTable.rows.slice(0, 4).map((r, i) => (
                  <div key={i} className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-[11px]">
                    <span className="text-slate-400 block truncate">{r[0]}</span>
                    <span className="font-mono font-bold text-emerald-400">{r[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
