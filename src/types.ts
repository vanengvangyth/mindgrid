export type Level = {
  id: number;
  name: string;
  rows: number;
  cols: number;
  image: string;
  imageAlt: string;
};

export type Progress = {
  unlockedLevel: number;
  bestScores: Record<number, number>;
  bestTimes: Record<number, number>;
};

export type Result = {
  moves: number;
  seconds: number;
  newBestMoves: boolean;
  newBestTime: boolean;
};

export type Profile = {
  name: string;
  avatar: string;
};

export type ImageStatus = "loading" | "ready" | "error";