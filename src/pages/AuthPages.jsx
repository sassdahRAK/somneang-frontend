import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/verify-code'); }, 1000);
  };

  return (
    <>
      <Link to="/login" className="flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-5 transition-colors">
        <ArrowLeft size={14} /> Back to login
      </Link>
      <h2 className="font-display font-bold text-2xl text-white mb-1">Forgot Password</h2>
      <p className="text-slate-400 text-sm mb-6">Enter your email and we'll send you a verification code</p>
      <form onSubmit={handle} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-slate-300 mb-1.5 block">Email Address</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-purple-900/40 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-all" />
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
          className="w-full gradient-bg py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 shadow-lg">
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <><span>Send Code</span><ArrowRight size={16} /></>}
        </motion.button>
      </form>
    </>
  );
}

export function VerifyCode() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...code];
    next[idx] = val.slice(-1);
    setCode(next);
    if (val && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) document.getElementById(`otp-${idx - 1}`)?.focus();
  };

  const handle = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/reset-password'); }, 1000);
  };

  return (
    <>
      <Link to="/forgot-password" className="flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-5 transition-colors">
        <ArrowLeft size={14} /> Back
      </Link>
      <h2 className="font-display font-bold text-2xl text-white mb-1">Verify Code</h2>
      <p className="text-slate-400 text-sm mb-6">Enter the 6-digit code sent to your email</p>
      <form onSubmit={handle} className="space-y-5">
        <div className="flex gap-2 justify-between">
          {code.map((digit, i) => (
            <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1}
              value={digit} onChange={e => handleChange(e.target.value, i)} onKeyDown={e => handleKeyDown(e, i)}
              className="w-11 h-12 text-center bg-white/5 border border-purple-900/40 rounded-xl text-white font-bold text-lg focus:outline-none focus:border-purple-500 focus:bg-white/8 transition-all" />
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
          className="w-full gradient-bg py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 shadow-lg">
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <><span>Verify</span><ArrowRight size={16} /></>}
        </motion.button>
      </form>
      <p className="text-center text-sm text-slate-400 mt-4">
        Didn't receive code? <button className="text-purple-400 hover:text-pink-400 font-medium">Resend</button>
      </p>
    </>
  );
}

export function ResetPassword() {
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/login'); }, 1000);
  };

  return (
    <>
      <h2 className="font-display font-bold text-2xl text-white mb-1">Reset Password</h2>
      <p className="text-slate-400 text-sm mb-6">Create a new password for your account</p>
      <form onSubmit={handle} className="space-y-4">
        {['password', 'confirm'].map((field, i) => (
          <div key={field}>
            <label className="text-xs font-medium text-slate-300 mb-1.5 block">{i === 0 ? 'New Password' : 'Confirm Password'}</label>
            <input type="password" value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} required
              placeholder={i === 0 ? 'New password' : 'Confirm password'}
              className="w-full px-4 py-3 bg-white/5 border border-purple-900/40 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-all" />
          </div>
        ))}
        <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
          className="w-full gradient-bg py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 shadow-lg mt-2">
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <><span>Reset Password</span><ArrowRight size={16} /></>}
        </motion.button>
      </form>
    </>
  );
}
