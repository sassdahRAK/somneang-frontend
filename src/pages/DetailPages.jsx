import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, BadgeCheck, Music, Heart, Users, Disc } from 'lucide-react';
import { motion } from 'framer-motion';
import SongCard from '../components/SongCard';
import StarRating from '../components/StarRating';
import { artists, playlists } from '../data/mockData';
import { useApp } from '../context/AppContext';

function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group">
      <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm">Back</span>
    </button>
  );
}

export function ArtistDetail() {
  const { id } = useParams();
  const artist = artists.find(a => a.id === Number(id));
  const { playSong, songs } = useApp();
  if (!artist) return <div className="p-7 text-slate-400">Artist not found</div>;

  const artistSongs = songs.filter(s => artist.songs.includes(s.id));

  return (
    <div className="p-5 md:p-7">
      <BackButton />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden h-56 mb-6">
          <img src={artist.image} alt={artist.name} className="w-full h-full object-cover scale-110" style={{ filter: 'blur(2px)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 flex items-end gap-5">
            <img src={artist.image} alt={artist.name} className="w-24 h-24 rounded-2xl object-cover border-2 border-purple-500/50 shadow-2xl" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-3xl text-white">{artist.name}</h1>
                {artist.verified && <BadgeCheck size={20} className="text-purple-400" />}
              </div>
              <p className="text-purple-300">{artist.genre}</p>
              <div className="flex items-center gap-1 mt-1">
                <Users size={12} className="text-slate-400" />
                <span className="text-xs text-slate-400">{artist.followers} followers</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <motion.button whileTap={{ scale: 0.95 }}
            onClick={() => artistSongs[0] && playSong(artistSongs[0])}
            className="flex items-center gap-2 gradient-bg px-6 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg hover:opacity-90">
            <Play size={16} className="ml-0.5" /> Play All
          </motion.button>
        </div>

        <h2 className="font-display font-bold text-lg text-white mb-3">Songs</h2>
        <div className="glass-card rounded-2xl overflow-hidden">
          {artistSongs.map((song, i) => (
            <motion.div key={song.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="border-b border-white/5 last:border-0">
              <SongCard song={song} index={i + 1} showIndex horizontal />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function SongDetail() {
  const { id } = useParams();
  const { playSong, toggleLike, likedSongs, isPlaying, currentSong, songs, addNotification } = useApp();
  const song = songs.find(s => s.id === Number(id));
  if (!song) return <div className="p-7 text-slate-400">Song not found</div>;

  const isLiked = likedSongs.has(song.id);
  const isCurrentPlaying = currentSong?.id === song.id && isPlaying;
  const related = songs.filter(s => s.artistId === song.artistId && s.id !== song.id).slice(0, 5);

  const handleToggleLike = () => {
    toggleLike(song.id);
    if (!isLiked) addNotification(`Added "${song.title}" to your favorites!`);
  };

  return (
    <div className="p-5 md:p-7">
      <BackButton />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          {/* Album art */}
          <div className="relative flex-shrink-0">
            <img src={song.image} alt={song.title}
              className={`w-48 h-48 rounded-3xl object-cover shadow-2xl mx-auto sm:mx-0 ${isCurrentPlaying ? 'spin-slow' : ''}`}
              style={{ animationPlayState: isCurrentPlaying ? 'running' : 'paused' }} />
            {isCurrentPlaying && (
              <div className="absolute inset-0 rounded-3xl border-2 border-pink-500/50 pulse-glow" />
            )}
          </div>

          {/* Song info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1">
              <Disc size={14} className="text-purple-400" />
              <span className="text-xs text-purple-400 uppercase tracking-wider">{song.album}</span>
            </div>
            <h1 className="font-display font-bold text-3xl text-white mb-1">{song.title}</h1>
            <p className="text-slate-300 mb-1">{song.artist}</p>
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
              <span>{song.plays} plays</span>
              <span>·</span>
              <span>{song.duration}</span>
            </div>

            {/* Play + Like buttons */}
            <div className="flex items-center gap-3 mb-5">
              <motion.button whileTap={{ scale: 0.95 }}
                onClick={() => playSong(song)}
                className="flex items-center gap-2 gradient-bg px-7 py-3 rounded-full text-white font-semibold shadow-lg hover:opacity-90">
                <Play size={18} className="ml-0.5" />
                {isCurrentPlaying ? 'Playing' : 'Play'}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={handleToggleLike}
                className="w-11 h-11 glass-card rounded-full flex items-center justify-center hover:border-pink-500/30 transition-all">
                <Heart size={18} className={isLiked ? 'fill-pink-500 text-pink-500' : 'text-slate-400 hover:text-pink-400'} />
              </motion.button>
            </div>

            {/* Star rating */}
            <div>
              <p className="text-xs text-slate-400 mb-2">Rate this song</p>
              <StarRating songId={song.id} />
            </div>
          </div>
        </div>

        {/* Related songs */}
        {related.length > 0 && (
          <>
            <h2 className="font-display font-bold text-lg text-white mb-3">More by {song.artist}</h2>
            <div className="glass-card rounded-2xl overflow-hidden">
              {related.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
                  className="border-b border-white/5 last:border-0">
                  <SongCard song={s} horizontal />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export function PlaylistDetail() {
  const { id } = useParams();
  const playlist = playlists.find(p => p.id === Number(id));
  const { playSong, songs } = useApp();
  if (!playlist) return <div className="p-7 text-slate-400">Playlist not found</div>;

  const playlistSongs = songs.filter(s => playlist.songs.includes(s.id));
  const totalDuration = playlistSongs.reduce((acc, s) => {
    const [m, sec] = s.duration.split(':').map(Number);
    return acc + m * 60 + sec;
  }, 0);
  const durationStr = `${Math.floor(totalDuration / 60)}m ${totalDuration % 60}s`;

  return (
    <div className="p-5 md:p-7">
      <BackButton />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <img src={playlist.image} alt={playlist.name} className="w-44 h-44 rounded-3xl object-cover shadow-2xl flex-shrink-0 mx-auto sm:mx-0" />
          <div className="flex flex-col justify-center">
            <span className="text-xs text-purple-400 uppercase tracking-wider mb-1">Playlist</span>
            <h1 className="font-display font-bold text-3xl text-white mb-1">{playlist.name}</h1>
            <p className="text-slate-400 text-sm mb-2">{playlist.description}</p>
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-5">
              <span className="flex items-center gap-1"><Music size={11} /> {playlistSongs.length} songs</span>
              <span>·</span><span>{durationStr}</span>
              <span>·</span><span>By {playlist.createdBy}</span>
            </div>
            <motion.button whileTap={{ scale: 0.95 }}
              onClick={() => playlistSongs[0] && playSong(playlistSongs[0])}
              className="flex items-center gap-2 gradient-bg px-7 py-3 rounded-full text-white font-semibold shadow-lg hover:opacity-90 w-fit">
              <Play size={18} className="ml-0.5" /> Play All
            </motion.button>
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          {playlistSongs.map((song, i) => (
            <motion.div key={song.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className="border-b border-white/5 last:border-0">
              <SongCard song={song} index={i + 1} showIndex horizontal />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
