import React, { useState } from 'react';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import Header from './components/Header';
import WelcomeHero from './components/WelcomeHero';
import RoadmapView from './components/RoadmapView';
import MindmapView from './components/MindmapView';
import QuizModal from './components/QuizModal';
import MistakeNotebookModal from './components/MistakeNotebookModal';

function AlgoTreeDashboard() {
  const [viewMode, setViewMode] = useState('timeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const { 
    quizTopicId, 
    setQuizTopicId, 
    isMistakesOpen 
  } = useProgress();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        
        {/* Welcome Hero / Quick Start */}
        <WelcomeHero 
          onStartBeginner={() => setQuizTopicId('big-o-complexity')}
        />

        {/* View Switcher: Roadmap Timeline vs Tree Mind-Map */}
        {viewMode === 'timeline' ? (
          <RoadmapView
            searchQuery={searchQuery}
            difficultyFilter={difficultyFilter}
            setDifficultyFilter={setDifficultyFilter}
          />
        ) : (
          <MindmapView />
        )}

      </main>

      {/* Adaptive Quiz Engine Modal */}
      {quizTopicId && (
        <QuizModal
          topicId={quizTopicId}
          onClose={() => setQuizTopicId(null)}
        />
      )}

      {/* Mistakes Notebook Modal */}
      {isMistakesOpen && (
        <MistakeNotebookModal />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 px-4 sm:px-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-200">AlgoTree</span>
            <span>&bull;</span>
            <span>Chronological DSA Preparation for Beginners</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Adaptive Quiz Engine</span>
            <span>&bull;</span>
            <span>Sub-Branch Deep Dives</span>
            <span>&bull;</span>
            <span>Reinforcement Learning</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <AlgoTreeDashboard />
    </ProgressProvider>
  );
}
