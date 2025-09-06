
// FBref “TOP5” leagues we care about
export type LeagueId =
  | "ENG-Premier League"
  | "ESP-La Liga"
  | "ITA-Serie A"
  | "GER-Bundesliga"
  | "FRA-Ligue 1";



export const KnownStatTypes = [
  "standard",
  "passing",
  "passing_types",
  "possession",
  "shooting",
  "defense",
  "keeper",
  "keeper_adv",
  "goal_shot_creation",
  "misc",
  "playing_time",
] as const;



export type SortKey = "avg_m" | "spread_m" | "leader";

export type TeamMentalSummary = {
  league: string;
  season: number;
  team: string;
  avg_m: number;
  spread_m: number;
  count_players: number;
  leader: { player: string; m: number };
  weakest: { player: string; m: number };
};
export type Player = {
  name: string;
  team?: string;
  league: string;
  league_name?: string;
  role: string;
  position: string;
  age: number | string;
  mental: {
    m_raw: number;
    m: number;
    debug?: Record<string, number>;
  };
  ranking?: {
    performance: number;
    breakdown?: Record<string, number>;
  };// eslint-disable-next-line
  stats?: Record<string, any>;
};

export type TeamStat = {
  league: string;
  season: string;
  team: string;
  metrics: Record<string, number>;
};
export type StatsPayload = Record<string, TeamStat[]>;