import { useState } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaKey,
  FaLock,
  FaSave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AccountSettingsPage.css";

function ChangePasswordPage() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setErrorMessage("");
    setSaved(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill all password fields");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password must match");
      return;
    }

    window.localStorage.setItem("accountPassword", newPassword);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="account-settings-page">
      <header className="account-settings-header">
        <button
          type="button"
          className="account-back-btn"
          onClick={() => navigate("/account/settings")}
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <h1>Change Password</h1>
      </header>

      <section className="account-settings-card">
        <div className="account-settings-title-row">
          <FaKey />
          <h2>Security</h2>
        </div>

        <label className="account-field-label" htmlFor="current-password-input">
          Current Password
        </label>
        <div className="account-input-row">
          <FaLock />
          <input
            id="current-password-input"
            className="account-input"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            placeholder="Enter current password"
          />
        </div>

        <label className="account-field-label" htmlFor="new-password-input">
          New Password
        </label>
        <div className="account-input-row">
          <FaLock />
          <input
            id="new-password-input"
            className="account-input"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <label className="account-field-label" htmlFor="confirm-password-input">
          Confirm New Password
        </label>
        <div className="account-input-row">
          <FaLock />
          <input
            id="confirm-password-input"
            className="account-input"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Repeat new password"
          />
        </div>

        <button
          type="button"
          className="account-primary-btn"
          onClick={handleSave}
        >
          <FaSave />
          <span>Update Password</span>
        </button>

        {saved ? (
          <p className="account-saved-note">
            <FaCheckCircle />
            <span>Password updated successfully</span>
          </p>
        ) : null}

        {errorMessage ? (
          <p className="account-error-note">{errorMessage}</p>
        ) : null}
      </section>
    </div>
  );
}

export default ChangePasswordPage;
