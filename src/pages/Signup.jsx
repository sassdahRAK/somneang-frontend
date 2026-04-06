import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register(form.name.trim(), form.email, form.password);
      setLoading(false);
      if (result.error) {
        setError(result.error);
      } else {
        navigate('/home');
      }
    }, 800);
  };

  return (
    <>
      <h2 className="font-display font-bold text-2xl text-white mb-1">Create account</h2>
      <p className="text-slate-400 text-sm mb-6">Sign up to continue to Somneang</p>

      {/* Error message */}
      {error && (
        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle size={15} /> {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-xs font-medium text-slate-300 mb-1.5 block">Full Name</label>
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" value={form.name} onChange={set('name')} required
              placeholder="Enter your name"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-purple-900/40 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-all" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-medium text-slate-300 mb-1.5 block">Email</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="email" value={form.email} onChange={set('email')} required
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-purple-900/40 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-all" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-xs font-medium text-slate-300 mb-1.5 block">Password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} required
              placeholder="Create a password"
              className="w-full pl-10 pr-10 py-3 bg-white/5 border border-purple-900/40 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-all" />
            <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-xs font-medium text-slate-300 mb-1.5 block">Confirm Password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type={showPw ? 'text' : 'password'} value={form.confirm} onChange={set('confirm')} required
              placeholder="Confirm your password"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-purple-900/40 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-all" />
          </div>
        </div>

        <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
          className="w-full gradient-bg py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg mt-2">
          {loading
            ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <><span>Sign Up</span><ArrowRight size={16} /></>}
        </motion.button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-slate-500">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="text-purple-400 hover:text-pink-400 font-medium transition-colors">Log in</Link>
      </p>
    </>
  );
}
