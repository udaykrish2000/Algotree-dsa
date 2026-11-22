import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Gift, LogIn, LogOut, User, DollarSign } from 'lucide-react';

export default function Navbar({ currentPhase, onOpenLogin }) {
  const { user, logout } = useAuth();

  const phaseBadge = {
    1: { label: 'Phase 1: Participation Open', bg: 'bg-emerald-900/60 text-emerald-300 border-emerald-500/40' },
    2: { label: 'Phase 2: Pick Your Child', bg: 'bg-red-900/60 text-red-300 border-red-500/40' },
    3: { label: 'Phase 3: Secret Santa Reveal', bg: 'bg-amber-900/60 text-amber-300 border-amber-500/40' }
  }[currentPhase] || { label: `Phase ${currentPhase}`, bg: 'bg-slate-800 text-slate-300 border-slate-700' };

  return (
    <nav className="bg-slate-950/80 border-b border-slate-800 sticky top-10 z-30 px-4 py-3 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 via-amber-500 to-emerald-500 p-0.5 shadow-lg shadow-red-900/30">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-amber-400">
              <Gift className="w-5 h-5 animate-bounce-slow" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-red-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              Secret Santa 2026
            </h1>
            <p className="text-xs text-slate-400">Workplace Holiday Gift Exchange</p>
          </div>
        </div>

        {/* Status Badges & User Info */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Phase Badge */}
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${phaseBadge.bg}`}>
            {phaseBadge.label}
          </span>

          {/* Min Budget Badge */}
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/70 text-amber-300 border border-amber-500/40 flex items-center gap-1">
            <span>Min Budget: ₹300</span>
          </span>

          {/* Auth Controls */}
          {user ? (
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px]">
                  {user.full_name ? user.full_name[0] : 'U'}
                </div>
                <div>
                  <div className="font-semibold text-slate-200">{user.full_name}</div>
                  <div className="text-[10px] text-slate-400">Emp ID: {user.emp_id}</div>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium text-xs rounded-xl shadow-lg shadow-red-900/40 transition transform active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
