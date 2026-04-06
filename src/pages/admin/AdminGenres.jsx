import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Pencil, X, Save, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const COLOR_OPTIONS = [
  '#a855f7', '#ec4899', '#06b6d4', '#10b981', '#ef4444', '#8b5cf6',
  '#f59e0b', '#3b82f6', '#14b8a6', '#f97316',
];

export default function AdminGenres() {
  const { genres, addGenre, updateGenre, deleteGenre, songs } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [error, setError] = useState('');

  // Count songs per genre name
  const songCount = (genreName) =>
    songs.filter(s => {
      // Match by artist genre or direct genre field
      return s.genre === genreName || s.artistGenre === genreName;
    }).length;

  const openAdd = () => {
    setEditId(null);
    setName('');
    setColor(COLOR_OPTIONS[0]);
    setError('');
    setShowForm(true);
  };

  const openEdit = (genre) => {
    setEditId(genre.id);
    setName(genre.name);
    setColor(genre.color);
    setError('');
    setShowForm(true);
  };

  const handleSave = () => {
    setError('');
    if (!name.trim()) { setError('Genre name is required'); return; }
    if (genres.find(g => g.name.toLowerCase() === name.trim().toLowerCase() && g.id !== editId)) {
      setError('Genre already exists');
      return;
    }
    if (editId) {
      updateGenre(editId, { name: name.trim(), color });
    } else {
      addGenre(name.trim(), color);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this genre?')) deleteGenre(id);
  };

  return (
    <div className="p-5 md:p-7">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Genre Management</h1>
          <p className="text-slate-400 text-sm">{genres.length} genres</p>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={openAdd}
          className="flex items-center gap-2 gradient-bg px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg hover:opacity-90">
          <Plus size={16} /> Add Genre
        </motion.button>
      </motion.div>

      {/* Genres grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {genres.map((genre, i) => (
          <motion.div
            key={genre.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="glass-card rounded-2xl p-5 flex items-center gap-4"
          >
            {/* Color swatch */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${genre.color}20`, border: `2px solid ${genre.color}40` }}>
              <Tag size={20} style={{ color: genre.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{genre.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">Genre</p>
            </div>
            {/* Color dot */}
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: genre.color }} />
            <div className="flex flex-col gap-1">
              <button onClick={() => openEdit(genre)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Pencil size={13} />
              </button>
              <button onClick={() => handleDelete(genre.id)}
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add / Edit modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-3xl p-6 w-full max-w-sm shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-lg text-white">{editId ? 'Edit Genre' : 'Add Genre'}</h3>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
              </div>

              {/* Genre name */}
              <div className="mb-4">
                <label className="text-xs text-slate-400 mb-1.5 block">Genre Name *</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="e.g. Jazz, Hip-Hop"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-purple-900/40 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-all" />
              </div>

              {/* Color picker */}
              <div className="mb-4">
                <label className="text-xs text-slate-400 mb-2 block">Color</label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map(c => (
                    <button key={c} onClick={() => setColor(c)}
                      className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ${color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110' : ''}`}
                      style={{ background: c }} />
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="flex items-center gap-3 p-3 rounded-xl mb-4"
                style={{ background: `${color}10`, border: `1px solid ${color}30` }}>
                <Tag size={16} style={{ color }} />
                <span className="text-sm font-medium" style={{ color }}>{name || 'Preview'}</span>
              </div>

              {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 gradient-bg py-2.5 rounded-xl text-white font-medium text-sm">
                  <Save size={15} /> {editId ? 'Update' : 'Add Genre'}
                </motion.button>
                <button onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 glass-card rounded-xl text-slate-300 text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
