import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ForgotPassword, VerifyCode, ResetPassword } from './pages/AuthPages';
import Home from './pages/Home';
import { Trending, TopCharts, Favorites, Recent } from './pages/ListPages';
import { ArtistDetail, SongDetail, PlaylistDetail } from './pages/DetailPages';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSongs from './pages/admin/AdminSongs';
import AdminGenres from './pages/admin/AdminGenres';
import AdminUsers from './pages/admin/AdminUsers';

// Redirect to /login if not logged in
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

// Redirect to /home if not admin
function AdminRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== 'admin') return <Navigate to="/home" replace />;
  return children;
}

// Inner wrapper so AppProvider can read currentUser from AuthContext
function AppWrapper() {
  const { currentUser } = useAuth();

  return (
    // key={currentUser?.id} forces AppProvider to reload localStorage data when user changes
    <AppProvider key={currentUser?.id || 'guest'} userId={currentUser?.id || 'guest'}>
      <BrowserRouter>
        <Routes>
          {/* Auth pages (no sidebar/player) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Main app pages (with sidebar + player) */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/home" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/top-charts" element={<TopCharts />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
            <Route path="/song/:id" element={<SongDetail />} />
            <Route path="/playlist/:id" element={<PlaylistDetail />} />

            {/* Admin-only pages */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/songs" element={<AdminRoute><AdminSongs /></AdminRoute>} />
            <Route path="/admin/genres" element={<AdminRoute><AdminGenres /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
}
