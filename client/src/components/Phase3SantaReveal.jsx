import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { revealSecretSanta } from '../api';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Lock, LogIn, AlertCircle, Building, Layers, MapPin, Heart, Smile } from 'lucide-react';

export default function Phase3SantaReveal({ onOpenLogin }) {
  const { user } = useAuth();
  const [santa, setSanta] = useState(null);
  const [unwrapped, setUnwrapped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unwrapping, setUnwrapping] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadSanta();
    }
  }, [user]);

  const loadSanta = async () => {
    setLoading(true);
    try {
      const res = await revealSecretSanta();
      setSanta(res.santa);
    } catch (err) {
      setError(err.message || 'Failed to reveal Secret Santa.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnwrap = () => {
    setUnwrapping(true);
    setTimeout(() => {
      setUnwrapped(true);
      setUnwrapping(false);

      // Grand Celebration Confetti
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ef4444', '#10b981', '#f59e0b', '#ffffff', '#3b82f6']
      });
    }, 1200);
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-950/80 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-900/20">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Authentication Required</h2>
          <p className="text-slate-400 text-sm">
            Section 3 requires authentication to reveal who your Secret Santa was.
          </p>
        </div>
        <button
          onClick={onOpenLogin}
          className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-xl text-sm shadow-xl shadow-amber-900/40 transition transform active:scale-95 inline-flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          <span>Log In to Reveal Your Santa</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-900/60 border border-amber-500/40 rounded-full text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 3: Secret Santa Reveal (&gt;Dec 28th)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Unwrap & Discover Your Secret Santa! ✨
          </h2>
          <p className="text-slate-300 text-sm max-w-lg">
            The secret is finally out! Unwrap your holiday present to see who brought joy to your workplace.
          </p>
        </div>

        <div className="text-5xl animate-bounce-slow">
          🎄
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/80 border border-red-500/40 rounded-2xl text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Gift Box Present or Revealed Santa Card */}
      {!unwrapped ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div
            className={`w-32 h-32 rounded-3xl bg-gradient-to-tr from-amber-500 via-red-600 to-emerald-500 p-1 mx-auto shadow-2xl shadow-amber-900/50 festive-glow cursor-pointer transition transform hover:scale-105 ${
              unwrapping ? 'unwrap-anim' : ''
            }`}
            onClick={handleUnwrap}
          >
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-5xl">
              🎁
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Tap the Present to Unwrap!</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Your Secret Santa picked you during Section 2. Find out who gave you your gift!
            </p>
          </div>

          <button
            onClick={handleUnwrap}
            disabled={unwrapping || loading}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 via-red-600 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-white font-extrabold rounded-2xl text-base shadow-2xl shadow-amber-950/60 transition transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {unwrapping ? 'Unwrapping Gift Box...' : '✨ Reveal My Secret Santa'}
          </button>
        </div>
      ) : santa ? (
        /* REVEALED SANTA CARD */
        <div className="bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in relative overflow-hidden">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-red-500 p-1 mx-auto shadow-xl">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-4xl">
                🎅
              </div>
            </div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-amber-400">Your Secret Santa Is</div>
            <h3 className="text-3xl font-black text-white">{santa.full_name}</h3>
            <p className="text-xs text-slate-400">Employee ID: <span className="text-slate-200 font-semibold">{santa.emp_id}</span></p>
          </div>

          {/* Santa Workplace Location */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Santa's Workplace Desk Location</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Cubicle No.</div>
                  <div className="text-sm font-bold text-slate-200">{santa.cubicle_no}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Floor</div>
                  <div className="text-sm font-bold text-slate-200">{santa.floor}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-red-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">ODC No.</div>
                  <div className="text-sm font-bold text-slate-200">{santa.odc_no}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Thank You Note Box */}
          <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-5 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-sm">
              <Smile className="w-5 h-5 text-amber-400" />
              <span>Say Thank You to {santa.full_name}!</span>
            </div>
            <p className="text-xs text-slate-300">
              Visit Santa at Cubicle <strong>{santa.cubicle_no}</strong> ({santa.floor}, {santa.odc_no}) to thank them in person for your gift!
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
