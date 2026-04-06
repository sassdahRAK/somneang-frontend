import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Zap } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import SongCard from '../components/SongCard';
import ArtistCard from '../components/ArtistCard';
import PlaylistCard from '../components/PlaylistCard';
import { SkeletonCard, SkeletonArtist } from '../components/Skeleton';
import { songs, artists, playlists } from '../data/mockData';
import { useApp } from '../context/AppContext';

const popularSongs = songs.slice(0, 8);
const popularArtists = artists;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { playSong } = useApp();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const featured = songs[9]; // Lavender Haze

  return (
    <div className="p-5 md:p-7 space-y-8">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden h-52 md:h-64"
      >
        <img src={featured.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(13,13,20,0.95) 0%, rgba(13,13,20,0.6) 60%, transparent 100%)' }} />
        <div className="absolute inset-0 flex items-center px-7">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-yellow-400" />
              <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Featured Song</span>
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-1">{featured.title}</h2>
            <p className="text-slate-300 text-sm mb-4">{featured.artist} · {featured.album}</p>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => playSong(featured)}
              className="flex items-center gap-2 gradient-bg px-5 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg"
            >
              <Play size={16} className="ml-0.5" /> Play Now
            </motion.button>
          </div>
        </div>
        {/* Floating music bars */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-end gap-1 h-16 opacity-40">
          {[1,2,3,4,5,6].map(i => (
            <motion.div key={i} className="w-1.5 rounded-full bg-pink-400"
              animate={{ height: [8, 32 + i * 4, 12, 40, 8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }} />
          ))}
        </div>
      </motion.div>

      {/* Popular Artists */}
      <section>
        <SectionHeader title="Popular Artists" subtitle="Artists you might love" />
        <div className="flex gap-5 overflow-x-auto pb-2 hide-scrollbar">
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonArtist key={i} />)
            : popularArtists.map((artist, i) => (
              <motion.div key={artist.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <ArtistCard artist={artist} />
              </motion.div>
            ))}
        </div>
      </section>

      {/* Popular Songs */}
      <section>
        <SectionHeader title="Popular Songs" subtitle="Top tracks right now" link="/trending" />
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : popularSongs.map((song, i) => (
              <motion.div key={song.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <SongCard song={song} />
              </motion.div>
            ))}
        </div>
      </section>

      {/* My Playlists */}
      <section>
        <SectionHeader title="My Playlists" subtitle="Your personal collections" />
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {playlists.map((pl, i) => (
            <motion.div key={pl.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <PlaylistCard playlist={pl} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
