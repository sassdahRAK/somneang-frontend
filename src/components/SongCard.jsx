import { Play, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

export default function SongCard({ song, index, showIndex = false, horizontal = false }) {
  const navigate = useNavigate();
  const { playSong, toggleLike, likedSongs, currentSong, isPlaying } = useApp();
  const isLiked = likedSongs.has(song.id);
  const isCurrentlyPlaying = currentSong?.id === song.id && isPlaying;

  if (horizontal) {
    return (
      <motion.div
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer group transition-all"
        onClick={() => navigate(`/song/${song.id}`)}
      >
        {showIndex && <span className="text-slate-500 text-sm w-5 text-center">{index}</span>}
        <div className="relative flex-shrink-0">
          <img src={song.image} alt={song.title} className="w-11 h-11 rounded-lg object-cover" />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={e => { e.stopPropagation(); playSong(song); }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Play size={14} className="text-white ml-0.5" />
          </motion.button>
          {isCurrentlyPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
              <div className="flex gap-0.5 items-end h-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-0.5 bg-pink-400 rounded animate-bounce" style={{ height: `${[8,12,6][i-1]}px`, animationDelay: `${i*0.1}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${isCurrentlyPlaying ? 'text-pink-400' : 'text-white'}`}>{song.title}</p>
          <p className="text-xs text-slate-400 truncate">{song.artist}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-slate-500 hidden sm:block">{song.plays}</span>
          <button onClick={e => { e.stopPropagation(); toggleLike(song.id); }} className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart size={14} className={isLiked ? 'fill-pink-500 text-pink-500' : 'text-slate-400 hover:text-pink-400'} />
          </button>
          <span className="text-xs text-slate-500">{song.duration}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0 w-40"
      onClick={() => navigate(`/song/${song.id}`)}
    >
      <div className="relative aspect-square">
        <img src={song.image} alt={song.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={e => { e.stopPropagation(); playSong(song); }}
          className="absolute bottom-2 right-2 w-9 h-9 gradient-bg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
        >
          <Play size={14} className="text-white ml-0.5" />
        </motion.button>
        <button
          onClick={e => { e.stopPropagation(); toggleLike(song.id); }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart size={14} className={isLiked ? 'fill-pink-500 text-pink-500' : 'text-white hover:text-pink-400'} />
        </button>
        {isCurrentlyPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-1 items-end h-5">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-1 bg-pink-400 rounded animate-bounce" style={{ height: `${[10,18,12,16][i-1]}px`, animationDelay: `${i*0.1}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-white truncate">{song.title}</p>
        <p className="text-xs text-slate-400 truncate">{song.artist}</p>
      </div>
    </motion.div>
  );
}
