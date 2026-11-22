import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useProgress } from '../context/ProgressContext';
import { DSA_TOPICS } from '../data/dsaRoadmap';
import { 
  getQuestionsForTopic, 
  generateAdaptiveReinforcementQuestion, 
  getMasteryTier 
} from '../utils/questionGenerator';
import { 
  X, 
  Brain, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  RotateCw, 
  ArrowRight, 
  Sparkles, 
  Lightbulb, 
  AlertTriangle,
  BookOpen
} from 'lucide-react';

export default function QuizModal({ topicId, onClose }) {
  const topic = DSA_TOPICS.find(t => t.id === topicId) || DSA_TOPICS[0];
  
  const { 
    topicScores, 
    topicMastery, 
    currentStreak, 
    recordAnswer 
  } = useProgress();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lastEarned, setLastEarned] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);
  const [sessionTotalCount, setSessionTotalCount] = useState(0);

  // Load questions when topic changes or user regenerates
  const loadQuestions = () => {
    const list = getQuestionsForTopic(topic.id, 4);
    setQuestions(list);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setQuizCompleted(false);
  };

  useEffect(() => {
    loadQuestions();
  }, [topicId]);

  const currentQ = questions[currentIndex];
  const topicScore = topicScores[topic.id] || 0;
  const topicMasteryPercent = topicMastery[topic.id] || 0;
  const masteryTier = getMasteryTier(topicMasteryPercent);

  // Handle option selection
  const handleSelectOption = (index) => {
    if (isAnswered) return; // Prevent double clicking

    setSelectedOption(index);
    setIsAnswered(true);

    const correct = index === currentQ.correctIndex;
    setIsCorrect(correct);

    // Record answer in context
    const { scoreDelta } = recordAnswer({
      topicId: topic.id,
      question: currentQ,
      selectedIndex: index,
      isCorrect: correct
    });

    setLastEarned(scoreDelta);
    setSessionTotalCount(prev => prev + 1);

    if (correct) {
      setSessionCorrectCount(prev => prev + 1);
      // Trigger confetti celebration!
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  // Next question
  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setQuizCompleted(true);
    }
  };

  // The Core Requested Feature: Regenerate targeted reinforcement question on wrong answer!
  const handleRegenerateReinforcement = () => {
    const reinforcementQuestion = generateAdaptiveReinforcementQuestion(currentQ, topic.id);
    // Replace current question or insert next to re-test immediately!
    const newQuestions = [...questions];
    newQuestions.splice(currentIndex + 1, 0, reinforcementQuestion);
    setQuestions(newQuestions);
    setCurrentIndex(prev => prev + 1);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  if (!currentQ && !quizCompleted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-slate-100">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-100 text-sm sm:text-base">
                  {topic.title}
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Beginner Practice
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Step-by-step intuition testing & adaptive re-testing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Topic Score & Streak */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
              <span className="text-slate-400">Topic Score:</span>
              <span className="font-mono font-bold text-emerald-400">{topicScore}</span>
              <span className="text-slate-600">|</span>
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-amber-400">{currentStreak}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* QUIZ COMPLETION SUMMARY */}
        {quizCompleted ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-extrabold text-slate-100">
                Practice Session Complete!
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                You tackled {sessionTotalCount} questions on <strong>{topic.title}</strong>.
              </p>
            </div>

            {/* Score Stats Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Accuracy</span>
                <p className="text-base font-mono font-bold text-emerald-400 mt-1">
                  {sessionTotalCount > 0 ? Math.round((sessionCorrectCount / sessionTotalCount) * 100) : 0}%
                </p>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Topic Mastery</span>
                <p className="text-base font-mono font-bold text-sky-400 mt-1">
                  {topicMasteryPercent}%
                </p>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Topic Score</span>
                <p className="text-base font-mono font-bold text-amber-400 mt-1">
                  {topicScore} pts
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={loadQuestions}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition"
              >
                <RotateCw className="w-4 h-4" />
                <span>Regenerate Fresh Questions</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto text-xs px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 transition"
              >
                Return to Roadmap
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE QUESTION VIEW */
          <div className="p-5 sm:p-6 space-y-5">
            
            {/* Question Progress Tracker */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                {currentQ.isReinforcement && (
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Adaptive Reinforcement Drill
                  </span>
                )}
              </div>

              <button
                onClick={loadQuestions}
                title="Regenerate an entirely new set of questions"
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 transition"
              >
                <RotateCw className="w-3 h-3" />
                <span>Regenerate Set</span>
              </button>
            </div>

            {/* Question Statement */}
            <div className="bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800">
              <h4 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                {currentQ.question}
              </h4>

              {/* Code Snippet Box (if any) */}
              {currentQ.code && (
                <div className="mt-3.5 bg-slate-950 rounded-xl p-3.5 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                  <code>{currentQ.code}</code>
                </div>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === currentQ.correctIndex;
                
                let optionStyle = 'bg-slate-800/60 hover:bg-slate-800 border-slate-750 text-slate-200';

                if (isAnswered) {
                  if (isCorrectOption) {
                    optionStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-semibold shadow-sm shadow-emerald-500/10';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-500/15 border-rose-500 text-rose-300 font-semibold';
                  } else {
                    optionStyle = 'bg-slate-900/40 border-slate-850 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all duration-200 flex items-start justify-between gap-3 ${optionStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold font-mono shrink-0 mt-0.5 ${
                        isSelected 
                          ? 'bg-slate-100 text-slate-950' 
                          : 'bg-slate-700/60 text-slate-300'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed">{option}</span>
                    </div>

                    {isAnswered && (
                      <div className="shrink-0 mt-0.5">
                        {isCorrectOption && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        )}
                        {isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* FEEDBACK BREAKDOWN WHEN ANSWERED */}
            {isAnswered && (
              <div className={`p-4 sm:p-5 rounded-2xl border animate-fadeIn transition-all ${
                isCorrect 
                  ? 'bg-emerald-950/20 border-emerald-500/30' 
                  : 'bg-rose-950/20 border-rose-500/30'
              }`}>
                
                {/* Result header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="font-bold text-sm text-emerald-300">
                          Brilliant! Correct Answer 🎉
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-400" />
                        <span className="font-bold text-sm text-rose-300">
                          Incorrect! Let’s learn and re-test 💡
                        </span>
                      </>
                    )}
                  </div>

                  {/* Score badge */}
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg border ${
                    isCorrect 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                    {lastEarned > 0 ? `+${lastEarned} pts` : `${lastEarned} pts`}
                  </span>
                </div>

                {/* Explanation */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                  {currentQ.explanation}
                </p>

                {/* Misconception insight if wrong */}
                {!isCorrect && currentQ.wrongReason && (
                  <div className="mb-3 p-3 bg-rose-950/40 rounded-xl border border-rose-500/20 text-xs text-rose-200/90 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block text-rose-300">Why your answer was mistaken:</strong>
                      {currentQ.wrongReason}
                    </div>
                  </div>
                )}

                {/* Golden Rule */}
                {currentQ.rule && (
                  <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20 text-xs text-emerald-300/90 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block text-emerald-200">Key Golden Rule to Remember:</strong>
                      {currentQ.rule}
                    </div>
                  </div>
                )}

                {/* ACTION BUTTONS (The Re-test Engine!) */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-4 pt-3 border-t border-slate-800/80">
                  
                  {/* If incorrect, give option to regenerate reinforcement question! */}
                  {!isCorrect && (
                    <button
                      onClick={handleRegenerateReinforcement}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl shadow-md transition"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Regenerate Reinforcement Question (Test Again)</span>
                    </button>
                  )}

                  {/* Proceed to Next */}
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl shadow-md transition"
                  >
                    <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Results'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
