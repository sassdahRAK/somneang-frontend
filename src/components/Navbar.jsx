import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, Sun, Moon, Menu, X, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { songs, artists } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onMenuClick }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { darkMode, setDarkMode } = useApp();
  const navigate = useNavigate();

  const handleSearch = (q) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }
    const songResults = songs.filter(s =>
      s.title.toLowerCase().includes(q.toLowerCase()) ||
      s.artist.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 4);
    const artistResults = artists.filter(a =>
      a.name.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 2);
    setResults([...songResults.map(s => ({ ...s, type: 'song' })), ...artistResults.map(a => ({ ...a, type: 'artist' }))]);
  };

  const handleSelect = (item) => {
    setQuery('');
    setResults([]);
    if (item.type === 'song') navigate(`/song/${item.id}`);
    else navigate(`/artist/${item.id}`);
  };

  return (
    <header className="sticky top-0 z-40 glass border-b border-purple-900/20 px-4 md:px-6 py-3 flex items-center gap-4">
      {/* Mobile menu button */}
      <button onClick={onMenuClick} className="md:hidden text-slate-400 hover:text-white">
        <Menu size={22} />
      </button>

      {/* Search */}
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
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <img src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm text-white font-medium">{item.title || item.name}</p>
                    <p className="text-xs text-slate-400">{item.type === 'song' ? item.artist : item.genre}</p>
                  </div>
                  <span className="ml-auto text-xs text-purple-400 capitalize">{item.type}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
          <Bell size={18} />
        </button>
        <button
          onClick={() => setDarkMode(d => !d)}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 glass-card rounded-full hover:border-purple-500/30 transition-all"
        >
          <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <span className="text-sm text-slate-300 hidden sm:block">Profile</span>
        </button>
      </div>
    </header>
  );
}
