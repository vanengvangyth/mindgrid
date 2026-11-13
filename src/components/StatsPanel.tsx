import { formatTime } from "../utils/format";

type Props = {
  seconds: number;
  moves: number;
  bestMoves?: number;
  bestTime?: number;
  paused: boolean;
};

export function StatsPanel({
  seconds,
  moves,
  bestMoves,
  bestTime,
  paused,
}: Props) {
  return (
    <aside className="stats-panel">
      <div className="stats-title">
        <span className="stats-icon">✳</span>
        <div>
          <h3>Your session</h3>
          <p>Every move brings you closer.</p>
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-label">TIME ELAPSED</span>
        <strong className="stat-value">{formatTime(seconds)}</strong>
        <span className="stat-note">{paused ? "Paused" : "Take your time"}</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">MOVES MADE</span>
        <strong className="stat-value">{moves}</strong>
        <span className="stat-note">Slide one tile at a time</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">BEST MOVES</span>
        <strong className="stat-value">{bestMoves ?? "—"}</strong>
        <span className="stat-note">
          {bestTime !== undefined
            ? `Best time ${formatTime(bestTime)}`
            : "Your personal record"}
        </span>
      </div>

      <div className="tip-card">
        <span className="tip-icon">☘</span>
        <div>
          <strong>A little tip</strong>
          <p>
            Look at the preview first and place the top row, then work your
            way down. Use the arrow keys or W, A, S, D anytime while playing.
          </p>
        </div>
      </div>
    </aside>
  );
}