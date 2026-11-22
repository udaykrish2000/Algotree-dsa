import React, { useState } from 'react';
import { setPhase, seedMockData, resetDatabase } from '../api';
import { Sliders, Users, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';

export default function PhaseSimulatorBar({ currentPhase, onPhaseChange, onRefreshData }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePhaseSelect = async (phaseNum) => {
    setLoading(true);
    try {
      await setPhase(phaseNum);
      onPhaseChange(phaseNum);
      setMessage(`Switched to Section ${phaseNum}`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    setLoading(true);
    try {
      const res = await seedMockData();
      setMessage(res.message);
      if (onRefreshData) onRefreshData();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset all users, assignments, and phase state?')) return;
    setLoading(true);
    try {
      await resetDatabase();
      onPhaseChange(1);
      if (onRefreshData) onRefreshData();
      setMessage('Database reset!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border-b border-amber-500/30 backdrop-blur-md sticky top-0 z-40 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-amber-400 font-semibold">
          <Sliders className="w-4 h-4 animate-spin-slow" />
          <span>Dev Phase Simulator:</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePhaseSelect(1)}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              currentPhase === 1
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 ring-1 ring-emerald-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            1. Participation (5 Days)
          </button>

          <button
            onClick={() => handlePhaseSelect(2)}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              currentPhase === 2
                ? 'bg-red-600 text-white shadow-md shadow-red-900/40 ring-1 ring-red-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            2. Pick Child (1 Wk Before)
          </button>

          <button
            onClick={() => handlePhaseSelect(3)}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              currentPhase === 3
                ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40 ring-1 ring-amber-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            3. Secret Santa Reveal (&gt;Dec 28)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSeed}
            disabled={loading}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition disabled:opacity-50"
            title="Add 5 sample employees for instant testing"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Seed 5 Employees</span>
          </button>

          <button
            onClick={handleReset}
            disabled={loading}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-300 border border-slate-700 rounded-lg transition disabled:opacity-50"
            title="Reset database to clean initial state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset DB</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="max-w-7xl mx-auto mt-1 flex items-center justify-center gap-1.5 text-emerald-400 text-[11px] animate-fade-in">
          <Sparkles className="w-3 h-3" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
