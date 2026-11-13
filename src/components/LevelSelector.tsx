import { LEVELS } from "../data/levels";
import type { Progress } from "../types";
import { formatLevelNumber } from "../utils/format";

type Props = {
  levelId: number;
  progress: Progress;
  onSelect: (levelId: number) => void;
};

export function LevelSelector({ levelId, progress, onSelect }: Props) {
  return (
    <section className="level-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">YOUR JOURNEY</p>
          <h2>Choose your level</h2>
        </div>

        <span className="level-count">
          {progress.unlockedLevel} / {LEVELS.length} unlocked
        </span>
      </div>

      <div className="level-list">
        {LEVELS.map((item) => {
          const locked = item.id > progress.unlockedLevel;
          const selected = item.id === levelId;
          const pieces = item.rows * item.cols - 1;

          return (
            <button
              key={item.id}
              className={[
                "level-card",
                selected ? "selected" : "",
                locked ? "locked" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              disabled={locked}
              onClick={() => onSelect(item.id)}
            >
              <span className="level-number">
                {locked ? "🔒" : formatLevelNumber(item.id)}
              </span>

              <span className="level-info">
                <strong>{item.name}</strong>
                <small>
                  {item.rows} × {item.cols} · {pieces} pieces
                </small>
              </span>

              <span className="level-status">
                {locked
                  ? "Locked"
                  : selected
                    ? "Playing"
                    : progress.bestScores[item.id] !== undefined
                      ? "Completed"
                      : "Play"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}