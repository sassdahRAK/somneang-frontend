import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';

export default function ArtistCard({ artist }) {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex-shrink-0 w-36 cursor-pointer group text-center"
      onClick={() => navigate(`/artist/${artist.id}`)}
    >
      <div className="relative mx-auto w-28 h-28 mb-3">
        <div className="absolute inset-0 rounded-full gradient-bg opacity-20 group-hover:opacity-40 transition-opacity blur-sm scale-110" />
        <img src={artist.image} alt={artist.name} className="w-full h-full rounded-full object-cover border-2 border-purple-900/50 group-hover:border-purple-500/50 transition-all" />
        {artist.verified && (
          <div className="absolute bottom-0 right-0 w-6 h-6 gradient-bg rounded-full flex items-center justify-center">
            <BadgeCheck size={13} className="text-white" />
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-white truncate">{artist.name}</p>
      <p className="text-xs text-slate-400">{artist.genre}</p>
    </motion.div>
  );
}
