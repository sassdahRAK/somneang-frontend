import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { songs as defaultSongs } from '../data/mockData';

const AppContext = createContext();

// localStorage keys
const SONGS_KEY = 'somneang_songs';
const GENRES_KEY = 'somneang_genres';
const DARK_KEY = 'somneang_dark_mode';
const VOLUME_KEY = 'somneang_volume';

const DEFAULT_GENRES = [
  { id: 1, name: 'Electronic', color: '#a855f7' },
  { id: 2, name: 'Pop / R&B', color: '#ec4899' },
  { id: 3, name: 'Indie / Alt', color: '#06b6d4' },
  { id: 4, name: 'Lo-Fi / Chill', color: '#10b981' },
  { id: 5, name: 'Rock / Metal', color: '#ef4444' },
  { id: 6, name: 'Ambient', color: '#8b5cf6' },
];

const DEFAULT_NOTIFICATIONS = [
  { id: 1, message: 'Lavender Haze is trending today!', time: '2 min ago', read: false },
  { id: 2, message: 'New playlist "Chill Vibes" is ready for you', time: '1 hour ago', read: false },
  { id: 3, message: 'Welcome to Somneang Music!', time: '1 day ago', read: true },
];

// Helper: read from localStorage
function load(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

// Helper: write to localStorage
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

// AppProvider receives userId so it reloads user data when user switches
export function AppProvider({ children, userId = 'guest' }) {
  // Per-user localStorage keys
  const likedKey = `somneang_liked_${userId}`;
  const recentKey = `somneang_recent_${userId}`;
  const ratingsKey = `somneang_ratings_${userId}`;
  const notifsKey = `somneang_notifs_${userId}`;

  // Global state (shared across all users)
  const [songs, setSongs] = useState(() => load(SONGS_KEY, defaultSongs));
  const [genres, setGenres] = useState(() => load(GENRES_KEY, DEFAULT_GENRES));
  const [darkMode, setDarkModeState] = useState(() => load(DARK_KEY, true));
  const [volume, setVolumeState] = useState(() => load(VOLUME_KEY, 0.8));

  // Per-user state
  const [likedSongs, setLikedSongs] = useState(() => new Set(load(likedKey, [])));
  const [recentSongs, setRecentSongs] = useState(() => load(recentKey, []));
  const [ratings, setRatings] = useState(() => load(ratingsKey, {}));
  const [notifications, setNotifications] = useState(() => load(notifsKey, DEFAULT_NOTIFICATIONS));

  // Player state (not persisted — resets on refresh)
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [queue, setQueue] = useState(() => load(SONGS_KEY, defaultSongs));

  // Keep queue in sync with songs list
  useEffect(() => { setQueue(songs); }, [songs]);

  // Persist per-user data to localStorage
  useEffect(() => { save(likedKey, [...likedSongs]); }, [likedSongs, likedKey]);
  useEffect(() => { save(recentKey, recentSongs); }, [recentSongs, recentKey]);
  useEffect(() => { save(ratingsKey, ratings); }, [ratings, ratingsKey]);
  useEffect(() => { save(notifsKey, notifications); }, [notifications, notifsKey]);

  // Persist global data
  useEffect(() => { save(DARK_KEY, darkMode); }, [darkMode]);
  useEffect(() => { save(VOLUME_KEY, volume); }, [volume]);
  useEffect(() => { save(SONGS_KEY, songs); }, [songs]);
  useEffect(() => { save(GENRES_KEY, genres); }, [genres]);

  const setDarkMode = useCallback((val) => {
    setDarkModeState(typeof val === 'function' ? val : () => val);
  }, []);

  const setVolume = useCallback((val) => {
    setVolumeState(val);
  }, []);

  // Add a notification (called from any component)
  const addNotification = useCallback((message) => {
    const notif = { id: Date.now(), message, time: 'Just now', read: false };
    setNotifications(prev => [notif, ...prev].slice(0, 20));
  }, []);

  // Mark all notifications as read
  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  // Play a song and add it to recent history
  const playSong = useCallback((song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
    setRecentSongs(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 20);
    });
  }, []);

  const togglePlay = useCallback(() => setIsPlaying(p => !p), []);

  // Toggle like (component calls addNotification separately)
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
    playSong(queue[(idx + 1) % queue.length]);
  }, [currentSong, queue, playSong]);

  const prevSong = useCallback(() => {
    const idx = queue.findIndex(s => s.id === currentSong?.id);
    playSong(queue[(idx - 1 + queue.length) % queue.length]);
  }, [currentSong, queue, playSong]);

  // Rate a song (1–5 stars)
  const rateSong = useCallback((songId, rating) => {
    setRatings(prev => ({ ...prev, [songId]: rating }));
  }, []);

  // ── Admin: Song CRUD ──────────────────────────────────
  const addSong = useCallback((song) => {
    setSongs(prev => [...prev, { ...song, id: Date.now() }]);
  }, []);

  const updateSong = useCallback((id, updates) => {
    setSongs(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const deleteSong = useCallback((id) => {
    setSongs(prev => prev.filter(s => s.id !== id));
  }, []);

  // ── Admin: Genre CRUD ─────────────────────────────────
  const addGenre = useCallback((name, color) => {
    setGenres(prev => [...prev, { id: Date.now(), name, color: color || '#a855f7' }]);
  }, []);

  const updateGenre = useCallback((id, updates) => {
    setGenres(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  }, []);

  const deleteGenre = useCallback((id) => {
    setGenres(prev => prev.filter(g => g.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      // Player
      currentSong, isPlaying, volume, progress,
      playSong, togglePlay, nextSong, prevSong,
      setVolume, setProgress,
      // User data (persisted per user)
      likedSongs, toggleLike,
      recentSongs,
      ratings, rateSong,
      notifications, addNotification, markAllRead,
      // App settings (persisted globally)
      darkMode, setDarkMode,
      // Data (admin-editable, persisted globally)
      songs, addSong, updateSong, deleteSong,
      genres, addGenre, updateGenre, deleteGenre,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
