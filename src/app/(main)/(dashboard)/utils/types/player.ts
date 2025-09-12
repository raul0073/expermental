import { StaticImageData } from "next/image";
import { Player365Stats } from "../types";

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

export type MentalBreakdownCategory = {
  avg: number;                       // average score for this category
  stats: Record<string, number>;     // individual stat values for this category
};

export type PlayerMental = {
  m_raw: number;                                      // raw mental score before normalization
  m: number;                                          // normalized mental score (0-100)
  breakdown: Record<string, MentalBreakdownCategory>; // category name → breakdown
};

export type Player = {
  name: string;
  team?: string;
  league: string;
  league_name?: string;
  role: string;
  position: string;
  age: number | string;
  mental: PlayerMental;
  ranking?: {
    performance: number;
    breakdown?: Record<string, number>;
  }; // eslint-disable-next-line
  stats?: Record<string, any>;
  __meta__?: {
    league: string;
    season: string;
    team: string;
  };
  fbref_id?: string;
  fbref_url?: string;
  position_text?: string;
  foot?: string;
  profile_img?: StaticImageData | string;
  player_365_stats: Player365Stats
};
