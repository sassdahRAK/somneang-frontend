import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const USERS_KEY = 'somneang_users';
const CURRENT_KEY = 'somneang_current_user';

// Default admin account
const DEFAULT_ADMIN = {
  id: 'admin-1',
  name: 'Admin',
  email: 'admin@somneang.app',
  password: 'admin123',
  role: 'admin',
  avatar: null,
  joinDate: '2024-01-01',
};

function loadUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    const users = stored ? JSON.parse(stored) : [];
    // Always ensure admin account exists
    if (!users.find(u => u.id === 'admin-1')) {
      users.unshift(DEFAULT_ADMIN);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    return users;
  } catch {
    return [DEFAULT_ADMIN];
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const id = localStorage.getItem(CURRENT_KEY);
      if (!id) return null;
      return loadUsers().find(u => u.id === id) || null;
    } catch {
      return null;
    }
  });

  // Login: check email + password in localStorage users
  const login = (email, password) => {
    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { error: 'Invalid email or password' };
    localStorage.setItem(CURRENT_KEY, user.id);
    setCurrentUser(user);
    return { user };
  };

  // Register: create new user and save to localStorage
  const register = (name, email, password) => {
    const users = loadUsers();
    if (users.find(u => u.email === email)) return { error: 'Email already exists' };
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: 'user',
      avatar: null,
      joinDate: new Date().toISOString().split('T')[0],
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    localStorage.setItem(CURRENT_KEY, newUser.id);
    setCurrentUser(newUser);
    return { user: newUser };
  };

  // Logout: clear current user
  const logout = () => {
    localStorage.removeItem(CURRENT_KEY);
    setCurrentUser(null);
  };

  // Update profile: save changes to localStorage
  const updateProfile = (updates) => {
    const users = loadUsers();
    const updated = users.map(u => u.id === currentUser.id ? { ...u, ...updates } : u);
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    return updatedUser;
  };

  // Get all non-admin users (for admin panel)
  const getAllUsers = () => loadUsers().filter(u => u.role !== 'admin');

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, updateProfile, getAllUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
