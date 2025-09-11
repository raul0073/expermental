import { StaticImageData } from "next/image";

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


export type TeamStat = {
  league: string;
  season: string;
  team: string;
  metrics: Record<string, number>;
};
export type StatsPayload = Record<string, TeamStat[]>;

export type TeamMetricValue = {
  team_value: number;
  team_rank: number | null;
  team_normalized: number;
  league_best_value: number;
  league_best_team: string;
  league_normalized: number;
};

export type TeamCategoryData = Record<string, TeamMetricValue>;

export type TeamMetricsMappingItem = {
  stat_type: string;
  key: string;
};

export type TeamMetricsMapping = Record<string, TeamMetricsMappingItem[]>;

export type TeamDefaultChartData = {
  league: string;
  season: number;
  team: string;
  chart_type: "default";
  data: Record<string, TeamCategoryData>;
  metrics: TeamMetricsMapping;
};

export type PlotResponse = {
  plot: {
    default: TeamDefaultChartData;
  };
};


export type Player365Stats = {
    per90: {
      "Non-Penalty Goals": number;
      "npxG: Non-Penalty xG": number;
      "Shots Total": number;
      "Assists": number;
      "xAG: Exp. Assisted Goals": number;
      "npxG + xAG": number;
      "Shot-Creating Actions": number;
      "Passes Attempted": number;
      "Pass Completion %": number;
      "Progressive Passes": number;
      "Progressive Carries": number;
      "Successful Take-Ons": number;
      "Touches (Att Pen)": number;
      "Progressive Passes Rec": number;
      "Tackles": number;
      "Interceptions": number;
      "Blocks": number;
      "Clearances": number;
      "Aerials Won": number;
    };
    percentiles: {
      "Non-Penalty Goals": number;
      "npxG: Non-Penalty xG": number;
      "Shots Total": number;
      "Assists": number;
      "xAG: Exp. Assisted Goals": number;
      "npxG + xAG": number;
      "Shot-Creating Actions": number;
      "Passes Attempted": number;
      "Pass Completion %": number;
      "Progressive Passes": number;
      "Progressive Carries": number;
      "Successful Take-Ons": number;
      "Touches (Att Pen)": number;
      "Progressive Passes Rec": number;
      "Tackles": number;
      "Interceptions": number;
      "Blocks": number;
      "Clearances": number;
      "Aerials Won": number;
    };
    position_pool: string;
  };


export type FormationType = "433" | "4231" | "532"




/* 
RWSPONSES TYPES: 
*/

export interface PlayerResponse {
  league: string;
  season: number;
  role: string | null;
  name_query: string | null;
  players: Player[];
  count: number;
  plot: string;
}


export interface BestElevenResponse {
  top_formations: {
  formation: FormationType
  score: number,
  best_eleven: Player[],
  subs: Player[]
  }[],

  best_performing_eleven: {
    formation: FormationType
  score: number,
  best_eleven: Player[],
    subs: Player[]
  }
}