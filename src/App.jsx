import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/auth/LoginPage";
import SignUpPage from "./Pages/auth/SignUpPage";
import HomePage from "./Pages/home/HomePage";
import SearchPage from "./Pages/search/SearchPage";
import FavoritesPage from "./Pages/favorites/FavoritesPage";
import AccountPage from "./Pages/account/AccountPage";
import ForgotPasswordPage from "./Pages/auth/ForgotPasswordPage";
import VerifyCodePage from "./Pages/auth/VerifyCodePage";
import NewPasswordPage from "./Pages/auth/NewPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-code" element={<VerifyCodePage />} />
        <Route path="/new-password" element={<NewPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
