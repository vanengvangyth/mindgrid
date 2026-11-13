import { useEffect, type CSSProperties } from "react";
import { IMAGE_RATIO } from "../data/levels";
import type { ImageStatus, Level } from "../types";

type Props = {
  level: Level;
  board: number[];
  won: boolean;
  imageSrc: string;
  imageStatus: ImageStatus;
  showNumbers: boolean;
  keyboardEnabled: boolean;
  onMove: (tileIndex: number) => void;
};

export function PuzzleBoard({
  level,
  board,
  won,
  imageSrc,
  imageStatus,
  showNumbers,
  keyboardEnabled,
  onMove,
}: Props) {
  const totalTiles = level.rows * level.cols;
  const numbersVisible = showNumbers || imageStatus !== "ready";

  function getTileStyle(tile: number): CSSProperties {
    if (tile === 0 && !won) return {};
    if (imageStatus !== "ready") return {};

    const targetIndex = tile === 0 ? totalTiles - 1 : tile - 1;
    const targetRow = Math.floor(targetIndex / level.cols);
    const targetCol = targetIndex % level.cols;

    const xPosition =
      level.cols === 1 ? 0 : (targetCol / (level.cols - 1)) * 100;
    const yPosition =
      level.rows === 1 ? 0 : (targetRow / (level.rows - 1)) * 100;

    return {
      backgroundImage: `url("${imageSrc}")`,
      backgroundSize: `${level.cols * 100}% ${level.rows * 100}%`,
      backgroundPosition: `${xPosition}% ${yPosition}%`,
    };
  }

  useEffect(() => {
    if (!keyboardEnabled || won) return;

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest(
          'input, textarea, select, [contenteditable="true"], [role="dialog"]'
        )
      ) {
        return;
      }

      const emptyIndex = board.indexOf(0);
      const row = Math.floor(emptyIndex / level.cols);
      const col = emptyIndex % level.cols;
      let tileIndex = -1;

      switch (event.code || event.key.toLowerCase()) {
        case "KeyW":
        case "w":
        case "ArrowUp":
          if (row < level.rows - 1) tileIndex = emptyIndex + level.cols;
          break;
        case "KeyS":
        case "s":
        case "ArrowDown":
          if (row > 0) tileIndex = emptyIndex - level.cols;
          break;
        case "KeyA":
        case "a":
        case "ArrowLeft":
          if (col < level.cols - 1) tileIndex = emptyIndex + 1;
          break;
        case "KeyD":
        case "d":
        case "ArrowRight":
          if (col > 0) tileIndex = emptyIndex - 1;
          break;
        default:
          return;
      }

      event.preventDefault();

      if (tileIndex >= 0) onMove(tileIndex);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, keyboardEnabled, level, onMove, won]);

  return (
    <div
      className={["puzzle-board", won ? "is-solved" : ""]
        .filter(Boolean)
        .join(" ")}
      style={{
        gridTemplateColumns: `repeat(${level.cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${level.rows}, minmax(0, 1fr))`,
        aspectRatio: IMAGE_RATIO,
      }}
      role="group"
      aria-label={`Level ${level.id} picture puzzle. Use arrow keys or W, A, S, D to slide pieces.`}
    >
      {board.map((tile, index) => {
        const revealed = tile === 0 && won;

        return (
          <button
            key={tile}
            tabIndex={-1}
            className={[
              "puzzle-tile",
              tile === 0 && !won ? "empty-tile" : "",
              won ? "solved-tile" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={getTileStyle(tile)}
            onClick={() => onMove(index)}
            disabled={tile === 0 || won}
            aria-label={
              tile === 0
                ? revealed
                  ? "Final piece"
                  : "Empty space"
                : `Move picture piece ${tile}`
            }
          >
            {tile === 0 && !won && (
              <span className="empty-mark" aria-hidden="true">
                +
              </span>
            )}

            {tile !== 0 && numbersVisible && !won && (
              <span className="tile-number" aria-hidden="true">
                {tile}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}