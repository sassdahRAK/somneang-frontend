import { useNavigate } from 'react-router-dom';
import { Play, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlaylistCard({ playlist }) {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0 w-44"
      onClick={() => navigate(`/playlist/${playlist.id}`)}
    >
      <div className="relative aspect-square">
        <img src={playlist.image} alt={playlist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-2 right-2 w-9 h-9 gradient-bg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
        >
          <Play size={14} className="text-white ml-0.5" />
        </motion.div>
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/40 rounded-full px-2 py-0.5">
          <Music size={10} className="text-purple-400" />
          <span className="text-xs text-white">{playlist.songs.length}</span>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-white truncate">{playlist.name}</p>
        <p className="text-xs text-slate-400 truncate">{playlist.description}</p>
      </div>
    </motion.div>
  );
}
