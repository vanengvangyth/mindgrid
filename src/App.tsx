import { useCallback, useEffect, useState } from "react";
import "./App.css";

import { LEVELS } from "./data/levels";
import type { Level, Profile, Progress, Result } from "./types";
import { getNeighbors, isSolvedBoard, shuffleBoard } from "./utils/board";
import { formatTime } from "./utils/format";
import { EMPTY_PROGRESS, readProgress, saveProgress } from "./utils/progress";
import { readProfile, saveProfile } from "./utils/profile";
import { useImagePreload } from "./hooks/useImagePreload";
import { useModalEffects } from "./hooks/useModalEffects";

import { LevelSelector } from "./components/LevelSelector";
import { PuzzleBoard } from "./components/PuzzleBoard";
import { StatsPanel } from "./components/StatsPanel";
import { PreviewModal } from "./components/PreviewModal";
import { ResetModal } from "./components/ResetModal";
import { ProfileModal } from "./components/ProfileModal";

function App() {
  const [levelId, setLevelId] = useState(1);
  const [progress, setProgress] = useState<Progress>(readProgress);
  const [profile, setProfile] = useState<Profile>(readProfile);
  const [board, setBoard] = useState<number[]>(() => shuffleBoard(LEVELS[0]));
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);

  const level = LEVELS[levelId - 1];
  const won = isSolvedBoard(board);
  const modalOpen = showPreview || showResetConfirm || showProfile;

  const {
    src: imageSrc,
    status: imageStatus,
    retry: retryImage,
  } = useImagePreload(level.image);

  const closeModals = useCallback(() => {
    setShowPreview(false);
    setShowResetConfirm(false);
    setShowProfile(false);
  }, []);

  useModalEffects(modalOpen, closeModals);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  // Timer: pauses while any modal is open
  useEffect(() => {
    if (!isRunning || won || modalOpen) return;

    const timer = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, won, modalOpen]);

  function resetRound(nextLevel: Level) {
    setBoard(shuffleBoard(nextLevel));
    setMoves(0);
    setSeconds(0);
    setIsRunning(false);
    setResult(null);
    setShowPreview(false);
  }

  function startLevel(nextLevelId: number) {
    if (nextLevelId > progress.unlockedLevel) return;

    setLevelId(nextLevelId);
    resetRound(LEVELS[nextLevelId - 1]);
  }

  function finishLevel(finalMoves: number) {
    const previousBest = progress.bestScores[levelId];
    const previousTime = progress.bestTimes[levelId];

    const newBestMoves = previousBest === undefined || finalMoves < previousBest;
    const newBestTime = previousTime === undefined || seconds < previousTime;

    setProgress((current) => ({
      unlockedLevel: Math.max(
        current.unlockedLevel,
        Math.min(LEVELS.length, levelId + 1)
      ),
      bestScores: newBestMoves
        ? { ...current.bestScores, [levelId]: finalMoves }
        : current.bestScores,
      bestTimes: newBestTime
        ? { ...current.bestTimes, [levelId]: seconds }
        : current.bestTimes,
    }));

    setResult({ moves: finalMoves, seconds, newBestMoves, newBestTime });
    setIsRunning(false);
  }

  function moveTile(tileIndex: number) {
    if (won) return;

    const emptyIndex = board.indexOf(0);

    if (!getNeighbors(emptyIndex, level).includes(tileIndex)) return;

    const nextBoard = [...board];

    [nextBoard[emptyIndex], nextBoard[tileIndex]] = [
      nextBoard[tileIndex],
      nextBoard[emptyIndex],
    ];

    const nextMoves = moves + 1;

    setBoard(nextBoard);
    setMoves(nextMoves);

    if (isSolvedBoard(nextBoard)) {
      finishLevel(nextMoves);
    } else {
      setIsRunning(true);
    }
  }

  // Resets game progress only; the player profile is kept.
  function resetProgress() {
    setProgress(EMPTY_PROGRESS);
    setLevelId(1);
    resetRound(LEVELS[0]);
    setShowResetConfirm(false);
  }

  const bestTime = progress.bestTimes[levelId];
  const isLastLevel = levelId === LEVELS.length;

  return (
    <main className="app-shell">
      <header className="topbar">
        <a
          className="brand"
          href="#"
          aria-label="MindGrid home"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="brand-icon">M</span>
          <span>MindGrid</span>
        </a>

        <div className="topbar-label">
          <span className="status-dot" />
          NATURE PUZZLE
        </div>

        <div className="topbar-actions">
          <button
            className="profile-button"
            onClick={() => setShowProfile(true)}
            aria-label="Open player profile"
          >
            <span aria-hidden="true">{profile.avatar}</span>
            <span className="profile-button-name">{profile.name}</span>
          </button>

          <button
            className="text-button"
            onClick={() => setShowResetConfirm(true)}
          >
            Reset progress
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          RELAX · FOCUS · SOLVE
        </div>

        <h1>
          Find your
          <br />
          <span>piece of nature.</span>
        </h1>

        <p className="hero-description">
          Slide the pieces, restore the picture, and enjoy a little moment
          of calm.
        </p>
      </section>

      <LevelSelector
        levelId={levelId}
        progress={progress}
        onSelect={startLevel}
      />

      <section className="game-section">
        <div className="game-heading">
          <div>
            <p className="section-kicker">CURRENT CHALLENGE</p>
            <h2>
              Level {levelId} <span className="difficulty">/ {level.name}</span>
            </h2>
          </div>

          <button
            className="preview-button"
            onClick={() => setShowPreview(true)}
          >
            <span aria-hidden="true">◉</span> Preview image
          </button>
        </div>

        <div className="game-layout">
          <div className="puzzle-panel">
            <div className="puzzle-toolbar">
              <span>
                <span className="live-dot" />
                {won ? "PUZZLE COMPLETED" : "PUZZLE IN PROGRESS"}
              </span>
              <span>
                {level.rows} × {level.cols}
              </span>
            </div>

            {imageStatus === "loading" && (
              <div className="image-banner" role="status">
                <span>Loading picture… numbers are shown meanwhile.</span>
              </div>
            )}

            {imageStatus === "error" && (
              <div className="image-banner error" role="alert">
                <span>Couldn’t load the picture. Check your connection.</span>
                <button className="banner-button" onClick={retryImage}>
                  Retry
                </button>
              </div>
            )}

            <PuzzleBoard
              level={level}
              board={board}
              won={won}
              imageSrc={imageSrc}
              imageStatus={imageStatus}
              showNumbers={showNumbers}
              keyboardEnabled={!modalOpen}
              onMove={moveTile}
            />

            {won && result && (
              <div className="win-message" role="status">
                <span className="win-icon">✦</span>
                <div>
                  <strong>
                    {isLastLevel
                      ? `You finished every level, ${profile.name}!`
                      : "Beautifully done!"}
                  </strong>
                  <p>
                    Solved in {result.moves} moves · {formatTime(result.seconds)}
                    {(result.newBestMoves || result.newBestTime) &&
                      " · ✦ New record"}
                  </p>
                </div>
                {!isLastLevel && (
                  <button
                    className="primary-button"
                    onClick={() => startLevel(levelId + 1)}
                  >
                    Next level <span aria-hidden="true">→</span>
                  </button>
                )}
              </div>
            )}

            <div className="puzzle-actions">
              <button
                className="secondary-button"
                onClick={() => resetRound(level)}
              >
                <span aria-hidden="true">↻</span> Shuffle again
              </button>

              <button
                className="secondary-button"
                aria-pressed={showNumbers}
                onClick={() => setShowNumbers((current) => !current)}
                disabled={imageStatus !== "ready"}
              >
                # {showNumbers ? "Hide numbers" : "Show numbers"}
              </button>
            </div>
          </div>

          <StatsPanel
            seconds={seconds}
            moves={moves}
            bestMoves={progress.bestScores[levelId]}
            bestTime={bestTime}
            paused={modalOpen && isRunning}
          />
        </div>
      </section>

      <footer className="footer">
        <span>MindGrid © 2026</span>
        <span>
          Made for moments of focus <span className="footer-heart">♥</span>
        </span>
      </footer>

      {showPreview && (
        <PreviewModal
          src={imageSrc}
          alt={level.imageAlt}
          onClose={() => setShowPreview(false)}
        />
      )}

      {showResetConfirm && (
        <ResetModal
          onCancel={() => setShowResetConfirm(false)}
          onConfirm={resetProgress}
        />
      )}

      {showProfile && (
        <ProfileModal
          profile={profile}
          progress={progress}
          onSave={(next) => {
            setProfile(next);
            setShowProfile(false);
          }}
          onClose={() => setShowProfile(false)}
        />
      )}
    </main>
  );
}

export default App;