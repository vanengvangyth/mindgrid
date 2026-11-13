import { useState } from "react";
import type { FormEvent } from "react";
import { LEVELS } from "../data/levels";
import type { Profile, Progress } from "../types";
import { formatLevelNumber, formatTime } from "../utils/format";
import { AVATARS, DEFAULT_PROFILE, MAX_NAME_LENGTH } from "../utils/profile";

type Props = {
  profile: Profile;
  progress: Progress;
  onSave: (profile: Profile) => void;
  onClose: () => void;
};

export function ProfileModal({ profile, progress, onSave, onClose }: Props) {
  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);

  const completed = LEVELS.filter(
    (item) => progress.bestScores[item.id] !== undefined
  );
  const percent = Math.round((completed.length / LEVELS.length) * 100);
  const totalMoves = completed.reduce(
    (sum, item) => sum + progress.bestScores[item.id],
    0
  );
  const times = Object.values(progress.bestTimes);
  const fastest = times.length > 0 ? Math.min(...times) : undefined;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSave({ name: name.trim() || DEFAULT_PROFILE.name, avatar });
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="preview-modal profile-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Player profile"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <div>
            <p className="section-kicker">PLAYER</p>
            <h2>Your profile</h2>
          </div>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close profile"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="profile-identity">
            <span className="profile-avatar-large" aria-hidden="true">
              {avatar}
            </span>

            <label className="profile-field">
              <span className="stat-label">NAME</span>
              <input
                className="profile-input"
                value={name}
                maxLength={MAX_NAME_LENGTH}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
              />
            </label>
          </div>

          <div
            className="avatar-grid"
            role="radiogroup"
            aria-label="Choose avatar"
          >
            {AVATARS.map((item) => (
              <button
                key={item}
                type="button"
                role="radio"
                aria-checked={avatar === item}
                className={`avatar-option ${avatar === item ? "selected" : ""}`}
                onClick={() => setAvatar(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <span className="stat-label">COMPLETED</span>
              <strong className="stat-value">
                {completed.length}/{LEVELS.length}
              </strong>
              <span className="stat-note">{percent}% of the journey</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">FASTEST SOLVE</span>
              <strong className="stat-value">
                {fastest !== undefined ? formatTime(fastest) : "—"}
              </strong>
              <span className="stat-note">Across all levels</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">TOTAL BEST MOVES</span>
              <strong className="stat-value">
                {completed.length > 0 ? totalMoves : "—"}
              </strong>
              <span className="stat-note">Sum of personal records</span>
            </div>
          </div>

          {completed.length > 0 && (
            <ul className="profile-levels">
              {completed.map((item) => (
                <li key={item.id}>
                  <span>
                    {formatLevelNumber(item.id)} · {item.name}
                  </span>
                  <span>
                    {progress.bestScores[item.id]} moves
                    {progress.bestTimes[item.id] !== undefined &&
                      ` · ${formatTime(progress.bestTimes[item.id])}`}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="confirm-actions profile-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Save profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}