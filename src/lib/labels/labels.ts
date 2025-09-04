// src/lib/statsLabels.ts
// Small, resilient labeling for stat types. Works even if you add new files later.

export type StatTypeInfo = {
  key: string;            // normalized key we looked up
  label: string;          // human label for UI
  short?: string;         // compact label for chips/tabs
  emoji?: string;         // optional glyph
  description?: string;   // hover tooltip / title
};

const MAP: Record<string, StatTypeInfo> = {
  all: {
    key: "all",
    label: "All Metrics",
    short: "All",
    description: "Merged view across all metric files.",
  },
  standard: {
    key: "standard",
    label: "Standard",
    short: "Std",
    description: "Goals, assists, xG/xAG, basic per-90 output.",
  },
  passing: {
    key: "passing",
    label: "Passing",
    short: "Pass",
    description: "Volume, accuracy, progressive passes.",
  },
  passing_types: {
    key: "passing_types",
    label: "Passing Types",
    short: "Pass Types",
    description: "Crosses, long balls, through balls, switches.",
  },
  possession: {
    key: "possession",
    label: "Possession",
    short: "Poss",
    description: "Touches, carries, progressive actions, take-ons.",
  },
  shooting: {
    key: "shooting",
    label: "Shooting",
    short: "Shot",
    description: "Shots, SoT, goals, xG quality.",
  },
  defense: {
    key: "defense",
    label: "Defending",
    short: "Def",
    description: "Tackles, interceptions, blocks, clearances.",
  },
  keeper: {
    key: "keeper",
    label: "Goalkeeping",
    short: "GK",
    description: "Shots on target faced, saves, save%.",
  },
  keeper_adv: {
    key: "keeper_adv",
    label: "Goalkeeping (Adv)",
    short: "GK+",
    description: "PSxG, goals prevented, advanced GK metrics.",
  },
  goal_shot_creation: {
    key: "goal_shot_creation",
    label: "Shot & Goal Creation",
    short: "SCA/GCA",
    description: "Actions that lead to shots and goals.",
  },
  misc: {
    key: "misc",
    label: "Miscellaneous",
    short: "Misc",
    description: "Cards, fouls, aerials, other misc stats.",
  },
  playing_time: {
    key: "playing_time",
    label: "Playing Time",
    short: "Time",
    description: "90s, starts, subs, minutes, availability.",
  },

};

// Fallback for unknown keys → Title Case from snake-case
function titleize(s: string): string {
  return s
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b([a-z])/g, (m) => m.toUpperCase());
}

export function statTypeInfo(raw: string): StatTypeInfo {
  const key = String(raw || "").toLowerCase();
  const known = MAP[key];
  if (known) return known;

  return {
    key,
    label: titleize(key),
    short: titleize(key),
    emoji: "📁",
    description: "Unrecognized stat file; using generic label.",
  };
}
