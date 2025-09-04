import { LeagueNameMap } from "@/lib/Types/LABELS";

export type PlayerStatsGroup = {
  [key: string]: number | null;
};

export type PlayerStats = {
  standard: PlayerStatsGroup;
  shooting: PlayerStatsGroup;
  passing: PlayerStatsGroup;
  passing_types: PlayerStatsGroup;
  goal_shot_creation: PlayerStatsGroup;
  defense: PlayerStatsGroup;
  possession: PlayerStatsGroup;
  playing_time: PlayerStatsGroup;
  misc: PlayerStatsGroup;
};

export type PlayerRanking = {
  performance: number;
  breakdown: Record<string, number>;
};

export type PlayerMeta = {
  team: string;
  league: string;
  season: string;
};

export type PlayerMental = {
  m_raw: number;
  m: number;
  breakdown: Record<string, number>;
};

export type Player = {
  name: string;
  age: number;
  position: string;
  position_text: string;
  role: "GK" | "CB" | "FB" | "DM" | "CM" | "AM" | "W" | "CF";
  foot: string;
  stats: PlayerStats;
  ranking: PlayerRanking;
  fbref_id: string;
  fbref_url: string;
  __meta__: PlayerMeta;
  mental: PlayerMental;
  league?: LeagueNameMap; // denormalized for easier access
  team?: string; // denormalized for easier access
};
