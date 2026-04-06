import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart2, Heart, Clock, Music } from 'lucide-react';
import SongCard from '../components/SongCard';
import SectionHeader from '../components/SectionHeader';
import { SkeletonRow } from '../components/Skeleton';
import { trendingSongs, topCharts, recentSongs, songs } from '../data/mockData';
import { useApp } from '../context/AppContext';

function PageHeader({ icon: Icon, title, subtitle, color = 'text-pink-400' }) {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 mb-6">
      <div className={`w-12 h-12 glass-card rounded-2xl flex items-center justify-center`}>
        <Icon size={22} className={color} />
      </div>
      <div>
        <h1 className="font-display font-bold text-2xl text-white">{title}</h1>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
    </motion.div>
  );
}

export function Trending() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, []);

  return (
    <div className="p-5 md:p-7">
      <PageHeader icon={TrendingUp} title="Trending" subtitle="What's hot right now" color="text-pink-400" />
      <div className="flex gap-4 overflow-x-auto pb-4 mb-6 hide-scrollbar">
        {trendingSongs.slice(0, 5).map((song, i) => (
          <motion.div key={song.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <SongCard song={song} />
          </motion.div>
        ))}
      </div>
      <SectionHeader title="All Trending" subtitle={`${trendingSongs.length} songs`} />
      <div className="glass-card rounded-2xl overflow-hidden">
        {loading
          ? [...Array(8)].map((_, i) => <SkeletonRow key={i} />)
          : trendingSongs.map((song, i) => (
            <motion.div key={song.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              className="border-b border-white/5 last:border-0">
              <SongCard song={song} index={i + 1} showIndex horizontal />
            </motion.div>
          ))}
      </div>
    </div>
  );
}

export function TopCharts() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, []);

  return (
    <div className="p-5 md:p-7">
      <PageHeader icon={BarChart2} title="Top Charts" subtitle="The most played tracks globally" color="text-purple-400" />
      <div className="glass-card rounded-2xl overflow-hidden">
        {loading
          ? [...Array(10)].map((_, i) => <SkeletonRow key={i} />)
          : topCharts.map((song, i) => (
            <motion.div key={song.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="border-b border-white/5 last:border-0 relative">
              {i < 3 && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: ['linear-gradient(135deg,#f59e0b,#fbbf24)', 'linear-gradient(135deg,#9ca3af,#d1d5db)', 'linear-gradient(135deg,#b45309,#d97706)'][i] }}>
                  {i + 1}
                </div>
              )}
              <div className={i < 3 ? 'pl-4' : ''}>
                <SongCard song={song} index={i + 1} showIndex={i >= 3} horizontal />
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}

export function Favorites() {
  const { likedSongs } = useApp();
  const favorites = songs.filter(s => likedSongs.has(s.id));

  return (
    <div className="p-5 md:p-7">
      <PageHeader icon={Heart} title="Favorites" subtitle={`${favorites.length} liked songs`} color="text-pink-400" />
      {favorites.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center">
          <Heart size={48} className="text-slate-600 mb-4" />
          <h3 className="font-display text-lg text-slate-400 mb-2">No favorites yet</h3>
          <p className="text-slate-500 text-sm">Heart songs you love and they'll appear here</p>
        </motion.div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          {favorites.map((song, i) => (
            <motion.div key={song.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="border-b border-white/5 last:border-0">
              <SongCard song={song} horizontal />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Recent() {
  return (
    <div className="p-5 md:p-7">
      <PageHeader icon={Clock} title="Recently Played" subtitle="Your listening history" color="text-indigo-400" />
      {recentSongs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Music size={48} className="text-slate-600 mb-4" />
          <h3 className="font-display text-lg text-slate-400 mb-2">No history yet</h3>
          <p className="text-slate-500 text-sm">Start playing music to see it here</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          {recentSongs.map((song, i) => (
            <motion.div key={`${song.id}-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="border-b border-white/5 last:border-0">
              <SongCard song={song} horizontal />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
