import { useState } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaImage,
  FaPen,
  FaSave,
  FaUpload,
  FaUserEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AccountStorage from "./accountStorage";
import "./AccountSettingsPage.css";

function EditProfilePage() {
  const navigate = useNavigate();
  const account = AccountStorage.getAccount();
  const [name, setName] = useState(account.name);
  const [email, setEmail] = useState(account.email);
  const [avatarUrl, setAvatarUrl] = useState(account.avatarUrl || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);
    setError("");
    setSaved(false);

    try {
      const imageDataUrl = await AccountStorage.createAvatarDataUrl(file);
      setAvatarUrl(imageDataUrl);
    } catch (uploadError) {
      setError(uploadError.message || "Could not upload avatar");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleSave = () => {
    const cleanName = name.trim() || account.name;
    const cleanEmail = email.trim() || account.email;
    const cleanAvatarUrl = avatarUrl.trim();

    AccountStorage.saveAccount({
      name: cleanName,
      email: cleanEmail,
      avatarUrl: cleanAvatarUrl,
    });

    setName(cleanName);
    setEmail(cleanEmail);
    setAvatarUrl(cleanAvatarUrl);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
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
        <h1>Edit Profile</h1>
      </header>

      <section className="account-settings-card">
        <div className="account-settings-title-row">
          <FaUserEdit />
          <h2>Profile Information</h2>
        </div>

        <div className="account-avatar-editor">
          <label
            className="account-avatar-upload-target"
            htmlFor="edit-profile-avatar-file"
          >
            <div className="account-avatar-preview" aria-hidden="true">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" />
              ) : (
                <span>{(name.trim().slice(0, 2) || "SN").toUpperCase()}</span>
              )}
              <span className="account-avatar-overlay">
                <FaPen />
                <span>{uploading ? "Uploading..." : "Choose photo"}</span>
              </span>
            </div>
          </label>

          <label
            className="account-upload-btn"
            htmlFor="edit-profile-avatar-file"
          >
            <FaUpload />
            <span>{uploading ? "Uploading..." : "Upload Avatar"}</span>
          </label>
          <input
            id="edit-profile-avatar-file"
            type="file"
            accept="image/*"
            className="account-hidden-file-input"
            onChange={handleAvatarUpload}
            disabled={uploading}
          />
        </div>

        <label className="account-field-label" htmlFor="edit-profile-name">
          Display Name
        </label>
        <input
          id="edit-profile-name"
          className="account-input"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your display name"
        />

        <label className="account-field-label" htmlFor="edit-profile-email">
          Email
        </label>
        <input
          id="edit-profile-email"
          className="account-input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
        />

        <label className="account-field-label" htmlFor="edit-profile-avatar">
          Avatar URL (optional)
        </label>
        <input
          id="edit-profile-avatar"
          className="account-input"
          type="url"
          value={avatarUrl}
          onChange={(event) => setAvatarUrl(event.target.value)}
          placeholder="https://example.com/avatar.png"
        />

        <button
          type="button"
          className="account-primary-btn"
          onClick={handleSave}
        >
          <FaSave />
          <span>Save Changes</span>
        </button>

        {saved ? (
          <p className="account-saved-note">
            <FaCheckCircle />
            <span>Profile updated successfully</span>
          </p>
        ) : null}

        {error ? (
          <p className="account-error-note">
            <FaImage />
            <span>{error}</span>
          </p>
        ) : null}
      </section>
    </div>
  );
}

export default EditProfilePage;
