import { motion } from 'framer-motion';
import { Users, Calendar, Mail, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminUsers() {
  const { getAllUsers } = useAuth();
  const users = getAllUsers();

  return (
    <div className="p-5 md:p-7">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="font-display font-bold text-2xl text-white">User Management</h1>
        <p className="text-slate-400 text-sm">{users.length} registered users</p>
      </motion.div>

      {/* Users list */}
      {users.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center">
          <Users size={48} className="text-slate-600 mb-4" />
          <h3 className="font-display text-lg text-slate-400 mb-2">No users yet</h3>
          <p className="text-slate-500 text-sm">Users will appear here once they register</p>
        </motion.div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-4 gap-4 px-5 py-3 border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider font-semibold">
            <span>User</span>
            <span>Email</span>
            <span>Role</span>
            <span>Joined</span>
          </div>

          {users.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col md:grid md:grid-cols-4 gap-2 md:gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-white font-medium truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 md:hidden">{user.email}</p>
                </div>
              </div>

              {/* Email */}
              <div className="hidden md:flex items-center gap-2 text-sm text-slate-300">
                <Mail size={13} className="text-slate-500 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>

              {/* Role badge */}
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit
                  ${user.role === 'admin' ? 'bg-purple-500/15 text-purple-300' : 'bg-blue-500/15 text-blue-300'}`}>
                  {user.role === 'admin' ? <ShieldCheck size={11} /> : <User size={11} />}
                  {user.role === 'admin' ? 'Admin' : 'User'}
                </div>
              </div>

              {/* Join date */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar size={12} className="text-slate-500 flex-shrink-0" />
                {user.joinDate || 'Unknown'}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
