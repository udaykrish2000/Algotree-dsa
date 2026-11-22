import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { getMasteryTier } from '../utils/questionGenerator';
import { 
  ChevronDown, 
  ChevronUp, 
  GitBranch, 
  Brain, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles,
  ArrowRight,
  Code2,
  AlertTriangle,
  Layers,
  Table
} from 'lucide-react';

export default function TopicCard({ topic }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('branches');
  const [codeLang, setCodeLang] = useState('python');

  const { 
    topicScores, 
    topicMastery, 
    completedTopics, 
    toggleTopicCompletion, 
    setQuizTopicId, 
    setActiveTopicId 
  } = useProgress();

  const score = topicScores[topic.id] || 0;
  const mastery = topicMastery[topic.id] || 0;
  const isCompleted = completedTopics.includes(topic.id);
  const masteryTier = getMasteryTier(mastery);

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Intermediate':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
      case 'Advanced':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  return (
    <div 
      className={`rounded-2xl border transition-all duration-300 relative overflow-hidden ${
        isCompleted
          ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 shadow-md'
      }`}
    >
      {/* Top Banner with Order and Meta */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          
          <div className="flex items-center gap-3">
            {/* Order index pill */}
            <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-emerald-400">
              #{topic.order < 10 ? `0${topic.order}` : topic.order}
            </span>

            {/* Title & Tagline */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                {topic.title}
                {isCompleted && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                {topic.tagline}
              </p>
            </div>
          </div>

          {/* Badges: Difficulty, Time, Mastery */}
          <div className="flex items-center flex-wrap gap-2">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getDifficultyColor(topic.difficulty)}`}>
              {topic.difficulty}
            </span>

            <span className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
              <Clock className="w-3 h-3 text-slate-400" />
              {topic.estimatedHours}
            </span>

            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${masteryTier.color}`}>
              {masteryTier.label} ({mastery}%)
            </span>
          </div>
        </div>

        {/* Overview text */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          {topic.overview}
        </p>

        {/* Sub-branches preview tags */}
        <div className="flex items-center flex-wrap gap-1.5 mb-5">
          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mr-1">
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            Sub-branches:
          </span>
          {topic.subBranches.map((branch) => (
            <button
              key={branch.id}
              onClick={() => {
                setIsExpanded(true);
                setActiveTab('branches');
              }}
              className="text-[11px] bg-slate-800/90 hover:bg-slate-750 hover:text-emerald-300 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/80 transition-colors"
            >
              {branch.title}
            </button>
          ))}
        </div>

        {/* Card Action Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
          
          {/* Left action: Topic Mastery & Score */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Score:</span>
              <span className="font-mono font-bold text-emerald-400">{score} pts</span>
            </div>

            {/* Completion checkbox toggle */}
            <button
              onClick={() => toggleTopicCompletion(topic.id)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
              ) : (
                <Circle className="w-4 h-4 text-slate-500" />
              )}
              <span>{isCompleted ? 'Completed' : 'Mark Completed'}</span>
            </button>
          </div>

          {/* Right action buttons: Quiz & Expand */}
          <div className="flex items-center gap-2">
            
            {/* Launch Practice Questions */}
            <button
              onClick={() => setQuizTopicId(topic.id)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl shadow-md shadow-emerald-500/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Brain className="w-4 h-4" />
              <span>Practice Questions (Beginner)</span>
            </button>

            {/* Expand / Collapse In-Place */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-slate-100 text-xs px-3 py-2 rounded-xl border border-slate-700 transition"
              title={isExpanded ? 'Collapse sub-branches' : 'Deep dive into sub-branches'}
            >
              <span>{isExpanded ? 'Collapse' : 'Deep Dive'}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Sub-Branches & Deep-Dive Section */}
      {isExpanded && (
        <div className="border-t border-slate-800 bg-slate-950/60 p-5 sm:p-6 transition-all duration-300">
          
          {/* Sub-Branch Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-5 overflow-x-auto">
            <button
              onClick={() => setActiveTab('branches')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'branches'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              Sub-Branches ({topic.subBranches.length})
            </button>

            {topic.complexityTable && (
              <button
                onClick={() => setActiveTab('complexity')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'complexity'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                Complexity Cheatsheet
              </button>
            )}

            {topic.codeExamples && (
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'code'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Code Templates
              </button>
            )}
          </div>

          {/* TAB 1: Sub-branches cards */}
          {activeTab === 'branches' && (
            <div className="space-y-4">
              {topic.subBranches.map((branch, idx) => (
                <div 
                  key={branch.id} 
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-200">
                      {branch.title}
                    </h4>
                  </div>
                  <p className="text-xs text-emerald-400/90 font-medium mb-2.5">
                    💡 {branch.summary}
                  </p>
                  <div className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                    {branch.content}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Complexity Table */}
          {activeTab === 'complexity' && topic.complexityTable && (
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800/80 text-slate-200 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-700">
                  <tr>
                    {topic.complexityTable.headers.map((h, i) => (
                      <th key={i} className="py-2.5 px-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {topic.complexityTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-800/40 transition">
                      {row.map((cell, cIdx) => (
                        <td 
                          key={cIdx} 
                          className={`py-2.5 px-3 font-mono text-[11px] ${
                            cIdx === 0 ? 'font-bold text-emerald-400' : 'text-slate-300'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: Code Examples */}
          {activeTab === 'code' && topic.codeExamples && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                {Object.keys(topic.codeExamples).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCodeLang(lang)}
                    className={`text-xs font-semibold px-3 py-1 rounded-lg uppercase tracking-wider transition ${
                      codeLang === lang
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                <code>{topic.codeExamples[codeLang]}</code>
              </pre>
            </div>
          )}

          {/* Direct CTA at bottom of sub-branches */}
          <div className="mt-5 p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Ready to test your intuition on <strong>{topic.title}</strong>?</span>
            </div>
            <button
              onClick={() => setQuizTopicId(topic.id)}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg shadow transition"
            >
              <span>Start Beginner Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
