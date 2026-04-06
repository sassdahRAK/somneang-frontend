import { motion } from 'framer-motion';
import { Music, Users, Tag, TrendingUp, Play, Heart, Star, ListMusic } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { songs, genres, likedSongs, ratings, recentSongs } = useApp();
  const { getAllUsers } = useAuth();
  const navigate = useNavigate();

  const users = getAllUsers();
  const totalPlays = songs.reduce((sum, s) => {
    const n = parseFloat(s.plays?.replace('M', '') || 0);
    return sum + (s.plays?.includes('M') ? n * 1000000 : n);
  }, 0);
  const ratingCount = Object.keys(ratings).length;
  const avgRating = ratingCount > 0
    ? (Object.values(ratings).reduce((a, b) => a + b, 0) / ratingCount).toFixed(1)
    : 'N/A';

  const stats = [
    { label: 'Total Songs', value: songs.length, icon: Music, color: 'text-purple-400', bg: 'bg-purple-500/10', link: '/admin/songs' },
    { label: 'Genres', value: genres.length, icon: Tag, color: 'text-pink-400', bg: 'bg-pink-500/10', link: '/admin/genres' },
    { label: 'Registered Users', value: users.length, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', link: '/admin/users' },
    { label: 'Total Streams', value: `${(totalPlays / 1000000).toFixed(1)}M`, icon: Play, color: 'text-green-400', bg: 'bg-green-500/10', link: null },
    { label: 'Liked Songs', value: likedSongs.size, icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10', link: null },
    { label: 'Avg Rating', value: avgRating, icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/10', link: null },
    { label: 'Recently Played', value: recentSongs.length, icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-500/10', link: null },
    { label: 'Playlists', value: 4, icon: ListMusic, color: 'text-cyan-400', bg: 'bg-cyan-500/10', link: null },
  ];

  // Top 5 songs by plays
  const topSongs = [...songs]
    .sort((a, b) => {
      const av = parseFloat(a.plays?.replace('M', '') || 0) * (a.plays?.includes('M') ? 1000000 : 1);
      const bv = parseFloat(b.plays?.replace('M', '') || 0) * (b.plays?.includes('M') ? 1000000 : 1);
      return bv - av;
    })
    .slice(0, 5);

  return (
    <div className="p-5 md:p-7">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display font-bold text-3xl text-white">Admin Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Overview of your music platform</p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg, link }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => link && navigate(link)}
            className={`glass-card rounded-2xl p-5 ${link ? 'cursor-pointer hover:border-purple-500/30' : ''} transition-all`}
          >
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className="font-display font-bold text-2xl text-white">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            {link && <p className="text-xs text-purple-400 mt-1">Manage →</p>}
          </motion.div>
        ))}
      </div>

      {/* Top 5 songs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <h2 className="font-display font-bold text-xl text-white mb-4">Top Songs by Plays</h2>
        <div className="glass-card rounded-2xl overflow-hidden">
          {topSongs.map((song, i) => (
            <div key={song.id}
              className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
              <span className="text-slate-500 text-sm w-5 text-center font-bold">{i + 1}</span>
              <img src={song.image} alt="" className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{song.title}</p>
                <p className="text-xs text-slate-400 truncate">{song.artist}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Play size={12} className="text-purple-400" />
                <span className="text-xs text-slate-300">{song.plays}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
