import React, { createContext, useContext, useState, useEffect } from 'react';
import { evaluateAnswer } from '../utils/questionGenerator';

const ProgressContext = createContext();

const STORAGE_KEY = 'algotree_dsa_progress_v1';

export function ProgressProvider({ children }) {
  const [topicScores, setTopicScores] = useState({});
  const [topicMastery, setTopicMastery] = useState({});
  const [topicAttempts, setTopicAttempts] = useState({}); // { [topicId]: { correct: 0, total: 0 } }
  const [completedTopics, setCompletedTopics] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [mistakes, setMistakes] = useState([]);
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [quizTopicId, setQuizTopicId] = useState(null);
  const [isMistakesOpen, setIsMistakesOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTopicScores(parsed.topicScores || {});
        setTopicMastery(parsed.topicMastery || {});
        setTopicAttempts(parsed.topicAttempts || {});
        setCompletedTopics(parsed.completedTopics || []);
        setTotalScore(parsed.totalScore || 0);
        setCurrentStreak(parsed.currentStreak || 0);
        setHighestStreak(parsed.highestStreak || 0);
        setMistakes(parsed.mistakes || []);
      }
    } catch (e) {
      console.error('Failed to load DSA progress:', e);
    }
  }, []);

  // Save to localStorage whenever state updates
  useEffect(() => {
    try {
      const data = {
        topicScores,
        topicMastery,
        topicAttempts,
        completedTopics,
        totalScore,
        currentStreak,
        highestStreak,
        mistakes
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to persist DSA progress:', e);
    }
  }, [topicScores, topicMastery, topicAttempts, completedTopics, totalScore, currentStreak, highestStreak, mistakes]);

  // Record answer evaluation
  const handleRecordAnswer = ({ topicId, question, selectedIndex, isCorrect }) => {
    const prevScore = topicScores[topicId] || 0;
    const { scoreDelta, newScore, newStreak, earnedBonus } = evaluateAnswer({
      isCorrect,
      currentScore: prevScore,
      currentStreak
    });

    // Update topic score
    setTopicScores(prev => ({
      ...prev,
      [topicId]: newScore
    }));

    // Update overall total score
    setTotalScore(prev => Math.max(0, prev + scoreDelta));

    // Update streaks
    setCurrentStreak(newStreak);
    setHighestStreak(prev => Math.max(prev, newStreak));

    // Update attempts & calculate mastery percentage
    const currentAttempts = topicAttempts[topicId] || { correct: 0, total: 0 };
    const updatedAttempts = {
      correct: currentAttempts.correct + (isCorrect ? 1 : 0),
      total: currentAttempts.total + 1
    };
    setTopicAttempts(prev => ({
      ...prev,
      [topicId]: updatedAttempts
    }));

    // Calculate mastery: weighted blend of accuracy and successful count (capped at 100%)
    const accuracy = updatedAttempts.correct / updatedAttempts.total;
    const volumeMultiplier = Math.min(1, updatedAttempts.correct / 5); // 5 correct answers gives full volume weight
    const computedMastery = Math.min(100, Math.round(accuracy * volumeMultiplier * 100));

    setTopicMastery(prev => ({
      ...prev,
      [topicId]: computedMastery
    }));

    // If answered incorrectly, append to Mistake Notebook
    if (!isCorrect) {
      const mistakeEntry = {
        id: `mistake-${Date.now()}-${Math.random()}`,
        topicId,
        question: question.question,
        code: question.code,
        userAnswer: question.options[selectedIndex],
        correctAnswer: question.options[question.correctIndex],
        explanation: question.explanation,
        wrongReason: question.wrongReason,
        rule: question.rule,
        timestamp: new Date().toISOString()
      };
      setMistakes(prev => [mistakeEntry, ...prev.slice(0, 49)]); // Keep last 50
    }

    return { scoreDelta, newScore, newStreak, earnedBonus };
  };

  const toggleTopicCompletion = (topicId) => {
    setCompletedTopics(prev => {
      if (prev.includes(topicId)) {
        return prev.filter(id => id !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  const clearMistake = (id) => {
    setMistakes(prev => prev.filter(m => m.id !== id));
  };

  const resetAllProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress, scores, and streak?')) {
      setTopicScores({});
      setTopicMastery({});
      setTopicAttempts({});
      setCompletedTopics([]);
      setTotalScore(0);
      setCurrentStreak(0);
      setHighestStreak(0);
      setMistakes([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        topicScores,
        topicMastery,
        topicAttempts,
        completedTopics,
        totalScore,
        currentStreak,
        highestStreak,
        mistakes,
        activeTopicId,
        setActiveTopicId,
        quizTopicId,
        setQuizTopicId,
        isMistakesOpen,
        setIsMistakesOpen,
        recordAnswer: handleRecordAnswer,
        toggleTopicCompletion,
        clearMistake,
        resetAllProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
