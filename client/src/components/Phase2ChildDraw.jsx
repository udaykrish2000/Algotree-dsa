import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { drawChild, fetchMyChild } from '../api';
import confetti from 'canvas-confetti';
import { Gift, Lock, Sparkles, MapPin, Building, Layers, Hash, User, AlertCircle, LogIn, Heart, IndianRupee } from 'lucide-react';

export default function Phase2ChildDraw({ onOpenLogin }) {
  const { user } = useAuth();
  const [child, setChild] = useState(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadMyChild();
    }
  }, [user]);

  const loadMyChild = async () => {
    setLoading(true);
    try {
      const res = await fetchMyChild();
      if (res.hasDrawn) {
        setHasDrawn(true);
        setChild(res.child);
      }
    } catch (err) {
      console.error('Failed to load child:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDraw = async () => {
    setError('');
    setDrawing(true);
    try {
      const res = await drawChild();
      setChild(res.child);
      setHasDrawn(true);

      // Trigger Festive Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#10b981', '#f59e0b', '#ffffff']
      });
    } catch (err) {
      setError(err.message || 'Failed to draw Secret Santa child.');
    } finally {
      setDrawing(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto shadow-lg shadow-red-900/20">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Authentication Required</h2>
          <p className="text-slate-400 text-sm">
            Section 2 requires authentication using the username and password set during Phase 1 participation.
          </p>
        </div>
        <button
          onClick={onOpenLogin}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl text-sm shadow-xl shadow-red-900/40 transition transform active:scale-95 inline-flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          <span>Log In to Pick Your Child</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 border border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-900/60 border border-red-500/40 rounded-full text-red-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 2: Child Selection (Random Draw)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Pick Your Secret Santa Giftee 🎁
          </h2>
          <p className="text-slate-300 text-sm max-w-lg">
            Click to draw your assigned colleague on a random basis. <strong>Once selected, no more changes can be made!</strong>
          </p>
        </div>

        <div className="bg-amber-950/80 border border-amber-500/40 rounded-2xl p-4 text-center shrink-0 min-w-[150px]">
          <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Budget Reminder</div>
          <div className="text-2xl font-black text-amber-300 my-1 flex items-center justify-center gap-1">
            <IndianRupee className="w-5 h-5" /> 300
          </div>
          <div className="text-[10px] text-amber-200/70">Minimum Gift Value</div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/80 border border-red-500/40 rounded-2xl text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Draw Action or Locked Giftee Card */}
      {!hasDrawn ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-red-600 via-amber-500 to-emerald-500 p-1 mx-auto shadow-2xl shadow-red-900/40 festive-glow">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-amber-400">
              <Gift className="w-12 h-12" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Ready to Discover Your Child?</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              You will be matched with one colleague randomly. Make sure to keep your child secret!
            </p>
          </div>

          <button
            onClick={handleDraw}
            disabled={drawing || loading}
            className="px-8 py-4 bg-gradient-to-r from-red-600 via-amber-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-extrabold rounded-2xl text-base shadow-2xl shadow-red-900/60 transition transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {drawing ? 'Drawing Secret Santa Child...' : '🎲 Pick My Child Now'}
          </button>

          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-slate-400" />
            Selection is permanent and cannot be modified after draw
          </p>
        </div>
      ) : (
        /* GIFTEE CARD */
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="px-3 py-1 bg-red-900/70 border border-red-500/50 text-red-300 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-md">
              <Lock className="w-3.5 h-3.5" />
              <span>Selection Locked</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-amber-500 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center text-amber-300 font-extrabold text-xl">
                🎁
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Your Assigned Secret Santa Child</div>
              <h3 className="text-2xl font-extrabold text-white">{child.full_name}</h3>
              <div className="text-xs text-slate-400">Employee ID: <span className="text-slate-200 font-semibold">{child.emp_id}</span></div>
            </div>
          </div>

          {/* Workplace Delivery Location Grid */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Cubicle No.</div>
                <div className="text-sm font-bold text-slate-200">{child.cubicle_no}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Floor</div>
                <div className="text-sm font-bold text-slate-200">{child.floor}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-red-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">ODC No.</div>
                <div className="text-sm font-bold text-slate-200">{child.odc_no}</div>
              </div>
            </div>
          </div>

          {/* Wishlist Card */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-400 fill-red-400/30" />
                Wishlist & Gift Preferences
              </span>
              <span className="text-[10px] text-amber-300 font-semibold bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Min Budget: ₹300
              </span>
            </div>
            <p className="text-sm text-slate-200 italic bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
              "{child.wishlist || 'Surprise Me! (No specific wishlist provided)'}"
            </p>
          </div>

          <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            🤫 Keep your child Secret until Section 3 opens after Dec 28th!
          </div>
        </div>
      )}
    </div>
  );
}
