import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sun, Moon, Menu, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationPanel } from './Toast';

export default function Navbar({ onMenuClick }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const { darkMode, setDarkMode, songs, notifications } = useApp();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const notifsRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close notification panel when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (notifsRef.current && !notifsRef.current.contains(e.target)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (q) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }

    // Search songs and group by type
    const songResults = songs.filter(s =>
      s.title.toLowerCase().includes(q.toLowerCase()) ||
      s.artist.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 5);

    setResults(songResults.map(s => ({ ...s, type: 'song' })));
  };

  const handleSelect = (item) => {
    setQuery('');
    setResults([]);
    navigate(`/song/${item.id}`);
  };

  // Get avatar letter from user name
  const avatarLetter = currentUser?.name?.[0]?.toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-40 glass border-b border-purple-900/20 px-4 md:px-6 py-3 flex items-center gap-4">
      {/* Mobile menu button */}
      <button onClick={onMenuClick} className="md:hidden text-slate-400 hover:text-white">
        <Menu size={22} />
      </button>

      {/* Search bar */}
      <div className="flex-1 relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search songs, artists..."
          className="w-full pl-9 pr-4 py-2 bg-white/5 border border-purple-900/30 rounded-full text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
        />
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full glass-card rounded-2xl overflow-hidden z-50 shadow-2xl"
            >
              {results.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <img src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm text-white font-medium">{item.title}</p>
                    <p className="text-xs text-slate-400">{item.artist}</p>
                  </div>
                  <span className="ml-auto text-xs text-purple-400">Song</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notification bell */}
        <div className="relative" ref={notifsRef}>
          <button
            onClick={() => setShowNotifs(s => !s)}
            className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-pink-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          <AnimatePresence>
            {showNotifs && <NotificationPanel onClose={() => setShowNotifs(false)} />}
          </AnimatePresence>
        </div>

        {/* Dark/light mode toggle */}
        <button
          onClick={() => setDarkMode(d => !d)}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Profile button — shows user initial */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 glass-card rounded-full hover:border-purple-500/30 transition-all"
        >
          <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-white">
            {avatarLetter}
          </div>
          <span className="text-sm text-slate-300 hidden sm:block">
            {currentUser?.name?.split(' ')[0] || 'Profile'}
          </span>
        </button>
      </div>
    </header>
  );
}
