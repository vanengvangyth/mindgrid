import type { Profile } from "../types";

export const PROFILE_KEY = "mindgrid-player-profile";
export const MAX_NAME_LENGTH = 20;

export const AVATARS = ["🌿", "🏔️", "🌊", "🌸", "🦋", "🦊", "🐼", "🌙"];

export const DEFAULT_PROFILE: Profile = {
  name: "Player",
  avatar: AVATARS[0],
};

export function readProfile(): Profile {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (!saved) return DEFAULT_PROFILE;

    const parsed = JSON.parse(saved) as Partial<Profile>;
    const name =
      typeof parsed.name === "string"
        ? parsed.name.trim().slice(0, MAX_NAME_LENGTH)
        : "";

    return {
      name: name || DEFAULT_PROFILE.name,
      avatar: AVATARS.includes(parsed.avatar ?? "")
        ? (parsed.avatar as string)
        : DEFAULT_PROFILE.avatar,
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: Profile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // ใช้ localStorage ไม่ได้ก็ไม่เป็นไร เกมยังเล่นต่อได้
  }
}