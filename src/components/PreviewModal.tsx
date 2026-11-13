type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

export function PreviewModal({ src, alt, onClose }: Props) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="preview-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Original picture"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <div>
            <p className="section-kicker">THE ORIGINAL</p>
            <h2>Picture preview</h2>
          </div>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close preview"
          >
            ×
          </button>
        </div>

        <img src={src} alt={alt} />

        <button className="primary-button modal-done" onClick={onClose}>
          Back to puzzle
        </button>
      </div>
    </div>
  );
}