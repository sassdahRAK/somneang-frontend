import { Outlet, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { motion } from 'framer-motion';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b5e 40%, #1a0a3e 70%, #0d0d14 100%)' }}>
      
      {/* Background orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.2) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-purple-400/40"
          animate={{ y: [-20, 20], x: [-10, 10], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.3 }}
          style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            <Logo size={64} />
          </motion.div>
          <h1 className="font-display font-bold text-3xl gradient-text mt-2">Somneang</h1>
          <p className="text-purple-300/60 text-sm">Your Music Universe</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl p-7 shadow-2xl" style={{ background: 'rgba(26,14,60,0.7)', borderColor: 'rgba(168,85,247,0.2)' }}>
          <Outlet />
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">© 2025 Somneang. All rights reserved.</p>
      </motion.div>
    </div>
  );
}
