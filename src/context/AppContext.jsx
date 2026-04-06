import { createContext, useContext, useState, useCallback } from 'react';
import { songs as allSongs } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(allSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [likedSongs, setLikedSongs] = useState(new Set(allSongs.filter(s => s.liked).map(s => s.id)));
  const [darkMode, setDarkMode] = useState(true);
  const [queue, setQueue] = useState(allSongs);

  const playSong = useCallback((song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
  }, []);

  const togglePlay = useCallback(() => setIsPlaying(p => !p), []);

  const toggleLike = useCallback((id) => {
    setLikedSongs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const nextSong = useCallback(() => {
    const idx = queue.findIndex(s => s.id === currentSong?.id);
    const next = queue[(idx + 1) % queue.length];
    setCurrentSong(next);
    setProgress(0);
  }, [currentSong, queue]);

  const prevSong = useCallback(() => {
    const idx = queue.findIndex(s => s.id === currentSong?.id);
    const prev = queue[(idx - 1 + queue.length) % queue.length];
    setCurrentSong(prev);
    setProgress(0);
  }, [currentSong, queue]);

  return (
    <AppContext.Provider value={{
      currentSong, isPlaying, volume, progress, likedSongs, darkMode,
      playSong, togglePlay, toggleLike, nextSong, prevSong,
      setVolume, setProgress, setDarkMode
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
