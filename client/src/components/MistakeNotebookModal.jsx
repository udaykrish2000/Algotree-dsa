import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { DSA_TOPICS } from '../data/dsaRoadmap';
import { 
  X, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCw, 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col text-slate-100">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/95 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-100 text-base">
                  Mistake Notebook & Review Center
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  {mistakes.length} Logged
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Review your misconceptions and re-test until mastered
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMistakesOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-4 divide-y divide-slate-800/80">
          {mistakes.length === 0 ? (
            <div className="py-16 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400/80 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-200">
                No Mistakes Logged Yet!
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                When you practice questions, any missed questions will appear here with targeted rules so you can re-test and master them.
              </p>
            </div>
          ) : (
            mistakes.map((entry) => (
              <div key={entry.id} className="pt-4 first:pt-0 space-y-3">
                
                {/* Topic Header & Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-lg">
                    {getTopicTitle(entry.topicId)}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsMistakesOpen(false);
                        setQuizTopicId(entry.topicId);
                      }}
                      className="flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-lg transition"
                    >
                      <Brain className="w-3.5 h-3.5" />
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
                <div className="text-xs sm:text-sm font-medium text-slate-200 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {entry.question}
                  {entry.code && (
                    <pre className="mt-2 text-xs font-mono text-emerald-300 bg-slate-950 p-2 rounded border border-slate-800/80 overflow-x-auto">
                      <code>{entry.code}</code>
                    </pre>
                  )}
                </div>

                {/* What you answered vs Correct answer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-rose-950/30 border border-rose-500/30 rounded-xl text-rose-300">
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-rose-400">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Your Pick:</span>
                    </div>
                    <span>{entry.userAnswer}</span>
                  </div>

                  <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-emerald-300">
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Correct Answer:</span>
                    </div>
                    <span>{entry.correctAnswer}</span>
                  </div>
                </div>

                {/* Golden Rule */}
                {entry.rule && (
                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
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
