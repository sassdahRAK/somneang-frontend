import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/top-charts" element={<TopCharts />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
            <Route path="/song/:id" element={<SongDetail />} />
            <Route path="/playlist/:id" element={<PlaylistDetail />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
