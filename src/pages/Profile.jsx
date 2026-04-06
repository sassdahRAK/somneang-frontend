import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Heart, LogOut, Edit3, BadgeCheck, Save, X, Camera, User, Mail, Calendar } from 'lucide-react';
import PlaylistCard from '../components/PlaylistCard';
import { playlists } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { likedSongs, addNotification } = useApp();
  const { currentUser, updateProfile, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: currentUser?.name || '', email: currentUser?.email || '' });
  const [error, setError] = useState('');

  const stats = [
    { label: 'Playlists', value: playlists.length, icon: Music },
    { label: 'Liked', value: likedSongs.size, icon: Heart },
    { label: 'Member Since', value: currentUser?.joinDate || '2024', icon: Calendar },
  ];

  const handleSave = () => {
    setError('');
    if (!form.name.trim()) { setError('Name cannot be empty'); return; }
    if (!form.email.trim()) { setError('Email cannot be empty'); return; }
    updateProfile({ name: form.name.trim(), email: form.email.trim() });
    addNotification('Profile updated successfully!');
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ name: currentUser?.name || '', email: currentUser?.email || '' });
    setError('');
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Avatar: show first letter of name
  const avatarLetter = currentUser?.name?.[0]?.toUpperCase() || 'U';

  return (
    <div className="p-5 md:p-7">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        {/* Profile Card */}
        <div className="glass-card rounded-3xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(135deg,#f472b6,#a855f7)' }} />

          <div className="relative flex flex-col sm:flex-row items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center shadow-2xl text-3xl font-bold text-white">
                {avatarLetter}
              </div>
              <button
                onClick={() => setEditing(true)}
                className="absolute bottom-0 right-0 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors"
              >
                <Camera size={12} className="text-white" />
              </button>
            </div>

            {/* Info / Edit form */}
            <div className="flex-1 text-center sm:text-left w-full">
              <AnimatePresence mode="wait">
                {editing ? (
                  <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                    {/* Name input */}
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-purple-500/40 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/70 transition-all"
                      />
                    </div>
                    {/* Email input */}
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="Your email"
                        className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-purple-500/40 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/70 transition-all"
                      />
                    </div>
                    {error && <p className="text-red-400 text-xs">{error}</p>}
                    {/* Save / Cancel buttons */}
                    <div className="flex gap-2">
                      <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
                        className="flex items-center gap-1.5 px-4 py-2 gradient-bg rounded-xl text-white text-sm font-medium">
                        <Save size={14} /> Save
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.97 }} onClick={handleCancel}
                        className="flex items-center gap-1.5 px-4 py-2 glass-card rounded-xl text-slate-300 text-sm">
                        <X size={14} /> Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <h1 className="font-display font-bold text-2xl text-white">{currentUser?.name || 'Music Lover'}</h1>
                      {currentUser?.role === 'admin' && <BadgeCheck size={18} className="text-purple-400" />}
                    </div>
                    <p className="text-slate-400 text-sm mt-0.5">{currentUser?.email}</p>
                    <p className="text-xs text-purple-400 mt-1 capitalize">{currentUser?.role === 'admin' ? 'Administrator' : 'Premium Member'}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Edit button (shown when not editing) */}
            {!editing && (
              <button onClick={() => setEditing(true)}
                className="sm:ml-auto glass-card px-4 py-2 rounded-full flex items-center gap-2 hover:border-purple-500/30 transition-all text-sm text-slate-300">
                <Edit3 size={14} /> Edit Profile
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="relative grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-white/5">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Icon size={14} className="text-purple-400" />
                  <span className="font-display font-bold text-lg text-white">{value}</span>
                </div>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* My Playlists */}
        <h2 className="font-display font-bold text-xl text-white mb-4">My Playlists</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
          {playlists.map((pl, i) => (
            <motion.div key={pl.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <PlaylistCard playlist={pl} />
            </motion.div>
          ))}
        </div>

        {/* Sign Out */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="flex items-center gap-3 px-5 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
        >
          <LogOut size={16} /> Sign Out
        </motion.button>
      </motion.div>
    </div>
  );
}
