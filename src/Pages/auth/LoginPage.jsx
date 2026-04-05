import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && password.trim().length > 0;
  }, [email, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    const baseName = email.includes("@") ? email.split("@")[0] : email;
    const displayName =
      baseName
        .split(/[._-]/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ") || "Tena";

    window.localStorage.setItem(
      "accountData",
      JSON.stringify({
        name: displayName,
        email: email.trim(),
        favoriteSongs: 3,
        playlists: 4,
        listeningHours: 120,
        avatarUrl: "",
      }),
    );

    navigate("/home");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: "min(420px, 100%)", display: "grid", gap: 10 }}
      >
        <h1 style={{ margin: 0 }}>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          style={{ height: 42, padding: "0 12px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          style={{ height: 42, padding: "0 12px" }}
        />
        <button type="submit" disabled={!canSubmit} style={{ height: 42 }}>
          Continue
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
