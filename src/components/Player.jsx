import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Repeat, Shuffle, ChevronUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Player() {
  const { currentSong, isPlaying, volume, progress, likedSongs, togglePlay, toggleLike, nextSong, prevSong, setVolume, setProgress } = useApp();
  const [expanded, setExpanded] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { clearInterval(intervalRef.current); return 0; }
          return p + 0.1;
        });
      }, 200);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, setProgress]);

  if (!currentSong) return null;
  const isLiked = likedSongs.has(currentSong.id);

  const formatTime = (pct) => {
    const parts = currentSong.duration.split(':');
    const total = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    const current = Math.floor((pct / 100) * total);
    return `${Math.floor(current / 60)}:${String(current % 60).padStart(2, '0')}`;
  };

  return (
    <>
      {/* Backdrop when expanded on mobile */}
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setExpanded(false)} />
        )}
      </AnimatePresence>

      <motion.div
        layout
        className={`fixed z-50 transition-all duration-300 ${
          expanded
            ? 'bottom-0 left-0 right-0 md:left-64 glass border-t border-purple-900/30 rounded-t-3xl p-6'
            : 'bottom-0 left-0 right-0 md:left-64 glass border-t border-purple-900/20 px-4 py-3'
        }`}
      >
        {expanded ? (
          /* Expanded Player */
          <div className="max-w-lg mx-auto">
            <button onClick={() => setExpanded(false)} className="flex items-center gap-1 text-slate-400 hover:text-white mb-4 text-sm">
              <ChevronUp size={16} /> <span>Close</span>
            </button>
            <div className="flex flex-col items-center gap-4">
              <motion.img
                key={currentSong.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={currentSong.image}
                alt={currentSong.title}
                className={`w-48 h-48 rounded-3xl object-cover shadow-2xl ${isPlaying ? 'spin-slow pulse-glow' : ''}`}
                style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
              />
              <div className="text-center">
                <h3 className="font-display font-bold text-xl text-white">{currentSong.title}</h3>
                <p className="text-purple-400">{currentSong.artist}</p>
              </div>
              <div className="w-full">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>{formatTime(progress)}</span>
                  <span>{currentSong.duration}</span>
                </div>
                <input type="range" min={0} max={100} value={progress}
                  onChange={e => setProgress(Number(e.target.value))}
                  className="player-progress w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #f472b6 ${progress}%, #3d3d5c ${progress}%)` }}
                />
              </div>
              <div className="flex items-center gap-6">
                <button onClick={() => setShuffle(s => !s)} className={shuffle ? 'text-pink-400' : 'text-slate-400 hover:text-white'}>
                  <Shuffle size={18} />
                </button>
                <button onClick={prevSong} className="text-slate-300 hover:text-white"><SkipBack size={22} /></button>
                <button onClick={togglePlay} className="w-14 h-14 gradient-bg rounded-full flex items-center justify-center shadow-lg glow-purple hover:scale-105 transition-transform">
                  {isPlaying ? <Pause size={22} className="text-white" /> : <Play size={22} className="text-white ml-0.5" />}
                </button>
                <button onClick={nextSong} className="text-slate-300 hover:text-white"><SkipForward size={22} /></button>
                <button onClick={() => setRepeat(r => !r)} className={repeat ? 'text-pink-400' : 'text-slate-400 hover:text-white'}>
                  <Repeat size={18} />
                </button>
              </div>
              <div className="flex items-center gap-3 w-full">
                <button onClick={() => toggleLike(currentSong.id)}>
                  <Heart size={18} className={isLiked ? 'fill-pink-500 text-pink-500' : 'text-slate-400 hover:text-white'} />
                </button>
                <button onClick={() => setVolume(v => v > 0 ? 0 : 0.8)} className="text-slate-400 hover:text-white">
                  {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <input type="range" min={0} max={1} step={0.01} value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className="player-progress flex-1 h-1 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #a855f7 ${volume * 100}%, #3d3d5c ${volume * 100}%)` }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Mini Player */
          <div className="flex items-center gap-3 max-w-screen-xl mx-auto">
            <button onClick={() => setExpanded(true)} className="flex items-center gap-3 flex-1 min-w-0">
              <img src={currentSong.image} alt="" className={`w-10 h-10 rounded-xl object-cover flex-shrink-0 ${isPlaying ? 'spin-slow' : ''}`} />
              <div className="min-w-0 text-left">
                <p className="text-sm font-medium text-white truncate">{currentSong.title}</p>
                <p className="text-xs text-slate-400 truncate">{currentSong.artist}</p>
              </div>
            </button>

            {/* Progress bar */}
            <div className="hidden sm:block flex-1 max-w-xs">
              <input type="range" min={0} max={100} value={progress}
                onChange={e => setProgress(Number(e.target.value))}
                className="player-progress w-full h-1 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #f472b6 ${progress}%, #3d3d5c ${progress}%)` }}
              />
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => toggleLike(currentSong.id)} className="hidden sm:block">
                <Heart size={16} className={isLiked ? 'fill-pink-500 text-pink-500' : 'text-slate-500 hover:text-white'} />
              </button>
              <button onClick={prevSong} className="text-slate-400 hover:text-white hidden sm:block"><SkipBack size={18} /></button>
              <button onClick={togglePlay} className="w-9 h-9 gradient-bg rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                {isPlaying ? <Pause size={15} className="text-white" /> : <Play size={15} className="text-white ml-0.5" />}
              </button>
              <button onClick={nextSong} className="text-slate-400 hover:text-white"><SkipForward size={18} /></button>
              <div className="hidden md:flex items-center gap-2">
                <Volume2 size={15} className="text-slate-400" />
                <input type="range" min={0} max={1} step={0.01} value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className="player-progress w-20 h-1 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #a855f7 ${volume * 100}%, #3d3d5c ${volume * 100}%)` }}
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
