import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Toast notification that auto-dismisses after 3 seconds
// Shows the most recent unread notification
export default function Toast() {
  const { notifications, markAllRead } = useApp();

  // Get the latest unread notification
  const latest = notifications.find(n => !n.read && n.time === 'Just now');

  useEffect(() => {
    if (!latest) return;
    const timer = setTimeout(() => markAllRead(), 3000);
    return () => clearTimeout(timer);
  }, [latest?.id]);

  return (
    <div className="fixed bottom-28 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {latest && (
          <motion.div
            key={latest.id}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="pointer-events-auto flex items-center gap-3 bg-surface glass-card border border-purple-500/30 rounded-2xl px-4 py-3 shadow-2xl max-w-xs"
          >
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
              <Bell size={14} className="text-white" />
            </div>
            <p className="text-sm text-white flex-1 leading-snug">{latest.message}</p>
            <button onClick={markAllRead} className="text-slate-400 hover:text-white transition-colors">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Notification dropdown panel (used in Navbar)
export function NotificationPanel({ onClose }) {
  const { notifications, markAllRead } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="absolute right-0 top-full mt-2 w-80 glass-card rounded-2xl shadow-2xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Bell size={15} className="text-purple-400" />
          <span className="text-sm font-semibold text-white">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-xs bg-pink-500 text-white px-1.5 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-purple-400 hover:text-white flex items-center gap-1 transition-colors">
            <Check size={12} /> Mark all read
          </button>
        )}
      </div>

      {/* Notification list */}
      <div className="max-h-72 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-sm">No notifications</div>
        ) : (
          notifications.map(n => (
            <div key={n.id}
              className={`flex items-start gap-3 px-4 py-3 border-b border-white/5 last:border-0 transition-colors ${!n.read ? 'bg-purple-500/5' : ''}`}
            >
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? 'bg-pink-500' : 'bg-transparent'}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-snug ${n.read ? 'text-slate-400' : 'text-white'}`}>{n.message}</p>
                <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
