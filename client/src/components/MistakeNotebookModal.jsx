import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { DSA_TOPICS } from '../data/dsaRoadmap';
import { 
  X, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Trash2,
  Brain
} from 'lucide-react';

export default function MistakeNotebookModal() {
  const { 
    mistakes, 
    clearMistake, 
    setIsMistakesOpen, 
    setQuizTopicId 
  } = useProgress();

  const getTopicTitle = (topicId) => {
    const t = DSA_TOPICS.find(item => item.id === topicId);
    return t ? t.title : topicId;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col text-slate-100">
        
        {/* Header */}
        <div className="p-3.5 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/95 sticky top-0 z-10 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-bold text-slate-100 text-xs sm:text-base truncate">
                  Mistake Notebook
                </h3>
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 shrink-0">
                  {mistakes.length} Logged
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 truncate">
                Review and re-test misconceptions until mastered
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMistakesOpen(false)}
            className="p-1 sm:p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-3 sm:space-y-4 divide-y divide-slate-800/80">
          {mistakes.length === 0 ? (
            <div className="py-12 sm:py-16 text-center">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400/80 mx-auto mb-2.5" />
              <h4 className="text-sm sm:text-base font-bold text-slate-200">
                No Mistakes Logged Yet!
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 px-4">
                When you practice questions, any missed questions will appear here with targeted rules so you can re-test and master them.
              </p>
            </div>
          ) : (
            mistakes.map((entry) => (
              <div key={entry.id} className="pt-3 sm:pt-4 first:pt-0 space-y-2.5 sm:space-y-3">
                
                {/* Topic Header & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-lg truncate max-w-full sm:max-w-xs">
                    {getTopicTitle(entry.topicId)}
                  </span>
                  
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => {
                        setIsMistakesOpen(false);
                        setQuizTopicId(entry.topicId);
                      }}
                      className="flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] sm:text-xs px-2.5 py-1 rounded-lg transition"
                    >
                      <Brain className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Re-test Topic</span>
                    </button>
                    
                    <button
                      onClick={() => clearMistake(entry.id)}
                      title="Dismiss from notebook"
                      className="p-1 text-slate-500 hover:text-rose-400 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Question */}
                <div className="text-xs sm:text-sm font-medium text-slate-200 bg-slate-950/60 p-2.5 sm:p-3 rounded-xl border border-slate-800 break-words">
                  {entry.question}
                  {entry.code && (
                    <pre className="mt-2 text-[11px] sm:text-xs font-mono text-emerald-300 bg-slate-950 p-2 rounded border border-slate-800/80 overflow-x-auto">
                      <code>{entry.code}</code>
                    </pre>
                  )}
                </div>

                {/* What you answered vs Correct answer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 sm:p-2.5 bg-rose-950/30 border border-rose-500/30 rounded-xl text-rose-300 break-words">
                    <div className="flex items-center gap-1 font-bold mb-1 text-rose-400 text-[11px]">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Your Pick:</span>
                    </div>
                    <span>{entry.userAnswer}</span>
                  </div>

                  <div className="p-2 sm:p-2.5 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-emerald-300 break-words">
                    <div className="flex items-center gap-1 font-bold mb-1 text-emerald-400 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Correct Answer:</span>
                    </div>
                    <span>{entry.correctAnswer}</span>
                  </div>
                </div>

                {/* Golden Rule */}
                {entry.rule && (
                  <div className="p-2 sm:p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2 break-words">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <strong className="text-amber-300">Takeaway Rule: </strong>
                      <span>{entry.rule}</span>
                    </div>
                  </div>
                )}

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
