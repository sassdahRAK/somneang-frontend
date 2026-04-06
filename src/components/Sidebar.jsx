import { NavLink } from 'react-router-dom';
import { Home, TrendingUp, BarChart2, Heart, Clock, Music2, LayoutDashboard, ListMusic, Tag, Users } from 'lucide-react';
import Logo from './Logo';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { icon: Home, label: 'Home', to: '/home' },
  { icon: TrendingUp, label: 'Trending', to: '/trending' },
  { icon: BarChart2, label: 'Top Charts', to: '/top-charts' },
  { icon: Heart, label: 'Favorites', to: '/favorites' },
  { icon: Clock, label: 'Recent', to: '/recent' },
];

const adminItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/admin' },
  { icon: ListMusic, label: 'Songs', to: '/admin/songs' },
  { icon: Tag, label: 'Genres', to: '/admin/genres' },
  { icon: Users, label: 'Users', to: '/admin/users' },
];

function NavItem({ icon: Icon, label, to, onClose }) {
  return (
    <NavLink
      to={to}
      onClick={onClose}
      end={to === '/admin'}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
        ${isActive
          ? 'gradient-bg text-white shadow-lg glow-purple'
          : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-purple-400'} />
          <span className="font-medium text-sm">{label}</span>
          {isActive && (
            <motion.div layoutId="activeIndicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
          )}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ mobile, onClose }) {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  return (
    <motion.aside
      initial={{ x: mobile ? -280 : 0 }}
      animate={{ x: 0 }}
      className={`flex flex-col h-full w-64 glass border-r border-purple-900/30 ${mobile ? 'fixed z-50 top-0 left-0' : ''}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 pb-8">
        <Logo size={38} />
        <div>
          <h1 className="font-display font-bold text-xl gradient-text">Somneang</h1>
          <p className="text-xs text-purple-400/70">Music Streaming</p>
        </div>
      </div>

      <div className="flex-1 px-3 space-y-1 overflow-y-auto">
        {/* Main navigation */}
        {navItems.map(item => (
          <NavItem key={item.to} {...item} onClose={onClose} />
        ))}

        {/* Admin section — only shown to admin users */}
        {isAdmin && (
          <>
            <div className="pt-4 pb-1 px-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin Panel</p>
            </div>
            {adminItems.map(item => (
              <NavItem key={item.to} {...item} onClose={onClose} />
            ))}
          </>
        )}
      </div>

      {/* Library footer */}
      <div className="p-4 m-3 glass-card rounded-2xl">
        <div className="flex items-center gap-3">
          <Music2 size={16} className="text-pink-400" />
          <span className="text-xs text-slate-400 font-medium">Library</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">Your music, your world</p>
      </div>
    </motion.aside>
  );
}
