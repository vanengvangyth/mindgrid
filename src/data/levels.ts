import type { Level } from "../types";

export const STORAGE_KEY = "mindgrid-picture-puzzle-progress";

// ทุกภาพ crop 3:2 เท่ากัน เพื่อไม่ให้ชิ้นถูกยืด
export const IMAGE_RATIO = "3 / 2";

const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1600&h=1067&q=90`;

type LevelInput = Omit<Level, "image"> & { photo: string };

const LEVEL_DATA: LevelInput[] = [
  { id: 1, name: "Starter", rows: 3, cols: 3, photo: "photo-1470770841072-f978cf4d019e", imageAlt: "Mountain and lake landscape" },
  { id: 2, name: "Easy", rows: 3, cols: 4, photo: "photo-1506905925346-21bda4d32df4", imageAlt: "Mountain peaks above the clouds" },
  { id: 3, name: "Simple", rows: 4, cols: 4, photo: "photo-1441974231531-c6227db76b6e", imageAlt: "Sunlight through a forest" },
  { id: 4, name: "Normal", rows: 4, cols: 5, photo: "photo-1501785888041-af3ef285b470", imageAlt: "Lake surrounded by mountains" },
  { id: 5, name: "Steady", rows: 5, cols: 5, photo: "photo-1469474968028-56623f02e42e", imageAlt: "Sunbeams over a green valley" },
  { id: 6, name: "Medium", rows: 5, cols: 6, photo: "photo-1464822759023-fed622ff2c3b", imageAlt: "Rocky mountain range" },
  { id: 7, name: "Tricky", rows: 6, cols: 6, photo: "photo-1472214103451-9374bd1c798e", imageAlt: "Green rolling hills" },
  { id: 8, name: "Challenging", rows: 6, cols: 7, photo: "photo-1447752875215-b2761acb3c5d", imageAlt: "Road through a forest" },
  { id: 9, name: "Hard", rows: 7, cols: 7, photo: "photo-1426604966848-d7adac402bff", imageAlt: "Nature landscape" },
  { id: 10, name: "Harder", rows: 7, cols: 8, photo: "photo-1433086966358-54859d0ed716", imageAlt: "Waterfall in the woods" },
  { id: 11, name: "Expert", rows: 8, cols: 8, photo: "photo-1418065460487-3e41a6c84dc5", imageAlt: "Misty forest" },
  { id: 12, name: "Master", rows: 8, cols: 9, photo: "photo-1500382017468-9049fed747ef", imageAlt: "Open field under the sky" },
  { id: 13, name: "Grandmaster", rows: 9, cols: 9, photo: "photo-1493246507139-91e8fad9978e", imageAlt: "Mountain lake" },
  { id: 14, name: "Legend", rows: 9, cols: 10, photo: "photo-1465146344425-f00d5f5c8f07", imageAlt: "Field of flowers" },
  { id: 15, name: "Ultimate", rows: 10, cols: 10, photo: "photo-1505765050516-f72dcac9c60e", imageAlt: "Calm lake at dawn" },
  { id: 16, name: "Explorer", rows: 10, cols: 11, photo: "photo-1500530855697-b586d89ba3ee", imageAlt: "Sunlit mountain landscape" },
  { id: 17, name: "Wanderer", rows: 11, cols: 11, photo: "photo-1500534623283-312aade485b7", imageAlt: "Open mountain landscape" },
  { id: 18, name: "Voyager", rows: 11, cols: 12, photo: "photo-1470252649378-9c29740c9fa8", imageAlt: "Sunrise over a misty landscape" },
  { id: 19, name: "Trailblazer", rows: 12, cols: 12, photo: "photo-1470071459604-3b5ec3a7fe05", imageAlt: "Misty hills at sunrise" },
  { id: 20, name: "Pathfinder", rows: 12, cols: 13, photo: "photo-1511497584788-876760111969", imageAlt: "Sunlight in a forest" },
  { id: 21, name: "Adventurer", rows: 13, cols: 13, photo: "photo-1448375240586-882707db888b", imageAlt: "Green forest canopy" },
  { id: 22, name: "Pioneer", rows: 13, cols: 14, photo: "photo-1518837695005-2083093ee35b", imageAlt: "Ocean waves reaching the shore" },
  { id: 23, name: "Virtuoso", rows: 14, cols: 14, photo: "photo-1500534314209-a25ddb2bd429", imageAlt: "Dramatic desert landscape" },
  { id: 24, name: "Champion", rows: 14, cols: 15, photo: "photo-1518020382113-a7e8fc38eac9", imageAlt: "Snowy mountain peaks" },
  { id: 25, name: "Elite", rows: 15, cols: 15, photo: "photo-1519681393784-d120267933ba", imageAlt: "Snow-covered mountains beneath a starry sky" },
  { id: 26, name: "Mastermind", rows: 15, cols: 16, photo: "photo-1482938289607-e9573fc25ebb", imageAlt: "River flowing through a green landscape" },
  { id: 27, name: "Prodigy", rows: 16, cols: 16, photo: "photo-1497250681960-ef046c08a56e", imageAlt: "Green leaves in soft sunlight" },
  { id: 28, name: "Mythic", rows: 16, cols: 17, photo: "photo-1472396961693-142e6e269027", imageAlt: "Wildlife in a forest" },
  { id: 29, name: "Immortal", rows: 17, cols: 17, photo: "photo-1486870591958-9b9d0d1dda99", imageAlt: "Mountain peaks beneath a cloudy sky" },
  { id: 30, name: "Apex", rows: 18, cols: 18, photo: "photo-1469854523086-cc02fe5d8800", imageAlt: "Winding road through a mountain landscape" },
];

export const LEVELS: Level[] = LEVEL_DATA.map(({ photo, ...level }) => ({
  ...level,
  image: unsplash(photo),
}));