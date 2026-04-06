import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Music, Heart, LogOut, Settings, Edit3, BadgeCheck } from 'lucide-react';
import PlaylistCard from '../components/PlaylistCard';
import { playlists } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const navigate = useNavigate();
  const { likedSongs } = useApp();

  const stats = [
    { label: 'Playlists', value: playlists.length, icon: Music },
    { label: 'Liked', value: likedSongs.size, icon: Heart },
    { label: 'Following', value: '24', icon: BadgeCheck },
  ];

  return (
    <div className="p-5 md:p-7">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Profile Header */}
        <div className="glass-card rounded-3xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(135deg,#f472b6,#a855f7)' }} />
          <div className="relative flex flex-col sm:flex-row items-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center shadow-2xl">
                <User size={40} className="text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors">
                <Edit3 size={12} className="text-white" />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="font-display font-bold text-2xl text-white">Music Lover</h1>
                <BadgeCheck size={18} className="text-purple-400" />
              </div>
              <p className="text-slate-400 text-sm">music@somneang.app</p>
              <p className="text-xs text-purple-400 mt-1">Premium Member</p>
            </div>
            <button className="sm:ml-auto glass-card px-4 py-2 rounded-full flex items-center gap-2 hover:border-purple-500/30 transition-all text-sm text-slate-300">
              <Settings size={14} /> Settings
            </button>
          </div>

          {/* Stats */}
          <div className="relative grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-white/5">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Icon size={14} className="text-purple-400" />
                  <span className="font-display font-bold text-xl text-white">{value}</span>
                </div>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Playlists */}
        <h2 className="font-display font-bold text-xl text-white mb-4">My Playlists</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
          {playlists.map((pl, i) => (
            <motion.div key={pl.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <PlaylistCard playlist={pl} />
            </motion.div>
          ))}
        </div>

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 px-5 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
        >
          <LogOut size={16} /> Sign Out
        </motion.button>
      </motion.div>
    </div>
  );
}
