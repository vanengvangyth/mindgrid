import { LEVELS, STORAGE_KEY } from "../data/levels";
import type { Progress } from "../types";

export const EMPTY_PROGRESS: Progress = {
  unlockedLevel: 1,
  bestScores: {},
  bestTimes: {},
};

function cleanRecord(value: unknown): Record<number, number> {
  const result: Record<number, number> = {};

  if (!value || typeof value !== "object") return result;

  for (const [key, raw] of Object.entries(value)) {
    const id = Number(key);
    const number = Number(raw);

    if (
      Number.isInteger(id) &&
      id >= 1 &&
      id <= LEVELS.length &&
      Number.isFinite(number) &&
      number >= 0
    ) {
      result[id] = number;
    }
  }

  return result;
}

export function readProgress(): Progress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return EMPTY_PROGRESS;

    const parsed = JSON.parse(saved) as Partial<Progress>;

    return {
      unlockedLevel: Math.min(
        LEVELS.length,
        Math.max(1, Number(parsed.unlockedLevel) || 1)
      ),
      bestScores: cleanRecord(parsed.bestScores),
      bestTimes: cleanRecord(parsed.bestTimes),
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

export function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage 
  }
}