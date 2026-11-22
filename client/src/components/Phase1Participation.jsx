import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { sendOtp } from '../api';
import { Gift, User, Building, Layers, MapPin, Hash, KeyRound, Sparkles, CheckCircle, Clock, AlertCircle, IndianRupee, Mail, ShieldCheck, Send } from 'lucide-react';

export default function Phase1Participation({ participantCount, onRegisterSuccess }) {
  const { user, register } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    emp_id: '',
    email: '',
    otp: '',
    cubicle_no: '',
    floor: '',
    odc_no: '',
    username: '',
    password: '',
    wishlist: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [testOtpNotice, setTestOtpNotice] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendOtp = async () => {
    setError('');
    const emailVal = formData.email ? formData.email.trim().toLowerCase() : '';

    if (!emailVal) {
      setError('Please enter your Gmail address.');
      return;
    }

    if (!emailVal.endsWith('@gmail.com')) {
      setError('Only "@gmail.com" email addresses are allowed for Secret Santa participation.');
      return;
    }

    setOtpLoading(true);
    try {
      const res = await sendOtp(emailVal);
      setOtpSent(true);
      if (res.test_otp) {
        setTestOtpNotice(`Verification OTP sent to ${emailVal}: ${res.test_otp}`);
        setFormData(prev => ({ ...prev, otp: res.test_otp }));
      }
    } catch (err) {
      setError(err.message || 'Failed to send OTP.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate mandatory fields
    const mandatory = ['full_name', 'emp_id', 'email', 'otp', 'cubicle_no', 'floor', 'odc_no', 'username', 'password'];
    for (const field of mandatory) {
      if (!formData[field] || !formData[field].trim()) {
        setError(`Please fill in all mandatory fields (*). Field "${field.replace('_', ' ')}" is required.`);
        return;
      }
    }

    if (!formData.email.trim().toLowerCase().endsWith('@gmail.com')) {
      setError('Only "@gmail.com" email addresses are allowed for Secret Santa participation.');
      return;
    }

    if (!otpSent) {
      setError('Please click "Send Email OTP" to verify your Gmail address first.');
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/60 border border-emerald-500/40 rounded-full text-emerald-300 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Section 1: 5-Day Participation Window</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Join the Workplace Secret Santa! 🎅
            </h2>
            <p className="text-slate-300 text-sm max-w-xl">
              Register your workplace location & Gmail address to enter the Secret Santa draw. <strong>Only "@gmail.com" addresses are allowed (1 registration per email).</strong>
            </p>
          </div>

          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-4 text-center min-w-[180px] shadow-xl">
            <div className="text-xs text-slate-400 font-medium">Joined Participants</div>
            <div className="text-3xl font-black text-amber-400 my-1">{participantCount}</div>
            <div className="text-[10px] text-emerald-400 font-medium flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" /> Ready for matching
            </div>
          </div>
        </div>

        {/* MINIMUM BUDGET & DOMAIN NOTICE BANNER */}
        <div className="mt-6 bg-gradient-to-r from-amber-950/90 via-slate-900 to-red-950/90 border border-amber-500/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold shrink-0">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-amber-300">Participation Rules</div>
              <div className="text-xs text-amber-200/80">Min gift budget: <strong className="text-amber-300">₹300</strong> | Email domain: <strong className="text-emerald-300">@gmail.com only</strong></div>
            </div>
          </div>
          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-semibold text-xs rounded-full border border-amber-500/40">
            Min ₹300 Budget
          </span>
        </div>
      </div>

      {/* Registration Form Card */}
      {user ? (
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">You are Registered!</h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Welcome, <span className="font-semibold text-amber-300">{user.full_name}</span> (Emp ID: {user.emp_id} | Email: {user.email}). Your participation for Section 1 is confirmed.
          </p>
          <div className="inline-block bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 space-y-1 text-left max-w-xs mx-auto">
            <div><strong>Cubicle:</strong> {user.cubicle_no}</div>
            <div><strong>Floor:</strong> {user.floor} | <strong>ODC:</strong> {user.odc_no}</div>
            <div><strong>Wishlist:</strong> {user.wishlist || 'Surprise Me!'}</div>
          </div>
          <p className="text-xs text-slate-400">
            When Section 2 opens, log in to pick your assigned Secret Santa child!
          </p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-400" />
                <span>Participation & Workplace Registration</span>
              </h3>
              <p className="text-xs text-slate-400">
                Email must end with <span className="text-emerald-400 font-bold">@gmail.com</span> (OTP verified). Fields marked with <span className="text-red-400 font-bold">*</span> are mandatory.
              </p>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full font-medium">
              @gmail.com Only
            </span>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-950/70 border border-red-500/40 rounded-2xl text-red-300 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {testOtpNotice && (
            <div className="mb-6 p-4 bg-emerald-950/70 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>{testOtpNotice}</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-900/80 px-2 py-0.5 rounded">Auto-filled in OTP box</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Workplace & Gmail Details Section */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Participant Information</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      name="full_name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                {/* Emp ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Employee ID (Emp ID) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Hash className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      name="emp_id"
                      required
                      value={formData.emp_id}
                      onChange={handleChange}
                      placeholder="e.g. EMP4092"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Gmail Address & Email OTP Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/70 border border-slate-800 p-4 rounded-2xl">
                {/* Email Address */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-300">
                      Gmail Address <span className="text-red-400">*</span>
                    </label>
                    <span className="text-[10px] text-emerald-400 font-semibold">Must end with @gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 text-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpLoading}
                      className="px-3.5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow transition shrink-0 flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{otpLoading ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send Email OTP'}</span>
                    </button>
                  </div>
                </div>

                {/* OTP Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    6-Digit Email OTP <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      name="otp"
                      required
                      maxLength={6}
                      value={formData.otp}
                      onChange={handleChange}
                      placeholder="e.g. 123456"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 text-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Desk Location Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Cubicle Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Cubicle Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      name="cubicle_no"
                      required
                      value={formData.cubicle_no}
                      onChange={handleChange}
                      placeholder="e.g. C-304"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                {/* Floor */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Floor <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Layers className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      name="floor"
                      required
                      value={formData.floor}
                      onChange={handleChange}
                      placeholder="e.g. 3rd Floor"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                {/* ODC No */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ODC Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      name="odc_no"
                      required
                      value={formData.odc_no}
                      onChange={handleChange}
                      placeholder="e.g. ODC-2"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Account Credentials Section */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Account Credentials (For Section 2 & 3 Login)</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Username */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Username <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      name="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Choose a username"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Choose a password"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Wishlist Section */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300">
                  Wishlist & Gift Preferences <span className="text-emerald-400 font-normal">(Optional)</span>
                </label>
                <span className="text-[10px] text-amber-400 font-bold">Min Budget: ₹300</span>
              </div>
              <textarea
                name="wishlist"
                rows="3"
                value={formData.wishlist}
                onChange={handleChange}
                placeholder="Tell your Secret Santa what you like! (e.g., Coffee beans, desk decor, books, chocolates, t-shirt size M...)"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-950/50 transition transform active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Verifying OTP & Registering...' : 'Verify Gmail OTP & Register for Secret Santa 🎅'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
