import type { Level } from "../types";

export function getSolvedBoard(level: Level): number[] {
  const total = level.rows * level.cols;

  return Array.from({ length: total }, (_, index) =>
    index === total - 1 ? 0 : index + 1
  );
}

export function getNeighbors(index: number, level: Level): number[] {
  const row = Math.floor(index / level.cols);
  const col = index % level.cols;
  const neighbors: number[] = [];

  if (row > 0) neighbors.push(index - level.cols);
  if (row < level.rows - 1) neighbors.push(index + level.cols);
  if (col > 0) neighbors.push(index - 1);
  if (col < level.cols - 1) neighbors.push(index + 1);

  return neighbors;
}

export function isSolvedBoard(board: number[]): boolean {
  return board.every((tile, index) => {
    const expected = index === board.length - 1 ? 0 : index + 1;
    return tile === expected;
  });
}

export function shuffleBoard(level: Level): number[] {
  const board = getSolvedBoard(level);
  let emptyIndex = board.length - 1;
  let previousIndex = -1;

  // สลับด้วยการเดินที่ถูกกติกา เพื่อให้แก้ได้เสมอ
  // บอร์ดใหญ่ใช้จำนวนก้าวมากขึ้นเพื่อให้ผสมได้ทั่วถึง
  const shuffleMoves = Math.max(200, board.length * 30);

  for (let i = 0; i < shuffleMoves; i++) {
    const options = getNeighbors(emptyIndex, level).filter(
      (index) => index !== previousIndex
    );

    const nextIndex = options[Math.floor(Math.random() * options.length)];

    [board[emptyIndex], board[nextIndex]] = [
      board[nextIndex],
      board[emptyIndex],
    ];

    previousIndex = emptyIndex;
    emptyIndex = nextIndex;
  }

  // ไม่ให้เริ่มเกมโดยที่เรียงเสร็จแล้ว
  if (isSolvedBoard(board)) {
    const neighbor = getNeighbors(emptyIndex, level)[0];

    [board[emptyIndex], board[neighbor]] = [
      board[neighbor],
      board[emptyIndex],
    ];
  }

  return board;
}