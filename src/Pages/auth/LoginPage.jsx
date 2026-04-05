import { useMemo, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import appLogo from "../../assets/download (2).png";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && password.trim().length > 0;
  }, [email, password]);

  const createMockAccountData = () => {
    const trimmedEmail = email.trim();
    const baseName = trimmedEmail.includes("@")
      ? trimmedEmail.split("@")[0]
      : trimmedEmail;

    const name = baseName
      .split(/[._-]/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    return {
      name: name || "Somneang User",
      email: trimmedEmail || "user@example.com",
      favoriteSongs: 3,
      playlists: 4,
      listeningHours: 120,
      avatarUrl: "",
      stats: {
        favoriteSongs: 3,
        playlists: 4,
        listeningHours: 120,
      },
      lastLoginAt: new Date().toISOString(),
    };
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    const accountData = createMockAccountData();
    window.localStorage.setItem("accountData", JSON.stringify(accountData));
    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-glow login-glow-top" aria-hidden="true" />
      <div className="login-glow login-glow-bottom" aria-hidden="true" />

      <section className="login-card">
        <div className="login-logo-wrap" aria-hidden="true">
          <img src={appLogo} alt="" className="login-logo" />
        </div>
        <p className="login-badge">Somneang</p>
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Log in to continue your music journey</p>

        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="login-email" className="login-label">
            Email
          </label>
          <div className="login-input-wrap">
            <FaEnvelope />
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <label htmlFor="login-password" className="login-label">
            Password
          </label>
          <div className="login-input-wrap">
            <FaLock />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="login-visibility-btn"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={!canSubmit}
          >
            Log In
          </button>
        </form>

        <button
          type="button"
          className="login-link-btn"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </button>

        <p className="login-switch-text">
          Don&apos;t have an account?
          <button
            type="button"
            className="login-link-inline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </section>
    </div>
  );
}

export default LoginPage;
