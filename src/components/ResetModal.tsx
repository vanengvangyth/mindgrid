type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function ResetModal({ onCancel, onConfirm }: Props) {
  return (
    <div className="modal-backdrop" onClick={onCancel} role="presentation">
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Reset game progress"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="confirm-icon">↻</span>
        <h2>Reset all progress?</h2>
        <p>
          This will lock the later levels again and clear your best scores
          and times. This action cannot be undone.
        </p>

        <div className="confirm-actions">
          <button className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="danger-button" onClick={onConfirm}>
            Reset progress
          </button>
        </div>
      </div>
    </div>
  );
}