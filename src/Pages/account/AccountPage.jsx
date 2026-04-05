import { useState } from "react";
import {
  FaCog,
  FaHeart,
  FaPen,
  FaSignOutAlt,
  FaMusic,
  FaSearch,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import "./AccountPage.css";
import AccountStorage from "./accountStorage";

function getInitials(name) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) {
    return "SN";
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return `${words[0][0] || ""}${words[1][0] || ""}`.toUpperCase();
}

function AccountPage() {
  const navigate = useNavigate();
  const [account, setAccount] = useState(() => AccountStorage.getAccount());
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [draftName, setDraftName] = useState(account.name);
  const [pendingAvatarUrl, setPendingAvatarUrl] = useState(
    account.avatarUrl || "",
  );

  const initials = getInitials(account.name);

  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const avatarDataUrl = await AccountStorage.createAvatarDataUrl(file);
      setPendingAvatarUrl(avatarDataUrl);
    } catch {
      // Keep current image if conversion fails.
    } finally {
      event.target.value = "";
    }
  };

  const handleOpenProfileModal = () => {
    setDraftName(account.name);
    setPendingAvatarUrl(account.avatarUrl || "");
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleSaveProfileDetails = () => {
    const nextName = draftName.trim() || account.name;
    const updates = {
      name: nextName,
      avatarUrl: pendingAvatarUrl || account.avatarUrl,
    };

    AccountStorage.saveAccount(updates);
    setAccount((previous) => ({ ...previous, ...updates }));
    setIsProfileModalOpen(false);
  };

  const handleLogout = () => {
    AccountStorage.clearAllOnLogout();
    navigate("/login");
  };

  return (
    <div className="account-page">
      <header className="account-topbar">
        <div className="account-brand-group">
          <div className="account-brand-logo-wrap" aria-hidden="true">
            <img
              src="/logo-transparent.png"
              alt=""
              className="account-brand-logo"
            />
          </div>
          <div className="account-brand">Somneang</div>
        </div>
        <label className="account-search" htmlFor="account-search-input">
          <FaSearch />
          <input
            id="account-search-input"
            type="text"
            placeholder="Search for song, artists, albums..."
          />
        </label>
      </header>

      <main className="account-content">
        <section className="account-profile-card">
          <div className="account-profile-row">
            <button
              type="button"
              className="account-avatar-upload"
              onClick={handleOpenProfileModal}
              aria-haspopup="dialog"
              aria-controls="account-profile-details-dialog"
            >
              <div className="account-avatar" aria-hidden="true">
                {account.avatarUrl ? (
                  <img src={account.avatarUrl} alt={`${account.name} avatar`} />
                ) : (
                  initials
                )}
                <span className="account-avatar-hover-overlay">
                  <FaPen />
                  <span>Choose photo</span>
                </span>
              </div>
            </button>
            <div>
              <h1 className="account-user-name">{account.name}</h1>
              <p className="account-user-mail">{account.email}</p>
            </div>
          </div>

          <div className="account-stats-grid">
            <article className="account-stat-item">
              <FaHeart />
              <p className="account-stat-value">{account.favoriteSongs}</p>
              <p className="account-stat-label">Favorite Songs</p>
            </article>

            <article className="account-stat-item">
              <FaMusic />
              <p className="account-stat-value">{account.playlists}</p>
              <p className="account-stat-label">Playlists</p>
            </article>

            <article className="account-stat-item">
              <FaMusic />
              <p className="account-stat-value">{account.listeningHours}</p>
              <p className="account-stat-label">Listening Hours</p>
            </article>
          </div>
        </section>

        <section className="account-actions-card">
          <button
            type="button"
            className="account-action-btn"
            onClick={() => navigate("/account/edit-profile")}
          >
            <FaUser />
            <span>Edit Profile</span>
          </button>

          <button
            type="button"
            className="account-action-btn"
            onClick={() => navigate("/account/settings")}
          >
            <FaCog />
            <span>Settings</span>
          </button>

          <button
            type="button"
            className="account-action-btn logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </section>
      </main>

      {isProfileModalOpen && (
        <div
          className="account-profile-modal-backdrop"
          role="presentation"
          onClick={handleCloseProfileModal}
        >
          <section
            id="account-profile-details-dialog"
            className="account-profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-profile-details-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="account-profile-modal-close"
              onClick={handleCloseProfileModal}
              aria-label="Close profile details"
            >
              <FaTimes />
            </button>

            <h2
              id="account-profile-details-title"
              className="account-profile-modal-title"
            >
              Profile details
            </h2>

            <div className="account-profile-modal-body">
              <label
                className="account-profile-modal-avatar-wrap"
                htmlFor="account-avatar-modal-input"
              >
                <div className="account-profile-modal-avatar">
                  {pendingAvatarUrl || account.avatarUrl ? (
                    <img
                      src={pendingAvatarUrl || account.avatarUrl}
                      alt={`${account.name} avatar preview`}
                    />
                  ) : (
                    initials
                  )}
                  <span className="account-avatar-hover-overlay">
                    <FaPen />
                    <span>Choose photo</span>
                  </span>
                </div>
              </label>

              <div className="account-profile-modal-controls">
                <input
                  type="text"
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                  className="account-profile-modal-name"
                />
                <button
                  type="button"
                  className="account-profile-modal-save"
                  onClick={handleSaveProfileDetails}
                >
                  Save
                </button>
              </div>
            </div>

            <p className="account-profile-modal-note">
              By proceeding, you agree to give Somneang access to the image you
              choose to upload.
            </p>

            <input
              id="account-avatar-modal-input"
              type="file"
              accept="image/*"
              className="account-avatar-file-input"
              onChange={handleAvatarUpload}
            />
          </section>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default AccountPage;
