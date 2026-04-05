import { useState } from "react";
import {
  FaArrowLeft,
  FaBell,
  FaChevronRight,
  FaKey,
  FaMoon,
  FaMusic,
  FaShieldAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AccountStorage from "./accountStorage";
import "./AccountSettingsPage.css";

function SettingRow({ icon, label, description, checked, onToggle }) {
  return (
    <button
      type="button"
      className={`setting-row ${checked ? "active" : ""}`}
      onClick={onToggle}
    >
      <span className="setting-row-left">
        {icon}
        <span>
          <strong>{label}</strong>
          <small>{description}</small>
        </span>
      </span>
      <span className="setting-switch" aria-hidden="true" />
    </button>
  );
}

function SettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(AccountStorage.getSettings);

  const handleToggle = (key) => {
    setSettings((previous) => {
      const updated = { ...previous, [key]: !previous[key] };
      AccountStorage.saveSettings(updated);
      return updated;
    });
  };

  return (
    <div className="account-settings-page">
      <header className="account-settings-header">
        <button
          type="button"
          className="account-back-btn"
          onClick={() => navigate("/account")}
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <h1>Settings</h1>
      </header>

      <section className="account-settings-card">
        <h2 className="settings-title">Playback And Privacy</h2>

        <SettingRow
          icon={<FaBell />}
          label="Notifications"
          description="Receive updates for new songs and playlists"
          checked={settings.notifications}
          onToggle={() => handleToggle("notifications")}
        />

        <SettingRow
          icon={<FaMusic />}
          label="Autoplay"
          description="Automatically play related tracks"
          checked={settings.autoplay}
          onToggle={() => handleToggle("autoplay")}
        />

        <SettingRow
          icon={<FaShieldAlt />}
          label="Private Session"
          description="Hide listening activity from public profile"
          checked={settings.privateSession}
          onToggle={() => handleToggle("privateSession")}
        />

        <div className="setting-static-row">
          <span className="setting-row-left">
            <FaMoon />
            <span>
              <strong>Theme</strong>
              <small>Current theme follows Somneang purple style</small>
            </span>
          </span>
          <span className="setting-pill">Default</span>
        </div>

        <h2 className="settings-title settings-title-spaced">Security</h2>

        <button
          type="button"
          className="setting-nav-row"
          onClick={() => navigate("/account/change-password")}
        >
          <span className="setting-row-left">
            <FaKey />
            <span>
              <strong>Change Password</strong>
              <small>
                Update your password regularly to keep account secure
              </small>
            </span>
          </span>
          <FaChevronRight className="setting-nav-arrow" />
        </button>
      </section>
    </div>
  );
}

export default SettingsPage;
