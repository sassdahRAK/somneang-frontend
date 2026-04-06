import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save, Music, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const EMPTY_FORM = { title: '', artist: '', album: '', duration: '', plays: '0', image: '' };

export default function AdminSongs() {
  const { songs, addSong, updateSong, deleteSong, genres } = useApp();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const filtered = songs.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.artist.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setError('');
    setShowForm(true);
  };

  const openEdit = (song) => {
    setEditId(song.id);
    setForm({ title: song.title, artist: song.artist, album: song.album || '', duration: song.duration, plays: song.plays || '0', image: song.image || '' });
    setError('');
    setShowForm(true);
  };

  const handleSave = () => {
    setError('');
    if (!form.title.trim()) { setError('Title is required'); return; }
    if (!form.artist.trim()) { setError('Artist is required'); return; }
    if (!form.duration.trim()) { setError('Duration is required (e.g. 3:45)'); return; }

    if (editId) {
      updateSong(editId, { ...form, title: form.title.trim(), artist: form.artist.trim() });
    } else {
      addSong({ ...form, title: form.title.trim(), artist: form.artist.trim(), artistId: 1, liked: false });
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this song?')) deleteSong(id);
  };

  return (
    <div className="p-5 md:p-7">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Song Management</h1>
          <p className="text-slate-400 text-sm">{songs.length} songs total</p>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={openAdd}
          className="flex items-center gap-2 gradient-bg px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg hover:opacity-90">
          <Plus size={16} /> Add Song
        </motion.button>
      </motion.div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search songs..."
          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-purple-900/30 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all max-w-md" />
      </div>

      {/* Songs list */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <Music size={36} className="mx-auto mb-3 opacity-30" />
            <p>No songs found</p>
          </div>
        ) : (
          filtered.map((song, i) => (
            <motion.div key={song.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.02 }}
              className="flex items-center gap-4 px-5 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
            >
              <img src={song.image || `https://picsum.photos/seed/${song.id}/60/60`} alt=""
                className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{song.title}</p>
                <p className="text-xs text-slate-400">{song.artist} · {song.album}</p>
              </div>
              <span className="text-xs text-slate-500 hidden sm:block">{song.duration}</span>
              <span className="text-xs text-purple-400 hidden md:block">{song.plays} plays</span>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => openEdit(song)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(song.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add / Edit form modal */}
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
              className="glass-card rounded-3xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-lg text-white">{editId ? 'Edit Song' : 'Add New Song'}</h3>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
              </div>

              <div className="space-y-3">
                {[
                  { field: 'title', label: 'Title *', placeholder: 'Song title' },
                  { field: 'artist', label: 'Artist *', placeholder: 'Artist name' },
                  { field: 'album', label: 'Album', placeholder: 'Album name' },
                  { field: 'duration', label: 'Duration *', placeholder: '3:45' },
                  { field: 'plays', label: 'Plays', placeholder: '1.2M' },
                  { field: 'image', label: 'Image URL', placeholder: 'https://...' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label className="text-xs text-slate-400 mb-1 block">{label}</label>
                    <input type="text" value={form[field]} onChange={set(field)} placeholder={placeholder}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-purple-900/40 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-all" />
                  </div>
                ))}
                {error && <p className="text-red-400 text-xs">{error}</p>}
              </div>

              <div className="flex gap-3 mt-5">
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 gradient-bg py-2.5 rounded-xl text-white font-medium text-sm">
                  <Save size={15} /> {editId ? 'Update' : 'Add Song'}
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
